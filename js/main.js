/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _log = __webpack_require__(1);
	
	var ejs = __webpack_require__(9),
	    people = ['geddy', 'neil', 'alex'],
	    html = ejs.render('<%= people.join(", "); %>', { people: people }); /**
	                                                                         * Created by tan.bui on 9.1.2017.
	                                                                         */
	
	
	(0, _log.log)('Check modular client working');
	
	var body = document.querySelector('body');
	body.textContent = html;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var log = exports.log = function log(msg) {
	    console.log(msg);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	/*global window, global*/
	var util = __webpack_require__(3);
	var assert = __webpack_require__(7);
	var now = __webpack_require__(8);
	
	var slice = Array.prototype.slice;
	var console;
	var times = {};
	
	if (typeof global !== "undefined" && global.console) {
	    console = global.console;
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console;
	} else {
	    console = {};
	}
	
	var functions = [[log, "log"], [info, "info"], [warn, "warn"], [error, "error"], [time, "time"], [timeEnd, "timeEnd"], [trace, "trace"], [dir, "dir"], [consoleAssert, "assert"]];
	
	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i];
	    var f = tuple[0];
	    var name = tuple[1];
	
	    if (!console[name]) {
	        console[name] = f;
	    }
	}
	
	module.exports = console;
	
	function log() {}
	
	function info() {
	    console.log.apply(console, arguments);
	}
	
	function warn() {
	    console.log.apply(console, arguments);
	}
	
	function error() {
	    console.warn.apply(console, arguments);
	}
	
	function time(label) {
	    times[label] = now();
	}
	
	function timeEnd(label) {
	    var time = times[label];
	    if (!time) {
	        throw new Error("No such label: " + label);
	    }
	
	    var duration = now() - time;
	    console.log(label + ": " + duration + "ms");
	}
	
	function trace() {
	    var err = new Error();
	    err.name = "Trace";
	    err.message = util.format.apply(null, arguments);
	    console.error(err.stack);
	}
	
	function dir(object) {
	    console.log(util.inspect(object) + "\n");
	}
	
	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1);
	        assert.ok(false, util.format.apply(null, arr));
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, console) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function (f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function (fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function () {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function (set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function () {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	};
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\x1B[' + inspect.colors[style][0] + 'm' + str + '\x1B[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== exports.inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '',
	      array = false,
	      braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function (prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(5);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function () {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(6);
	
	exports._extend = function (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4), __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	module.exports = function isBuffer(arg) {
	  return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(3);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = function () {
	  return function foo() {}.name === 'foo';
	}();
	function pToString(obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' + name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' + self.operator + ' ' + truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	    // 7.2. If the expected value is a Date object, the actual value is
	    // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	    // 7.3 If the expected value is a RegExp object, the actual value is
	    // equivalent if it is also a RegExp object with the same source and
	    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
	
	    // 7.4. Other pairs that do not both pass typeof value == 'object',
	    // equivalence is determined by ==.
	  } else if ((actual === null || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) !== 'object') && (expected === null || (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	    // If both values are instances of typed arrays, wrap their underlying
	    // ArrayBuffers in a Buffer each to increase performance
	    // This optimization requires the arrays to have the same type as checked by
	    // Object.prototype.toString (aka pToString). Never perform binary
	    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	    // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;
	
	    // 7.5 For all other Object pairs, including Array objects, equivalence is
	    // determined by having the same number of owned properties (as verified
	    // with Object.prototype.hasOwnProperty.call), the same set of keys
	    // (although not necessarily the same order), equivalent values for every
	    // corresponding key, and an identical 'prototype' property. Note: this
	    // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || { actual: [], expected: [] };
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function (block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function (block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function (err) {
	  if (err) throw err;
	};
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = now;
	
	function now() {
	    return new Date().getTime();
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {/*
	 * EJS Embedded JavaScript templates
	 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *         http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	*/
	
	'use strict';
	
	/**
	 * @file Embedded JavaScript templating engine.
	 * @author Matthew Eernisse <mde@fleegix.org>
	 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
	 * @project EJS
	 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
	 */
	
	/**
	 * EJS internal functions.
	 *
	 * Technically this "module" lies in the same file as {@link module:ejs}, for
	 * the sake of organization all the private functions re grouped into this
	 * module.
	 *
	 * @module ejs-internal
	 * @private
	 */
	
	/**
	 * Embedded JavaScript templating engine.
	 *
	 * @module ejs
	 * @public
	 */
	
	var fs = __webpack_require__(10);
	var path = __webpack_require__(11);
	var utils = __webpack_require__(12);
	
	var scopeOptionWarned = false;
	var _VERSION_STRING = __webpack_require__(13).version;
	var _DEFAULT_DELIMITER = '%';
	var _DEFAULT_LOCALS_NAME = 'locals';
	var _NAME = 'ejs';
	var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
	var _OPTS = ['delimiter', 'scope', 'context', 'debug', 'compileDebug', 'client', '_with', 'rmWhitespace', 'strict', 'filename'];
	var _BOM = /^\uFEFF/;
	
	/**
	 * EJS template function cache. This can be a LRU object from lru-cache NPM
	 * module. By default, it is {@link module:utils.cache}, a simple in-process
	 * cache that grows continuously.
	 *
	 * @type {Cache}
	 */
	
	exports.cache = utils.cache;
	
	/**
	 * Name of the object containing the locals.
	 *
	 * This variable is overridden by {@link Options}`.localsName` if it is not
	 * `undefined`.
	 *
	 * @type {String}
	 * @public
	 */
	
	exports.localsName = _DEFAULT_LOCALS_NAME;
	
	/**
	 * Get the path to the included file from the parent file path and the
	 * specified path.
	 *
	 * @param {String}  name     specified path
	 * @param {String}  filename parent file path
	 * @param {Boolean} isDir    parent file path whether is directory
	 * @return {String}
	 */
	exports.resolveInclude = function (name, filename, isDir) {
	  var dirname = path.dirname;
	  var extname = path.extname;
	  var resolve = path.resolve;
	  var includePath = resolve(isDir ? filename : dirname(filename), name);
	  var ext = extname(name);
	  if (!ext) {
	    includePath += '.ejs';
	  }
	  return includePath;
	};
	
	/**
	 * Get the path to the included file by Options
	 *
	 * @param  {String}  path    specified path
	 * @param  {Options} options compilation options
	 * @return {String}
	 */
	function getIncludePath(path, options) {
	  var includePath;
	  if (path.charAt(0) == '/') {
	    includePath = exports.resolveInclude(path.replace(/^\/*/, ''), options.root || '/', true);
	  } else {
	    if (!options.filename) {
	      throw new Error('`include` use relative path requires the \'filename\' option.');
	    }
	    includePath = exports.resolveInclude(path, options.filename);
	  }
	  return includePath;
	}
	
	/**
	 * Get the template from a string or a file, either compiled on-the-fly or
	 * read from cache (if enabled), and cache the template if needed.
	 *
	 * If `template` is not set, the file specified in `options.filename` will be
	 * read.
	 *
	 * If `options.cache` is true, this function reads the file from
	 * `options.filename` so it must be set prior to calling this function.
	 *
	 * @memberof module:ejs-internal
	 * @param {Options} options   compilation options
	 * @param {String} [template] template source
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `options.client`, either type might be returned.
	 * @static
	 */
	
	function handleCache(options, template) {
	  var func;
	  var filename = options.filename;
	  var hasTemplate = arguments.length > 1;
	
	  if (options.cache) {
	    if (!filename) {
	      throw new Error('cache option requires a filename');
	    }
	    func = exports.cache.get(filename);
	    if (func) {
	      return func;
	    }
	    if (!hasTemplate) {
	      template = fs.readFileSync(filename).toString().replace(_BOM, '');
	    }
	  } else if (!hasTemplate) {
	    // istanbul ignore if: should not happen at all
	    if (!filename) {
	      throw new Error('Internal EJS error: no file name or template ' + 'provided');
	    }
	    template = fs.readFileSync(filename).toString().replace(_BOM, '');
	  }
	  func = exports.compile(template, options);
	  if (options.cache) {
	    exports.cache.set(filename, func);
	  }
	  return func;
	}
	
	/**
	 * Get the template function.
	 *
	 * If `options.cache` is `true`, then the template is cached.
	 *
	 * @memberof module:ejs-internal
	 * @param {String}  path    path for the specified file
	 * @param {Options} options compilation options
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `options.client`, either type might be returned
	 * @static
	 */
	
	function includeFile(path, options) {
	  var opts = utils.shallowCopy({}, options);
	  opts.filename = getIncludePath(path, opts);
	  return handleCache(opts);
	}
	
	/**
	 * Get the JavaScript source of an included file.
	 *
	 * @memberof module:ejs-internal
	 * @param {String}  path    path for the specified file
	 * @param {Options} options compilation options
	 * @return {Object}
	 * @static
	 */
	
	function includeSource(path, options) {
	  var opts = utils.shallowCopy({}, options);
	  var includePath;
	  var template;
	  includePath = getIncludePath(path, opts);
	  template = fs.readFileSync(includePath).toString().replace(_BOM, '');
	  opts.filename = includePath;
	  var templ = new Template(template, opts);
	  templ.generateSource();
	  return {
	    source: templ.source,
	    filename: includePath,
	    template: template
	  };
	}
	
	/**
	 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
	 * `lineno`.
	 *
	 * @implements RethrowCallback
	 * @memberof module:ejs-internal
	 * @param {Error}  err      Error object
	 * @param {String} str      EJS source
	 * @param {String} filename file name of the EJS file
	 * @param {String} lineno   line number of the error
	 * @static
	 */
	
	function rethrow(err, str, flnm, lineno) {
	  var lines = str.split('\n');
	  var start = Math.max(lineno - 3, 0);
	  var end = Math.min(lines.length, lineno + 3);
	  var filename = utils.escapeXML(flnm);
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i) {
	    var curr = i + start + 1;
	    return (curr == lineno ? ' >> ' : '    ') + curr + '| ' + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'ejs') + ':' + lineno + '\n' + context + '\n\n' + err.message;
	
	  throw err;
	}
	
	function stripSemi(str) {
	  return str.replace(/;(\s*$)/, '$1');
	}
	
	/**
	 * Compile the given `str` of ejs into a template function.
	 *
	 * @param {String}  template EJS template
	 *
	 * @param {Options} opts     compilation options
	 *
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `opts.client`, either type might be returned.
	 * @public
	 */
	
	exports.compile = function compile(template, opts) {
	  var templ;
	
	  // v1 compat
	  // 'scope' is 'context'
	  // FIXME: Remove this in a future version
	  if (opts && opts.scope) {
	    if (!scopeOptionWarned) {
	      console.warn('`scope` option is deprecated and will be removed in EJS 3');
	      scopeOptionWarned = true;
	    }
	    if (!opts.context) {
	      opts.context = opts.scope;
	    }
	    delete opts.scope;
	  }
	  templ = new Template(template, opts);
	  return templ.compile();
	};
	
	/**
	 * Render the given `template` of ejs.
	 *
	 * If you would like to include options but not data, you need to explicitly
	 * call this function with `data` being an empty object or `null`.
	 *
	 * @param {String}   template EJS template
	 * @param {Object}  [data={}] template data
	 * @param {Options} [opts={}] compilation and rendering options
	 * @return {String}
	 * @public
	 */
	
	exports.render = function (template, d, o) {
	  var data = d || {};
	  var opts = o || {};
	
	  // No options object -- if there are optiony names
	  // in the data, copy them to options
	  if (arguments.length == 2) {
	    utils.shallowCopyFromList(opts, data, _OPTS);
	  }
	
	  return handleCache(opts, template)(data);
	};
	
	/**
	 * Render an EJS file at the given `path` and callback `cb(err, str)`.
	 *
	 * If you would like to include options but not data, you need to explicitly
	 * call this function with `data` being an empty object or `null`.
	 *
	 * @param {String}             path     path to the EJS file
	 * @param {Object}            [data={}] template data
	 * @param {Options}           [opts={}] compilation and rendering options
	 * @param {RenderFileCallback} cb callback
	 * @public
	 */
	
	exports.renderFile = function () {
	  var args = Array.prototype.slice.call(arguments);
	  var filename = args.shift();
	  var cb = args.pop();
	  var data = args.shift() || {};
	  var opts = args.pop() || {};
	  var optsKeys = _OPTS.slice();
	  var result;
	
	  // Don't pollute passed in opts obj with new vals
	  opts = utils.shallowCopy({}, opts);
	
	  // We don't allow 'cache' option to be passed in the data obj
	  // for the normal `render` call, but this is where Expres puts it
	  // so we make an exception for `renderFile`
	  optsKeys.push('cache');
	
	  // No options object -- if there are optiony names
	  // in the data, copy them to options
	  if (arguments.length == 3) {
	    // Express 4
	    if (data.settings && data.settings['view options']) {
	      utils.shallowCopyFromList(opts, data.settings['view options'], optsKeys);
	    }
	    // Express 3 and lower
	    else {
	        utils.shallowCopyFromList(opts, data, optsKeys);
	      }
	  }
	  opts.filename = filename;
	
	  try {
	    result = handleCache(opts)(data);
	  } catch (err) {
	    return cb(err);
	  }
	  return cb(null, result);
	};
	
	/**
	 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
	 * @public
	 */
	
	exports.clearCache = function () {
	  exports.cache.reset();
	};
	
	function Template(text, opts) {
	  opts = opts || {};
	  var options = {};
	  this.templateText = text;
	  this.mode = null;
	  this.truncate = false;
	  this.currentLine = 1;
	  this.source = '';
	  this.dependencies = [];
	  options.client = opts.client || false;
	  options.escapeFunction = opts.escape || utils.escapeXML;
	  options.compileDebug = opts.compileDebug !== false;
	  options.debug = !!opts.debug;
	  options.filename = opts.filename;
	  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
	  options.strict = opts.strict || false;
	  options.context = opts.context;
	  options.cache = opts.cache || false;
	  options.rmWhitespace = opts.rmWhitespace;
	  options.root = opts.root;
	  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
	
	  if (options.strict) {
	    options._with = false;
	  } else {
	    options._with = typeof opts._with != 'undefined' ? opts._with : true;
	  }
	
	  this.opts = options;
	
	  this.regex = this.createRegex();
	}
	
	Template.modes = {
	  EVAL: 'eval',
	  ESCAPED: 'escaped',
	  RAW: 'raw',
	  COMMENT: 'comment',
	  LITERAL: 'literal'
	};
	
	Template.prototype = {
	  createRegex: function createRegex() {
	    var str = _REGEX_STRING;
	    var delim = utils.escapeRegExpChars(this.opts.delimiter);
	    str = str.replace(/%/g, delim);
	    return new RegExp(str);
	  },
	
	  compile: function compile() {
	    var src;
	    var fn;
	    var opts = this.opts;
	    var prepended = '';
	    var appended = '';
	    var escape = opts.escapeFunction;
	
	    if (!this.source) {
	      this.generateSource();
	      prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
	      if (opts._with !== false) {
	        prepended += '  with (' + opts.localsName + ' || {}) {' + '\n';
	        appended += '  }' + '\n';
	      }
	      appended += '  return __output.join("");' + '\n';
	      this.source = prepended + this.source + appended;
	    }
	
	    if (opts.compileDebug) {
	      src = 'var __line = 1' + '\n' + '  , __lines = ' + JSON.stringify(this.templateText) + '\n' + '  , __filename = ' + (opts.filename ? JSON.stringify(opts.filename) : 'undefined') + ';' + '\n' + 'try {' + '\n' + this.source + '} catch (e) {' + '\n' + '  rethrow(e, __lines, __filename, __line);' + '\n' + '}' + '\n';
	    } else {
	      src = this.source;
	    }
	
	    if (opts.debug) {
	      console.log(src);
	    }
	
	    if (opts.client) {
	      src = 'escape = escape || ' + escape.toString() + ';' + '\n' + src;
	      if (opts.compileDebug) {
	        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
	      }
	    }
	
	    if (opts.strict) {
	      src = '"use strict";\n' + src;
	    }
	
	    try {
	      fn = new Function(opts.localsName + ', escape, include, rethrow', src);
	    } catch (e) {
	      // istanbul ignore else
	      if (e instanceof SyntaxError) {
	        if (opts.filename) {
	          e.message += ' in ' + opts.filename;
	        }
	        e.message += ' while compiling ejs\n\n';
	        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
	        e.message += 'https://github.com/RyanZim/EJS-Lint';
	      }
	      throw e;
	    }
	
	    if (opts.client) {
	      fn.dependencies = this.dependencies;
	      return fn;
	    }
	
	    // Return a callable function which will execute the function
	    // created by the source-code, with the passed data as locals
	    // Adds a local `include` function which allows full recursive include
	    var returnedFn = function returnedFn(data) {
	      var include = function include(path, includeData) {
	        var d = utils.shallowCopy({}, data);
	        if (includeData) {
	          d = utils.shallowCopy(d, includeData);
	        }
	        return includeFile(path, opts)(d);
	      };
	      return fn.apply(opts.context, [data || {}, escape, include, rethrow]);
	    };
	    returnedFn.dependencies = this.dependencies;
	    return returnedFn;
	  },
	
	  generateSource: function generateSource() {
	    var opts = this.opts;
	
	    if (opts.rmWhitespace) {
	      // Have to use two separate replace here as `^` and `$` operators don't
	      // work well with `\r`.
	      this.templateText = this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
	    }
	
	    // Slurp spaces and tabs before <%_ and after _%>
	    this.templateText = this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');
	
	    var self = this;
	    var matches = this.parseTemplateText();
	    var d = this.opts.delimiter;
	
	    if (matches && matches.length) {
	      matches.forEach(function (line, index) {
	        var opening;
	        var closing;
	        var include;
	        var includeOpts;
	        var includeObj;
	        var includeSrc;
	        // If this is an opening tag, check for closing tags
	        // FIXME: May end up with some false positives here
	        // Better to store modes as k/v with '<' + delimiter as key
	        // Then this can simply check against the map
	        if (line.indexOf('<' + d) === 0 // If it is a tag
	        && line.indexOf('<' + d + d) !== 0) {
	          // and is not escaped
	          closing = matches[index + 2];
	          if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
	            throw new Error('Could not find matching close tag for "' + line + '".');
	          }
	        }
	        // HACK: backward-compat `include` preprocessor directives
	        if (include = line.match(/^\s*include\s+(\S+)/)) {
	          opening = matches[index - 1];
	          // Must be in EVAL or RAW mode
	          if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
	            includeOpts = utils.shallowCopy({}, self.opts);
	            includeObj = includeSource(include[1], includeOpts);
	            if (self.opts.compileDebug) {
	              includeSrc = '    ; (function(){' + '\n' + '      var __line = 1' + '\n' + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n' + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n' + '      try {' + '\n' + includeObj.source + '      } catch (e) {' + '\n' + '        rethrow(e, __lines, __filename, __line);' + '\n' + '      }' + '\n' + '    ; }).call(this)' + '\n';
	            } else {
	              includeSrc = '    ; (function(){' + '\n' + includeObj.source + '    ; }).call(this)' + '\n';
	            }
	            self.source += includeSrc;
	            self.dependencies.push(exports.resolveInclude(include[1], includeOpts.filename));
	            return;
	          }
	        }
	        self.scanLine(line);
	      });
	    }
	  },
	
	  parseTemplateText: function parseTemplateText() {
	    var str = this.templateText;
	    var pat = this.regex;
	    var result = pat.exec(str);
	    var arr = [];
	    var firstPos;
	
	    while (result) {
	      firstPos = result.index;
	
	      if (firstPos !== 0) {
	        arr.push(str.substring(0, firstPos));
	        str = str.slice(firstPos);
	      }
	
	      arr.push(result[0]);
	      str = str.slice(result[0].length);
	      result = pat.exec(str);
	    }
	
	    if (str) {
	      arr.push(str);
	    }
	
	    return arr;
	  },
	
	  scanLine: function scanLine(line) {
	    var self = this;
	    var d = this.opts.delimiter;
	    var newLineCount = 0;
	
	    function _addOutput() {
	      if (self.truncate) {
	        // Only replace single leading linebreak in the line after
	        // -%> tag -- this is the single, trailing linebreak
	        // after the tag that the truncation mode replaces
	        // Handle Win / Unix / old Mac linebreaks -- do the \r\n
	        // combo first in the regex-or
	        line = line.replace(/^(?:\r\n|\r|\n)/, '');
	        self.truncate = false;
	      } else if (self.opts.rmWhitespace) {
	        // rmWhitespace has already removed trailing spaces, just need
	        // to remove linebreaks
	        line = line.replace(/^\n/, '');
	      }
	      if (!line) {
	        return;
	      }
	
	      // Preserve literal slashes
	      line = line.replace(/\\/g, '\\\\');
	
	      // Convert linebreaks
	      line = line.replace(/\n/g, '\\n');
	      line = line.replace(/\r/g, '\\r');
	
	      // Escape double-quotes
	      // - this will be the delimiter during execution
	      line = line.replace(/"/g, '\\"');
	      self.source += '    ; __append("' + line + '")' + '\n';
	    }
	
	    newLineCount = line.split('\n').length - 1;
	
	    switch (line) {
	      case '<' + d:
	      case '<' + d + '_':
	        this.mode = Template.modes.EVAL;
	        break;
	      case '<' + d + '=':
	        this.mode = Template.modes.ESCAPED;
	        break;
	      case '<' + d + '-':
	        this.mode = Template.modes.RAW;
	        break;
	      case '<' + d + '#':
	        this.mode = Template.modes.COMMENT;
	        break;
	      case '<' + d + d:
	        this.mode = Template.modes.LITERAL;
	        this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
	        break;
	      case d + d + '>':
	        this.mode = Template.modes.LITERAL;
	        this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
	        break;
	      case d + '>':
	      case '-' + d + '>':
	      case '_' + d + '>':
	        if (this.mode == Template.modes.LITERAL) {
	          _addOutput();
	        }
	
	        this.mode = null;
	        this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
	        break;
	      default:
	        // In script mode, depends on type of tag
	        if (this.mode) {
	          // If '//' is found without a line break, add a line break.
	          switch (this.mode) {
	            case Template.modes.EVAL:
	            case Template.modes.ESCAPED:
	            case Template.modes.RAW:
	              if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
	                line += '\n';
	              }
	          }
	          switch (this.mode) {
	            // Just executing code
	            case Template.modes.EVAL:
	              this.source += '    ; ' + line + '\n';
	              break;
	            // Exec, esc, and output
	            case Template.modes.ESCAPED:
	              this.source += '    ; __append(escape(' + stripSemi(line) + '))' + '\n';
	              break;
	            // Exec and output
	            case Template.modes.RAW:
	              this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
	              break;
	            case Template.modes.COMMENT:
	              // Do nothing
	              break;
	            // Literal <%% mode, append as raw output
	            case Template.modes.LITERAL:
	              _addOutput();
	              break;
	          }
	        }
	        // In string mode, just add the output
	        else {
	            _addOutput();
	          }
	    }
	
	    if (self.opts.compileDebug && newLineCount) {
	      this.currentLine += newLineCount;
	      this.source += '    ; __line = ' + this.currentLine + '\n';
	    }
	  }
	};
	
	/**
	 * Escape characters reserved in XML.
	 *
	 * This is simply an export of {@link module:utils.escapeXML}.
	 *
	 * If `markup` is `undefined` or `null`, the empty string is returned.
	 *
	 * @param {String} markup Input string
	 * @return {String} Escaped string
	 * @public
	 * @func
	 * */
	exports.escapeXML = utils.escapeXML;
	
	/**
	 * Express.js support.
	 *
	 * This is an alias for {@link module:ejs.renderFile}, in order to support
	 * Express.js out-of-the-box.
	 *
	 * @func
	 */
	
	exports.__express = exports.renderFile;
	
	// Add require support
	/* istanbul ignore else */
	if ((void 0)) {
	  (void 0)['.ejs'] = function (module, flnm) {
	    var filename = flnm || /* istanbul ignore next */module.filename;
	    var options = {
	      filename: filename,
	      client: true
	    };
	    var template = fs.readFileSync(filename).toString();
	    var fn = exports.compile(template, options);
	    module._compile('module.exports = ' + fn.toString() + ';', filename);
	  };
	}
	
	/**
	 * Version of EJS.
	 *
	 * @readonly
	 * @type {String}
	 * @public
	 */
	
	exports.VERSION = _VERSION_STRING;
	
	/**
	 * Name for detection of EJS.
	 *
	 * @readonly
	 * @type {String}
	 * @public
	 */
	
	exports.name = _NAME;
	
	/* istanbul ignore if */
	if (typeof window != 'undefined') {
	  window.ejs = exports;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function splitPath(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function () {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = i >= 0 ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function (path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function (p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function (path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function () {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function (p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	// path.relative(from, to)
	// posix version
	exports.relative = function (from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function (path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	exports.basename = function (path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	exports.extname = function (path) {
	  return splitPath(path)[3];
	};
	
	function filter(xs, f) {
	  if (xs.filter) return xs.filter(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    if (f(xs[i], i, xs)) res.push(xs[i]);
	  }
	  return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
	  return str.substr(start, len);
	} : function (str, start, len) {
	  if (start < 0) start = str.length + start;
	  return str.substr(start, len);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
	 * EJS Embedded JavaScript templates
	 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *         http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	*/
	
	/**
	 * Private utility functions
	 * @module utils
	 * @private
	 */
	
	'use strict';
	
	var regExpChars = /[|\\{}()[\]^$+*?.]/g;
	
	/**
	 * Escape characters reserved in regular expressions.
	 *
	 * If `string` is `undefined` or `null`, the empty string is returned.
	 *
	 * @param {String} string Input string
	 * @return {String} Escaped string
	 * @static
	 * @private
	 */
	exports.escapeRegExpChars = function (string) {
	  // istanbul ignore if
	  if (!string) {
	    return '';
	  }
	  return String(string).replace(regExpChars, '\\$&');
	};
	
	var _ENCODE_HTML_RULES = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&#34;',
	  "'": '&#39;'
	};
	var _MATCH_HTML = /[&<>\'"]/g;
	
	function encode_char(c) {
	  return _ENCODE_HTML_RULES[c] || c;
	}
	
	/**
	 * Stringified version of constants used by {@link module:utils.escapeXML}.
	 *
	 * It is used in the process of generating {@link ClientFunction}s.
	 *
	 * @readonly
	 * @type {String}
	 */
	
	var escapeFuncStr = 'var _ENCODE_HTML_RULES = {\n' + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + '    }\n' + '  , _MATCH_HTML = /[&<>\'"]/g;\n' + 'function encode_char(c) {\n' + '  return _ENCODE_HTML_RULES[c] || c;\n' + '};\n';
	
	/**
	 * Escape characters reserved in XML.
	 *
	 * If `markup` is `undefined` or `null`, the empty string is returned.
	 *
	 * @implements {EscapeCallback}
	 * @param {String} markup Input string
	 * @return {String} Escaped string
	 * @static
	 * @private
	 */
	
	exports.escapeXML = function (markup) {
	  return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	};
	exports.escapeXML.toString = function () {
	  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
	};
	
	/**
	 * Naive copy of properties from one object to another.
	 * Does not recurse into non-scalar properties
	 * Does not check to see if the property has a value before copying
	 *
	 * @param  {Object} to   Destination object
	 * @param  {Object} from Source object
	 * @return {Object}      Destination object
	 * @static
	 * @private
	 */
	exports.shallowCopy = function (to, from) {
	  from = from || {};
	  for (var p in from) {
	    to[p] = from[p];
	  }
	  return to;
	};
	
	/**
	 * Naive copy of a list of key names, from one object to another.
	 * Only copies property if it is actually defined
	 * Does not recurse into non-scalar properties
	 *
	 * @param  {Object} to   Destination object
	 * @param  {Object} from Source object
	 * @param  {Array} list List of properties to copy
	 * @return {Object}      Destination object
	 * @static
	 * @private
	 */
	exports.shallowCopyFromList = function (to, from, list) {
	  list.forEach(function (p) {
	    if (typeof from[p] != 'undefined') {
	      to[p] = from[p];
	    }
	  });
	  return to;
	};
	
	/**
	 * Simple in-process cache implementation. Does not implement limits of any
	 * sort.
	 *
	 * @implements Cache
	 * @static
	 * @private
	 */
	exports.cache = {
	  _data: {},
	  set: function set(key, val) {
	    this._data[key] = val;
	  },
	  get: function get(key) {
	    return this._data[key];
	  },
	  reset: function reset() {
	    this._data = {};
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				{
					"raw": "ejs",
					"scope": null,
					"escapedName": "ejs",
					"name": "ejs",
					"rawSpec": "",
					"spec": "latest",
					"type": "tag"
				},
				"C:\\Users\\tan.bui\\Documents\\ebook_nodejs_by_example"
			]
		],
		"_from": "ejs@latest",
		"_id": "ejs@2.5.5",
		"_inCache": true,
		"_location": "/ejs",
		"_nodeVersion": "6.9.1",
		"_npmOperationalInternal": {
			"host": "packages-18-east.internal.npmjs.com",
			"tmp": "tmp/ejs-2.5.5.tgz_1481011535826_0.4493071837350726"
		},
		"_npmUser": {
			"name": "mde",
			"email": "mde@fleegix.org"
		},
		"_npmVersion": "3.10.8",
		"_phantomChildren": {},
		"_requested": {
			"raw": "ejs",
			"scope": null,
			"escapedName": "ejs",
			"name": "ejs",
			"rawSpec": "",
			"spec": "latest",
			"type": "tag"
		},
		"_requiredBy": [
			"#DEV:/",
			"#USER"
		],
		"_resolved": "https://registry.npmjs.org/ejs/-/ejs-2.5.5.tgz",
		"_shasum": "6ef4e954ea7dcf54f66aad2fe7aa421932d9ed77",
		"_shrinkwrap": null,
		"_spec": "ejs",
		"_where": "C:\\Users\\tan.bui\\Documents\\ebook_nodejs_by_example",
		"author": {
			"name": "Matthew Eernisse",
			"email": "mde@fleegix.org",
			"url": "http://fleegix.org"
		},
		"bugs": {
			"url": "https://github.com/mde/ejs/issues"
		},
		"contributors": [
			{
				"name": "Timothy Gu",
				"email": "timothygu99@gmail.com",
				"url": "https://timothygu.github.io"
			}
		],
		"dependencies": {},
		"description": "Embedded JavaScript templates",
		"devDependencies": {
			"browserify": "^13.0.1",
			"eslint": "^3.0.0",
			"git-directory-deploy": "^1.5.1",
			"istanbul": "~0.4.3",
			"jake": "^8.0.0",
			"jsdoc": "^3.4.0",
			"lru-cache": "^4.0.1",
			"mocha": "^3.0.2",
			"uglify-js": "^2.6.2"
		},
		"directories": {},
		"dist": {
			"shasum": "6ef4e954ea7dcf54f66aad2fe7aa421932d9ed77",
			"tarball": "https://registry.npmjs.org/ejs/-/ejs-2.5.5.tgz"
		},
		"engines": {
			"node": ">=0.10.0"
		},
		"homepage": "https://github.com/mde/ejs",
		"keywords": [
			"template",
			"engine",
			"ejs"
		],
		"license": "Apache-2.0",
		"main": "./lib/ejs.js",
		"maintainers": [
			{
				"name": "mde",
				"email": "mde@fleegix.org"
			}
		],
		"name": "ejs",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git://github.com/mde/ejs.git"
		},
		"scripts": {
			"coverage": "istanbul cover node_modules/mocha/bin/_mocha",
			"devdoc": "jake doc[dev]",
			"doc": "jake doc",
			"lint": "eslint \"**/*.js\" Jakefile",
			"test": "mocha"
		},
		"version": "2.5.5"
	};

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map