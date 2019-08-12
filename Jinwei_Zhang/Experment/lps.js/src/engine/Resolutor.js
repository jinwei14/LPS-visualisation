/*
  This file is part of the lps.js project, released open source under
  the BSD 3-Clause license. For more info, please see https://github.com/mauris/lps.js
 */

const lpsRequire = require('../lpsRequire');
const Functor = lpsRequire('engine/Functor');
const Timable = lpsRequire('engine/Timable');
const LiteralTreeMap = lpsRequire('engine/LiteralTreeMap');
const compactTheta = lpsRequire('utility/compactTheta');
const sortTimables = lpsRequire('utility/sortTimables');
const resolveTimableThetaTiming = lpsRequire('utility/resolveTimableThetaTiming');

let Resolutor = {};

Resolutor.handleBuiltInFunctorArgumentInLiteral = function handleBuiltInFunctorArgumentInLiteral(
  functorProvider,
  literal
) {
  let literalName = literal.getName();
  let literalArgs = literal.getArguments();

  let result = [];
  let handleLiteralArg = (argsSoFar, idx) => {
    if (idx >= literalArgs.length) {
      result.push(new Functor(literalName, argsSoFar));
      return;
    }
    let arg = literalArgs[idx];
    if (arg instanceof Functor && functorProvider.has(arg.getId())) {
      let executionResult = functorProvider.execute(arg);
      let replaceCount = 0;
      executionResult.forEach((instance) => {
        if (instance.replacement === undefined) {
          return;
        }
        replaceCount += 1;
        handleLiteralArg(argsSoFar.concat([instance.replacement]), idx + 1);
      });

      if (replaceCount === 0) {
        handleLiteralArg(argsSoFar.concat(arg), idx + 1);
      }
      return;
    }
    handleLiteralArg(argsSoFar.concat([arg]), idx + 1);
  };
  handleLiteralArg([], 0);
  return result;
};

Resolutor.findUnifications = function findUnifications(literal, factsArg) {
  let facts = factsArg;
  if (facts instanceof LiteralTreeMap) {
    facts = [facts];
  }
  let unifications = [];
  for (let i = 0; i < facts.length; i += 1) {
    let unification = facts[i].unifies(literal);
    unifications = unifications.concat(unification);
  }
  return unifications;
};

Resolutor.explain = function explain(queryArg, program, engine, otherFacts) {
  let functorProvider = engine.getFunctorProvider();
  let facts = [
    program.getFacts(),
    program.getState(),
    program.getExecutedActions()
  ];

  if (otherFacts !== undefined) {
    if (otherFacts instanceof LiteralTreeMap) {
      facts.push(otherFacts);
    } else if (otherFacts instanceof Array) {
      facts = facts.concat(otherFacts);
    }
  }

  let query = queryArg;
  if (!(query instanceof Array)) {
    query = [query];
  }

  let recursiveResolution = function (remainingLiterals, thetaSoFar) {
    let result = [];
    if (remainingLiterals.length === 0) {
      result.push({
        theta: thetaSoFar
      });
      return result;
    }

    let conjunct = remainingLiterals[0]
      .substitute(thetaSoFar);
    let literal = conjunct.getGoal();

    let literalThetas = Resolutor.queryState(literal, functorProvider, facts);

    program
      .getDefinitions(conjunct)
      .forEach((tuple) => {
        let bodyLiterals = tuple.definition;
        let headLiteral = tuple.headLiteral;

        // perform resolution on the subgoal
        let subResult = recursiveResolution(bodyLiterals, {});
        let updatedHeadLiteralMap = new LiteralTreeMap();
        subResult.forEach((r) => {
          let updatedHeadLiteral = headLiteral.substitute(r.theta);
          updatedHeadLiteralMap.add(updatedHeadLiteral);
        });
        let unifications = updatedHeadLiteralMap.unifies(conjunct);

        unifications.forEach((t) => {
          literalThetas.push({ theta: t.theta });
        });
      });

    if (literalThetas.length === 0) {
      return [];
    }

    let newRemainingLiterals = remainingLiterals.slice(1, remainingLiterals.length);

    literalThetas.forEach((t) => {
      let compactedTheta = compactTheta(thetaSoFar, t.theta);
      let subResult = recursiveResolution(newRemainingLiterals, compactedTheta);
      result = result.concat(subResult);
    });
    return result;
  };

  let result = recursiveResolution(query, {}, []);
  return result;
};

Resolutor.queryState = function queryState(literal, functorProvider, state) {
  let literalThetas = [];
  let substitutedInstances = Resolutor
    .handleBuiltInFunctorArgumentInLiteral(functorProvider, literal);
  substitutedInstances.forEach((l) => {
    if (functorProvider.has(l.getId())) {
      literalThetas = literalThetas.concat(functorProvider.execute(l));
    }
    literalThetas = literalThetas.concat(Resolutor.findUnifications(l, state));
  });
  return literalThetas;
};

Resolutor.reduceRuleAntecedent = function reduceRuleAntecedent(
  engine,
  state,
  rule,
  forTime
) {
  let functorProvider = engine.getFunctorProvider();

  let recursiveResolution = function (result, remainingLiterals, theta, laterAntecedent) {
    if (remainingLiterals.length === 0) {
      result.push({
        theta: theta,
        unresolved: laterAntecedent
      });
      return;
    }
    let newTheta = Object.assign({}, theta);
    let conjunct = remainingLiterals[0]
      .substitute(newTheta);
    let thetaDelta = resolveTimableThetaTiming(conjunct, newTheta, forTime);
    let literal = conjunct
      .getGoal()
      .substitute(thetaDelta);
    let literalThetas = Resolutor.queryState(literal, functorProvider, state);

    if (literalThetas.length === 0) {
      if (!(conjunct instanceof Timable) || conjunct.isInRange(forTime)) {
        return;
      }
      result.push({
        theta: theta,
        unresolved: remainingLiterals.concat(laterAntecedent)
      });
      return;
    }

    literalThetas.forEach((t) => {
      let updatedTheta = compactTheta(newTheta, t.theta);
      recursiveResolution(
        result,
        remainingLiterals.slice(1, remainingLiterals.length),
        updatedTheta,
        laterAntecedent
      );
    });
  };

  let literals = rule.getBodyLiterals();
  let pair = sortTimables(literals, forTime);
  let thetaSet = [];
  recursiveResolution(thetaSet, pair[0], {}, pair[1]);
  return thetaSet;
};

module.exports = Resolutor;
