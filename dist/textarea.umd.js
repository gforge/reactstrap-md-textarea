(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('react'), require('reactstrap')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tslib', 'react', 'reactstrap'], factory) :
    (global = global || self, factory(global['reactstrap-md-textarea'] = {}, global.tslib, global.React, global.reactstrap));
}(this, (function (exports, tslib, React, reactstrap) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;

    var wrapper = function (_a) {
        var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
        return (React.createElement("div", { style: tslib.__assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
    };
    var InputWrapper = React.memo(wrapper);

    var InputTabMD = function (props) {
        var allowFilteredHtml = props.allowFilteredHtml, other = tslib.__rest(props, ["allowFilteredHtml"]);
        return (React.createElement(InputWrapper, null,
            allowFilteredHtml && (React.createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text.")),
            React.createElement(reactstrap.Input, tslib.__assign({ type: "textarea" }, other))));
    };
    var InputTab = React.memo(InputTabMD);

    var immutable = extend;

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function extend() {
        var target = {};

        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target
    }

    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;

    var isArray = function isArray(arr) {
    	if (typeof Array.isArray === 'function') {
    		return Array.isArray(arr);
    	}

    	return toStr.call(arr) === '[object Array]';
    };

    var isPlainObject = function isPlainObject(obj) {
    	if (!obj || toStr.call(obj) !== '[object Object]') {
    		return false;
    	}

    	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
    	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    	// Not own constructor property must be Object
    	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    		return false;
    	}

    	// Own properties are enumerated firstly, so to speed up,
    	// if last one is own, then all properties are own.
    	var key;
    	for (key in obj) { /**/ }

    	return typeof key === 'undefined' || hasOwn.call(obj, key);
    };

    // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
    var setProperty = function setProperty(target, options) {
    	if (defineProperty && options.name === '__proto__') {
    		defineProperty(target, options.name, {
    			enumerable: true,
    			configurable: true,
    			value: options.newValue,
    			writable: true
    		});
    	} else {
    		target[options.name] = options.newValue;
    	}
    };

    // Return undefined instead of __proto__ if '__proto__' is not an own property
    var getProperty = function getProperty(obj, name) {
    	if (name === '__proto__') {
    		if (!hasOwn.call(obj, name)) {
    			return void 0;
    		} else if (gOPD) {
    			// In early versions of node, obj['__proto__'] is buggy when obj has
    			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
    			return gOPD(obj, name).value;
    		}
    	}

    	return obj[name];
    };

    var extend$1 = function extend() {
    	var options, name, src, copy, copyIsArray, clone;
    	var target = arguments[0];
    	var i = 1;
    	var length = arguments.length;
    	var deep = false;

    	// Handle a deep copy situation
    	if (typeof target === 'boolean') {
    		deep = target;
    		target = arguments[1] || {};
    		// skip the boolean and the target
    		i = 2;
    	}
    	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
    		target = {};
    	}

    	for (; i < length; ++i) {
    		options = arguments[i];
    		// Only deal with non-null/undefined values
    		if (options != null) {
    			// Extend the base object
    			for (name in options) {
    				src = getProperty(target, name);
    				copy = getProperty(options, name);

    				// Prevent never-ending loop
    				if (target !== copy) {
    					// Recurse if we're merging plain objects or arrays
    					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
    						if (copyIsArray) {
    							copyIsArray = false;
    							clone = src && isArray(src) ? src : [];
    						} else {
    							clone = src && isPlainObject(src) ? src : {};
    						}

    						// Never move original objects, clone them
    						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

    					// Don't bring in undefined values
    					} else if (typeof copy !== 'undefined') {
    						setProperty(target, { name: name, newValue: copy });
    					}
    				}
    			}
    		}
    	}

    	// Return the modified object
    	return target;
    };

    var bail_1 = bail;

    function bail(err) {
      if (err) {
        throw err
      }
    }

    var own = {}.hasOwnProperty;

    var unistUtilStringifyPosition = stringify;

    function stringify(value) {
      /* Nothing. */
      if (!value || typeof value !== 'object') {
        return null
      }

      /* Node. */
      if (own.call(value, 'position') || own.call(value, 'type')) {
        return position(value.position)
      }

      /* Position. */
      if (own.call(value, 'start') || own.call(value, 'end')) {
        return position(value)
      }

      /* Point. */
      if (own.call(value, 'line') || own.call(value, 'column')) {
        return point(value)
      }

      /* ? */
      return null
    }

    function point(point) {
      if (!point || typeof point !== 'object') {
        point = {};
      }

      return index(point.line) + ':' + index(point.column)
    }

    function position(pos) {
      if (!pos || typeof pos !== 'object') {
        pos = {};
      }

      return point(pos.start) + '-' + point(pos.end)
    }

    function index(value) {
      return value && typeof value === 'number' ? value : 1
    }

    var vfileMessage = VMessage;

    // Inherit from `Error#`.
    function VMessagePrototype() {}
    VMessagePrototype.prototype = Error.prototype;
    VMessage.prototype = new VMessagePrototype();

    // Message properties.
    var proto = VMessage.prototype;

    proto.file = '';
    proto.name = '';
    proto.reason = '';
    proto.message = '';
    proto.stack = '';
    proto.fatal = null;
    proto.column = null;
    proto.line = null;

    // Construct a new VMessage.
    //
    // Note: We cannot invoke `Error` on the created context, as that adds readonly
    // `line` and `column` attributes on Safari 9, thus throwing and failing the
    // data.
    function VMessage(reason, position, origin) {
      var parts;
      var range;
      var location;

      if (typeof position === 'string') {
        origin = position;
        position = null;
      }

      parts = parseOrigin(origin);
      range = unistUtilStringifyPosition(position) || '1:1';

      location = {
        start: {line: null, column: null},
        end: {line: null, column: null}
      };

      // Node.
      if (position && position.position) {
        position = position.position;
      }

      if (position) {
        // Position.
        if (position.start) {
          location = position;
          position = position.start;
        } else {
          // Point.
          location.start = position;
        }
      }

      if (reason.stack) {
        this.stack = reason.stack;
        reason = reason.message;
      }

      this.message = reason;
      this.name = range;
      this.reason = reason;
      this.line = position ? position.line : null;
      this.column = position ? position.column : null;
      this.location = location;
      this.source = parts[0];
      this.ruleId = parts[1];
    }

    function parseOrigin(origin) {
      var result = [null, null];
      var index;

      if (typeof origin === 'string') {
        index = origin.indexOf(':');

        if (index === -1) {
          result[1] = origin;
        } else {
          result[0] = origin.slice(0, index);
          result[1] = origin.slice(index + 1);
        }
      }

      return result
    }

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
    var splitPathRe =
        /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    var splitPath = function(filename) {
      return splitPathRe.exec(filename).slice(1);
    };

    // path.resolve([from ...], to)
    // posix version
    function resolve() {
      var resolvedPath = '',
          resolvedAbsolute = false;

      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = (i >= 0) ? arguments[i] : '/';

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
      resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
        return !!p;
      }), !resolvedAbsolute).join('/');

      return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
    }
    // path.normalize(path)
    // posix version
    function normalize(path) {
      var isPathAbsolute = isAbsolute(path),
          trailingSlash = substr(path, -1) === '/';

      // Normalize the path
      path = normalizeArray(filter(path.split('/'), function(p) {
        return !!p;
      }), !isPathAbsolute).join('/');

      if (!path && !isPathAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }

      return (isPathAbsolute ? '/' : '') + path;
    }
    // posix version
    function isAbsolute(path) {
      return path.charAt(0) === '/';
    }

    // posix version
    function join() {
      var paths = Array.prototype.slice.call(arguments, 0);
      return normalize(filter(paths, function(p, index) {
        if (typeof p !== 'string') {
          throw new TypeError('Arguments to path.join must be strings');
        }
        return p;
      }).join('/'));
    }


    // path.relative(from, to)
    // posix version
    function relative(from, to) {
      from = resolve(from).substr(1);
      to = resolve(to).substr(1);

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
    }

    var sep = '/';
    var delimiter = ':';

    function dirname(path) {
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
    }

    function basename(path, ext) {
      var f = splitPath(path)[2];
      // TODO: make this comparison case-insensitive on windows?
      if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
      }
      return f;
    }


    function extname(path) {
      return splitPath(path)[3];
    }
    var path = {
      extname: extname,
      basename: basename,
      dirname: dirname,
      sep: sep,
      delimiter: delimiter,
      relative: relative,
      join: join,
      isAbsolute: isAbsolute,
      normalize: normalize,
      resolve: resolve
    };
    function filter (xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
        }
        return res;
    }

    // String.prototype.substr - negative index don't work in IE8
    var substr = 'ab'.substr(-1) === 'b' ?
        function (str, start, len) { return str.substr(start, len) } :
        function (str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
        }
    ;

    function replaceExt(npath, ext) {
      if (typeof npath !== 'string') {
        return npath;
      }

      if (npath.length === 0) {
        return npath;
      }

      var nFileName = path.basename(npath, path.extname(npath)) + ext;
      return path.join(path.dirname(npath), nFileName);
    }

    var replaceExt_1 = replaceExt;

    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    // The _isBuffer check is for Safari 5-7 support, because it's missing
    // Object.prototype.constructor. Remove this eventually
    var isBuffer_1 = function (obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
    };

    function isBuffer (obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    }

    // For Node v0.10 support. Remove this eventually.
    function isSlowBuffer (obj) {
      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
    }

    var core = VFile;

    var own$1 = {}.hasOwnProperty;
    var proto$1 = VFile.prototype;

    proto$1.toString = toString;

    /* Order of setting (least specific to most), we need this because
     * otherwise `{stem: 'a', path: '~/b.js'}` would throw, as a path
     * is needed before a stem can be set. */
    var order = [
      'history',
      'path',
      'basename',
      'stem',
      'extname',
      'dirname'
    ];

    /* Construct a new file. */
    function VFile(options) {
      var prop;
      var index;
      var length;

      if (!options) {
        options = {};
      } else if (typeof options === 'string' || isBuffer_1(options)) {
        options = {contents: options};
      } else if ('message' in options && 'messages' in options) {
        return options;
      }

      if (!(this instanceof VFile)) {
        return new VFile(options);
      }

      this.data = {};
      this.messages = [];
      this.history = [];
      this.cwd = process.cwd();

      /* Set path related properties in the correct order. */
      index = -1;
      length = order.length;

      while (++index < length) {
        prop = order[index];

        if (own$1.call(options, prop)) {
          this[prop] = options[prop];
        }
      }

      /* Set non-path related properties. */
      for (prop in options) {
        if (order.indexOf(prop) === -1) {
          this[prop] = options[prop];
        }
      }
    }

    /* Access full path (`~/index.min.js`). */
    Object.defineProperty(proto$1, 'path', {
      get: function () {
        return this.history[this.history.length - 1];
      },
      set: function (path) {
        assertNonEmpty(path, 'path');

        if (path !== this.path) {
          this.history.push(path);
        }
      }
    });

    /* Access parent path (`~`). */
    Object.defineProperty(proto$1, 'dirname', {
      get: function () {
        return typeof this.path === 'string' ? path.dirname(this.path) : undefined;
      },
      set: function (dirname) {
        assertPath(this.path, 'dirname');
        this.path = path.join(dirname || '', this.basename);
      }
    });

    /* Access basename (`index.min.js`). */
    Object.defineProperty(proto$1, 'basename', {
      get: function () {
        return typeof this.path === 'string' ? path.basename(this.path) : undefined;
      },
      set: function (basename) {
        assertNonEmpty(basename, 'basename');
        assertPart(basename, 'basename');
        this.path = path.join(this.dirname || '', basename);
      }
    });

    /* Access extname (`.js`). */
    Object.defineProperty(proto$1, 'extname', {
      get: function () {
        return typeof this.path === 'string' ? path.extname(this.path) : undefined;
      },
      set: function (extname) {
        var ext = extname || '';

        assertPart(ext, 'extname');
        assertPath(this.path, 'extname');

        if (ext) {
          if (ext.charAt(0) !== '.') {
            throw new Error('`extname` must start with `.`');
          }

          if (ext.indexOf('.', 1) !== -1) {
            throw new Error('`extname` cannot contain multiple dots');
          }
        }

        this.path = replaceExt_1(this.path, ext);
      }
    });

    /* Access stem (`index.min`). */
    Object.defineProperty(proto$1, 'stem', {
      get: function () {
        return typeof this.path === 'string' ? path.basename(this.path, this.extname) : undefined;
      },
      set: function (stem) {
        assertNonEmpty(stem, 'stem');
        assertPart(stem, 'stem');
        this.path = path.join(this.dirname || '', stem + (this.extname || ''));
      }
    });

    /* Get the value of the file. */
    function toString(encoding) {
      var value = this.contents || '';
      return isBuffer_1(value) ? value.toString(encoding) : String(value);
    }

    /* Assert that `part` is not a path (i.e., does
     * not contain `path.sep`). */
    function assertPart(part, name) {
      if (part.indexOf(path.sep) !== -1) {
        throw new Error('`' + name + '` cannot be a path: did not expect `' + path.sep + '`');
      }
    }

    /* Assert that `part` is not empty. */
    function assertNonEmpty(part, name) {
      if (!part) {
        throw new Error('`' + name + '` cannot be empty');
      }
    }

    /* Assert `path` exists. */
    function assertPath(path, name) {
      if (!path) {
        throw new Error('Setting `' + name + '` requires `path` to be set too');
      }
    }

    var vfile = core;

    var proto$2 = core.prototype;

    proto$2.message = message;
    proto$2.info = info;
    proto$2.fail = fail;

    /* Slight backwards compatibility.  Remove in the future. */
    proto$2.warn = message;

    /* Create a message with `reason` at `position`.
     * When an error is passed in as `reason`, copies the stack. */
    function message(reason, position, origin) {
      var filePath = this.path;
      var message = new vfileMessage(reason, position, origin);

      if (filePath) {
        message.name = filePath + ':' + message.name;
        message.file = filePath;
      }

      message.fatal = false;

      this.messages.push(message);

      return message;
    }

    /* Fail. Creates a vmessage, associates it with the file,
     * and throws it. */
    function fail() {
      var message = this.message.apply(this, arguments);

      message.fatal = true;

      throw message;
    }

    /* Info. Creates a vmessage, associates it with the file,
     * and marks the fatality as null. */
    function info() {
      var message = this.message.apply(this, arguments);

      message.fatal = null;

      return message;
    }

    var slice = [].slice;

    var wrap_1 = wrap;

    // Wrap `fn`.
    // Can be sync or async; return a promise, receive a completion handler, return
    // new values and errors.
    function wrap(fn, callback) {
      var invoked;

      return wrapped

      function wrapped() {
        var params = slice.call(arguments, 0);
        var callback = fn.length > params.length;
        var result;

        if (callback) {
          params.push(done);
        }

        try {
          result = fn.apply(null, params);
        } catch (error) {
          // Well, this is quite the pickle.
          // `fn` received a callback and invoked it (thus continuing the pipeline),
          // but later also threw an error.
          // We’re not about to restart the pipeline again, so the only thing left
          // to do is to throw the thing instead.
          if (callback && invoked) {
            throw error
          }

          return done(error)
        }

        if (!callback) {
          if (result && typeof result.then === 'function') {
            result.then(then, done);
          } else if (result instanceof Error) {
            done(result);
          } else {
            then(result);
          }
        }
      }

      // Invoke `next`, only once.
      function done() {
        if (!invoked) {
          invoked = true;

          callback.apply(null, arguments);
        }
      }

      // Invoke `done` with one value.
      // Tracks if an error is passed, too.
      function then(value) {
        done(null, value);
      }
    }

    var trough_1 = trough;

    trough.wrap = wrap_1;

    var slice$1 = [].slice;

    // Create new middleware.
    function trough() {
      var fns = [];
      var middleware = {};

      middleware.run = run;
      middleware.use = use;

      return middleware

      // Run `fns`.  Last argument must be a completion handler.
      function run() {
        var index = -1;
        var input = slice$1.call(arguments, 0, -1);
        var done = arguments[arguments.length - 1];

        if (typeof done !== 'function') {
          throw new Error('Expected function as last argument, not ' + done)
        }

        next.apply(null, [null].concat(input));

        // Run the next `fn`, if any.
        function next(err) {
          var fn = fns[++index];
          var params = slice$1.call(arguments, 0);
          var values = params.slice(1);
          var length = input.length;
          var pos = -1;

          if (err) {
            done(err);
            return
          }

          // Copy non-nully input into values.
          while (++pos < length) {
            if (values[pos] === null || values[pos] === undefined) {
              values[pos] = input[pos];
            }
          }

          input = values;

          // Next or done.
          if (fn) {
            wrap_1(fn, next).apply(null, input);
          } else {
            done.apply(null, [null].concat(input));
          }
        }
      }

      // Add `fn` to the list.
      function use(fn) {
        if (typeof fn !== 'function') {
          throw new Error('Expected `fn` to be a function, not ' + fn)
        }

        fns.push(fn);

        return middleware
      }
    }

    var toString$1 = Object.prototype.toString;

    var xIsString = isString;

    function isString(obj) {
        return toString$1.call(obj) === "[object String]"
    }

    var toString$2 = Object.prototype.toString;

    var isPlainObj = function (x) {
    	var prototype;
    	return toString$2.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
    };

    /* Dependencies. */







    /* Expose a frozen processor. */
    var unified_1 = unified().freeze();

    var slice$2 = [].slice;
    var own$2 = {}.hasOwnProperty;

    /* Process pipeline. */
    var pipeline = trough_1()
      .use(pipelineParse)
      .use(pipelineRun)
      .use(pipelineStringify);

    function pipelineParse(p, ctx) {
      ctx.tree = p.parse(ctx.file);
    }

    function pipelineRun(p, ctx, next) {
      p.run(ctx.tree, ctx.file, done);

      function done(err, tree, file) {
        if (err) {
          next(err);
        } else {
          ctx.tree = tree;
          ctx.file = file;
          next();
        }
      }
    }

    function pipelineStringify(p, ctx) {
      ctx.file.contents = p.stringify(ctx.tree, ctx.file);
    }

    /* Function to create the first processor. */
    function unified() {
      var attachers = [];
      var transformers = trough_1();
      var namespace = {};
      var frozen = false;
      var freezeIndex = -1;

      /* Data management. */
      processor.data = data;

      /* Lock. */
      processor.freeze = freeze;

      /* Plug-ins. */
      processor.attachers = attachers;
      processor.use = use;

      /* API. */
      processor.parse = parse;
      processor.stringify = stringify;
      processor.run = run;
      processor.runSync = runSync;
      processor.process = process;
      processor.processSync = processSync;

      /* Expose. */
      return processor

      /* Create a new processor based on the processor
       * in the current scope. */
      function processor() {
        var destination = unified();
        var length = attachers.length;
        var index = -1;

        while (++index < length) {
          destination.use.apply(null, attachers[index]);
        }

        destination.data(extend$1(true, {}, namespace));

        return destination
      }

      /* Freeze: used to signal a processor that has finished
       * configuration.
       *
       * For example, take unified itself.  It’s frozen.
       * Plug-ins should not be added to it.  Rather, it should
       * be extended, by invoking it, before modifying it.
       *
       * In essence, always invoke this when exporting a
       * processor. */
      function freeze() {
        var values;
        var plugin;
        var options;
        var transformer;

        if (frozen) {
          return processor
        }

        while (++freezeIndex < attachers.length) {
          values = attachers[freezeIndex];
          plugin = values[0];
          options = values[1];
          transformer = null;

          if (options === false) {
            continue
          }

          if (options === true) {
            values[1] = undefined;
          }

          transformer = plugin.apply(processor, values.slice(1));

          if (typeof transformer === 'function') {
            transformers.use(transformer);
          }
        }

        frozen = true;
        freezeIndex = Infinity;

        return processor
      }

      /* Data management.
       * Getter / setter for processor-specific informtion. */
      function data(key, value) {
        if (xIsString(key)) {
          /* Set `key`. */
          if (arguments.length === 2) {
            assertUnfrozen('data', frozen);

            namespace[key] = value;

            return processor
          }

          /* Get `key`. */
          return (own$2.call(namespace, key) && namespace[key]) || null
        }

        /* Set space. */
        if (key) {
          assertUnfrozen('data', frozen);
          namespace = key;
          return processor
        }

        /* Get space. */
        return namespace
      }

      /* Plug-in management.
       *
       * Pass it:
       * *   an attacher and options,
       * *   a preset,
       * *   a list of presets, attachers, and arguments (list
       *     of attachers and options). */
      function use(value) {
        var settings;

        assertUnfrozen('use', frozen);

        if (value === null || value === undefined) ; else if (typeof value === 'function') {
          addPlugin.apply(null, arguments);
        } else if (typeof value === 'object') {
          if ('length' in value) {
            addList(value);
          } else {
            addPreset(value);
          }
        } else {
          throw new Error('Expected usable value, not `' + value + '`')
        }

        if (settings) {
          namespace.settings = extend$1(namespace.settings || {}, settings);
        }

        return processor

        function addPreset(result) {
          addList(result.plugins);

          if (result.settings) {
            settings = extend$1(settings || {}, result.settings);
          }
        }

        function add(value) {
          if (typeof value === 'function') {
            addPlugin(value);
          } else if (typeof value === 'object') {
            if ('length' in value) {
              addPlugin.apply(null, value);
            } else {
              addPreset(value);
            }
          } else {
            throw new Error('Expected usable value, not `' + value + '`')
          }
        }

        function addList(plugins) {
          var length;
          var index;

          if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
            length = plugins.length;
            index = -1;

            while (++index < length) {
              add(plugins[index]);
            }
          } else {
            throw new Error('Expected a list of plugins, not `' + plugins + '`')
          }
        }

        function addPlugin(plugin, value) {
          var entry = find(plugin);

          if (entry) {
            if (isPlainObj(entry[1]) && isPlainObj(value)) {
              value = extend$1(entry[1], value);
            }

            entry[1] = value;
          } else {
            attachers.push(slice$2.call(arguments));
          }
        }
      }

      function find(plugin) {
        var length = attachers.length;
        var index = -1;
        var entry;

        while (++index < length) {
          entry = attachers[index];

          if (entry[0] === plugin) {
            return entry
          }
        }
      }

      /* Parse a file (in string or VFile representation)
       * into a Unist node using the `Parser` on the
       * processor. */
      function parse(doc) {
        var file = vfile(doc);
        var Parser;

        freeze();
        Parser = processor.Parser;
        assertParser('parse', Parser);

        if (newable(Parser)) {
          return new Parser(String(file), file).parse()
        }

        return Parser(String(file), file) // eslint-disable-line new-cap
      }

      /* Run transforms on a Unist node representation of a file
       * (in string or VFile representation), async. */
      function run(node, file, cb) {
        assertNode(node);
        freeze();

        if (!cb && typeof file === 'function') {
          cb = file;
          file = null;
        }

        if (!cb) {
          return new Promise(executor)
        }

        executor(null, cb);

        function executor(resolve, reject) {
          transformers.run(node, vfile(file), done);

          function done(err, tree, file) {
            tree = tree || node;
            if (err) {
              reject(err);
            } else if (resolve) {
              resolve(tree);
            } else {
              cb(null, tree, file);
            }
          }
        }
      }

      /* Run transforms on a Unist node representation of a file
       * (in string or VFile representation), sync. */
      function runSync(node, file) {
        var complete = false;
        var result;

        run(node, file, done);

        assertDone('runSync', 'run', complete);

        return result

        function done(err, tree) {
          complete = true;
          bail_1(err);
          result = tree;
        }
      }

      /* Stringify a Unist node representation of a file
       * (in string or VFile representation) into a string
       * using the `Compiler` on the processor. */
      function stringify(node, doc) {
        var file = vfile(doc);
        var Compiler;

        freeze();
        Compiler = processor.Compiler;
        assertCompiler('stringify', Compiler);
        assertNode(node);

        if (newable(Compiler)) {
          return new Compiler(node, file).compile()
        }

        return Compiler(node, file) // eslint-disable-line new-cap
      }

      /* Parse a file (in string or VFile representation)
       * into a Unist node using the `Parser` on the processor,
       * then run transforms on that node, and compile the
       * resulting node using the `Compiler` on the processor,
       * and store that result on the VFile. */
      function process(doc, cb) {
        freeze();
        assertParser('process', processor.Parser);
        assertCompiler('process', processor.Compiler);

        if (!cb) {
          return new Promise(executor)
        }

        executor(null, cb);

        function executor(resolve, reject) {
          var file = vfile(doc);

          pipeline.run(processor, {file: file}, done);

          function done(err) {
            if (err) {
              reject(err);
            } else if (resolve) {
              resolve(file);
            } else {
              cb(null, file);
            }
          }
        }
      }

      /* Process the given document (in string or VFile
       * representation), sync. */
      function processSync(doc) {
        var complete = false;
        var file;

        freeze();
        assertParser('processSync', processor.Parser);
        assertCompiler('processSync', processor.Compiler);
        file = vfile(doc);

        process(file, done);

        assertDone('processSync', 'process', complete);

        return file

        function done(err) {
          complete = true;
          bail_1(err);
        }
      }
    }

    /* Check if `func` is a constructor. */
    function newable(value) {
      return typeof value === 'function' && keys(value.prototype)
    }

    /* Check if `value` is an object with keys. */
    function keys(value) {
      var key;
      for (key in value) {
        return true
      }
      return false
    }

    /* Assert a parser is available. */
    function assertParser(name, Parser) {
      if (typeof Parser !== 'function') {
        throw new Error('Cannot `' + name + '` without `Parser`')
      }
    }

    /* Assert a compiler is available. */
    function assertCompiler(name, Compiler) {
      if (typeof Compiler !== 'function') {
        throw new Error('Cannot `' + name + '` without `Compiler`')
      }
    }

    /* Assert the processor is not frozen. */
    function assertUnfrozen(name, frozen) {
      if (frozen) {
        throw new Error(
          [
            'Cannot invoke `' + name + '` on a frozen processor.\nCreate a new ',
            'processor first, by invoking it: use `processor()` instead of ',
            '`processor`.'
          ].join('')
        )
      }
    }

    /* Assert `node` is a Unist node. */
    function assertNode(node) {
      if (!node || !xIsString(node.type)) {
        throw new Error('Expected node, got `' + node + '`')
      }
    }

    /* Assert that `complete` is `true`. */
    function assertDone(name, asyncName, complete) {
      if (!complete) {
        throw new Error(
          '`' + name + '` finished async. Use `' + asyncName + '` instead'
        )
      }
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var inherits_browser = createCommonjsModule(function (module) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
    });

    var unherit_1 = unherit;

    // Create a custom constructor which can be modified without affecting the
    // original class.
    function unherit(Super) {
      var result;
      var key;
      var value;

      inherits_browser(Of, Super);
      inherits_browser(From, Of);

      // Clone values.
      result = Of.prototype;

      for (key in result) {
        value = result[key];

        if (value && typeof value === 'object') {
          result[key] = 'concat' in value ? value.concat() : immutable(value);
        }
      }

      return Of

      // Constructor accepting a single argument, which itself is an `arguments`
      // object.
      function From(parameters) {
        return Super.apply(this, parameters)
      }

      // Constructor accepting variadic arguments.
      function Of() {
        if (!(this instanceof Of)) {
          return new From(arguments)
        }

        return Super.apply(this, arguments)
      }
    }

    var stateToggle = factory;

    // Construct a state `toggler`: a function which inverses `property` in context
    // based on its current value.
    // The by `toggler` returned function restores that value.
    function factory(key, state, ctx) {
      return enter

      function enter() {
        var context = ctx || this;
        var current = context[key];

        context[key] = !state;

        return exit

        function exit() {
          context[key] = current;
        }
      }
    }

    var vfileLocation = factory$1;

    function factory$1(file) {
      var contents = indices(String(file));

      return {
        toPosition: offsetToPositionFactory(contents),
        toOffset: positionToOffsetFactory(contents)
      }
    }

    // Factory to get the line and column-based `position` for `offset` in the bound
    // indices.
    function offsetToPositionFactory(indices) {
      return offsetToPosition

      // Get the line and column-based `position` for `offset` in the bound indices.
      function offsetToPosition(offset) {
        var index = -1;
        var length = indices.length;

        if (offset < 0) {
          return {}
        }

        while (++index < length) {
          if (indices[index] > offset) {
            return {
              line: index + 1,
              column: offset - (indices[index - 1] || 0) + 1,
              offset: offset
            }
          }
        }

        return {}
      }
    }

    // Factory to get the `offset` for a line and column-based `position` in the
    // bound indices.
    function positionToOffsetFactory(indices) {
      return positionToOffset

      // Get the `offset` for a line and column-based `position` in the bound
      // indices.
      function positionToOffset(position) {
        var line = position && position.line;
        var column = position && position.column;

        if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
          return (indices[line - 2] || 0) + column - 1 || 0
        }

        return -1
      }
    }

    // Get indices of line-breaks in `value`.
    function indices(value) {
      var result = [];
      var index = value.indexOf('\n');

      while (index !== -1) {
        result.push(index + 1);
        index = value.indexOf('\n', index + 1);
      }

      result.push(value.length + 1);

      return result
    }

    var _unescape = factory$2;

    /* Factory to de-escape a value, based on a list at `key`
     * in `ctx`. */
    function factory$2(ctx, key) {
      return unescape;

      /* De-escape a string using the expression at `key`
       * in `ctx`. */
      function unescape(value) {
        var prev = 0;
        var index = value.indexOf('\\');
        var escape = ctx[key];
        var queue = [];
        var character;

        while (index !== -1) {
          queue.push(value.slice(prev, index));
          prev = index + 1;
          character = value.charAt(prev);

          /* If the following character is not a valid escape,
           * add the slash. */
          if (!character || escape.indexOf(character) === -1) {
            queue.push('\\');
          }

          index = value.indexOf('\\', prev);
        }

        queue.push(value.slice(prev));

        return queue.join('');
      }
    }

    var AElig = "Æ";
    var AMP = "&";
    var Aacute = "Á";
    var Acirc = "Â";
    var Agrave = "À";
    var Aring = "Å";
    var Atilde = "Ã";
    var Auml = "Ä";
    var COPY = "©";
    var Ccedil = "Ç";
    var ETH = "Ð";
    var Eacute = "É";
    var Ecirc = "Ê";
    var Egrave = "È";
    var Euml = "Ë";
    var GT = ">";
    var Iacute = "Í";
    var Icirc = "Î";
    var Igrave = "Ì";
    var Iuml = "Ï";
    var LT = "<";
    var Ntilde = "Ñ";
    var Oacute = "Ó";
    var Ocirc = "Ô";
    var Ograve = "Ò";
    var Oslash = "Ø";
    var Otilde = "Õ";
    var Ouml = "Ö";
    var QUOT = "\"";
    var REG = "®";
    var THORN = "Þ";
    var Uacute = "Ú";
    var Ucirc = "Û";
    var Ugrave = "Ù";
    var Uuml = "Ü";
    var Yacute = "Ý";
    var aacute = "á";
    var acirc = "â";
    var acute = "´";
    var aelig = "æ";
    var agrave = "à";
    var amp = "&";
    var aring = "å";
    var atilde = "ã";
    var auml = "ä";
    var brvbar = "¦";
    var ccedil = "ç";
    var cedil = "¸";
    var cent = "¢";
    var copy = "©";
    var curren = "¤";
    var deg = "°";
    var divide = "÷";
    var eacute = "é";
    var ecirc = "ê";
    var egrave = "è";
    var eth = "ð";
    var euml = "ë";
    var frac12 = "½";
    var frac14 = "¼";
    var frac34 = "¾";
    var gt = ">";
    var iacute = "í";
    var icirc = "î";
    var iexcl = "¡";
    var igrave = "ì";
    var iquest = "¿";
    var iuml = "ï";
    var laquo = "«";
    var lt = "<";
    var macr = "¯";
    var micro = "µ";
    var middot = "·";
    var nbsp = " ";
    var not = "¬";
    var ntilde = "ñ";
    var oacute = "ó";
    var ocirc = "ô";
    var ograve = "ò";
    var ordf = "ª";
    var ordm = "º";
    var oslash = "ø";
    var otilde = "õ";
    var ouml = "ö";
    var para = "¶";
    var plusmn = "±";
    var pound = "£";
    var quot = "\"";
    var raquo = "»";
    var reg = "®";
    var sect = "§";
    var shy = "­";
    var sup1 = "¹";
    var sup2 = "²";
    var sup3 = "³";
    var szlig = "ß";
    var thorn = "þ";
    var times = "×";
    var uacute = "ú";
    var ucirc = "û";
    var ugrave = "ù";
    var uml = "¨";
    var uuml = "ü";
    var yacute = "ý";
    var yen = "¥";
    var yuml = "ÿ";
    var legacy = {
    	AElig: AElig,
    	AMP: AMP,
    	Aacute: Aacute,
    	Acirc: Acirc,
    	Agrave: Agrave,
    	Aring: Aring,
    	Atilde: Atilde,
    	Auml: Auml,
    	COPY: COPY,
    	Ccedil: Ccedil,
    	ETH: ETH,
    	Eacute: Eacute,
    	Ecirc: Ecirc,
    	Egrave: Egrave,
    	Euml: Euml,
    	GT: GT,
    	Iacute: Iacute,
    	Icirc: Icirc,
    	Igrave: Igrave,
    	Iuml: Iuml,
    	LT: LT,
    	Ntilde: Ntilde,
    	Oacute: Oacute,
    	Ocirc: Ocirc,
    	Ograve: Ograve,
    	Oslash: Oslash,
    	Otilde: Otilde,
    	Ouml: Ouml,
    	QUOT: QUOT,
    	REG: REG,
    	THORN: THORN,
    	Uacute: Uacute,
    	Ucirc: Ucirc,
    	Ugrave: Ugrave,
    	Uuml: Uuml,
    	Yacute: Yacute,
    	aacute: aacute,
    	acirc: acirc,
    	acute: acute,
    	aelig: aelig,
    	agrave: agrave,
    	amp: amp,
    	aring: aring,
    	atilde: atilde,
    	auml: auml,
    	brvbar: brvbar,
    	ccedil: ccedil,
    	cedil: cedil,
    	cent: cent,
    	copy: copy,
    	curren: curren,
    	deg: deg,
    	divide: divide,
    	eacute: eacute,
    	ecirc: ecirc,
    	egrave: egrave,
    	eth: eth,
    	euml: euml,
    	frac12: frac12,
    	frac14: frac14,
    	frac34: frac34,
    	gt: gt,
    	iacute: iacute,
    	icirc: icirc,
    	iexcl: iexcl,
    	igrave: igrave,
    	iquest: iquest,
    	iuml: iuml,
    	laquo: laquo,
    	lt: lt,
    	macr: macr,
    	micro: micro,
    	middot: middot,
    	nbsp: nbsp,
    	not: not,
    	ntilde: ntilde,
    	oacute: oacute,
    	ocirc: ocirc,
    	ograve: ograve,
    	ordf: ordf,
    	ordm: ordm,
    	oslash: oslash,
    	otilde: otilde,
    	ouml: ouml,
    	para: para,
    	plusmn: plusmn,
    	pound: pound,
    	quot: quot,
    	raquo: raquo,
    	reg: reg,
    	sect: sect,
    	shy: shy,
    	sup1: sup1,
    	sup2: sup2,
    	sup3: sup3,
    	szlig: szlig,
    	thorn: thorn,
    	times: times,
    	uacute: uacute,
    	ucirc: ucirc,
    	ugrave: ugrave,
    	uml: uml,
    	uuml: uuml,
    	yacute: yacute,
    	yen: yen,
    	yuml: yuml
    };

    var invalid = {
    	"0": "�",
    	"128": "€",
    	"130": "‚",
    	"131": "ƒ",
    	"132": "„",
    	"133": "…",
    	"134": "†",
    	"135": "‡",
    	"136": "ˆ",
    	"137": "‰",
    	"138": "Š",
    	"139": "‹",
    	"140": "Œ",
    	"142": "Ž",
    	"145": "‘",
    	"146": "’",
    	"147": "“",
    	"148": "”",
    	"149": "•",
    	"150": "–",
    	"151": "—",
    	"152": "˜",
    	"153": "™",
    	"154": "š",
    	"155": "›",
    	"156": "œ",
    	"158": "ž",
    	"159": "Ÿ"
    };

    var isDecimal = decimal;

    // Check if the given character code, or the character code at the first
    // character, is decimal.
    function decimal(character) {
      var code = typeof character === 'string' ? character.charCodeAt(0) : character;

      return code >= 48 && code <= 57 /* 0-9 */
    }

    var isHexadecimal = hexadecimal;

    // Check if the given character code, or the character code at the first
    // character, is hexadecimal.
    function hexadecimal(character) {
      var code = typeof character === 'string' ? character.charCodeAt(0) : character;

      return (
        (code >= 97 /* a */ && code <= 102) /* z */ ||
        (code >= 65 /* A */ && code <= 70) /* Z */ ||
        (code >= 48 /* A */ && code <= 57) /* Z */
      )
    }

    var isAlphabetical = alphabetical;

    // Check if the given character code, or the character code at the first
    // character, is alphabetical.
    function alphabetical(character) {
      var code = typeof character === 'string' ? character.charCodeAt(0) : character;

      return (
        (code >= 97 && code <= 122) /* a-z */ ||
        (code >= 65 && code <= 90) /* A-Z */
      )
    }

    var isAlphanumerical = alphanumerical;

    // Check if the given character code, or the character code at the first
    // character, is alphanumerical.
    function alphanumerical(character) {
      return isAlphabetical(character) || isDecimal(character)
    }

    /* eslint-env browser */

    var el;

    var semicolon = 59; //  ';'

    var decodeEntity_browser = decodeEntity;

    function decodeEntity(characters) {
      var entity = '&' + characters + ';';
      var char;

      el = el || document.createElement('i');
      el.innerHTML = entity;
      char = el.textContent;

      // Some entities do not require the closing semicolon (`&not` - for instance),
      // which leads to situations where parsing the assumed entity of &notit; will
      // result in the string `¬it;`.  When we encounter a trailing semicolon after
      // parsing and the entity to decode was not a semicolon (`&semi;`), we can
      // assume that the matching was incomplete
      if (char.charCodeAt(char.length - 1) === semicolon && characters !== 'semi') {
        return false
      }

      // If the decoded string is equal to the input, the entity was not valid
      return char === entity ? false : char
    }

    var parseEntities_1 = parseEntities;

    var own$3 = {}.hasOwnProperty;
    var fromCharCode = String.fromCharCode;
    var noop = Function.prototype;

    // Default settings.
    var defaults = {
      warning: null,
      reference: null,
      text: null,
      warningContext: null,
      referenceContext: null,
      textContext: null,
      position: {},
      additional: null,
      attribute: false,
      nonTerminated: true
    };

    // Characters.
    var tab = 9; // '\t'
    var lineFeed = 10; // '\n'
    var formFeed = 12; //  '\f'
    var space = 32; // ' '
    var ampersand = 38; //  '&'
    var semicolon$1 = 59; //  ';'
    var lessThan = 60; //  '<'
    var equalsTo = 61; //  '='
    var numberSign = 35; //  '#'
    var uppercaseX = 88; //  'X'
    var lowercaseX = 120; //  'x'
    var replacementCharacter = 65533; // '�'

    // Reference types.
    var name = 'named';
    var hexa = 'hexadecimal';
    var deci = 'decimal';

    // Map of bases.
    var bases = {};

    bases[hexa] = 16;
    bases[deci] = 10;

    // Map of types to tests.
    // Each type of character reference accepts different characters.
    // This test is used to detect whether a reference has ended (as the semicolon
    // is not strictly needed).
    var tests = {};

    tests[name] = isAlphanumerical;
    tests[deci] = isDecimal;
    tests[hexa] = isHexadecimal;

    // Warning types.
    var namedNotTerminated = 1;
    var numericNotTerminated = 2;
    var namedEmpty = 3;
    var numericEmpty = 4;
    var namedUnknown = 5;
    var numericDisallowed = 6;
    var numericProhibited = 7;

    // Warning messages.
    var messages = {};

    messages[namedNotTerminated] =
      'Named character references must be terminated by a semicolon';
    messages[numericNotTerminated] =
      'Numeric character references must be terminated by a semicolon';
    messages[namedEmpty] = 'Named character references cannot be empty';
    messages[numericEmpty] = 'Numeric character references cannot be empty';
    messages[namedUnknown] = 'Named character references must be known';
    messages[numericDisallowed] =
      'Numeric character references cannot be disallowed';
    messages[numericProhibited] =
      'Numeric character references cannot be outside the permissible Unicode range';

    // Wrap to ensure clean parameters are given to `parse`.
    function parseEntities(value, options) {
      var settings = {};
      var option;
      var key;

      if (!options) {
        options = {};
      }

      for (key in defaults) {
        option = options[key];
        settings[key] =
          option === null || option === undefined ? defaults[key] : option;
      }

      if (settings.position.indent || settings.position.start) {
        settings.indent = settings.position.indent || [];
        settings.position = settings.position.start;
      }

      return parse(value, settings)
    }

    // Parse entities.
    // eslint-disable-next-line complexity
    function parse(value, settings) {
      var additional = settings.additional;
      var nonTerminated = settings.nonTerminated;
      var handleText = settings.text;
      var handleReference = settings.reference;
      var handleWarning = settings.warning;
      var textContext = settings.textContext;
      var referenceContext = settings.referenceContext;
      var warningContext = settings.warningContext;
      var pos = settings.position;
      var indent = settings.indent || [];
      var length = value.length;
      var index = 0;
      var lines = -1;
      var column = pos.column || 1;
      var line = pos.line || 1;
      var queue = '';
      var result = [];
      var entityCharacters;
      var namedEntity;
      var terminated;
      var characters;
      var character;
      var reference;
      var following;
      var warning;
      var reason;
      var output;
      var entity;
      var begin;
      var start;
      var type;
      var test;
      var prev;
      var next;
      var diff;
      var end;

      if (typeof additional === 'string') {
        additional = additional.charCodeAt(0);
      }

      // Cache the current point.
      prev = now();

      // Wrap `handleWarning`.
      warning = handleWarning ? parseError : noop;

      // Ensure the algorithm walks over the first character and the end (inclusive).
      index--;
      length++;

      while (++index < length) {
        // If the previous character was a newline.
        if (character === lineFeed) {
          column = indent[lines] || 1;
        }

        character = value.charCodeAt(index);

        if (character === ampersand) {
          following = value.charCodeAt(index + 1);

          // The behaviour depends on the identity of the next character.
          if (
            following === tab ||
            following === lineFeed ||
            following === formFeed ||
            following === space ||
            following === ampersand ||
            following === lessThan ||
            following !== following ||
            (additional && following === additional)
          ) {
            // Not a character reference.
            // No characters are consumed, and nothing is returned.
            // This is not an error, either.
            queue += fromCharCode(character);
            column++;

            continue
          }

          start = index + 1;
          begin = start;
          end = start;

          if (following === numberSign) {
            // Numerical entity.
            end = ++begin;

            // The behaviour further depends on the next character.
            following = value.charCodeAt(end);

            if (following === uppercaseX || following === lowercaseX) {
              // ASCII hex digits.
              type = hexa;
              end = ++begin;
            } else {
              // ASCII digits.
              type = deci;
            }
          } else {
            // Named entity.
            type = name;
          }

          entityCharacters = '';
          entity = '';
          characters = '';
          test = tests[type];
          end--;

          while (++end < length) {
            following = value.charCodeAt(end);

            if (!test(following)) {
              break
            }

            characters += fromCharCode(following);

            // Check if we can match a legacy named reference.
            // If so, we cache that as the last viable named reference.
            // This ensures we do not need to walk backwards later.
            if (type === name && own$3.call(legacy, characters)) {
              entityCharacters = characters;
              entity = legacy[characters];
            }
          }

          terminated = value.charCodeAt(end) === semicolon$1;

          if (terminated) {
            end++;

            namedEntity = type === name ? decodeEntity_browser(characters) : false;

            if (namedEntity) {
              entityCharacters = characters;
              entity = namedEntity;
            }
          }

          diff = 1 + end - start;

          if (!terminated && !nonTerminated) ; else if (!characters) {
            // An empty (possible) entity is valid, unless it’s numeric (thus an
            // ampersand followed by an octothorp).
            if (type !== name) {
              warning(numericEmpty, diff);
            }
          } else if (type === name) {
            // An ampersand followed by anything unknown, and not terminated, is
            // invalid.
            if (terminated && !entity) {
              warning(namedUnknown, 1);
            } else {
              // If theres something after an entity name which is not known, cap
              // the reference.
              if (entityCharacters !== characters) {
                end = begin + entityCharacters.length;
                diff = 1 + end - begin;
                terminated = false;
              }

              // If the reference is not terminated, warn.
              if (!terminated) {
                reason = entityCharacters ? namedNotTerminated : namedEmpty;

                if (settings.attribute) {
                  following = value.charCodeAt(end);

                  if (following === equalsTo) {
                    warning(reason, diff);
                    entity = null;
                  } else if (isAlphanumerical(following)) {
                    entity = null;
                  } else {
                    warning(reason, diff);
                  }
                } else {
                  warning(reason, diff);
                }
              }
            }

            reference = entity;
          } else {
            if (!terminated) {
              // All non-terminated numeric entities are not rendered, and trigger a
              // warning.
              warning(numericNotTerminated, diff);
            }

            // When terminated and number, parse as either hexadecimal or decimal.
            reference = parseInt(characters, bases[type]);

            // Trigger a warning when the parsed number is prohibited, and replace
            // with replacement character.
            if (prohibited(reference)) {
              warning(numericProhibited, diff);
              reference = fromCharCode(replacementCharacter);
            } else if (reference in invalid) {
              // Trigger a warning when the parsed number is disallowed, and replace
              // by an alternative.
              warning(numericDisallowed, diff);
              reference = invalid[reference];
            } else {
              // Parse the number.
              output = '';

              // Trigger a warning when the parsed number should not be used.
              if (disallowed(reference)) {
                warning(numericDisallowed, diff);
              }

              // Stringify the number.
              if (reference > 0xffff) {
                reference -= 0x10000;
                output += fromCharCode((reference >>> (10 & 0x3ff)) | 0xd800);
                reference = 0xdc00 | (reference & 0x3ff);
              }

              reference = output + fromCharCode(reference);
            }
          }

          // Found it!
          // First eat the queued characters as normal text, then eat an entity.
          if (reference) {
            flush();

            prev = now();
            index = end - 1;
            column += end - start + 1;
            result.push(reference);
            next = now();
            next.offset++;

            if (handleReference) {
              handleReference.call(
                referenceContext,
                reference,
                {start: prev, end: next},
                value.slice(start - 1, end)
              );
            }

            prev = next;
          } else {
            // If we could not find a reference, queue the checked characters (as
            // normal characters), and move the pointer to their end.
            // This is possible because we can be certain neither newlines nor
            // ampersands are included.
            characters = value.slice(start - 1, end);
            queue += characters;
            column += characters.length;
            index = end - 1;
          }
        } else {
          // Handle anything other than an ampersand, including newlines and EOF.
          if (
            character === 10 // Line feed
          ) {
            line++;
            lines++;
            column = 0;
          }

          if (character === character) {
            queue += fromCharCode(character);
            column++;
          } else {
            flush();
          }
        }
      }

      // Return the reduced nodes, and any possible warnings.
      return result.join('')

      // Get current position.
      function now() {
        return {
          line: line,
          column: column,
          offset: index + (pos.offset || 0)
        }
      }

      // “Throw” a parse-error: a warning.
      function parseError(code, offset) {
        var position = now();

        position.column += offset;
        position.offset += offset;

        handleWarning.call(warningContext, messages[code], position, code);
      }

      // Flush `queue` (normal text).
      // Macro invoked before each entity and at the end of `value`.
      // Does nothing when `queue` is empty.
      function flush() {
        if (queue) {
          result.push(queue);

          if (handleText) {
            handleText.call(textContext, queue, {start: prev, end: now()});
          }

          queue = '';
        }
      }
    }

    // Check if `character` is outside the permissible unicode range.
    function prohibited(code) {
      return (code >= 0xd800 && code <= 0xdfff) || code > 0x10ffff
    }

    // Check if `character` is disallowed.
    function disallowed(code) {
      return (
        (code >= 0x0001 && code <= 0x0008) ||
        code === 0x000b ||
        (code >= 0x000d && code <= 0x001f) ||
        (code >= 0x007f && code <= 0x009f) ||
        (code >= 0xfdd0 && code <= 0xfdef) ||
        (code & 0xffff) === 0xffff ||
        (code & 0xffff) === 0xfffe
      )
    }

    var decode = factory$3;

    /* Factory to create an entity decoder. */
    function factory$3(ctx) {
      decoder.raw = decodeRaw;

      return decoder;

      /* Normalize `position` to add an `indent`. */
      function normalize(position) {
        var offsets = ctx.offset;
        var line = position.line;
        var result = [];

        while (++line) {
          if (!(line in offsets)) {
            break;
          }

          result.push((offsets[line] || 0) + 1);
        }

        return {
          start: position,
          indent: result
        };
      }

      /* Handle a warning.
       * See https://github.com/wooorm/parse-entities
       * for the warnings. */
      function handleWarning(reason, position, code) {
        if (code === 3) {
          return;
        }

        ctx.file.message(reason, position);
      }

      /* Decode `value` (at `position`) into text-nodes. */
      function decoder(value, position, handler) {
        parseEntities_1(value, {
          position: normalize(position),
          warning: handleWarning,
          text: handler,
          reference: handler,
          textContext: ctx,
          referenceContext: ctx
        });
      }

      /* Decode `value` (at `position`) into a string. */
      function decodeRaw(value, position, options) {
        return parseEntities_1(value, immutable(options, {
          position: normalize(position),
          warning: handleWarning
        }));
      }
    }

    var tokenizer = factory$4;

    var MERGEABLE_NODES = {
      text: mergeText,
      blockquote: mergeBlockquote
    };

    /* Check whether a node is mergeable with adjacent nodes. */
    function mergeable(node) {
      var start;
      var end;

      if (node.type !== 'text' || !node.position) {
        return true;
      }

      start = node.position.start;
      end = node.position.end;

      /* Only merge nodes which occupy the same size as their
       * `value`. */
      return start.line !== end.line ||
          end.column - start.column === node.value.length;
    }

    /* Merge two text nodes: `node` into `prev`. */
    function mergeText(prev, node) {
      prev.value += node.value;

      return prev;
    }

    /* Merge two blockquotes: `node` into `prev`, unless in
     * CommonMark mode. */
    function mergeBlockquote(prev, node) {
      if (this.options.commonmark) {
        return node;
      }

      prev.children = prev.children.concat(node.children);

      return prev;
    }

    /* Construct a tokenizer.  This creates both
     * `tokenizeInline` and `tokenizeBlock`. */
    function factory$4(type) {
      return tokenize;

      /* Tokenizer for a bound `type`. */
      function tokenize(value, location) {
        var self = this;
        var offset = self.offset;
        var tokens = [];
        var methods = self[type + 'Methods'];
        var tokenizers = self[type + 'Tokenizers'];
        var line = location.line;
        var column = location.column;
        var index;
        var length;
        var method;
        var name;
        var matched;
        var valueLength;

        /* Trim white space only lines. */
        if (!value) {
          return tokens;
        }

        /* Expose on `eat`. */
        eat.now = now;
        eat.file = self.file;

        /* Sync initial offset. */
        updatePosition('');

        /* Iterate over `value`, and iterate over all
         * tokenizers.  When one eats something, re-iterate
         * with the remaining value.  If no tokenizer eats,
         * something failed (should not happen) and an
         * exception is thrown. */
        while (value) {
          index = -1;
          length = methods.length;
          matched = false;

          while (++index < length) {
            name = methods[index];
            method = tokenizers[name];

            if (
              method &&
              /* istanbul ignore next */ (!method.onlyAtStart || self.atStart) &&
              (!method.notInList || !self.inList) &&
              (!method.notInBlock || !self.inBlock) &&
              (!method.notInLink || !self.inLink)
            ) {
              valueLength = value.length;

              method.apply(self, [eat, value]);

              matched = valueLength !== value.length;

              if (matched) {
                break;
              }
            }
          }

          /* istanbul ignore if */
          if (!matched) {
            self.file.fail(new Error('Infinite loop'), eat.now());
          }
        }

        self.eof = now();

        return tokens;

        /* Update line, column, and offset based on
         * `value`. */
        function updatePosition(subvalue) {
          var lastIndex = -1;
          var index = subvalue.indexOf('\n');

          while (index !== -1) {
            line++;
            lastIndex = index;
            index = subvalue.indexOf('\n', index + 1);
          }

          if (lastIndex === -1) {
            column += subvalue.length;
          } else {
            column = subvalue.length - lastIndex;
          }

          if (line in offset) {
            if (lastIndex !== -1) {
              column += offset[line];
            } else if (column <= offset[line]) {
              column = offset[line] + 1;
            }
          }
        }

        /* Get offset.  Called before the first character is
         * eaten to retrieve the range's offsets. */
        function getOffset() {
          var indentation = [];
          var pos = line + 1;

          /* Done.  Called when the last character is
           * eaten to retrieve the range’s offsets. */
          return function () {
            var last = line + 1;

            while (pos < last) {
              indentation.push((offset[pos] || 0) + 1);

              pos++;
            }

            return indentation;
          };
        }

        /* Get the current position. */
        function now() {
          var pos = {line: line, column: column};

          pos.offset = self.toOffset(pos);

          return pos;
        }

        /* Store position information for a node. */
        function Position(start) {
          this.start = start;
          this.end = now();
        }

        /* Throw when a value is incorrectly eaten.
         * This shouldn’t happen but will throw on new,
         * incorrect rules. */
        function validateEat(subvalue) {
          /* istanbul ignore if */
          if (value.substring(0, subvalue.length) !== subvalue) {
            /* Capture stack-trace. */
            self.file.fail(
              new Error(
                'Incorrectly eaten value: please report this ' +
                'warning on http://git.io/vg5Ft'
              ),
              now()
            );
          }
        }

        /* Mark position and patch `node.position`. */
        function position() {
          var before = now();

          return update;

          /* Add the position to a node. */
          function update(node, indent) {
            var prev = node.position;
            var start = prev ? prev.start : before;
            var combined = [];
            var n = prev && prev.end.line;
            var l = before.line;

            node.position = new Position(start);

            /* If there was already a `position`, this
             * node was merged.  Fixing `start` wasn’t
             * hard, but the indent is different.
             * Especially because some information, the
             * indent between `n` and `l` wasn’t
             * tracked.  Luckily, that space is
             * (should be?) empty, so we can safely
             * check for it now. */
            if (prev && indent && prev.indent) {
              combined = prev.indent;

              if (n < l) {
                while (++n < l) {
                  combined.push((offset[n] || 0) + 1);
                }

                combined.push(before.column);
              }

              indent = combined.concat(indent);
            }

            node.position.indent = indent || [];

            return node;
          }
        }

        /* Add `node` to `parent`s children or to `tokens`.
         * Performs merges where possible. */
        function add(node, parent) {
          var children = parent ? parent.children : tokens;
          var prev = children[children.length - 1];

          if (
            prev &&
            node.type === prev.type &&
            node.type in MERGEABLE_NODES &&
            mergeable(prev) &&
            mergeable(node)
          ) {
            node = MERGEABLE_NODES[node.type].call(self, prev, node);
          }

          if (node !== prev) {
            children.push(node);
          }

          if (self.atStart && tokens.length !== 0) {
            self.exitStart();
          }

          return node;
        }

        /* Remove `subvalue` from `value`.
         * `subvalue` must be at the start of `value`. */
        function eat(subvalue) {
          var indent = getOffset();
          var pos = position();
          var current = now();

          validateEat(subvalue);

          apply.reset = reset;
          reset.test = test;
          apply.test = test;

          value = value.substring(subvalue.length);

          updatePosition(subvalue);

          indent = indent();

          return apply;

          /* Add the given arguments, add `position` to
           * the returned node, and return the node. */
          function apply(node, parent) {
            return pos(add(pos(node), parent), indent);
          }

          /* Functions just like apply, but resets the
           * content:  the line and column are reversed,
           * and the eaten value is re-added.
           * This is useful for nodes with a single
           * type of content, such as lists and tables.
           * See `apply` above for what parameters are
           * expected. */
          function reset() {
            var node = apply.apply(null, arguments);

            line = current.line;
            column = current.column;
            value = subvalue + value;

            return node;
          }

          /* Test the position, after eating, and reverse
           * to a not-eaten state. */
          function test() {
            var result = pos({});

            line = current.line;
            column = current.column;
            value = subvalue + value;

            return result.position;
          }
        }
      }
    }

    var markdownEscapes = escapes;

    var defaults$1 = [
      '\\',
      '`',
      '*',
      '{',
      '}',
      '[',
      ']',
      '(',
      ')',
      '#',
      '+',
      '-',
      '.',
      '!',
      '_',
      '>'
    ];

    var gfm = defaults$1.concat(['~', '|']);

    var commonmark = gfm.concat([
      '\n',
      '"',
      '$',
      '%',
      '&',
      "'",
      ',',
      '/',
      ':',
      ';',
      '<',
      '=',
      '?',
      '@',
      '^'
    ]);

    escapes.default = defaults$1;
    escapes.gfm = gfm;
    escapes.commonmark = commonmark;

    // Get markdown escapes.
    function escapes(options) {
      var settings = options || {};

      if (settings.commonmark) {
        return commonmark
      }

      return settings.gfm ? gfm : defaults$1
    }

    var require$$0 = [
    	"address",
    	"article",
    	"aside",
    	"base",
    	"basefont",
    	"blockquote",
    	"body",
    	"caption",
    	"center",
    	"col",
    	"colgroup",
    	"dd",
    	"details",
    	"dialog",
    	"dir",
    	"div",
    	"dl",
    	"dt",
    	"fieldset",
    	"figcaption",
    	"figure",
    	"footer",
    	"form",
    	"frame",
    	"frameset",
    	"h1",
    	"h2",
    	"h3",
    	"h4",
    	"h5",
    	"h6",
    	"head",
    	"header",
    	"hgroup",
    	"hr",
    	"html",
    	"iframe",
    	"legend",
    	"li",
    	"link",
    	"main",
    	"menu",
    	"menuitem",
    	"meta",
    	"nav",
    	"noframes",
    	"ol",
    	"optgroup",
    	"option",
    	"p",
    	"param",
    	"pre",
    	"section",
    	"source",
    	"title",
    	"summary",
    	"table",
    	"tbody",
    	"td",
    	"tfoot",
    	"th",
    	"thead",
    	"title",
    	"tr",
    	"track",
    	"ul"
    ];

    var defaults$2 = {
      position: true,
      gfm: true,
      commonmark: false,
      footnotes: false,
      pedantic: false,
      blocks: require$$0
    };

    var setOptions_1 = setOptions;

    function setOptions(options) {
      var self = this;
      var current = self.options;
      var key;
      var value;

      if (options == null) {
        options = {};
      } else if (typeof options === 'object') {
        options = immutable(options);
      } else {
        throw new Error(
          'Invalid value `' + options + '` ' +
          'for setting `options`'
        );
      }

      for (key in defaults$2) {
        value = options[key];

        if (value == null) {
          value = current[key];
        }

        if (
          (key !== 'blocks' && typeof value !== 'boolean') ||
          (key === 'blocks' && typeof value !== 'object')
        ) {
          throw new Error('Invalid value `' + value + '` for setting `options.' + key + '`');
        }

        options[key] = value;
      }

      self.options = options;
      self.escape = markdownEscapes(options);

      return self;
    }

    var convert_1 = convert;

    function convert(test) {
      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (test === null || test === undefined) {
        return ok
      }

      if (typeof test === 'object') {
        return ('length' in test ? anyFactory : matchesFactory)(test)
      }

      if (typeof test === 'function') {
        return test
      }

      throw new Error('Expected function, string, or object as test')
    }

    function convertAll(tests) {
      var results = [];
      var length = tests.length;
      var index = -1;

      while (++index < length) {
        results[index] = convert(tests[index]);
      }

      return results
    }

    // Utility assert each property in `test` is represented in `node`, and each
    // values are strictly equal.
    function matchesFactory(test) {
      return matches

      function matches(node) {
        var key;

        for (key in test) {
          if (node[key] !== test[key]) {
            return false
          }
        }

        return true
      }
    }

    function anyFactory(tests) {
      var checks = convertAll(tests);
      var length = checks.length;

      return matches

      function matches() {
        var index = -1;

        while (++index < length) {
          if (checks[index].apply(this, arguments)) {
            return true
          }
        }

        return false
      }
    }

    // Utility to convert a string into a function which checks a given node’s type
    // for said string.
    function typeFactory(test) {
      return type

      function type(node) {
        return Boolean(node && node.type === test)
      }
    }

    // Utility to return true.
    function ok() {
      return true
    }

    var unistUtilVisitParents = visitParents;



    var CONTINUE = true;
    var SKIP = 'skip';
    var EXIT = false;

    visitParents.CONTINUE = CONTINUE;
    visitParents.SKIP = SKIP;
    visitParents.EXIT = EXIT;

    function visitParents(tree, test, visitor, reverse) {
      var is;

      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        visitor = test;
        test = null;
      }

      is = convert_1(test);

      one(tree, null, []);

      // Visit a single node.
      function one(node, index, parents) {
        var result = [];
        var subresult;

        if (!test || is(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));

          if (result[0] === EXIT) {
            return result
          }
        }

        if (node.children && result[0] !== SKIP) {
          subresult = toResult(all(node.children, parents.concat(node)));
          return subresult[0] === EXIT ? subresult : result
        }

        return result
      }

      // Visit children in `parent`.
      function all(children, parents) {
        var min = -1;
        var step = reverse ? -1 : 1;
        var index = (reverse ? children.length : min) + step;
        var result;

        while (index > min && index < children.length) {
          result = one(children[index], index, parents);

          if (result[0] === EXIT) {
            return result
          }

          index = typeof result[1] === 'number' ? result[1] : index + step;
        }
      }
    }

    function toResult(value) {
      if (value !== null && typeof value === 'object' && 'length' in value) {
        return value
      }

      if (typeof value === 'number') {
        return [CONTINUE, value]
      }

      return [value]
    }

    var unistUtilVisit = visit;



    var CONTINUE$1 = unistUtilVisitParents.CONTINUE;
    var SKIP$1 = unistUtilVisitParents.SKIP;
    var EXIT$1 = unistUtilVisitParents.EXIT;

    visit.CONTINUE = CONTINUE$1;
    visit.SKIP = SKIP$1;
    visit.EXIT = EXIT$1;

    function visit(tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        visitor = test;
        test = null;
      }

      unistUtilVisitParents(tree, test, overload, reverse);

      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent)
      }
    }

    var unistUtilRemovePosition = removePosition;

    function removePosition(node, force) {
      unistUtilVisit(node, force ? hard : soft);
      return node
    }

    function hard(node) {
      delete node.position;
    }

    function soft(node) {
      node.position = undefined;
    }

    var parse_1 = parse$1;

    var C_NEWLINE = '\n';
    var EXPRESSION_LINE_BREAKS = /\r\n|\r/g;

    /* Parse the bound file. */
    function parse$1() {
      var self = this;
      var value = String(self.file);
      var start = {line: 1, column: 1, offset: 0};
      var content = immutable(start);
      var node;

      /* Clean non-unix newlines: `\r\n` and `\r` are all
       * changed to `\n`.  This should not affect positional
       * information. */
      value = value.replace(EXPRESSION_LINE_BREAKS, C_NEWLINE);

      if (value.charCodeAt(0) === 0xFEFF) {
        value = value.slice(1);

        content.column++;
        content.offset++;
      }

      node = {
        type: 'root',
        children: self.tokenizeBlock(value, content),
        position: {
          start: start,
          end: self.eof || immutable(start)
        }
      };

      if (!self.options.position) {
        unistUtilRemovePosition(node, true);
      }

      return node;
    }

    var isWhitespaceCharacter = whitespace;

    var fromCode = String.fromCharCode;
    var re = /\s/;

    // Check if the given character code, or the character code at the first
    // character, is a whitespace character.
    function whitespace(character) {
      return re.test(
        typeof character === 'number' ? fromCode(character) : character.charAt(0)
      )
    }

    var newline_1 = newline;

    /* Tokenise newline. */
    function newline(eat, value, silent) {
      var character = value.charAt(0);
      var length;
      var subvalue;
      var queue;
      var index;

      if (character !== '\n') {
        return;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      index = 1;
      length = value.length;
      subvalue = character;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (!isWhitespaceCharacter(character)) {
          break;
        }

        queue += character;

        if (character === '\n') {
          subvalue += queue;
          queue = '';
        }

        index++;
      }

      eat(subvalue);
    }

    /*!
     * repeat-string <https://github.com/jonschlinkert/repeat-string>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     */

    /**
     * Results cache
     */

    var res = '';
    var cache;

    /**
     * Expose `repeat`
     */

    var repeatString = repeat;

    /**
     * Repeat the given `string` the specified `number`
     * of times.
     *
     * **Example:**
     *
     * ```js
     * var repeat = require('repeat-string');
     * repeat('A', 5);
     * //=> AAAAA
     * ```
     *
     * @param {String} `string` The string to repeat
     * @param {Number} `number` The number of times to repeat the string
     * @return {String} Repeated string
     * @api public
     */

    function repeat(str, num) {
      if (typeof str !== 'string') {
        throw new TypeError('expected a string');
      }

      // cover common, quick use cases
      if (num === 1) return str;
      if (num === 2) return str + str;

      var max = str.length * num;
      if (cache !== str || typeof cache === 'undefined') {
        cache = str;
        res = '';
      } else if (res.length >= max) {
        return res.substr(0, max);
      }

      while (max > res.length && num > 1) {
        if (num & 1) {
          res += str;
        }

        num >>= 1;
        str += str;
      }

      res += str;
      res = res.substr(0, max);
      return res;
    }

    var trimTrailingLines_1 = trimTrailingLines;

    var line = '\n';

    // Remove final newline characters from `value`.
    function trimTrailingLines(value) {
      var val = String(value);
      var index = val.length;

      while (val.charAt(--index) === line) {
        // Empty
      }

      return val.slice(0, index + 1)
    }

    var codeIndented = indentedCode;

    var C_NEWLINE$1 = '\n';
    var C_TAB = '\t';
    var C_SPACE = ' ';

    var CODE_INDENT_COUNT = 4;
    var CODE_INDENT = repeatString(C_SPACE, CODE_INDENT_COUNT);

    /* Tokenise indented code. */
    function indentedCode(eat, value, silent) {
      var index = -1;
      var length = value.length;
      var subvalue = '';
      var content = '';
      var subvalueQueue = '';
      var contentQueue = '';
      var character;
      var blankQueue;
      var indent;

      while (++index < length) {
        character = value.charAt(index);

        if (indent) {
          indent = false;

          subvalue += subvalueQueue;
          content += contentQueue;
          subvalueQueue = '';
          contentQueue = '';

          if (character === C_NEWLINE$1) {
            subvalueQueue = character;
            contentQueue = character;
          } else {
            subvalue += character;
            content += character;

            while (++index < length) {
              character = value.charAt(index);

              if (!character || character === C_NEWLINE$1) {
                contentQueue = character;
                subvalueQueue = character;
                break;
              }

              subvalue += character;
              content += character;
            }
          }
        } else if (
          character === C_SPACE &&
          value.charAt(index + 1) === character &&
          value.charAt(index + 2) === character &&
          value.charAt(index + 3) === character
        ) {
          subvalueQueue += CODE_INDENT;
          index += 3;
          indent = true;
        } else if (character === C_TAB) {
          subvalueQueue += character;
          indent = true;
        } else {
          blankQueue = '';

          while (character === C_TAB || character === C_SPACE) {
            blankQueue += character;
            character = value.charAt(++index);
          }

          if (character !== C_NEWLINE$1) {
            break;
          }

          subvalueQueue += blankQueue + character;
          contentQueue += character;
        }
      }

      if (content) {
        if (silent) {
          return true;
        }

        return eat(subvalue)({
          type: 'code',
          lang: null,
          value: trimTrailingLines_1(content)
        });
      }
    }

    var codeFenced = fencedCode;

    var C_NEWLINE$2 = '\n';
    var C_TAB$1 = '\t';
    var C_SPACE$1 = ' ';
    var C_TILDE = '~';
    var C_TICK = '`';

    var MIN_FENCE_COUNT = 3;
    var CODE_INDENT_COUNT$1 = 4;

    function fencedCode(eat, value, silent) {
      var self = this;
      var settings = self.options;
      var length = value.length + 1;
      var index = 0;
      var subvalue = '';
      var fenceCount;
      var marker;
      var character;
      var flag;
      var queue;
      var content;
      var exdentedContent;
      var closing;
      var exdentedClosing;
      var indent;
      var now;

      if (!settings.gfm) {
        return;
      }

      /* Eat initial spacing. */
      while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$1 && character !== C_TAB$1) {
          break;
        }

        subvalue += character;
        index++;
      }

      indent = index;

      /* Eat the fence. */
      character = value.charAt(index);

      if (character !== C_TILDE && character !== C_TICK) {
        return;
      }

      index++;
      marker = character;
      fenceCount = 1;
      subvalue += character;

      while (index < length) {
        character = value.charAt(index);

        if (character !== marker) {
          break;
        }

        subvalue += character;
        fenceCount++;
        index++;
      }

      if (fenceCount < MIN_FENCE_COUNT) {
        return;
      }

      /* Eat spacing before flag. */
      while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$1 && character !== C_TAB$1) {
          break;
        }

        subvalue += character;
        index++;
      }

      /* Eat flag. */
      flag = '';
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (
          character === C_NEWLINE$2 ||
          character === C_TILDE ||
          character === C_TICK
        ) {
          break;
        }

        if (character === C_SPACE$1 || character === C_TAB$1) {
          queue += character;
        } else {
          flag += queue + character;
          queue = '';
        }

        index++;
      }

      character = value.charAt(index);

      if (character && character !== C_NEWLINE$2) {
        return;
      }

      if (silent) {
        return true;
      }

      now = eat.now();
      now.column += subvalue.length;
      now.offset += subvalue.length;

      subvalue += flag;
      flag = self.decode.raw(self.unescape(flag), now);

      if (queue) {
        subvalue += queue;
      }

      queue = '';
      closing = '';
      exdentedClosing = '';
      content = '';
      exdentedContent = '';

      /* Eat content. */
      while (index < length) {
        character = value.charAt(index);
        content += closing;
        exdentedContent += exdentedClosing;
        closing = '';
        exdentedClosing = '';

        if (character !== C_NEWLINE$2) {
          content += character;
          exdentedClosing += character;
          index++;
          continue;
        }

        /* Add the newline to `subvalue` if its the first
         * character.  Otherwise, add it to the `closing`
         * queue. */
        if (content) {
          closing += character;
          exdentedClosing += character;
        } else {
          subvalue += character;
        }

        queue = '';
        index++;

        while (index < length) {
          character = value.charAt(index);

          if (character !== C_SPACE$1) {
            break;
          }

          queue += character;
          index++;
        }

        closing += queue;
        exdentedClosing += queue.slice(indent);

        if (queue.length >= CODE_INDENT_COUNT$1) {
          continue;
        }

        queue = '';

        while (index < length) {
          character = value.charAt(index);

          if (character !== marker) {
            break;
          }

          queue += character;
          index++;
        }

        closing += queue;
        exdentedClosing += queue;

        if (queue.length < fenceCount) {
          continue;
        }

        queue = '';

        while (index < length) {
          character = value.charAt(index);

          if (character !== C_SPACE$1 && character !== C_TAB$1) {
            break;
          }

          closing += character;
          exdentedClosing += character;
          index++;
        }

        if (!character || character === C_NEWLINE$2) {
          break;
        }
      }

      subvalue += content + closing;

      return eat(subvalue)({
        type: 'code',
        lang: flag || null,
        value: trimTrailingLines_1(exdentedContent)
      });
    }

    var trim_1 = createCommonjsModule(function (module, exports) {
    exports = module.exports = trim;

    function trim(str){
      return str.replace(/^\s*|\s*$/g, '');
    }

    exports.left = function(str){
      return str.replace(/^\s*/, '');
    };

    exports.right = function(str){
      return str.replace(/\s*$/, '');
    };
    });
    var trim_2 = trim_1.left;
    var trim_3 = trim_1.right;

    var interrupt_1 = interrupt;

    function interrupt(interruptors, tokenizers, ctx, params) {
      var bools = ['pedantic', 'commonmark'];
      var count = bools.length;
      var length = interruptors.length;
      var index = -1;
      var interruptor;
      var config;
      var fn;
      var offset;
      var bool;
      var ignore;

      while (++index < length) {
        interruptor = interruptors[index];
        config = interruptor[1] || {};
        fn = interruptor[0];
        offset = -1;
        ignore = false;

        while (++offset < count) {
          bool = bools[offset];

          if (config[bool] !== undefined && config[bool] !== ctx.options[bool]) {
            ignore = true;
            break;
          }
        }

        if (ignore) {
          continue;
        }

        if (tokenizers[fn].apply(ctx, params)) {
          return true;
        }
      }

      return false;
    }

    var blockquote_1 = blockquote;

    var C_NEWLINE$3 = '\n';
    var C_TAB$2 = '\t';
    var C_SPACE$2 = ' ';
    var C_GT = '>';

    /* Tokenise a blockquote. */
    function blockquote(eat, value, silent) {
      var self = this;
      var offsets = self.offset;
      var tokenizers = self.blockTokenizers;
      var interruptors = self.interruptBlockquote;
      var now = eat.now();
      var currentLine = now.line;
      var length = value.length;
      var values = [];
      var contents = [];
      var indents = [];
      var add;
      var index = 0;
      var character;
      var rest;
      var nextIndex;
      var content;
      var line;
      var startIndex;
      var prefixed;
      var exit;

      while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$2 && character !== C_TAB$2) {
          break;
        }

        index++;
      }

      if (value.charAt(index) !== C_GT) {
        return;
      }

      if (silent) {
        return true;
      }

      index = 0;

      while (index < length) {
        nextIndex = value.indexOf(C_NEWLINE$3, index);
        startIndex = index;
        prefixed = false;

        if (nextIndex === -1) {
          nextIndex = length;
        }

        while (index < length) {
          character = value.charAt(index);

          if (character !== C_SPACE$2 && character !== C_TAB$2) {
            break;
          }

          index++;
        }

        if (value.charAt(index) === C_GT) {
          index++;
          prefixed = true;

          if (value.charAt(index) === C_SPACE$2) {
            index++;
          }
        } else {
          index = startIndex;
        }

        content = value.slice(index, nextIndex);

        if (!prefixed && !trim_1(content)) {
          index = startIndex;
          break;
        }

        if (!prefixed) {
          rest = value.slice(index);

          /* Check if the following code contains a possible
           * block. */
          if (interrupt_1(interruptors, tokenizers, self, [eat, rest, true])) {
            break;
          }
        }

        line = startIndex === index ? content : value.slice(startIndex, nextIndex);

        indents.push(index - startIndex);
        values.push(line);
        contents.push(content);

        index = nextIndex + 1;
      }

      index = -1;
      length = indents.length;
      add = eat(values.join(C_NEWLINE$3));

      while (++index < length) {
        offsets[currentLine] = (offsets[currentLine] || 0) + indents[index];
        currentLine++;
      }

      exit = self.enterBlock();
      contents = self.tokenizeBlock(contents.join(C_NEWLINE$3), now);
      exit();

      return add({
        type: 'blockquote',
        children: contents
      });
    }

    var headingAtx = atxHeading;

    var C_NEWLINE$4 = '\n';
    var C_TAB$3 = '\t';
    var C_SPACE$3 = ' ';
    var C_HASH = '#';

    var MAX_ATX_COUNT = 6;

    function atxHeading(eat, value, silent) {
      var self = this;
      var settings = self.options;
      var length = value.length + 1;
      var index = -1;
      var now = eat.now();
      var subvalue = '';
      var content = '';
      var character;
      var queue;
      var depth;

      /* Eat initial spacing. */
      while (++index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$3 && character !== C_TAB$3) {
          index--;
          break;
        }

        subvalue += character;
      }

      /* Eat hashes. */
      depth = 0;

      while (++index <= length) {
        character = value.charAt(index);

        if (character !== C_HASH) {
          index--;
          break;
        }

        subvalue += character;
        depth++;
      }

      if (depth > MAX_ATX_COUNT) {
        return;
      }

      if (
        !depth ||
        (!settings.pedantic && value.charAt(index + 1) === C_HASH)
      ) {
        return;
      }

      length = value.length + 1;

      /* Eat intermediate white-space. */
      queue = '';

      while (++index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$3 && character !== C_TAB$3) {
          index--;
          break;
        }

        queue += character;
      }

      /* Exit when not in pedantic mode without spacing. */
      if (
        !settings.pedantic &&
        queue.length === 0 &&
        character &&
        character !== C_NEWLINE$4
      ) {
        return;
      }

      if (silent) {
        return true;
      }

      /* Eat content. */
      subvalue += queue;
      queue = '';
      content = '';

      while (++index < length) {
        character = value.charAt(index);

        if (!character || character === C_NEWLINE$4) {
          break;
        }

        if (
          character !== C_SPACE$3 &&
          character !== C_TAB$3 &&
          character !== C_HASH
        ) {
          content += queue + character;
          queue = '';
          continue;
        }

        while (character === C_SPACE$3 || character === C_TAB$3) {
          queue += character;
          character = value.charAt(++index);
        }

        while (character === C_HASH) {
          queue += character;
          character = value.charAt(++index);
        }

        while (character === C_SPACE$3 || character === C_TAB$3) {
          queue += character;
          character = value.charAt(++index);
        }

        index--;
      }

      now.column += subvalue.length;
      now.offset += subvalue.length;
      subvalue += content + queue;

      return eat(subvalue)({
        type: 'heading',
        depth: depth,
        children: self.tokenizeInline(content, now)
      });
    }

    var thematicBreak_1 = thematicBreak;

    var C_NEWLINE$5 = '\n';
    var C_TAB$4 = '\t';
    var C_SPACE$4 = ' ';
    var C_ASTERISK = '*';
    var C_UNDERSCORE = '_';
    var C_DASH = '-';

    var THEMATIC_BREAK_MARKER_COUNT = 3;

    function thematicBreak(eat, value, silent) {
      var index = -1;
      var length = value.length + 1;
      var subvalue = '';
      var character;
      var marker;
      var markerCount;
      var queue;

      while (++index < length) {
        character = value.charAt(index);

        if (character !== C_TAB$4 && character !== C_SPACE$4) {
          break;
        }

        subvalue += character;
      }

      if (
        character !== C_ASTERISK &&
        character !== C_DASH &&
        character !== C_UNDERSCORE
      ) {
        return;
      }

      marker = character;
      subvalue += character;
      markerCount = 1;
      queue = '';

      while (++index < length) {
        character = value.charAt(index);

        if (character === marker) {
          markerCount++;
          subvalue += queue + marker;
          queue = '';
        } else if (character === C_SPACE$4) {
          queue += character;
        } else if (
          markerCount >= THEMATIC_BREAK_MARKER_COUNT &&
          (!character || character === C_NEWLINE$5)
        ) {
          subvalue += queue;

          if (silent) {
            return true;
          }

          return eat(subvalue)({type: 'thematicBreak'});
        } else {
          return;
        }
      }
    }

    var getIndentation = indentation;

    /* Map of characters, and their column length,
     * which can be used as indentation. */
    var characters = {' ': 1, '\t': 4};

    /* Gets indentation information for a line. */
    function indentation(value) {
      var index = 0;
      var indent = 0;
      var character = value.charAt(index);
      var stops = {};
      var size;

      while (character in characters) {
        size = characters[character];

        indent += size;

        if (size > 1) {
          indent = Math.floor(indent / size) * size;
        }

        stops[indent] = index;

        character = value.charAt(++index);
      }

      return {indent: indent, stops: stops};
    }

    var removeIndentation = indentation$1;

    var C_SPACE$5 = ' ';
    var C_NEWLINE$6 = '\n';
    var C_TAB$5 = '\t';

    /* Remove the minimum indent from every line in `value`.
     * Supports both tab, spaced, and mixed indentation (as
     * well as possible). */
    function indentation$1(value, maximum) {
      var values = value.split(C_NEWLINE$6);
      var position = values.length + 1;
      var minIndent = Infinity;
      var matrix = [];
      var index;
      var indentation;
      var stops;
      var padding;

      values.unshift(repeatString(C_SPACE$5, maximum) + '!');

      while (position--) {
        indentation = getIndentation(values[position]);

        matrix[position] = indentation.stops;

        if (trim_1(values[position]).length === 0) {
          continue;
        }

        if (indentation.indent) {
          if (indentation.indent > 0 && indentation.indent < minIndent) {
            minIndent = indentation.indent;
          }
        } else {
          minIndent = Infinity;

          break;
        }
      }

      if (minIndent !== Infinity) {
        position = values.length;

        while (position--) {
          stops = matrix[position];
          index = minIndent;

          while (index && !(index in stops)) {
            index--;
          }

          if (
            trim_1(values[position]).length !== 0 &&
            minIndent &&
            index !== minIndent
          ) {
            padding = C_TAB$5;
          } else {
            padding = '';
          }

          values[position] = padding + values[position].slice(
            index in stops ? stops[index] + 1 : 0
          );
        }
      }

      values.shift();

      return values.join(C_NEWLINE$6);
    }

    /* eslint-disable max-params */








    var list_1 = list;

    var C_ASTERISK$1 = '*';
    var C_UNDERSCORE$1 = '_';
    var C_PLUS = '+';
    var C_DASH$1 = '-';
    var C_DOT = '.';
    var C_SPACE$6 = ' ';
    var C_NEWLINE$7 = '\n';
    var C_TAB$6 = '\t';
    var C_PAREN_CLOSE = ')';
    var C_X_LOWER = 'x';

    var TAB_SIZE = 4;
    var EXPRESSION_LOOSE_LIST_ITEM = /\n\n(?!\s*$)/;
    var EXPRESSION_TASK_ITEM = /^\[([ \t]|x|X)][ \t]/;
    var EXPRESSION_BULLET = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/;
    var EXPRESSION_PEDANTIC_BULLET = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/;
    var EXPRESSION_INITIAL_INDENT = /^( {1,4}|\t)?/gm;

    /* Map of characters which can be used to mark
     * list-items. */
    var LIST_UNORDERED_MARKERS = {};

    LIST_UNORDERED_MARKERS[C_ASTERISK$1] = true;
    LIST_UNORDERED_MARKERS[C_PLUS] = true;
    LIST_UNORDERED_MARKERS[C_DASH$1] = true;

    /* Map of characters which can be used to mark
     * list-items after a digit. */
    var LIST_ORDERED_MARKERS = {};

    LIST_ORDERED_MARKERS[C_DOT] = true;

    /* Map of characters which can be used to mark
     * list-items after a digit. */
    var LIST_ORDERED_COMMONMARK_MARKERS = {};

    LIST_ORDERED_COMMONMARK_MARKERS[C_DOT] = true;
    LIST_ORDERED_COMMONMARK_MARKERS[C_PAREN_CLOSE] = true;

    function list(eat, value, silent) {
      var self = this;
      var commonmark = self.options.commonmark;
      var pedantic = self.options.pedantic;
      var tokenizers = self.blockTokenizers;
      var interuptors = self.interruptList;
      var markers;
      var index = 0;
      var length = value.length;
      var start = null;
      var size = 0;
      var queue;
      var ordered;
      var character;
      var marker;
      var nextIndex;
      var startIndex;
      var prefixed;
      var currentMarker;
      var content;
      var line;
      var prevEmpty;
      var empty;
      var items;
      var allLines;
      var emptyLines;
      var item;
      var enterTop;
      var exitBlockquote;
      var isLoose;
      var node;
      var now;
      var end;
      var indented;

      while (index < length) {
        character = value.charAt(index);

        if (character === C_TAB$6) {
          size += TAB_SIZE - (size % TAB_SIZE);
        } else if (character === C_SPACE$6) {
          size++;
        } else {
          break;
        }

        index++;
      }

      if (size >= TAB_SIZE) {
        return;
      }

      character = value.charAt(index);

      markers = commonmark ?
        LIST_ORDERED_COMMONMARK_MARKERS :
        LIST_ORDERED_MARKERS;

      if (LIST_UNORDERED_MARKERS[character] === true) {
        marker = character;
        ordered = false;
      } else {
        ordered = true;
        queue = '';

        while (index < length) {
          character = value.charAt(index);

          if (!isDecimal(character)) {
            break;
          }

          queue += character;
          index++;
        }

        character = value.charAt(index);

        if (!queue || markers[character] !== true) {
          return;
        }

        start = parseInt(queue, 10);
        marker = character;
      }

      character = value.charAt(++index);

      if (character !== C_SPACE$6 && character !== C_TAB$6) {
        return;
      }

      if (silent) {
        return true;
      }

      index = 0;
      items = [];
      allLines = [];
      emptyLines = [];

      while (index < length) {
        nextIndex = value.indexOf(C_NEWLINE$7, index);
        startIndex = index;
        prefixed = false;
        indented = false;

        if (nextIndex === -1) {
          nextIndex = length;
        }

        end = index + TAB_SIZE;
        size = 0;

        while (index < length) {
          character = value.charAt(index);

          if (character === C_TAB$6) {
            size += TAB_SIZE - (size % TAB_SIZE);
          } else if (character === C_SPACE$6) {
            size++;
          } else {
            break;
          }

          index++;
        }

        if (size >= TAB_SIZE) {
          indented = true;
        }

        if (item && size >= item.indent) {
          indented = true;
        }

        character = value.charAt(index);
        currentMarker = null;

        if (!indented) {
          if (LIST_UNORDERED_MARKERS[character] === true) {
            currentMarker = character;
            index++;
            size++;
          } else {
            queue = '';

            while (index < length) {
              character = value.charAt(index);

              if (!isDecimal(character)) {
                break;
              }

              queue += character;
              index++;
            }

            character = value.charAt(index);
            index++;

            if (queue && markers[character] === true) {
              currentMarker = character;
              size += queue.length + 1;
            }
          }

          if (currentMarker) {
            character = value.charAt(index);

            if (character === C_TAB$6) {
              size += TAB_SIZE - (size % TAB_SIZE);
              index++;
            } else if (character === C_SPACE$6) {
              end = index + TAB_SIZE;

              while (index < end) {
                if (value.charAt(index) !== C_SPACE$6) {
                  break;
                }

                index++;
                size++;
              }

              if (index === end && value.charAt(index) === C_SPACE$6) {
                index -= TAB_SIZE - 1;
                size -= TAB_SIZE - 1;
              }
            } else if (character !== C_NEWLINE$7 && character !== '') {
              currentMarker = null;
            }
          }
        }

        if (currentMarker) {
          if (!pedantic && marker !== currentMarker) {
            break;
          }

          prefixed = true;
        } else {
          if (!commonmark && !indented && value.charAt(startIndex) === C_SPACE$6) {
            indented = true;
          } else if (commonmark && item) {
            indented = size >= item.indent || size > TAB_SIZE;
          }

          prefixed = false;
          index = startIndex;
        }

        line = value.slice(startIndex, nextIndex);
        content = startIndex === index ? line : value.slice(index, nextIndex);

        if (
          currentMarker === C_ASTERISK$1 ||
          currentMarker === C_UNDERSCORE$1 ||
          currentMarker === C_DASH$1
        ) {
          if (tokenizers.thematicBreak.call(self, eat, line, true)) {
            break;
          }
        }

        prevEmpty = empty;
        empty = !trim_1(content).length;

        if (indented && item) {
          item.value = item.value.concat(emptyLines, line);
          allLines = allLines.concat(emptyLines, line);
          emptyLines = [];
        } else if (prefixed) {
          if (emptyLines.length !== 0) {
            item.value.push('');
            item.trail = emptyLines.concat();
          }

          item = {
            value: [line],
            indent: size,
            trail: []
          };

          items.push(item);
          allLines = allLines.concat(emptyLines, line);
          emptyLines = [];
        } else if (empty) {
          if (prevEmpty) {
            break;
          }

          emptyLines.push(line);
        } else {
          if (prevEmpty) {
            break;
          }

          if (interrupt_1(interuptors, tokenizers, self, [eat, line, true])) {
            break;
          }

          item.value = item.value.concat(emptyLines, line);
          allLines = allLines.concat(emptyLines, line);
          emptyLines = [];
        }

        index = nextIndex + 1;
      }

      node = eat(allLines.join(C_NEWLINE$7)).reset({
        type: 'list',
        ordered: ordered,
        start: start,
        loose: null,
        children: []
      });

      enterTop = self.enterList();
      exitBlockquote = self.enterBlock();
      isLoose = false;
      index = -1;
      length = items.length;

      while (++index < length) {
        item = items[index].value.join(C_NEWLINE$7);
        now = eat.now();

        item = eat(item)(listItem(self, item, now), node);

        if (item.loose) {
          isLoose = true;
        }

        item = items[index].trail.join(C_NEWLINE$7);

        if (index !== length - 1) {
          item += C_NEWLINE$7;
        }

        eat(item);
      }

      enterTop();
      exitBlockquote();

      node.loose = isLoose;

      return node;
    }

    function listItem(ctx, value, position) {
      var offsets = ctx.offset;
      var fn = ctx.options.pedantic ? pedanticListItem : normalListItem;
      var checked = null;
      var task;
      var indent;

      value = fn.apply(null, arguments);

      if (ctx.options.gfm) {
        task = value.match(EXPRESSION_TASK_ITEM);

        if (task) {
          indent = task[0].length;
          checked = task[1].toLowerCase() === C_X_LOWER;
          offsets[position.line] += indent;
          value = value.slice(indent);
        }
      }

      return {
        type: 'listItem',
        loose: EXPRESSION_LOOSE_LIST_ITEM.test(value) ||
          value.charAt(value.length - 1) === C_NEWLINE$7,
        checked: checked,
        children: ctx.tokenizeBlock(value, position)
      };
    }

    /* Create a list-item using overly simple mechanics. */
    function pedanticListItem(ctx, value, position) {
      var offsets = ctx.offset;
      var line = position.line;

      /* Remove the list-item’s bullet. */
      value = value.replace(EXPRESSION_PEDANTIC_BULLET, replacer);

      /* The initial line was also matched by the below, so
       * we reset the `line`. */
      line = position.line;

      return value.replace(EXPRESSION_INITIAL_INDENT, replacer);

      /* A simple replacer which removed all matches,
       * and adds their length to `offset`. */
      function replacer($0) {
        offsets[line] = (offsets[line] || 0) + $0.length;
        line++;

        return '';
      }
    }

    /* Create a list-item using sane mechanics. */
    function normalListItem(ctx, value, position) {
      var offsets = ctx.offset;
      var line = position.line;
      var max;
      var bullet;
      var rest;
      var lines;
      var trimmedLines;
      var index;
      var length;

      /* Remove the list-item’s bullet. */
      value = value.replace(EXPRESSION_BULLET, replacer);

      lines = value.split(C_NEWLINE$7);

      trimmedLines = removeIndentation(value, getIndentation(max).indent).split(C_NEWLINE$7);

      /* We replaced the initial bullet with something
       * else above, which was used to trick
       * `removeIndentation` into removing some more
       * characters when possible.  However, that could
       * result in the initial line to be stripped more
       * than it should be. */
      trimmedLines[0] = rest;

      offsets[line] = (offsets[line] || 0) + bullet.length;
      line++;

      index = 0;
      length = lines.length;

      while (++index < length) {
        offsets[line] = (offsets[line] || 0) +
          lines[index].length - trimmedLines[index].length;
        line++;
      }

      return trimmedLines.join(C_NEWLINE$7);

      function replacer($0, $1, $2, $3, $4) {
        bullet = $1 + $2 + $3;
        rest = $4;

        /* Make sure that the first nine numbered list items
         * can indent with an extra space.  That is, when
         * the bullet did not receive an extra final space. */
        if (Number($2) < 10 && bullet.length % 2 === 1) {
          $2 = C_SPACE$6 + $2;
        }

        max = $1 + repeatString(C_SPACE$6, $2.length) + $3;

        return max + rest;
      }
    }

    var headingSetext = setextHeading;

    var C_NEWLINE$8 = '\n';
    var C_TAB$7 = '\t';
    var C_SPACE$7 = ' ';
    var C_EQUALS = '=';
    var C_DASH$2 = '-';

    var MAX_HEADING_INDENT = 3;

    /* Map of characters which can be used to mark setext
     * headers, mapping to their corresponding depth. */
    var SETEXT_MARKERS = {};

    SETEXT_MARKERS[C_EQUALS] = 1;
    SETEXT_MARKERS[C_DASH$2] = 2;

    function setextHeading(eat, value, silent) {
      var self = this;
      var now = eat.now();
      var length = value.length;
      var index = -1;
      var subvalue = '';
      var content;
      var queue;
      var character;
      var marker;
      var depth;

      /* Eat initial indentation. */
      while (++index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$7 || index >= MAX_HEADING_INDENT) {
          index--;
          break;
        }

        subvalue += character;
      }

      /* Eat content. */
      content = '';
      queue = '';

      while (++index < length) {
        character = value.charAt(index);

        if (character === C_NEWLINE$8) {
          index--;
          break;
        }

        if (character === C_SPACE$7 || character === C_TAB$7) {
          queue += character;
        } else {
          content += queue + character;
          queue = '';
        }
      }

      now.column += subvalue.length;
      now.offset += subvalue.length;
      subvalue += content + queue;

      /* Ensure the content is followed by a newline and a
       * valid marker. */
      character = value.charAt(++index);
      marker = value.charAt(++index);

      if (character !== C_NEWLINE$8 || !SETEXT_MARKERS[marker]) {
        return;
      }

      subvalue += character;

      /* Eat Setext-line. */
      queue = marker;
      depth = SETEXT_MARKERS[marker];

      while (++index < length) {
        character = value.charAt(index);

        if (character !== marker) {
          if (character !== C_NEWLINE$8) {
            return;
          }

          index--;
          break;
        }

        queue += character;
      }

      if (silent) {
        return true;
      }

      return eat(subvalue + queue)({
        type: 'heading',
        depth: depth,
        children: self.tokenizeInline(content, now)
      });
    }

    var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
    var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
    var singleQuoted = '\'[^\']*\'';
    var doubleQuoted = '"[^"]*"';
    var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
    var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
    var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
    var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
    var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
    var processing = '<[?].*?[?]>';
    var declaration = '<![A-Za-z]+\\s+[^>]*>';
    var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

    var openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');

    var tag = new RegExp('^(?:' +
      openTag + '|' +
      closeTag + '|' +
      comment + '|' +
      processing + '|' +
      declaration + '|' +
      cdata +
    ')');

    var html = {
    	openCloseTag: openCloseTag,
    	tag: tag
    };

    var openCloseTag$1 = html.openCloseTag;

    var htmlBlock = blockHTML;

    var C_TAB$8 = '\t';
    var C_SPACE$8 = ' ';
    var C_NEWLINE$9 = '\n';
    var C_LT = '<';

    function blockHTML(eat, value, silent) {
      var self = this;
      var blocks = self.options.blocks;
      var length = value.length;
      var index = 0;
      var next;
      var line;
      var offset;
      var character;
      var count;
      var sequence;
      var subvalue;

      var sequences = [
        [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
        [/^<!--/, /-->/, true],
        [/^<\?/, /\?>/, true],
        [/^<![A-Za-z]/, />/, true],
        [/^<!\[CDATA\[/, /\]\]>/, true],
        [new RegExp('^</?(' + blocks.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true],
        [new RegExp(openCloseTag$1.source + '\\s*$'), /^$/, false]
      ];

      /* Eat initial spacing. */
      while (index < length) {
        character = value.charAt(index);

        if (character !== C_TAB$8 && character !== C_SPACE$8) {
          break;
        }

        index++;
      }

      if (value.charAt(index) !== C_LT) {
        return;
      }

      next = value.indexOf(C_NEWLINE$9, index + 1);
      next = next === -1 ? length : next;
      line = value.slice(index, next);
      offset = -1;
      count = sequences.length;

      while (++offset < count) {
        if (sequences[offset][0].test(line)) {
          sequence = sequences[offset];
          break;
        }
      }

      if (!sequence) {
        return;
      }

      if (silent) {
        return sequence[2];
      }

      index = next;

      if (!sequence[1].test(line)) {
        while (index < length) {
          next = value.indexOf(C_NEWLINE$9, index + 1);
          next = next === -1 ? length : next;
          line = value.slice(index + 1, next);

          if (sequence[1].test(line)) {
            if (line) {
              index = next;
            }

            break;
          }

          index = next;
        }
      }

      subvalue = value.slice(0, index);

      return eat(subvalue)({type: 'html', value: subvalue});
    }

    var collapseWhiteSpace = collapse;

    // `collapse(' \t\nbar \nbaz\t') // ' bar baz '`
    function collapse(value) {
      return String(value).replace(/\s+/g, ' ')
    }

    var normalize_1 = normalize$1;

    /* Normalize an identifier.  Collapses multiple white space
     * characters into a single space, and removes casing. */
    function normalize$1(value) {
      return collapseWhiteSpace(value).toLowerCase();
    }

    var footnoteDefinition_1 = footnoteDefinition;
    footnoteDefinition.notInList = true;
    footnoteDefinition.notInBlock = true;

    var C_BACKSLASH = '\\';
    var C_NEWLINE$a = '\n';
    var C_TAB$9 = '\t';
    var C_SPACE$9 = ' ';
    var C_BRACKET_OPEN = '[';
    var C_BRACKET_CLOSE = ']';
    var C_CARET = '^';
    var C_COLON = ':';

    var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm;

    function footnoteDefinition(eat, value, silent) {
      var self = this;
      var offsets = self.offset;
      var index;
      var length;
      var subvalue;
      var now;
      var currentLine;
      var content;
      var queue;
      var subqueue;
      var character;
      var identifier;
      var add;
      var exit;

      if (!self.options.footnotes) {
        return;
      }

      index = 0;
      length = value.length;
      subvalue = '';
      now = eat.now();
      currentLine = now.line;

      while (index < length) {
        character = value.charAt(index);

        if (!isWhitespaceCharacter(character)) {
          break;
        }

        subvalue += character;
        index++;
      }

      if (
        value.charAt(index) !== C_BRACKET_OPEN ||
        value.charAt(index + 1) !== C_CARET
      ) {
        return;
      }

      subvalue += C_BRACKET_OPEN + C_CARET;
      index = subvalue.length;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (character === C_BRACKET_CLOSE) {
          break;
        } else if (character === C_BACKSLASH) {
          queue += character;
          index++;
          character = value.charAt(index);
        }

        queue += character;
        index++;
      }

      if (
        !queue ||
        value.charAt(index) !== C_BRACKET_CLOSE ||
        value.charAt(index + 1) !== C_COLON
      ) {
        return;
      }

      if (silent) {
        return true;
      }

      identifier = normalize_1(queue);
      subvalue += queue + C_BRACKET_CLOSE + C_COLON;
      index = subvalue.length;

      while (index < length) {
        character = value.charAt(index);

        if (character !== C_TAB$9 && character !== C_SPACE$9) {
          break;
        }

        subvalue += character;
        index++;
      }

      now.column += subvalue.length;
      now.offset += subvalue.length;
      queue = '';
      content = '';
      subqueue = '';

      while (index < length) {
        character = value.charAt(index);

        if (character === C_NEWLINE$a) {
          subqueue = character;
          index++;

          while (index < length) {
            character = value.charAt(index);

            if (character !== C_NEWLINE$a) {
              break;
            }

            subqueue += character;
            index++;
          }

          queue += subqueue;
          subqueue = '';

          while (index < length) {
            character = value.charAt(index);

            if (character !== C_SPACE$9) {
              break;
            }

            subqueue += character;
            index++;
          }

          if (subqueue.length === 0) {
            break;
          }

          queue += subqueue;
        }

        if (queue) {
          content += queue;
          queue = '';
        }

        content += character;
        index++;
      }

      subvalue += content;

      content = content.replace(EXPRESSION_INITIAL_TAB, function (line) {
        offsets[currentLine] = (offsets[currentLine] || 0) + line.length;
        currentLine++;

        return '';
      });

      add = eat(subvalue);

      exit = self.enterBlock();
      content = self.tokenizeBlock(content, now);
      exit();

      return add({
        type: 'footnoteDefinition',
        identifier: identifier,
        children: content
      });
    }

    var definition_1 = definition;
    definition.notInList = true;
    definition.notInBlock = true;

    var C_DOUBLE_QUOTE = '"';
    var C_SINGLE_QUOTE = '\'';
    var C_BACKSLASH$1 = '\\';
    var C_NEWLINE$b = '\n';
    var C_TAB$a = '\t';
    var C_SPACE$a = ' ';
    var C_BRACKET_OPEN$1 = '[';
    var C_BRACKET_CLOSE$1 = ']';
    var C_PAREN_OPEN = '(';
    var C_PAREN_CLOSE$1 = ')';
    var C_COLON$1 = ':';
    var C_LT$1 = '<';
    var C_GT$1 = '>';

    function definition(eat, value, silent) {
      var self = this;
      var commonmark = self.options.commonmark;
      var index = 0;
      var length = value.length;
      var subvalue = '';
      var beforeURL;
      var beforeTitle;
      var queue;
      var character;
      var test;
      var identifier;
      var url;
      var title;

      while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE$a && character !== C_TAB$a) {
          break;
        }

        subvalue += character;
        index++;
      }

      character = value.charAt(index);

      if (character !== C_BRACKET_OPEN$1) {
        return;
      }

      index++;
      subvalue += character;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (character === C_BRACKET_CLOSE$1) {
          break;
        } else if (character === C_BACKSLASH$1) {
          queue += character;
          index++;
          character = value.charAt(index);
        }

        queue += character;
        index++;
      }

      if (
        !queue ||
        value.charAt(index) !== C_BRACKET_CLOSE$1 ||
        value.charAt(index + 1) !== C_COLON$1
      ) {
        return;
      }

      identifier = queue;
      subvalue += queue + C_BRACKET_CLOSE$1 + C_COLON$1;
      index = subvalue.length;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (
          character !== C_TAB$a &&
          character !== C_SPACE$a &&
          character !== C_NEWLINE$b
        ) {
          break;
        }

        subvalue += character;
        index++;
      }

      character = value.charAt(index);
      queue = '';
      beforeURL = subvalue;

      if (character === C_LT$1) {
        index++;

        while (index < length) {
          character = value.charAt(index);

          if (!isEnclosedURLCharacter(character)) {
            break;
          }

          queue += character;
          index++;
        }

        character = value.charAt(index);

        if (character === isEnclosedURLCharacter.delimiter) {
          subvalue += C_LT$1 + queue + character;
          index++;
        } else {
          if (commonmark) {
            return;
          }

          index -= queue.length + 1;
          queue = '';
        }
      }

      if (!queue) {
        while (index < length) {
          character = value.charAt(index);

          if (!isUnclosedURLCharacter(character)) {
            break;
          }

          queue += character;
          index++;
        }

        subvalue += queue;
      }

      if (!queue) {
        return;
      }

      url = queue;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (
          character !== C_TAB$a &&
          character !== C_SPACE$a &&
          character !== C_NEWLINE$b
        ) {
          break;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);
      test = null;

      if (character === C_DOUBLE_QUOTE) {
        test = C_DOUBLE_QUOTE;
      } else if (character === C_SINGLE_QUOTE) {
        test = C_SINGLE_QUOTE;
      } else if (character === C_PAREN_OPEN) {
        test = C_PAREN_CLOSE$1;
      }

      if (!test) {
        queue = '';
        index = subvalue.length;
      } else if (queue) {
        subvalue += queue + character;
        index = subvalue.length;
        queue = '';

        while (index < length) {
          character = value.charAt(index);

          if (character === test) {
            break;
          }

          if (character === C_NEWLINE$b) {
            index++;
            character = value.charAt(index);

            if (character === C_NEWLINE$b || character === test) {
              return;
            }

            queue += C_NEWLINE$b;
          }

          queue += character;
          index++;
        }

        character = value.charAt(index);

        if (character !== test) {
          return;
        }

        beforeTitle = subvalue;
        subvalue += queue + character;
        index++;
        title = queue;
        queue = '';
      } else {
        return;
      }

      while (index < length) {
        character = value.charAt(index);

        if (character !== C_TAB$a && character !== C_SPACE$a) {
          break;
        }

        subvalue += character;
        index++;
      }

      character = value.charAt(index);

      if (!character || character === C_NEWLINE$b) {
        if (silent) {
          return true;
        }

        beforeURL = eat(beforeURL).test().end;
        url = self.decode.raw(self.unescape(url), beforeURL, {nonTerminated: false});

        if (title) {
          beforeTitle = eat(beforeTitle).test().end;
          title = self.decode.raw(self.unescape(title), beforeTitle);
        }

        return eat(subvalue)({
          type: 'definition',
          identifier: normalize_1(identifier),
          title: title || null,
          url: url
        });
      }
    }

    /* Check if `character` can be inside an enclosed URI. */
    function isEnclosedURLCharacter(character) {
      return character !== C_GT$1 &&
        character !== C_BRACKET_OPEN$1 &&
        character !== C_BRACKET_CLOSE$1;
    }

    isEnclosedURLCharacter.delimiter = C_GT$1;

    /* Check if `character` can be inside an unclosed URI. */
    function isUnclosedURLCharacter(character) {
      return character !== C_BRACKET_OPEN$1 &&
        character !== C_BRACKET_CLOSE$1 &&
        !isWhitespaceCharacter(character);
    }

    var table_1 = table;

    var C_BACKSLASH$2 = '\\';
    var C_TICK$1 = '`';
    var C_DASH$3 = '-';
    var C_PIPE = '|';
    var C_COLON$2 = ':';
    var C_SPACE$b = ' ';
    var C_NEWLINE$c = '\n';
    var C_TAB$b = '\t';

    var MIN_TABLE_COLUMNS = 1;
    var MIN_TABLE_ROWS = 2;

    var TABLE_ALIGN_LEFT = 'left';
    var TABLE_ALIGN_CENTER = 'center';
    var TABLE_ALIGN_RIGHT = 'right';
    var TABLE_ALIGN_NONE = null;

    function table(eat, value, silent) {
      var self = this;
      var index;
      var alignments;
      var alignment;
      var subvalue;
      var row;
      var length;
      var lines;
      var queue;
      var character;
      var hasDash;
      var align;
      var cell;
      var preamble;
      var count;
      var opening;
      var now;
      var position;
      var lineCount;
      var line;
      var rows;
      var table;
      var lineIndex;
      var pipeIndex;
      var first;

      /* Exit when not in gfm-mode. */
      if (!self.options.gfm) {
        return;
      }

      /* Get the rows.
       * Detecting tables soon is hard, so there are some
       * checks for performance here, such as the minimum
       * number of rows, and allowed characters in the
       * alignment row. */
      index = 0;
      lineCount = 0;
      length = value.length + 1;
      lines = [];

      while (index < length) {
        lineIndex = value.indexOf(C_NEWLINE$c, index);
        pipeIndex = value.indexOf(C_PIPE, index + 1);

        if (lineIndex === -1) {
          lineIndex = value.length;
        }

        if (pipeIndex === -1 || pipeIndex > lineIndex) {
          if (lineCount < MIN_TABLE_ROWS) {
            return;
          }

          break;
        }

        lines.push(value.slice(index, lineIndex));
        lineCount++;
        index = lineIndex + 1;
      }

      /* Parse the alignment row. */
      subvalue = lines.join(C_NEWLINE$c);
      alignments = lines.splice(1, 1)[0] || [];
      index = 0;
      length = alignments.length;
      lineCount--;
      alignment = false;
      align = [];

      while (index < length) {
        character = alignments.charAt(index);

        if (character === C_PIPE) {
          hasDash = null;

          if (alignment === false) {
            if (first === false) {
              return;
            }
          } else {
            align.push(alignment);
            alignment = false;
          }

          first = false;
        } else if (character === C_DASH$3) {
          hasDash = true;
          alignment = alignment || TABLE_ALIGN_NONE;
        } else if (character === C_COLON$2) {
          if (alignment === TABLE_ALIGN_LEFT) {
            alignment = TABLE_ALIGN_CENTER;
          } else if (hasDash && alignment === TABLE_ALIGN_NONE) {
            alignment = TABLE_ALIGN_RIGHT;
          } else {
            alignment = TABLE_ALIGN_LEFT;
          }
        } else if (!isWhitespaceCharacter(character)) {
          return;
        }

        index++;
      }

      if (alignment !== false) {
        align.push(alignment);
      }

      /* Exit when without enough columns. */
      if (align.length < MIN_TABLE_COLUMNS) {
        return;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      /* Parse the rows. */
      position = -1;
      rows = [];

      table = eat(subvalue).reset({
        type: 'table',
        align: align,
        children: rows
      });

      while (++position < lineCount) {
        line = lines[position];
        row = {type: 'tableRow', children: []};

        /* Eat a newline character when this is not the
         * first row. */
        if (position) {
          eat(C_NEWLINE$c);
        }

        /* Eat the row. */
        eat(line).reset(row, table);

        length = line.length + 1;
        index = 0;
        queue = '';
        cell = '';
        preamble = true;
        count = null;
        opening = null;

        while (index < length) {
          character = line.charAt(index);

          if (character === C_TAB$b || character === C_SPACE$b) {
            if (cell) {
              queue += character;
            } else {
              eat(character);
            }

            index++;
            continue;
          }

          if (character === '' || character === C_PIPE) {
            if (preamble) {
              eat(character);
            } else {
              if (character && opening) {
                queue += character;
                index++;
                continue;
              }

              if ((cell || character) && !preamble) {
                subvalue = cell;

                if (queue.length > 1) {
                  if (character) {
                    subvalue += queue.slice(0, queue.length - 1);
                    queue = queue.charAt(queue.length - 1);
                  } else {
                    subvalue += queue;
                    queue = '';
                  }
                }

                now = eat.now();

                eat(subvalue)({
                  type: 'tableCell',
                  children: self.tokenizeInline(cell, now)
                }, row);
              }

              eat(queue + character);

              queue = '';
              cell = '';
            }
          } else {
            if (queue) {
              cell += queue;
              queue = '';
            }

            cell += character;

            if (character === C_BACKSLASH$2 && index !== length - 2) {
              cell += line.charAt(index + 1);
              index++;
            }

            if (character === C_TICK$1) {
              count = 1;

              while (line.charAt(index + 1) === character) {
                cell += character;
                index++;
                count++;
              }

              if (!opening) {
                opening = count;
              } else if (count >= opening) {
                opening = 0;
              }
            }
          }

          preamble = false;
          index++;
        }

        /* Eat the alignment row. */
        if (!position) {
          eat(C_NEWLINE$c + alignments);
        }
      }

      return table;
    }

    var paragraph_1 = paragraph;

    var C_NEWLINE$d = '\n';
    var C_TAB$c = '\t';
    var C_SPACE$c = ' ';

    var TAB_SIZE$1 = 4;

    /* Tokenise paragraph. */
    function paragraph(eat, value, silent) {
      var self = this;
      var settings = self.options;
      var commonmark = settings.commonmark;
      var gfm = settings.gfm;
      var tokenizers = self.blockTokenizers;
      var interruptors = self.interruptParagraph;
      var index = value.indexOf(C_NEWLINE$d);
      var length = value.length;
      var position;
      var subvalue;
      var character;
      var size;
      var now;

      while (index < length) {
        /* Eat everything if there’s no following newline. */
        if (index === -1) {
          index = length;
          break;
        }

        /* Stop if the next character is NEWLINE. */
        if (value.charAt(index + 1) === C_NEWLINE$d) {
          break;
        }

        /* In commonmark-mode, following indented lines
         * are part of the paragraph. */
        if (commonmark) {
          size = 0;
          position = index + 1;

          while (position < length) {
            character = value.charAt(position);

            if (character === C_TAB$c) {
              size = TAB_SIZE$1;
              break;
            } else if (character === C_SPACE$c) {
              size++;
            } else {
              break;
            }

            position++;
          }

          if (size >= TAB_SIZE$1) {
            index = value.indexOf(C_NEWLINE$d, index + 1);
            continue;
          }
        }

        subvalue = value.slice(index + 1);

        /* Check if the following code contains a possible
         * block. */
        if (interrupt_1(interruptors, tokenizers, self, [eat, subvalue, true])) {
          break;
        }

        /* Break if the following line starts a list, when
         * already in a list, or when in commonmark, or when
         * in gfm mode and the bullet is *not* numeric. */
        if (
          tokenizers.list.call(self, eat, subvalue, true) &&
          (
            self.inList ||
            commonmark ||
            (gfm && !isDecimal(trim_1.left(subvalue).charAt(0)))
          )
        ) {
          break;
        }

        position = index;
        index = value.indexOf(C_NEWLINE$d, index + 1);

        if (index !== -1 && trim_1(value.slice(position, index)) === '') {
          index = position;
          break;
        }
      }

      subvalue = value.slice(0, index);

      if (trim_1(subvalue) === '') {
        eat(subvalue);

        return null;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      now = eat.now();
      subvalue = trimTrailingLines_1(subvalue);

      return eat(subvalue)({
        type: 'paragraph',
        children: self.tokenizeInline(subvalue, now)
      });
    }

    var _escape = locate;

    function locate(value, fromIndex) {
      return value.indexOf('\\', fromIndex);
    }

    var _escape$1 = escape;
    escape.locator = _escape;

    function escape(eat, value, silent) {
      var self = this;
      var character;
      var node;

      if (value.charAt(0) === '\\') {
        character = value.charAt(1);

        if (self.escape.indexOf(character) !== -1) {
          /* istanbul ignore if - never used (yet) */
          if (silent) {
            return true;
          }

          if (character === '\n') {
            node = {type: 'break'};
          } else {
            node = {
              type: 'text',
              value: character
            };
          }

          return eat('\\' + character)(node);
        }
      }
    }

    var tag$1 = locate$1;

    function locate$1(value, fromIndex) {
      return value.indexOf('<', fromIndex);
    }

    var autoLink_1 = autoLink;
    autoLink.locator = tag$1;
    autoLink.notInLink = true;

    var C_LT$2 = '<';
    var C_GT$2 = '>';
    var C_AT_SIGN = '@';
    var C_SLASH = '/';
    var MAILTO = 'mailto:';
    var MAILTO_LENGTH = MAILTO.length;

    /* Tokenise a link. */
    function autoLink(eat, value, silent) {
      var self;
      var subvalue;
      var length;
      var index;
      var queue;
      var character;
      var hasAtCharacter;
      var link;
      var now;
      var content;
      var tokenizers;
      var exit;

      if (value.charAt(0) !== C_LT$2) {
        return;
      }

      self = this;
      subvalue = '';
      length = value.length;
      index = 0;
      queue = '';
      hasAtCharacter = false;
      link = '';

      index++;
      subvalue = C_LT$2;

      while (index < length) {
        character = value.charAt(index);

        if (
          isWhitespaceCharacter(character) ||
          character === C_GT$2 ||
          character === C_AT_SIGN ||
          (character === ':' && value.charAt(index + 1) === C_SLASH)
        ) {
          break;
        }

        queue += character;
        index++;
      }

      if (!queue) {
        return;
      }

      link += queue;
      queue = '';

      character = value.charAt(index);
      link += character;
      index++;

      if (character === C_AT_SIGN) {
        hasAtCharacter = true;
      } else {
        if (
          character !== ':' ||
          value.charAt(index + 1) !== C_SLASH
        ) {
          return;
        }

        link += C_SLASH;
        index++;
      }

      while (index < length) {
        character = value.charAt(index);

        if (isWhitespaceCharacter(character) || character === C_GT$2) {
          break;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);

      if (!queue || character !== C_GT$2) {
        return;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      link += queue;
      content = link;
      subvalue += link + character;
      now = eat.now();
      now.column++;
      now.offset++;

      if (hasAtCharacter) {
        if (link.slice(0, MAILTO_LENGTH).toLowerCase() === MAILTO) {
          content = content.substr(MAILTO_LENGTH);
          now.column += MAILTO_LENGTH;
          now.offset += MAILTO_LENGTH;
        } else {
          link = MAILTO + link;
        }
      }

      /* Temporarily remove all tokenizers except text in autolinks. */
      tokenizers = self.inlineTokenizers;
      self.inlineTokenizers = {text: tokenizers.text};

      exit = self.enterLink();

      content = self.tokenizeInline(content, now);

      self.inlineTokenizers = tokenizers;
      exit();

      return eat(subvalue)({
        type: 'link',
        title: null,
        url: parseEntities_1(link, {nonTerminated: false}),
        children: content
      });
    }

    var url = locate$2;

    var PROTOCOLS = ['https://', 'http://', 'mailto:'];

    function locate$2(value, fromIndex) {
      var length = PROTOCOLS.length;
      var index = -1;
      var min = -1;
      var position;

      if (!this.options.gfm) {
        return -1;
      }

      while (++index < length) {
        position = value.indexOf(PROTOCOLS[index], fromIndex);

        if (position !== -1 && (position < min || min === -1)) {
          min = position;
        }
      }

      return min;
    }

    var url_1 = url$1;
    url$1.locator = url;
    url$1.notInLink = true;

    var C_BRACKET_OPEN$2 = '[';
    var C_BRACKET_CLOSE$2 = ']';
    var C_PAREN_OPEN$1 = '(';
    var C_PAREN_CLOSE$2 = ')';
    var C_LT$3 = '<';
    var C_AT_SIGN$1 = '@';

    var HTTP_PROTOCOL = 'http://';
    var HTTPS_PROTOCOL = 'https://';
    var MAILTO_PROTOCOL = 'mailto:';

    var PROTOCOLS$1 = [
      HTTP_PROTOCOL,
      HTTPS_PROTOCOL,
      MAILTO_PROTOCOL
    ];

    var PROTOCOLS_LENGTH = PROTOCOLS$1.length;

    function url$1(eat, value, silent) {
      var self = this;
      var subvalue;
      var content;
      var character;
      var index;
      var position;
      var protocol;
      var match;
      var length;
      var queue;
      var parenCount;
      var nextCharacter;
      var exit;

      if (!self.options.gfm) {
        return;
      }

      subvalue = '';
      index = -1;
      length = PROTOCOLS_LENGTH;

      while (++index < length) {
        protocol = PROTOCOLS$1[index];
        match = value.slice(0, protocol.length);

        if (match.toLowerCase() === protocol) {
          subvalue = match;
          break;
        }
      }

      if (!subvalue) {
        return;
      }

      index = subvalue.length;
      length = value.length;
      queue = '';
      parenCount = 0;

      while (index < length) {
        character = value.charAt(index);

        if (isWhitespaceCharacter(character) || character === C_LT$3) {
          break;
        }

        if (
          character === '.' ||
          character === ',' ||
          character === ':' ||
          character === ';' ||
          character === '"' ||
          character === '\'' ||
          character === ')' ||
          character === ']'
        ) {
          nextCharacter = value.charAt(index + 1);

          if (!nextCharacter || isWhitespaceCharacter(nextCharacter)) {
            break;
          }
        }

        if (character === C_PAREN_OPEN$1 || character === C_BRACKET_OPEN$2) {
          parenCount++;
        }

        if (character === C_PAREN_CLOSE$2 || character === C_BRACKET_CLOSE$2) {
          parenCount--;

          if (parenCount < 0) {
            break;
          }
        }

        queue += character;
        index++;
      }

      if (!queue) {
        return;
      }

      subvalue += queue;
      content = subvalue;

      if (protocol === MAILTO_PROTOCOL) {
        position = queue.indexOf(C_AT_SIGN$1);

        if (position === -1 || position === length - 1) {
          return;
        }

        content = content.substr(MAILTO_PROTOCOL.length);
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      exit = self.enterLink();
      content = self.tokenizeInline(content, eat.now());
      exit();

      return eat(subvalue)({
        type: 'link',
        title: null,
        url: parseEntities_1(subvalue, {nonTerminated: false}),
        children: content
      });
    }

    var tag$2 = html.tag;

    var htmlInline = inlineHTML;
    inlineHTML.locator = tag$1;

    var EXPRESSION_HTML_LINK_OPEN = /^<a /i;
    var EXPRESSION_HTML_LINK_CLOSE = /^<\/a>/i;

    function inlineHTML(eat, value, silent) {
      var self = this;
      var length = value.length;
      var character;
      var subvalue;

      if (value.charAt(0) !== '<' || length < 3) {
        return;
      }

      character = value.charAt(1);

      if (
        !isAlphabetical(character) &&
        character !== '?' &&
        character !== '!' &&
        character !== '/'
      ) {
        return;
      }

      subvalue = value.match(tag$2);

      if (!subvalue) {
        return;
      }

      /* istanbul ignore if - not used yet. */
      if (silent) {
        return true;
      }

      subvalue = subvalue[0];

      if (!self.inLink && EXPRESSION_HTML_LINK_OPEN.test(subvalue)) {
        self.inLink = true;
      } else if (self.inLink && EXPRESSION_HTML_LINK_CLOSE.test(subvalue)) {
        self.inLink = false;
      }

      return eat(subvalue)({type: 'html', value: subvalue});
    }

    var link = locate$3;

    function locate$3(value, fromIndex) {
      var link = value.indexOf('[', fromIndex);
      var image = value.indexOf('![', fromIndex);

      if (image === -1) {
        return link;
      }

      /* Link can never be `-1` if an image is found, so we don’t need
       * to check for that :) */
      return link < image ? link : image;
    }

    var link_1 = link$1;
    link$1.locator = link;

    var own$4 = {}.hasOwnProperty;

    var C_BACKSLASH$3 = '\\';
    var C_BRACKET_OPEN$3 = '[';
    var C_BRACKET_CLOSE$3 = ']';
    var C_PAREN_OPEN$2 = '(';
    var C_PAREN_CLOSE$3 = ')';
    var C_LT$4 = '<';
    var C_GT$3 = '>';
    var C_TICK$2 = '`';
    var C_DOUBLE_QUOTE$1 = '"';
    var C_SINGLE_QUOTE$1 = '\'';

    /* Map of characters, which can be used to mark link
     * and image titles. */
    var LINK_MARKERS = {};

    LINK_MARKERS[C_DOUBLE_QUOTE$1] = C_DOUBLE_QUOTE$1;
    LINK_MARKERS[C_SINGLE_QUOTE$1] = C_SINGLE_QUOTE$1;

    /* Map of characters, which can be used to mark link
     * and image titles in commonmark-mode. */
    var COMMONMARK_LINK_MARKERS = {};

    COMMONMARK_LINK_MARKERS[C_DOUBLE_QUOTE$1] = C_DOUBLE_QUOTE$1;
    COMMONMARK_LINK_MARKERS[C_SINGLE_QUOTE$1] = C_SINGLE_QUOTE$1;
    COMMONMARK_LINK_MARKERS[C_PAREN_OPEN$2] = C_PAREN_CLOSE$3;

    function link$1(eat, value, silent) {
      var self = this;
      var subvalue = '';
      var index = 0;
      var character = value.charAt(0);
      var pedantic = self.options.pedantic;
      var commonmark = self.options.commonmark;
      var gfm = self.options.gfm;
      var closed;
      var count;
      var opening;
      var beforeURL;
      var beforeTitle;
      var subqueue;
      var hasMarker;
      var markers;
      var isImage;
      var content;
      var marker;
      var length;
      var title;
      var depth;
      var queue;
      var url;
      var now;
      var exit;
      var node;

      /* Detect whether this is an image. */
      if (character === '!') {
        isImage = true;
        subvalue = character;
        character = value.charAt(++index);
      }

      /* Eat the opening. */
      if (character !== C_BRACKET_OPEN$3) {
        return;
      }

      /* Exit when this is a link and we’re already inside
       * a link. */
      if (!isImage && self.inLink) {
        return;
      }

      subvalue += character;
      queue = '';
      index++;

      /* Eat the content. */
      length = value.length;
      now = eat.now();
      depth = 0;

      now.column += index;
      now.offset += index;

      while (index < length) {
        character = value.charAt(index);
        subqueue = character;

        if (character === C_TICK$2) {
          /* Inline-code in link content. */
          count = 1;

          while (value.charAt(index + 1) === C_TICK$2) {
            subqueue += character;
            index++;
            count++;
          }

          if (!opening) {
            opening = count;
          } else if (count >= opening) {
            opening = 0;
          }
        } else if (character === C_BACKSLASH$3) {
          /* Allow brackets to be escaped. */
          index++;
          subqueue += value.charAt(index);
        /* In GFM mode, brackets in code still count.
         * In all other modes, they don’t.  This empty
         * block prevents the next statements are
         * entered. */
        } else if ((!opening || gfm) && character === C_BRACKET_OPEN$3) {
          depth++;
        } else if ((!opening || gfm) && character === C_BRACKET_CLOSE$3) {
          if (depth) {
            depth--;
          } else {
            /* Allow white-space between content and
             * url in GFM mode. */
            if (!pedantic) {
              while (index < length) {
                character = value.charAt(index + 1);

                if (!isWhitespaceCharacter(character)) {
                  break;
                }

                subqueue += character;
                index++;
              }
            }

            if (value.charAt(index + 1) !== C_PAREN_OPEN$2) {
              return;
            }

            subqueue += C_PAREN_OPEN$2;
            closed = true;
            index++;

            break;
          }
        }

        queue += subqueue;
        subqueue = '';
        index++;
      }

      /* Eat the content closing. */
      if (!closed) {
        return;
      }

      content = queue;
      subvalue += queue + subqueue;
      index++;

      /* Eat white-space. */
      while (index < length) {
        character = value.charAt(index);

        if (!isWhitespaceCharacter(character)) {
          break;
        }

        subvalue += character;
        index++;
      }

      /* Eat the URL. */
      character = value.charAt(index);
      markers = commonmark ? COMMONMARK_LINK_MARKERS : LINK_MARKERS;
      queue = '';
      beforeURL = subvalue;

      if (character === C_LT$4) {
        index++;
        beforeURL += C_LT$4;

        while (index < length) {
          character = value.charAt(index);

          if (character === C_GT$3) {
            break;
          }

          if (commonmark && character === '\n') {
            return;
          }

          queue += character;
          index++;
        }

        if (value.charAt(index) !== C_GT$3) {
          return;
        }

        subvalue += C_LT$4 + queue + C_GT$3;
        url = queue;
        index++;
      } else {
        character = null;
        subqueue = '';

        while (index < length) {
          character = value.charAt(index);

          if (subqueue && own$4.call(markers, character)) {
            break;
          }

          if (isWhitespaceCharacter(character)) {
            if (!pedantic) {
              break;
            }

            subqueue += character;
          } else {
            if (character === C_PAREN_OPEN$2) {
              depth++;
            } else if (character === C_PAREN_CLOSE$3) {
              if (depth === 0) {
                break;
              }

              depth--;
            }

            queue += subqueue;
            subqueue = '';

            if (character === C_BACKSLASH$3) {
              queue += C_BACKSLASH$3;
              character = value.charAt(++index);
            }

            queue += character;
          }

          index++;
        }

        subvalue += queue;
        url = queue;
        index = subvalue.length;
      }

      /* Eat white-space. */
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (!isWhitespaceCharacter(character)) {
          break;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);
      subvalue += queue;

      /* Eat the title. */
      if (queue && own$4.call(markers, character)) {
        index++;
        subvalue += character;
        queue = '';
        marker = markers[character];
        beforeTitle = subvalue;

        /* In commonmark-mode, things are pretty easy: the
         * marker cannot occur inside the title.
         *
         * Non-commonmark does, however, support nested
         * delimiters. */
        if (commonmark) {
          while (index < length) {
            character = value.charAt(index);

            if (character === marker) {
              break;
            }

            if (character === C_BACKSLASH$3) {
              queue += C_BACKSLASH$3;
              character = value.charAt(++index);
            }

            index++;
            queue += character;
          }

          character = value.charAt(index);

          if (character !== marker) {
            return;
          }

          title = queue;
          subvalue += queue + character;
          index++;

          while (index < length) {
            character = value.charAt(index);

            if (!isWhitespaceCharacter(character)) {
              break;
            }

            subvalue += character;
            index++;
          }
        } else {
          subqueue = '';

          while (index < length) {
            character = value.charAt(index);

            if (character === marker) {
              if (hasMarker) {
                queue += marker + subqueue;
                subqueue = '';
              }

              hasMarker = true;
            } else if (!hasMarker) {
              queue += character;
            } else if (character === C_PAREN_CLOSE$3) {
              subvalue += queue + marker + subqueue;
              title = queue;
              break;
            } else if (isWhitespaceCharacter(character)) {
              subqueue += character;
            } else {
              queue += marker + subqueue + character;
              subqueue = '';
              hasMarker = false;
            }

            index++;
          }
        }
      }

      if (value.charAt(index) !== C_PAREN_CLOSE$3) {
        return;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      subvalue += C_PAREN_CLOSE$3;

      url = self.decode.raw(self.unescape(url), eat(beforeURL).test().end, {nonTerminated: false});

      if (title) {
        beforeTitle = eat(beforeTitle).test().end;
        title = self.decode.raw(self.unescape(title), beforeTitle);
      }

      node = {
        type: isImage ? 'image' : 'link',
        title: title || null,
        url: url
      };

      if (isImage) {
        node.alt = self.decode.raw(self.unescape(content), now) || null;
      } else {
        exit = self.enterLink();
        node.children = self.tokenizeInline(content, now);
        exit();
      }

      return eat(subvalue)(node);
    }

    var reference_1 = reference;
    reference.locator = link;

    var T_LINK = 'link';
    var T_IMAGE = 'image';
    var T_FOOTNOTE = 'footnote';
    var REFERENCE_TYPE_SHORTCUT = 'shortcut';
    var REFERENCE_TYPE_COLLAPSED = 'collapsed';
    var REFERENCE_TYPE_FULL = 'full';
    var C_CARET$1 = '^';
    var C_BACKSLASH$4 = '\\';
    var C_BRACKET_OPEN$4 = '[';
    var C_BRACKET_CLOSE$4 = ']';

    function reference(eat, value, silent) {
      var self = this;
      var character = value.charAt(0);
      var index = 0;
      var length = value.length;
      var subvalue = '';
      var intro = '';
      var type = T_LINK;
      var referenceType = REFERENCE_TYPE_SHORTCUT;
      var content;
      var identifier;
      var now;
      var node;
      var exit;
      var queue;
      var bracketed;
      var depth;

      /* Check whether we’re eating an image. */
      if (character === '!') {
        type = T_IMAGE;
        intro = character;
        character = value.charAt(++index);
      }

      if (character !== C_BRACKET_OPEN$4) {
        return;
      }

      index++;
      intro += character;
      queue = '';

      /* Check whether we’re eating a footnote. */
      if (self.options.footnotes && value.charAt(index) === C_CARET$1) {
        /* Exit if `![^` is found, so the `!` will be seen as text after this,
         * and we’ll enter this function again when `[^` is found. */
        if (type === T_IMAGE) {
          return;
        }

        intro += C_CARET$1;
        index++;
        type = T_FOOTNOTE;
      }

      /* Eat the text. */
      depth = 0;

      while (index < length) {
        character = value.charAt(index);

        if (character === C_BRACKET_OPEN$4) {
          bracketed = true;
          depth++;
        } else if (character === C_BRACKET_CLOSE$4) {
          if (!depth) {
            break;
          }

          depth--;
        }

        if (character === C_BACKSLASH$4) {
          queue += C_BACKSLASH$4;
          character = value.charAt(++index);
        }

        queue += character;
        index++;
      }

      subvalue = queue;
      content = queue;
      character = value.charAt(index);

      if (character !== C_BRACKET_CLOSE$4) {
        return;
      }

      index++;
      subvalue += character;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (!isWhitespaceCharacter(character)) {
          break;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);

      /* Inline footnotes cannot have an identifier. */
      if (type !== T_FOOTNOTE && character === C_BRACKET_OPEN$4) {
        identifier = '';
        queue += character;
        index++;

        while (index < length) {
          character = value.charAt(index);

          if (character === C_BRACKET_OPEN$4 || character === C_BRACKET_CLOSE$4) {
            break;
          }

          if (character === C_BACKSLASH$4) {
            identifier += C_BACKSLASH$4;
            character = value.charAt(++index);
          }

          identifier += character;
          index++;
        }

        character = value.charAt(index);

        if (character === C_BRACKET_CLOSE$4) {
          referenceType = identifier ? REFERENCE_TYPE_FULL : REFERENCE_TYPE_COLLAPSED;
          queue += identifier + character;
          index++;
        } else {
          identifier = '';
        }

        subvalue += queue;
        queue = '';
      } else {
        if (!content) {
          return;
        }

        identifier = content;
      }

      /* Brackets cannot be inside the identifier. */
      if (referenceType !== REFERENCE_TYPE_FULL && bracketed) {
        return;
      }

      subvalue = intro + subvalue;

      if (type === T_LINK && self.inLink) {
        return null;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      if (type === T_FOOTNOTE && content.indexOf(' ') !== -1) {
        return eat(subvalue)({
          type: 'footnote',
          children: this.tokenizeInline(content, eat.now())
        });
      }

      now = eat.now();
      now.column += intro.length;
      now.offset += intro.length;
      identifier = referenceType === REFERENCE_TYPE_FULL ? identifier : content;

      node = {
        type: type + 'Reference',
        identifier: normalize_1(identifier)
      };

      if (type === T_LINK || type === T_IMAGE) {
        node.referenceType = referenceType;
      }

      if (type === T_LINK) {
        exit = self.enterLink();
        node.children = self.tokenizeInline(content, now);
        exit();
      } else if (type === T_IMAGE) {
        node.alt = self.decode.raw(self.unescape(content), now) || null;
      }

      return eat(subvalue)(node);
    }

    var strong = locate$4;

    function locate$4(value, fromIndex) {
      var asterisk = value.indexOf('**', fromIndex);
      var underscore = value.indexOf('__', fromIndex);

      if (underscore === -1) {
        return asterisk;
      }

      if (asterisk === -1) {
        return underscore;
      }

      return underscore < asterisk ? underscore : asterisk;
    }

    var strong_1 = strong$1;
    strong$1.locator = strong;

    var C_ASTERISK$2 = '*';
    var C_UNDERSCORE$2 = '_';

    function strong$1(eat, value, silent) {
      var self = this;
      var index = 0;
      var character = value.charAt(index);
      var now;
      var pedantic;
      var marker;
      var queue;
      var subvalue;
      var length;
      var prev;

      if (
        (character !== C_ASTERISK$2 && character !== C_UNDERSCORE$2) ||
        value.charAt(++index) !== character
      ) {
        return;
      }

      pedantic = self.options.pedantic;
      marker = character;
      subvalue = marker + marker;
      length = value.length;
      index++;
      queue = '';
      character = '';

      if (pedantic && isWhitespaceCharacter(value.charAt(index))) {
        return;
      }

      while (index < length) {
        prev = character;
        character = value.charAt(index);

        if (
          character === marker &&
          value.charAt(index + 1) === marker &&
          (!pedantic || !isWhitespaceCharacter(prev))
        ) {
          character = value.charAt(index + 2);

          if (character !== marker) {
            if (!trim_1(queue)) {
              return;
            }

            /* istanbul ignore if - never used (yet) */
            if (silent) {
              return true;
            }

            now = eat.now();
            now.column += 2;
            now.offset += 2;

            return eat(subvalue + queue + subvalue)({
              type: 'strong',
              children: self.tokenizeInline(queue, now)
            });
          }
        }

        if (!pedantic && character === '\\') {
          queue += character;
          character = value.charAt(++index);
        }

        queue += character;
        index++;
      }
    }

    var isWordCharacter = wordCharacter;

    var fromCode$1 = String.fromCharCode;
    var re$1 = /\w/;

    // Check if the given character code, or the character code at the first
    // character, is a word character.
    function wordCharacter(character) {
      return re$1.test(
        typeof character === 'number' ? fromCode$1(character) : character.charAt(0)
      )
    }

    var emphasis = locate$5;

    function locate$5(value, fromIndex) {
      var asterisk = value.indexOf('*', fromIndex);
      var underscore = value.indexOf('_', fromIndex);

      if (underscore === -1) {
        return asterisk;
      }

      if (asterisk === -1) {
        return underscore;
      }

      return underscore < asterisk ? underscore : asterisk;
    }

    var emphasis_1 = emphasis$1;
    emphasis$1.locator = emphasis;

    var C_ASTERISK$3 = '*';
    var C_UNDERSCORE$3 = '_';

    function emphasis$1(eat, value, silent) {
      var self = this;
      var index = 0;
      var character = value.charAt(index);
      var now;
      var pedantic;
      var marker;
      var queue;
      var subvalue;
      var length;
      var prev;

      if (character !== C_ASTERISK$3 && character !== C_UNDERSCORE$3) {
        return;
      }

      pedantic = self.options.pedantic;
      subvalue = character;
      marker = character;
      length = value.length;
      index++;
      queue = '';
      character = '';

      if (pedantic && isWhitespaceCharacter(value.charAt(index))) {
        return;
      }

      while (index < length) {
        prev = character;
        character = value.charAt(index);

        if (character === marker && (!pedantic || !isWhitespaceCharacter(prev))) {
          character = value.charAt(++index);

          if (character !== marker) {
            if (!trim_1(queue) || prev === marker) {
              return;
            }

            if (!pedantic && marker === C_UNDERSCORE$3 && isWordCharacter(character)) {
              queue += marker;
              continue;
            }

            /* istanbul ignore if - never used (yet) */
            if (silent) {
              return true;
            }

            now = eat.now();
            now.column++;
            now.offset++;

            return eat(subvalue + queue + marker)({
              type: 'emphasis',
              children: self.tokenizeInline(queue, now)
            });
          }

          queue += marker;
        }

        if (!pedantic && character === '\\') {
          queue += character;
          character = value.charAt(++index);
        }

        queue += character;
        index++;
      }
    }

    var _delete = locate$6;

    function locate$6(value, fromIndex) {
      return value.indexOf('~~', fromIndex);
    }

    var _delete$1 = strikethrough;
    strikethrough.locator = _delete;

    var C_TILDE$1 = '~';
    var DOUBLE = '~~';

    function strikethrough(eat, value, silent) {
      var self = this;
      var character = '';
      var previous = '';
      var preceding = '';
      var subvalue = '';
      var index;
      var length;
      var now;

      if (
        !self.options.gfm ||
        value.charAt(0) !== C_TILDE$1 ||
        value.charAt(1) !== C_TILDE$1 ||
        isWhitespaceCharacter(value.charAt(2))
      ) {
        return;
      }

      index = 1;
      length = value.length;
      now = eat.now();
      now.column += 2;
      now.offset += 2;

      while (++index < length) {
        character = value.charAt(index);

        if (
          character === C_TILDE$1 &&
          previous === C_TILDE$1 &&
          (!preceding || !isWhitespaceCharacter(preceding))
        ) {
          /* istanbul ignore if - never used (yet) */
          if (silent) {
            return true;
          }

          return eat(DOUBLE + subvalue + DOUBLE)({
            type: 'delete',
            children: self.tokenizeInline(subvalue, now)
          });
        }

        subvalue += previous;
        preceding = previous;
        previous = character;
      }
    }

    var codeInline = locate$7;

    function locate$7(value, fromIndex) {
      return value.indexOf('`', fromIndex);
    }

    var codeInline$1 = inlineCode;
    inlineCode.locator = codeInline;

    var C_TICK$3 = '`';

    /* Tokenise inline code. */
    function inlineCode(eat, value, silent) {
      var length = value.length;
      var index = 0;
      var queue = '';
      var tickQueue = '';
      var contentQueue;
      var subqueue;
      var count;
      var openingCount;
      var subvalue;
      var character;
      var found;
      var next;

      while (index < length) {
        if (value.charAt(index) !== C_TICK$3) {
          break;
        }

        queue += C_TICK$3;
        index++;
      }

      if (!queue) {
        return;
      }

      subvalue = queue;
      openingCount = index;
      queue = '';
      next = value.charAt(index);
      count = 0;

      while (index < length) {
        character = next;
        next = value.charAt(index + 1);

        if (character === C_TICK$3) {
          count++;
          tickQueue += character;
        } else {
          count = 0;
          queue += character;
        }

        if (count && next !== C_TICK$3) {
          if (count === openingCount) {
            subvalue += queue + tickQueue;
            found = true;
            break;
          }

          queue += tickQueue;
          tickQueue = '';
        }

        index++;
      }

      if (!found) {
        if (openingCount % 2 !== 0) {
          return;
        }

        queue = '';
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      contentQueue = '';
      subqueue = '';
      length = queue.length;
      index = -1;

      while (++index < length) {
        character = queue.charAt(index);

        if (isWhitespaceCharacter(character)) {
          subqueue += character;
          continue;
        }

        if (subqueue) {
          if (contentQueue) {
            contentQueue += subqueue;
          }

          subqueue = '';
        }

        contentQueue += character;
      }

      return eat(subvalue)({
        type: 'inlineCode',
        value: contentQueue
      });
    }

    var _break = locate$8;

    function locate$8(value, fromIndex) {
      var index = value.indexOf('\n', fromIndex);

      while (index > fromIndex) {
        if (value.charAt(index - 1) !== ' ') {
          break;
        }

        index--;
      }

      return index;
    }

    var _break$1 = hardBreak;
    hardBreak.locator = _break;

    var MIN_BREAK_LENGTH = 2;

    function hardBreak(eat, value, silent) {
      var length = value.length;
      var index = -1;
      var queue = '';
      var character;

      while (++index < length) {
        character = value.charAt(index);

        if (character === '\n') {
          if (index < MIN_BREAK_LENGTH) {
            return;
          }

          /* istanbul ignore if - never used (yet) */
          if (silent) {
            return true;
          }

          queue += character;

          return eat(queue)({type: 'break'});
        }

        if (character !== ' ') {
          return;
        }

        queue += character;
      }
    }

    var text_1 = text;

    function text(eat, value, silent) {
      var self = this;
      var methods;
      var tokenizers;
      var index;
      var length;
      var subvalue;
      var position;
      var tokenizer;
      var name;
      var min;
      var now;

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }

      methods = self.inlineMethods;
      length = methods.length;
      tokenizers = self.inlineTokenizers;
      index = -1;
      min = value.length;

      while (++index < length) {
        name = methods[index];

        if (name === 'text' || !tokenizers[name]) {
          continue;
        }

        tokenizer = tokenizers[name].locator;

        if (!tokenizer) {
          eat.file.fail('Missing locator: `' + name + '`');
        }

        position = tokenizer.call(self, value, 1);

        if (position !== -1 && position < min) {
          min = position;
        }
      }

      subvalue = value.slice(0, min);
      now = eat.now();

      self.decode(subvalue, now, function (content, position, source) {
        eat(source || content)({
          type: 'text',
          value: content
        });
      });
    }

    var parser = Parser;

    function Parser(doc, file) {
      this.file = file;
      this.offset = {};
      this.options = immutable(this.options);
      this.setOptions({});

      this.inList = false;
      this.inBlock = false;
      this.inLink = false;
      this.atStart = true;

      this.toOffset = vfileLocation(file).toOffset;
      this.unescape = _unescape(this, 'escape');
      this.decode = decode(this);
    }

    var proto$3 = Parser.prototype;

    /* Expose core. */
    proto$3.setOptions = setOptions_1;
    proto$3.parse = parse_1;

    /* Expose `defaults`. */
    proto$3.options = defaults$2;

    /* Enter and exit helpers. */
    proto$3.exitStart = stateToggle('atStart', true);
    proto$3.enterList = stateToggle('inList', false);
    proto$3.enterLink = stateToggle('inLink', false);
    proto$3.enterBlock = stateToggle('inBlock', false);

    /* Nodes that can interupt a paragraph:
     *
     * ```markdown
     * A paragraph, followed by a thematic break.
     * ___
     * ```
     *
     * In the above example, the thematic break “interupts”
     * the paragraph. */
    proto$3.interruptParagraph = [
      ['thematicBreak'],
      ['atxHeading'],
      ['fencedCode'],
      ['blockquote'],
      ['html'],
      ['setextHeading', {commonmark: false}],
      ['definition', {commonmark: false}],
      ['footnote', {commonmark: false}]
    ];

    /* Nodes that can interupt a list:
     *
     * ```markdown
     * - One
     * ___
     * ```
     *
     * In the above example, the thematic break “interupts”
     * the list. */
    proto$3.interruptList = [
      ['atxHeading', {pedantic: false}],
      ['fencedCode', {pedantic: false}],
      ['thematicBreak', {pedantic: false}],
      ['definition', {commonmark: false}],
      ['footnote', {commonmark: false}]
    ];

    /* Nodes that can interupt a blockquote:
     *
     * ```markdown
     * > A paragraph.
     * ___
     * ```
     *
     * In the above example, the thematic break “interupts”
     * the blockquote. */
    proto$3.interruptBlockquote = [
      ['indentedCode', {commonmark: true}],
      ['fencedCode', {commonmark: true}],
      ['atxHeading', {commonmark: true}],
      ['setextHeading', {commonmark: true}],
      ['thematicBreak', {commonmark: true}],
      ['html', {commonmark: true}],
      ['list', {commonmark: true}],
      ['definition', {commonmark: false}],
      ['footnote', {commonmark: false}]
    ];

    /* Handlers. */
    proto$3.blockTokenizers = {
      newline: newline_1,
      indentedCode: codeIndented,
      fencedCode: codeFenced,
      blockquote: blockquote_1,
      atxHeading: headingAtx,
      thematicBreak: thematicBreak_1,
      list: list_1,
      setextHeading: headingSetext,
      html: htmlBlock,
      footnote: footnoteDefinition_1,
      definition: definition_1,
      table: table_1,
      paragraph: paragraph_1
    };

    proto$3.inlineTokenizers = {
      escape: _escape$1,
      autoLink: autoLink_1,
      url: url_1,
      html: htmlInline,
      link: link_1,
      reference: reference_1,
      strong: strong_1,
      emphasis: emphasis_1,
      deletion: _delete$1,
      code: codeInline$1,
      break: _break$1,
      text: text_1
    };

    /* Expose precedence. */
    proto$3.blockMethods = keys$1(proto$3.blockTokenizers);
    proto$3.inlineMethods = keys$1(proto$3.inlineTokenizers);

    /* Tokenizers. */
    proto$3.tokenizeBlock = tokenizer('block');
    proto$3.tokenizeInline = tokenizer('inline');
    proto$3.tokenizeFactory = tokenizer;

    /* Get all keys in `value`. */
    function keys$1(value) {
      var result = [];
      var key;

      for (key in value) {
        result.push(key);
      }

      return result;
    }

    var remarkParse = parse$2;
    parse$2.Parser = parser;

    function parse$2(options) {
      var Local = unherit_1(parser);
      Local.prototype.options = immutable(Local.prototype.options, this.data('settings'), options);
      this.Parser = Local;
    }

    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
    Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
    function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
    var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
    var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
    var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

    var reactIs_production_min = {
    	AsyncMode: AsyncMode,
    	ConcurrentMode: ConcurrentMode,
    	ContextConsumer: ContextConsumer,
    	ContextProvider: ContextProvider,
    	Element: Element,
    	ForwardRef: ForwardRef,
    	Fragment: Fragment,
    	Lazy: Lazy,
    	Memo: Memo,
    	Portal: Portal,
    	Profiler: Profiler,
    	StrictMode: StrictMode,
    	Suspense: Suspense,
    	isAsyncMode: isAsyncMode,
    	isConcurrentMode: isConcurrentMode,
    	isContextConsumer: isContextConsumer,
    	isContextProvider: isContextProvider,
    	isElement: isElement,
    	isForwardRef: isForwardRef,
    	isFragment: isFragment,
    	isLazy: isLazy,
    	isMemo: isMemo,
    	isPortal: isPortal,
    	isProfiler: isProfiler,
    	isStrictMode: isStrictMode,
    	isSuspense: isSuspense,
    	isValidElementType: isValidElementType,
    	typeOf: typeOf
    };

    var reactIs_development = createCommonjsModule(function (module, exports) {



    if (process.env.NODE_ENV !== "production") {
      (function() {

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode

    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }

      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
    exports.isValidElementType = isValidElementType;
    exports.typeOf = typeOf;
      })();
    }
    });
    var reactIs_development_1 = reactIs_development.AsyncMode;
    var reactIs_development_2 = reactIs_development.ConcurrentMode;
    var reactIs_development_3 = reactIs_development.ContextConsumer;
    var reactIs_development_4 = reactIs_development.ContextProvider;
    var reactIs_development_5 = reactIs_development.Element;
    var reactIs_development_6 = reactIs_development.ForwardRef;
    var reactIs_development_7 = reactIs_development.Fragment;
    var reactIs_development_8 = reactIs_development.Lazy;
    var reactIs_development_9 = reactIs_development.Memo;
    var reactIs_development_10 = reactIs_development.Portal;
    var reactIs_development_11 = reactIs_development.Profiler;
    var reactIs_development_12 = reactIs_development.StrictMode;
    var reactIs_development_13 = reactIs_development.Suspense;
    var reactIs_development_14 = reactIs_development.isAsyncMode;
    var reactIs_development_15 = reactIs_development.isConcurrentMode;
    var reactIs_development_16 = reactIs_development.isContextConsumer;
    var reactIs_development_17 = reactIs_development.isContextProvider;
    var reactIs_development_18 = reactIs_development.isElement;
    var reactIs_development_19 = reactIs_development.isForwardRef;
    var reactIs_development_20 = reactIs_development.isFragment;
    var reactIs_development_21 = reactIs_development.isLazy;
    var reactIs_development_22 = reactIs_development.isMemo;
    var reactIs_development_23 = reactIs_development.isPortal;
    var reactIs_development_24 = reactIs_development.isProfiler;
    var reactIs_development_25 = reactIs_development.isStrictMode;
    var reactIs_development_26 = reactIs_development.isSuspense;
    var reactIs_development_27 = reactIs_development.isValidElementType;
    var reactIs_development_28 = reactIs_development.typeOf;

    var reactIs = createCommonjsModule(function (module) {

    if (process.env.NODE_ENV === 'production') {
      module.exports = reactIs_production_min;
    } else {
      module.exports = reactIs_development;
    }
    });

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}

    	return Object(val);
    }

    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}

    		// Detect buggy property enumeration order in older V8 versions.

    		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
    		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}

    		return true;
    	} catch (err) {
    		// We don't expect any of the above to throw, but better to be safe.
    		return false;
    	}
    }

    var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    	var from;
    	var to = toObject(target);
    	var symbols;

    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments[s]);

    		for (var key in from) {
    			if (hasOwnProperty$1.call(from, key)) {
    				to[key] = from[key];
    			}
    		}

    		if (getOwnPropertySymbols) {
    			symbols = getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}

    	return to;
    };

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

    var ReactPropTypesSecret_1 = ReactPropTypesSecret;

    var printWarning = function() {};

    if (process.env.NODE_ENV !== 'production') {
      var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
      var loggedTypeFailures = {};
      var has = Function.call.bind(Object.prototype.hasOwnProperty);

      printWarning = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };
    }

    /**
     * Assert that the values match with the type specs.
     * Error messages are memorized and will only be shown once.
     *
     * @param {object} typeSpecs Map of name to a ReactPropType
     * @param {object} values Runtime values that need to be type-checked
     * @param {string} location e.g. "prop", "context", "child context"
     * @param {string} componentName Name of the component for error messages.
     * @param {?Function} getStack Returns the component stack.
     * @private
     */
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (process.env.NODE_ENV !== 'production') {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.
            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error(
                  (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
                );
                err.name = 'Invariant Violation';
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || 'React class') + ': type specification of ' +
                location + ' `' + typeSpecName + '` is invalid; the type checker ' +
                'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error.message] = true;

              var stack = getStack ? getStack() : '';

              printWarning(
                'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
              );
            }
          }
        }
      }
    }

    /**
     * Resets warning cache when testing.
     *
     * @private
     */
    checkPropTypes.resetWarningCache = function() {
      if (process.env.NODE_ENV !== 'production') {
        loggedTypeFailures = {};
      }
    };

    var checkPropTypes_1 = checkPropTypes;

    var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
    var printWarning$1 = function() {};

    if (process.env.NODE_ENV !== 'production') {
      printWarning$1 = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };
    }

    function emptyFunctionThatReturnsNull() {
      return null;
    }

    var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
      /* global Symbol */
      var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

      /**
       * Returns the iterator method function contained on the iterable object.
       *
       * Be sure to invoke the function with the iterable as context:
       *
       *     var iteratorFn = getIteratorFn(myIterable);
       *     if (iteratorFn) {
       *       var iterator = iteratorFn.call(myIterable);
       *       ...
       *     }
       *
       * @param {?object} maybeIterable
       * @return {?function}
       */
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
          return iteratorFn;
        }
      }

      /**
       * Collection of methods that allow declaration and validation of props that are
       * supplied to React components. Example usage:
       *
       *   var Props = require('ReactPropTypes');
       *   var MyArticle = React.createClass({
       *     propTypes: {
       *       // An optional string prop named "description".
       *       description: Props.string,
       *
       *       // A required enum prop named "category".
       *       category: Props.oneOf(['News','Photos']).isRequired,
       *
       *       // A prop named "dialog" that requires an instance of Dialog.
       *       dialog: Props.instanceOf(Dialog).isRequired
       *     },
       *     render: function() { ... }
       *   });
       *
       * A more formal specification of how these methods are used:
       *
       *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
       *   decl := ReactPropTypes.{type}(.isRequired)?
       *
       * Each and every declaration produces a function with the same signature. This
       * allows the creation of custom validation functions. For example:
       *
       *  var MyLink = React.createClass({
       *    propTypes: {
       *      // An optional string or URI prop named "href".
       *      href: function(props, propName, componentName) {
       *        var propValue = props[propName];
       *        if (propValue != null && typeof propValue !== 'string' &&
       *            !(propValue instanceof URI)) {
       *          return new Error(
       *            'Expected a string or an URI for ' + propName + ' in ' +
       *            componentName
       *          );
       *        }
       *      }
       *    },
       *    render: function() {...}
       *  });
       *
       * @internal
       */

      var ANONYMOUS = '<<anonymous>>';

      // Important!
      // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),

        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker,
      };

      /**
       * inlined Object.is polyfill to avoid requiring consumers ship their own
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
       */
      /*eslint-disable no-self-compare*/
      function is(x, y) {
        // SameValue algorithm
        if (x === y) {
          // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          return x !== 0 || 1 / x === 1 / y;
        } else {
          // Step 6.a: NaN == NaN
          return x !== x && y !== y;
        }
      }
      /*eslint-enable no-self-compare*/

      /**
       * We use an Error-like object for backward compatibility as people may call
       * PropTypes directly and inspect their output. However, we don't use real
       * Errors anymore. We don't inspect their stack anyway, and creating them
       * is prohibitively expensive if they are created too often, such as what
       * happens in oneOfType() for any type before the one that matched.
       */
      function PropTypeError(message) {
        this.message = message;
        this.stack = '';
      }
      // Make `instanceof Error` still work for returned errors.
      PropTypeError.prototype = Error.prototype;

      function createChainableTypeChecker(validate) {
        if (process.env.NODE_ENV !== 'production') {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;

          if (secret !== ReactPropTypesSecret_1) {
            if (throwOnDirectAccess) {
              // New behavior only for users of `prop-types` package
              var err = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                'Use `PropTypes.checkPropTypes()` to call them. ' +
                'Read more at http://fb.me/use-check-prop-types'
              );
              err.name = 'Invariant Violation';
              throw err;
            } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
              // Old behavior for people using React.PropTypes
              var cacheKey = componentName + ':' + propName;
              if (
                !manualPropTypeCallCache[cacheKey] &&
                // Avoid spamming the console because they are often not actionable except for lib authors
                manualPropTypeWarningCount < 3
              ) {
                printWarning$1(
                  'You are manually calling a React.PropTypes validation ' +
                  'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                  'and will throw in the standalone `prop-types` package. ' +
                  'You may be seeing this warning due to a third-party PropTypes ' +
                  'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
              }
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }

        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);

        return chainedCheckType;
      }

      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            // `propValue` being instance of, say, date/regexp, pass the 'object'
            // check, but we can offer a more precise error message here rather than
            // 'of type `object`'.
            var preciseType = getPreciseType(propValue);

            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }

      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!reactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (process.env.NODE_ENV !== 'production') {
            if (arguments.length > 1) {
              printWarning$1(
                'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
                'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
              );
            } else {
              printWarning$1('Invalid argument supplied to oneOf, expected an array.');
            }
          }
          return emptyFunctionThatReturnsNull;
        }

        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }

          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === 'symbol') {
              return String(value);
            }
            return value;
          });
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
      }

      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
          }
          for (var key in propValue) {
            if (has$1(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
          return emptyFunctionThatReturnsNull;
        }

        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== 'function') {
            printWarning$1(
              'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
            );
            return emptyFunctionThatReturnsNull;
          }
        }

        function validate(props, propName, componentName, location, propFullName) {
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
              return null;
            }
          }

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
        }
        return createChainableTypeChecker(validate);
      }

      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (!checker) {
              continue;
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          // We need to check all keys in case some are required but missing from
          // props.
          var allKeys = objectAssign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (!checker) {
              return new PropTypeError(
                'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
                '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error) {
              return error;
            }
          }
          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function isNode(propValue) {
        switch (typeof propValue) {
          case 'number':
          case 'string':
          case 'undefined':
            return true;
          case 'boolean':
            return !propValue;
          case 'object':
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }

            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                // Iterator will provide entry [k,v] tuples rather than values.
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }

            return true;
          default:
            return false;
        }
      }

      function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
          return true;
        }

        // falsy value can't be a Symbol
        if (!propValue) {
          return false;
        }

        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue['@@toStringTag'] === 'Symbol') {
          return true;
        }

        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
          return true;
        }

        return false;
      }

      // Equivalent of `typeof` but with special handling for array and regexp.
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return 'array';
        }
        if (propValue instanceof RegExp) {
          // Old webkits (at least until Android 4.0) return 'function' rather than
          // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
          // passes PropTypes.object.
          return 'object';
        }
        if (isSymbol(propType, propValue)) {
          return 'symbol';
        }
        return propType;
      }

      // This handles more types than `getPropType`. Only used for error messages.
      // See `createPrimitiveTypeChecker`.
      function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
          return '' + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === 'object') {
          if (propValue instanceof Date) {
            return 'date';
          } else if (propValue instanceof RegExp) {
            return 'regexp';
          }
        }
        return propType;
      }

      // Returns a string that is postfixed to a warning about an invalid type.
      // For example, "undefined" or "of type array"
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case 'array':
          case 'object':
            return 'an ' + type;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + type;
          default:
            return type;
        }
      }

      // Returns class name of the object, if any.
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }

      ReactPropTypes.checkPropTypes = checkPropTypes_1;
      ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;

      return ReactPropTypes;
    };

    function emptyFunction() {}
    function emptyFunctionWithReset() {}
    emptyFunctionWithReset.resetWarningCache = emptyFunction;

    var factoryWithThrowingShims = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret_1) {
          // It is still safe when called from React.
          return;
        }
        var err = new Error(
          'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
          'Use PropTypes.checkPropTypes() to call them. ' +
          'Read more at http://fb.me/use-check-prop-types'
        );
        err.name = 'Invariant Violation';
        throw err;
      }  shim.isRequired = shim;
      function getShim() {
        return shim;
      }  // Important!
      // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
      var ReactPropTypes = {
        array: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,

        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,

        checkPropTypes: emptyFunctionWithReset,
        resetWarningCache: emptyFunction
      };

      ReactPropTypes.PropTypes = ReactPropTypes;

      return ReactPropTypes;
    };

    var propTypes = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    if (process.env.NODE_ENV !== 'production') {
      var ReactIs = reactIs;

      // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod
      var throwOnDirectAccess = true;
      module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
    } else {
      // By explicitly using `prop-types` you are opting into new production behavior.
      // http://fb.me/prop-types-in-prod
      module.exports = factoryWithThrowingShims();
    }
    });

    /* Expose. */
    var unistUtilVisitParents$1 = visitParents$1;

    /* Visit. */
    function visitParents$1(tree, type, visitor) {
      var stack = [];

      if (typeof type === 'function') {
        visitor = type;
        type = null;
      }

      one(tree);

      /* Visit a single node. */
      function one(node) {
        var result;

        if (!type || node.type === type) {
          result = visitor(node, stack.concat());
        }

        if (node.children && result !== false) {
          return all(node.children, node)
        }

        return result
      }

      /* Visit children in `parent`. */
      function all(children, parent) {
        var length = children.length;
        var index = -1;
        var child;

        stack.push(parent);

        while (++index < length) {
          child = children[index];

          if (child && one(child) === false) {
            return false
          }
        }

        stack.pop();

        return true
      }
    }

    function addListMetadata() {
      return function (ast) {
        unistUtilVisitParents$1(ast, 'list', function (listNode, parents) {
          var depth = 0, i, n;
          for (i = 0, n = parents.length; i < n; i++) {
            if (parents[i].type === 'list') depth += 1;
          }
          for (i = 0, n = listNode.children.length; i < n; i++) {
            var child = listNode.children[i];
            child.index = i;
            child.ordered = listNode.ordered;
          }
          listNode.depth = depth;
        });
        return ast;
      };
    }

    var mdastAddListMetadata = addListMetadata;

    /**
     * Naive, simple plugin to match inline nodes without attributes
     * This allows say <strong>foo</strong>, but not <strong class="very">foo</strong>
     * For proper HTML support, you'll want a different plugin
     **/


    var type = 'virtualHtml';
    var selfClosingRe = /^<(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\s*\/?>$/i;
    var simpleTagRe = /^<(\/?)([a-z]+)\s*>$/;

    var naiveHtml = function (tree) {
      var open;
      var currentParent;
      unistUtilVisit(tree, 'html', function (node, index, parent) {
        if (currentParent !== parent) {
          open = [];
          currentParent = parent;
        }

        var selfClosing = getSelfClosing(node);

        if (selfClosing) {
          parent.children.splice(index, 1, {
            type: type,
            tag: selfClosing,
            position: node.position
          });
          return true;
        }

        var current = getSimpleTag(node);

        if (!current) {
          return true;
        }

        var matching = findAndPull(open, current.tag);

        if (matching) {
          parent.children.splice(index, 0, virtual(current, matching, parent));
        } else if (!current.opening) {
          open.push(current);
        }

        return true;
      }, true // Iterate in reverse
      );
      return tree;
    };

    function findAndPull(open, matchingTag) {
      var i = open.length;

      while (i--) {
        if (open[i].tag === matchingTag) {
          return open.splice(i, 1)[0];
        }
      }

      return false;
    }

    function getSimpleTag(node, parent) {
      var match = node.value.match(simpleTagRe);
      return match ? {
        tag: match[2],
        opening: !match[1],
        node: node
      } : false;
    }

    function getSelfClosing(node) {
      var match = node.value.match(selfClosingRe);
      return match ? match[1] : false;
    }

    function virtual(fromNode, toNode, parent) {
      var fromIndex = parent.children.indexOf(fromNode.node);
      var toIndex = parent.children.indexOf(toNode.node);
      var extracted = parent.children.splice(fromIndex, toIndex - fromIndex + 1);
      var children = extracted.slice(1, -1);
      return {
        type: type,
        children: children,
        tag: fromNode.tag,
        position: {
          start: fromNode.node.position.start,
          end: toNode.node.position.end,
          indent: []
        }
      };
    }

    var ofType = function (types, mode) {
      return function (node) {
        types.forEach(function (type) {
          return unistUtilVisit(node, type, disallow, true);
        });
        return node;
      };

      function disallow(node, index, parent) {
        if (parent) {
          untangle(node, index, parent, mode);
        }
      }
    };

    var ifNotMatch = function (allowNode, mode) {
      return function (node) {
        unistUtilVisit(node, disallow, true);
        return node;
      };

      function disallow(node, index, parent) {
        if (parent && !allowNode(node, index, parent)) {
          untangle(node, index, parent, mode);
        }
      }
    };

    function untangle(node, index, parent, mode) {
      if (mode === 'remove') {
        parent.children.splice(index, 1);
      } else if (mode === 'unwrap') {
        var args = [index, 1];

        if (node.children) {
          args = args.concat(node.children);
        }

        Array.prototype.splice.apply(parent.children, args);
      }
    }

    var disallowNode = {
    	ofType: ofType,
    	ifNotMatch: ifNotMatch
    };

    var defaultNodePosition = {
      start: {
        line: 1,
        column: 1,
        offset: 0
      },
      end: {
        line: 1,
        column: 1,
        offset: 0
      }
    };

    function astToReact(node, options) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var renderer = options.renderers[node.type]; // nodes generated by plugins may not have position data
      // much of the code after this point will attempt to access properties of the node.position
      // this will set the node position to the parent node's position to prevent errors

      if (node.position === undefined) {
        node.position = parent.node && parent.node.position || defaultNodePosition;
      }

      var pos = node.position.start;
      var key = [node.type, pos.line, pos.column, index].join('-');

      if (!reactIs.isValidElementType(renderer)) {
        throw new Error("Renderer for type `".concat(node.type, "` not defined or is not renderable"));
      }

      var nodeProps = getNodeProps(node, key, options, renderer, parent, index);
      return React__default.createElement(renderer, nodeProps, nodeProps.children || resolveChildren() || undefined);

      function resolveChildren() {
        return node.children && node.children.map(function (childNode, i) {
          return astToReact(childNode, options, {
            node: node,
            props: nodeProps
          }, i);
        });
      }
    } // eslint-disable-next-line max-params, complexity


    function getNodeProps(node, key, opts, renderer, parent, index) {
      var props = {
        key: key
      };
      var isTagRenderer = typeof renderer === 'string'; // `sourcePos` is true if the user wants source information (line/column info from markdown source)

      if (opts.sourcePos && node.position) {
        props['data-sourcepos'] = flattenPosition(node.position);
      }

      if (opts.rawSourcePos && !isTagRenderer) {
        props.sourcePosition = node.position;
      } // If `includeNodeIndex` is true, pass node index info to all non-tag renderers


      if (opts.includeNodeIndex && parent.node && parent.node.children && !isTagRenderer) {
        props.index = parent.node.children.indexOf(node);
        props.parentChildCount = parent.node.children.length;
      }

      var ref = node.identifier !== null && node.identifier !== undefined ? opts.definitions[node.identifier] || {} : null;

      switch (node.type) {
        case 'root':
          assignDefined(props, {
            className: opts.className
          });
          break;

        case 'text':
          props.nodeKey = key;
          props.children = node.value;
          break;

        case 'heading':
          props.level = node.depth;
          break;

        case 'list':
          props.start = node.start;
          props.ordered = node.ordered;
          props.tight = !node.loose;
          props.depth = node.depth;
          break;

        case 'listItem':
          props.checked = node.checked;
          props.tight = !node.loose;
          props.ordered = node.ordered;
          props.index = node.index;
          props.children = getListItemChildren(node, parent).map(function (childNode, i) {
            return astToReact(childNode, opts, {
              node: node,
              props: props
            }, i);
          });
          break;

        case 'definition':
          assignDefined(props, {
            identifier: node.identifier,
            title: node.title,
            url: node.url
          });
          break;

        case 'code':
          assignDefined(props, {
            language: node.lang && node.lang.split(/\s/, 1)[0]
          });
          break;

        case 'inlineCode':
          props.children = node.value;
          props.inline = true;
          break;

        case 'link':
          assignDefined(props, {
            title: node.title || undefined,
            target: typeof opts.linkTarget === 'function' ? opts.linkTarget(node.url, node.children, node.title) : opts.linkTarget,
            href: opts.transformLinkUri ? opts.transformLinkUri(node.url, node.children, node.title) : node.url
          });
          break;

        case 'image':
          assignDefined(props, {
            alt: node.alt || undefined,
            title: node.title || undefined,
            src: opts.transformImageUri ? opts.transformImageUri(node.url, node.children, node.title, node.alt) : node.url
          });
          break;

        case 'linkReference':
          assignDefined(props, immutable(ref, {
            href: opts.transformLinkUri ? opts.transformLinkUri(ref.href) : ref.href
          }));
          break;

        case 'imageReference':
          assignDefined(props, {
            src: opts.transformImageUri && ref.href ? opts.transformImageUri(ref.href, node.children, ref.title, node.alt) : ref.href,
            title: ref.title || undefined,
            alt: node.alt || undefined
          });
          break;

        case 'table':
        case 'tableHead':
        case 'tableBody':
          props.columnAlignment = node.align;
          break;

        case 'tableRow':
          props.isHeader = parent.node.type === 'tableHead';
          props.columnAlignment = parent.props.columnAlignment;
          break;

        case 'tableCell':
          assignDefined(props, {
            isHeader: parent.props.isHeader,
            align: parent.props.columnAlignment[index]
          });
          break;

        case 'virtualHtml':
          props.tag = node.tag;
          break;

        case 'html':
          // @todo find a better way than this
          props.isBlock = node.position.start.line !== node.position.end.line;
          props.escapeHtml = opts.escapeHtml;
          props.skipHtml = opts.skipHtml;
          break;

        case 'parsedHtml':
          {
            var parsedChildren;

            if (node.children) {
              parsedChildren = node.children.map(function (child, i) {
                return astToReact(child, opts, {
                  node: node,
                  props: props
                }, i);
              });
            }

            props.escapeHtml = opts.escapeHtml;
            props.skipHtml = opts.skipHtml;
            props.element = mergeNodeChildren(node, parsedChildren);
            break;
          }

        default:
          assignDefined(props, immutable(node, {
            type: undefined,
            position: undefined,
            children: undefined
          }));
      }

      if (!isTagRenderer && node.value) {
        props.value = node.value;
      }

      return props;
    }

    function assignDefined(target, attrs) {
      for (var key in attrs) {
        if (typeof attrs[key] !== 'undefined') {
          target[key] = attrs[key];
        }
      }
    }

    function mergeNodeChildren(node, parsedChildren) {
      var el = node.element;

      if (Array.isArray(el)) {
        var Fragment = React__default.Fragment || 'div';
        return React__default.createElement(Fragment, null, el);
      }

      if (el.props.children || parsedChildren) {
        var children = React__default.Children.toArray(el.props.children).concat(parsedChildren);
        return React__default.cloneElement(el, null, children);
      }

      return React__default.cloneElement(el, null);
    }

    function flattenPosition(pos) {
      return [pos.start.line, ':', pos.start.column, '-', pos.end.line, ':', pos.end.column].map(String).join('');
    }

    function getListItemChildren(node, parent) {
      if (node.loose) {
        return node.children;
      }

      if (parent.node && node.index > 0 && parent.node.children[node.index - 1].loose) {
        return node.children;
      }

      return unwrapParagraphs(node);
    }

    function unwrapParagraphs(node) {
      return node.children.reduce(function (array, child) {
        return array.concat(child.type === 'paragraph' ? child.children || [] : [child]);
      }, []);
    }

    var astToReact_1 = astToReact;

    var wrapTableRows = function (node) {
      unistUtilVisit(node, 'table', wrap$1);
      return node;
    };

    function wrap$1(table) {
      var children = table.children;
      table.children = [{
        type: 'tableHead',
        align: table.align,
        children: [children[0]],
        position: children[0].position
      }];

      if (children.length > 1) {
        table.children.push({
          type: 'tableBody',
          align: table.align,
          children: children.slice(1),
          position: {
            start: children[1].position.start,
            end: children[children.length - 1].position.end
          }
        });
      }
    }

    var getDefinitions = function getDefinitions(node) {
      var defs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (node.children || []).reduce(function (definitions, child) {
        if (child.type === 'definition') {
          definitions[child.identifier] = {
            href: child.url,
            title: child.title
          };
        }

        return getDefinitions(child, definitions);
      }, defs);
    };

    var protocols = ['http', 'https', 'mailto', 'tel'];

    var uriTransformer = function uriTransformer(uri) {
      var url = (uri || '').trim();
      var first = url.charAt(0);

      if (first === '#' || first === '/') {
        return url;
      }

      var colon = url.indexOf(':');

      if (colon === -1) {
        return url;
      }

      var length = protocols.length;
      var index = -1;

      while (++index < length) {
        var protocol = protocols[index];

        if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
          return url;
        }
      }

      index = url.indexOf('?');

      if (index !== -1 && colon > index) {
        return url;
      }

      index = url.indexOf('#');

      if (index !== -1 && colon > index) {
        return url;
      } // eslint-disable-next-line no-script-url


      return 'javascript:void(0)';
    };

    var supportsStringRender = parseInt((React__default.version || '16').slice(0, 2), 10) >= 16;
    var createElement = React__default.createElement;
    var renderers = {
      break: 'br',
      paragraph: 'p',
      emphasis: 'em',
      strong: 'strong',
      thematicBreak: 'hr',
      blockquote: 'blockquote',
      delete: 'del',
      link: 'a',
      image: 'img',
      linkReference: 'a',
      imageReference: 'img',
      table: SimpleRenderer.bind(null, 'table'),
      tableHead: SimpleRenderer.bind(null, 'thead'),
      tableBody: SimpleRenderer.bind(null, 'tbody'),
      tableRow: SimpleRenderer.bind(null, 'tr'),
      tableCell: TableCell,
      root: Root,
      text: TextRenderer,
      list: List,
      listItem: ListItem,
      definition: NullRenderer,
      heading: Heading,
      inlineCode: InlineCode,
      code: CodeBlock,
      html: Html,
      virtualHtml: VirtualHtml,
      parsedHtml: ParsedHtml
    };

    function TextRenderer(props) {
      return supportsStringRender ? props.children : createElement('span', null, props.children);
    }

    function Root(props) {
      var useFragment = !props.className;
      var root = useFragment ? React__default.Fragment || 'div' : 'div';
      return createElement(root, useFragment ? null : props, props.children);
    }

    function SimpleRenderer(tag, props) {
      return createElement(tag, getCoreProps(props), props.children);
    }

    function TableCell(props) {
      var style = props.align ? {
        textAlign: props.align
      } : undefined;
      var coreProps = getCoreProps(props);
      return createElement(props.isHeader ? 'th' : 'td', style ? immutable({
        style: style
      }, coreProps) : coreProps, props.children);
    }

    function Heading(props) {
      return createElement("h".concat(props.level), getCoreProps(props), props.children);
    }

    function List(props) {
      var attrs = getCoreProps(props);

      if (props.start !== null && props.start !== 1 && props.start !== undefined) {
        attrs.start = props.start.toString();
      }

      return createElement(props.ordered ? 'ol' : 'ul', attrs, props.children);
    }

    function ListItem(props) {
      var checkbox = null;

      if (props.checked !== null && props.checked !== undefined) {
        var checked = props.checked;
        checkbox = createElement('input', {
          type: 'checkbox',
          checked: checked,
          readOnly: true
        });
      }

      return createElement('li', getCoreProps(props), checkbox, props.children);
    }

    function CodeBlock(props) {
      var className = props.language && "language-".concat(props.language);
      var code = createElement('code', className ? {
        className: className
      } : null, props.value);
      return createElement('pre', getCoreProps(props), code);
    }

    function InlineCode(props) {
      return createElement('code', getCoreProps(props), props.children);
    }

    function Html(props) {
      if (props.skipHtml) {
        return null;
      }

      var tag = props.isBlock ? 'div' : 'span';

      if (props.escapeHtml) {
        var comp = React__default.Fragment || tag;
        return createElement(comp, null, props.value);
      }

      var nodeProps = {
        dangerouslySetInnerHTML: {
          __html: props.value
        }
      };
      return createElement(tag, nodeProps);
    }

    function ParsedHtml(props) {
      return props['data-sourcepos'] ? React__default.cloneElement(props.element, {
        'data-sourcepos': props['data-sourcepos']
      }) : props.element;
    }

    function VirtualHtml(props) {
      return createElement(props.tag, getCoreProps(props), props.children);
    }

    function NullRenderer() {
      return null;
    }

    function getCoreProps(props) {
      return props['data-sourcepos'] ? {
        'data-sourcepos': props['data-sourcepos']
      } : {};
    }

    var HtmlParser = '__RMD_HTML_PARSER__';
    var HtmlParser_1 = typeof Symbol === 'undefined' ? HtmlParser : Symbol(HtmlParser);

    var symbols = {
    	HtmlParser: HtmlParser_1
    };

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



























    var allTypes = Object.keys(renderers);

    var ReactMarkdown = function ReactMarkdown(props) {
      var src = props.source || props.children || '';
      var parserOptions = props.parserOptions;

      if (props.allowedTypes && props.disallowedTypes) {
        throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined');
      }

      var renderers$1 = immutable(renderers, props.renderers);
      var plugins = [[remarkParse, parserOptions]].concat(props.plugins || []);
      var parser = plugins.reduce(applyParserPlugin, unified_1());
      var rawAst = parser.parse(src);
      var renderProps = immutable(props, {
        renderers: renderers$1,
        definitions: getDefinitions(rawAst)
      });
      var astPlugins = determineAstPlugins(props); // eslint-disable-next-line no-sync

      var transformedAst = parser.runSync(rawAst);
      var ast = astPlugins.reduce(function (node, plugin) {
        return plugin(node, renderProps);
      }, transformedAst);
      return astToReact_1(ast, renderProps);
    };

    function applyParserPlugin(parser, plugin) {
      return Array.isArray(plugin) ? parser.use.apply(parser, _toConsumableArray(plugin)) : parser.use(plugin);
    }

    function determineAstPlugins(props) {
      var plugins = [wrapTableRows, mdastAddListMetadata()];
      var disallowedTypes = props.disallowedTypes;

      if (props.allowedTypes) {
        disallowedTypes = allTypes.filter(function (type) {
          return type !== 'root' && props.allowedTypes.indexOf(type) === -1;
        });
      }

      var removalMethod = props.unwrapDisallowed ? 'unwrap' : 'remove';

      if (disallowedTypes && disallowedTypes.length > 0) {
        plugins.push(disallowNode.ofType(disallowedTypes, removalMethod));
      }

      if (props.allowNode) {
        plugins.push(disallowNode.ifNotMatch(props.allowNode, removalMethod));
      }

      var renderHtml = !props.escapeHtml && !props.skipHtml;
      var hasHtmlParser = (props.astPlugins || []).some(function (item) {
        var plugin = Array.isArray(item) ? item[0] : item;
        return plugin.identity === symbols.HtmlParser;
      });

      if (renderHtml && !hasHtmlParser) {
        plugins.push(naiveHtml);
      }

      return props.astPlugins ? plugins.concat(props.astPlugins) : plugins;
    }

    ReactMarkdown.defaultProps = {
      renderers: {},
      escapeHtml: true,
      skipHtml: false,
      sourcePos: false,
      rawSourcePos: false,
      transformLinkUri: uriTransformer,
      astPlugins: [],
      plugins: [],
      parserOptions: {}
    };
    ReactMarkdown.propTypes = {
      className: propTypes.string,
      source: propTypes.string,
      children: propTypes.string,
      sourcePos: propTypes.bool,
      rawSourcePos: propTypes.bool,
      escapeHtml: propTypes.bool,
      skipHtml: propTypes.bool,
      allowNode: propTypes.func,
      allowedTypes: propTypes.arrayOf(propTypes.oneOf(allTypes)),
      disallowedTypes: propTypes.arrayOf(propTypes.oneOf(allTypes)),
      transformLinkUri: propTypes.oneOfType([propTypes.func, propTypes.bool]),
      linkTarget: propTypes.oneOfType([propTypes.func, propTypes.string]),
      transformImageUri: propTypes.func,
      astPlugins: propTypes.arrayOf(propTypes.func),
      unwrapDisallowed: propTypes.bool,
      renderers: propTypes.object,
      plugins: propTypes.array,
      parserOptions: propTypes.object
    };
    ReactMarkdown.types = allTypes;
    ReactMarkdown.renderers = renderers;
    ReactMarkdown.uriTransformer = uriTransformer;
    var reactMarkdown = ReactMarkdown;

    /**
     * cssfilter
     *
     * @author 老雷<leizongmin@gmail.com>
     */

    function getDefaultWhiteList () {
      // 白名单值说明：
      // true: 允许该属性
      // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
      // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
      // 除上面列出的值外均表示不允许
      var whiteList = {};

      whiteList['align-content'] = false; // default: auto
      whiteList['align-items'] = false; // default: auto
      whiteList['align-self'] = false; // default: auto
      whiteList['alignment-adjust'] = false; // default: auto
      whiteList['alignment-baseline'] = false; // default: baseline
      whiteList['all'] = false; // default: depending on individual properties
      whiteList['anchor-point'] = false; // default: none
      whiteList['animation'] = false; // default: depending on individual properties
      whiteList['animation-delay'] = false; // default: 0
      whiteList['animation-direction'] = false; // default: normal
      whiteList['animation-duration'] = false; // default: 0
      whiteList['animation-fill-mode'] = false; // default: none
      whiteList['animation-iteration-count'] = false; // default: 1
      whiteList['animation-name'] = false; // default: none
      whiteList['animation-play-state'] = false; // default: running
      whiteList['animation-timing-function'] = false; // default: ease
      whiteList['azimuth'] = false; // default: center
      whiteList['backface-visibility'] = false; // default: visible
      whiteList['background'] = true; // default: depending on individual properties
      whiteList['background-attachment'] = true; // default: scroll
      whiteList['background-clip'] = true; // default: border-box
      whiteList['background-color'] = true; // default: transparent
      whiteList['background-image'] = true; // default: none
      whiteList['background-origin'] = true; // default: padding-box
      whiteList['background-position'] = true; // default: 0% 0%
      whiteList['background-repeat'] = true; // default: repeat
      whiteList['background-size'] = true; // default: auto
      whiteList['baseline-shift'] = false; // default: baseline
      whiteList['binding'] = false; // default: none
      whiteList['bleed'] = false; // default: 6pt
      whiteList['bookmark-label'] = false; // default: content()
      whiteList['bookmark-level'] = false; // default: none
      whiteList['bookmark-state'] = false; // default: open
      whiteList['border'] = true; // default: depending on individual properties
      whiteList['border-bottom'] = true; // default: depending on individual properties
      whiteList['border-bottom-color'] = true; // default: current color
      whiteList['border-bottom-left-radius'] = true; // default: 0
      whiteList['border-bottom-right-radius'] = true; // default: 0
      whiteList['border-bottom-style'] = true; // default: none
      whiteList['border-bottom-width'] = true; // default: medium
      whiteList['border-collapse'] = true; // default: separate
      whiteList['border-color'] = true; // default: depending on individual properties
      whiteList['border-image'] = true; // default: none
      whiteList['border-image-outset'] = true; // default: 0
      whiteList['border-image-repeat'] = true; // default: stretch
      whiteList['border-image-slice'] = true; // default: 100%
      whiteList['border-image-source'] = true; // default: none
      whiteList['border-image-width'] = true; // default: 1
      whiteList['border-left'] = true; // default: depending on individual properties
      whiteList['border-left-color'] = true; // default: current color
      whiteList['border-left-style'] = true; // default: none
      whiteList['border-left-width'] = true; // default: medium
      whiteList['border-radius'] = true; // default: 0
      whiteList['border-right'] = true; // default: depending on individual properties
      whiteList['border-right-color'] = true; // default: current color
      whiteList['border-right-style'] = true; // default: none
      whiteList['border-right-width'] = true; // default: medium
      whiteList['border-spacing'] = true; // default: 0
      whiteList['border-style'] = true; // default: depending on individual properties
      whiteList['border-top'] = true; // default: depending on individual properties
      whiteList['border-top-color'] = true; // default: current color
      whiteList['border-top-left-radius'] = true; // default: 0
      whiteList['border-top-right-radius'] = true; // default: 0
      whiteList['border-top-style'] = true; // default: none
      whiteList['border-top-width'] = true; // default: medium
      whiteList['border-width'] = true; // default: depending on individual properties
      whiteList['bottom'] = false; // default: auto
      whiteList['box-decoration-break'] = true; // default: slice
      whiteList['box-shadow'] = true; // default: none
      whiteList['box-sizing'] = true; // default: content-box
      whiteList['box-snap'] = true; // default: none
      whiteList['box-suppress'] = true; // default: show
      whiteList['break-after'] = true; // default: auto
      whiteList['break-before'] = true; // default: auto
      whiteList['break-inside'] = true; // default: auto
      whiteList['caption-side'] = false; // default: top
      whiteList['chains'] = false; // default: none
      whiteList['clear'] = true; // default: none
      whiteList['clip'] = false; // default: auto
      whiteList['clip-path'] = false; // default: none
      whiteList['clip-rule'] = false; // default: nonzero
      whiteList['color'] = true; // default: implementation dependent
      whiteList['color-interpolation-filters'] = true; // default: auto
      whiteList['column-count'] = false; // default: auto
      whiteList['column-fill'] = false; // default: balance
      whiteList['column-gap'] = false; // default: normal
      whiteList['column-rule'] = false; // default: depending on individual properties
      whiteList['column-rule-color'] = false; // default: current color
      whiteList['column-rule-style'] = false; // default: medium
      whiteList['column-rule-width'] = false; // default: medium
      whiteList['column-span'] = false; // default: none
      whiteList['column-width'] = false; // default: auto
      whiteList['columns'] = false; // default: depending on individual properties
      whiteList['contain'] = false; // default: none
      whiteList['content'] = false; // default: normal
      whiteList['counter-increment'] = false; // default: none
      whiteList['counter-reset'] = false; // default: none
      whiteList['counter-set'] = false; // default: none
      whiteList['crop'] = false; // default: auto
      whiteList['cue'] = false; // default: depending on individual properties
      whiteList['cue-after'] = false; // default: none
      whiteList['cue-before'] = false; // default: none
      whiteList['cursor'] = false; // default: auto
      whiteList['direction'] = false; // default: ltr
      whiteList['display'] = true; // default: depending on individual properties
      whiteList['display-inside'] = true; // default: auto
      whiteList['display-list'] = true; // default: none
      whiteList['display-outside'] = true; // default: inline-level
      whiteList['dominant-baseline'] = false; // default: auto
      whiteList['elevation'] = false; // default: level
      whiteList['empty-cells'] = false; // default: show
      whiteList['filter'] = false; // default: none
      whiteList['flex'] = false; // default: depending on individual properties
      whiteList['flex-basis'] = false; // default: auto
      whiteList['flex-direction'] = false; // default: row
      whiteList['flex-flow'] = false; // default: depending on individual properties
      whiteList['flex-grow'] = false; // default: 0
      whiteList['flex-shrink'] = false; // default: 1
      whiteList['flex-wrap'] = false; // default: nowrap
      whiteList['float'] = false; // default: none
      whiteList['float-offset'] = false; // default: 0 0
      whiteList['flood-color'] = false; // default: black
      whiteList['flood-opacity'] = false; // default: 1
      whiteList['flow-from'] = false; // default: none
      whiteList['flow-into'] = false; // default: none
      whiteList['font'] = true; // default: depending on individual properties
      whiteList['font-family'] = true; // default: implementation dependent
      whiteList['font-feature-settings'] = true; // default: normal
      whiteList['font-kerning'] = true; // default: auto
      whiteList['font-language-override'] = true; // default: normal
      whiteList['font-size'] = true; // default: medium
      whiteList['font-size-adjust'] = true; // default: none
      whiteList['font-stretch'] = true; // default: normal
      whiteList['font-style'] = true; // default: normal
      whiteList['font-synthesis'] = true; // default: weight style
      whiteList['font-variant'] = true; // default: normal
      whiteList['font-variant-alternates'] = true; // default: normal
      whiteList['font-variant-caps'] = true; // default: normal
      whiteList['font-variant-east-asian'] = true; // default: normal
      whiteList['font-variant-ligatures'] = true; // default: normal
      whiteList['font-variant-numeric'] = true; // default: normal
      whiteList['font-variant-position'] = true; // default: normal
      whiteList['font-weight'] = true; // default: normal
      whiteList['grid'] = false; // default: depending on individual properties
      whiteList['grid-area'] = false; // default: depending on individual properties
      whiteList['grid-auto-columns'] = false; // default: auto
      whiteList['grid-auto-flow'] = false; // default: none
      whiteList['grid-auto-rows'] = false; // default: auto
      whiteList['grid-column'] = false; // default: depending on individual properties
      whiteList['grid-column-end'] = false; // default: auto
      whiteList['grid-column-start'] = false; // default: auto
      whiteList['grid-row'] = false; // default: depending on individual properties
      whiteList['grid-row-end'] = false; // default: auto
      whiteList['grid-row-start'] = false; // default: auto
      whiteList['grid-template'] = false; // default: depending on individual properties
      whiteList['grid-template-areas'] = false; // default: none
      whiteList['grid-template-columns'] = false; // default: none
      whiteList['grid-template-rows'] = false; // default: none
      whiteList['hanging-punctuation'] = false; // default: none
      whiteList['height'] = true; // default: auto
      whiteList['hyphens'] = false; // default: manual
      whiteList['icon'] = false; // default: auto
      whiteList['image-orientation'] = false; // default: auto
      whiteList['image-resolution'] = false; // default: normal
      whiteList['ime-mode'] = false; // default: auto
      whiteList['initial-letters'] = false; // default: normal
      whiteList['inline-box-align'] = false; // default: last
      whiteList['justify-content'] = false; // default: auto
      whiteList['justify-items'] = false; // default: auto
      whiteList['justify-self'] = false; // default: auto
      whiteList['left'] = false; // default: auto
      whiteList['letter-spacing'] = true; // default: normal
      whiteList['lighting-color'] = true; // default: white
      whiteList['line-box-contain'] = false; // default: block inline replaced
      whiteList['line-break'] = false; // default: auto
      whiteList['line-grid'] = false; // default: match-parent
      whiteList['line-height'] = false; // default: normal
      whiteList['line-snap'] = false; // default: none
      whiteList['line-stacking'] = false; // default: depending on individual properties
      whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
      whiteList['line-stacking-shift'] = false; // default: consider-shifts
      whiteList['line-stacking-strategy'] = false; // default: inline-line-height
      whiteList['list-style'] = true; // default: depending on individual properties
      whiteList['list-style-image'] = true; // default: none
      whiteList['list-style-position'] = true; // default: outside
      whiteList['list-style-type'] = true; // default: disc
      whiteList['margin'] = true; // default: depending on individual properties
      whiteList['margin-bottom'] = true; // default: 0
      whiteList['margin-left'] = true; // default: 0
      whiteList['margin-right'] = true; // default: 0
      whiteList['margin-top'] = true; // default: 0
      whiteList['marker-offset'] = false; // default: auto
      whiteList['marker-side'] = false; // default: list-item
      whiteList['marks'] = false; // default: none
      whiteList['mask'] = false; // default: border-box
      whiteList['mask-box'] = false; // default: see individual properties
      whiteList['mask-box-outset'] = false; // default: 0
      whiteList['mask-box-repeat'] = false; // default: stretch
      whiteList['mask-box-slice'] = false; // default: 0 fill
      whiteList['mask-box-source'] = false; // default: none
      whiteList['mask-box-width'] = false; // default: auto
      whiteList['mask-clip'] = false; // default: border-box
      whiteList['mask-image'] = false; // default: none
      whiteList['mask-origin'] = false; // default: border-box
      whiteList['mask-position'] = false; // default: center
      whiteList['mask-repeat'] = false; // default: no-repeat
      whiteList['mask-size'] = false; // default: border-box
      whiteList['mask-source-type'] = false; // default: auto
      whiteList['mask-type'] = false; // default: luminance
      whiteList['max-height'] = true; // default: none
      whiteList['max-lines'] = false; // default: none
      whiteList['max-width'] = true; // default: none
      whiteList['min-height'] = true; // default: 0
      whiteList['min-width'] = true; // default: 0
      whiteList['move-to'] = false; // default: normal
      whiteList['nav-down'] = false; // default: auto
      whiteList['nav-index'] = false; // default: auto
      whiteList['nav-left'] = false; // default: auto
      whiteList['nav-right'] = false; // default: auto
      whiteList['nav-up'] = false; // default: auto
      whiteList['object-fit'] = false; // default: fill
      whiteList['object-position'] = false; // default: 50% 50%
      whiteList['opacity'] = false; // default: 1
      whiteList['order'] = false; // default: 0
      whiteList['orphans'] = false; // default: 2
      whiteList['outline'] = false; // default: depending on individual properties
      whiteList['outline-color'] = false; // default: invert
      whiteList['outline-offset'] = false; // default: 0
      whiteList['outline-style'] = false; // default: none
      whiteList['outline-width'] = false; // default: medium
      whiteList['overflow'] = false; // default: depending on individual properties
      whiteList['overflow-wrap'] = false; // default: normal
      whiteList['overflow-x'] = false; // default: visible
      whiteList['overflow-y'] = false; // default: visible
      whiteList['padding'] = true; // default: depending on individual properties
      whiteList['padding-bottom'] = true; // default: 0
      whiteList['padding-left'] = true; // default: 0
      whiteList['padding-right'] = true; // default: 0
      whiteList['padding-top'] = true; // default: 0
      whiteList['page'] = false; // default: auto
      whiteList['page-break-after'] = false; // default: auto
      whiteList['page-break-before'] = false; // default: auto
      whiteList['page-break-inside'] = false; // default: auto
      whiteList['page-policy'] = false; // default: start
      whiteList['pause'] = false; // default: implementation dependent
      whiteList['pause-after'] = false; // default: implementation dependent
      whiteList['pause-before'] = false; // default: implementation dependent
      whiteList['perspective'] = false; // default: none
      whiteList['perspective-origin'] = false; // default: 50% 50%
      whiteList['pitch'] = false; // default: medium
      whiteList['pitch-range'] = false; // default: 50
      whiteList['play-during'] = false; // default: auto
      whiteList['position'] = false; // default: static
      whiteList['presentation-level'] = false; // default: 0
      whiteList['quotes'] = false; // default: text
      whiteList['region-fragment'] = false; // default: auto
      whiteList['resize'] = false; // default: none
      whiteList['rest'] = false; // default: depending on individual properties
      whiteList['rest-after'] = false; // default: none
      whiteList['rest-before'] = false; // default: none
      whiteList['richness'] = false; // default: 50
      whiteList['right'] = false; // default: auto
      whiteList['rotation'] = false; // default: 0
      whiteList['rotation-point'] = false; // default: 50% 50%
      whiteList['ruby-align'] = false; // default: auto
      whiteList['ruby-merge'] = false; // default: separate
      whiteList['ruby-position'] = false; // default: before
      whiteList['shape-image-threshold'] = false; // default: 0.0
      whiteList['shape-outside'] = false; // default: none
      whiteList['shape-margin'] = false; // default: 0
      whiteList['size'] = false; // default: auto
      whiteList['speak'] = false; // default: auto
      whiteList['speak-as'] = false; // default: normal
      whiteList['speak-header'] = false; // default: once
      whiteList['speak-numeral'] = false; // default: continuous
      whiteList['speak-punctuation'] = false; // default: none
      whiteList['speech-rate'] = false; // default: medium
      whiteList['stress'] = false; // default: 50
      whiteList['string-set'] = false; // default: none
      whiteList['tab-size'] = false; // default: 8
      whiteList['table-layout'] = false; // default: auto
      whiteList['text-align'] = true; // default: start
      whiteList['text-align-last'] = true; // default: auto
      whiteList['text-combine-upright'] = true; // default: none
      whiteList['text-decoration'] = true; // default: none
      whiteList['text-decoration-color'] = true; // default: currentColor
      whiteList['text-decoration-line'] = true; // default: none
      whiteList['text-decoration-skip'] = true; // default: objects
      whiteList['text-decoration-style'] = true; // default: solid
      whiteList['text-emphasis'] = true; // default: depending on individual properties
      whiteList['text-emphasis-color'] = true; // default: currentColor
      whiteList['text-emphasis-position'] = true; // default: over right
      whiteList['text-emphasis-style'] = true; // default: none
      whiteList['text-height'] = true; // default: auto
      whiteList['text-indent'] = true; // default: 0
      whiteList['text-justify'] = true; // default: auto
      whiteList['text-orientation'] = true; // default: mixed
      whiteList['text-overflow'] = true; // default: clip
      whiteList['text-shadow'] = true; // default: none
      whiteList['text-space-collapse'] = true; // default: collapse
      whiteList['text-transform'] = true; // default: none
      whiteList['text-underline-position'] = true; // default: auto
      whiteList['text-wrap'] = true; // default: normal
      whiteList['top'] = false; // default: auto
      whiteList['transform'] = false; // default: none
      whiteList['transform-origin'] = false; // default: 50% 50% 0
      whiteList['transform-style'] = false; // default: flat
      whiteList['transition'] = false; // default: depending on individual properties
      whiteList['transition-delay'] = false; // default: 0s
      whiteList['transition-duration'] = false; // default: 0s
      whiteList['transition-property'] = false; // default: all
      whiteList['transition-timing-function'] = false; // default: ease
      whiteList['unicode-bidi'] = false; // default: normal
      whiteList['vertical-align'] = false; // default: baseline
      whiteList['visibility'] = false; // default: visible
      whiteList['voice-balance'] = false; // default: center
      whiteList['voice-duration'] = false; // default: auto
      whiteList['voice-family'] = false; // default: implementation dependent
      whiteList['voice-pitch'] = false; // default: medium
      whiteList['voice-range'] = false; // default: medium
      whiteList['voice-rate'] = false; // default: normal
      whiteList['voice-stress'] = false; // default: normal
      whiteList['voice-volume'] = false; // default: medium
      whiteList['volume'] = false; // default: medium
      whiteList['white-space'] = false; // default: normal
      whiteList['widows'] = false; // default: 2
      whiteList['width'] = true; // default: auto
      whiteList['will-change'] = false; // default: auto
      whiteList['word-break'] = true; // default: normal
      whiteList['word-spacing'] = true; // default: normal
      whiteList['word-wrap'] = true; // default: normal
      whiteList['wrap-flow'] = false; // default: auto
      whiteList['wrap-through'] = false; // default: wrap
      whiteList['writing-mode'] = false; // default: horizontal-tb
      whiteList['z-index'] = false; // default: auto

      return whiteList;
    }


    /**
     * 匹配到白名单上的一个属性时
     *
     * @param {String} name
     * @param {String} value
     * @param {Object} options
     * @return {String}
     */
    function onAttr (name, value, options) {
      // do nothing
    }

    /**
     * 匹配到不在白名单上的一个属性时
     *
     * @param {String} name
     * @param {String} value
     * @param {Object} options
     * @return {String}
     */
    function onIgnoreAttr (name, value, options) {
      // do nothing
    }

    var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

    /**
     * 过滤属性值
     *
     * @param {String} name
     * @param {String} value
     * @return {String}
     */
    function safeAttrValue(name, value) {
      if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
      return value;
    }


    var whiteList = getDefaultWhiteList();
    var getDefaultWhiteList_1 = getDefaultWhiteList;
    var onAttr_1 = onAttr;
    var onIgnoreAttr_1 = onIgnoreAttr;
    var safeAttrValue_1 = safeAttrValue;

    var _default = {
    	whiteList: whiteList,
    	getDefaultWhiteList: getDefaultWhiteList_1,
    	onAttr: onAttr_1,
    	onIgnoreAttr: onIgnoreAttr_1,
    	safeAttrValue: safeAttrValue_1
    };

    var util = {
      indexOf: function (arr, item) {
        var i, j;
        if (Array.prototype.indexOf) {
          return arr.indexOf(item);
        }
        for (i = 0, j = arr.length; i < j; i++) {
          if (arr[i] === item) {
            return i;
          }
        }
        return -1;
      },
      forEach: function (arr, fn, scope) {
        var i, j;
        if (Array.prototype.forEach) {
          return arr.forEach(fn, scope);
        }
        for (i = 0, j = arr.length; i < j; i++) {
          fn.call(scope, arr[i], i, arr);
        }
      },
      trim: function (str) {
        if (String.prototype.trim) {
          return str.trim();
        }
        return str.replace(/(^\s*)|(\s*$)/g, '');
      },
      trimRight: function (str) {
        if (String.prototype.trimRight) {
          return str.trimRight();
        }
        return str.replace(/(\s*$)/g, '');
      }
    };

    /**
     * cssfilter
     *
     * @author 老雷<leizongmin@gmail.com>
     */




    /**
     * 解析style
     *
     * @param {String} css
     * @param {Function} onAttr 处理属性的函数
     *   参数格式： function (sourcePosition, position, name, value, source)
     * @return {String}
     */
    function parseStyle (css, onAttr) {
      css = util.trimRight(css);
      if (css[css.length - 1] !== ';') css += ';';
      var cssLength = css.length;
      var isParenthesisOpen = false;
      var lastPos = 0;
      var i = 0;
      var retCSS = '';

      function addNewAttr () {
        // 如果没有正常的闭合圆括号，则直接忽略当前属性
        if (!isParenthesisOpen) {
          var source = util.trim(css.slice(lastPos, i));
          var j = source.indexOf(':');
          if (j !== -1) {
            var name = util.trim(source.slice(0, j));
            var value = util.trim(source.slice(j + 1));
            // 必须有属性名称
            if (name) {
              var ret = onAttr(lastPos, retCSS.length, name, value, source);
              if (ret) retCSS += ret + '; ';
            }
          }
        }
        lastPos = i + 1;
      }

      for (; i < cssLength; i++) {
        var c = css[i];
        if (c === '/' && css[i + 1] === '*') {
          // 备注开始
          var j = css.indexOf('*/', i + 2);
          // 如果没有正常的备注结束，则后面的部分全部跳过
          if (j === -1) break;
          // 直接将当前位置调到备注结尾，并且初始化状态
          i = j + 1;
          lastPos = i + 1;
          isParenthesisOpen = false;
        } else if (c === '(') {
          isParenthesisOpen = true;
        } else if (c === ')') {
          isParenthesisOpen = false;
        } else if (c === ';') {
          if (isParenthesisOpen) ; else {
            addNewAttr();
          }
        } else if (c === '\n') {
          addNewAttr();
        }
      }

      return util.trim(retCSS);
    }

    var parser$1 = parseStyle;

    /**
     * cssfilter
     *
     * @author 老雷<leizongmin@gmail.com>
     */






    /**
     * 返回值是否为空
     *
     * @param {Object} obj
     * @return {Boolean}
     */
    function isNull (obj) {
      return (obj === undefined || obj === null);
    }

    /**
     * 浅拷贝对象
     *
     * @param {Object} obj
     * @return {Object}
     */
    function shallowCopyObject (obj) {
      var ret = {};
      for (var i in obj) {
        ret[i] = obj[i];
      }
      return ret;
    }

    /**
     * 创建CSS过滤器
     *
     * @param {Object} options
     *   - {Object} whiteList
     *   - {Function} onAttr
     *   - {Function} onIgnoreAttr
     *   - {Function} safeAttrValue
     */
    function FilterCSS (options) {
      options = shallowCopyObject(options || {});
      options.whiteList = options.whiteList || _default.whiteList;
      options.onAttr = options.onAttr || _default.onAttr;
      options.onIgnoreAttr = options.onIgnoreAttr || _default.onIgnoreAttr;
      options.safeAttrValue = options.safeAttrValue || _default.safeAttrValue;
      this.options = options;
    }

    FilterCSS.prototype.process = function (css) {
      // 兼容各种奇葩输入
      css = css || '';
      css = css.toString();
      if (!css) return '';

      var me = this;
      var options = me.options;
      var whiteList = options.whiteList;
      var onAttr = options.onAttr;
      var onIgnoreAttr = options.onIgnoreAttr;
      var safeAttrValue = options.safeAttrValue;

      var retCSS = parser$1(css, function (sourcePosition, position, name, value, source) {

        var check = whiteList[name];
        var isWhite = false;
        if (check === true) isWhite = check;
        else if (typeof check === 'function') isWhite = check(value);
        else if (check instanceof RegExp) isWhite = check.test(value);
        if (isWhite !== true) isWhite = false;

        // 如果过滤后 value 为空则直接忽略
        value = safeAttrValue(name, value);
        if (!value) return;

        var opts = {
          position: position,
          sourcePosition: sourcePosition,
          source: source,
          isWhite: isWhite
        };

        if (isWhite) {

          var ret = onAttr(name, value, opts);
          if (isNull(ret)) {
            return name + ':' + value;
          } else {
            return ret;
          }

        } else {

          var ret = onIgnoreAttr(name, value, opts);
          if (!isNull(ret)) {
            return ret;
          }

        }
      });

      return retCSS;
    };


    var css = FilterCSS;

    var lib = createCommonjsModule(function (module, exports) {
    /**
     * cssfilter
     *
     * @author 老雷<leizongmin@gmail.com>
     */





    /**
     * XSS过滤
     *
     * @param {String} css 要过滤的CSS代码
     * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
     * @return {String}
     */
    function filterCSS (html, options) {
      var xss = new css(options);
      return xss.process(html);
    }


    // 输出
    exports = module.exports = filterCSS;
    exports.FilterCSS = css;
    for (var i in _default) exports[i] = _default[i];

    // 在浏览器端使用
    if (typeof window !== 'undefined') {
      window.filterCSS = module.exports;
    }
    });
    var lib_1 = lib.FilterCSS;

    var util$1 = {
      indexOf: function(arr, item) {
        var i, j;
        if (Array.prototype.indexOf) {
          return arr.indexOf(item);
        }
        for (i = 0, j = arr.length; i < j; i++) {
          if (arr[i] === item) {
            return i;
          }
        }
        return -1;
      },
      forEach: function(arr, fn, scope) {
        var i, j;
        if (Array.prototype.forEach) {
          return arr.forEach(fn, scope);
        }
        for (i = 0, j = arr.length; i < j; i++) {
          fn.call(scope, arr[i], i, arr);
        }
      },
      trim: function(str) {
        if (String.prototype.trim) {
          return str.trim();
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
      spaceIndex: function(str) {
        var reg = /\s|\n|\t/;
        var match = reg.exec(str);
        return match ? match.index : -1;
      }
    };

    /**
     * default settings
     *
     * @author Zongmin Lei<leizongmin@gmail.com>
     */

    var FilterCSS$1 = lib.FilterCSS;
    var getDefaultCSSWhiteList = lib.getDefaultWhiteList;


    function getDefaultWhiteList$1() {
      return {
        a: ["target", "href", "title"],
        abbr: ["title"],
        address: [],
        area: ["shape", "coords", "href", "alt"],
        article: [],
        aside: [],
        audio: ["autoplay", "controls", "loop", "preload", "src"],
        b: [],
        bdi: ["dir"],
        bdo: ["dir"],
        big: [],
        blockquote: ["cite"],
        br: [],
        caption: [],
        center: [],
        cite: [],
        code: [],
        col: ["align", "valign", "span", "width"],
        colgroup: ["align", "valign", "span", "width"],
        dd: [],
        del: ["datetime"],
        details: ["open"],
        div: [],
        dl: [],
        dt: [],
        em: [],
        font: ["color", "size", "face"],
        footer: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        header: [],
        hr: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        ins: ["datetime"],
        li: [],
        mark: [],
        nav: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        section: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        table: ["width", "border", "align", "valign"],
        tbody: ["align", "valign"],
        td: ["width", "rowspan", "colspan", "align", "valign"],
        tfoot: ["align", "valign"],
        th: ["width", "rowspan", "colspan", "align", "valign"],
        thead: ["align", "valign"],
        tr: ["rowspan", "align", "valign"],
        tt: [],
        u: [],
        ul: [],
        video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
      };
    }

    var defaultCSSFilter = new FilterCSS$1();

    /**
     * default onTag function
     *
     * @param {String} tag
     * @param {String} html
     * @param {Object} options
     * @return {String}
     */
    function onTag(tag, html, options) {
      // do nothing
    }

    /**
     * default onIgnoreTag function
     *
     * @param {String} tag
     * @param {String} html
     * @param {Object} options
     * @return {String}
     */
    function onIgnoreTag(tag, html, options) {
      // do nothing
    }

    /**
     * default onTagAttr function
     *
     * @param {String} tag
     * @param {String} name
     * @param {String} value
     * @return {String}
     */
    function onTagAttr(tag, name, value) {
      // do nothing
    }

    /**
     * default onIgnoreTagAttr function
     *
     * @param {String} tag
     * @param {String} name
     * @param {String} value
     * @return {String}
     */
    function onIgnoreTagAttr(tag, name, value) {
      // do nothing
    }

    /**
     * default escapeHtml function
     *
     * @param {String} html
     */
    function escapeHtml(html) {
      return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
    }

    /**
     * default safeAttrValue function
     *
     * @param {String} tag
     * @param {String} name
     * @param {String} value
     * @param {Object} cssFilter
     * @return {String}
     */
    function safeAttrValue$1(tag, name, value, cssFilter) {
      // unescape attribute value firstly
      value = friendlyAttrValue(value);

      if (name === "href" || name === "src") {
        // filter `href` and `src` attribute
        // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
        value = util$1.trim(value);
        if (value === "#") return "#";
        if (
          !(
            value.substr(0, 7) === "http://" ||
            value.substr(0, 8) === "https://" ||
            value.substr(0, 7) === "mailto:" ||
            value.substr(0, 4) === "tel:" ||
            value.substr(0, 11) === "data:image/" ||
            value.substr(0, 6) === "ftp://" ||
            value.substr(0, 2) === "./" ||
            value.substr(0, 3) === "../" ||
            value[0] === "#" ||
            value[0] === "/"
          )
        ) {
          return "";
        }
      } else if (name === "background") {
        // filter `background` attribute (maybe no use)
        // `javascript:`
        REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
        if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
          return "";
        }
      } else if (name === "style") {
        // `expression()`
        REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
        if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
          return "";
        }
        // `url()`
        REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
        if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
          REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
          if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
            return "";
          }
        }
        if (cssFilter !== false) {
          cssFilter = cssFilter || defaultCSSFilter;
          value = cssFilter.process(value);
        }
      }

      // escape `<>"` before returns
      value = escapeAttrValue(value);
      return value;
    }

    // RegExp list
    var REGEXP_LT = /</g;
    var REGEXP_GT = />/g;
    var REGEXP_QUOTE = /"/g;
    var REGEXP_QUOTE_2 = /&quot;/g;
    var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
    var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
    var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
    var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
    var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
    var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

    /**
     * escape doube quote
     *
     * @param {String} str
     * @return {String} str
     */
    function escapeQuote(str) {
      return str.replace(REGEXP_QUOTE, "&quot;");
    }

    /**
     * unescape double quote
     *
     * @param {String} str
     * @return {String} str
     */
    function unescapeQuote(str) {
      return str.replace(REGEXP_QUOTE_2, '"');
    }

    /**
     * escape html entities
     *
     * @param {String} str
     * @return {String}
     */
    function escapeHtmlEntities(str) {
      return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
        return code[0] === "x" || code[0] === "X"
          ? String.fromCharCode(parseInt(code.substr(1), 16))
          : String.fromCharCode(parseInt(code, 10));
      });
    }

    /**
     * escape html5 new danger entities
     *
     * @param {String} str
     * @return {String}
     */
    function escapeDangerHtml5Entities(str) {
      return str
        .replace(REGEXP_ATTR_VALUE_COLON, ":")
        .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
    }

    /**
     * clear nonprintable characters
     *
     * @param {String} str
     * @return {String}
     */
    function clearNonPrintableCharacter(str) {
      var str2 = "";
      for (var i = 0, len = str.length; i < len; i++) {
        str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
      }
      return util$1.trim(str2);
    }

    /**
     * get friendly attribute value
     *
     * @param {String} str
     * @return {String}
     */
    function friendlyAttrValue(str) {
      str = unescapeQuote(str);
      str = escapeHtmlEntities(str);
      str = escapeDangerHtml5Entities(str);
      str = clearNonPrintableCharacter(str);
      return str;
    }

    /**
     * unescape attribute value
     *
     * @param {String} str
     * @return {String}
     */
    function escapeAttrValue(str) {
      str = escapeQuote(str);
      str = escapeHtml(str);
      return str;
    }

    /**
     * `onIgnoreTag` function for removing all the tags that are not in whitelist
     */
    function onIgnoreTagStripAll() {
      return "";
    }

    /**
     * remove tag body
     * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
     *
     * @param {array} tags
     * @param {function} next
     */
    function StripTagBody(tags, next) {
      if (typeof next !== "function") {
        next = function() {};
      }

      var isRemoveAllTag = !Array.isArray(tags);
      function isRemoveTag(tag) {
        if (isRemoveAllTag) return true;
        return util$1.indexOf(tags, tag) !== -1;
      }

      var removeList = [];
      var posStart = false;

      return {
        onIgnoreTag: function(tag, html, options) {
          if (isRemoveTag(tag)) {
            if (options.isClosing) {
              var ret = "[/removed]";
              var end = options.position + ret.length;
              removeList.push([
                posStart !== false ? posStart : options.position,
                end
              ]);
              posStart = false;
              return ret;
            } else {
              if (!posStart) {
                posStart = options.position;
              }
              return "[removed]";
            }
          } else {
            return next(tag, html, options);
          }
        },
        remove: function(html) {
          var rethtml = "";
          var lastPos = 0;
          util$1.forEach(removeList, function(pos) {
            rethtml += html.slice(lastPos, pos[0]);
            lastPos = pos[1];
          });
          rethtml += html.slice(lastPos);
          return rethtml;
        }
      };
    }

    /**
     * remove html comments
     *
     * @param {String} html
     * @return {String}
     */
    function stripCommentTag(html) {
      return html.replace(STRIP_COMMENT_TAG_REGEXP, "");
    }
    var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

    /**
     * remove invisible characters
     *
     * @param {String} html
     * @return {String}
     */
    function stripBlankChar(html) {
      var chars = html.split("");
      chars = chars.filter(function(char) {
        var c = char.charCodeAt(0);
        if (c === 127) return false;
        if (c <= 31) {
          if (c === 10 || c === 13) return true;
          return false;
        }
        return true;
      });
      return chars.join("");
    }

    var whiteList$1 = getDefaultWhiteList$1();
    var getDefaultWhiteList_1$1 = getDefaultWhiteList$1;
    var onTag_1 = onTag;
    var onIgnoreTag_1 = onIgnoreTag;
    var onTagAttr_1 = onTagAttr;
    var onIgnoreTagAttr_1 = onIgnoreTagAttr;
    var safeAttrValue_1$1 = safeAttrValue$1;
    var escapeHtml_1 = escapeHtml;
    var escapeQuote_1 = escapeQuote;
    var unescapeQuote_1 = unescapeQuote;
    var escapeHtmlEntities_1 = escapeHtmlEntities;
    var escapeDangerHtml5Entities_1 = escapeDangerHtml5Entities;
    var clearNonPrintableCharacter_1 = clearNonPrintableCharacter;
    var friendlyAttrValue_1 = friendlyAttrValue;
    var escapeAttrValue_1 = escapeAttrValue;
    var onIgnoreTagStripAll_1 = onIgnoreTagStripAll;
    var StripTagBody_1 = StripTagBody;
    var stripCommentTag_1 = stripCommentTag;
    var stripBlankChar_1 = stripBlankChar;
    var cssFilter = defaultCSSFilter;
    var getDefaultCSSWhiteList_1 = getDefaultCSSWhiteList;

    var _default$1 = {
    	whiteList: whiteList$1,
    	getDefaultWhiteList: getDefaultWhiteList_1$1,
    	onTag: onTag_1,
    	onIgnoreTag: onIgnoreTag_1,
    	onTagAttr: onTagAttr_1,
    	onIgnoreTagAttr: onIgnoreTagAttr_1,
    	safeAttrValue: safeAttrValue_1$1,
    	escapeHtml: escapeHtml_1,
    	escapeQuote: escapeQuote_1,
    	unescapeQuote: unescapeQuote_1,
    	escapeHtmlEntities: escapeHtmlEntities_1,
    	escapeDangerHtml5Entities: escapeDangerHtml5Entities_1,
    	clearNonPrintableCharacter: clearNonPrintableCharacter_1,
    	friendlyAttrValue: friendlyAttrValue_1,
    	escapeAttrValue: escapeAttrValue_1,
    	onIgnoreTagStripAll: onIgnoreTagStripAll_1,
    	StripTagBody: StripTagBody_1,
    	stripCommentTag: stripCommentTag_1,
    	stripBlankChar: stripBlankChar_1,
    	cssFilter: cssFilter,
    	getDefaultCSSWhiteList: getDefaultCSSWhiteList_1
    };

    /**
     * Simple HTML Parser
     *
     * @author Zongmin Lei<leizongmin@gmail.com>
     */



    /**
     * get tag name
     *
     * @param {String} html e.g. '<a hef="#">'
     * @return {String}
     */
    function getTagName(html) {
      var i = util$1.spaceIndex(html);
      if (i === -1) {
        var tagName = html.slice(1, -1);
      } else {
        var tagName = html.slice(1, i + 1);
      }
      tagName = util$1.trim(tagName).toLowerCase();
      if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
      if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
      return tagName;
    }

    /**
     * is close tag?
     *
     * @param {String} html 如：'<a hef="#">'
     * @return {Boolean}
     */
    function isClosing(html) {
      return html.slice(0, 2) === "</";
    }

    /**
     * parse input html and returns processed html
     *
     * @param {String} html
     * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
     * @param {Function} escapeHtml
     * @return {String}
     */
    function parseTag(html, onTag, escapeHtml) {

      var rethtml = "";
      var lastPos = 0;
      var tagStart = false;
      var quoteStart = false;
      var currentPos = 0;
      var len = html.length;
      var currentTagName = "";
      var currentHtml = "";

      for (currentPos = 0; currentPos < len; currentPos++) {
        var c = html.charAt(currentPos);
        if (tagStart === false) {
          if (c === "<") {
            tagStart = currentPos;
            continue;
          }
        } else {
          if (quoteStart === false) {
            if (c === "<") {
              rethtml += escapeHtml(html.slice(lastPos, currentPos));
              tagStart = currentPos;
              lastPos = currentPos;
              continue;
            }
            if (c === ">") {
              rethtml += escapeHtml(html.slice(lastPos, tagStart));
              currentHtml = html.slice(tagStart, currentPos + 1);
              currentTagName = getTagName(currentHtml);
              rethtml += onTag(
                tagStart,
                rethtml.length,
                currentTagName,
                currentHtml,
                isClosing(currentHtml)
              );
              lastPos = currentPos + 1;
              tagStart = false;
              continue;
            }
            if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === "=") {
              quoteStart = c;
              continue;
            }
          } else {
            if (c === quoteStart) {
              quoteStart = false;
              continue;
            }
          }
        }
      }
      if (lastPos < html.length) {
        rethtml += escapeHtml(html.substr(lastPos));
      }

      return rethtml;
    }

    var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

    /**
     * parse input attributes and returns processed attributes
     *
     * @param {String} html e.g. `href="#" target="_blank"`
     * @param {Function} onAttr e.g. `function (name, value)`
     * @return {String}
     */
    function parseAttr(html, onAttr) {

      var lastPos = 0;
      var retAttrs = [];
      var tmpName = false;
      var len = html.length;

      function addAttr(name, value) {
        name = util$1.trim(name);
        name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
        if (name.length < 1) return;
        var ret = onAttr(name, value || "");
        if (ret) retAttrs.push(ret);
      }

      // 逐个分析字符
      for (var i = 0; i < len; i++) {
        var c = html.charAt(i);
        var v, j;
        if (tmpName === false && c === "=") {
          tmpName = html.slice(lastPos, i);
          lastPos = i + 1;
          continue;
        }
        if (tmpName !== false) {
          if (
            i === lastPos &&
            (c === '"' || c === "'") &&
            html.charAt(i - 1) === "="
          ) {
            j = html.indexOf(c, i + 1);
            if (j === -1) {
              break;
            } else {
              v = util$1.trim(html.slice(lastPos + 1, j));
              addAttr(tmpName, v);
              tmpName = false;
              i = j;
              lastPos = i + 1;
              continue;
            }
          }
        }
        if (/\s|\n|\t/.test(c)) {
          html = html.replace(/\s|\n|\t/g, " ");
          if (tmpName === false) {
            j = findNextEqual(html, i);
            if (j === -1) {
              v = util$1.trim(html.slice(lastPos, i));
              addAttr(v);
              tmpName = false;
              lastPos = i + 1;
              continue;
            } else {
              i = j - 1;
              continue;
            }
          } else {
            j = findBeforeEqual(html, i - 1);
            if (j === -1) {
              v = util$1.trim(html.slice(lastPos, i));
              v = stripQuoteWrap(v);
              addAttr(tmpName, v);
              tmpName = false;
              lastPos = i + 1;
              continue;
            } else {
              continue;
            }
          }
        }
      }

      if (lastPos < html.length) {
        if (tmpName === false) {
          addAttr(html.slice(lastPos));
        } else {
          addAttr(tmpName, stripQuoteWrap(util$1.trim(html.slice(lastPos))));
        }
      }

      return util$1.trim(retAttrs.join(" "));
    }

    function findNextEqual(str, i) {
      for (; i < str.length; i++) {
        var c = str[i];
        if (c === " ") continue;
        if (c === "=") return i;
        return -1;
      }
    }

    function findBeforeEqual(str, i) {
      for (; i > 0; i--) {
        var c = str[i];
        if (c === " ") continue;
        if (c === "=") return i;
        return -1;
      }
    }

    function isQuoteWrapString(text) {
      if (
        (text[0] === '"' && text[text.length - 1] === '"') ||
        (text[0] === "'" && text[text.length - 1] === "'")
      ) {
        return true;
      } else {
        return false;
      }
    }

    function stripQuoteWrap(text) {
      if (isQuoteWrapString(text)) {
        return text.substr(1, text.length - 2);
      } else {
        return text;
      }
    }

    var parseTag_1 = parseTag;
    var parseAttr_1 = parseAttr;

    var parser$2 = {
    	parseTag: parseTag_1,
    	parseAttr: parseAttr_1
    };

    /**
     * filter xss
     *
     * @author Zongmin Lei<leizongmin@gmail.com>
     */

    var FilterCSS$2 = lib.FilterCSS;


    var parseTag$1 = parser$2.parseTag;
    var parseAttr$1 = parser$2.parseAttr;


    /**
     * returns `true` if the input value is `undefined` or `null`
     *
     * @param {Object} obj
     * @return {Boolean}
     */
    function isNull$1(obj) {
      return obj === undefined || obj === null;
    }

    /**
     * get attributes for a tag
     *
     * @param {String} html
     * @return {Object}
     *   - {String} html
     *   - {Boolean} closing
     */
    function getAttrs(html) {
      var i = util$1.spaceIndex(html);
      if (i === -1) {
        return {
          html: "",
          closing: html[html.length - 2] === "/"
        };
      }
      html = util$1.trim(html.slice(i + 1, -1));
      var isClosing = html[html.length - 1] === "/";
      if (isClosing) html = util$1.trim(html.slice(0, -1));
      return {
        html: html,
        closing: isClosing
      };
    }

    /**
     * shallow copy
     *
     * @param {Object} obj
     * @return {Object}
     */
    function shallowCopyObject$1(obj) {
      var ret = {};
      for (var i in obj) {
        ret[i] = obj[i];
      }
      return ret;
    }

    /**
     * FilterXSS class
     *
     * @param {Object} options
     *        whiteList, onTag, onTagAttr, onIgnoreTag,
     *        onIgnoreTagAttr, safeAttrValue, escapeHtml
     *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
     *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
     */
    function FilterXSS(options) {
      options = shallowCopyObject$1(options || {});

      if (options.stripIgnoreTag) {
        if (options.onIgnoreTag) {
          console.error(
            'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
          );
        }
        options.onIgnoreTag = _default$1.onIgnoreTagStripAll;
      }

      options.whiteList = options.whiteList || _default$1.whiteList;
      options.onTag = options.onTag || _default$1.onTag;
      options.onTagAttr = options.onTagAttr || _default$1.onTagAttr;
      options.onIgnoreTag = options.onIgnoreTag || _default$1.onIgnoreTag;
      options.onIgnoreTagAttr = options.onIgnoreTagAttr || _default$1.onIgnoreTagAttr;
      options.safeAttrValue = options.safeAttrValue || _default$1.safeAttrValue;
      options.escapeHtml = options.escapeHtml || _default$1.escapeHtml;
      this.options = options;

      if (options.css === false) {
        this.cssFilter = false;
      } else {
        options.css = options.css || {};
        this.cssFilter = new FilterCSS$2(options.css);
      }
    }

    /**
     * start process and returns result
     *
     * @param {String} html
     * @return {String}
     */
    FilterXSS.prototype.process = function(html) {
      // compatible with the input
      html = html || "";
      html = html.toString();
      if (!html) return "";

      var me = this;
      var options = me.options;
      var whiteList = options.whiteList;
      var onTag = options.onTag;
      var onIgnoreTag = options.onIgnoreTag;
      var onTagAttr = options.onTagAttr;
      var onIgnoreTagAttr = options.onIgnoreTagAttr;
      var safeAttrValue = options.safeAttrValue;
      var escapeHtml = options.escapeHtml;
      var cssFilter = me.cssFilter;

      // remove invisible characters
      if (options.stripBlankChar) {
        html = _default$1.stripBlankChar(html);
      }

      // remove html comments
      if (!options.allowCommentTag) {
        html = _default$1.stripCommentTag(html);
      }

      // if enable stripIgnoreTagBody
      var stripIgnoreTagBody = false;
      if (options.stripIgnoreTagBody) {
        var stripIgnoreTagBody = _default$1.StripTagBody(
          options.stripIgnoreTagBody,
          onIgnoreTag
        );
        onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
      }

      var retHtml = parseTag$1(
        html,
        function(sourcePosition, position, tag, html, isClosing) {
          var info = {
            sourcePosition: sourcePosition,
            position: position,
            isClosing: isClosing,
            isWhite: whiteList.hasOwnProperty(tag)
          };

          // call `onTag()`
          var ret = onTag(tag, html, info);
          if (!isNull$1(ret)) return ret;

          if (info.isWhite) {
            if (info.isClosing) {
              return "</" + tag + ">";
            }

            var attrs = getAttrs(html);
            var whiteAttrList = whiteList[tag];
            var attrsHtml = parseAttr$1(attrs.html, function(name, value) {
              // call `onTagAttr()`
              var isWhiteAttr = util$1.indexOf(whiteAttrList, name) !== -1;
              var ret = onTagAttr(tag, name, value, isWhiteAttr);
              if (!isNull$1(ret)) return ret;

              if (isWhiteAttr) {
                // call `safeAttrValue()`
                value = safeAttrValue(tag, name, value, cssFilter);
                if (value) {
                  return name + '="' + value + '"';
                } else {
                  return name;
                }
              } else {
                // call `onIgnoreTagAttr()`
                var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
                if (!isNull$1(ret)) return ret;
                return;
              }
            });

            // build new tag html
            var html = "<" + tag;
            if (attrsHtml) html += " " + attrsHtml;
            if (attrs.closing) html += " /";
            html += ">";
            return html;
          } else {
            // call `onIgnoreTag()`
            var ret = onIgnoreTag(tag, html, info);
            if (!isNull$1(ret)) return ret;
            return escapeHtml(html);
          }
        },
        escapeHtml
      );

      // if enable stripIgnoreTagBody
      if (stripIgnoreTagBody) {
        retHtml = stripIgnoreTagBody.remove(retHtml);
      }

      return retHtml;
    };

    var xss = FilterXSS;

    var lib$1 = createCommonjsModule(function (module, exports) {
    /**
     * xss
     *
     * @author Zongmin Lei<leizongmin@gmail.com>
     */





    /**
     * filter xss function
     *
     * @param {String} html
     * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
     * @return {String}
     */
    function filterXSS(html, options) {
      var xss$1 = new xss(options);
      return xss$1.process(html);
    }

    exports = module.exports = filterXSS;
    exports.filterXSS = filterXSS;
    exports.FilterXSS = xss;
    for (var i in _default$1) exports[i] = _default$1[i];
    for (var i in parser$2) exports[i] = parser$2[i];

    // using `xss` on the browser, output `filterXSS` to the globals
    if (typeof window !== "undefined") {
      window.filterXSS = module.exports;
    }

    // using `xss` on the WebWorker, output `filterXSS` to the globals
    function isWorkerEnv() {
      return typeof self !== 'undefined' && typeof DedicatedWorkerGlobalScope !== 'undefined' && self instanceof DedicatedWorkerGlobalScope;
    }
    if (isWorkerEnv()) {
      self.filterXSS = module.exports;
    }
    });
    var lib_1$1 = lib$1.getDefaultWhiteList;
    var lib_2 = lib$1.filterXSS;
    var lib_3 = lib$1.FilterXSS;

    var FormattedText = (function (_super) {
        tslib.__extends(FormattedText, _super);
        function FormattedText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormattedText.filterXss = function (_a) {
            var value = _a.value, _b = _a.whiteList, whiteList = _b === void 0 ? {
                source: ['src', 'type'],
                img: ['src', 'alt', 'title', 'width', 'height', 'style'],
                video: [
                    'autoplay',
                    'controls',
                    'loop',
                    'preload',
                    'src',
                    'height',
                    'width',
                    'style',
                ],
            } : _b;
            var options = {
                whiteList: tslib.__assign(tslib.__assign({}, lib_1$1()), whiteList),
                stripIgnoreTagBody: ['script'],
            };
            return lib_2(value, options);
        };
        FormattedText.prototype.render = function () {
            var _a = this.props, value = _a.value, _b = _a.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b, whiteList = _a.whiteList;
            if (typeof value !== 'string')
                return null;
            if (allowFilteredHtml && value.indexOf('<') === 0) {
                var filteredContent = FormattedText.filterXss({ value: value, whiteList: whiteList });
                return React.createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } });
            }
            return React.createElement(reactMarkdown, { source: value, escapeHtml: false });
        };
        return FormattedText;
    }(React.PureComponent));

    var PreviewTabMD = function (props) {
        var allowFilteredHtml = props.allowFilteredHtml, value = props.value;
        if (typeof value !== 'string') {
            return React.createElement(InputWrapper, null, "-");
        }
        return (React.createElement(InputWrapper, null,
            React.createElement(FormattedText, { value: value, allowFilteredHtml: allowFilteredHtml })));
    };
    var PreviewTab = React.memo(PreviewTabMD, function (prevProps, newProps) {
        if (newProps.skipRender)
            return false;
        var value = prevProps.value, allowFilteredHtml = prevProps.allowFilteredHtml;
        if (newProps.value !== value ||
            newProps.allowFilteredHtml !== allowFilteredHtml) {
            return true;
        }
        return false;
    });

    var MdTextarea = function (props) {
        var _a = props.id, id = _a === void 0 ? 'unknown_markdown_id' : _a, value = props.value, toggle = props.toggle, _b = props.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b, rows = props.rows, cols = props.cols, onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur, valid = props.valid, invalid = props.invalid, bsSize = props.bsSize, name = props.name, autoFocus = props.autoFocus, disabled = props.disabled, maxLength = props.maxLength, readOnly = props.readOnly, required = props.required, wrap = props.wrap, whiteList = props.whiteList, filteredValue = props.filteredValue;
        var _c = React.useState(true), showEdit = _c[0], setShowEdit = _c[1];
        var onEditClick = React.useCallback(function () {
            if (toggle) {
                setShowEdit(!showEdit);
            }
            else {
                setShowEdit(true);
            }
        }, [showEdit]);
        var onPreviewClick = React.useCallback(function () {
            if (toggle) {
                setShowEdit(!showEdit);
            }
            else {
                setShowEdit(false);
            }
        }, [showEdit]);
        React.useEffect(function () {
            if (!filteredValue) {
                return;
            }
            if (typeof value !== 'string') {
                filteredValue.current = undefined;
                return;
            }
            filteredValue.current = FormattedText.filterXss({ value: value, whiteList: whiteList });
        }, [value, whiteList]);
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap.Nav, { tabs: true, key: "Nav" },
                React.createElement(reactstrap.NavItem, null,
                    React.createElement(reactstrap.NavLink, { active: showEdit, onClick: onEditClick }, "Edit")),
                React.createElement(reactstrap.NavItem, null,
                    React.createElement(reactstrap.NavLink, { active: !showEdit, onClick: onPreviewClick }, "Preview"))),
            React.createElement(reactstrap.TabContent, { key: "Content", id: "tabpane_" + id, activeTab: showEdit ? 'Edit' : 'Preview' },
                React.createElement(reactstrap.TabPane, { tabId: "Edit" },
                    React.createElement(InputTab, tslib.__assign({ allowFilteredHtml: allowFilteredHtml, value: value, rows: rows, cols: cols }, { onChange: onChange, onFocus: onFocus, onBlur: onBlur }, { valid: valid, name: name, invalid: invalid, bsSize: bsSize }, { autoFocus: autoFocus, disabled: disabled, maxLength: maxLength, readOnly: readOnly, required: required, wrap: wrap }))),
                React.createElement(reactstrap.TabPane, { tabId: "Preview" },
                    React.createElement(PreviewTab, { allowFilteredHtml: allowFilteredHtml, value: value, skipRender: !showEdit })))));
    };
    var index$1 = React.memo(MdTextarea);

    exports.FormattedText = FormattedText;
    exports.Textarea = index$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=textarea.umd.js.map
