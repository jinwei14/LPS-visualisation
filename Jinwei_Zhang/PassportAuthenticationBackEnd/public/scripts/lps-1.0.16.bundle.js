/*! lps.js 1.0.16 (browser). BSD-3-Clause. https://github.com/mauris/lps.js */ ! function(e) {
  var t = {};

  function n(i) {
    if (t[i]) return t[i].exports;
    var r = t[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
  }
  n.m = e, n.c = t, n.d = function(e, t, i) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: i
    })
  }, n.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, n.t = function(e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var r in e) n.d(i, r, function(t) {
        return e[t]
      }.bind(null, r));
    return i
  }, n.n = function(e) {
    var t = e && e.__esModule ? function() {
      return e.default
    } : function() {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 66)
}([function(e, t, n) {
  e.exports = function(e) {
    return n(67)(`./${e}`)
  }
}, function(e, t) {
  var n, i, r = e.exports = {};

  function a() {
    throw new Error("setTimeout has not been defined")
  }

  function o() {
    throw new Error("clearTimeout has not been defined")
  }

  function l(e) {
    if (n === setTimeout) return setTimeout(e, 0);
    if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
    try {
      return n(e, 0)
    } catch (t) {
      try {
        return n.call(null, e, 0)
      } catch (t) {
        return n.call(this, e, 0)
      }
    }
  }! function() {
    try {
      n = "function" == typeof setTimeout ? setTimeout : a
    } catch (e) {
      n = a
    }
    try {
      i = "function" == typeof clearTimeout ? clearTimeout : o
    } catch (e) {
      i = o
    }
  }();
  var s, u = [],
    c = !1,
    f = -1;

  function h() {
    c && s && (c = !1, s.length ? u = s.concat(u) : f = -1, u.length && d())
  }

  function d() {
    if (!c) {
      var e = l(h);
      c = !0;
      for (var t = u.length; t;) {
        for (s = u, u = []; ++f < t;) s && s[f].run();
        f = -1, t = u.length
      }
      s = null, c = !1,
        function(e) {
          if (i === clearTimeout) return clearTimeout(e);
          if ((i === o || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
          try {
            i(e)
          } catch (t) {
            try {
              return i.call(null, e)
            } catch (t) {
              return i.call(this, e)
            }
          }
        }(e)
    }
  }

  function g(e, t) {
    this.fun = e, this.array = t
  }

  function m() {}
  r.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    u.push(new g(e, t)), 1 !== u.length || c || l(d)
  }, g.prototype.run = function() {
    this.fun.apply(null, this.array)
  }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = m, r.addListener = m, r.once = m, r.off = m, r.removeListener = m, r.removeAllListeners = m, r.emit = m, r.prependListener = m, r.prependOnceListener = m, r.listeners = function(e) {
    return []
  }, r.binding = function(e) {
    throw new Error("process.binding is not supported")
  }, r.cwd = function() {
    return "/"
  }, r.chdir = function(e) {
    throw new Error("process.chdir is not supported")
  }, r.umask = function() {
    return 0
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Value"),
    a = i("engine/Variable"),
    o = i("engine/List"),
    l = i("engine/Timable"),
    s = i("engine/Functor"),
    u = i("engine/modules/core/resolveValue"),
    c = i("engine/modules/core/math"),
    f = i("engine/modules/core/io"),
    h = i("engine/modules/core/list"),
    d = i("engine/modules/core/comparators"),
    g = i("engine/modules/core/types");
  e.exports = ((e, t) => {
    const n = {
      "!/1": function(t) {
        let n = t;
        if (!(n instanceof s || n instanceof l)) throw new Error("Literal not functor or timable in !/1 argument");
        let i = [];
        return 0 === e.query(n).length && i.push({
          theta: {}
        }), i
      },
      "=/2": function(e, t) {
        if (!(e instanceof a)) throw new Error("LHS of variable assignment must be a variable. " + e + " given instead.");
        let i = [],
          r = u.call(this, t);
        if (r instanceof Array) return r.forEach(t => {
          i = i.concat(n["=/2"](e, t))
        }), i;
        let o = {};
        return o[e.evaluate()] = r, i.push({
          theta: o
        }), i
      },
      "findall/3": function(t, n, i) {
        if (!(i instanceof a)) throw new Error("The last argument of findall/3 must be a variable.");
        let r = [];
        e.query(n).forEach(e => {
          r.push(t.substitute(e.theta))
        });
        let l = {};
        return l[i.evaluate()] = new o(r), [{
          theta: l
        }]
      },
      "functor/3": function(e, t, n) {
        if (!(e instanceof s)) throw new Error("Argument 1 of functor/3 must be a functor.");
        let i = {};
        if (t instanceof a) i[t.evaluate()] = new s(e.getName(), []);
        else if (t.evaluate() !== e.getName()) return [];
        if (n instanceof a) i[n.evaluate()] = new r(e.getArgumentCount());
        else if (n.evaluate() !== e.getArgumentCount()) return [];
        return [{
          theta: i
        }]
      },
      "lpsHalt/0": function() {
        return e.halt(), [{
          theta: {}
        }]
      }
    };
    let i = e.getFunctorProvider();
    i.load(n), i.load(d), i.load(g), i.load(h), i.load(f), i.load(c)
  })
}, function(e, t, n) {
  const i = n(5),
    r = function(e, t) {
      let n = e;
      "string" == typeof n && (n = n.split("."));
      let r = t;
      t instanceof Array ? void 0 === t && (r = []) : r = Array.from(arguments).slice(1);
      let a = i;
      const o = Object.keys(n);
      for (let e = 0; e < o.length; e += 1) {
        if (void 0 === a[n[o[e]]]) throw new Error("Invalid path for string literal retrival");
        a = a[n[o[e]]]
      }
      if ("string" != typeof a) throw new Error("String literal retrival: Path does not point to a string");
      return function(e, t) {
        let n = e;
        const i = Object.keys(t);
        for (let e = 0; e < i.length; e += 1) n = n.replace(/%s/, t[i[e]]);
        return n
      }(a, r)
    };
  r.error = function() {
    return new Error(r.apply(null, arguments))
  }, e.exports = r
}, function(e, t, n) {
  (function(t) {
    const i = n(6),
      r = n(0),
      a = r("parser/ProgramFactory"),
      o = r("engine/Engine"),
      l = r("engine/Value"),
      s = r("engine/Variable"),
      u = r("engine/Functor"),
      c = r("engine/tester/Tester"),
      f = r("engine/List"),
      h = r("engine/Program"),
      d = r("utility/strings"),
      g = a.literal("lpsArgs(L)");

    function m() {}
    m.literal = function(e) {
      return a.literal(e)
    }, m.literalSet = function(e) {
      return a.literalSet(e)
    };
    const p = function(e) {
      return t => {
        let n = function(e) {
          let t = e;
          void 0 === e && (t = []), t = t.map(e => new l(e));
          let n = {
            L: new f(t)
          };
          return g.substitute(n)
        }(e);
        return t.getFacts().add(n), Promise.resolve(t)
      }
    };
    m.createFromString = function(e, t) {
      return a.fromString(e).then(p(t)).then(e => {
        let t = new o(e);
        return Promise.resolve(t)
      })
    }, m.loadString = function(e, t) {
      return m.createFromString(e, t).then(e => e.load())
    }, m.createFromFile = function(e, n) {
      if (t.browser) return Promise.reject(new Error(d("browserContext.loadProgramFromFile")));
      let r = e;
      return r = i.resolve(r), a.fromFile(r).then(p(n)).then(e => {
        e.setWorkingDirectory(i.dirname(r));
        let t = new o(e);
        return Promise.resolve(t)
      })
    }, m.loadFile = function(e, t) {
      return m.createFromFile(e, t).then(e => e.load())
    }, m.Value = l, m.Variable = s, m.List = f, m.Functor = u, m.Tester = c, m.Program = h, m.ProgramFactory = a, e.exports = m
  }).call(this, n(1))
}, function(e) {
  e.exports = {
    generic: {
      parameterInvalidType: "Invalid variable type for parameter %s of %s(), must be of type %s and %s was given.",
      parameterNullNotAllowed: "Null value not allowed for parameter %s of %s()."
    },
    console: {
      colors: {
        reset: "[0m",
        underline: "[4m",
        hidden: "[8m",
        fgBlack: "[30m",
        fgRed: "[31m",
        fgGreen: "[32m",
        fgYellow: "[33m",
        fgBlue: "[34m",
        fgMegenta: "[35m",
        fgCyan: "[36m",
        fgWhite: "[37m"
      }
    },
    declarationProcessors: {
      observe: {
        invalidStartTimeValue: "Start time given to observe/3 must be a value.",
        invalidEndTimeValue: "End time given to observe/3 must be a value.",
        invalidTimeOrdering: "Invalid ordering of time given to observe/3: Start time must come before end time."
      }
    },
    parser: {
      loadFileErrorHeader: "[ [31m Error loading %s[0m ]\n%s",
      syntaxErrorBrowser: "Syntax Error: Unexpected token '%s' of type %s found at line %s, col %s\n\n%s: %s\n%s\n",
      syntaxError: "Syntax Error: Unexpected token '%s' of type %s found at line [33m%s[0m, col [33m%s[0m\n\n[4m%s: %s[0m\n%s\n",
      likelyMissingInfo: "It is likely you forgot a '%s' somewhere.\n"
    },
    program: {
      selfAugmentation: "At Program.augment(): a program cannot augment itself"
    },
    modules: {
      browserModeModuleLoadFailure: "Not possible to use '%s' module when in browser."
    },
    browserContext: {
      loadProgramFromFile: "Unable to load program from a file in browser context; File system API unavailable."
    },
    tester: {
      testWhileRunning: "Cannot start tests for LPS program after execution has started.",
      invalidValueForExpectedNumOf: "Invalid value given for comparison: value must be a number or a special comparison predicate. %s was given.",
      unknownComparator: "Unknown special comparison predicate given: %s",
      expectCycleQuery: "Expecting %s '%s' at time %s.",
      invalidExpectationType: "Invalid expectation type given: %s",
      expectNumOf: "Expecting number of %s at time %s to be %s, program has %s.",
      nonExecutedExpectations: "Expectations for cycle(s) %s not executed.",
      numNonExecutedExpectationCycles: "Program ended early: %s expectation cycles were not executed.",
      expectNumCycles: "Expecting %s cycles to be executed in total, program executed only %s cycles."
    },
    engine: {
      maxTimeInvalid: "Max number of cycles to execute must be a positive integer: %s was given as max number of cycles.",
      cycleIntervalExceeded: "Previous cycle has exceeded its time limit of %sms. LPS will now terminate.",
      definePredicatesWhileRunning: "Cannot define JS predicates after starting LPS execution",
      nonPositiveIntegerCycleInterval: "Cycle interval must be a positive integer, %s was given.",
      nonPositiveIntegerMaxTime: "Max cycle time must be a positive integer, %s was given.",
      loadModuleInvalidType: "Engine.loadModule expects a single parameter that is function taking in the engine and program as its parameters.",
      loadModuleWhileRunning: "Cannot load module after starting LPS execution.",
      updatingParametersWhileRunning: "Cannot set %s while LPS program is in execution. Parameters can only be set before the LPS program starts.",
      fluentUpdaterActionArgumentVariable: "When declaring an initiate, terminate or update, the action must have the last argument as the time variable.",
      rejectObservationWarning: "Rejecting observation '%s' from time %s to %s in order to satisfy program constraints",
      loadingLoadedEngine: "Cannot load LPS engine: LPS Engine already loaded",
      invalidObservationScheduling: "End time for observation scheduling must be greater than start time: Tried scheduling %s from %s to %s.",
      invalidStartTimeObservationScheduling: "Start time for observation scheduling given must be greater than the current time: Tried scheduling %s for time %s at current time %s."
    }
  }
}, function(e, t, n) {
  (function(e) {
    function n(e, t) {
      for (var n = 0, i = e.length - 1; i >= 0; i--) {
        var r = e[i];
        "." === r ? e.splice(i, 1) : ".." === r ? (e.splice(i, 1), n++) : n && (e.splice(i, 1), n--)
      }
      if (t)
        for (; n--; n) e.unshift("..");
      return e
    }
    var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
      r = function(e) {
        return i.exec(e).slice(1)
      };

    function a(e, t) {
      if (e.filter) return e.filter(t);
      for (var n = [], i = 0; i < e.length; i++) t(e[i], i, e) && n.push(e[i]);
      return n
    }
    t.resolve = function() {
      for (var t = "", i = !1, r = arguments.length - 1; r >= -1 && !i; r--) {
        var o = r >= 0 ? arguments[r] : e.cwd();
        if ("string" != typeof o) throw new TypeError("Arguments to path.resolve must be strings");
        o && (t = o + "/" + t, i = "/" === o.charAt(0))
      }
      return t = n(a(t.split("/"), function(e) {
        return !!e
      }), !i).join("/"), (i ? "/" : "") + t || "."
    }, t.normalize = function(e) {
      var i = t.isAbsolute(e),
        r = "/" === o(e, -1);
      return (e = n(a(e.split("/"), function(e) {
        return !!e
      }), !i).join("/")) || i || (e = "."), e && r && (e += "/"), (i ? "/" : "") + e
    }, t.isAbsolute = function(e) {
      return "/" === e.charAt(0)
    }, t.join = function() {
      var e = Array.prototype.slice.call(arguments, 0);
      return t.normalize(a(e, function(e, t) {
        if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
        return e
      }).join("/"))
    }, t.relative = function(e, n) {
      function i(e) {
        for (var t = 0; t < e.length && "" === e[t]; t++);
        for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
        return t > n ? [] : e.slice(t, n - t + 1)
      }
      e = t.resolve(e).substr(1), n = t.resolve(n).substr(1);
      for (var r = i(e.split("/")), a = i(n.split("/")), o = Math.min(r.length, a.length), l = o, s = 0; s < o; s++)
        if (r[s] !== a[s]) {
          l = s;
          break
        } var u = [];
      for (s = l; s < r.length; s++) u.push("..");
      return (u = u.concat(a.slice(l))).join("/")
    }, t.sep = "/", t.delimiter = ":", t.dirname = function(e) {
      var t = r(e),
        n = t[0],
        i = t[1];
      return n || i ? (i && (i = i.substr(0, i.length - 1)), n + i) : "."
    }, t.basename = function(e, t) {
      var n = r(e)[2];
      return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
    }, t.extname = function(e) {
      return r(e)[3]
    };
    var o = "b" === "ab".substr(-1) ? function(e, t, n) {
      return e.substr(t, n)
    } : function(e, t, n) {
      return t < 0 && (t = e.length + t), e.substr(t, n)
    }
  }).call(this, n(1))
}, function(e, t) {
  e.exports = function e(t, n) {
    let i = t,
      r = n;
    this.getVariables = function() {
      let e = {},
        t = t => {
          t.getVariables().forEach(t => {
            e[t] = !0
          })
        };
      return i.forEach(t), r.forEach(t), Object.keys(e)
    }, this.isConstraint = function() {
      return 0 === i.length
    }, this.getHeadLiteralsCount = function() {
      return i.length
    }, this.getBodyLiteralsCount = function() {
      return r.length
    }, this.isGround = function() {
      for (let e = 0; e < i.length; e += 1)
        if (!i[e].isGround()) return !1;
      for (let e = 0; e < r.length; e += 1)
        if (!r[e].isGround()) return !1;
      return !0
    }, this.substitute = function(t) {
      return new e(i.map(e => e.substitute(t)), r.map(e => e.substitute(t)))
    }, this.getHeadLiterals = function() {
      return i.concat()
    }, this.getBodyLiterals = function() {
      return r.concat()
    }, this.toString = function() {
      let e = "";
      for (let t = 0; t < i.length; t += 1) e += i[t].toString(), t < i.length - 1 && (e += ", ");
      r.length > 0 && (i.length > 0 && (e += " "), e += "<- "), 0 === r.length && i.length > 0 && (e += " <- true");
      for (let t = 0; t < r.length; t += 1) e += r[t].toString(), t < r.length - 1 && (e += ", ");
      return e += "."
    }
  }
}, function(e, t, n) {
  const i = n(0)("engine/LiteralTreeMap");
  e.exports = function() {
    let e = [];
    this.add = function(t, n) {
      if (void 0 === n) return;
      let r = new i;
      t.forEach(e => {
        r.add(e)
      }), e.push([r.size(), r, n])
    }, this.get = function(t) {
      let n;
      for (let i = 0; i < e.length; i += 1) {
        let r = e[i],
          a = !1;
        if (t.length === r[0]) {
          for (let e = 0; e < t.length; e += 1) {
            let n = t[e];
            if (!r[1].contains(n)) {
              a = !0;
              break
            }
          }
          if (!a) {
            n = r[2];
            break
          }
        }
      }
      return n
    }
  }
}, function(e, t, n) {
  (function(t, i) {
    const r = n(0),
      a = r("engine/LiteralTreeMap"),
      o = r("engine/FunctorProvider"),
      l = r("utility/processRules"),
      s = r("utility/goalTreeSorter"),
      u = r("utility/observer/Manager"),
      c = r("utility/profiler/Profiler"),
      f = r("utility/constraintCheck"),
      h = r("utility/strings"),
      d = r("utility/evaluateGoalTrees"),
      g = r("utility/updateStateWithFluentActors"),
      m = r("engine/builtin/builtin"),
      p = r("engine/processors/observe"),
      b = r("engine/processors/initially"),
      v = r("engine/processors/ruleAntecedent"),
      y = r("engine/processors/settings"),
      w = r("engine/processors/timable"),
      E = r("engine/modules/core"),
      T = r("engine/ConjunctionMap"),
      x = e => t => {
        e.push(t.toString())
      };
    e.exports = function(e) {
      let n = e,
        S = 20,
        V = 100,
        C = !1,
        A = !1,
        j = !1,
        N = !1,
        _ = new u,
        F = new c,
        O = new T,
        k = {},
        L = [],
        P = 0,
        I = new a,
        M = new a,
        X = null,
        R = null,
        H = new o(this),
        B = function(e) {
          let t = n;
          n = e;
          let i = f(this, e);
          return n = t, i
        };
      const q = function() {
        P += 1;
        let e = new a,
          t = new a;
        O = new T;
        let i = n.getState().clone();
        g(this, n.getExecutedActions(), i), n.setState(i), I.forEach(e => {
          t.add(e)
        }), M.forEach(t => {
          e.add(t)
        });
        let r = l(this, n, P, F);
        return L = L.concat(r), d(P, L, O, F).then(e => (L = e, n.setExecutedActions(new a), L.sort(s(P)), function(e) {
          let t = (n, i, r) => {
            if (r >= e.length) {
              let e = new a;
              return n.forEach(t => {
                t.forEach(t => {
                  e.add(t)
                })
              }), e
            }
            let o = null;
            return e[r].forEachCandidateActions(P, e => {
              let l = i.clone(),
                s = l.getExecutedActions();
              if (e.forEach(e => {
                  s.add(e)
                }), !B.call(this, l)) return !1;
              let u = i.clone();
              u.setExecutedActions(new a);
              let c = u.getState();
              return g(this, e, c), u.setState(c), !!B.call(this, u) && (o = t(n.concat([e]), l, r + 1), !0)
            }), null !== o ? o : t(n, i, r + 1)
          };
          return t([], n, 0)
        }.call(this, L))).then(i => (M = new a, i.forEach(e => {
          M.add(e)
        }), I = new a, function() {
          let e = new a;
          if (void 0 === k[P]) return e;
          let t = n.clone();
          return t.setExecutedActions(e), k[P].forEach(n => {
            let i = n.action,
              r = new a;
            r.add(i), e.add(i);
            let o = t.clone(),
              l = o.getState();
            o.setExecutedActions(new a), g(this, r, l), o.setState(l), B.call(this, t) && B.call(this, o) || (e.remove(i), _.notify("warning", {
              type: "observation.reject",
              message: h("engine.rejectObservationWarning", i, P, P + 1)
            }));
            let s = P + 1;
            n.endTime > s && (void 0 === k[s] && (k[s] = []), k[s].push(n))
          }), e
        }.call(this).forEach(e => {
          i.add(e), I.add(e)
        }), n.setExecutedActions(i), X = e, R = t, Promise.resolve()))
      };
      this.getProfiler = function() {
        return F
      }, this.getCurrentTime = function() {
        return P
      }, this.getMaxTime = function() {
        return S
      }, this.setMaxTime = function(e) {
        if (N) throw h.error("engine.updatingParametersWhileRunning", "max cycle time");
        if (e <= 0 || !Number.isInteger(e)) throw h.error("engine.nonPositiveIntegerMaxTime", e);
        S = e
      }, this.isInCycle = function() {
        return A
      }, this.isRunning = function() {
        return N
      }, this.isPaused = function() {
        return j
      }, this.getCycleInterval = function() {
        return V
      }, this.setCycleInterval = function(e) {
        if (N) throw h.error("engine.updatingParametersWhileRunning", "cycle interval");
        if ("number" != typeof e) throw h.error("engine.parameterInvalidType", 1, "Engine.setCycleInterval", "number", typeof val);
        if (e <= 0 || !Number.isInteger(e)) throw h.error("engine.nonPositiveIntegerCycleInterval", e);
        V = e
      }, this.isContinuousExecution = function() {
        return C
      }, this.setContinuousExecution = function(e) {
        if (N) throw h.error("engine.updatingParametersWhileRunning", "continuous execution mode");
        if ("boolean" != typeof e) throw h.error("engine.parameterInvalidType", 1, "Engine.setContinuousExecution", "boolean", typeof e);
        C = e
      }, this.getLastCycleActions = function() {
        let e = [];
        return null === X ? e : (X.forEach(x(e)), e)
      }, this.getLastCycleObservations = function() {
        let e = [];
        return null === R ? e : (R.forEach(x(e)), e)
      }, this.getTimelessFacts = function() {
        let e = [];
        return n.getFacts().forEach(x(e)), e
      }, this.getActiveFluents = function() {
        let e = [];
        return n.getState().forEach(x(e)), e
      }, this.query = function(e, t) {
        try {
          let i = e;
          return "fluent" === t ? n.getState().unifies(i) : "action" === t ? X.unifies(i) : "observation" === t ? R.unifies(i) : n.query(i, this)
        } catch (e) {
          this.halt(), _.notify("error", e)
        }
        return []
      }, this.hasHalted = function() {
        return null !== S && P >= S
      }, this.halt = function() {
        S = P, j && _.notify("done", this), j = !1
      }, this.step = function() {
        if (A) {
          this.halt();
          let e = h.error(["engine", "cycleIntervalExceeded"], [V]);
          return Promise.reject(e)
        }
        if (j) return Promise.resolve();
        if (this.hasHalted()) return Promise.resolve();
        _.notify("preCycle", this), F.set("lastCycleNumFiredRules", 0), F.set("lastCycleNumFailedGoals", 0), F.set("lastCycleNumResolvedGoals", 0), F.set("lastCycleNumNewRules", 0), F.set("lastCycleNumDiscardedRules", 0), A = !0;
        let e = Date.now();
        return q.call(this).then(() => {
          F.set("lastCycleExecutionTime", Date.now() - e), F.set("numState", n.getState().size()), F.set("lastCycleNumUnresolvedGoals", L.length), F.set("lastCycleNumActions", X.size()), F.set("lastCycleNumObservations", R.size()), A = !1, _.notify("postCycle", this)
        })
      };
      let G = () => {
          let e = () => {
            if (j || this.hasHalted()) return;
            let n = setTimeout(e, V);
            this.step().then(() => {
              this.hasHalted() ? _.notify("done", this) : (clearTimeout(n), t(e))
            }).catch(e => {
              this.halt(), clearTimeout(n), _.notify("error", e)
            })
          };
          t(e)
        },
        D = () => {
          let e = setInterval(() => {
            if (this.hasHalted()) return clearInterval(e), void _.notify("done", this);
            j ? clearInterval(e) : this.step().catch(t => {
              clearInterval(e), _.notify("error", t)
            })
          }, V)
        };
      this.run = function() {
        if (S <= 0) throw h.error("engine.maxTimeInvalid", S);
        this.hasHalted() || (N = !0, _.notify("run", this), C ? G() : D())
      }, this.define = function(e, t) {
        if (N) throw h.error("engine.definePredicatesWhileRunning");
        H.define(e, t)
      }, this.getFunctorProvider = function() {
        return H
      }, this.on = function(e, t) {
        return _.addListener(e, t), this
      }, this.observe = function(e) {
        let t = P;
        0 === t && (t = 1), this.scheduleObservation(e, t)
      }, this.pause = function() {
        this.hasHalted() || (j = !0, _.notify("paused", this), F.increment("numPaused"))
      }, this.unpause = function() {
        this.hasHalted() || (j = !1, _.notify("unpaused", this), C ? G() : D())
      }, this.loadModule = function(e) {
        if (N) throw h.error("engine.definePredicatesWhileRunning");
        if ("function" != typeof e) throw h.error("engine.loadModuleInvalidType");
        return e(this, n)
      }, this.scheduleObservation = function(e, t, n) {
        let i = t,
          r = n;
        if (void 0 === i || i < P) throw h.error("engine.invalidStartTimeObservationScheduling", [e, i, P]);
        if (i === P && A && (i += 1), void 0 === r && (r = i + 1), r <= i) throw h.error("engine.invalidObservationScheduling", [e, i, r]);
        void 0 === k[i] && (k[i] = []);
        let a = e => {
          let t = e;
          k[i].push({
            action: t,
            endTime: r
          })
        };
        e instanceof Array ? e.forEach(e => {
          a(e)
        }) : a(e)
      }, this.on("loaded", () => {
        y(this, n), w(this, n), b(this, n), p(this, n), v(this, n)
      });
      let U = !1;
      this.load = function() {
        return U ? Promise.reject(h.error("engine.loadingLoadedEngine")) : (U = !0, E(this, n), m(this, n).then(() => i.browser ? Promise.resolve() : r("engine/processors/consult")(this, n)).then(() => _.notify("loaded", this)).then(() => (_.notify("ready", this), Promise.resolve(this))))
      }, F.set("numPaused", 0)
    }
  }).call(this, n(10).setImmediate, n(1))
}, function(e, t, n) {
  (function(e) {
    var i = void 0 !== e && e || "undefined" != typeof self && self || window,
      r = Function.prototype.apply;

    function a(e, t) {
      this._id = e, this._clearFn = t
    }
    t.setTimeout = function() {
      return new a(r.call(setTimeout, i, arguments), clearTimeout)
    }, t.setInterval = function() {
      return new a(r.call(setInterval, i, arguments), clearInterval)
    }, t.clearTimeout = t.clearInterval = function(e) {
      e && e.close()
    }, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
      this._clearFn.call(i, this._id)
    }, t.enroll = function(e, t) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = t
    }, t.unenroll = function(e) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
    }, t._unrefActive = t.active = function(e) {
      clearTimeout(e._idleTimeoutId);
      var t = e._idleTimeout;
      t >= 0 && (e._idleTimeoutId = setTimeout(function() {
        e._onTimeout && e._onTimeout()
      }, t))
    }, n(68), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
  }).call(this, n(11))
}, function(e, t) {
  var n;
  n = function() {
    return this
  }();
  try {
    n = n || Function("return this")() || (0, eval)("this")
  } catch (e) {
    "object" == typeof window && (n = window)
  }
  e.exports = n
}, function(e, t) {
  e.exports = function e(t, n) {
    let i = t,
      r = n,
      a = 0,
      o = null;
    void 0 === r ? r = [] : a = n.length, this.getName = function() {
      return i
    }, this.getId = function() {
      return i + "/" + a
    }, this.evaluate = function() {
      return this.toString()
    }, this.getGoal = function() {
      return this
    }, this.getArgumentCount = function() {
      return a
    }, this.getVariables = function() {
      return Object.keys(this.getVariableHash())
    }, this.getVariableHash = function(e) {
      let t = e;
      if (null !== o) return void 0 === t ? o : (Object.keys(o).forEach(e => {
        t[e] = !0
      }), t);
      void 0 === t && (t = {});
      let n = {};
      return r.forEach(e => {
        e.getVariableHash(t), e.getVariableHash(n)
      }), o = n, t
    }, this.isGround = function() {
      let e = !0;
      for (let t = 0; t < a; t += 1)
        if (!r[t].isGround()) {
          e = !1;
          break
        } return e
    }, this.getArguments = function() {
      return r.concat()
    }, this.substitute = function(t) {
      let n = r.map(e => e.substitute(t));
      return new e(i, n)
    }, this.toString = function() {
      let e = i;
      if (a > 0) {
        e += "(";
        for (let t = 0; t < a; t += 1) e += r[t].toString(), t < a - 1 && (e += ", ");
        e += ")"
      }
      return e
    }
  }
}, function(e, t, n) {
  const i = n(0)("engine/Functor"),
    r = /^[^\s_A-Z][^\s]*\/[0-9]*$/;
  e.exports = function(e) {
    let t = {};
    this.load = function(e) {
      Object.keys(e).forEach(t => {
        let n = e[t];
        n instanceof Array ? n.forEach(e => {
          this.define(t, e)
        }) : this.define(t, n)
      })
    }, this.define = function(e, n) {
      if ("" === e || "string" != typeof e) throw new Error('Invalid name "' + e + '" given for functor definition');
      if (!(n instanceof Function)) throw new Error("Invalid function provided");
      let i = e;
      if (-1 === i.indexOf("/") && (i += "/" + n.length), !r.test(i)) throw new Error('Invalid name "' + i + '" given for functor definition');
      void 0 === t[i] && (t[i] = []), t[i].push(n)
    }, this.has = function(e) {
      let n = e;
      return e instanceof i && (n = e.getId()), void 0 !== t[n] && t[n].length > 0
    }, this.execute = function(e) {
      let n = e.getId(),
        i = e.getArguments(),
        r = !1,
        a = [];
      if (void 0 !== t[n] && (r = !0, t[n].forEach(e => {
          a = a.concat(e.apply(this, i))
        })), !r) throw new Error('Call to undefined functor "' + n + '"');
      return a
    }, this.getEngine = function() {
      return e
    }
  }
}, function(e, t, n) {
  (function(t) {
    const i = n(0),
      r = i("engine/LiteralTreeMap"),
      a = i("engine/Resolutor"),
      o = i("engine/Functor"),
      l = i("engine/Timable"),
      s = i("engine/Value"),
      u = i("engine/Variable"),
      c = i("utility/variableArrayRename"),
      f = i("utility/compactTheta"),
      h = i("utility/dedupeConjunction"),
      d = i("utility/sortTimables"),
      g = i("utility/resolveTimableThetaTiming"),
      m = i("utility/hasExpiredTimable"),
      p = i("utility/expandLiteral"),
      b = i("engine/ConjunctionMap"),
      v = function(e, t, n) {
        return p(e, t, n)
      },
      y = function(e, t, n, i) {
        let r = [t.getFacts(), t.getState(), t.getExecutedActions()],
          o = e.getFunctorProvider(),
          l = [];
        return function e(u, c, h) {
          if (0 === u.length) {
            if (c.length === n.length) return !0;
            let e = c.map(e => e.substitute(h));
            return l.push({
              conjuncts: e,
              theta: h
            }), !0
          }
          let d = Object.assign({}, h),
            m = u[0].substitute(d),
            p = g(m, d, i),
            b = m.getGoal().substitute(p),
            v = t.isAction(b),
            y = u.slice(1);
          if (v) {
            let t = m.getStartTime();
            if (t instanceof s && t.evaluate() === i) return e(y, c.concat([m]), h)
          }
          let w = a.queryState(b, o, r);
          if (0 === w.length) return !1;
          let E = m.getVariables(),
            T = 0;
          return w.forEach(t => {
            let n = t,
              i = {};
            E.forEach(e => {
              void 0 !== n.theta[e] && (i[e] = n.theta[e])
            }), n.theta = i;
            let r = f(d, n.theta);
            e([], c.concat(y), r) || (T += 1)
          }), T < w.length
        }(n, [], {}) ? l : null
      },
      w = function(e, t, n, i, o) {
        let l = [{
          theta: {},
          unresolved: [],
          candidates: []
        }];
        for (let i = 0; i < e.length; i += 1) {
          let r = e[i],
            o = r.getGoal();
          if (!t.isAction(o)) return 0;
          0;
          let s = [];
          l.forEach(e => {
            let t = o.substitute(e.theta);
            a.handleBuiltInFunctorArgumentInLiteral(n, t).forEach(t => {
              s.push({
                theta: e.theta,
                unresolved: e.unresolved,
                candidates: e.candidates.concat([t])
              })
            })
          }), l = s
        }
        let s = 0;
        return l.forEach(e => {
          let t = new r;
          e.candidates.forEach(e => {
            s += 1, t.add(e)
          }), o.push(e.unresolved.map(t => t.substitute(e.theta))), i.push(t)
        }), s
      },
      E = function(e, t) {
        let n = !1;
        for (let i = 0; i < e.length; i += 1) {
          let r = e[i];
          if (!(r instanceof l)) continue;
          let a = r.getStartTime();
          if (a instanceof s && a.evaluate() < t) {
            n = !0;
            break
          }
        }
        return n
      },
      T = function(e, t) {
        let n = [];
        return t.forEach(t => {
          let i = [],
            r = (n, s) => {
              if (s >= n.length) return void i.push([n, t[1]]);
              let u = n[s].getGoal(),
                c = !0,
                f = !1;
              if (u.getArguments().forEach(e => {
                  e instanceof o && !e.isGround() && (c = !1), e instanceof o && (f = !0)
                }), f && c) {
                a.handleBuiltInFunctorArgumentInLiteral(e, u).forEach(e => {
                  let t = n.concat();
                  n[s] instanceof l ? t[s] = new l(e, n[s].getStartTime(), n[s].getEndTime()) : t[s] = e, r(t, s + 1)
                })
              } else r(n, s + 1)
            };
          r(t[0], 0), n = n.concat(i)
        }), n
      };
    let x = function(e) {
      let t = {};
      for (let n = 0; n < e.length; n += 1) e[n].getVariableHash(t);
      return t = Object.keys(t), c(t)
    };

    function S(e, t, n, i) {
      this.conjuncts = h(n), this.theta = i, this.children = [], this.hasBranchFailed = !1, this.renameTheta = x(this.conjuncts), this.getEarliestDeadline = function(e) {
        let t = null;
        if (this.hasBranchFailed) return null;
        if (0 === this.conjuncts.length) return -1;
        let n = n => {
          n instanceof u || (null === t || e <= n && n < t) && (t = n)
        };
        return 0 === this.children.length ? (this.conjuncts.forEach(e => {
          e instanceof l && n(e.getStartTime())
        }), t) : (this.children.forEach(t => {
          let i = t.getEarliestDeadline(e);
          null !== i && n(i)
        }), t)
      }, this.checkIfBranchFailed = function() {
        if (this.hasBranchFailed) return !0;
        if (0 === this.children.length) return !1;
        let e = 0;
        for (let t = 0; t < this.children.length; t += 1) this.children[t].checkIfBranchFailed() && (e += 1);
        return this.children.length > 0 && e === this.children.length && (this.hasBranchFailed = !0, !0)
      }, this.evaluate = function(n, i, r, a) {
        if (0 === this.conjuncts.length) return [
          [this.theta]
        ];
        let o = a.get(this.conjuncts);
        if (void 0 !== o) return null === o && (this.hasBranchFailed = !0), o;
        if (m(this.conjuncts, n)) return this.hasBranchFailed = !0, a.add(this.conjuncts, null), null;
        let s = d(this.conjuncts, n),
          u = s[0],
          c = s[1];
        if (0 === u.length) return i.push(this), r.push(this), a.add(this.conjuncts, []), [];
        let f = [],
          h = !1;
        for (let e = 0; e < u.length; e += 1) {
          let i = u[e],
            r = u.slice(0, e),
            a = u.slice(e + 1, u.length),
            o = v(i, t, this.renameTheta);
          if (0 === o.length) {
            if (i instanceof l && t.isAction(i.getGoal()) && !i.hasExpired(n + 1)) continue;
            break
          }
          for (let e = 0; e < o.length; e += 1) {
            let t = o[e],
              n = e => e.substitute(t.theta),
              i = r.map(n),
              l = a.map(n),
              s = c.map(n),
              u = i.concat(t.conjuncts).concat(l).concat(s);
            f.push([u, t.theta])
          }
          h = !0;
          break
        }
        let g = u[0] instanceof l && u[0].isAnytime(),
          p = y(e, t, u, n);
        if (!h && null === p && !g) return this.hasBranchFailed = !0, a.add(this.conjuncts, null), null;
        null !== p && p.forEach(e => {
          let t = c.map(t => t.substitute(e.theta)),
            n = e.conjuncts.concat(t);
          f.push([n, e.theta])
        });
        let b = T(e.getFunctorProvider(), f).map(n => new S(e, t, n[0], n[1]));
        this.children = this.children.concat(b);
        let w = 0;
        for (let e = 0; e < b.length; e += 1) {
          let t = b[e].evaluate(n, i, r, a);
          if (null === t || 0 === t.length) {
            null === t && (w += 1);
            continue
          }
          let o = [];
          return t.forEach(e => {
            o.push([this.theta].concat(e))
          }), a.add(this.conjuncts, o), o
        }
        return !g && b.length > 0 && w === b.length ? (a.add(this.conjuncts, null), this.hasBranchFailed = !0, null) : (0 === b.length && i.push(this), 0 === b.length || !h && g ? r.push(this) : a.add(this.conjuncts, []), [])
      }
    }
    e.exports = function(e, n, i, r) {
      let a, o = [a = i instanceof S ? i : new S(e, n, i, {})],
        l = [a],
        s = new b;
      s.add(i, null), this.isSameRootConjunction = function(e) {
        return null === s.get(e)
      }, this.getEarliestDeadline = function(e) {
        let t = null;
        for (let n = 0; n < l.length; n += 1) {
          let i = l[n].getEarliestDeadline(e);
          (null === t || i < t) && (t = i)
        }
        return t
      }, this.getRootClause = function() {
        return a.conjuncts.map(e => "" + e)
      }, this.evaluate = function(e, n) {
        return new Promise(i => {
          0 !== l.length ? t(() => {
            o = [];
            let t = [],
              r = [];
            for (let i = 0; i < l.length; i += 1) {
              let a = l[i].evaluate(e, o, t, n);
              if (null !== a && 0 !== a.length) {
                r = a;
                break
              }
            }
            l = t, i(r)
          }) : i(null)
        })
      }, this.forEachCandidateActions = function(t, i) {
        let r = e.getFunctorProvider(),
          a = !1;
        for (let e = 0; e < o.length; e += 1) {
          let l = o[e],
            s = [],
            u = [],
            c = d(l.conjuncts, t)[0];
          if (!E(c, t - 1) && 0 !== w(c, n, r, s, u)) {
            for (let e = 0; e < s.length && !(a = i(s[e])); e += 1);
            if (a) break
          }
        }
      }, this.toJSON = function() {
        return JSON.stringify({
          birth: r,
          root: function e(t) {
            let n = [];
            return t.children.forEach(t => {
              let i = e(t);
              n.push(i)
            }), 0 === n.length ? {
              hasFailed: t.hasBranchFailed,
              conjuncts: "" + t.conjuncts
            } : {
              hasFailed: t.hasBranchFailed,
              conjuncts: "" + t.conjuncts,
              children: n
            }
          }(a)
        })
      }
    }
  }).call(this, n(10).setImmediate)
}, function(e, t, n) {
  const i = n(0)("engine/Variable");
  e.exports = function e(t, n) {
    let r = t,
      a = n,
      o = null;
    void 0 === n && (a = null), this.getHead = function() {
      return r.concat()
    }, this.getTail = function() {
      return a
    }, this.isGround = function() {
      if (null !== a) return a.isGround();
      for (let e = 0; e < r.length; e += 1)
        if (!r[e].isGround()) return !1;
      return !0
    }, this.getVariables = function() {
      return Object.keys(this.getVariableHash())
    }, this.getVariableHash = function(t) {
      let n = t;
      if (null !== o) return void 0 === n ? o : (Object.keys(o).forEach(e => {
        n[e] = !0
      }), n);
      void 0 === n && (n = {});
      let l = {};
      const s = function(e) {
        e.getVariableHash(l), e.getVariableHash(n)
      };
      return r.forEach(s), a instanceof e ? s(a) : a instanceof i && (l[a.evaluate()] = !0, n[a.evaluate()] = !0), o = l, n
    }, this.substitute = function(n) {
      let r = t.map(e => e.substitute(n)),
        o = a;
      return (o instanceof e || o instanceof i) && (o = o.substitute(n)), new e(r, o)
    }, this.flatten = function() {
      let t = [];
      return r.length > 0 && (t = t.concat(r), a instanceof e && (t = t.concat(a.flatten()))), t
    }, this.isEmpty = function() {
      return 0 === r.length && a instanceof e && a.isEmpty()
    }, this.toString = function() {
      let t = "";
      t += "[";
      for (let e = 0; e < r.length; e += 1) t += r[e], e < r.length - 1 && (t += ", ");
      return null === a || a instanceof e && a.isEmpty() || (t += "|" + a.toString()), t += "]"
    }
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Functor"),
    a = i("engine/Timable"),
    o = i("engine/List"),
    l = i("engine/Value"),
    s = i("engine/Variable");

  function u() {}

  function c(e, t) {
    this._size = e, this._tree = t, void 0 === this._size && (this._size = 0), void 0 === this._tree && (this._tree = {}), this.clone = function() {
      let e = new c(this._size, {});
      return this.indices().forEach(t => {
        let n = this._tree[t];
        e._tree[t] = n instanceof c ? n.clone() : function e(t) {
          return t instanceof Array ? t.map(t => e(t)) : t
        }(n)
      }), e
    }, this.indices = function() {
      return Object.getOwnPropertySymbols(this._tree).concat(Object.getOwnPropertyNames(this._tree))
    }
  }
  let f = e => {
      if (!(e instanceof c)) return [e];
      let t = [];
      return e.indices().forEach(n => {
        t = t.concat(f(e._tree[n]))
      }), t
    },
    h = (e, t) => {
      let n = e;
      void 0 === n._tree[t] && (n._size += 1, n._tree[t] = new c)
    };
  e.exports = function e() {
    let t = new c,
      n = 0,
      i = null,
      d = {},
      g = {},
      m = {};
    this.add = function(u, c) {
      let f = t,
        p = c;
      void 0 === p && (p = u);
      let b = u;
      u instanceof o ? b = u.flatten() : (u instanceof r || u instanceof a) && (h(f, u.getName()), f = f._tree[u.getName()], b = u.getArguments());
      let v = b.length;
      if (h(f, b.length), 0 === b.length) return n += 1, f._size += 1, void(f._tree[v] = p);
      b.forEach((t, n) => {
        f = f._tree[v];
        let r = null,
          a = t instanceof s;
        if (t instanceof l || a) {
          if (a) {
            let e = t.evaluate();
            if (void 0 === g[e]) {
              let t = Symbol("var:" + e);
              g[e] = t
            }
            r = g[e]
          } else if ("number" == typeof(r = t.evaluate()))
            if (void 0 === m[String(r)]) {
              let e = Symbol("num:" + r);
              m[String(r)] = e, r = e
            } else r = m[String(r)]
        } else null === i ? i = new e : r = i.get(t), null === r && (r = Symbol(), d[r] = t, i.add(t, r));
        v = r, n !== b.length - 1 && h(f, r)
      }), void 0 === f._tree[v] ? (n += 1, f._size += 1, f._tree[v] = p) : f._tree[v] = p
    };
    let p = function(e) {
      let t = e,
        n = [];
      e instanceof o ? t = e.flatten() : (e instanceof r || e instanceof a) && (n.push(e.getName()), t = e.getArguments()), n.push(t.length);
      for (let e = 0; e < t.length; e += 1) {
        let r = t[e],
          a = null;
        if (r instanceof l || r instanceof s) {
          if (r instanceof s) {
            let e = r.evaluate();
            if (void 0 === g[e]) return null;
            a = g[e]
          } else if ("number" == typeof(a = r.evaluate())) {
            if (void 0 === m[String(a)]) return null;
            a = m[String(a)]
          }
        } else {
          if (null === i) return null;
          if (null === (a = i.get(r))) return null
        }
        n.push(a)
      }
      return n
    };
    this.get = function(e) {
      let n = p(e);
      if (null === n) return null;
      let i = n.length - 1,
        r = (e, t) => {
          if (t >= n.length) return null;
          if (0 === e._size) return null;
          let a = n[t];
          return void 0 === e._tree[a] ? null : t === i ? e._tree[a] : r(e._tree[a], t + 1)
        };
      return r(t, 0)
    }, this.contains = function(e) {
      let n = p(e);
      if (null === n) return !1;
      let i = n.length - 1,
        r = (e, t) => {
          if (t >= n.length) return !1;
          if (0 === e._size) return !1;
          let a = n[t];
          return void 0 !== e._tree[a] && (t === i || r(e._tree[a], t + 1))
        };
      return r(t, 0)
    }, this.remove = function(e) {
      let i = p(e);
      if (null === i) return !1;
      let r = i.length - 1,
        a = (e, t) => {
          let o = e;
          if (t >= i.length) return !1;
          if (0 === o._size) return !1;
          let l = i[t];
          return !(void 0 === o._tree[l] || (t === r ? (n -= 1, delete o._tree[l], 0) : !a(o._tree[l], t + 1) || (o._tree[l]._size -= 1, 0 !== o._tree[l]._size) || (delete o._tree[l], 0)))
        },
        o = n;
      return a(t, 0), n < o
    }, this.clear = function() {
      t = new c, n = 0, i = null, d = {}
    }, this.size = function() {
      return n
    }, this.toArray = function() {
      let e = [],
        n = t => {
          t instanceof c ? t.indices().forEach(e => {
            n(t._tree[e])
          }) : e.push(t)
        };
      return n(t), e
    }, this.forEach = function(e) {
      let n = t => {
        t instanceof r || t instanceof a || t instanceof Array ? e(t) : t.indices().forEach(e => {
          n(t._tree[e])
        })
      };
      n(t)
    };
    let b = e => {
        let t = e.toString();
        return t.substring(11, t.length - 1)
      },
      v = (e, t, n, i, r, a) => {
        let o, s = r,
          u = a,
          c = [];
        return n.indices().forEach(r => {
          if (e === r) return o = i(t, n._tree[r], s, u), void(c = c.concat(o));
          if ("symbol" != typeof r) return;
          let a = r.toString(),
            f = 0 === a.indexOf("Symbol(num:"),
            h = 0 === a.indexOf("Symbol(var:");
          if (!f && !h) return;
          if (f) {
            let a = Number(b(r));
            return void(e === a && (o = i(t, n._tree[r], s, u), c = c.concat(o)))
          }
          let d = b(r);
          if (void 0 !== u[d]) return void(u[d].evaluate() === e && (o = i(t, n._tree[r], s, u), c = c.concat(o)));
          let g = Object.assign({}, u);
          g[d] = new l(e), o = i(t, n._tree[r], s, g), c = c.concat(o)
        }), c
      },
      y = (t, n, l, s, u, c) => {
        let f, h = u,
          g = c,
          m = [];
        return null !== i && (f = i.unifies(t, g)).forEach(e => {
          let i = Object.assign({}, h),
            r = Object.assign({}, g);
          Object.keys(e.theta).forEach(t => {
            i[t] = e.theta[t]
          }), Object.keys(e.internalTheta).forEach(t => {
            r[t] = e.internalTheta[t]
          }), t instanceof o && void 0 !== e.tailVariable ? e.matchingTails.forEach(t => {
            if (void 0 === l._tree[t]) return;
            let a = d[t].flatten();
            a.splice(0, e.headEaten);
            let u = Object.assign({}, i);
            u[e.tailVariable.evaluate()] = new o(a), f = s(n, l._tree[t], u, r), m = m.concat(f)
          }) : void 0 !== l._tree[e.leaf] && (f = s(n, l._tree[e.leaf], i, r), m = m.concat(f))
        }), l.indices().forEach(i => {
          let u;
          if (void 0 === l._tree[i]) return;
          if ("symbol" != typeof i) return;
          let c = i.toString();
          if (0 !== c.indexOf("Symbol(var:")) return;
          let d = c.substring(11, c.length - 1);
          if (void 0 !== g[d]) {
            if (!(g[d] instanceof r || g[d] instanceof o || g[d] instanceof a)) return;
            let u = new e;
            return u.add(g[d]), void((f = u.unifies(t)).length > 0 && (f = s(n, l._tree[i], h, g), m = m.concat(f)))
          }(u = Object.assign({}, g))[d] = t, f = s(n, l._tree[i], h, u), m = m.concat(f)
        }), m
      },
      w = (e, t, n, i) => {
        let u = e.concat(),
          c = n,
          f = i;
        if (0 === u.length) return [{
          theta: c,
          internalTheta: f,
          leaf: t
        }];
        let h = u.shift(),
          g = typeof h;
        if ("string" === g || "number" === g) return void 0 === t._tree[h] ? [] : w(u, t._tree[h], c, f);
        if (h instanceof l) return v(h.evaluate(), u, t, w, c, f);
        let m, p = [];
        if (h instanceof s) {
          let e = h.evaluate();
          return void 0 !== c[e] ? c[e] instanceof r || c[e] instanceof a || c[e] instanceof o ? y(c[e], u, t, w, c, f) : v(c[e].evaluate(), u, t, w, c, f) : (t.indices().forEach(n => {
            let i, a, h = t._tree[n];
            if (void 0 === h) return;
            if ("symbol" != typeof n) return (a = Object.assign({}, c))[e] = new l(n), m = w(u, h, a, f), void(p = p.concat(m));
            let g = n.toString(),
              v = 0 === g.indexOf("Symbol(num:"),
              y = 0 === g.indexOf("Symbol(var:");
            if (v) {
              let t = Number(b(n));
              return (a = Object.assign({}, c))[e] = new l(t), m = w(u, h, a, f), void(p = p.concat(m))
            }
            if (y) {
              let t = b(n);
              return i = Object.assign({}, f), a = Object.assign({}, c), void 0 === f[t] ? void 0 === c[e] ? i[t] = new s(e) : i[t] = c[e] : a[e] = f[t], m = w(u, h, a, i), void(p = p.concat(m))
            }
            let E = d[n];
            a = Object.assign({}, c);
            let T = E;
            (E instanceof r || E instanceof o) && (T = T.substitute(f)), a[e] = T, m = w(u, h, a, f), p = p.concat(m)
          }), p)
        }
        return h instanceof r || h instanceof a || h instanceof o ? (m = y(h, u, t, w, c, f), p = p.concat(m)) : []
      };
    this.unifies = function(e, n) {
      let i = n;
      if (void 0 === i && (i = {}), !(e instanceof r || e instanceof a || e instanceof o)) throw new Error("Literal given for unification must be a functor, timable or list");
      if (e instanceof o) {
        let n, r = (e, t) => {
            let n = e.getHead();
            if (n.length > t) return null;
            let i = e.getTail();
            if (i instanceof o) {
              let e = r(i, t - n.length);
              return null === e ? {
                list: n,
                tail: i
              } : {
                list: n.concat(e.list),
                tail: e.tail
              }
            }
            let a = {
              list: [].concat(n),
              tail: null
            };
            return i instanceof s && (a.tail = i), a
          },
          a = [];
        t.indices().forEach(t => {
          let n = Number(t);
          if (Number.isNaN(n)) return;
          let i = r(e, n);
          if (null === i) return;
          let o = i.list;
          a.push({
            idx: t,
            path: o,
            tail: i.tail
          })
        });
        let l = [];
        return a.forEach(e => {
          if (void 0 === t._tree[e.idx]) return;
          let r = e.path.length;
          n = w(e.path, t._tree[e.idx], {}, i, {}), null !== e.tail && (n = n.map(t => {
            let n = t,
              i = f(n.leaf);
            return n.headEaten = r, n.tailVariable = e.tail, n.matchingTails = i, n
          })), l = l.concat(n)
        }), l
      }
      let l = function(e) {
        let t = e,
          n = [];
        return (e instanceof r || e instanceof a) && (n.push(e.getName()), t = e.getArguments()), n.push(t.length), n = n.concat(t)
      }(e);
      return w(l, t, {}, i, {})
    }, this.clone = function() {
      if (this instanceof u) return e => {
        n = e.count, t = e.root.clone(), i = null, m = Object.assign({}, e.numericMapping), g = Object.assign({}, e.variableMapping), d = {}, d = Object.assign({}, e.argumentClauses), null !== e.argumentTree && (i = e.argumentTree.clone())
      };
      let r = new e;
      return r.clone.call(new u)({
        root: t,
        count: n,
        argumentTree: i,
        argumentClauses: d,
        variableMapping: g,
        numericMapping: m
      }), r
    }
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Functor"),
    a = i("engine/Variable"),
    o = i("engine/Timable"),
    l = i("engine/Resolutor"),
    s = i("engine/LiteralTreeMap"),
    u = i("utility/strings");

  function c() {}
  const f = (e, t) => {
    let n = t;
    e.forEach(e => {
      let t = e.getHeadLiterals()[0],
        i = n[t.getId()];
      void 0 === i && (i = [], n[t.getId()] = i), i.push(e)
    })
  };
  e.exports = function e() {
    let t = [],
      n = [],
      i = {},
      h = [],
      d = new s,
      g = new s,
      m = new s,
      p = "",
      b = {},
      v = {},
      y = {};
    this.clone = function() {
      if (this instanceof c) return e => {
        b = Object.assign({}, e.fluents), v = Object.assign({}, e.actions), y = Object.assign({}, e.events), d = e.facts.clone(), t = e.rules.concat(), n = e.clauses.concat(), i = e.sortedClauses, h = e.constraints.concat(), g = e.state.clone(), m = e.executedActions.clone(), p = e.workingDirectory
      };
      let r = new e;
      return r.clone.call(new c)({
        fluents: b,
        actions: v,
        events: y,
        facts: d,
        rules: t,
        clauses: n,
        sortedClauses: i,
        constraints: h,
        state: g,
        executedActions: m,
        workingDirectory: p
      }), r
    };
    let w = function(e) {
        return void 0 !== b[e] || void 0 !== y[e] || void 0 !== v[e]
      },
      E = function(e) {
        let t = e;
        if (t instanceof o && (t = t.getGoal()), t instanceof r) {
          let e = t;
          for (; e instanceof r && "!/1" === e.getId();) e = e.getArguments()[0];
          t = e.getId()
        }
        return t
      };
    this.defineFluent = function(e) {
      let t = E(e);
      if (w(t)) throw new Error("Predicate " + t + " previously defined.");
      b[t] = !0
    }, this.defineAction = function(e) {
      let t = E(e);
      if (w(t)) throw new Error("Predicate " + t + " previously defined.");
      v[t] = !0
    }, this.defineEvent = function(e) {
      let t = E(e);
      if (w(t)) throw new Error("Predicate " + t + " previously defined.");
      y[t] = !0
    }, this.isFluent = function(e) {
      let t = E(e);
      return void 0 !== b[t]
    }, this.isAction = function(e) {
      let t = E(e);
      return void 0 !== v[t]
    }, this.isEvent = function(e) {
      let t = E(e);
      return void 0 !== y[t]
    }, this.isTimableUntimed = function(e) {
      let t = E(e),
        n = e.getArguments(),
        i = n.length;
      return void 0 !== b[t] ? n[i - 1] instanceof a : (void 0 !== v[t] || void 0 !== y[t]) && n[i - 2] instanceof a && n[i - 1] instanceof a
    }, this.isTimable = function(e) {
      let t = e;
      for (; t instanceof r && "!/1" === t.getId();) t = t.getArguments()[0];
      let n = E(t);
      return void 0 !== b[n] || void 0 !== v[n] || void 0 !== y[n]
    }, this.setWorkingDirectory = function(e) {
      p = e
    }, this.getWorkingDirectory = function() {
      return p
    }, this.getFacts = function() {
      return d
    }, this.setFacts = function(e) {
      d = e
    }, this.getClauses = function() {
      return n
    }, this.setClauses = function(e) {
      f(n = e, i = {})
    }, this.getConstraints = function() {
      return h
    }, this.setConstraints = function(e) {
      h = e
    }, this.setRules = function(e) {
      t = e
    }, this.getRules = function() {
      return t
    }, this.getState = function() {
      return g
    }, this.setState = function(e) {
      g = e
    }, this.getExecutedActions = function() {
      return m
    }, this.setExecutedActions = function(e) {
      m = e
    }, this.query = function(e, t, n) {
      return l.explain(e, this, t, n)
    }, this.getDefinitions = function(e) {
      let t = [],
        n = new s;
      n.add(e);
      let r = i[e.getId()];
      return void 0 === r ? [] : (r.forEach(e => {
        let i = e.getHeadLiterals()[0];
        n.unifies(i).forEach(n => {
          let r = n.theta,
            a = i.substitute(r),
            o = e.getBodyLiterals().map(e => e.substitute(r));
          t.push({
            headLiteral: a,
            theta: r,
            internalTheta: n.internalTheta,
            definition: o
          })
        })
      }), t)
    }, this.augment = function(r) {
      if (!(r instanceof e)) throw u.error("generic.parameterInvalidType", "program", "augment", "Program", typeof r);
      if (r === this) throw u.error("program.selfAugmentation");
      let a = r.getClauses();
      t = t.concat(r.getRules()), n = n.concat(a), f(a, i), h = h.concat(r.getConstraints()), r.getFacts().forEach(e => {
        d.add(e)
      })
    }
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Functor"),
    a = i("engine/Timable"),
    o = i("engine/LiteralTreeMap"),
    l = i("utility/compactTheta"),
    s = i("utility/sortTimables"),
    u = i("utility/resolveTimableThetaTiming");
  let c = {
    handleBuiltInFunctorArgumentInLiteral: function(e, t) {
      let n = t.getName(),
        i = t.getArguments(),
        a = [],
        o = (t, l) => {
          if (l >= i.length) return void a.push(new r(n, t));
          let s = i[l];
          if (s instanceof r && e.has(s.getId())) {
            let n = 0;
            return e.execute(s).forEach(e => {
              void 0 !== e.replacement && (n += 1, o(t.concat([e.replacement]), l + 1))
            }), void(0 === n && o(t.concat(s), l + 1))
          }
          o(t.concat([s]), l + 1)
        };
      return o([], 0), a
    },
    findUnifications: function(e, t) {
      let n = t;
      n instanceof o && (n = [n]);
      let i = [];
      for (let t = 0; t < n.length; t += 1) {
        let r = n[t].unifies(e);
        i = i.concat(r)
      }
      return i
    },
    explain: function(e, t, n, i) {
      let r = n.getFunctorProvider(),
        a = [t.getFacts(), t.getState(), t.getExecutedActions()];
      void 0 !== i && (i instanceof o ? a.push(i) : i instanceof Array && (a = a.concat(i)));
      let s = e;
      s instanceof Array || (s = [s]);
      let u = function(e, n) {
        let i = [];
        if (0 === e.length) return i.push({
          theta: n
        }), i;
        let s = e[0].substitute(n),
          f = s.getGoal(),
          h = c.queryState(f, r, a);
        if (t.getDefinitions(s).forEach(e => {
            let t = e.definition,
              n = e.headLiteral,
              i = u(t, {}),
              r = new o;
            i.forEach(e => {
              let t = n.substitute(e.theta);
              r.add(t)
            }), r.unifies(s).forEach(e => {
              h.push({
                theta: e.theta
              })
            })
          }), 0 === h.length) return [];
        let d = e.slice(1, e.length);
        return h.forEach(e => {
          let t = l(n, e.theta),
            r = u(d, t);
          i = i.concat(r)
        }), i
      };
      return u(s, {}, [])
    },
    queryState: function(e, t, n) {
      let i = [];
      return c.handleBuiltInFunctorArgumentInLiteral(t, e).forEach(e => {
        t.has(e.getId()) && (i = i.concat(t.execute(e))), i = i.concat(c.findUnifications(e, n))
      }), i
    },
    reduceRuleAntecedent: function(e, t, n, i, r) {
      let o = e.getFunctorProvider(),
        f = function(e, t, i) {
          if (0 === t.length) return void e.push({
            theta: i,
            unresolved: []
          });
          let h = s(t, r),
            d = h[0],
            g = h[1];
          if (0 === d.length) {
            let t = g.map(e => e.substitute(i));
            return void e.push({
              theta: i,
              unresolved: t
            })
          }
          let m = Object.assign({}, i),
            p = d[0].substitute(m),
            b = d.slice(1, d.length).concat(g),
            v = u(p, m, r),
            y = p.getGoal().substitute(v),
            w = c.queryState(y, o, n);
          if (0 !== w.length) w.forEach(t => {
            let n = l(m, t.theta),
              i = b.map(e => e.substitute(n));
            f(e, i, n)
          });
          else {
            if (!(p instanceof a) || p.isInRange(r - 1)) return;
            e.push({
              theta: i,
              unresolved: t
            })
          }
        },
        h = i.getBodyLiterals(),
        d = [];
      return f(d, h, {}), d
    }
  };
  e.exports = c
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Variable"),
    a = i("engine/Value"),
    o = "occurs";
  e.exports = function e(t, n, i) {
    let l = n,
      s = i,
      u = null;
    this.getName = function() {
      return o
    }, this.getArguments = function() {
      return [t, l, s]
    }, this.getArgumentCount = function() {
      return 3
    }, this.getId = function() {
      return "occurs/3"
    }, this.getGoal = function() {
      return t
    }, this.getStartTime = function() {
      return l
    }, this.getEndTime = function() {
      return s
    }, this.isInRange = function(e) {
      return l instanceof r || l instanceof a && l.evaluate() <= e
    }, this.hasExpired = function(e) {
      return s instanceof a && s.evaluate() < e
    }, this.isAnytime = function() {
      return l instanceof r
    }, this.substitute = function(n) {
      return new e(t.substitute(n), l.substitute(n), s.substitute(n))
    }, this.getVariables = function() {
      return Object.keys(this.getVariableHash())
    }, this.getVariableHash = function(e) {
      let n = e;
      if (null !== u) return void 0 === n ? u : (Object.keys(u).forEach(e => {
        n[e] = !0
      }), n);
      void 0 === n && (n = {});
      let i = {};
      if (l instanceof r) {
        let e = l.evaluate();
        n[e] = !0, i[e] = !0
      }
      if (s instanceof r) {
        let e = s.evaluate();
        n[e] = !0, i[e] = !0
      }
      return t.getVariableHash(i), t.getVariableHash(n), u = i, n
    }, this.isEarlierThan = function(e) {
      let t = e.getStartTime();
      return !(l instanceof r || t instanceof r) && l.evaluate() < t.evaluate()
    }, this.isLaterThan = function(e) {
      let t = e.getStartTime();
      return !(l instanceof r || t instanceof r) && l.evaluate() > t.evaluate()
    }, this.toString = function() {
      return "occurs(" + t + ", " + l + ", " + s + ")"
    }
  }
}, function(e, t) {
  e.exports = function e(t) {
    let n = t;
    this.evaluate = function() {
      return n
    }, this.isGround = function() {
      return !0
    }, this.getVariables = function() {
      return []
    }, this.getVariableHash = function() {
      return {}
    }, this.substitute = function(t) {
      return new e(n)
    }, this.toString = function() {
      let e = n;
      return "string" == typeof n && (e = '"' + e.replace('"', '\\"') + '"'), e
    }
  }
}, function(e, t) {
  e.exports = function e(t) {
    let n = t;
    this.evaluate = function() {
      return n
    }, this.isGround = function() {
      return !1
    }, this.getVariables = function() {
      return [n]
    }, this.getVariableHash = function(e) {
      let t = e;
      return void 0 === t && (t = {}), t[n] = !0, t
    }, this.substitute = function(i) {
      return t in i ? i[t] : new e(n)
    }, this.toString = function() {
      return n
    }
  }
}, function(e, t, n) {
  (function(t, i) {
    const r = n(0),
      a = (r("engine/Program"), r("engine/Value")),
      o = r("parser/ProgramFactory"),
      l = n(6),
      s = ["declarations", "math", "list", "types"],
      u = o.literal("consult(File)");
    let c = {};
    e.exports = function(e, r) {
      let f = [];
      return s.forEach(e => {
        if (void 0 !== c[e]) return void r.augment(c[e]);
        let s;
        if (t.browser) {
          let t = n(69)(`./${e}.lps`);
          s = o.fromString(t).then(t => (c[e] = t, r.augment(t), Promise.resolve()))
        } else {
          let t = l.join(i, e + ".lps"),
            n = {
              File: new a(t)
            };
          r.getFacts().add(u.substitute(n)), s = Promise.resolve()
        }
        f.push(s)
      }), Promise.all(f)
    }
  }).call(this, n(1), "/")
}, function(e, t) {
  e.exports = "fluent(F)<-fluents(L),member(F,L).action(F)<-actions(L),member(F,L).event(F)<-events(L),member(F,L).observe(F,T,T2)<-observe(F,T),T2=T+1.loadModule(F)<-loadModules(L),member(F,L)."
}, function(e, t) {
  e.exports = "length(L,N)<-is_variable(N),N=length(L).length(L,N)<-notis_variable(N),N==length(L).append(A,B,C)<-is_variable(C),C=append(A,B).max_list([A],A).max_list([H|T],Max)<-length([H|T],N),N>1,max_list(T,M1),Max=max(M1,H).min_list([A],A).min_list([H|T],Max)<-length([H|T],N),N>1,min_list(T,M1),min(M1,H,Max).sum_list([],0).sum_list([H|T],S)<-sum_list(T,S1),S=S1+H."
}, function(e, t) {
  e.exports = "max(X,Y,Z)<-is_variable(Z),Z=max(X,Y).max(X,Y,Z)<-notis_variable(Z),Z==max(X,Y).min(X,Y,Z)<-is_variable(Z),Z=min(X,Y).min(X,Y,Z)<-notis_variable(Z),Z==min(X,Y).abs(X,V)<-is_variable(V),V=abs(X).abs(X,V)<-notis_variable(V),V==abs(X).sin(X,V)<-is_variable(V),V=sin(X).sin(X,V)<-notis_variable(V),V==sin(X).cos(X,V)<-is_variable(V),V=cos(X).cos(X,V)<-notis_variable(V),V==cos(X).tan(X,V)<-is_variable(V),V=tan(X).tan(X,V)<-notis_variable(V),V==tan(X).asin(X,V)<-is_variable(V),V=asin(X).asin(X,V)<-notis_variable(V),V==asin(X).acos(X,V)<-is_variable(V),V=acos(X).acos(X,V)<-notis_variable(V),V==acos(X).atan(X,V)<-is_variable(V),V=atan(X).atan(X,V)<-notis_variable(V),V==atan(X).sqrt(X,V)<-is_variable(V),V=sqrt(X).sqrt(X,V)<-notis_variable(V),V==sqrt(X).pow(X,Y,V)<-is_variable(V),V=pow(X,Y).pow(X,Y,V)<-notis_variable(V),V==pow(X,Y).mod(X,V)<-is_variable(V),V=mod(X).mod(X,V)<-notis_variable(V),V==mod(X).exp(X,V)<-is_variable(V),V=exp(X).exp(X,V)<-notis_variable(V),V==exp(X).log(X,V)<-is_variable(V),V=log(X).log(X,V)<-notis_variable(V),V==log(X).log2(X,V)<-is_variable(V),V=log2(X).log2(X,V)<-notis_variable(V),V==log2(X).floor(X,V)<-is_variable(V),V=floor(X).floor(X,V)<-notis_variable(V),V==floor(X).ceil(X,V)<-is_variable(V),V=ceil(X).ceil(X,V)<-notis_variable(V),V==ceil(X).round(X,V)<-is_variable(V),V=round(X).round(X,V)<-notis_variable(V),V==round(X).random(A)<-is_variable(A),A=random.randomInt(X,Y,A)<-A=randomInt(X,Y).pi(V)<-is_variable(V),V=pi.between(A,A,A).between(Low,High,Value)<-Low<High,Value>=Low,Value<=High.succ(N,N1)<-notis_variable(N),N>=0,notis_variable(N1),N1==N+1.succ(N,N1)<-notis_variable(N),N>=0,is_variable(N1),N1=N+1.succ(N,N1)<-is_variable(N),notis_variable(N1),N1>1,N=N1-1."
}, function(e, t) {
  e.exports = "atom_number(N,O)<-O=atom_number(N).atom_string(N,O)<-O=atom_string(N)."
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Value"),
    a = i("engine/Functor");
  e.exports = function(e) {
    if (!(e instanceof r || e instanceof a)) throw new Error("Must be value, " + e + " given")
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Variable"),
    a = i("engine/modules/core/resolveValue"),
    o = i("engine/modules/core/assertIsValue"),
    l = {
      ">/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l[">/2"](e, t))
        }), n;
        let s = a.call(this, t);
        return s instanceof Array ? (s.forEach(e => {
          n = n.concat(l[">/2"](i, e))
        }), n) : i instanceof r || s instanceof r ? [] : (o(i), o(s), Number(i.evaluate()) > Number(s.evaluate()) && n.push({
          theta: {}
        }), n)
      },
      ">=/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l[">=/2"](e, t))
        }), n;
        let s = a.call(this, t);
        return s instanceof Array ? (s.forEach(e => {
          n = n.concat(l[">=/2"](i, e))
        }), n) : i instanceof r || s instanceof r ? [] : (o(i), o(s), Number(i.evaluate()) >= Number(s.evaluate()) && n.push({
          theta: {}
        }), n)
      },
      "</2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["</2"](e, t))
        }), n;
        let s = a.call(this, t);
        return s instanceof Array ? (s.forEach(e => {
          n = n.concat(l["</2"](i, e))
        }), n) : i instanceof r || s instanceof r ? [] : (o(i), o(s), Number(i.evaluate()) < Number(s.evaluate()) && n.push({
          theta: {}
        }), n)
      },
      "<=/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["<=/2"](e, t))
        }), n;
        let s = a.call(this, t);
        return s instanceof Array ? (s.forEach(e => {
          n = n.concat(l["<=/2"](i, e))
        }), n) : i instanceof r || s instanceof r ? [] : (o(i), o(s), Number(i.evaluate()) <= Number(s.evaluate()) && n.push({
          theta: {}
        }), n)
      },
      "==/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["==/2"](e, t))
        }), n;
        let s = a.call(this, t);
        return s instanceof Array ? (s.forEach(e => {
          n = n.concat(l["==/2"](i, e))
        }), n) : i instanceof r || s instanceof r ? [] : (o(i), o(s), i.evaluate() === s.evaluate() && n.push({
          theta: {}
        }), n)
      },
      "!=/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["!=/2"](e, t))
        }), n;
        let s = a.call(this, t);
        return s instanceof Array ? (s.forEach(e => {
          n = n.concat(l["!=/2"](i, e))
        }), n) : i instanceof r || s instanceof r ? [] : (o(i), o(s), i.evaluate() != s.evaluate() && n.push({
          theta: {}
        }), n)
      },
      "@</2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["@</2"](e, t))
        }), n;
        let r = a.call(this, t);
        return r instanceof Array ? (r.forEach(e => {
          n = n.concat(l["@</2"](i, e))
        }), n) : (o(i), o(r), -1 === String(i.evaluate()).localeCompare(String(r.evaluate())) && n.push({
          theta: {}
        }), n)
      },
      "@=/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["@=/2"](e, t))
        }), n;
        let r = a.call(this, t);
        return r instanceof Array ? (r.forEach(e => {
          n = n.concat(l["@=/2"](i, e))
        }), n) : (o(i), o(r), 0 === String(i.evaluate()).localeCompare(String(r.evaluate())) && n.push({
          theta: {}
        }), n)
      },
      "@>/2": function(e, t) {
        let n = [],
          i = a.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(l["@>/2"](e, t))
        }), n;
        let r = a.call(this, t);
        return r instanceof Array ? (r.forEach(e => {
          n = n.concat(l["@>/2"](i, e))
        }), n) : (o(i), o(r), 1 === String(i.evaluate()).localeCompare(String(r.evaluate())) && n.push({
          theta: {}
        }), n)
      }
    };
  e.exports = l
}, function(e, t, n) {
  (function(t) {
    const n = {
      "write/1": function(e) {
        return t.stdout.write(String(e)), [{
          theta: {}
        }]
      },
      "writeln/1": function(e) {
        return t.stdout.write(String(e) + "\n"), [{
          theta: {}
        }]
      }
    };
    e.exports = n
  }).call(this, n(1))
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Value"),
    a = i("engine/Variable"),
    o = i("engine/List"),
    l = i("engine/modules/core/resolveValue"),
    s = i("engine/modules/core/assertIsValue"),
    u = function(e) {
      if (!(e instanceof o)) throw new Error("Must be list")
    },
    c = {
      "append/2": function(e, t) {
        let n = l.call(this, e),
          i = l.call(this, t);
        u(n), u(i);
        let r = n.flatten().concat(i.flatten());
        return [{
          theta: {},
          replacement: new o(r)
        }]
      },
      "length/1": function(e) {
        let t = l.call(this, e);
        return u(t), [{
          theta: {},
          replacement: new r(t.flatten().length)
        }]
      },
      "member/2": function(e, t) {
        let n = [],
          i = l.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(c["member/2"].call(this, e, t))
        }), n;
        let r = l.call(this, t);
        u(r);
        let o = r.flatten();
        if (i instanceof a) {
          let e = i.evaluate();
          for (let t = 0; t < o.length; t += 1) {
            let i = {};
            i[e] = o[t], n.push({
              theta: i
            })
          }
          return n
        }
        s(i);
        for (let e = 0; e < o.length; e += 1) o[e].evaluate() === i.evaluate() && n.push({
          theta: {}
        });
        return n
      }
    };
  e.exports = c
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Value"),
    a = i("engine/Variable"),
    o = i("engine/modules/core/resolveValue"),
    l = i("engine/modules/core/assertIsValue"),
    s = {
      "+/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["+/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        if (u instanceof Array) return u.forEach(e => {
          n = n.concat(s["+/2"].call(this, i, e))
        }), n;
        if (i instanceof a || u instanceof a) return [];
        l(i), l(u);
        let c = i.evaluate(),
          f = u.evaluate();
        return "string" == typeof c || "string" == typeof f ? [{
          theta: {},
          replacement: new r(String(c) + String(f))
        }] : [{
          theta: {},
          replacement: new r(Number(c) + Number(f))
        }]
      },
      "-/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["-/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["-/2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Number(i.evaluate()) - Number(u.evaluate()))
        }])
      },
      "*/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["*/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["*/2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Number(i.evaluate()) * Number(u.evaluate()))
        }])
      },
      "//2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["//2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["//2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Number(i.evaluate()) / Number(u.evaluate()))
        }])
      },
      "mod/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["mod/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["mod/2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Number(i.evaluate()) % Number(u.evaluate()))
        }])
      },
      "**/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["**/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["**/2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Math.pow(Number(i.evaluate()), Number(u.evaluate())))
        }])
      },
      "-/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["-/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(-Number(n.evaluate()))
        }])
      },
      "abs/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["abs/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.abs(Number(n.evaluate())))
        }])
      },
      "sin/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["sin/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.sin(n.evaluate()))
        }])
      },
      "asin/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["asin/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.asin(n.evaluate()))
        }])
      },
      "cos/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["cos/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.cos(Number(n.evaluate())))
        }])
      },
      "acos/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["acos/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.acos(Number(n.evaluate())))
        }])
      },
      "tan/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["tan/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.tan(Number(n.evaluate())))
        }])
      },
      "atan/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["atan/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.atan(Number(n.evaluate())))
        }])
      },
      "sqrt/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["sqrt/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.sqrt(Number(n.evaluate())))
        }])
      },
      "pow/2": function(e, t) {
        return s["**/2"].call(this, e, t)
      },
      "max/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["max/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["max/2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Math.max(Number(i.evaluate()), Number(u.evaluate())))
        }])
      },
      "min/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["min/2"].call(this, e, t))
        }), n;
        let u = o.call(this, t);
        return u instanceof Array ? (u.forEach(e => {
          n = n.concat(s["min/2"].call(this, i, e))
        }), n) : i instanceof a || u instanceof a ? [] : (l(i), l(u), [{
          theta: {},
          replacement: new r(Math.min(Number(i.evaluate()), Number(u.evaluate())))
        }])
      },
      "exp/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["exp/1"].call(this, e))
        }), t) : (l(n), [{
          theta: {},
          replacement: new r(Math.exp(Number(n.evaluate())))
        }])
      },
      "log/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["log/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.log(Number(n.evaluate())))
        }])
      },
      "log2/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["log2/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.log2(Number(n.evaluate())))
        }])
      },
      "floor/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["floor/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.floor(Number(n.evaluate())))
        }])
      },
      "ceil/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["ceil/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.ceil(Number(n.evaluate())))
        }])
      },
      "round/1": function(e) {
        let t = [],
          n = o.call(this, e);
        return n instanceof Array ? (n.forEach(e => {
          t = t.concat(s["round/1"].call(this, e))
        }), t) : n instanceof a ? [] : (l(n), [{
          theta: {},
          replacement: new r(Math.round(Number(n.evaluate())))
        }])
      },
      "random/0": function() {
        return [{
          theta: {},
          replacement: new r(Math.random())
        }]
      },
      "randomInt/2": function(e, t) {
        let n = [],
          i = o.call(this, e);
        if (i instanceof Array) return i.forEach(e => {
          n = n.concat(s["randomInt/2"].call(this, e, t))
        }), n;
        let a = o.call(this, t);
        if (a instanceof Array) return a.forEach(e => {
          n = n.concat(s["randomInt/2"].call(this, i, e))
        }), n;
        if (i.evaluate() > a.evaluate()) return s["randomInt/2"].call(this, a, i);
        l(i), l(a);
        let u = Math.random() * (a.evaluate() - i.evaluate()) + i.evaluate();
        return [{
          theta: {},
          replacement: new r(Math.round(u))
        }]
      },
      "pi/0": function() {
        return [{
          theta: {},
          replacement: new r(Math.PI)
        }]
      }
    };
  e.exports = s
}, function(e, t, n) {
  const i = n(0)("engine/Functor");
  e.exports = function(e) {
    let t = e;
    if (t instanceof i && this.has(t.getId())) {
      let e = this.execute(t);
      t = [], e.forEach(e => {
        void 0 !== e.replacement && t.push(e.replacement)
      })
    }
    return t
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/List"),
    a = i("engine/Value"),
    o = i("engine/Variable"),
    l = {
      "is_ground/1": function(e) {
        let t = [];
        return void 0 !== e.isGround && e.isGround() && t.push({
          theta: {}
        }), t
      },
      "is_variable/1": function(e) {
        let t = [];
        return e instanceof o && t.push({
          theta: {}
        }), t
      },
      "is_list/1": function(e) {
        let t = [];
        return e instanceof r && t.push({
          theta: {}
        }), t
      },
      "is_number/1": function(e) {
        let t = [];
        return e instanceof a && "number" == typeof e.evaluate() && t.push({
          theta: {}
        }), t
      },
      "is_integer/1": function(e) {
        let t = [];
        return e instanceof a && Number.isInteger(e.evaluate()) && t.push({
          theta: {}
        }), t
      },
      "is_float/1": function(e) {
        let t = [];
        return e instanceof a && Number(e.evaluate()) === e.evaluate() && e.evaluate() % 1 != 0 && t.push({
          theta: {}
        }), t
      },
      "atom_number/1": function(e) {
        let t = Number(e.evaluate());
        return Number.isNaN(t) ? [] : [{
          theta: {},
          replacement: new a(t)
        }]
      },
      "atom_string/1": function(e) {
        return [{
          theta: {},
          replacement: new a(String(e.evaluate()))
        }]
      }
    };
  e.exports = l
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Functor"),
    a = i("engine/List"),
    o = i("parser/ProgramFactory").literal("initially(F)"),
    l = (e, t, n) => {
      n instanceof r && e.isFluent(n) && t.add(n)
    };
  e.exports = function(e, t) {
    ((e, t) => {
      let n = e.query(o),
        i = t.getState();
      n.forEach(e => {
        if (void 0 === e.theta.F) return;
        let n = e.theta.F;
        n instanceof a ? n.flatten().forEach(e => {
          l(t, i, e)
        }) : l(t, i, n)
      })
    })(e, t)
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("parser/ProgramFactory"),
    a = i("engine/Value"),
    o = i("utility/strings"),
    l = r.literal("observe(O, ST, ET)");
  e.exports = function(e, t) {
    e.query(l).forEach(t => {
      if (void 0 === t.theta.O || void 0 === t.theta.ST || void 0 === t.theta.ET) return;
      let n = t.theta.O,
        i = t.theta.ST,
        r = t.theta.ET;
      if (!(i instanceof a)) throw new Error(o(["declarationProcessors", "observe", "invalidStartTimeValue"]));
      if (!(r instanceof a)) throw new Error(o(["declarationProcessors", "observe", "invalidEndTimeValue"]));
      let l = i.evaluate(),
        s = r.evaluate();
      if (s < l) throw new Error(o(["declarationProcessors", "observe", "invalidTimeOrdering"]));
      e.scheduleObservation(n, l, s)
    })
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Clause"),
    a = i("engine/Variable"),
    o = i("utility/variableArrayRename"),
    l = i("utility/expandRuleAntecedent");
  e.exports = function(e, t) {
    let n = [];
    t.getRules().forEach(e => {
      if (0 === e.getBodyLiteralsCount()) return void n.push(e);
      let i = e.getBodyLiterals(),
        s = [];
      if (l(s, i, [], t), 0 === s.length) return void n.push(e);
      let u = e.getHeadLiterals(),
        c = {};
      i.forEach(e => {
        e.getVariableHash(c)
      });
      let f = {},
        h = {};
      u.forEach(e => {
        e.getVariables().forEach(e => {
          c[e] && (f[e] = !0), h[e] = !0
        })
      }), s.forEach(e => {
        let t = {};
        e.literalSet.forEach(e => {
          e.getVariableHash(t)
        });
        let i = [];
        Object.keys(t).forEach(e => {
          void 0 !== h[e] && void 0 === f[e] && i.push(e)
        });
        let l = u.concat(),
          s = {};
        Object.keys(f).forEach(e => {
          s[e] = new a(e)
        }), e.thetaPath.forEach(e => {
          Object.keys(s).forEach(t => {
            if (s[t] instanceof a) {
              let n = s[t].evaluate();
              void 0 !== e[n] ? s[t] = e[n] : void 0 !== s[n] && (s[t] = s[n])
            }
          })
        });
        let c = o(i);
        l = l.map(e => e.substitute(s).substitute(c)), n.push(new r(l, e.literalSet))
      })
    }), t.setRules(n)
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Functor"),
    a = i("engine/Value"),
    o = i("parser/ProgramFactory"),
    l = o.literal("maxTime(X)"),
    s = o.literal("cycleInterval(X)"),
    u = o.literal("continuousExecution(X)"),
    c = (e, t, n) => {
      e.query(t).forEach(e => {
        void 0 !== e.theta.X && e.theta.X instanceof a && n(e.theta.X.evaluate())
      })
    };
  e.exports = function(e, t) {
    c(e, l, e.setMaxTime), c(e, s, e.setCycleInterval), (e => {
      e.query(u).forEach(t => {
        if (void 0 === t.theta.X || !(t.theta.X instanceof a || t.theta.X instanceof r)) return;
        let n = t.theta.X.evaluate();
        e.setContinuousExecution("yes" === n || "on" === n || "true" === n || 1 === n)
      })
    })(e)
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Clause"),
    a = i("parser/ProgramFactory"),
    o = i("utility/SyntacticSugar"),
    l = i("utility/createLiteralTimingMapper"),
    s = a.literal("fluent(X)"),
    u = a.literal("action(X)"),
    c = a.literal("event(X)"),
    f = (e, t, n, i) => {
      e.query(n).forEach(e => {
        void 0 !== e.theta.X && i(o.shorthand(e.theta.X))
      })
    };
  e.exports = function(e, t) {
    f(e, 0, s, t.defineFluent), f(e, 0, u, t.defineAction), f(e, 0, c, t.defineEvent);
    let n = l(t);
    ((e, t) => {
      let n = t.getRules();
      n = n.map(t => {
        let n = t.getBodyLiterals().map(e),
          i = t.getHeadLiterals().map(e);
        return new r(i, n)
      }), t.setRules(n)
    })(n, t), ((e, t) => {
      let n = t.getClauses();
      n = n.map(t => {
        let n = t.getBodyLiterals().map(e),
          i = t.getHeadLiterals().map(e);
        return new r(i, n)
      }), t.setClauses(n)
    })(n, t)
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("parser/ProgramFactory"),
    a = i("engine/Engine"),
    o = i("engine/Value"),
    l = i("engine/Functor"),
    s = i("engine/Variable"),
    u = i("engine/builtin/builtin"),
    c = i("engine/processors/observe"),
    f = i("utility/strings"),
    h = i("engine/modules/core"),
    d = function(e, t) {
      let n = t;
      if (n instanceof o && (n = new l("eq", [n])), !(n instanceof l) || n.getArgumentCount() < 1) throw f.error("tester.invalidValueForExpectedNumOf", n);
      switch (n.getId()) {
        case "eq/1":
        case "equal/1":
          return e === n.getArguments()[0].evaluate();
        case "not_eq/1":
        case "notequal/1":
        case "not_equal/1":
          return e !== n.getArguments()[0].evaluate();
        case "atleast/1":
        case "at_least/1":
        case "min/1":
          return e >= n.getArguments()[0].evaluate();
        case "atmost/1":
        case "at_most/1":
        case "max/1":
          return e <= n.getArguments()[0].evaluate();
        case "between/2":
          return n.getArguments()[0].evaluate() <= e && e <= n.getArguments()[1].evaluate();
        default:
          throw f.error("tester.unknownComparator", n)
      }
    },
    g = {
      fluent: "numState",
      action: "lastCycleNumActions",
      observation: "lastCycleNumObservations",
      firedRule: "lastCycleNumFiredRules",
      failedGoal: "lastCycleNumFailedGoals",
      resolvedGoal: "lastCycleNumResolvedGoals",
      unresolvedGoal: "lastCycleNumUnresolvedGoals"
    };
  e.exports = function(e) {
    let t = {},
      n = [],
      i = [],
      o = e.getProfiler(),
      l = function(e) {
        void 0 === t[e] && (t[e] = [])
      };
    this.test = function(m) {
      if (e.isRunning()) return Promise.reject(f.error("test.testWhileRunning"));
      let p, b;
      return t = {}, n = [], r.fromFile(m).then(e => (b = new a(p = e), h(b, p), u(b, p))).then(() => {
        c(b, p),
          function(n) {
            n.query(r.literal("expect(Type, T, F)"), e).forEach(e => {
              let n = e.theta.Type.evaluate(),
                i = e.theta.T.evaluate();
              l(i), t[i].push({
                literal: e.theta.F,
                type: n,
                endTime: i
              })
            })
          }(p),
          function(n) {
            n.query(r.literal("expect(Type, T1, T2, F)"), e).forEach(e => {
              let n, i = e.theta.T1.evaluate();
              n = void 0 === e.theta.T2 || e.theta.T2 instanceof s ? null : e.theta.T2.evaluate();
              let r = e.theta.Type.evaluate();
              if (null !== n && i > n) throw new Error("The start time must not be more than the end time specified in expect/4");
              l(i + 1), t[i + 1].push({
                literal: e.theta.F,
                type: r,
                endTime: n
              })
            })
          }(p),
          function(n) {
            n.query(r.literal("expect_num_of(Type, T, Num)"), e).forEach(e => {
              let n = e.theta.T.evaluate(),
                i = e.theta.Type.evaluate();
              l(n), t[n].push({
                num_of: e.theta.Num,
                type: i,
                endTime: n
              })
            })
          }(p),
          function(n) {
            n.query(r.literal("expect_num_of(Type, T1, T2, Num)"), e).forEach(e => {
              let n, i = e.theta.T1.evaluate();
              n = void 0 === e.theta.T2 || e.theta.T2 instanceof s ? null : e.theta.T2.evaluate();
              let r = e.theta.Type.evaluate();
              if (null !== n && i > n) throw new Error("The start time must not be more than the end time specified in expect/4");
              l(i + 1), t[i + 1].push({
                num_of: e.theta.Num,
                type: r,
                endTime: n
              })
            })
          }(p),
          function(t) {
            t.query(r.literal("expect(L)"), e).forEach(e => {
              n.push({
                fact: e.theta.L
              })
            })
          }(p),
          function(t) {
            t.query(r.literal("expect_num_cycles(N)"), e).forEach(e => {
              let t = e.theta.N;
              i.push(t)
            })
          }(p);
        let a = 0,
          u = 0,
          h = [],
          m = e.getMaxTime();
        return e.setContinuousExecution(!0), e.on("run", () => {
          n.forEach(t => {
            let n = !1;
            a += 1, void 0 !== t.fact && ((n = e.query(t.fact).length > 0) || h.push("Expecting " + t.fact + " to hold.")), n && (u += 1)
          })
        }), e.on("postCycle", () => {
          let n = e.getCurrentTime();
          void 0 !== t[n] && (t[n].forEach(i => {
            let r = !1;
            if (a += 1, void 0 !== i.literal && ((r = e.query(i.literal, i.type).length > 0) || h.push(f("tester.expectCycleQuery", i.type, i.literal, n))), void 0 !== i.num_of) {
              let e = 0,
                t = i.type.substring(0, i.type.length - 1);
              if (void 0 !== g[i.type]) e = o.get(g[i.type]);
              else {
                if (void 0 === g[t]) return void h.push(f("tester.invalidExpectationType", i.type));
                e = o.get(g[t])
              }(r = d(e, i.num_of)) || h.push(f("tester.expectNumOf", i.type, n, i.num_of, e))
            }
            if (r && (u += 1), null === i.endTime || i.endTime > n) {
              if (null === i.endTime && n + 1 > m) return;
              l(n + 1), t[n + 1].push(i)
            }
          }), delete t[n])
        }), new Promise(n => {
          e.on("done", () => {
            const r = Object.keys(t);
            r.length > 0 && (a += 1, h.push(f("tester.numNonExecutedExpectationCycles", r.length)), h.push(f("tester.nonExecutedExpectations", r.join(", "))));
            let o = e.getCurrentTime();
            i.forEach(e => {
              a += 1, d(o, e) ? u += 1 : h.push(f("tester.expectNumCycles", e, o))
            }), n({
              success: u === a,
              passed: u,
              total: a,
              errors: h
            })
          }), e.run()
        })
      })
    }
  }
}, function(e, t) {
  e.exports = function(e, t) {
    let n = e,
      i = t,
      r = [];
    this.getType = function() {
      return n
    }, this.getToken = function() {
      return i
    }, this.getChildren = function() {
      return r
    }, this.setToken = function(e) {
      i = e
    }, this.isLeaf = function() {
      return 0 === r.length
    }, this.addChild = function(e) {
      r.push(e)
    }, this.print = function(e) {
      let t = e;
      t || (t = 0), console.log(" ".repeat(t) + String(n) + (i ? ": " + i.value : "")), t += 1, r.forEach(e => {
        e.print(t)
      })
    }
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("parser/Scanner"),
    a = i("parser/Lexicon"),
    o = i("parser/TokenTypes");
  e.exports = function(e, t) {
    const n = new r(e),
      i = function() {
        let e = n.get(),
          t = null,
          i = n.lookahead();
        return null != i.c && (t = e.c + i.c), [e.c, t, e]
      };
    let l = i();
    const s = function(e) {
        let t = e,
          n = t[0];
        for (; a.whitespaces.indexOf(n) > -1;) n = (t = i())[0];
        return t
      },
      u = function(e) {
        let t = e,
          n = t[0],
          r = t[1],
          o = e => e[0] === n || e[0] === r,
          l = a.comments.filter(o);
        for (; l.length > 0;) {
          let e = l[0][0],
            s = l[0][1];
          for (t = i(), 2 === e.length && (t = i()), n = t[0], r = t[1]; n !== s && r !== s && null !== n;) t = i(), n = t[0], r = t[1];
          if (null === n) break;
          t = i(), 2 === s.length && (t = i()), n = t[0], r = t[1], l = a.comments.filter(o)
        }
        return t
      },
      c = function(e, n, i, r) {
        return {
          type: e,
          value: n,
          line: i,
          col: r,
          file: t
        }
      },
      f = function(e, n, i) {
        return {
          type: o.Error,
          value: e,
          line: n,
          col: i,
          file: t
        }
      },
      h = function(e, t) {
        let n = e,
          r = n[0];
        for (; null !== n[1] && t.test(n[1][1]);) r += (n = i())[0];
        return r
      },
      d = e => null !== e[1] && !!a.hexadecimalTest.test(e[1][1]),
      g = e => null !== e[1] && !!a.binaryTest.test(e[1][1]),
      m = function(e) {
        let t = "";
        for (let n = 0; n < e; n += 1) {
          if (chars = i(), !a.hexadecimalTest.test(chars[0])) return null;
          t += chars[0]
        }
        return parseInt(t, 16)
      };
    this.get = function() {
      let e = function(e) {
          let t = e,
            n = t;
          do {
            t = n, n = s(n), n = u(n)
          } while (n !== t);
          return t
        }(l),
        t = e[0],
        n = e[1];
      return null == t ? c(o.Eof, null, e[2].line, e[2].col) : a.numberStartTest.test(t) ? function(e) {
        let t = e,
          n = t[2].line,
          r = t[2].col,
          s = t[0],
          u = !0,
          f = "0" === t[0],
          h = !1,
          m = () => {
            if (null === t[1]) return !1;
            if (/[0-9]/.test(t[1][1])) {
              if (f) throw new Error("Unexpected number at line " + n + ", col " + r);
              return !0
            }
            if (t[1][1] === a.decimalSymbol) {
              if (h) throw new Error("Unexpected '.' at  line " + n + ", col " + r);
              if (f = !1, null !== (t = i())[1] && /[0-9]/.test(t[1][1])) return s += a.decimalSymbol, h = !0, !0;
              l = t, u = !1
            }
            return !1
          };
        if (f && t[1][1] === a.numberHexadecimalMarker) {
          for (s = "", t = i(); d(t);) t = i(), s += t[0];
          s = parseInt(s, 16)
        } else if (f && t[1][1] === a.numberBinaryMarker) {
          for (s = "", t = i(); g(t);) t = i(), s += t[0];
          s = parseInt(s, 2)
        } else
          for (; m();) t = i(), s += t[0];
        let p = c(o.Number, Number(s), n, r);
        return u && (l = i()), p
      }(e) : a.variableStartTest.test(t) ? function(e) {
        let t = e[2].line,
          n = e[2].col,
          r = h(e, a.variableBodyTest),
          s = c(o.Variable, r, t, n);
        return l = i(), s
      }(e) : a.constantDelimiters.indexOf(t) > -1 ? function(e) {
        let t = "",
          n = e,
          r = n[2].line,
          s = n[2].col,
          u = n[0];
        for (; null !== n[1] && n[1][1] !== u;) {
          if (n = i(), -1 !== a.constantInvalidCharacters.indexOf(n[0])) return f("Invalid character", n[2].line, n[2].col);
          if (n[0] === a.constantDelimiterEscapeChar)
            if ((n = i())[0] === a.constantHexadecimalMarker) {
              let e = m(2);
              if (null === e) return f("Invalid hexadecimal value", n[2].line, n[2].col);
              n[0] = String.fromCharCode(e)
            } else if (n[0] === a.constantUnicodeMarker) {
            let e = m(4);
            if (null === e) return f("Invalid hexadecimal value", n[2].line, n[2].col);
            n[0] = String.fromCharCode(e)
          } else {
            if (void 0 === a.singleCharacterMarkers[n[0]]) return f("Invalid escape character", n[2].line, n[2].col);
            n[0] = a.singleCharacterMarkers[n[0]]
          }
          t += n[0]
        }
        null !== n[1] && n[1][1] === u && i();
        let h = c(o.QuotedString, t, r, s);
        return l = i(), h
      }(e) : a.doubleSymbols.indexOf(n) > -1 ? function(e) {
        i();
        let t = c(o.Symbol, e[1], e[2].line, e[2].col);
        return l = i(), t
      }(e) : a.singleSymbols.indexOf(t) > -1 ? function(e) {
        let t = c(o.Symbol, e[0], e[2].line, e[2].col);
        return l = i(), t
      }(e) : a.unquotedConstantStartTest.test(t) ? function(e) {
        let t = e[2].line,
          n = e[2].col,
          r = h(e, a.unquotedConstantBodyTest),
          s = o.Constant;
        a.keywords.indexOf(r) > -1 && (s = o.Keyword);
        let u = c(s, r, t, n);
        return l = i(), u
      }(e) : f("Invalid character '" + t + "'", e[2].line, e[2].col)
    }
  }
}, function(e, t) {
  e.exports = {
    whitespaces: "\n\r\t ".split(""),
    comments: [
      ["/*", "*/"],
      ["%", "\n"],
      ["#", "\n"]
    ],
    singleSymbols: ["(", ")", ".", ";", ",", "-", "+", "*", "=", "/", "^", ">", "<", "!", "[", "]", "|"],
    doubleSymbols: ["->", "<-", "<=", ">=", "!=", "==", "**", "@<", "@>", "@="],
    constantDelimiters: ["'", '"'],
    keywords: ["not", "true", "false", "fail", "from", "to", "at"],
    constantDelimiterEscapeChar: "\\",
    constantInvalidCharacters: "\r\n\f\b\v".split(""),
    constantUnicodeMarker: "u",
    constantHexadecimalMarker: "x",
    singleCharacterMarkers: {
      n: "\n",
      t: "\t",
      r: "\r",
      f: "\f",
      v: "\v",
      "\\": "\\",
      "'": "'",
      '"': '"'
    },
    unquotedConstantStartTest: /^[^A-Z_()[\],.\s]$/,
    unquotedConstantBodyTest: /^[^()[\]\\+*/\-,.\s]$/,
    variableStartTest: /^[A-Z_]$/,
    variableBodyTest: /^[0-9a-zA-Z_]$/,
    numberStartTest: /^[0-9]$/,
    hexadecimalTest: /[0-9a-fA-F]/,
    binaryTest: /[01]/,
    decimalSymbol: ".",
    numberBinaryMarker: "b",
    numberHexadecimalMarker: "x",
    numberPositiveExponentialMarker: "e+",
    numberNegativeExponentialMarker: "e-"
  }
}, function(e, t) {
  e.exports = {
    Program: Symbol("Program"),
    Sentence: Symbol("Sentence"),
    Conjunction: Symbol("Conjunction"),
    Constant: Symbol("Constant"),
    Variable: Symbol("Variable"),
    Number: Symbol("Number"),
    Functor: Symbol("Functor"),
    ListHead: Symbol("ListHead"),
    List: Symbol("List"),
    Negation: Symbol("Negation"),
    Timable: Symbol("Timable"),
    BinaryOperator: Symbol("BinaryOperator"),
    UnaryOperator: Symbol("UnaryOperator"),
    Symbol: Symbol("Symbol")
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("parser/Lexer"),
    a = i("parser/AstNode"),
    o = i("parser/NodeTypes"),
    l = i("parser/TokenTypes"),
    s = ".",
    u = ",",
    c = ",",
    f = "<-",
    h = "->";

  function d(e, t) {
    let n, i, d = new r(e, t),
      g = null,
      m = d.get(),
      p = function() {
        m = d.get()
      },
      b = function(e) {
        return m.type === e
      },
      v = function(e, t) {
        return m.type === e && m.value === t
      },
      y = function(e, t) {
        return m.type === e && t.indexOf(m.value) > -1
      },
      w = function(e, t) {
        if (m.type !== e) {
          let e = new Error;
          throw e.token = m, e.likelyMissing = t, e
        }
        p()
      },
      E = function() {
        let e;
        return b(l.Variable) ? (e = new a(o.Variable, m), w(l.Variable)) : (e = new a(o.Number, m), w(l.Number)), e
      },
      T = function() {
        let e;
        return v(l.Symbol, "(") ? (w(l.Symbol), e = i(), function(e, t) {
          if (m.type !== e || m.value !== t) {
            let e = new Error;
            throw e.token = m, e
          }
          p()
        }(l.Symbol, ")")) : e = b(l.Constant) ? function() {
          let e = m;
          w(l.Constant);
          let t = new a(o.Functor, e);
          return v(l.Symbol, "(") && n(t), t
        }() : b(l.QuotedString) ? function() {
          let e = new a(o.Constant, m);
          return w(l.QuotedString), e
        }() : E(), e
      },
      x = function e() {
        if (v(l.Keyword, "not")) {
          let t = new a(o.UnaryOperator, m);
          return w(l.Keyword), t.addChild(e()), t
        }
        if (y(l.Symbol, ["!", "-"])) {
          let t = new a(o.UnaryOperator, m);
          w(l.Symbol);
          let n = e();
          return "-" === t.getToken().value && n.getType() === o.Number ? (n.getToken().value = -n.getToken().value, n) : (t.addChild(n), t)
        }
        return T()
      },
      S = function() {
        let e = x();
        for (; y(l.Symbol, ["**", "*", "/"]);) {
          let t = new a(o.BinaryOperator, m);
          w(l.Symbol), t.addChild(e);
          let n = x();
          t.addChild(n), e = t
        }
        return e
      },
      V = function() {
        let e = S();
        for (; y(l.Symbol, ["+", "-"]);) {
          let t = new a(o.BinaryOperator, m);
          w(l.Symbol), t.addChild(e);
          let n = S();
          t.addChild(n), e = t
        }
        return e
      },
      C = function() {
        let e = function() {
          let e = V();
          for (; y(l.Symbol, ["==", "<=", ">=", "!=", "<", ">", "@<", "@>", "@="]);) {
            let t = new a(o.BinaryOperator, m);
            w(l.Symbol), t.addChild(e);
            let n = V();
            t.addChild(n), e = t
          }
          return e
        }();
        if (y(l.Symbol, ["="])) {
          let t = new a(o.BinaryOperator, m);
          w(l.Symbol), t.addChild(e);
          let n = i();
          t.addChild(n), e = t
        }
        return e
      };
    i = function() {
      return v(l.Symbol, "[") ? function e() {
        let t = new a(o.List, m);
        if (w(l.Symbol), v(l.Symbol, "]")) return w(l.Symbol), t;
        let n = new a(o.ListHead);
        for (t.addChild(n), n.addChild(i()); v(l.Symbol, ",");) w(l.Symbol), n.addChild(i());
        if (v(l.Symbol, "|"))
          if (w(l.Symbol), v(l.Symbol, "[")) t.addChild(e());
          else {
            let e = new a(o.Variable, m);
            t.addChild(e), w(l.Variable)
          } return w(l.Symbol), t
      }() : C()
    }, n = function(e) {
      for (w(l.Symbol), e.addChild(i()); v(l.Symbol, c);) w(l.Symbol), e.addChild(i());
      w(l.Symbol, ")")
    };
    let A = function e() {
        if (v(l.Keyword, "not")) {
          let t = new a(o.Negation, m);
          return w(l.Keyword), t.addChild(e()), t
        }
        let t = i();
        return y(l.Keyword, ["from", "at"]) && (t = function(e) {
          let t = new a(o.Timable, m);
          if (t.addChild(e), v(l.Keyword, "from")) {
            w(l.Keyword);
            let e = E();
            if (v(l.Keyword, "to")) {
              w(l.Keyword);
              let n = E();
              t.addChild(e), t.addChild(n)
            } else t.addChild(e)
          } else {
            if (!v(l.Keyword, "at")) throw new Error("Unexpected node " + m); {
              w(l.Keyword);
              let e = E();
              t.addChild(e)
            }
          }
          return t
        }(t)), t
      },
      j = function() {
        let e = new a(o.Conjunction);
        if (v(l.Keyword, "true")) return w(l.Keyword), e;
        for (e.addChild(A()); v(l.Symbol, u);) w(l.Symbol), e.addChild(A());
        return e
      },
      N = function() {
        let e = new a(o.Sentence),
          t = !0;
        return v(l.Symbol, f) ? (e.addChild(new a(o.Symbol, m)), w(l.Symbol)) : v(l.Symbol, h) ? (e.addChild(new a(o.Symbol, m)), w(l.Symbol)) : (e.addChild(j()), v(l.Symbol, f) || v(l.Symbol, h) ? (e.addChild(new a(o.Symbol, m)), w(l.Symbol)) : t = !1), t && e.addChild(j()), w(l.Symbol, s), e
      };
    this.buildSentence = function() {
      return g || (g = N())
    }, this.buildConjunction = function() {
      return g || (g = j())
    }, this.buildLiteral = function() {
      return g || (g = A())
    }, this.build = function() {
      return g || (g = function() {
        let e = new a(o.Program);
        for (; !b(l.Eof);) e.addChild(N());
        return e
      }())
    }
  }
  d.parseSentence = function(e) {
    return new d(e).buildSentence()
  }, d.parseConjunction = function(e) {
    return new d(e).buildConjunction()
  }, d.parseLiteral = function(e) {
    return new d(e).buildLiteral()
  }, e.exports = d
}, function(e, t, n) {
  (function(t) {
    const i = n(0),
      r = i("engine/Clause"),
      a = i("engine/Functor"),
      o = i("engine/List"),
      l = i("engine/Value"),
      s = i("engine/Variable"),
      u = i("engine/Timable"),
      c = i("engine/Program"),
      f = i("parser/Parser"),
      h = i("parser/NodeTypes"),
      d = i("engine/LiteralTreeMap"),
      g = i("utility/strings"),
      m = i("parser/unexpectedTokenErrorMessage"),
      p = n(70);
    let b, v, y = function(e, t) {
        let n = e.getToken().value;
        return new a(n, b(e.getChildren(), t))
      },
      w = function(e, t) {
        let n = e.getToken().value;
        "not" === n && (n = "!");
        let i = b(e.getChildren(), t);
        if ("!" === n && 1 === i.length && i[0] instanceof a && "!/1" === i[0].getId()) {
          return i[0].getArguments()[0]
        }
        return new a(n, i)
      },
      E = function(e, t) {
        let n = e.getToken().value;
        return new a(n, b(e.getChildren(), t))
      };
    b = function(e, t) {
      let n = t,
        i = [];
      return e.forEach(e => {
        switch (e.getType()) {
          case h.Constant:
            i.push(new l(e.getToken().value));
            break;
          case h.BinaryOperator:
            i.push(y(e, n));
            break;
          case h.UnaryOperator:
            i.push(w(e, n));
            break;
          case h.List:
            i.push(function(e, t) {
              if (0 === e.length) return new o([]);
              let n = b(e[0].getChildren(), t);
              if (e.length > 1) {
                let i = b([e[1]], t)[0];
                return new o(n, i)
              }
              return new o(n)
            }(e.getChildren(), n));
            break;
          case h.Number:
            i.push(new l(e.getToken().value));
            break;
          case h.Functor:
            i.push(E(e, n));
            break;
          case h.Variable:
            i.push(function(e, t) {
              let n = t,
                i = e.getToken().value;
              return "_" === i && (i = "$_" + String(n.next), n.next += 1), new s(i)
            }(e, n));
            break;
          default:
            {
              let t = new Error;
              throw t.token = e.getToken(),
              t
            }
        }
      }), i
    };
    let T = function(e, t) {
      let n = e,
        i = !1;
      for (; n.getType() === h.Negation;) n = n.getChildren()[0], i = !i;
      let r = v(n, t);
      return i && (r = new a("!", [r])), r
    };
    v = function(e, t) {
      switch (e.getType()) {
        case h.Timable:
          return function(e, t) {
            let n = e.getChildren(),
              i = n.shift();
            i = T(i, t);
            let r = b(n, t),
              a = r[0],
              o = r[0];
            return r.length > 1 && (o = r[1]), new u(i, a, o)
          }(e, t);
        case h.Functor:
          return E(e, t);
        case h.BinaryOperator:
          return y(e, t);
        case h.UnaryOperator:
          return w(e, t);
        default:
          {
            let t = new Error;
            throw t.token = e.getToken(),
            t
          }
      }
    };
    let x = function(e, t) {
        let n = [];
        return e.forEach(e => {
          let i = T(e, t);
          n.push(i)
        }), n
      },
      S = function(e, t) {
        let n = {
            next: 0,
            set: {}
          },
          i = x(e, n),
          a = x(t, n);
        return new r(i, a)
      },
      V = function(e, t) {
        let n = e.getChildren();
        if (1 !== n.length)
          if (2 !== n.length || "<-" !== n[0].getToken().value) {
            if (3 !== n.length || n[1].getType() !== h.Symbol) throw new Error("invalid number of children in clause node");
            "<-" !== n[1].getToken().value ? t.rules.push(S(n[2].getChildren(), n[0].getChildren())) : t.clauses.push(S(n[0].getChildren(), n[2].getChildren()))
          } else t.constraints.push(function(e) {
            let t = x(e, {
              next: 0,
              set: {}
            });
            return new r([], t)
          }(n[1].getChildren()));
        else(function(e) {
          return x(e, {
            next: 0
          })
        })(n[0].getChildren()).forEach(e => {
          t.auxiliary.add(e)
        })
      };

    function C() {}
    C.build = function(e) {
      let t = new c,
        n = {
          constraints: [],
          rules: [],
          clauses: [],
          auxiliary: new d
        };
      return function(e, t) {
        e.getChildren().forEach(e => {
          V(e, t)
        })
      }(e, n), t.setConstraints(n.constraints), t.setClauses(n.clauses), t.setRules(n.rules), t.setFacts(n.auxiliary), t
    }, C.literal = function(e) {
      let t = f.parseLiteral(e);
      return E(t, {
        next: 0,
        set: {}
      })
    }, C.literalSet = function(e) {
      let t = f.parseConjunction(e);
      return x(t.getChildren(), {
        next: 0,
        set: {}
      })
    }, C.fromString = function(e) {
      return new Promise((t, n) => {
        let i;
        try {
          i = new f(e).build(), t(C.build(i))
        } catch (t) {
          let i = t.token;
          if (void 0 === i || void 0 === i.line || void 0 === i.col) return void n(t);
          i.file = "(string)";
          let r = m(e, i, t.likelyMissing);
          n(new Error(r))
        }
      })
    }, C.fromFile = function(e) {
      return new Promise((n, i) => {
        t.browser ? i(g.error("browserContext.loadProgramFromFile")) : p.readFile(e, "utf8", (t, r) => {
          if (t) return void i(t);
          let a;
          try {
            a = new f(r, e).build();
            let t = C.build(a);
            n(t)
          } catch (t) {
            let n = t.token;
            if (void 0 === n || void 0 === n.line || void 0 === n.col) return void i(t);
            let a = m(r, n, t.likelyMissing);
            a = g("parser.loadFileErrorHeader", [e, a]), i(new Error(a))
          }
        })
      })
    }, e.exports = C
  }).call(this, n(1))
}, function(e, t) {
  e.exports = function(e) {
    let t = 0,
      n = -1,
      i = e.length - 1,
      r = -1,
      a = e,
      o = (e, i, a, o) => ({
        c: e,
        line: i || t,
        col: a || n,
        index: o || r
      });
    this.get = function() {
      return (r += 1) > i ? (r = i + 1, o(null)) : (r > 0 && "\n" === a[r - 1] && (t += 1, n = -1), n += 1, o(a[r]))
    }, this.lookahead = function() {
      let e = r + 1,
        l = t,
        s = n;
      e > 0 && "\n" === a[e - 1] && (l += 1, s = -1), s += 1;
      let u = null;
      return e <= i && (u = a[e]), o(u, l, s, e)
    }
  }
}, function(e, t) {
  e.exports = {
    Variable: Symbol("Variable"),
    Symbol: Symbol("Symbol"),
    Constant: Symbol("Constant"),
    QuotedString: Symbol("QuotedString"),
    Number: Symbol("Number"),
    Eof: Symbol("Eof"),
    Whitespace: Symbol("Whitespace"),
    Comment: Symbol("Comment"),
    Error: Symbol("Error"),
    Keyword: Symbol("Keyword")
  }
}, function(e, t, n) {
  (function(t) {
    const i = n(0)("utility/strings");
    e.exports = function(e, n, r) {
      let a = n.line,
        o = e.split("\n").length,
        l = [];
      a > 0 && l.push(a - 1), l.push(a), a < o - 1 && l.push(a + 1);
      let s = "";
      (function(e, t) {
        let n = t.concat();
        n.sort();
        let i = 0,
          r = -1,
          a = e.length,
          o = -1,
          l = -1,
          s = [];
        for (; r < a;)
          if ("\n" === e[r += 1]) {
            if ((i += 1) === n[0] + 1 && (l = r, s.push(e.substring(o + 1, l)), n.shift(), o = -1, l = -1, 0 === n.length)) break;
            i === n[0] && (o = r)
          } return o > -1 && -1 === l && (l = a - 1, s.push(e.substring(o + 1, l))), s
      })(e, l).forEach((e, t) => {
        s += "\t" + (l[t] + 1) + " | " + e + "\n", l[t] === a && (s += "\t    " + " ".repeat(n.col) + "^\n")
      });
      let u = String(n.type).slice(7, -1) || "undefined",
        c = "parser.syntaxError";
      t.browser && (c = "parser.syntaxErrorBrowser");
      let f = i(c, n.value, u, n.line + 1, n.col + 1, n.file, n.line + 1, s);
      return void 0 !== r && (f += i("parser.likelyMissingInfo", r)), f
    }
  }).call(this, n(1))
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Functor"),
    a = i("engine/Variable"),
    o = i("engine/Value");

  function l() {}
  l.shorthand = function(e) {
    let t = e;
    if (t instanceof r && "//2" === t.getId()) {
      let e = t.getArguments(),
        n = e[0],
        i = e[1];
      if (n instanceof r && 0 === n.getArgumentCount() && i instanceof o) {
        n = n.evaluate(), i = i.evaluate();
        let e = [];
        for (let t = 0; t < i; t += 1) e.push(new a("_" + t));
        return new r(n, e)
      }
    }
    return t
  }, e.exports = l
}, function(e, t, n) {
  const i = n(0)("engine/Variable");
  e.exports = function(e, t) {
    let n = {};
    return Object.keys(e).forEach(r => {
      let a = e[r];
      for (; a instanceof i && void 0 !== t[a.evaluate()] && !(t[a.evaluate()] instanceof i && a.evaluate() === t[a.evaluate()].evaluate());) a = t[a.evaluate()];
      n[r] = a
    }), n = Object.assign(n, t)
  }
}, function(e, t) {
  e.exports = function(e, t) {
    let n = t.getConstraints();
    for (let t = 0; t < n.length; t += 1) {
      let i = n[t].getBodyLiterals();
      if (e.query(i).length > 0) return !1
    }
    return !0
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Timable"),
    a = i("engine/Functor");
  e.exports = function(e) {
    return t => {
      let n = t;
      if (n instanceof r) return n;
      let i = !1;
      for (; n instanceof a && "!/1" === n.getId();) i = !i, n = n.getArguments()[0];
      let o, l = n.getArguments();
      if (e.isFluent(n.getName() + "/" + (n.getArgumentCount() - 1))) {
        let e = l[l.length - 1];
        return l = l.slice(0, l.length - 1), o = new a(n.getName(), l), i && (o = new a("!", [o])), new r(o, e, e)
      }
      let s = n.getName() + "/" + (n.getArgumentCount() - 2);
      if (e.isAction(s) || e.isEvent(s)) {
        let e = l[l.length - 2],
          t = l[l.length - 1];
        return l = l.slice(0, l.length - 2), o = new a(n.getName(), l), i && (o = new a("!", [o])), new r(o, e, t)
      }
      return o = n, i && (o = new a("!", [o])), o
    }
  }
}, function(e, t, n) {
  const i = n(0)("engine/LiteralTreeMap");
  e.exports = function(e) {
    let t = new i,
      n = [];
    return e.forEach(e => {
      t.contains(e) || (t.add(e), n.push(e))
    }), n
  }
}, function(e, t) {
  e.exports = function(e, t, n, i) {
    let r = [],
      a = [];
    return t.forEach(t => {
      let o = t.evaluate(e, n).then(e => null === e ? (i.increment("lastCycleNumFailedGoals"), i.increment("totalNumFailedGoals"), Promise.resolve()) : e.length > 0 ? (i.increment("lastCycleNumResolvedGoals"), i.increment("totalNumResolvedGoals"), Promise.resolve()) : (a.push(t), Promise.resolve()));
      r.push(o)
    }), Promise.all(r).then(() => Promise.resolve(a))
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/LiteralTreeMap"),
    a = i("engine/Variable"),
    o = i("utility/compactTheta");
  e.exports = function(e, t, n) {
    let i = e,
      l = [];
    return t.getDefinitions(i).forEach(e => {
      let t = {};
      Object.keys(e.internalTheta).forEach(i => {
        let r = e.internalTheta[i];
        r instanceof a && void 0 !== n[r.evaluate()] ? t[n[r.evaluate()].evaluate()] = new a(i) : r instanceof a && (t[r.evaluate()] = new a(i))
      }), t = o(e.internalTheta, t);
      let s = e.definition.map(e => e.substitute(n).substitute(t)),
        u = e.headLiteral.substitute(n).substitute(t),
        c = new r;
      c.add(u), c.unifies(i).forEach(e => {
        l.push({
          conjuncts: s.map(t => t.substitute(e.theta)),
          theta: e.theta
        })
      })
    }), l
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("utility/expandLiteral"),
    a = i("utility/variableArrayRename");
  e.exports = function e(t, n, i, o) {
    let l = !0,
      s = n.length,
      u = {};
    n.forEach(e => {
      e.getVariableHash(u)
    }), u = Object.keys(u);
    let c = a(u);
    for (let a = 0; a < s; a += 1) {
      let u = n[a],
        f = n.slice(0, a),
        h = n.slice(a + 1, s),
        d = r(u, o, c);
      if (d.length > 0 && (l = !1), d.forEach(n => {
          let r = h,
            a = f.concat(n.conjuncts).concat(r);
          e(t, a, i.concat([n.theta]), o)
        }), !l) break
    }
    l && t.push({
      thetaPath: i,
      literalSet: n
    })
  }
}, function(e, t) {
  e.exports = (e => (t, n) => {
    let i = t.getEarliestDeadline(e),
      r = n.getEarliestDeadline(e);
    return null === i && null === r ? 0 : null === i ? 1 : null === r ? -1 : i === r ? 0 : i < r ? -1 : 1
  })
}, function(e, t, n) {
  const i = n(0)("engine/Timable");
  e.exports = function(e, t) {
    for (let n = 0; n < e.length; n += 1)
      if (e[n] instanceof i && e[n].hasExpired(t)) return !0;
    return !1
  }
}, function(e, t) {
  e.exports = function() {
    let e = {};
    this.addListener = function(t, n) {
      void 0 === e[t] && (e[t] = []), e[t].push(n)
    }, this.clearListeners = function(t) {
      delete e[t]
    }, this.notify = function(t, n) {
      return void 0 === e[t] ? Promise.resolve() : (e[t].forEach(e => {
        e(n)
      }), Promise.resolve())
    }
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Clause"),
    a = i("utility/hasExpiredTimable"),
    o = i("engine/GoalTree"),
    l = i("engine/Functor"),
    s = i("engine/Timable"),
    u = i("engine/Resolutor");
  e.exports = function(e, t, n, i) {
    let c = t.getRules(),
      f = [],
      h = [t.getFacts(), t.getState(), t.getExecutedActions()];
    const d = function(i) {
      let r = [];
      f.forEach(e => {
        e.isSameRootConjunction(i) || r.push(e)
      }), (f = r).push(new o(e, t, i, n))
    };
    let g = [];
    return c.forEach(o => {
      if (0 === o.getBodyLiteralsCount()) return void d(o.getHeadLiterals());
      let c = !1;
      (function(e, t) {
        let n = e.getBodyLiterals();
        for (let e = 0; e < n.length; e += 1) {
          let i = n[e];
          for (; i instanceof l && "!/1" === i.getId();) i = i.getArguments()[0];
          if (i instanceof s) return !i.hasExpired(t)
        }
        return !1
      })(o, n) && (c = !0, g.push(o));
      let f = u.reduceRuleAntecedent(e, t, h, o, n),
        m = o.getHeadLiterals();
      f.forEach(e => {
        if (e.unresolved.length === o.getBodyLiteralsCount()) return;
        let t = m.map(t => t.substitute(e.theta));
        if (0 === e.unresolved.length) return void d(t);
        let l = e.unresolved;
        if (!a(l, n)) {
          let e = new r(t, l);
          g.push(e), i.increment("lastCycleNumNewRules")
        }
      }), c || i.increment("lastCycleNumDiscardedRules")
    }), i.set("numRules", g.length), t.setRules(g), i.increaseBy("lastCycleNumFiredRules", f.length), f
  }
}, function(e, t) {
  e.exports = function() {
    let e = {};
    this.reset = function(t) {
      e[t] = 0
    }, this.increment = function(t) {
      void 0 !== e[t] && "number" == typeof e[t] && (e[t] += 1)
    }, this.increaseBy = function(t, n) {
      void 0 !== e[t] && "number" == typeof e[t] && (e[t] += n)
    }, this.set = function(t, n) {
      e[t] = n
    }, this.add = function(t, n) {
      void 0 !== e[t] && Array.isArray(e[t]) && e[t].push(n)
    }, this.get = function(t) {
      return e[t]
    }
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Variable"),
    a = i("engine/Value"),
    o = i("engine/Timable");
  e.exports = function(e, t, n) {
    let i = {};
    if (!(e instanceof o)) return i;
    let l = t,
      s = e.getStartTime(),
      u = e.getEndTime(),
      c = u instanceof r;
    if (s instanceof r && c) {
      let e = s.evaluate(),
        t = u.evaluate();
      e === t ? (l[e] = new a(n), i[e] = new a(n)) : (l[e] = new a(n - 1), i[e] = new a(n - 1), l[t] = new a(n), i[t] = new a(n))
    } else if (c) {
      let e = u.evaluate();
      l[e] = new a(s.evaluate() + 1), i[e] = new a(s.evaluate() + 1)
    }
    return i
  }
}, function(e, t, n) {
  const i = n(0),
    r = i("engine/Variable"),
    a = i("engine/Functor"),
    o = i("engine/Value"),
    l = i("engine/Timable"),
    s = ["</2", ">/2", "<=/2", ">=/2", "=/2"];
  e.exports = function(e, t) {
    let n = [],
      i = [],
      u = {};
    for (let t = 0; t < e.length; t += 1) {
      let n = e[t];
      if (!(n instanceof l)) {
        n instanceof a && -1 !== s.indexOf(n.getId()) && n.getVariables().forEach(e => {
          u[e] = !0
        });
        continue
      }
      let i = n.getStartTime(),
        c = n.getEndTime();
      if (c instanceof r) {
        let e = c.evaluate();
        (i instanceof o || i instanceof r && i.evaluate() !== e) && (u[e] = !0)
      }
    }
    for (let a = 0; a < e.length; a += 1) {
      let o = e[a];
      if (!(o instanceof l)) {
        if (i.length > 0) {
          i.push(o);
          continue
        }
        n.push(o);
        continue
      }
      if (!o.isInRange(t)) {
        i.push(o);
        continue
      }
      let s = o.getStartTime();
      s instanceof r && void 0 !== u[s.evaluate()] ? i.push(o) : n.push(o)
    }
    return [n, i]
  }
}, function(e, t, n) {
  const i = n(0)("parser/ProgramFactory"),
    r = i.literal("updates(Act, Old, New)"),
    a = i.literal("initiates(Act, New)"),
    o = i.literal("terminates(Act, Old)");
  e.exports = function(e, t, n) {
    t.forEach(t => {
      let i = [],
        l = {
          Act: t
        },
        s = a.substitute(l),
        u = e.query(s);
      i = i.concat(u), n.forEach(n => {
        l = {
          Act: t,
          Old: n
        };
        let a = r.substitute(l),
          s = o.substitute(l),
          u = [];
        u = (u = (u = u.concat(e.query(a))).concat(e.query(s))).map(e => {
          let t = e;
          return t.theta.Old = n, t
        }), i = i.concat(u)
      }), i.forEach(e => {
        void 0 !== e.theta.Old && n.remove(e.theta.Old), void 0 !== e.theta.New && n.add(e.theta.New)
      })
    })
  }
}, function(e, t, n) {
  const i = n(0)("engine/Variable");
  e.exports = function(e, t) {
    let n = t;
    if (n || (n = "$_*"), "string" != typeof n) throw new Error("name pattern for variable array renaming must be a string.");
    let r = {};
    e.forEach(e => {
      let t = e;
      e instanceof i && (t = e.evaluate()), r[t] = new i(n.replace("*", t))
    });
    let a = {},
      o = !1,
      l = e => {
        if (a[e] = r[e], r[e] instanceof i) {
          let t = r[e].evaluate();
          void 0 !== r[t] && (a[e] = new i(n.replace("*", t)), o = !0)
        }
      };
    do {
      a = {}, o = !1, Object.keys(r).forEach(l), r = a
    } while (o);
    return r
  }
}, function(e, t, n) {
  (function(t) {
    const i = n(4),
      r = n(71);
    i.meta = r, t.browser && (window.LPS = i), e.exports = i
  }).call(this, n(1))
}, function(e, t, n) {
  var i = {
    "./LPS": 4,
    "./LPS.js": 4,
    "./engine/Clause": 7,
    "./engine/Clause.js": 7,
    "./engine/ConjunctionMap": 8,
    "./engine/ConjunctionMap.js": 8,
    "./engine/Engine": 9,
    "./engine/Engine.js": 9,
    "./engine/Functor": 12,
    "./engine/Functor.js": 12,
    "./engine/FunctorProvider": 13,
    "./engine/FunctorProvider.js": 13,
    "./engine/GoalTree": 14,
    "./engine/GoalTree.js": 14,
    "./engine/List": 15,
    "./engine/List.js": 15,
    "./engine/LiteralTreeMap": 16,
    "./engine/LiteralTreeMap.js": 16,
    "./engine/Program": 17,
    "./engine/Program.js": 17,
    "./engine/Resolutor": 18,
    "./engine/Resolutor.js": 18,
    "./engine/Timable": 19,
    "./engine/Timable.js": 19,
    "./engine/Value": 20,
    "./engine/Value.js": 20,
    "./engine/Variable": 21,
    "./engine/Variable.js": 21,
    "./engine/builtin/builtin": 22,
    "./engine/builtin/builtin.js": 22,
    "./engine/builtin/declarations.lps": 23,
    "./engine/builtin/list.lps": 24,
    "./engine/builtin/math.lps": 25,
    "./engine/builtin/types.lps": 26,
    "./engine/modules/core": 2,
    "./engine/modules/core/": 2,
    "./engine/modules/core/assertIsValue": 27,
    "./engine/modules/core/assertIsValue.js": 27,
    "./engine/modules/core/comparators": 28,
    "./engine/modules/core/comparators.js": 28,
    "./engine/modules/core/index": 2,
    "./engine/modules/core/index.js": 2,
    "./engine/modules/core/io": 29,
    "./engine/modules/core/io.js": 29,
    "./engine/modules/core/list": 30,
    "./engine/modules/core/list.js": 30,
    "./engine/modules/core/math": 31,
    "./engine/modules/core/math.js": 31,
    "./engine/modules/core/resolveValue": 32,
    "./engine/modules/core/resolveValue.js": 32,
    "./engine/modules/core/types": 33,
    "./engine/modules/core/types.js": 33,
    "./engine/processors/initially": 34,
    "./engine/processors/initially.js": 34,
    "./engine/processors/observe": 35,
    "./engine/processors/observe.js": 35,
    "./engine/processors/ruleAntecedent": 36,
    "./engine/processors/ruleAntecedent.js": 36,
    "./engine/processors/settings": 37,
    "./engine/processors/settings.js": 37,
    "./engine/processors/timable": 38,
    "./engine/processors/timable.js": 38,
    "./engine/tester/Tester": 39,
    "./engine/tester/Tester.js": 39,
    "./lpsRequire": 0,
    "./lpsRequire.js": 0,
    "./parser/AstNode": 40,
    "./parser/AstNode.js": 40,
    "./parser/Lexer": 41,
    "./parser/Lexer.js": 41,
    "./parser/Lexicon": 42,
    "./parser/Lexicon.js": 42,
    "./parser/NodeTypes": 43,
    "./parser/NodeTypes.js": 43,
    "./parser/Parser": 44,
    "./parser/Parser.js": 44,
    "./parser/ProgramFactory": 45,
    "./parser/ProgramFactory.js": 45,
    "./parser/Scanner": 46,
    "./parser/Scanner.js": 46,
    "./parser/TokenTypes": 47,
    "./parser/TokenTypes.js": 47,
    "./parser/unexpectedTokenErrorMessage": 48,
    "./parser/unexpectedTokenErrorMessage.js": 48,
    "./utility/SyntacticSugar": 49,
    "./utility/SyntacticSugar.js": 49,
    "./utility/compactTheta": 50,
    "./utility/compactTheta.js": 50,
    "./utility/constraintCheck": 51,
    "./utility/constraintCheck.js": 51,
    "./utility/createLiteralTimingMapper": 52,
    "./utility/createLiteralTimingMapper.js": 52,
    "./utility/dedupeConjunction": 53,
    "./utility/dedupeConjunction.js": 53,
    "./utility/evaluateGoalTrees": 54,
    "./utility/evaluateGoalTrees.js": 54,
    "./utility/expandLiteral": 55,
    "./utility/expandLiteral.js": 55,
    "./utility/expandRuleAntecedent": 56,
    "./utility/expandRuleAntecedent.js": 56,
    "./utility/goalTreeSorter": 57,
    "./utility/goalTreeSorter.js": 57,
    "./utility/hasExpiredTimable": 58,
    "./utility/hasExpiredTimable.js": 58,
    "./utility/observer/Manager": 59,
    "./utility/observer/Manager.js": 59,
    "./utility/processRules": 60,
    "./utility/processRules.js": 60,
    "./utility/profiler/Profiler": 61,
    "./utility/profiler/Profiler.js": 61,
    "./utility/resolveTimableThetaTiming": 62,
    "./utility/resolveTimableThetaTiming.js": 62,
    "./utility/sortTimables": 63,
    "./utility/sortTimables.js": 63,
    "./utility/strings": 3,
    "./utility/strings/": 3,
    "./utility/strings/index": 3,
    "./utility/strings/index.js": 3,
    "./utility/strings/store": 5,
    "./utility/strings/store.json": 5,
    "./utility/updateStateWithFluentActors": 64,
    "./utility/updateStateWithFluentActors.js": 64,
    "./utility/variableArrayRename": 65,
    "./utility/variableArrayRename.js": 65
  };

  function r(e) {
    var t = a(e);
    return n(t)
  }

  function a(e) {
    var t = i[e];
    if (!(t + 1)) {
      var n = new Error("Cannot find module '" + e + "'");
      throw n.code = "MODULE_NOT_FOUND", n
    }
    return t
  }
  r.keys = function() {
    return Object.keys(i)
  }, r.resolve = a, e.exports = r, r.id = 67
}, function(e, t, n) {
  (function(e, t) {
    ! function(e, n) {
      "use strict";
      if (!e.setImmediate) {
        var i, r = 1,
          a = {},
          o = !1,
          l = e.document,
          s = Object.getPrototypeOf && Object.getPrototypeOf(e);
        s = s && s.setTimeout ? s : e, "[object process]" === {}.toString.call(e.process) ? i = function(e) {
          t.nextTick(function() {
            c(e)
          })
        } : function() {
          if (e.postMessage && !e.importScripts) {
            var t = !0,
              n = e.onmessage;
            return e.onmessage = function() {
              t = !1
            }, e.postMessage("", "*"), e.onmessage = n, t
          }
        }() ? function() {
          var t = "setImmediate$" + Math.random() + "$",
            n = function(n) {
              n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && c(+n.data.slice(t.length))
            };
          e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n), i = function(n) {
            e.postMessage(t + n, "*")
          }
        }() : e.MessageChannel ? function() {
          var e = new MessageChannel;
          e.port1.onmessage = function(e) {
            c(e.data)
          }, i = function(t) {
            e.port2.postMessage(t)
          }
        }() : l && "onreadystatechange" in l.createElement("script") ? function() {
          var e = l.documentElement;
          i = function(t) {
            var n = l.createElement("script");
            n.onreadystatechange = function() {
              c(t), n.onreadystatechange = null, e.removeChild(n), n = null
            }, e.appendChild(n)
          }
        }() : i = function(e) {
          setTimeout(c, 0, e)
        }, s.setImmediate = function(e) {
          "function" != typeof e && (e = new Function("" + e));
          for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
          var o = {
            callback: e,
            args: t
          };
          return a[r] = o, i(r), r++
        }, s.clearImmediate = u
      }

      function u(e) {
        delete a[e]
      }

      function c(e) {
        if (o) setTimeout(c, 0, e);
        else {
          var t = a[e];
          if (t) {
            o = !0;
            try {
              ! function(e) {
                var t = e.callback,
                  i = e.args;
                switch (i.length) {
                  case 0:
                    t();
                    break;
                  case 1:
                    t(i[0]);
                    break;
                  case 2:
                    t(i[0], i[1]);
                    break;
                  case 3:
                    t(i[0], i[1], i[2]);
                    break;
                  default:
                    t.apply(n, i)
                }
              }(t)
            } finally {
              u(e), o = !1
            }
          }
        }
      }
    }("undefined" == typeof self ? void 0 === e ? this : e : self)
  }).call(this, n(11), n(1))
}, function(e, t, n) {
  var i = {
    "./declarations.lps": 23,
    "./list.lps": 24,
    "./math.lps": 25,
    "./types.lps": 26
  };

  function r(e) {
    var t = a(e);
    return n(t)
  }

  function a(e) {
    var t = i[e];
    if (!(t + 1)) {
      var n = new Error("Cannot find module '" + e + "'");
      throw n.code = "MODULE_NOT_FOUND", n
    }
    return t
  }
  r.keys = function() {
    return Object.keys(i)
  }, r.resolve = a, e.exports = r, r.id = 69
}, function(e, t) {}, function(e) {
  e.exports = {
    name: "lps",
    version: "1.0.16",
    description: "Logic Production System (LPS) runtime implementation in JS for building browser or Node.js-based AI applications",
    main: "index.js",
    repository: "https://github.com/mauris/lps.js.git",
    keywords: ["ai", "logic", "lps", "library", "language", "compiler", "interpreter"],
    scripts: {
      test: "npm run test:source && npm run test:programs",
      "test:browser": "echo TODO",
      "test:source": 'nyc --all --cache mocha --check-leaks --require ./test/init.js "test/lps.js/**/*.test.js"',
      "test:source:fast": 'mocha --require ./test/init.js "test/lps.js/**/*.test.js"',
      "test:programs": 'mocha --require ./test/init.js "test/programs/**/*.test.js"',
      lint: "eslint test src",
      "build:browser": "rm -f dist/*.js && webpack",
      preversion: "npm test && npm run build:browser",
      postversion: "git push --tags && git push && npm run build:browser",
      prepublishOnly: "npm test",
      "publish:alpha": "npm publish --tag alpha",
      "publish:beta": "npm publish --tag beta",
      "publish:latest": "npm publish"
    },
    author: {
      name: "Sam Yong",
      email: "samyonggit@gmail.com",
      url: "http://mauris.sg/"
    },
    license: "BSD-3-Clause",
    devDependencies: {
      chai: "^4.1.2",
      eslint: "^5.5.0",
      "eslint-config-airbnb-base": "^13.1.0",
      "eslint-plugin-deprecate": "^0.5.4",
      "eslint-plugin-import": "^2.14.0",
      "eslint-plugin-promise": "^4.0.1",
      mocha: "^5.2.0",
      "mocha-sinon": "^2.1.0",
      nyc: "^13.0.1",
      "raw-loader": "^0.5.1",
      sinon: "^6.2.0",
      webpack: "^4.18.0",
      "webpack-cli": "^3.1.0"
    },
    nyc: {
      exclude: ["dist", "examples", "test", "webpack.config.js"],
      lines: 90,
      statements: 90,
      functions: 90,
      branches: 90
    }
  }
}]);
