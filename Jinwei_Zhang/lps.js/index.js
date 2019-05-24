/*
  This file is part of the lps.js project, released open source under
  the BSD 3-Clause license. For more info, please see https://github.com/mauris/lps.js
 */

const LPS = require('./src/LPS');
const meta = require('./package.json');
LPS.meta = meta;

if (process.browser) {
  window.LPS = LPS;
}

console.log('Order of execution: ');
console.log('index -> LPS(loadFile) -> ProgramFactory(fromFile) -> Parser(source, pathname) -> _lexer.get()');

// LPS.loadFile('../Driving-Car-MoreJunctions/drivingCar.lps')
//   .then((engine) => {
//     engine.run();
//   });
//
// module.exports = LPS;


//s
// const LPS = require('lps');
// const commandLineArgs = require('command-line-args');
// const commandLineUsage = require('command-line-usage');
// const Logger = require('../src/utility/Logger');
// const buildOptionList = require('../src/utility/buildOptionList');
// const optionDefinitions = require('../src/options/generate-spec');
// const printVersion = require('../src/utility/printVersion');
const fs = require('fs');

const INDENTATION = '  ';

function generateSpec(programFile, specFile) {
  // let buffer = '';

  // const writeOutput = (output) => {
  //   if (specFile !== null) {
  //     buffer += output;
  //     return;
  //   }
  //   process.stdout.write(output);
  // };

  LPS.loadFile(programFile)
    .then((engine) => {
      let profiler = engine.getProfiler();
      console.log('% --- Specification generated for ' + programFile + '\n');

      engine.on('postCycle', () => {
        let currentTime = engine.getCurrentTime();
        let startTime = currentTime - 1;
        let endTime = currentTime;

        console.log('% --- Start of cycle ' + endTime + ' ---\n');
        console.log('expect_num_of(' + ['fluent', currentTime, profiler.get('numState')].join(', ') + ').\n');
        engine.getActiveFluents().forEach((termArg) => {
          let lpsTerm = LPS.literal(termArg);
          let args = lpsTerm.getArguments();
          let term = new LPS.Functor(lpsTerm.getName(), args);
          console.log(INDENTATION + 'expect(' + ['fluent', currentTime, term.toString()].join(', ') + ').\n');
        });

        if (startTime === 0) {
          console.log('\n');
          return;
        }

        console.log('expect_num_of(' + ['action', startTime, endTime, profiler.get('lastCycleNumActions')].join(', ') + ').\n');
        engine.getLastCycleActions().forEach((termArg) => {
          let lpsTerm = LPS.literal(termArg);
          let args = lpsTerm.getArguments();
          let term = new LPS.Functor(lpsTerm.getName(), args);
          console.log(INDENTATION + 'expect(' + ['action', startTime, endTime, term.toString()].join(', ') + ').\n');
        });

        console.log('expect_num_of(' + ['observation', startTime, endTime, profiler.get('lastCycleNumObservations')].join(', ') + ').\n');
        engine.getLastCycleObservations().forEach((termArg) => {
          let lpsTerm = LPS.literal(termArg);
          let args = lpsTerm.getArguments();
          let term = new LPS.Functor(lpsTerm.getName(), args);
          console.log(INDENTATION + 'expect(' + ['observation', startTime, endTime, term.toString()].join(', ') + ').\n');
        });

        console.log('expect_num_of(' + ['firedRules', endTime, profiler.get('lastCycleNumFiredRules')].join(', ') + ').\n');
        console.log('expect_num_of(' + ['resolvedGoals', endTime, profiler.get('lastCycleNumResolvedGoals')].join(', ') + ').\n');
        console.log('expect_num_of(' + ['unresolvedGoals', endTime, profiler.get('lastCycleNumUnresolvedGoals')].join(', ') + ').\n');
        console.log('expect_num_of(' + ['failedGoals', endTime, profiler.get('lastCycleNumFailedGoals')].join(', ') + ').\n');

        console.log('\n');
      });

      engine.on('error', (err) => {
        // Logger.error(err);
        console.log('this is the error message: ' + err);
      });

      if (specFile !== null) {
        // write to file when program is done
        engine.on('done', () => {
          // fs.writeFile(specFile, buffer, () => {
          //   Logger.log('Spec file written to ' + specFile);
          // });
        });
      }

      // Logger.log('Executing ' + programFile);
      // Logger.log('-----');
      engine.run();
    })
    .catch((err) => {
      // Logger.error(err);
      console.log('this is the error message: ' + err);
    });
}

// function showHelp() {
//   const sections = [
//     {
//       header: 'lps-generate-spec',
//       content: 'LPS Program Specification Generator'
//     },
//     {
//       header: 'Synopsis',
//       content: [
//         '$ lps-generate-spec [options ...] {underline program-file}',
//         '$ lps-test {bold --help}'
//       ]
//     },
//     {
//       header: 'Options',
//       optionList: buildOptionList(optionDefinitions, 'main')
//     },
//     {
//       header: 'Updating and more info',
//       content: [
//         'Use \'npm i -g lps-cli\' to update LPS CLI tools package.',
//         'For bug reports and other contributions, please visit https://github.com/mauris/lps-cli'
//       ]
//     }
//   ];
//   // const usage = commandLineUsage(sections);
//   // console.log(usage);
//   // process.exit(-1);
// }

// const options = commandLineArgs(optionDefinitions, { stopAtFirstUnknown: true });
//
// Logger.verbose = options._all.verbose;
// Logger.quiet = options._all.quiet;
//
// if (options._all.help) {
//   showHelp();
// } else if (options._all.version) {
//   // if version option is set, show version.
//   printVersion(options._all.verbose);
// } else if (options._all.program) {
//   console.log(options._all.program);
//   console.log(options._all.out);
//   console.log('------------------');
//   generateSpec(options._all.program, options._all.out);
// } else {
//   showHelp();
// }


generateSpec('../Driving-Car-MoreJunctions/drivingCar.lps', null);
