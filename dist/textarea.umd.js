(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('react'), require('reactstrap')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tslib', 'react', 'reactstrap'], factory) :
    (factory((global.FormikAdminTaskType = {}),global.tslib,global.React,global.reactstrap));
}(this, (function (exports,tslib_1,React,reactstrap) { 'use strict';

    var React__default = React['default'];

    var wrapper = function (_a) {
        var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
        return (React.createElement("div", { style: tslib_1.__assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
    };

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
    				src = target[name];
    				copy = options[name];

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
    						target[name] = extend(deep, clone, copy);

    					// Don't bring in undefined values
    					} else if (typeof copy !== 'undefined') {
    						target[name] = copy;
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

    /* Inherit from `Error#`. */
    function VMessagePrototype() {}
    VMessagePrototype.prototype = Error.prototype;
    VMessage.prototype = new VMessagePrototype();

    /* Message properties. */
    var proto = VMessage.prototype;

    proto.file = '';
    proto.name = '';
    proto.reason = '';
    proto.message = '';
    proto.stack = '';
    proto.fatal = null;
    proto.column = null;
    proto.line = null;

    /* Construct a new VMessage.
     *
     * Note: We cannot invoke `Error` on the created context,
     * as that adds readonly `line` and `column` attributes on
     * Safari 9, thus throwing and failing the data. */
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

      /* Node. */
      if (position && position.position) {
        position = position.position;
      }

      if (position) {
        /* Position. */
        if (position.start) {
          location = position;
          position = position.start;
        } else {
          /* Point. */
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

    var path$1 = /*#__PURE__*/Object.freeze({
        resolve: resolve,
        normalize: normalize,
        isAbsolute: isAbsolute,
        join: join,
        relative: relative,
        sep: sep,
        delimiter: delimiter,
        dirname: dirname,
        basename: basename,
        extname: extname,
        default: path
    });

    var path$2 = ( path$1 && path ) || path$1;

    function replaceExt(npath, ext) {
      if (typeof npath !== 'string') {
        return npath;
      }

      if (npath.length === 0) {
        return npath;
      }

      var nFileName = path$2.basename(npath, path$2.extname(npath)) + ext;
      return path$2.join(path$2.dirname(npath), nFileName);
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
        return typeof this.path === 'string' ? path$2.dirname(this.path) : undefined;
      },
      set: function (dirname) {
        assertPath(this.path, 'dirname');
        this.path = path$2.join(dirname || '', this.basename);
      }
    });

    /* Access basename (`index.min.js`). */
    Object.defineProperty(proto$1, 'basename', {
      get: function () {
        return typeof this.path === 'string' ? path$2.basename(this.path) : undefined;
      },
      set: function (basename) {
        assertNonEmpty(basename, 'basename');
        assertPart(basename, 'basename');
        this.path = path$2.join(this.dirname || '', basename);
      }
    });

    /* Access extname (`.js`). */
    Object.defineProperty(proto$1, 'extname', {
      get: function () {
        return typeof this.path === 'string' ? path$2.extname(this.path) : undefined;
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
        return typeof this.path === 'string' ? path$2.basename(this.path, this.extname) : undefined;
      },
      set: function (stem) {
        assertNonEmpty(stem, 'stem');
        assertPart(stem, 'stem');
        this.path = path$2.join(this.dirname || '', stem + (this.extname || ''));
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
      if (part.indexOf(path$2.sep) !== -1) {
        throw new Error('`' + name + '` cannot be a path: did not expect `' + path$2.sep + '`');
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

    /* Expose. */
    var trough_1 = trough;

    /* Methods. */
    var slice = [].slice;

    /* Create new middleware. */
    function trough() {
      var fns = [];
      var middleware = {};

      middleware.run = run;
      middleware.use = use;

      return middleware

      /* Run `fns`.  Last argument must be
       * a completion handler. */
      function run() {
        var index = -1;
        var input = slice.call(arguments, 0, -1);
        var done = arguments[arguments.length - 1];

        if (typeof done !== 'function') {
          throw new Error('Expected function as last argument, not ' + done)
        }

        next.apply(null, [null].concat(input));

        /* Run the next `fn`, if any. */
        function next(err) {
          var fn = fns[++index];
          var params = slice.call(arguments, 0);
          var values = params.slice(1);
          var length = input.length;
          var pos = -1;

          if (err) {
            done(err);
            return
          }

          /* Copy non-nully input into values. */
          while (++pos < length) {
            if (values[pos] === null || values[pos] === undefined) {
              values[pos] = input[pos];
            }
          }

          input = values;

          /* Next or done. */
          if (fn) {
            wrap(fn, next).apply(null, input);
          } else {
            done.apply(null, [null].concat(input));
          }
        }
      }

      /* Add `fn` to the list. */
      function use(fn) {
        if (typeof fn !== 'function') {
          throw new Error('Expected `fn` to be a function, not ' + fn)
        }

        fns.push(fn);

        return middleware
      }
    }

    /* Wrap `fn`.  Can be sync or async; return a promise,
     * receive a completion handler, return new values and
     * errors. */
    function wrap(fn, next) {
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
        } catch (err) {
          /* Well, this is quite the pickle.  `fn` received
           * a callback and invoked it (thus continuing the
           * pipeline), but later also threw an error.
           * We’re not about to restart the pipeline again,
           * so the only thing left to do is to throw the
           * thing instea. */
          if (callback && invoked) {
            throw err
          }

          return done(err)
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

      /* Invoke `next`, only once. */
      function done() {
        if (!invoked) {
          invoked = true;

          next.apply(null, arguments);
        }
      }

      /* Invoke `done` with one value.
       * Tracks if an error is passed, too. */
      function then(value) {
        done(null, value);
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

    var slice$1 = [].slice;
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
            attachers.push(slice$1.call(arguments));
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

    // shim for using process in browser
    // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
    }
    var cachedSetTimeout = defaultSetTimout;
    var cachedClearTimeout = defaultClearTimeout;
    if (typeof global.setTimeout === 'function') {
        cachedSetTimeout = setTimeout;
    }
    if (typeof global.clearTimeout === 'function') {
        cachedClearTimeout = clearTimeout;
    }

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
        } catch(e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch(e){
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
        } catch (e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e){
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
        while(len) {
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
    function nextTick(fun) {
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
    }
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    var title = 'browser';
    var platform = 'browser';
    var browser = true;
    var env = {};
    var argv = [];
    var version = ''; // empty string to avoid regexp issues
    var versions = {};
    var release = {};
    var config = {};

    function noop() {}

    var on = noop;
    var addListener = noop;
    var once = noop;
    var off = noop;
    var removeListener = noop;
    var removeAllListeners = noop;
    var emit = noop;

    function binding(name) {
        throw new Error('process.binding is not supported');
    }

    function cwd () { return '/' }
    function chdir (dir) {
        throw new Error('process.chdir is not supported');
    }function umask() { return 0; }

    // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
    var performance = global.performance || {};
    var performanceNow =
      performance.now        ||
      performance.mozNow     ||
      performance.msNow      ||
      performance.oNow       ||
      performance.webkitNow  ||
      function(){ return (new Date()).getTime() };

    // generate timestamp or delta
    // see http://nodejs.org/api/process.html#process_process_hrtime
    function hrtime(previousTimestamp){
      var clocktime = performanceNow.call(performance)*1e-3;
      var seconds = Math.floor(clocktime);
      var nanoseconds = Math.floor((clocktime%1)*1e9);
      if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds<0) {
          seconds--;
          nanoseconds += 1e9;
        }
      }
      return [seconds,nanoseconds]
    }

    var startTime = new Date();
    function uptime() {
      var currentTime = new Date();
      var dif = currentTime - startTime;
      return dif / 1000;
    }

    var process$1 = {
      nextTick: nextTick,
      title: title,
      browser: browser,
      env: env,
      argv: argv,
      version: version,
      versions: versions,
      on: on,
      addListener: addListener,
      once: once,
      off: off,
      removeListener: removeListener,
      removeAllListeners: removeAllListeners,
      emit: emit,
      binding: binding,
      cwd: cwd,
      chdir: chdir,
      umask: umask,
      hrtime: hrtime,
      platform: platform,
      release: release,
      config: config,
      uptime: uptime
    };

    var inherits;
    if (typeof Object.create === 'function'){
      inherits = function inherits(ctor, superCtor) {
        // implementation from standard node.js 'util' module
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
      inherits = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    var inherits$1 = inherits;

    // Copyright Joyent, Inc. and other Node contributors.
    var formatRegExp = /%[sdj%]/g;
    function format(f) {
      if (!isString$1(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(' ');
      }

      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === '%%') return '%';
        if (i >= len) return x;
        switch (x) {
          case '%s': return String(args[i++]);
          case '%d': return Number(args[i++]);
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
    }

    // Mark that a method should not be used.
    // Returns a modified function which warns once by default.
    // If --no-deprecation is set, then it is a no-op.
    function deprecate(fn, msg) {
      // Allow for deprecating things in the process of starting up.
      if (isUndefined(global.process)) {
        return function() {
          return deprecate(fn, msg).apply(this, arguments);
        };
      }

      if (process$1.noDeprecation === true) {
        return fn;
      }

      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process$1.throwDeprecation) {
            throw new Error(msg);
          } else if (process$1.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }

      return deprecated;
    }

    var debugs = {};
    var debugEnviron;
    function debuglog(set) {
      if (isUndefined(debugEnviron))
        debugEnviron = process$1.env.NODE_DEBUG || '';
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
          var pid = 0;
          debugs[set] = function() {
            var msg = format.apply(null, arguments);
            console.error('%s %d: %s', set, pid, msg);
          };
        } else {
          debugs[set] = function() {};
        }
      }
      return debugs[set];
    }

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
        _extend(ctx, opts);
      }
      // set default options
      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }

    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    inspect.colors = {
      'bold' : [1, 22],
      'italic' : [3, 23],
      'underline' : [4, 24],
      'inverse' : [7, 27],
      'white' : [37, 39],
      'grey' : [90, 39],
      'black' : [30, 39],
      'blue' : [34, 39],
      'cyan' : [36, 39],
      'green' : [32, 39],
      'magenta' : [35, 39],
      'red' : [31, 39],
      'yellow' : [33, 39]
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
        return '\u001b[' + inspect.colors[style][0] + 'm' + str +
               '\u001b[' + inspect.colors[style][1] + 'm';
      } else {
        return str;
      }
    }


    function stylizeNoColor(str, styleType) {
      return str;
    }


    function arrayToHash(array) {
      var hash = {};

      array.forEach(function(val, idx) {
        hash[val] = true;
      });

      return hash;
    }


    function formatValue(ctx, value, recurseTimes) {
      // Provide a hook for user-specified inspect functions.
      // Check that value is an object with an inspect function on it
      if (ctx.customInspect &&
          value &&
          isFunction(value.inspect) &&
          // Filter out the util module, it's inspect function is special
          value.inspect !== inspect &&
          // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString$1(ret)) {
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
      if (isError(value)
          && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
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

      var base = '', array = false, braces = ['{', '}'];

      // Make Array say that they are Array
      if (isArray$1(value)) {
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
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }

      ctx.seen.pop();

      return reduceToSingleString(output, base, braces);
    }


    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize('undefined', 'undefined');
      if (isString$1(value)) {
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value))
        return ctx.stylize('' + value, 'number');
      if (isBoolean(value))
        return ctx.stylize('' + value, 'boolean');
      // For some reason typeof null is "object", so special case here.
      if (isNull(value))
        return ctx.stylize('null', 'null');
    }


    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }


    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty$1(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
              String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
              key, true));
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
      if (!hasOwnProperty$1(visibleKeys, key)) {
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
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
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
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    }


    function reduceToSingleString(output, base, braces) {
      var length = output.reduce(function(prev, cur) {
        if (cur.indexOf('\n') >= 0) ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);

      if (length > 60) {
        return braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];
      }

      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }


    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray$1(ar) {
      return Array.isArray(ar);
    }

    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }

    function isNull(arg) {
      return arg === null;
    }

    function isNullOrUndefined(arg) {
      return arg == null;
    }

    function isNumber(arg) {
      return typeof arg === 'number';
    }

    function isString$1(arg) {
      return typeof arg === 'string';
    }

    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }

    function isUndefined(arg) {
      return arg === void 0;
    }

    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }

    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }

    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }

    function isError(e) {
      return isObject(e) &&
          (objectToString(e) === '[object Error]' || e instanceof Error);
    }

    function isFunction(arg) {
      return typeof arg === 'function';
    }

    function isPrimitive(arg) {
      return arg === null ||
             typeof arg === 'boolean' ||
             typeof arg === 'number' ||
             typeof arg === 'string' ||
             typeof arg === 'symbol' ||  // ES6 symbol
             typeof arg === 'undefined';
    }

    function isBuffer$1(maybeBuf) {
      return Buffer.isBuffer(maybeBuf);
    }

    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }


    function pad(n) {
      return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }


    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                  'Oct', 'Nov', 'Dec'];

    // 26 Feb 16:19:34
    function timestamp() {
      var d = new Date();
      var time = [pad(d.getHours()),
                  pad(d.getMinutes()),
                  pad(d.getSeconds())].join(':');
      return [d.getDate(), months[d.getMonth()], time].join(' ');
    }


    // log is just a thin wrapper to console.log that prepends a timestamp
    function log() {
      console.log('%s - %s', timestamp(), format.apply(null, arguments));
    }

    function _extend(origin, add) {
      // Don't do anything if add isn't an object
      if (!add || !isObject(add)) return origin;

      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    function hasOwnProperty$1(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    var util = {
      inherits: inherits$1,
      _extend: _extend,
      log: log,
      isBuffer: isBuffer$1,
      isPrimitive: isPrimitive,
      isFunction: isFunction,
      isError: isError,
      isDate: isDate,
      isObject: isObject,
      isRegExp: isRegExp,
      isUndefined: isUndefined,
      isSymbol: isSymbol,
      isString: isString$1,
      isNumber: isNumber,
      isNullOrUndefined: isNullOrUndefined,
      isNull: isNull,
      isBoolean: isBoolean,
      isArray: isArray$1,
      inspect: inspect,
      deprecate: deprecate,
      format: format,
      debuglog: debuglog
    }

    var util$1 = /*#__PURE__*/Object.freeze({
        format: format,
        deprecate: deprecate,
        debuglog: debuglog,
        inspect: inspect,
        isArray: isArray$1,
        isBoolean: isBoolean,
        isNull: isNull,
        isNullOrUndefined: isNullOrUndefined,
        isNumber: isNumber,
        isString: isString$1,
        isSymbol: isSymbol,
        isUndefined: isUndefined,
        isRegExp: isRegExp,
        isObject: isObject,
        isDate: isDate,
        isError: isError,
        isFunction: isFunction,
        isPrimitive: isPrimitive,
        isBuffer: isBuffer$1,
        log: log,
        inherits: inherits$1,
        _extend: _extend,
        default: util
    });

    var inherits_browser = createCommonjsModule(function (module) {
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
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    });

    var require$$0 = ( util$1 && util ) || util$1;

    var inherits$2 = createCommonjsModule(function (module) {
    try {
      var util = require$$0;
      if (typeof util.inherits !== 'function') throw '';
      module.exports = util.inherits;
    } catch (e) {
      module.exports = inherits_browser;
    }
    });

    var unherit_1 = unherit;

    /* Create a custom constructor which can be modified
     * without affecting the original class. */
    function unherit(Super) {
      var result;
      var key;
      var value;

      inherits$2(Of, Super);
      inherits$2(From, Of);

      /* Clone values. */
      result = Of.prototype;

      for (key in result) {
        value = result[key];

        if (value && typeof value === 'object') {
          result[key] = 'concat' in value ? value.concat() : immutable(value);
        }
      }

      return Of

      /* Constructor accepting a single argument,
       * which itself is an `arguments` object. */
      function From(parameters) {
        return Super.apply(this, parameters)
      }

      /* Constructor accepting variadic arguments. */
      function Of() {
        if (!(this instanceof Of)) {
          return new From(arguments)
        }

        return Super.apply(this, arguments)
      }
    }

    var stateToggle = factory;

    /* Construct a state `toggler`: a function which inverses
     * `property` in context based on its current value.
     * The by `toggler` returned function restores that value. */
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

    /* Expose. */
    var vfileLocation = factory$1;

    /* Factory. */
    function factory$1(file) {
      var contents = indices(String(file));

      return {
        toPosition: offsetToPositionFactory(contents),
        toOffset: positionToOffsetFactory(contents)
      }
    }

    /* Factory to get the line and column-based `position` for
     * `offset` in the bound indices. */
    function offsetToPositionFactory(indices) {
      return offsetToPosition

      /* Get the line and column-based `position` for
       * `offset` in the bound indices. */
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

    /* Factory to get the `offset` for a line and column-based
     * `position` in the bound indices. */
    function positionToOffsetFactory(indices) {
      return positionToOffset

      /* Get the `offset` for a line and column-based
       * `position` in the bound indices. */
      function positionToOffset(position) {
        var line = position && position.line;
        var column = position && position.column;

        if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
          return (indices[line - 2] || 0) + column - 1 || 0
        }

        return -1
      }
    }

    /* Get indices of line-breaks in `value`. */
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

    var AEli = "Æ";
    var AElig = "Æ";
    var AM = "&";
    var AMP = "&";
    var Aacut = "Á";
    var Aacute = "Á";
    var Abreve = "Ă";
    var Acir = "Â";
    var Acirc = "Â";
    var Acy = "А";
    var Afr = "𝔄";
    var Agrav = "À";
    var Agrave = "À";
    var Alpha = "Α";
    var Amacr = "Ā";
    var And = "⩓";
    var Aogon = "Ą";
    var Aopf = "𝔸";
    var ApplyFunction = "⁡";
    var Arin = "Å";
    var Aring = "Å";
    var Ascr = "𝒜";
    var Assign = "≔";
    var Atild = "Ã";
    var Atilde = "Ã";
    var Aum = "Ä";
    var Auml = "Ä";
    var Backslash = "∖";
    var Barv = "⫧";
    var Barwed = "⌆";
    var Bcy = "Б";
    var Because = "∵";
    var Bernoullis = "ℬ";
    var Beta = "Β";
    var Bfr = "𝔅";
    var Bopf = "𝔹";
    var Breve = "˘";
    var Bscr = "ℬ";
    var Bumpeq = "≎";
    var CHcy = "Ч";
    var COP = "©";
    var COPY = "©";
    var Cacute = "Ć";
    var Cap = "⋒";
    var CapitalDifferentialD = "ⅅ";
    var Cayleys = "ℭ";
    var Ccaron = "Č";
    var Ccedi = "Ç";
    var Ccedil = "Ç";
    var Ccirc = "Ĉ";
    var Cconint = "∰";
    var Cdot = "Ċ";
    var Cedilla = "¸";
    var CenterDot = "·";
    var Cfr = "ℭ";
    var Chi = "Χ";
    var CircleDot = "⊙";
    var CircleMinus = "⊖";
    var CirclePlus = "⊕";
    var CircleTimes = "⊗";
    var ClockwiseContourIntegral = "∲";
    var CloseCurlyDoubleQuote = "”";
    var CloseCurlyQuote = "’";
    var Colon = "∷";
    var Colone = "⩴";
    var Congruent = "≡";
    var Conint = "∯";
    var ContourIntegral = "∮";
    var Copf = "ℂ";
    var Coproduct = "∐";
    var CounterClockwiseContourIntegral = "∳";
    var Cross = "⨯";
    var Cscr = "𝒞";
    var Cup = "⋓";
    var CupCap = "≍";
    var DD = "ⅅ";
    var DDotrahd = "⤑";
    var DJcy = "Ђ";
    var DScy = "Ѕ";
    var DZcy = "Џ";
    var Dagger = "‡";
    var Darr = "↡";
    var Dashv = "⫤";
    var Dcaron = "Ď";
    var Dcy = "Д";
    var Del = "∇";
    var Delta = "Δ";
    var Dfr = "𝔇";
    var DiacriticalAcute = "´";
    var DiacriticalDot = "˙";
    var DiacriticalDoubleAcute = "˝";
    var DiacriticalGrave = "`";
    var DiacriticalTilde = "˜";
    var Diamond = "⋄";
    var DifferentialD = "ⅆ";
    var Dopf = "𝔻";
    var Dot = "¨";
    var DotDot = "⃜";
    var DotEqual = "≐";
    var DoubleContourIntegral = "∯";
    var DoubleDot = "¨";
    var DoubleDownArrow = "⇓";
    var DoubleLeftArrow = "⇐";
    var DoubleLeftRightArrow = "⇔";
    var DoubleLeftTee = "⫤";
    var DoubleLongLeftArrow = "⟸";
    var DoubleLongLeftRightArrow = "⟺";
    var DoubleLongRightArrow = "⟹";
    var DoubleRightArrow = "⇒";
    var DoubleRightTee = "⊨";
    var DoubleUpArrow = "⇑";
    var DoubleUpDownArrow = "⇕";
    var DoubleVerticalBar = "∥";
    var DownArrow = "↓";
    var DownArrowBar = "⤓";
    var DownArrowUpArrow = "⇵";
    var DownBreve = "̑";
    var DownLeftRightVector = "⥐";
    var DownLeftTeeVector = "⥞";
    var DownLeftVector = "↽";
    var DownLeftVectorBar = "⥖";
    var DownRightTeeVector = "⥟";
    var DownRightVector = "⇁";
    var DownRightVectorBar = "⥗";
    var DownTee = "⊤";
    var DownTeeArrow = "↧";
    var Downarrow = "⇓";
    var Dscr = "𝒟";
    var Dstrok = "Đ";
    var ENG = "Ŋ";
    var ET = "Ð";
    var ETH = "Ð";
    var Eacut = "É";
    var Eacute = "É";
    var Ecaron = "Ě";
    var Ecir = "Ê";
    var Ecirc = "Ê";
    var Ecy = "Э";
    var Edot = "Ė";
    var Efr = "𝔈";
    var Egrav = "È";
    var Egrave = "È";
    var Element = "∈";
    var Emacr = "Ē";
    var EmptySmallSquare = "◻";
    var EmptyVerySmallSquare = "▫";
    var Eogon = "Ę";
    var Eopf = "𝔼";
    var Epsilon = "Ε";
    var Equal = "⩵";
    var EqualTilde = "≂";
    var Equilibrium = "⇌";
    var Escr = "ℰ";
    var Esim = "⩳";
    var Eta = "Η";
    var Eum = "Ë";
    var Euml = "Ë";
    var Exists = "∃";
    var ExponentialE = "ⅇ";
    var Fcy = "Ф";
    var Ffr = "𝔉";
    var FilledSmallSquare = "◼";
    var FilledVerySmallSquare = "▪";
    var Fopf = "𝔽";
    var ForAll = "∀";
    var Fouriertrf = "ℱ";
    var Fscr = "ℱ";
    var GJcy = "Ѓ";
    var G = ">";
    var GT = ">";
    var Gamma = "Γ";
    var Gammad = "Ϝ";
    var Gbreve = "Ğ";
    var Gcedil = "Ģ";
    var Gcirc = "Ĝ";
    var Gcy = "Г";
    var Gdot = "Ġ";
    var Gfr = "𝔊";
    var Gg = "⋙";
    var Gopf = "𝔾";
    var GreaterEqual = "≥";
    var GreaterEqualLess = "⋛";
    var GreaterFullEqual = "≧";
    var GreaterGreater = "⪢";
    var GreaterLess = "≷";
    var GreaterSlantEqual = "⩾";
    var GreaterTilde = "≳";
    var Gscr = "𝒢";
    var Gt = "≫";
    var HARDcy = "Ъ";
    var Hacek = "ˇ";
    var Hat = "^";
    var Hcirc = "Ĥ";
    var Hfr = "ℌ";
    var HilbertSpace = "ℋ";
    var Hopf = "ℍ";
    var HorizontalLine = "─";
    var Hscr = "ℋ";
    var Hstrok = "Ħ";
    var HumpDownHump = "≎";
    var HumpEqual = "≏";
    var IEcy = "Е";
    var IJlig = "Ĳ";
    var IOcy = "Ё";
    var Iacut = "Í";
    var Iacute = "Í";
    var Icir = "Î";
    var Icirc = "Î";
    var Icy = "И";
    var Idot = "İ";
    var Ifr = "ℑ";
    var Igrav = "Ì";
    var Igrave = "Ì";
    var Im = "ℑ";
    var Imacr = "Ī";
    var ImaginaryI = "ⅈ";
    var Implies = "⇒";
    var Int = "∬";
    var Integral = "∫";
    var Intersection = "⋂";
    var InvisibleComma = "⁣";
    var InvisibleTimes = "⁢";
    var Iogon = "Į";
    var Iopf = "𝕀";
    var Iota = "Ι";
    var Iscr = "ℐ";
    var Itilde = "Ĩ";
    var Iukcy = "І";
    var Ium = "Ï";
    var Iuml = "Ï";
    var Jcirc = "Ĵ";
    var Jcy = "Й";
    var Jfr = "𝔍";
    var Jopf = "𝕁";
    var Jscr = "𝒥";
    var Jsercy = "Ј";
    var Jukcy = "Є";
    var KHcy = "Х";
    var KJcy = "Ќ";
    var Kappa = "Κ";
    var Kcedil = "Ķ";
    var Kcy = "К";
    var Kfr = "𝔎";
    var Kopf = "𝕂";
    var Kscr = "𝒦";
    var LJcy = "Љ";
    var L = "<";
    var LT = "<";
    var Lacute = "Ĺ";
    var Lambda = "Λ";
    var Lang = "⟪";
    var Laplacetrf = "ℒ";
    var Larr = "↞";
    var Lcaron = "Ľ";
    var Lcedil = "Ļ";
    var Lcy = "Л";
    var LeftAngleBracket = "⟨";
    var LeftArrow = "←";
    var LeftArrowBar = "⇤";
    var LeftArrowRightArrow = "⇆";
    var LeftCeiling = "⌈";
    var LeftDoubleBracket = "⟦";
    var LeftDownTeeVector = "⥡";
    var LeftDownVector = "⇃";
    var LeftDownVectorBar = "⥙";
    var LeftFloor = "⌊";
    var LeftRightArrow = "↔";
    var LeftRightVector = "⥎";
    var LeftTee = "⊣";
    var LeftTeeArrow = "↤";
    var LeftTeeVector = "⥚";
    var LeftTriangle = "⊲";
    var LeftTriangleBar = "⧏";
    var LeftTriangleEqual = "⊴";
    var LeftUpDownVector = "⥑";
    var LeftUpTeeVector = "⥠";
    var LeftUpVector = "↿";
    var LeftUpVectorBar = "⥘";
    var LeftVector = "↼";
    var LeftVectorBar = "⥒";
    var Leftarrow = "⇐";
    var Leftrightarrow = "⇔";
    var LessEqualGreater = "⋚";
    var LessFullEqual = "≦";
    var LessGreater = "≶";
    var LessLess = "⪡";
    var LessSlantEqual = "⩽";
    var LessTilde = "≲";
    var Lfr = "𝔏";
    var Ll = "⋘";
    var Lleftarrow = "⇚";
    var Lmidot = "Ŀ";
    var LongLeftArrow = "⟵";
    var LongLeftRightArrow = "⟷";
    var LongRightArrow = "⟶";
    var Longleftarrow = "⟸";
    var Longleftrightarrow = "⟺";
    var Longrightarrow = "⟹";
    var Lopf = "𝕃";
    var LowerLeftArrow = "↙";
    var LowerRightArrow = "↘";
    var Lscr = "ℒ";
    var Lsh = "↰";
    var Lstrok = "Ł";
    var Lt = "≪";
    var Mcy = "М";
    var MediumSpace = " ";
    var Mellintrf = "ℳ";
    var Mfr = "𝔐";
    var MinusPlus = "∓";
    var Mopf = "𝕄";
    var Mscr = "ℳ";
    var Mu = "Μ";
    var NJcy = "Њ";
    var Nacute = "Ń";
    var Ncaron = "Ň";
    var Ncedil = "Ņ";
    var Ncy = "Н";
    var NegativeMediumSpace = "​";
    var NegativeThickSpace = "​";
    var NegativeThinSpace = "​";
    var NegativeVeryThinSpace = "​";
    var NestedGreaterGreater = "≫";
    var NestedLessLess = "≪";
    var NewLine = "\n";
    var Nfr = "𝔑";
    var NoBreak = "⁠";
    var NonBreakingSpace = " ";
    var Nopf = "ℕ";
    var Not = "⫬";
    var NotCongruent = "≢";
    var NotCupCap = "≭";
    var NotDoubleVerticalBar = "∦";
    var NotElement = "∉";
    var NotEqual = "≠";
    var NotEqualTilde = "≂̸";
    var NotExists = "∄";
    var NotGreater = "≯";
    var NotGreaterEqual = "≱";
    var NotGreaterFullEqual = "≧̸";
    var NotGreaterGreater = "≫̸";
    var NotGreaterLess = "≹";
    var NotGreaterSlantEqual = "⩾̸";
    var NotGreaterTilde = "≵";
    var NotHumpDownHump = "≎̸";
    var NotHumpEqual = "≏̸";
    var NotLeftTriangle = "⋪";
    var NotLeftTriangleBar = "⧏̸";
    var NotLeftTriangleEqual = "⋬";
    var NotLess = "≮";
    var NotLessEqual = "≰";
    var NotLessGreater = "≸";
    var NotLessLess = "≪̸";
    var NotLessSlantEqual = "⩽̸";
    var NotLessTilde = "≴";
    var NotNestedGreaterGreater = "⪢̸";
    var NotNestedLessLess = "⪡̸";
    var NotPrecedes = "⊀";
    var NotPrecedesEqual = "⪯̸";
    var NotPrecedesSlantEqual = "⋠";
    var NotReverseElement = "∌";
    var NotRightTriangle = "⋫";
    var NotRightTriangleBar = "⧐̸";
    var NotRightTriangleEqual = "⋭";
    var NotSquareSubset = "⊏̸";
    var NotSquareSubsetEqual = "⋢";
    var NotSquareSuperset = "⊐̸";
    var NotSquareSupersetEqual = "⋣";
    var NotSubset = "⊂⃒";
    var NotSubsetEqual = "⊈";
    var NotSucceeds = "⊁";
    var NotSucceedsEqual = "⪰̸";
    var NotSucceedsSlantEqual = "⋡";
    var NotSucceedsTilde = "≿̸";
    var NotSuperset = "⊃⃒";
    var NotSupersetEqual = "⊉";
    var NotTilde = "≁";
    var NotTildeEqual = "≄";
    var NotTildeFullEqual = "≇";
    var NotTildeTilde = "≉";
    var NotVerticalBar = "∤";
    var Nscr = "𝒩";
    var Ntild = "Ñ";
    var Ntilde = "Ñ";
    var Nu = "Ν";
    var OElig = "Œ";
    var Oacut = "Ó";
    var Oacute = "Ó";
    var Ocir = "Ô";
    var Ocirc = "Ô";
    var Ocy = "О";
    var Odblac = "Ő";
    var Ofr = "𝔒";
    var Ograv = "Ò";
    var Ograve = "Ò";
    var Omacr = "Ō";
    var Omega = "Ω";
    var Omicron = "Ο";
    var Oopf = "𝕆";
    var OpenCurlyDoubleQuote = "“";
    var OpenCurlyQuote = "‘";
    var Or = "⩔";
    var Oscr = "𝒪";
    var Oslas = "Ø";
    var Oslash = "Ø";
    var Otild = "Õ";
    var Otilde = "Õ";
    var Otimes = "⨷";
    var Oum = "Ö";
    var Ouml = "Ö";
    var OverBar = "‾";
    var OverBrace = "⏞";
    var OverBracket = "⎴";
    var OverParenthesis = "⏜";
    var PartialD = "∂";
    var Pcy = "П";
    var Pfr = "𝔓";
    var Phi = "Φ";
    var Pi = "Π";
    var PlusMinus = "±";
    var Poincareplane = "ℌ";
    var Popf = "ℙ";
    var Pr = "⪻";
    var Precedes = "≺";
    var PrecedesEqual = "⪯";
    var PrecedesSlantEqual = "≼";
    var PrecedesTilde = "≾";
    var Prime = "″";
    var Product = "∏";
    var Proportion = "∷";
    var Proportional = "∝";
    var Pscr = "𝒫";
    var Psi = "Ψ";
    var QUO = "\"";
    var QUOT = "\"";
    var Qfr = "𝔔";
    var Qopf = "ℚ";
    var Qscr = "𝒬";
    var RBarr = "⤐";
    var RE = "®";
    var REG = "®";
    var Racute = "Ŕ";
    var Rang = "⟫";
    var Rarr = "↠";
    var Rarrtl = "⤖";
    var Rcaron = "Ř";
    var Rcedil = "Ŗ";
    var Rcy = "Р";
    var Re = "ℜ";
    var ReverseElement = "∋";
    var ReverseEquilibrium = "⇋";
    var ReverseUpEquilibrium = "⥯";
    var Rfr = "ℜ";
    var Rho = "Ρ";
    var RightAngleBracket = "⟩";
    var RightArrow = "→";
    var RightArrowBar = "⇥";
    var RightArrowLeftArrow = "⇄";
    var RightCeiling = "⌉";
    var RightDoubleBracket = "⟧";
    var RightDownTeeVector = "⥝";
    var RightDownVector = "⇂";
    var RightDownVectorBar = "⥕";
    var RightFloor = "⌋";
    var RightTee = "⊢";
    var RightTeeArrow = "↦";
    var RightTeeVector = "⥛";
    var RightTriangle = "⊳";
    var RightTriangleBar = "⧐";
    var RightTriangleEqual = "⊵";
    var RightUpDownVector = "⥏";
    var RightUpTeeVector = "⥜";
    var RightUpVector = "↾";
    var RightUpVectorBar = "⥔";
    var RightVector = "⇀";
    var RightVectorBar = "⥓";
    var Rightarrow = "⇒";
    var Ropf = "ℝ";
    var RoundImplies = "⥰";
    var Rrightarrow = "⇛";
    var Rscr = "ℛ";
    var Rsh = "↱";
    var RuleDelayed = "⧴";
    var SHCHcy = "Щ";
    var SHcy = "Ш";
    var SOFTcy = "Ь";
    var Sacute = "Ś";
    var Sc = "⪼";
    var Scaron = "Š";
    var Scedil = "Ş";
    var Scirc = "Ŝ";
    var Scy = "С";
    var Sfr = "𝔖";
    var ShortDownArrow = "↓";
    var ShortLeftArrow = "←";
    var ShortRightArrow = "→";
    var ShortUpArrow = "↑";
    var Sigma = "Σ";
    var SmallCircle = "∘";
    var Sopf = "𝕊";
    var Sqrt = "√";
    var Square = "□";
    var SquareIntersection = "⊓";
    var SquareSubset = "⊏";
    var SquareSubsetEqual = "⊑";
    var SquareSuperset = "⊐";
    var SquareSupersetEqual = "⊒";
    var SquareUnion = "⊔";
    var Sscr = "𝒮";
    var Star = "⋆";
    var Sub = "⋐";
    var Subset = "⋐";
    var SubsetEqual = "⊆";
    var Succeeds = "≻";
    var SucceedsEqual = "⪰";
    var SucceedsSlantEqual = "≽";
    var SucceedsTilde = "≿";
    var SuchThat = "∋";
    var Sum = "∑";
    var Sup = "⋑";
    var Superset = "⊃";
    var SupersetEqual = "⊇";
    var Supset = "⋑";
    var THOR = "Þ";
    var THORN = "Þ";
    var TRADE = "™";
    var TSHcy = "Ћ";
    var TScy = "Ц";
    var Tab = "\t";
    var Tau = "Τ";
    var Tcaron = "Ť";
    var Tcedil = "Ţ";
    var Tcy = "Т";
    var Tfr = "𝔗";
    var Therefore = "∴";
    var Theta = "Θ";
    var ThickSpace = "  ";
    var ThinSpace = " ";
    var Tilde = "∼";
    var TildeEqual = "≃";
    var TildeFullEqual = "≅";
    var TildeTilde = "≈";
    var Topf = "𝕋";
    var TripleDot = "⃛";
    var Tscr = "𝒯";
    var Tstrok = "Ŧ";
    var Uacut = "Ú";
    var Uacute = "Ú";
    var Uarr = "↟";
    var Uarrocir = "⥉";
    var Ubrcy = "Ў";
    var Ubreve = "Ŭ";
    var Ucir = "Û";
    var Ucirc = "Û";
    var Ucy = "У";
    var Udblac = "Ű";
    var Ufr = "𝔘";
    var Ugrav = "Ù";
    var Ugrave = "Ù";
    var Umacr = "Ū";
    var UnderBar = "_";
    var UnderBrace = "⏟";
    var UnderBracket = "⎵";
    var UnderParenthesis = "⏝";
    var Union = "⋃";
    var UnionPlus = "⊎";
    var Uogon = "Ų";
    var Uopf = "𝕌";
    var UpArrow = "↑";
    var UpArrowBar = "⤒";
    var UpArrowDownArrow = "⇅";
    var UpDownArrow = "↕";
    var UpEquilibrium = "⥮";
    var UpTee = "⊥";
    var UpTeeArrow = "↥";
    var Uparrow = "⇑";
    var Updownarrow = "⇕";
    var UpperLeftArrow = "↖";
    var UpperRightArrow = "↗";
    var Upsi = "ϒ";
    var Upsilon = "Υ";
    var Uring = "Ů";
    var Uscr = "𝒰";
    var Utilde = "Ũ";
    var Uum = "Ü";
    var Uuml = "Ü";
    var VDash = "⊫";
    var Vbar = "⫫";
    var Vcy = "В";
    var Vdash = "⊩";
    var Vdashl = "⫦";
    var Vee = "⋁";
    var Verbar = "‖";
    var Vert = "‖";
    var VerticalBar = "∣";
    var VerticalLine = "|";
    var VerticalSeparator = "❘";
    var VerticalTilde = "≀";
    var VeryThinSpace = " ";
    var Vfr = "𝔙";
    var Vopf = "𝕍";
    var Vscr = "𝒱";
    var Vvdash = "⊪";
    var Wcirc = "Ŵ";
    var Wedge = "⋀";
    var Wfr = "𝔚";
    var Wopf = "𝕎";
    var Wscr = "𝒲";
    var Xfr = "𝔛";
    var Xi = "Ξ";
    var Xopf = "𝕏";
    var Xscr = "𝒳";
    var YAcy = "Я";
    var YIcy = "Ї";
    var YUcy = "Ю";
    var Yacut = "Ý";
    var Yacute = "Ý";
    var Ycirc = "Ŷ";
    var Ycy = "Ы";
    var Yfr = "𝔜";
    var Yopf = "𝕐";
    var Yscr = "𝒴";
    var Yuml = "Ÿ";
    var ZHcy = "Ж";
    var Zacute = "Ź";
    var Zcaron = "Ž";
    var Zcy = "З";
    var Zdot = "Ż";
    var ZeroWidthSpace = "​";
    var Zeta = "Ζ";
    var Zfr = "ℨ";
    var Zopf = "ℤ";
    var Zscr = "𝒵";
    var aacut = "á";
    var aacute = "á";
    var abreve = "ă";
    var ac = "∾";
    var acE = "∾̳";
    var acd = "∿";
    var acir = "â";
    var acirc = "â";
    var acut = "´";
    var acute = "´";
    var acy = "а";
    var aeli = "æ";
    var aelig = "æ";
    var af = "⁡";
    var afr = "𝔞";
    var agrav = "à";
    var agrave = "à";
    var alefsym = "ℵ";
    var aleph = "ℵ";
    var alpha = "α";
    var amacr = "ā";
    var amalg = "⨿";
    var am = "&";
    var amp = "&";
    var and = "∧";
    var andand = "⩕";
    var andd = "⩜";
    var andslope = "⩘";
    var andv = "⩚";
    var ang = "∠";
    var ange = "⦤";
    var angle = "∠";
    var angmsd = "∡";
    var angmsdaa = "⦨";
    var angmsdab = "⦩";
    var angmsdac = "⦪";
    var angmsdad = "⦫";
    var angmsdae = "⦬";
    var angmsdaf = "⦭";
    var angmsdag = "⦮";
    var angmsdah = "⦯";
    var angrt = "∟";
    var angrtvb = "⊾";
    var angrtvbd = "⦝";
    var angsph = "∢";
    var angst = "Å";
    var angzarr = "⍼";
    var aogon = "ą";
    var aopf = "𝕒";
    var ap = "≈";
    var apE = "⩰";
    var apacir = "⩯";
    var ape = "≊";
    var apid = "≋";
    var apos = "'";
    var approx = "≈";
    var approxeq = "≊";
    var arin = "å";
    var aring = "å";
    var ascr = "𝒶";
    var ast = "*";
    var asymp = "≈";
    var asympeq = "≍";
    var atild = "ã";
    var atilde = "ã";
    var aum = "ä";
    var auml = "ä";
    var awconint = "∳";
    var awint = "⨑";
    var bNot = "⫭";
    var backcong = "≌";
    var backepsilon = "϶";
    var backprime = "‵";
    var backsim = "∽";
    var backsimeq = "⋍";
    var barvee = "⊽";
    var barwed = "⌅";
    var barwedge = "⌅";
    var bbrk = "⎵";
    var bbrktbrk = "⎶";
    var bcong = "≌";
    var bcy = "б";
    var bdquo = "„";
    var becaus = "∵";
    var because = "∵";
    var bemptyv = "⦰";
    var bepsi = "϶";
    var bernou = "ℬ";
    var beta = "β";
    var beth = "ℶ";
    var between = "≬";
    var bfr = "𝔟";
    var bigcap = "⋂";
    var bigcirc = "◯";
    var bigcup = "⋃";
    var bigodot = "⨀";
    var bigoplus = "⨁";
    var bigotimes = "⨂";
    var bigsqcup = "⨆";
    var bigstar = "★";
    var bigtriangledown = "▽";
    var bigtriangleup = "△";
    var biguplus = "⨄";
    var bigvee = "⋁";
    var bigwedge = "⋀";
    var bkarow = "⤍";
    var blacklozenge = "⧫";
    var blacksquare = "▪";
    var blacktriangle = "▴";
    var blacktriangledown = "▾";
    var blacktriangleleft = "◂";
    var blacktriangleright = "▸";
    var blank = "␣";
    var blk12 = "▒";
    var blk14 = "░";
    var blk34 = "▓";
    var block = "█";
    var bne = "=⃥";
    var bnequiv = "≡⃥";
    var bnot = "⌐";
    var bopf = "𝕓";
    var bot = "⊥";
    var bottom = "⊥";
    var bowtie = "⋈";
    var boxDL = "╗";
    var boxDR = "╔";
    var boxDl = "╖";
    var boxDr = "╓";
    var boxH = "═";
    var boxHD = "╦";
    var boxHU = "╩";
    var boxHd = "╤";
    var boxHu = "╧";
    var boxUL = "╝";
    var boxUR = "╚";
    var boxUl = "╜";
    var boxUr = "╙";
    var boxV = "║";
    var boxVH = "╬";
    var boxVL = "╣";
    var boxVR = "╠";
    var boxVh = "╫";
    var boxVl = "╢";
    var boxVr = "╟";
    var boxbox = "⧉";
    var boxdL = "╕";
    var boxdR = "╒";
    var boxdl = "┐";
    var boxdr = "┌";
    var boxh = "─";
    var boxhD = "╥";
    var boxhU = "╨";
    var boxhd = "┬";
    var boxhu = "┴";
    var boxminus = "⊟";
    var boxplus = "⊞";
    var boxtimes = "⊠";
    var boxuL = "╛";
    var boxuR = "╘";
    var boxul = "┘";
    var boxur = "└";
    var boxv = "│";
    var boxvH = "╪";
    var boxvL = "╡";
    var boxvR = "╞";
    var boxvh = "┼";
    var boxvl = "┤";
    var boxvr = "├";
    var bprime = "‵";
    var breve = "˘";
    var brvba = "¦";
    var brvbar = "¦";
    var bscr = "𝒷";
    var bsemi = "⁏";
    var bsim = "∽";
    var bsime = "⋍";
    var bsol = "\\";
    var bsolb = "⧅";
    var bsolhsub = "⟈";
    var bull = "•";
    var bullet = "•";
    var bump = "≎";
    var bumpE = "⪮";
    var bumpe = "≏";
    var bumpeq = "≏";
    var cacute = "ć";
    var cap = "∩";
    var capand = "⩄";
    var capbrcup = "⩉";
    var capcap = "⩋";
    var capcup = "⩇";
    var capdot = "⩀";
    var caps = "∩︀";
    var caret = "⁁";
    var caron = "ˇ";
    var ccaps = "⩍";
    var ccaron = "č";
    var ccedi = "ç";
    var ccedil = "ç";
    var ccirc = "ĉ";
    var ccups = "⩌";
    var ccupssm = "⩐";
    var cdot = "ċ";
    var cedi = "¸";
    var cedil = "¸";
    var cemptyv = "⦲";
    var cen = "¢";
    var cent = "¢";
    var centerdot = "·";
    var cfr = "𝔠";
    var chcy = "ч";
    var check = "✓";
    var checkmark = "✓";
    var chi = "χ";
    var cir = "○";
    var cirE = "⧃";
    var circ = "ˆ";
    var circeq = "≗";
    var circlearrowleft = "↺";
    var circlearrowright = "↻";
    var circledR = "®";
    var circledS = "Ⓢ";
    var circledast = "⊛";
    var circledcirc = "⊚";
    var circleddash = "⊝";
    var cire = "≗";
    var cirfnint = "⨐";
    var cirmid = "⫯";
    var cirscir = "⧂";
    var clubs = "♣";
    var clubsuit = "♣";
    var colon = ":";
    var colone = "≔";
    var coloneq = "≔";
    var comma = ",";
    var commat = "@";
    var comp = "∁";
    var compfn = "∘";
    var complement = "∁";
    var complexes = "ℂ";
    var cong = "≅";
    var congdot = "⩭";
    var conint = "∮";
    var copf = "𝕔";
    var coprod = "∐";
    var cop = "©";
    var copy = "©";
    var copysr = "℗";
    var crarr = "↵";
    var cross = "✗";
    var cscr = "𝒸";
    var csub = "⫏";
    var csube = "⫑";
    var csup = "⫐";
    var csupe = "⫒";
    var ctdot = "⋯";
    var cudarrl = "⤸";
    var cudarrr = "⤵";
    var cuepr = "⋞";
    var cuesc = "⋟";
    var cularr = "↶";
    var cularrp = "⤽";
    var cup = "∪";
    var cupbrcap = "⩈";
    var cupcap = "⩆";
    var cupcup = "⩊";
    var cupdot = "⊍";
    var cupor = "⩅";
    var cups = "∪︀";
    var curarr = "↷";
    var curarrm = "⤼";
    var curlyeqprec = "⋞";
    var curlyeqsucc = "⋟";
    var curlyvee = "⋎";
    var curlywedge = "⋏";
    var curre = "¤";
    var curren = "¤";
    var curvearrowleft = "↶";
    var curvearrowright = "↷";
    var cuvee = "⋎";
    var cuwed = "⋏";
    var cwconint = "∲";
    var cwint = "∱";
    var cylcty = "⌭";
    var dArr = "⇓";
    var dHar = "⥥";
    var dagger = "†";
    var daleth = "ℸ";
    var darr = "↓";
    var dash = "‐";
    var dashv = "⊣";
    var dbkarow = "⤏";
    var dblac = "˝";
    var dcaron = "ď";
    var dcy = "д";
    var dd = "ⅆ";
    var ddagger = "‡";
    var ddarr = "⇊";
    var ddotseq = "⩷";
    var de = "°";
    var deg = "°";
    var delta = "δ";
    var demptyv = "⦱";
    var dfisht = "⥿";
    var dfr = "𝔡";
    var dharl = "⇃";
    var dharr = "⇂";
    var diam = "⋄";
    var diamond = "⋄";
    var diamondsuit = "♦";
    var diams = "♦";
    var die = "¨";
    var digamma = "ϝ";
    var disin = "⋲";
    var div = "÷";
    var divid = "÷";
    var divide = "÷";
    var divideontimes = "⋇";
    var divonx = "⋇";
    var djcy = "ђ";
    var dlcorn = "⌞";
    var dlcrop = "⌍";
    var dollar = "$";
    var dopf = "𝕕";
    var dot = "˙";
    var doteq = "≐";
    var doteqdot = "≑";
    var dotminus = "∸";
    var dotplus = "∔";
    var dotsquare = "⊡";
    var doublebarwedge = "⌆";
    var downarrow = "↓";
    var downdownarrows = "⇊";
    var downharpoonleft = "⇃";
    var downharpoonright = "⇂";
    var drbkarow = "⤐";
    var drcorn = "⌟";
    var drcrop = "⌌";
    var dscr = "𝒹";
    var dscy = "ѕ";
    var dsol = "⧶";
    var dstrok = "đ";
    var dtdot = "⋱";
    var dtri = "▿";
    var dtrif = "▾";
    var duarr = "⇵";
    var duhar = "⥯";
    var dwangle = "⦦";
    var dzcy = "џ";
    var dzigrarr = "⟿";
    var eDDot = "⩷";
    var eDot = "≑";
    var eacut = "é";
    var eacute = "é";
    var easter = "⩮";
    var ecaron = "ě";
    var ecir = "ê";
    var ecirc = "ê";
    var ecolon = "≕";
    var ecy = "э";
    var edot = "ė";
    var ee = "ⅇ";
    var efDot = "≒";
    var efr = "𝔢";
    var eg = "⪚";
    var egrav = "è";
    var egrave = "è";
    var egs = "⪖";
    var egsdot = "⪘";
    var el = "⪙";
    var elinters = "⏧";
    var ell = "ℓ";
    var els = "⪕";
    var elsdot = "⪗";
    var emacr = "ē";
    var empty = "∅";
    var emptyset = "∅";
    var emptyv = "∅";
    var emsp13 = " ";
    var emsp14 = " ";
    var emsp = " ";
    var eng = "ŋ";
    var ensp = " ";
    var eogon = "ę";
    var eopf = "𝕖";
    var epar = "⋕";
    var eparsl = "⧣";
    var eplus = "⩱";
    var epsi = "ε";
    var epsilon = "ε";
    var epsiv = "ϵ";
    var eqcirc = "≖";
    var eqcolon = "≕";
    var eqsim = "≂";
    var eqslantgtr = "⪖";
    var eqslantless = "⪕";
    var equals = "=";
    var equest = "≟";
    var equiv = "≡";
    var equivDD = "⩸";
    var eqvparsl = "⧥";
    var erDot = "≓";
    var erarr = "⥱";
    var escr = "ℯ";
    var esdot = "≐";
    var esim = "≂";
    var eta = "η";
    var et = "ð";
    var eth = "ð";
    var eum = "ë";
    var euml = "ë";
    var euro = "€";
    var excl = "!";
    var exist = "∃";
    var expectation = "ℰ";
    var exponentiale = "ⅇ";
    var fallingdotseq = "≒";
    var fcy = "ф";
    var female = "♀";
    var ffilig = "ﬃ";
    var fflig = "ﬀ";
    var ffllig = "ﬄ";
    var ffr = "𝔣";
    var filig = "ﬁ";
    var fjlig = "fj";
    var flat = "♭";
    var fllig = "ﬂ";
    var fltns = "▱";
    var fnof = "ƒ";
    var fopf = "𝕗";
    var forall = "∀";
    var fork = "⋔";
    var forkv = "⫙";
    var fpartint = "⨍";
    var frac1 = "¼";
    var frac12 = "½";
    var frac13 = "⅓";
    var frac14 = "¼";
    var frac15 = "⅕";
    var frac16 = "⅙";
    var frac18 = "⅛";
    var frac23 = "⅔";
    var frac25 = "⅖";
    var frac3 = "¾";
    var frac34 = "¾";
    var frac35 = "⅗";
    var frac38 = "⅜";
    var frac45 = "⅘";
    var frac56 = "⅚";
    var frac58 = "⅝";
    var frac78 = "⅞";
    var frasl = "⁄";
    var frown = "⌢";
    var fscr = "𝒻";
    var gE = "≧";
    var gEl = "⪌";
    var gacute = "ǵ";
    var gamma = "γ";
    var gammad = "ϝ";
    var gap = "⪆";
    var gbreve = "ğ";
    var gcirc = "ĝ";
    var gcy = "г";
    var gdot = "ġ";
    var ge = "≥";
    var gel = "⋛";
    var geq = "≥";
    var geqq = "≧";
    var geqslant = "⩾";
    var ges = "⩾";
    var gescc = "⪩";
    var gesdot = "⪀";
    var gesdoto = "⪂";
    var gesdotol = "⪄";
    var gesl = "⋛︀";
    var gesles = "⪔";
    var gfr = "𝔤";
    var gg = "≫";
    var ggg = "⋙";
    var gimel = "ℷ";
    var gjcy = "ѓ";
    var gl = "≷";
    var glE = "⪒";
    var gla = "⪥";
    var glj = "⪤";
    var gnE = "≩";
    var gnap = "⪊";
    var gnapprox = "⪊";
    var gne = "⪈";
    var gneq = "⪈";
    var gneqq = "≩";
    var gnsim = "⋧";
    var gopf = "𝕘";
    var grave = "`";
    var gscr = "ℊ";
    var gsim = "≳";
    var gsime = "⪎";
    var gsiml = "⪐";
    var g = ">";
    var gt = ">";
    var gtcc = "⪧";
    var gtcir = "⩺";
    var gtdot = "⋗";
    var gtlPar = "⦕";
    var gtquest = "⩼";
    var gtrapprox = "⪆";
    var gtrarr = "⥸";
    var gtrdot = "⋗";
    var gtreqless = "⋛";
    var gtreqqless = "⪌";
    var gtrless = "≷";
    var gtrsim = "≳";
    var gvertneqq = "≩︀";
    var gvnE = "≩︀";
    var hArr = "⇔";
    var hairsp = " ";
    var half = "½";
    var hamilt = "ℋ";
    var hardcy = "ъ";
    var harr = "↔";
    var harrcir = "⥈";
    var harrw = "↭";
    var hbar = "ℏ";
    var hcirc = "ĥ";
    var hearts = "♥";
    var heartsuit = "♥";
    var hellip = "…";
    var hercon = "⊹";
    var hfr = "𝔥";
    var hksearow = "⤥";
    var hkswarow = "⤦";
    var hoarr = "⇿";
    var homtht = "∻";
    var hookleftarrow = "↩";
    var hookrightarrow = "↪";
    var hopf = "𝕙";
    var horbar = "―";
    var hscr = "𝒽";
    var hslash = "ℏ";
    var hstrok = "ħ";
    var hybull = "⁃";
    var hyphen = "‐";
    var iacut = "í";
    var iacute = "í";
    var ic = "⁣";
    var icir = "î";
    var icirc = "î";
    var icy = "и";
    var iecy = "е";
    var iexc = "¡";
    var iexcl = "¡";
    var iff = "⇔";
    var ifr = "𝔦";
    var igrav = "ì";
    var igrave = "ì";
    var ii = "ⅈ";
    var iiiint = "⨌";
    var iiint = "∭";
    var iinfin = "⧜";
    var iiota = "℩";
    var ijlig = "ĳ";
    var imacr = "ī";
    var image = "ℑ";
    var imagline = "ℐ";
    var imagpart = "ℑ";
    var imath = "ı";
    var imof = "⊷";
    var imped = "Ƶ";
    var incare = "℅";
    var infin = "∞";
    var infintie = "⧝";
    var inodot = "ı";
    var int = "∫";
    var intcal = "⊺";
    var integers = "ℤ";
    var intercal = "⊺";
    var intlarhk = "⨗";
    var intprod = "⨼";
    var iocy = "ё";
    var iogon = "į";
    var iopf = "𝕚";
    var iota = "ι";
    var iprod = "⨼";
    var iques = "¿";
    var iquest = "¿";
    var iscr = "𝒾";
    var isin = "∈";
    var isinE = "⋹";
    var isindot = "⋵";
    var isins = "⋴";
    var isinsv = "⋳";
    var isinv = "∈";
    var it = "⁢";
    var itilde = "ĩ";
    var iukcy = "і";
    var ium = "ï";
    var iuml = "ï";
    var jcirc = "ĵ";
    var jcy = "й";
    var jfr = "𝔧";
    var jmath = "ȷ";
    var jopf = "𝕛";
    var jscr = "𝒿";
    var jsercy = "ј";
    var jukcy = "є";
    var kappa = "κ";
    var kappav = "ϰ";
    var kcedil = "ķ";
    var kcy = "к";
    var kfr = "𝔨";
    var kgreen = "ĸ";
    var khcy = "х";
    var kjcy = "ќ";
    var kopf = "𝕜";
    var kscr = "𝓀";
    var lAarr = "⇚";
    var lArr = "⇐";
    var lAtail = "⤛";
    var lBarr = "⤎";
    var lE = "≦";
    var lEg = "⪋";
    var lHar = "⥢";
    var lacute = "ĺ";
    var laemptyv = "⦴";
    var lagran = "ℒ";
    var lambda = "λ";
    var lang = "⟨";
    var langd = "⦑";
    var langle = "⟨";
    var lap = "⪅";
    var laqu = "«";
    var laquo = "«";
    var larr = "←";
    var larrb = "⇤";
    var larrbfs = "⤟";
    var larrfs = "⤝";
    var larrhk = "↩";
    var larrlp = "↫";
    var larrpl = "⤹";
    var larrsim = "⥳";
    var larrtl = "↢";
    var lat = "⪫";
    var latail = "⤙";
    var late = "⪭";
    var lates = "⪭︀";
    var lbarr = "⤌";
    var lbbrk = "❲";
    var lbrace = "{";
    var lbrack = "[";
    var lbrke = "⦋";
    var lbrksld = "⦏";
    var lbrkslu = "⦍";
    var lcaron = "ľ";
    var lcedil = "ļ";
    var lceil = "⌈";
    var lcub = "{";
    var lcy = "л";
    var ldca = "⤶";
    var ldquo = "“";
    var ldquor = "„";
    var ldrdhar = "⥧";
    var ldrushar = "⥋";
    var ldsh = "↲";
    var le = "≤";
    var leftarrow = "←";
    var leftarrowtail = "↢";
    var leftharpoondown = "↽";
    var leftharpoonup = "↼";
    var leftleftarrows = "⇇";
    var leftrightarrow = "↔";
    var leftrightarrows = "⇆";
    var leftrightharpoons = "⇋";
    var leftrightsquigarrow = "↭";
    var leftthreetimes = "⋋";
    var leg = "⋚";
    var leq = "≤";
    var leqq = "≦";
    var leqslant = "⩽";
    var les = "⩽";
    var lescc = "⪨";
    var lesdot = "⩿";
    var lesdoto = "⪁";
    var lesdotor = "⪃";
    var lesg = "⋚︀";
    var lesges = "⪓";
    var lessapprox = "⪅";
    var lessdot = "⋖";
    var lesseqgtr = "⋚";
    var lesseqqgtr = "⪋";
    var lessgtr = "≶";
    var lesssim = "≲";
    var lfisht = "⥼";
    var lfloor = "⌊";
    var lfr = "𝔩";
    var lg = "≶";
    var lgE = "⪑";
    var lhard = "↽";
    var lharu = "↼";
    var lharul = "⥪";
    var lhblk = "▄";
    var ljcy = "љ";
    var ll = "≪";
    var llarr = "⇇";
    var llcorner = "⌞";
    var llhard = "⥫";
    var lltri = "◺";
    var lmidot = "ŀ";
    var lmoust = "⎰";
    var lmoustache = "⎰";
    var lnE = "≨";
    var lnap = "⪉";
    var lnapprox = "⪉";
    var lne = "⪇";
    var lneq = "⪇";
    var lneqq = "≨";
    var lnsim = "⋦";
    var loang = "⟬";
    var loarr = "⇽";
    var lobrk = "⟦";
    var longleftarrow = "⟵";
    var longleftrightarrow = "⟷";
    var longmapsto = "⟼";
    var longrightarrow = "⟶";
    var looparrowleft = "↫";
    var looparrowright = "↬";
    var lopar = "⦅";
    var lopf = "𝕝";
    var loplus = "⨭";
    var lotimes = "⨴";
    var lowast = "∗";
    var lowbar = "_";
    var loz = "◊";
    var lozenge = "◊";
    var lozf = "⧫";
    var lpar = "(";
    var lparlt = "⦓";
    var lrarr = "⇆";
    var lrcorner = "⌟";
    var lrhar = "⇋";
    var lrhard = "⥭";
    var lrm = "‎";
    var lrtri = "⊿";
    var lsaquo = "‹";
    var lscr = "𝓁";
    var lsh = "↰";
    var lsim = "≲";
    var lsime = "⪍";
    var lsimg = "⪏";
    var lsqb = "[";
    var lsquo = "‘";
    var lsquor = "‚";
    var lstrok = "ł";
    var l = "<";
    var lt = "<";
    var ltcc = "⪦";
    var ltcir = "⩹";
    var ltdot = "⋖";
    var lthree = "⋋";
    var ltimes = "⋉";
    var ltlarr = "⥶";
    var ltquest = "⩻";
    var ltrPar = "⦖";
    var ltri = "◃";
    var ltrie = "⊴";
    var ltrif = "◂";
    var lurdshar = "⥊";
    var luruhar = "⥦";
    var lvertneqq = "≨︀";
    var lvnE = "≨︀";
    var mDDot = "∺";
    var mac = "¯";
    var macr = "¯";
    var male = "♂";
    var malt = "✠";
    var maltese = "✠";
    var map = "↦";
    var mapsto = "↦";
    var mapstodown = "↧";
    var mapstoleft = "↤";
    var mapstoup = "↥";
    var marker = "▮";
    var mcomma = "⨩";
    var mcy = "м";
    var mdash = "—";
    var measuredangle = "∡";
    var mfr = "𝔪";
    var mho = "℧";
    var micr = "µ";
    var micro = "µ";
    var mid = "∣";
    var midast = "*";
    var midcir = "⫰";
    var middo = "·";
    var middot = "·";
    var minus = "−";
    var minusb = "⊟";
    var minusd = "∸";
    var minusdu = "⨪";
    var mlcp = "⫛";
    var mldr = "…";
    var mnplus = "∓";
    var models = "⊧";
    var mopf = "𝕞";
    var mp = "∓";
    var mscr = "𝓂";
    var mstpos = "∾";
    var mu = "μ";
    var multimap = "⊸";
    var mumap = "⊸";
    var nGg = "⋙̸";
    var nGt = "≫⃒";
    var nGtv = "≫̸";
    var nLeftarrow = "⇍";
    var nLeftrightarrow = "⇎";
    var nLl = "⋘̸";
    var nLt = "≪⃒";
    var nLtv = "≪̸";
    var nRightarrow = "⇏";
    var nVDash = "⊯";
    var nVdash = "⊮";
    var nabla = "∇";
    var nacute = "ń";
    var nang = "∠⃒";
    var nap = "≉";
    var napE = "⩰̸";
    var napid = "≋̸";
    var napos = "ŉ";
    var napprox = "≉";
    var natur = "♮";
    var natural = "♮";
    var naturals = "ℕ";
    var nbs = " ";
    var nbsp = " ";
    var nbump = "≎̸";
    var nbumpe = "≏̸";
    var ncap = "⩃";
    var ncaron = "ň";
    var ncedil = "ņ";
    var ncong = "≇";
    var ncongdot = "⩭̸";
    var ncup = "⩂";
    var ncy = "н";
    var ndash = "–";
    var ne = "≠";
    var neArr = "⇗";
    var nearhk = "⤤";
    var nearr = "↗";
    var nearrow = "↗";
    var nedot = "≐̸";
    var nequiv = "≢";
    var nesear = "⤨";
    var nesim = "≂̸";
    var nexist = "∄";
    var nexists = "∄";
    var nfr = "𝔫";
    var ngE = "≧̸";
    var nge = "≱";
    var ngeq = "≱";
    var ngeqq = "≧̸";
    var ngeqslant = "⩾̸";
    var nges = "⩾̸";
    var ngsim = "≵";
    var ngt = "≯";
    var ngtr = "≯";
    var nhArr = "⇎";
    var nharr = "↮";
    var nhpar = "⫲";
    var ni = "∋";
    var nis = "⋼";
    var nisd = "⋺";
    var niv = "∋";
    var njcy = "њ";
    var nlArr = "⇍";
    var nlE = "≦̸";
    var nlarr = "↚";
    var nldr = "‥";
    var nle = "≰";
    var nleftarrow = "↚";
    var nleftrightarrow = "↮";
    var nleq = "≰";
    var nleqq = "≦̸";
    var nleqslant = "⩽̸";
    var nles = "⩽̸";
    var nless = "≮";
    var nlsim = "≴";
    var nlt = "≮";
    var nltri = "⋪";
    var nltrie = "⋬";
    var nmid = "∤";
    var nopf = "𝕟";
    var no = "¬";
    var not = "¬";
    var notin = "∉";
    var notinE = "⋹̸";
    var notindot = "⋵̸";
    var notinva = "∉";
    var notinvb = "⋷";
    var notinvc = "⋶";
    var notni = "∌";
    var notniva = "∌";
    var notnivb = "⋾";
    var notnivc = "⋽";
    var npar = "∦";
    var nparallel = "∦";
    var nparsl = "⫽⃥";
    var npart = "∂̸";
    var npolint = "⨔";
    var npr = "⊀";
    var nprcue = "⋠";
    var npre = "⪯̸";
    var nprec = "⊀";
    var npreceq = "⪯̸";
    var nrArr = "⇏";
    var nrarr = "↛";
    var nrarrc = "⤳̸";
    var nrarrw = "↝̸";
    var nrightarrow = "↛";
    var nrtri = "⋫";
    var nrtrie = "⋭";
    var nsc = "⊁";
    var nsccue = "⋡";
    var nsce = "⪰̸";
    var nscr = "𝓃";
    var nshortmid = "∤";
    var nshortparallel = "∦";
    var nsim = "≁";
    var nsime = "≄";
    var nsimeq = "≄";
    var nsmid = "∤";
    var nspar = "∦";
    var nsqsube = "⋢";
    var nsqsupe = "⋣";
    var nsub = "⊄";
    var nsubE = "⫅̸";
    var nsube = "⊈";
    var nsubset = "⊂⃒";
    var nsubseteq = "⊈";
    var nsubseteqq = "⫅̸";
    var nsucc = "⊁";
    var nsucceq = "⪰̸";
    var nsup = "⊅";
    var nsupE = "⫆̸";
    var nsupe = "⊉";
    var nsupset = "⊃⃒";
    var nsupseteq = "⊉";
    var nsupseteqq = "⫆̸";
    var ntgl = "≹";
    var ntild = "ñ";
    var ntilde = "ñ";
    var ntlg = "≸";
    var ntriangleleft = "⋪";
    var ntrianglelefteq = "⋬";
    var ntriangleright = "⋫";
    var ntrianglerighteq = "⋭";
    var nu = "ν";
    var num = "#";
    var numero = "№";
    var numsp = " ";
    var nvDash = "⊭";
    var nvHarr = "⤄";
    var nvap = "≍⃒";
    var nvdash = "⊬";
    var nvge = "≥⃒";
    var nvgt = ">⃒";
    var nvinfin = "⧞";
    var nvlArr = "⤂";
    var nvle = "≤⃒";
    var nvlt = "<⃒";
    var nvltrie = "⊴⃒";
    var nvrArr = "⤃";
    var nvrtrie = "⊵⃒";
    var nvsim = "∼⃒";
    var nwArr = "⇖";
    var nwarhk = "⤣";
    var nwarr = "↖";
    var nwarrow = "↖";
    var nwnear = "⤧";
    var oS = "Ⓢ";
    var oacut = "ó";
    var oacute = "ó";
    var oast = "⊛";
    var ocir = "ô";
    var ocirc = "ô";
    var ocy = "о";
    var odash = "⊝";
    var odblac = "ő";
    var odiv = "⨸";
    var odot = "⊙";
    var odsold = "⦼";
    var oelig = "œ";
    var ofcir = "⦿";
    var ofr = "𝔬";
    var ogon = "˛";
    var ograv = "ò";
    var ograve = "ò";
    var ogt = "⧁";
    var ohbar = "⦵";
    var ohm = "Ω";
    var oint = "∮";
    var olarr = "↺";
    var olcir = "⦾";
    var olcross = "⦻";
    var oline = "‾";
    var olt = "⧀";
    var omacr = "ō";
    var omega = "ω";
    var omicron = "ο";
    var omid = "⦶";
    var ominus = "⊖";
    var oopf = "𝕠";
    var opar = "⦷";
    var operp = "⦹";
    var oplus = "⊕";
    var or = "∨";
    var orarr = "↻";
    var ord = "º";
    var order$1 = "ℴ";
    var orderof = "ℴ";
    var ordf = "ª";
    var ordm = "º";
    var origof = "⊶";
    var oror = "⩖";
    var orslope = "⩗";
    var orv = "⩛";
    var oscr = "ℴ";
    var oslas = "ø";
    var oslash = "ø";
    var osol = "⊘";
    var otild = "õ";
    var otilde = "õ";
    var otimes = "⊗";
    var otimesas = "⨶";
    var oum = "ö";
    var ouml = "ö";
    var ovbar = "⌽";
    var par = "¶";
    var para = "¶";
    var parallel = "∥";
    var parsim = "⫳";
    var parsl = "⫽";
    var part = "∂";
    var pcy = "п";
    var percnt = "%";
    var period = ".";
    var permil = "‰";
    var perp = "⊥";
    var pertenk = "‱";
    var pfr = "𝔭";
    var phi = "φ";
    var phiv = "ϕ";
    var phmmat = "ℳ";
    var phone = "☎";
    var pi = "π";
    var pitchfork = "⋔";
    var piv = "ϖ";
    var planck = "ℏ";
    var planckh = "ℎ";
    var plankv = "ℏ";
    var plus = "+";
    var plusacir = "⨣";
    var plusb = "⊞";
    var pluscir = "⨢";
    var plusdo = "∔";
    var plusdu = "⨥";
    var pluse = "⩲";
    var plusm = "±";
    var plusmn = "±";
    var plussim = "⨦";
    var plustwo = "⨧";
    var pm = "±";
    var pointint = "⨕";
    var popf = "𝕡";
    var poun = "£";
    var pound = "£";
    var pr = "≺";
    var prE = "⪳";
    var prap = "⪷";
    var prcue = "≼";
    var pre = "⪯";
    var prec = "≺";
    var precapprox = "⪷";
    var preccurlyeq = "≼";
    var preceq = "⪯";
    var precnapprox = "⪹";
    var precneqq = "⪵";
    var precnsim = "⋨";
    var precsim = "≾";
    var prime = "′";
    var primes = "ℙ";
    var prnE = "⪵";
    var prnap = "⪹";
    var prnsim = "⋨";
    var prod = "∏";
    var profalar = "⌮";
    var profline = "⌒";
    var profsurf = "⌓";
    var prop = "∝";
    var propto = "∝";
    var prsim = "≾";
    var prurel = "⊰";
    var pscr = "𝓅";
    var psi = "ψ";
    var puncsp = " ";
    var qfr = "𝔮";
    var qint = "⨌";
    var qopf = "𝕢";
    var qprime = "⁗";
    var qscr = "𝓆";
    var quaternions = "ℍ";
    var quatint = "⨖";
    var quest = "?";
    var questeq = "≟";
    var quo = "\"";
    var quot = "\"";
    var rAarr = "⇛";
    var rArr = "⇒";
    var rAtail = "⤜";
    var rBarr = "⤏";
    var rHar = "⥤";
    var race = "∽̱";
    var racute = "ŕ";
    var radic = "√";
    var raemptyv = "⦳";
    var rang = "⟩";
    var rangd = "⦒";
    var range = "⦥";
    var rangle = "⟩";
    var raqu = "»";
    var raquo = "»";
    var rarr = "→";
    var rarrap = "⥵";
    var rarrb = "⇥";
    var rarrbfs = "⤠";
    var rarrc = "⤳";
    var rarrfs = "⤞";
    var rarrhk = "↪";
    var rarrlp = "↬";
    var rarrpl = "⥅";
    var rarrsim = "⥴";
    var rarrtl = "↣";
    var rarrw = "↝";
    var ratail = "⤚";
    var ratio = "∶";
    var rationals = "ℚ";
    var rbarr = "⤍";
    var rbbrk = "❳";
    var rbrace = "}";
    var rbrack = "]";
    var rbrke = "⦌";
    var rbrksld = "⦎";
    var rbrkslu = "⦐";
    var rcaron = "ř";
    var rcedil = "ŗ";
    var rceil = "⌉";
    var rcub = "}";
    var rcy = "р";
    var rdca = "⤷";
    var rdldhar = "⥩";
    var rdquo = "”";
    var rdquor = "”";
    var rdsh = "↳";
    var real = "ℜ";
    var realine = "ℛ";
    var realpart = "ℜ";
    var reals = "ℝ";
    var rect = "▭";
    var re = "®";
    var reg = "®";
    var rfisht = "⥽";
    var rfloor = "⌋";
    var rfr = "𝔯";
    var rhard = "⇁";
    var rharu = "⇀";
    var rharul = "⥬";
    var rho = "ρ";
    var rhov = "ϱ";
    var rightarrow = "→";
    var rightarrowtail = "↣";
    var rightharpoondown = "⇁";
    var rightharpoonup = "⇀";
    var rightleftarrows = "⇄";
    var rightleftharpoons = "⇌";
    var rightrightarrows = "⇉";
    var rightsquigarrow = "↝";
    var rightthreetimes = "⋌";
    var ring = "˚";
    var risingdotseq = "≓";
    var rlarr = "⇄";
    var rlhar = "⇌";
    var rlm = "‏";
    var rmoust = "⎱";
    var rmoustache = "⎱";
    var rnmid = "⫮";
    var roang = "⟭";
    var roarr = "⇾";
    var robrk = "⟧";
    var ropar = "⦆";
    var ropf = "𝕣";
    var roplus = "⨮";
    var rotimes = "⨵";
    var rpar = ")";
    var rpargt = "⦔";
    var rppolint = "⨒";
    var rrarr = "⇉";
    var rsaquo = "›";
    var rscr = "𝓇";
    var rsh = "↱";
    var rsqb = "]";
    var rsquo = "’";
    var rsquor = "’";
    var rthree = "⋌";
    var rtimes = "⋊";
    var rtri = "▹";
    var rtrie = "⊵";
    var rtrif = "▸";
    var rtriltri = "⧎";
    var ruluhar = "⥨";
    var rx = "℞";
    var sacute = "ś";
    var sbquo = "‚";
    var sc = "≻";
    var scE = "⪴";
    var scap = "⪸";
    var scaron = "š";
    var sccue = "≽";
    var sce = "⪰";
    var scedil = "ş";
    var scirc = "ŝ";
    var scnE = "⪶";
    var scnap = "⪺";
    var scnsim = "⋩";
    var scpolint = "⨓";
    var scsim = "≿";
    var scy = "с";
    var sdot = "⋅";
    var sdotb = "⊡";
    var sdote = "⩦";
    var seArr = "⇘";
    var searhk = "⤥";
    var searr = "↘";
    var searrow = "↘";
    var sec = "§";
    var sect = "§";
    var semi = ";";
    var seswar = "⤩";
    var setminus = "∖";
    var setmn = "∖";
    var sext = "✶";
    var sfr = "𝔰";
    var sfrown = "⌢";
    var sharp = "♯";
    var shchcy = "щ";
    var shcy = "ш";
    var shortmid = "∣";
    var shortparallel = "∥";
    var sh = "­";
    var shy = "­";
    var sigma = "σ";
    var sigmaf = "ς";
    var sigmav = "ς";
    var sim = "∼";
    var simdot = "⩪";
    var sime = "≃";
    var simeq = "≃";
    var simg = "⪞";
    var simgE = "⪠";
    var siml = "⪝";
    var simlE = "⪟";
    var simne = "≆";
    var simplus = "⨤";
    var simrarr = "⥲";
    var slarr = "←";
    var smallsetminus = "∖";
    var smashp = "⨳";
    var smeparsl = "⧤";
    var smid = "∣";
    var smile = "⌣";
    var smt = "⪪";
    var smte = "⪬";
    var smtes = "⪬︀";
    var softcy = "ь";
    var sol = "/";
    var solb = "⧄";
    var solbar = "⌿";
    var sopf = "𝕤";
    var spades = "♠";
    var spadesuit = "♠";
    var spar = "∥";
    var sqcap = "⊓";
    var sqcaps = "⊓︀";
    var sqcup = "⊔";
    var sqcups = "⊔︀";
    var sqsub = "⊏";
    var sqsube = "⊑";
    var sqsubset = "⊏";
    var sqsubseteq = "⊑";
    var sqsup = "⊐";
    var sqsupe = "⊒";
    var sqsupset = "⊐";
    var sqsupseteq = "⊒";
    var squ = "□";
    var square = "□";
    var squarf = "▪";
    var squf = "▪";
    var srarr = "→";
    var sscr = "𝓈";
    var ssetmn = "∖";
    var ssmile = "⌣";
    var sstarf = "⋆";
    var star = "☆";
    var starf = "★";
    var straightepsilon = "ϵ";
    var straightphi = "ϕ";
    var strns = "¯";
    var sub = "⊂";
    var subE = "⫅";
    var subdot = "⪽";
    var sube = "⊆";
    var subedot = "⫃";
    var submult = "⫁";
    var subnE = "⫋";
    var subne = "⊊";
    var subplus = "⪿";
    var subrarr = "⥹";
    var subset = "⊂";
    var subseteq = "⊆";
    var subseteqq = "⫅";
    var subsetneq = "⊊";
    var subsetneqq = "⫋";
    var subsim = "⫇";
    var subsub = "⫕";
    var subsup = "⫓";
    var succ = "≻";
    var succapprox = "⪸";
    var succcurlyeq = "≽";
    var succeq = "⪰";
    var succnapprox = "⪺";
    var succneqq = "⪶";
    var succnsim = "⋩";
    var succsim = "≿";
    var sum = "∑";
    var sung = "♪";
    var sup = "⊃";
    var sup1 = "¹";
    var sup2 = "²";
    var sup3 = "³";
    var supE = "⫆";
    var supdot = "⪾";
    var supdsub = "⫘";
    var supe = "⊇";
    var supedot = "⫄";
    var suphsol = "⟉";
    var suphsub = "⫗";
    var suplarr = "⥻";
    var supmult = "⫂";
    var supnE = "⫌";
    var supne = "⊋";
    var supplus = "⫀";
    var supset = "⊃";
    var supseteq = "⊇";
    var supseteqq = "⫆";
    var supsetneq = "⊋";
    var supsetneqq = "⫌";
    var supsim = "⫈";
    var supsub = "⫔";
    var supsup = "⫖";
    var swArr = "⇙";
    var swarhk = "⤦";
    var swarr = "↙";
    var swarrow = "↙";
    var swnwar = "⤪";
    var szli = "ß";
    var szlig = "ß";
    var target = "⌖";
    var tau = "τ";
    var tbrk = "⎴";
    var tcaron = "ť";
    var tcedil = "ţ";
    var tcy = "т";
    var tdot = "⃛";
    var telrec = "⌕";
    var tfr = "𝔱";
    var there4 = "∴";
    var therefore = "∴";
    var theta = "θ";
    var thetasym = "ϑ";
    var thetav = "ϑ";
    var thickapprox = "≈";
    var thicksim = "∼";
    var thinsp = " ";
    var thkap = "≈";
    var thksim = "∼";
    var thor = "þ";
    var thorn = "þ";
    var tilde = "˜";
    var time = "×";
    var times = "×";
    var timesb = "⊠";
    var timesbar = "⨱";
    var timesd = "⨰";
    var tint = "∭";
    var toea = "⤨";
    var top = "⊤";
    var topbot = "⌶";
    var topcir = "⫱";
    var topf = "𝕥";
    var topfork = "⫚";
    var tosa = "⤩";
    var tprime = "‴";
    var trade = "™";
    var triangle = "▵";
    var triangledown = "▿";
    var triangleleft = "◃";
    var trianglelefteq = "⊴";
    var triangleq = "≜";
    var triangleright = "▹";
    var trianglerighteq = "⊵";
    var tridot = "◬";
    var trie = "≜";
    var triminus = "⨺";
    var triplus = "⨹";
    var trisb = "⧍";
    var tritime = "⨻";
    var trpezium = "⏢";
    var tscr = "𝓉";
    var tscy = "ц";
    var tshcy = "ћ";
    var tstrok = "ŧ";
    var twixt = "≬";
    var twoheadleftarrow = "↞";
    var twoheadrightarrow = "↠";
    var uArr = "⇑";
    var uHar = "⥣";
    var uacut = "ú";
    var uacute = "ú";
    var uarr = "↑";
    var ubrcy = "ў";
    var ubreve = "ŭ";
    var ucir = "û";
    var ucirc = "û";
    var ucy = "у";
    var udarr = "⇅";
    var udblac = "ű";
    var udhar = "⥮";
    var ufisht = "⥾";
    var ufr = "𝔲";
    var ugrav = "ù";
    var ugrave = "ù";
    var uharl = "↿";
    var uharr = "↾";
    var uhblk = "▀";
    var ulcorn = "⌜";
    var ulcorner = "⌜";
    var ulcrop = "⌏";
    var ultri = "◸";
    var umacr = "ū";
    var um = "¨";
    var uml = "¨";
    var uogon = "ų";
    var uopf = "𝕦";
    var uparrow = "↑";
    var updownarrow = "↕";
    var upharpoonleft = "↿";
    var upharpoonright = "↾";
    var uplus = "⊎";
    var upsi = "υ";
    var upsih = "ϒ";
    var upsilon = "υ";
    var upuparrows = "⇈";
    var urcorn = "⌝";
    var urcorner = "⌝";
    var urcrop = "⌎";
    var uring = "ů";
    var urtri = "◹";
    var uscr = "𝓊";
    var utdot = "⋰";
    var utilde = "ũ";
    var utri = "▵";
    var utrif = "▴";
    var uuarr = "⇈";
    var uum = "ü";
    var uuml = "ü";
    var uwangle = "⦧";
    var vArr = "⇕";
    var vBar = "⫨";
    var vBarv = "⫩";
    var vDash = "⊨";
    var vangrt = "⦜";
    var varepsilon = "ϵ";
    var varkappa = "ϰ";
    var varnothing = "∅";
    var varphi = "ϕ";
    var varpi = "ϖ";
    var varpropto = "∝";
    var varr = "↕";
    var varrho = "ϱ";
    var varsigma = "ς";
    var varsubsetneq = "⊊︀";
    var varsubsetneqq = "⫋︀";
    var varsupsetneq = "⊋︀";
    var varsupsetneqq = "⫌︀";
    var vartheta = "ϑ";
    var vartriangleleft = "⊲";
    var vartriangleright = "⊳";
    var vcy = "в";
    var vdash = "⊢";
    var vee = "∨";
    var veebar = "⊻";
    var veeeq = "≚";
    var vellip = "⋮";
    var verbar = "|";
    var vert = "|";
    var vfr = "𝔳";
    var vltri = "⊲";
    var vnsub = "⊂⃒";
    var vnsup = "⊃⃒";
    var vopf = "𝕧";
    var vprop = "∝";
    var vrtri = "⊳";
    var vscr = "𝓋";
    var vsubnE = "⫋︀";
    var vsubne = "⊊︀";
    var vsupnE = "⫌︀";
    var vsupne = "⊋︀";
    var vzigzag = "⦚";
    var wcirc = "ŵ";
    var wedbar = "⩟";
    var wedge = "∧";
    var wedgeq = "≙";
    var weierp = "℘";
    var wfr = "𝔴";
    var wopf = "𝕨";
    var wp = "℘";
    var wr = "≀";
    var wreath = "≀";
    var wscr = "𝓌";
    var xcap = "⋂";
    var xcirc = "◯";
    var xcup = "⋃";
    var xdtri = "▽";
    var xfr = "𝔵";
    var xhArr = "⟺";
    var xharr = "⟷";
    var xi = "ξ";
    var xlArr = "⟸";
    var xlarr = "⟵";
    var xmap = "⟼";
    var xnis = "⋻";
    var xodot = "⨀";
    var xopf = "𝕩";
    var xoplus = "⨁";
    var xotime = "⨂";
    var xrArr = "⟹";
    var xrarr = "⟶";
    var xscr = "𝓍";
    var xsqcup = "⨆";
    var xuplus = "⨄";
    var xutri = "△";
    var xvee = "⋁";
    var xwedge = "⋀";
    var yacut = "ý";
    var yacute = "ý";
    var yacy = "я";
    var ycirc = "ŷ";
    var ycy = "ы";
    var ye = "¥";
    var yen = "¥";
    var yfr = "𝔶";
    var yicy = "ї";
    var yopf = "𝕪";
    var yscr = "𝓎";
    var yucy = "ю";
    var yum = "ÿ";
    var yuml = "ÿ";
    var zacute = "ź";
    var zcaron = "ž";
    var zcy = "з";
    var zdot = "ż";
    var zeetrf = "ℨ";
    var zeta = "ζ";
    var zfr = "𝔷";
    var zhcy = "ж";
    var zigrarr = "⇝";
    var zopf = "𝕫";
    var zscr = "𝓏";
    var zwj = "‍";
    var zwnj = "‌";
    var index$1 = {
    	AEli: AEli,
    	AElig: AElig,
    	AM: AM,
    	AMP: AMP,
    	Aacut: Aacut,
    	Aacute: Aacute,
    	Abreve: Abreve,
    	Acir: Acir,
    	Acirc: Acirc,
    	Acy: Acy,
    	Afr: Afr,
    	Agrav: Agrav,
    	Agrave: Agrave,
    	Alpha: Alpha,
    	Amacr: Amacr,
    	And: And,
    	Aogon: Aogon,
    	Aopf: Aopf,
    	ApplyFunction: ApplyFunction,
    	Arin: Arin,
    	Aring: Aring,
    	Ascr: Ascr,
    	Assign: Assign,
    	Atild: Atild,
    	Atilde: Atilde,
    	Aum: Aum,
    	Auml: Auml,
    	Backslash: Backslash,
    	Barv: Barv,
    	Barwed: Barwed,
    	Bcy: Bcy,
    	Because: Because,
    	Bernoullis: Bernoullis,
    	Beta: Beta,
    	Bfr: Bfr,
    	Bopf: Bopf,
    	Breve: Breve,
    	Bscr: Bscr,
    	Bumpeq: Bumpeq,
    	CHcy: CHcy,
    	COP: COP,
    	COPY: COPY,
    	Cacute: Cacute,
    	Cap: Cap,
    	CapitalDifferentialD: CapitalDifferentialD,
    	Cayleys: Cayleys,
    	Ccaron: Ccaron,
    	Ccedi: Ccedi,
    	Ccedil: Ccedil,
    	Ccirc: Ccirc,
    	Cconint: Cconint,
    	Cdot: Cdot,
    	Cedilla: Cedilla,
    	CenterDot: CenterDot,
    	Cfr: Cfr,
    	Chi: Chi,
    	CircleDot: CircleDot,
    	CircleMinus: CircleMinus,
    	CirclePlus: CirclePlus,
    	CircleTimes: CircleTimes,
    	ClockwiseContourIntegral: ClockwiseContourIntegral,
    	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
    	CloseCurlyQuote: CloseCurlyQuote,
    	Colon: Colon,
    	Colone: Colone,
    	Congruent: Congruent,
    	Conint: Conint,
    	ContourIntegral: ContourIntegral,
    	Copf: Copf,
    	Coproduct: Coproduct,
    	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
    	Cross: Cross,
    	Cscr: Cscr,
    	Cup: Cup,
    	CupCap: CupCap,
    	DD: DD,
    	DDotrahd: DDotrahd,
    	DJcy: DJcy,
    	DScy: DScy,
    	DZcy: DZcy,
    	Dagger: Dagger,
    	Darr: Darr,
    	Dashv: Dashv,
    	Dcaron: Dcaron,
    	Dcy: Dcy,
    	Del: Del,
    	Delta: Delta,
    	Dfr: Dfr,
    	DiacriticalAcute: DiacriticalAcute,
    	DiacriticalDot: DiacriticalDot,
    	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
    	DiacriticalGrave: DiacriticalGrave,
    	DiacriticalTilde: DiacriticalTilde,
    	Diamond: Diamond,
    	DifferentialD: DifferentialD,
    	Dopf: Dopf,
    	Dot: Dot,
    	DotDot: DotDot,
    	DotEqual: DotEqual,
    	DoubleContourIntegral: DoubleContourIntegral,
    	DoubleDot: DoubleDot,
    	DoubleDownArrow: DoubleDownArrow,
    	DoubleLeftArrow: DoubleLeftArrow,
    	DoubleLeftRightArrow: DoubleLeftRightArrow,
    	DoubleLeftTee: DoubleLeftTee,
    	DoubleLongLeftArrow: DoubleLongLeftArrow,
    	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
    	DoubleLongRightArrow: DoubleLongRightArrow,
    	DoubleRightArrow: DoubleRightArrow,
    	DoubleRightTee: DoubleRightTee,
    	DoubleUpArrow: DoubleUpArrow,
    	DoubleUpDownArrow: DoubleUpDownArrow,
    	DoubleVerticalBar: DoubleVerticalBar,
    	DownArrow: DownArrow,
    	DownArrowBar: DownArrowBar,
    	DownArrowUpArrow: DownArrowUpArrow,
    	DownBreve: DownBreve,
    	DownLeftRightVector: DownLeftRightVector,
    	DownLeftTeeVector: DownLeftTeeVector,
    	DownLeftVector: DownLeftVector,
    	DownLeftVectorBar: DownLeftVectorBar,
    	DownRightTeeVector: DownRightTeeVector,
    	DownRightVector: DownRightVector,
    	DownRightVectorBar: DownRightVectorBar,
    	DownTee: DownTee,
    	DownTeeArrow: DownTeeArrow,
    	Downarrow: Downarrow,
    	Dscr: Dscr,
    	Dstrok: Dstrok,
    	ENG: ENG,
    	ET: ET,
    	ETH: ETH,
    	Eacut: Eacut,
    	Eacute: Eacute,
    	Ecaron: Ecaron,
    	Ecir: Ecir,
    	Ecirc: Ecirc,
    	Ecy: Ecy,
    	Edot: Edot,
    	Efr: Efr,
    	Egrav: Egrav,
    	Egrave: Egrave,
    	Element: Element,
    	Emacr: Emacr,
    	EmptySmallSquare: EmptySmallSquare,
    	EmptyVerySmallSquare: EmptyVerySmallSquare,
    	Eogon: Eogon,
    	Eopf: Eopf,
    	Epsilon: Epsilon,
    	Equal: Equal,
    	EqualTilde: EqualTilde,
    	Equilibrium: Equilibrium,
    	Escr: Escr,
    	Esim: Esim,
    	Eta: Eta,
    	Eum: Eum,
    	Euml: Euml,
    	Exists: Exists,
    	ExponentialE: ExponentialE,
    	Fcy: Fcy,
    	Ffr: Ffr,
    	FilledSmallSquare: FilledSmallSquare,
    	FilledVerySmallSquare: FilledVerySmallSquare,
    	Fopf: Fopf,
    	ForAll: ForAll,
    	Fouriertrf: Fouriertrf,
    	Fscr: Fscr,
    	GJcy: GJcy,
    	G: G,
    	GT: GT,
    	Gamma: Gamma,
    	Gammad: Gammad,
    	Gbreve: Gbreve,
    	Gcedil: Gcedil,
    	Gcirc: Gcirc,
    	Gcy: Gcy,
    	Gdot: Gdot,
    	Gfr: Gfr,
    	Gg: Gg,
    	Gopf: Gopf,
    	GreaterEqual: GreaterEqual,
    	GreaterEqualLess: GreaterEqualLess,
    	GreaterFullEqual: GreaterFullEqual,
    	GreaterGreater: GreaterGreater,
    	GreaterLess: GreaterLess,
    	GreaterSlantEqual: GreaterSlantEqual,
    	GreaterTilde: GreaterTilde,
    	Gscr: Gscr,
    	Gt: Gt,
    	HARDcy: HARDcy,
    	Hacek: Hacek,
    	Hat: Hat,
    	Hcirc: Hcirc,
    	Hfr: Hfr,
    	HilbertSpace: HilbertSpace,
    	Hopf: Hopf,
    	HorizontalLine: HorizontalLine,
    	Hscr: Hscr,
    	Hstrok: Hstrok,
    	HumpDownHump: HumpDownHump,
    	HumpEqual: HumpEqual,
    	IEcy: IEcy,
    	IJlig: IJlig,
    	IOcy: IOcy,
    	Iacut: Iacut,
    	Iacute: Iacute,
    	Icir: Icir,
    	Icirc: Icirc,
    	Icy: Icy,
    	Idot: Idot,
    	Ifr: Ifr,
    	Igrav: Igrav,
    	Igrave: Igrave,
    	Im: Im,
    	Imacr: Imacr,
    	ImaginaryI: ImaginaryI,
    	Implies: Implies,
    	Int: Int,
    	Integral: Integral,
    	Intersection: Intersection,
    	InvisibleComma: InvisibleComma,
    	InvisibleTimes: InvisibleTimes,
    	Iogon: Iogon,
    	Iopf: Iopf,
    	Iota: Iota,
    	Iscr: Iscr,
    	Itilde: Itilde,
    	Iukcy: Iukcy,
    	Ium: Ium,
    	Iuml: Iuml,
    	Jcirc: Jcirc,
    	Jcy: Jcy,
    	Jfr: Jfr,
    	Jopf: Jopf,
    	Jscr: Jscr,
    	Jsercy: Jsercy,
    	Jukcy: Jukcy,
    	KHcy: KHcy,
    	KJcy: KJcy,
    	Kappa: Kappa,
    	Kcedil: Kcedil,
    	Kcy: Kcy,
    	Kfr: Kfr,
    	Kopf: Kopf,
    	Kscr: Kscr,
    	LJcy: LJcy,
    	L: L,
    	LT: LT,
    	Lacute: Lacute,
    	Lambda: Lambda,
    	Lang: Lang,
    	Laplacetrf: Laplacetrf,
    	Larr: Larr,
    	Lcaron: Lcaron,
    	Lcedil: Lcedil,
    	Lcy: Lcy,
    	LeftAngleBracket: LeftAngleBracket,
    	LeftArrow: LeftArrow,
    	LeftArrowBar: LeftArrowBar,
    	LeftArrowRightArrow: LeftArrowRightArrow,
    	LeftCeiling: LeftCeiling,
    	LeftDoubleBracket: LeftDoubleBracket,
    	LeftDownTeeVector: LeftDownTeeVector,
    	LeftDownVector: LeftDownVector,
    	LeftDownVectorBar: LeftDownVectorBar,
    	LeftFloor: LeftFloor,
    	LeftRightArrow: LeftRightArrow,
    	LeftRightVector: LeftRightVector,
    	LeftTee: LeftTee,
    	LeftTeeArrow: LeftTeeArrow,
    	LeftTeeVector: LeftTeeVector,
    	LeftTriangle: LeftTriangle,
    	LeftTriangleBar: LeftTriangleBar,
    	LeftTriangleEqual: LeftTriangleEqual,
    	LeftUpDownVector: LeftUpDownVector,
    	LeftUpTeeVector: LeftUpTeeVector,
    	LeftUpVector: LeftUpVector,
    	LeftUpVectorBar: LeftUpVectorBar,
    	LeftVector: LeftVector,
    	LeftVectorBar: LeftVectorBar,
    	Leftarrow: Leftarrow,
    	Leftrightarrow: Leftrightarrow,
    	LessEqualGreater: LessEqualGreater,
    	LessFullEqual: LessFullEqual,
    	LessGreater: LessGreater,
    	LessLess: LessLess,
    	LessSlantEqual: LessSlantEqual,
    	LessTilde: LessTilde,
    	Lfr: Lfr,
    	Ll: Ll,
    	Lleftarrow: Lleftarrow,
    	Lmidot: Lmidot,
    	LongLeftArrow: LongLeftArrow,
    	LongLeftRightArrow: LongLeftRightArrow,
    	LongRightArrow: LongRightArrow,
    	Longleftarrow: Longleftarrow,
    	Longleftrightarrow: Longleftrightarrow,
    	Longrightarrow: Longrightarrow,
    	Lopf: Lopf,
    	LowerLeftArrow: LowerLeftArrow,
    	LowerRightArrow: LowerRightArrow,
    	Lscr: Lscr,
    	Lsh: Lsh,
    	Lstrok: Lstrok,
    	Lt: Lt,
    	Mcy: Mcy,
    	MediumSpace: MediumSpace,
    	Mellintrf: Mellintrf,
    	Mfr: Mfr,
    	MinusPlus: MinusPlus,
    	Mopf: Mopf,
    	Mscr: Mscr,
    	Mu: Mu,
    	NJcy: NJcy,
    	Nacute: Nacute,
    	Ncaron: Ncaron,
    	Ncedil: Ncedil,
    	Ncy: Ncy,
    	NegativeMediumSpace: NegativeMediumSpace,
    	NegativeThickSpace: NegativeThickSpace,
    	NegativeThinSpace: NegativeThinSpace,
    	NegativeVeryThinSpace: NegativeVeryThinSpace,
    	NestedGreaterGreater: NestedGreaterGreater,
    	NestedLessLess: NestedLessLess,
    	NewLine: NewLine,
    	Nfr: Nfr,
    	NoBreak: NoBreak,
    	NonBreakingSpace: NonBreakingSpace,
    	Nopf: Nopf,
    	Not: Not,
    	NotCongruent: NotCongruent,
    	NotCupCap: NotCupCap,
    	NotDoubleVerticalBar: NotDoubleVerticalBar,
    	NotElement: NotElement,
    	NotEqual: NotEqual,
    	NotEqualTilde: NotEqualTilde,
    	NotExists: NotExists,
    	NotGreater: NotGreater,
    	NotGreaterEqual: NotGreaterEqual,
    	NotGreaterFullEqual: NotGreaterFullEqual,
    	NotGreaterGreater: NotGreaterGreater,
    	NotGreaterLess: NotGreaterLess,
    	NotGreaterSlantEqual: NotGreaterSlantEqual,
    	NotGreaterTilde: NotGreaterTilde,
    	NotHumpDownHump: NotHumpDownHump,
    	NotHumpEqual: NotHumpEqual,
    	NotLeftTriangle: NotLeftTriangle,
    	NotLeftTriangleBar: NotLeftTriangleBar,
    	NotLeftTriangleEqual: NotLeftTriangleEqual,
    	NotLess: NotLess,
    	NotLessEqual: NotLessEqual,
    	NotLessGreater: NotLessGreater,
    	NotLessLess: NotLessLess,
    	NotLessSlantEqual: NotLessSlantEqual,
    	NotLessTilde: NotLessTilde,
    	NotNestedGreaterGreater: NotNestedGreaterGreater,
    	NotNestedLessLess: NotNestedLessLess,
    	NotPrecedes: NotPrecedes,
    	NotPrecedesEqual: NotPrecedesEqual,
    	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
    	NotReverseElement: NotReverseElement,
    	NotRightTriangle: NotRightTriangle,
    	NotRightTriangleBar: NotRightTriangleBar,
    	NotRightTriangleEqual: NotRightTriangleEqual,
    	NotSquareSubset: NotSquareSubset,
    	NotSquareSubsetEqual: NotSquareSubsetEqual,
    	NotSquareSuperset: NotSquareSuperset,
    	NotSquareSupersetEqual: NotSquareSupersetEqual,
    	NotSubset: NotSubset,
    	NotSubsetEqual: NotSubsetEqual,
    	NotSucceeds: NotSucceeds,
    	NotSucceedsEqual: NotSucceedsEqual,
    	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
    	NotSucceedsTilde: NotSucceedsTilde,
    	NotSuperset: NotSuperset,
    	NotSupersetEqual: NotSupersetEqual,
    	NotTilde: NotTilde,
    	NotTildeEqual: NotTildeEqual,
    	NotTildeFullEqual: NotTildeFullEqual,
    	NotTildeTilde: NotTildeTilde,
    	NotVerticalBar: NotVerticalBar,
    	Nscr: Nscr,
    	Ntild: Ntild,
    	Ntilde: Ntilde,
    	Nu: Nu,
    	OElig: OElig,
    	Oacut: Oacut,
    	Oacute: Oacute,
    	Ocir: Ocir,
    	Ocirc: Ocirc,
    	Ocy: Ocy,
    	Odblac: Odblac,
    	Ofr: Ofr,
    	Ograv: Ograv,
    	Ograve: Ograve,
    	Omacr: Omacr,
    	Omega: Omega,
    	Omicron: Omicron,
    	Oopf: Oopf,
    	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
    	OpenCurlyQuote: OpenCurlyQuote,
    	Or: Or,
    	Oscr: Oscr,
    	Oslas: Oslas,
    	Oslash: Oslash,
    	Otild: Otild,
    	Otilde: Otilde,
    	Otimes: Otimes,
    	Oum: Oum,
    	Ouml: Ouml,
    	OverBar: OverBar,
    	OverBrace: OverBrace,
    	OverBracket: OverBracket,
    	OverParenthesis: OverParenthesis,
    	PartialD: PartialD,
    	Pcy: Pcy,
    	Pfr: Pfr,
    	Phi: Phi,
    	Pi: Pi,
    	PlusMinus: PlusMinus,
    	Poincareplane: Poincareplane,
    	Popf: Popf,
    	Pr: Pr,
    	Precedes: Precedes,
    	PrecedesEqual: PrecedesEqual,
    	PrecedesSlantEqual: PrecedesSlantEqual,
    	PrecedesTilde: PrecedesTilde,
    	Prime: Prime,
    	Product: Product,
    	Proportion: Proportion,
    	Proportional: Proportional,
    	Pscr: Pscr,
    	Psi: Psi,
    	QUO: QUO,
    	QUOT: QUOT,
    	Qfr: Qfr,
    	Qopf: Qopf,
    	Qscr: Qscr,
    	RBarr: RBarr,
    	RE: RE,
    	REG: REG,
    	Racute: Racute,
    	Rang: Rang,
    	Rarr: Rarr,
    	Rarrtl: Rarrtl,
    	Rcaron: Rcaron,
    	Rcedil: Rcedil,
    	Rcy: Rcy,
    	Re: Re,
    	ReverseElement: ReverseElement,
    	ReverseEquilibrium: ReverseEquilibrium,
    	ReverseUpEquilibrium: ReverseUpEquilibrium,
    	Rfr: Rfr,
    	Rho: Rho,
    	RightAngleBracket: RightAngleBracket,
    	RightArrow: RightArrow,
    	RightArrowBar: RightArrowBar,
    	RightArrowLeftArrow: RightArrowLeftArrow,
    	RightCeiling: RightCeiling,
    	RightDoubleBracket: RightDoubleBracket,
    	RightDownTeeVector: RightDownTeeVector,
    	RightDownVector: RightDownVector,
    	RightDownVectorBar: RightDownVectorBar,
    	RightFloor: RightFloor,
    	RightTee: RightTee,
    	RightTeeArrow: RightTeeArrow,
    	RightTeeVector: RightTeeVector,
    	RightTriangle: RightTriangle,
    	RightTriangleBar: RightTriangleBar,
    	RightTriangleEqual: RightTriangleEqual,
    	RightUpDownVector: RightUpDownVector,
    	RightUpTeeVector: RightUpTeeVector,
    	RightUpVector: RightUpVector,
    	RightUpVectorBar: RightUpVectorBar,
    	RightVector: RightVector,
    	RightVectorBar: RightVectorBar,
    	Rightarrow: Rightarrow,
    	Ropf: Ropf,
    	RoundImplies: RoundImplies,
    	Rrightarrow: Rrightarrow,
    	Rscr: Rscr,
    	Rsh: Rsh,
    	RuleDelayed: RuleDelayed,
    	SHCHcy: SHCHcy,
    	SHcy: SHcy,
    	SOFTcy: SOFTcy,
    	Sacute: Sacute,
    	Sc: Sc,
    	Scaron: Scaron,
    	Scedil: Scedil,
    	Scirc: Scirc,
    	Scy: Scy,
    	Sfr: Sfr,
    	ShortDownArrow: ShortDownArrow,
    	ShortLeftArrow: ShortLeftArrow,
    	ShortRightArrow: ShortRightArrow,
    	ShortUpArrow: ShortUpArrow,
    	Sigma: Sigma,
    	SmallCircle: SmallCircle,
    	Sopf: Sopf,
    	Sqrt: Sqrt,
    	Square: Square,
    	SquareIntersection: SquareIntersection,
    	SquareSubset: SquareSubset,
    	SquareSubsetEqual: SquareSubsetEqual,
    	SquareSuperset: SquareSuperset,
    	SquareSupersetEqual: SquareSupersetEqual,
    	SquareUnion: SquareUnion,
    	Sscr: Sscr,
    	Star: Star,
    	Sub: Sub,
    	Subset: Subset,
    	SubsetEqual: SubsetEqual,
    	Succeeds: Succeeds,
    	SucceedsEqual: SucceedsEqual,
    	SucceedsSlantEqual: SucceedsSlantEqual,
    	SucceedsTilde: SucceedsTilde,
    	SuchThat: SuchThat,
    	Sum: Sum,
    	Sup: Sup,
    	Superset: Superset,
    	SupersetEqual: SupersetEqual,
    	Supset: Supset,
    	THOR: THOR,
    	THORN: THORN,
    	TRADE: TRADE,
    	TSHcy: TSHcy,
    	TScy: TScy,
    	Tab: Tab,
    	Tau: Tau,
    	Tcaron: Tcaron,
    	Tcedil: Tcedil,
    	Tcy: Tcy,
    	Tfr: Tfr,
    	Therefore: Therefore,
    	Theta: Theta,
    	ThickSpace: ThickSpace,
    	ThinSpace: ThinSpace,
    	Tilde: Tilde,
    	TildeEqual: TildeEqual,
    	TildeFullEqual: TildeFullEqual,
    	TildeTilde: TildeTilde,
    	Topf: Topf,
    	TripleDot: TripleDot,
    	Tscr: Tscr,
    	Tstrok: Tstrok,
    	Uacut: Uacut,
    	Uacute: Uacute,
    	Uarr: Uarr,
    	Uarrocir: Uarrocir,
    	Ubrcy: Ubrcy,
    	Ubreve: Ubreve,
    	Ucir: Ucir,
    	Ucirc: Ucirc,
    	Ucy: Ucy,
    	Udblac: Udblac,
    	Ufr: Ufr,
    	Ugrav: Ugrav,
    	Ugrave: Ugrave,
    	Umacr: Umacr,
    	UnderBar: UnderBar,
    	UnderBrace: UnderBrace,
    	UnderBracket: UnderBracket,
    	UnderParenthesis: UnderParenthesis,
    	Union: Union,
    	UnionPlus: UnionPlus,
    	Uogon: Uogon,
    	Uopf: Uopf,
    	UpArrow: UpArrow,
    	UpArrowBar: UpArrowBar,
    	UpArrowDownArrow: UpArrowDownArrow,
    	UpDownArrow: UpDownArrow,
    	UpEquilibrium: UpEquilibrium,
    	UpTee: UpTee,
    	UpTeeArrow: UpTeeArrow,
    	Uparrow: Uparrow,
    	Updownarrow: Updownarrow,
    	UpperLeftArrow: UpperLeftArrow,
    	UpperRightArrow: UpperRightArrow,
    	Upsi: Upsi,
    	Upsilon: Upsilon,
    	Uring: Uring,
    	Uscr: Uscr,
    	Utilde: Utilde,
    	Uum: Uum,
    	Uuml: Uuml,
    	VDash: VDash,
    	Vbar: Vbar,
    	Vcy: Vcy,
    	Vdash: Vdash,
    	Vdashl: Vdashl,
    	Vee: Vee,
    	Verbar: Verbar,
    	Vert: Vert,
    	VerticalBar: VerticalBar,
    	VerticalLine: VerticalLine,
    	VerticalSeparator: VerticalSeparator,
    	VerticalTilde: VerticalTilde,
    	VeryThinSpace: VeryThinSpace,
    	Vfr: Vfr,
    	Vopf: Vopf,
    	Vscr: Vscr,
    	Vvdash: Vvdash,
    	Wcirc: Wcirc,
    	Wedge: Wedge,
    	Wfr: Wfr,
    	Wopf: Wopf,
    	Wscr: Wscr,
    	Xfr: Xfr,
    	Xi: Xi,
    	Xopf: Xopf,
    	Xscr: Xscr,
    	YAcy: YAcy,
    	YIcy: YIcy,
    	YUcy: YUcy,
    	Yacut: Yacut,
    	Yacute: Yacute,
    	Ycirc: Ycirc,
    	Ycy: Ycy,
    	Yfr: Yfr,
    	Yopf: Yopf,
    	Yscr: Yscr,
    	Yuml: Yuml,
    	ZHcy: ZHcy,
    	Zacute: Zacute,
    	Zcaron: Zcaron,
    	Zcy: Zcy,
    	Zdot: Zdot,
    	ZeroWidthSpace: ZeroWidthSpace,
    	Zeta: Zeta,
    	Zfr: Zfr,
    	Zopf: Zopf,
    	Zscr: Zscr,
    	aacut: aacut,
    	aacute: aacute,
    	abreve: abreve,
    	ac: ac,
    	acE: acE,
    	acd: acd,
    	acir: acir,
    	acirc: acirc,
    	acut: acut,
    	acute: acute,
    	acy: acy,
    	aeli: aeli,
    	aelig: aelig,
    	af: af,
    	afr: afr,
    	agrav: agrav,
    	agrave: agrave,
    	alefsym: alefsym,
    	aleph: aleph,
    	alpha: alpha,
    	amacr: amacr,
    	amalg: amalg,
    	am: am,
    	amp: amp,
    	and: and,
    	andand: andand,
    	andd: andd,
    	andslope: andslope,
    	andv: andv,
    	ang: ang,
    	ange: ange,
    	angle: angle,
    	angmsd: angmsd,
    	angmsdaa: angmsdaa,
    	angmsdab: angmsdab,
    	angmsdac: angmsdac,
    	angmsdad: angmsdad,
    	angmsdae: angmsdae,
    	angmsdaf: angmsdaf,
    	angmsdag: angmsdag,
    	angmsdah: angmsdah,
    	angrt: angrt,
    	angrtvb: angrtvb,
    	angrtvbd: angrtvbd,
    	angsph: angsph,
    	angst: angst,
    	angzarr: angzarr,
    	aogon: aogon,
    	aopf: aopf,
    	ap: ap,
    	apE: apE,
    	apacir: apacir,
    	ape: ape,
    	apid: apid,
    	apos: apos,
    	approx: approx,
    	approxeq: approxeq,
    	arin: arin,
    	aring: aring,
    	ascr: ascr,
    	ast: ast,
    	asymp: asymp,
    	asympeq: asympeq,
    	atild: atild,
    	atilde: atilde,
    	aum: aum,
    	auml: auml,
    	awconint: awconint,
    	awint: awint,
    	bNot: bNot,
    	backcong: backcong,
    	backepsilon: backepsilon,
    	backprime: backprime,
    	backsim: backsim,
    	backsimeq: backsimeq,
    	barvee: barvee,
    	barwed: barwed,
    	barwedge: barwedge,
    	bbrk: bbrk,
    	bbrktbrk: bbrktbrk,
    	bcong: bcong,
    	bcy: bcy,
    	bdquo: bdquo,
    	becaus: becaus,
    	because: because,
    	bemptyv: bemptyv,
    	bepsi: bepsi,
    	bernou: bernou,
    	beta: beta,
    	beth: beth,
    	between: between,
    	bfr: bfr,
    	bigcap: bigcap,
    	bigcirc: bigcirc,
    	bigcup: bigcup,
    	bigodot: bigodot,
    	bigoplus: bigoplus,
    	bigotimes: bigotimes,
    	bigsqcup: bigsqcup,
    	bigstar: bigstar,
    	bigtriangledown: bigtriangledown,
    	bigtriangleup: bigtriangleup,
    	biguplus: biguplus,
    	bigvee: bigvee,
    	bigwedge: bigwedge,
    	bkarow: bkarow,
    	blacklozenge: blacklozenge,
    	blacksquare: blacksquare,
    	blacktriangle: blacktriangle,
    	blacktriangledown: blacktriangledown,
    	blacktriangleleft: blacktriangleleft,
    	blacktriangleright: blacktriangleright,
    	blank: blank,
    	blk12: blk12,
    	blk14: blk14,
    	blk34: blk34,
    	block: block,
    	bne: bne,
    	bnequiv: bnequiv,
    	bnot: bnot,
    	bopf: bopf,
    	bot: bot,
    	bottom: bottom,
    	bowtie: bowtie,
    	boxDL: boxDL,
    	boxDR: boxDR,
    	boxDl: boxDl,
    	boxDr: boxDr,
    	boxH: boxH,
    	boxHD: boxHD,
    	boxHU: boxHU,
    	boxHd: boxHd,
    	boxHu: boxHu,
    	boxUL: boxUL,
    	boxUR: boxUR,
    	boxUl: boxUl,
    	boxUr: boxUr,
    	boxV: boxV,
    	boxVH: boxVH,
    	boxVL: boxVL,
    	boxVR: boxVR,
    	boxVh: boxVh,
    	boxVl: boxVl,
    	boxVr: boxVr,
    	boxbox: boxbox,
    	boxdL: boxdL,
    	boxdR: boxdR,
    	boxdl: boxdl,
    	boxdr: boxdr,
    	boxh: boxh,
    	boxhD: boxhD,
    	boxhU: boxhU,
    	boxhd: boxhd,
    	boxhu: boxhu,
    	boxminus: boxminus,
    	boxplus: boxplus,
    	boxtimes: boxtimes,
    	boxuL: boxuL,
    	boxuR: boxuR,
    	boxul: boxul,
    	boxur: boxur,
    	boxv: boxv,
    	boxvH: boxvH,
    	boxvL: boxvL,
    	boxvR: boxvR,
    	boxvh: boxvh,
    	boxvl: boxvl,
    	boxvr: boxvr,
    	bprime: bprime,
    	breve: breve,
    	brvba: brvba,
    	brvbar: brvbar,
    	bscr: bscr,
    	bsemi: bsemi,
    	bsim: bsim,
    	bsime: bsime,
    	bsol: bsol,
    	bsolb: bsolb,
    	bsolhsub: bsolhsub,
    	bull: bull,
    	bullet: bullet,
    	bump: bump,
    	bumpE: bumpE,
    	bumpe: bumpe,
    	bumpeq: bumpeq,
    	cacute: cacute,
    	cap: cap,
    	capand: capand,
    	capbrcup: capbrcup,
    	capcap: capcap,
    	capcup: capcup,
    	capdot: capdot,
    	caps: caps,
    	caret: caret,
    	caron: caron,
    	ccaps: ccaps,
    	ccaron: ccaron,
    	ccedi: ccedi,
    	ccedil: ccedil,
    	ccirc: ccirc,
    	ccups: ccups,
    	ccupssm: ccupssm,
    	cdot: cdot,
    	cedi: cedi,
    	cedil: cedil,
    	cemptyv: cemptyv,
    	cen: cen,
    	cent: cent,
    	centerdot: centerdot,
    	cfr: cfr,
    	chcy: chcy,
    	check: check,
    	checkmark: checkmark,
    	chi: chi,
    	cir: cir,
    	cirE: cirE,
    	circ: circ,
    	circeq: circeq,
    	circlearrowleft: circlearrowleft,
    	circlearrowright: circlearrowright,
    	circledR: circledR,
    	circledS: circledS,
    	circledast: circledast,
    	circledcirc: circledcirc,
    	circleddash: circleddash,
    	cire: cire,
    	cirfnint: cirfnint,
    	cirmid: cirmid,
    	cirscir: cirscir,
    	clubs: clubs,
    	clubsuit: clubsuit,
    	colon: colon,
    	colone: colone,
    	coloneq: coloneq,
    	comma: comma,
    	commat: commat,
    	comp: comp,
    	compfn: compfn,
    	complement: complement,
    	complexes: complexes,
    	cong: cong,
    	congdot: congdot,
    	conint: conint,
    	copf: copf,
    	coprod: coprod,
    	cop: cop,
    	copy: copy,
    	copysr: copysr,
    	crarr: crarr,
    	cross: cross,
    	cscr: cscr,
    	csub: csub,
    	csube: csube,
    	csup: csup,
    	csupe: csupe,
    	ctdot: ctdot,
    	cudarrl: cudarrl,
    	cudarrr: cudarrr,
    	cuepr: cuepr,
    	cuesc: cuesc,
    	cularr: cularr,
    	cularrp: cularrp,
    	cup: cup,
    	cupbrcap: cupbrcap,
    	cupcap: cupcap,
    	cupcup: cupcup,
    	cupdot: cupdot,
    	cupor: cupor,
    	cups: cups,
    	curarr: curarr,
    	curarrm: curarrm,
    	curlyeqprec: curlyeqprec,
    	curlyeqsucc: curlyeqsucc,
    	curlyvee: curlyvee,
    	curlywedge: curlywedge,
    	curre: curre,
    	curren: curren,
    	curvearrowleft: curvearrowleft,
    	curvearrowright: curvearrowright,
    	cuvee: cuvee,
    	cuwed: cuwed,
    	cwconint: cwconint,
    	cwint: cwint,
    	cylcty: cylcty,
    	dArr: dArr,
    	dHar: dHar,
    	dagger: dagger,
    	daleth: daleth,
    	darr: darr,
    	dash: dash,
    	dashv: dashv,
    	dbkarow: dbkarow,
    	dblac: dblac,
    	dcaron: dcaron,
    	dcy: dcy,
    	dd: dd,
    	ddagger: ddagger,
    	ddarr: ddarr,
    	ddotseq: ddotseq,
    	de: de,
    	deg: deg,
    	delta: delta,
    	demptyv: demptyv,
    	dfisht: dfisht,
    	dfr: dfr,
    	dharl: dharl,
    	dharr: dharr,
    	diam: diam,
    	diamond: diamond,
    	diamondsuit: diamondsuit,
    	diams: diams,
    	die: die,
    	digamma: digamma,
    	disin: disin,
    	div: div,
    	divid: divid,
    	divide: divide,
    	divideontimes: divideontimes,
    	divonx: divonx,
    	djcy: djcy,
    	dlcorn: dlcorn,
    	dlcrop: dlcrop,
    	dollar: dollar,
    	dopf: dopf,
    	dot: dot,
    	doteq: doteq,
    	doteqdot: doteqdot,
    	dotminus: dotminus,
    	dotplus: dotplus,
    	dotsquare: dotsquare,
    	doublebarwedge: doublebarwedge,
    	downarrow: downarrow,
    	downdownarrows: downdownarrows,
    	downharpoonleft: downharpoonleft,
    	downharpoonright: downharpoonright,
    	drbkarow: drbkarow,
    	drcorn: drcorn,
    	drcrop: drcrop,
    	dscr: dscr,
    	dscy: dscy,
    	dsol: dsol,
    	dstrok: dstrok,
    	dtdot: dtdot,
    	dtri: dtri,
    	dtrif: dtrif,
    	duarr: duarr,
    	duhar: duhar,
    	dwangle: dwangle,
    	dzcy: dzcy,
    	dzigrarr: dzigrarr,
    	eDDot: eDDot,
    	eDot: eDot,
    	eacut: eacut,
    	eacute: eacute,
    	easter: easter,
    	ecaron: ecaron,
    	ecir: ecir,
    	ecirc: ecirc,
    	ecolon: ecolon,
    	ecy: ecy,
    	edot: edot,
    	ee: ee,
    	efDot: efDot,
    	efr: efr,
    	eg: eg,
    	egrav: egrav,
    	egrave: egrave,
    	egs: egs,
    	egsdot: egsdot,
    	el: el,
    	elinters: elinters,
    	ell: ell,
    	els: els,
    	elsdot: elsdot,
    	emacr: emacr,
    	empty: empty,
    	emptyset: emptyset,
    	emptyv: emptyv,
    	emsp13: emsp13,
    	emsp14: emsp14,
    	emsp: emsp,
    	eng: eng,
    	ensp: ensp,
    	eogon: eogon,
    	eopf: eopf,
    	epar: epar,
    	eparsl: eparsl,
    	eplus: eplus,
    	epsi: epsi,
    	epsilon: epsilon,
    	epsiv: epsiv,
    	eqcirc: eqcirc,
    	eqcolon: eqcolon,
    	eqsim: eqsim,
    	eqslantgtr: eqslantgtr,
    	eqslantless: eqslantless,
    	equals: equals,
    	equest: equest,
    	equiv: equiv,
    	equivDD: equivDD,
    	eqvparsl: eqvparsl,
    	erDot: erDot,
    	erarr: erarr,
    	escr: escr,
    	esdot: esdot,
    	esim: esim,
    	eta: eta,
    	et: et,
    	eth: eth,
    	eum: eum,
    	euml: euml,
    	euro: euro,
    	excl: excl,
    	exist: exist,
    	expectation: expectation,
    	exponentiale: exponentiale,
    	fallingdotseq: fallingdotseq,
    	fcy: fcy,
    	female: female,
    	ffilig: ffilig,
    	fflig: fflig,
    	ffllig: ffllig,
    	ffr: ffr,
    	filig: filig,
    	fjlig: fjlig,
    	flat: flat,
    	fllig: fllig,
    	fltns: fltns,
    	fnof: fnof,
    	fopf: fopf,
    	forall: forall,
    	fork: fork,
    	forkv: forkv,
    	fpartint: fpartint,
    	frac1: frac1,
    	frac12: frac12,
    	frac13: frac13,
    	frac14: frac14,
    	frac15: frac15,
    	frac16: frac16,
    	frac18: frac18,
    	frac23: frac23,
    	frac25: frac25,
    	frac3: frac3,
    	frac34: frac34,
    	frac35: frac35,
    	frac38: frac38,
    	frac45: frac45,
    	frac56: frac56,
    	frac58: frac58,
    	frac78: frac78,
    	frasl: frasl,
    	frown: frown,
    	fscr: fscr,
    	gE: gE,
    	gEl: gEl,
    	gacute: gacute,
    	gamma: gamma,
    	gammad: gammad,
    	gap: gap,
    	gbreve: gbreve,
    	gcirc: gcirc,
    	gcy: gcy,
    	gdot: gdot,
    	ge: ge,
    	gel: gel,
    	geq: geq,
    	geqq: geqq,
    	geqslant: geqslant,
    	ges: ges,
    	gescc: gescc,
    	gesdot: gesdot,
    	gesdoto: gesdoto,
    	gesdotol: gesdotol,
    	gesl: gesl,
    	gesles: gesles,
    	gfr: gfr,
    	gg: gg,
    	ggg: ggg,
    	gimel: gimel,
    	gjcy: gjcy,
    	gl: gl,
    	glE: glE,
    	gla: gla,
    	glj: glj,
    	gnE: gnE,
    	gnap: gnap,
    	gnapprox: gnapprox,
    	gne: gne,
    	gneq: gneq,
    	gneqq: gneqq,
    	gnsim: gnsim,
    	gopf: gopf,
    	grave: grave,
    	gscr: gscr,
    	gsim: gsim,
    	gsime: gsime,
    	gsiml: gsiml,
    	g: g,
    	gt: gt,
    	gtcc: gtcc,
    	gtcir: gtcir,
    	gtdot: gtdot,
    	gtlPar: gtlPar,
    	gtquest: gtquest,
    	gtrapprox: gtrapprox,
    	gtrarr: gtrarr,
    	gtrdot: gtrdot,
    	gtreqless: gtreqless,
    	gtreqqless: gtreqqless,
    	gtrless: gtrless,
    	gtrsim: gtrsim,
    	gvertneqq: gvertneqq,
    	gvnE: gvnE,
    	hArr: hArr,
    	hairsp: hairsp,
    	half: half,
    	hamilt: hamilt,
    	hardcy: hardcy,
    	harr: harr,
    	harrcir: harrcir,
    	harrw: harrw,
    	hbar: hbar,
    	hcirc: hcirc,
    	hearts: hearts,
    	heartsuit: heartsuit,
    	hellip: hellip,
    	hercon: hercon,
    	hfr: hfr,
    	hksearow: hksearow,
    	hkswarow: hkswarow,
    	hoarr: hoarr,
    	homtht: homtht,
    	hookleftarrow: hookleftarrow,
    	hookrightarrow: hookrightarrow,
    	hopf: hopf,
    	horbar: horbar,
    	hscr: hscr,
    	hslash: hslash,
    	hstrok: hstrok,
    	hybull: hybull,
    	hyphen: hyphen,
    	iacut: iacut,
    	iacute: iacute,
    	ic: ic,
    	icir: icir,
    	icirc: icirc,
    	icy: icy,
    	iecy: iecy,
    	iexc: iexc,
    	iexcl: iexcl,
    	iff: iff,
    	ifr: ifr,
    	igrav: igrav,
    	igrave: igrave,
    	ii: ii,
    	iiiint: iiiint,
    	iiint: iiint,
    	iinfin: iinfin,
    	iiota: iiota,
    	ijlig: ijlig,
    	imacr: imacr,
    	image: image,
    	imagline: imagline,
    	imagpart: imagpart,
    	imath: imath,
    	imof: imof,
    	imped: imped,
    	incare: incare,
    	infin: infin,
    	infintie: infintie,
    	inodot: inodot,
    	int: int,
    	intcal: intcal,
    	integers: integers,
    	intercal: intercal,
    	intlarhk: intlarhk,
    	intprod: intprod,
    	iocy: iocy,
    	iogon: iogon,
    	iopf: iopf,
    	iota: iota,
    	iprod: iprod,
    	iques: iques,
    	iquest: iquest,
    	iscr: iscr,
    	isin: isin,
    	isinE: isinE,
    	isindot: isindot,
    	isins: isins,
    	isinsv: isinsv,
    	isinv: isinv,
    	it: it,
    	itilde: itilde,
    	iukcy: iukcy,
    	ium: ium,
    	iuml: iuml,
    	jcirc: jcirc,
    	jcy: jcy,
    	jfr: jfr,
    	jmath: jmath,
    	jopf: jopf,
    	jscr: jscr,
    	jsercy: jsercy,
    	jukcy: jukcy,
    	kappa: kappa,
    	kappav: kappav,
    	kcedil: kcedil,
    	kcy: kcy,
    	kfr: kfr,
    	kgreen: kgreen,
    	khcy: khcy,
    	kjcy: kjcy,
    	kopf: kopf,
    	kscr: kscr,
    	lAarr: lAarr,
    	lArr: lArr,
    	lAtail: lAtail,
    	lBarr: lBarr,
    	lE: lE,
    	lEg: lEg,
    	lHar: lHar,
    	lacute: lacute,
    	laemptyv: laemptyv,
    	lagran: lagran,
    	lambda: lambda,
    	lang: lang,
    	langd: langd,
    	langle: langle,
    	lap: lap,
    	laqu: laqu,
    	laquo: laquo,
    	larr: larr,
    	larrb: larrb,
    	larrbfs: larrbfs,
    	larrfs: larrfs,
    	larrhk: larrhk,
    	larrlp: larrlp,
    	larrpl: larrpl,
    	larrsim: larrsim,
    	larrtl: larrtl,
    	lat: lat,
    	latail: latail,
    	late: late,
    	lates: lates,
    	lbarr: lbarr,
    	lbbrk: lbbrk,
    	lbrace: lbrace,
    	lbrack: lbrack,
    	lbrke: lbrke,
    	lbrksld: lbrksld,
    	lbrkslu: lbrkslu,
    	lcaron: lcaron,
    	lcedil: lcedil,
    	lceil: lceil,
    	lcub: lcub,
    	lcy: lcy,
    	ldca: ldca,
    	ldquo: ldquo,
    	ldquor: ldquor,
    	ldrdhar: ldrdhar,
    	ldrushar: ldrushar,
    	ldsh: ldsh,
    	le: le,
    	leftarrow: leftarrow,
    	leftarrowtail: leftarrowtail,
    	leftharpoondown: leftharpoondown,
    	leftharpoonup: leftharpoonup,
    	leftleftarrows: leftleftarrows,
    	leftrightarrow: leftrightarrow,
    	leftrightarrows: leftrightarrows,
    	leftrightharpoons: leftrightharpoons,
    	leftrightsquigarrow: leftrightsquigarrow,
    	leftthreetimes: leftthreetimes,
    	leg: leg,
    	leq: leq,
    	leqq: leqq,
    	leqslant: leqslant,
    	les: les,
    	lescc: lescc,
    	lesdot: lesdot,
    	lesdoto: lesdoto,
    	lesdotor: lesdotor,
    	lesg: lesg,
    	lesges: lesges,
    	lessapprox: lessapprox,
    	lessdot: lessdot,
    	lesseqgtr: lesseqgtr,
    	lesseqqgtr: lesseqqgtr,
    	lessgtr: lessgtr,
    	lesssim: lesssim,
    	lfisht: lfisht,
    	lfloor: lfloor,
    	lfr: lfr,
    	lg: lg,
    	lgE: lgE,
    	lhard: lhard,
    	lharu: lharu,
    	lharul: lharul,
    	lhblk: lhblk,
    	ljcy: ljcy,
    	ll: ll,
    	llarr: llarr,
    	llcorner: llcorner,
    	llhard: llhard,
    	lltri: lltri,
    	lmidot: lmidot,
    	lmoust: lmoust,
    	lmoustache: lmoustache,
    	lnE: lnE,
    	lnap: lnap,
    	lnapprox: lnapprox,
    	lne: lne,
    	lneq: lneq,
    	lneqq: lneqq,
    	lnsim: lnsim,
    	loang: loang,
    	loarr: loarr,
    	lobrk: lobrk,
    	longleftarrow: longleftarrow,
    	longleftrightarrow: longleftrightarrow,
    	longmapsto: longmapsto,
    	longrightarrow: longrightarrow,
    	looparrowleft: looparrowleft,
    	looparrowright: looparrowright,
    	lopar: lopar,
    	lopf: lopf,
    	loplus: loplus,
    	lotimes: lotimes,
    	lowast: lowast,
    	lowbar: lowbar,
    	loz: loz,
    	lozenge: lozenge,
    	lozf: lozf,
    	lpar: lpar,
    	lparlt: lparlt,
    	lrarr: lrarr,
    	lrcorner: lrcorner,
    	lrhar: lrhar,
    	lrhard: lrhard,
    	lrm: lrm,
    	lrtri: lrtri,
    	lsaquo: lsaquo,
    	lscr: lscr,
    	lsh: lsh,
    	lsim: lsim,
    	lsime: lsime,
    	lsimg: lsimg,
    	lsqb: lsqb,
    	lsquo: lsquo,
    	lsquor: lsquor,
    	lstrok: lstrok,
    	l: l,
    	lt: lt,
    	ltcc: ltcc,
    	ltcir: ltcir,
    	ltdot: ltdot,
    	lthree: lthree,
    	ltimes: ltimes,
    	ltlarr: ltlarr,
    	ltquest: ltquest,
    	ltrPar: ltrPar,
    	ltri: ltri,
    	ltrie: ltrie,
    	ltrif: ltrif,
    	lurdshar: lurdshar,
    	luruhar: luruhar,
    	lvertneqq: lvertneqq,
    	lvnE: lvnE,
    	mDDot: mDDot,
    	mac: mac,
    	macr: macr,
    	male: male,
    	malt: malt,
    	maltese: maltese,
    	map: map,
    	mapsto: mapsto,
    	mapstodown: mapstodown,
    	mapstoleft: mapstoleft,
    	mapstoup: mapstoup,
    	marker: marker,
    	mcomma: mcomma,
    	mcy: mcy,
    	mdash: mdash,
    	measuredangle: measuredangle,
    	mfr: mfr,
    	mho: mho,
    	micr: micr,
    	micro: micro,
    	mid: mid,
    	midast: midast,
    	midcir: midcir,
    	middo: middo,
    	middot: middot,
    	minus: minus,
    	minusb: minusb,
    	minusd: minusd,
    	minusdu: minusdu,
    	mlcp: mlcp,
    	mldr: mldr,
    	mnplus: mnplus,
    	models: models,
    	mopf: mopf,
    	mp: mp,
    	mscr: mscr,
    	mstpos: mstpos,
    	mu: mu,
    	multimap: multimap,
    	mumap: mumap,
    	nGg: nGg,
    	nGt: nGt,
    	nGtv: nGtv,
    	nLeftarrow: nLeftarrow,
    	nLeftrightarrow: nLeftrightarrow,
    	nLl: nLl,
    	nLt: nLt,
    	nLtv: nLtv,
    	nRightarrow: nRightarrow,
    	nVDash: nVDash,
    	nVdash: nVdash,
    	nabla: nabla,
    	nacute: nacute,
    	nang: nang,
    	nap: nap,
    	napE: napE,
    	napid: napid,
    	napos: napos,
    	napprox: napprox,
    	natur: natur,
    	natural: natural,
    	naturals: naturals,
    	nbs: nbs,
    	nbsp: nbsp,
    	nbump: nbump,
    	nbumpe: nbumpe,
    	ncap: ncap,
    	ncaron: ncaron,
    	ncedil: ncedil,
    	ncong: ncong,
    	ncongdot: ncongdot,
    	ncup: ncup,
    	ncy: ncy,
    	ndash: ndash,
    	ne: ne,
    	neArr: neArr,
    	nearhk: nearhk,
    	nearr: nearr,
    	nearrow: nearrow,
    	nedot: nedot,
    	nequiv: nequiv,
    	nesear: nesear,
    	nesim: nesim,
    	nexist: nexist,
    	nexists: nexists,
    	nfr: nfr,
    	ngE: ngE,
    	nge: nge,
    	ngeq: ngeq,
    	ngeqq: ngeqq,
    	ngeqslant: ngeqslant,
    	nges: nges,
    	ngsim: ngsim,
    	ngt: ngt,
    	ngtr: ngtr,
    	nhArr: nhArr,
    	nharr: nharr,
    	nhpar: nhpar,
    	ni: ni,
    	nis: nis,
    	nisd: nisd,
    	niv: niv,
    	njcy: njcy,
    	nlArr: nlArr,
    	nlE: nlE,
    	nlarr: nlarr,
    	nldr: nldr,
    	nle: nle,
    	nleftarrow: nleftarrow,
    	nleftrightarrow: nleftrightarrow,
    	nleq: nleq,
    	nleqq: nleqq,
    	nleqslant: nleqslant,
    	nles: nles,
    	nless: nless,
    	nlsim: nlsim,
    	nlt: nlt,
    	nltri: nltri,
    	nltrie: nltrie,
    	nmid: nmid,
    	nopf: nopf,
    	no: no,
    	not: not,
    	notin: notin,
    	notinE: notinE,
    	notindot: notindot,
    	notinva: notinva,
    	notinvb: notinvb,
    	notinvc: notinvc,
    	notni: notni,
    	notniva: notniva,
    	notnivb: notnivb,
    	notnivc: notnivc,
    	npar: npar,
    	nparallel: nparallel,
    	nparsl: nparsl,
    	npart: npart,
    	npolint: npolint,
    	npr: npr,
    	nprcue: nprcue,
    	npre: npre,
    	nprec: nprec,
    	npreceq: npreceq,
    	nrArr: nrArr,
    	nrarr: nrarr,
    	nrarrc: nrarrc,
    	nrarrw: nrarrw,
    	nrightarrow: nrightarrow,
    	nrtri: nrtri,
    	nrtrie: nrtrie,
    	nsc: nsc,
    	nsccue: nsccue,
    	nsce: nsce,
    	nscr: nscr,
    	nshortmid: nshortmid,
    	nshortparallel: nshortparallel,
    	nsim: nsim,
    	nsime: nsime,
    	nsimeq: nsimeq,
    	nsmid: nsmid,
    	nspar: nspar,
    	nsqsube: nsqsube,
    	nsqsupe: nsqsupe,
    	nsub: nsub,
    	nsubE: nsubE,
    	nsube: nsube,
    	nsubset: nsubset,
    	nsubseteq: nsubseteq,
    	nsubseteqq: nsubseteqq,
    	nsucc: nsucc,
    	nsucceq: nsucceq,
    	nsup: nsup,
    	nsupE: nsupE,
    	nsupe: nsupe,
    	nsupset: nsupset,
    	nsupseteq: nsupseteq,
    	nsupseteqq: nsupseteqq,
    	ntgl: ntgl,
    	ntild: ntild,
    	ntilde: ntilde,
    	ntlg: ntlg,
    	ntriangleleft: ntriangleleft,
    	ntrianglelefteq: ntrianglelefteq,
    	ntriangleright: ntriangleright,
    	ntrianglerighteq: ntrianglerighteq,
    	nu: nu,
    	num: num,
    	numero: numero,
    	numsp: numsp,
    	nvDash: nvDash,
    	nvHarr: nvHarr,
    	nvap: nvap,
    	nvdash: nvdash,
    	nvge: nvge,
    	nvgt: nvgt,
    	nvinfin: nvinfin,
    	nvlArr: nvlArr,
    	nvle: nvle,
    	nvlt: nvlt,
    	nvltrie: nvltrie,
    	nvrArr: nvrArr,
    	nvrtrie: nvrtrie,
    	nvsim: nvsim,
    	nwArr: nwArr,
    	nwarhk: nwarhk,
    	nwarr: nwarr,
    	nwarrow: nwarrow,
    	nwnear: nwnear,
    	oS: oS,
    	oacut: oacut,
    	oacute: oacute,
    	oast: oast,
    	ocir: ocir,
    	ocirc: ocirc,
    	ocy: ocy,
    	odash: odash,
    	odblac: odblac,
    	odiv: odiv,
    	odot: odot,
    	odsold: odsold,
    	oelig: oelig,
    	ofcir: ofcir,
    	ofr: ofr,
    	ogon: ogon,
    	ograv: ograv,
    	ograve: ograve,
    	ogt: ogt,
    	ohbar: ohbar,
    	ohm: ohm,
    	oint: oint,
    	olarr: olarr,
    	olcir: olcir,
    	olcross: olcross,
    	oline: oline,
    	olt: olt,
    	omacr: omacr,
    	omega: omega,
    	omicron: omicron,
    	omid: omid,
    	ominus: ominus,
    	oopf: oopf,
    	opar: opar,
    	operp: operp,
    	oplus: oplus,
    	or: or,
    	orarr: orarr,
    	ord: ord,
    	order: order$1,
    	orderof: orderof,
    	ordf: ordf,
    	ordm: ordm,
    	origof: origof,
    	oror: oror,
    	orslope: orslope,
    	orv: orv,
    	oscr: oscr,
    	oslas: oslas,
    	oslash: oslash,
    	osol: osol,
    	otild: otild,
    	otilde: otilde,
    	otimes: otimes,
    	otimesas: otimesas,
    	oum: oum,
    	ouml: ouml,
    	ovbar: ovbar,
    	par: par,
    	para: para,
    	parallel: parallel,
    	parsim: parsim,
    	parsl: parsl,
    	part: part,
    	pcy: pcy,
    	percnt: percnt,
    	period: period,
    	permil: permil,
    	perp: perp,
    	pertenk: pertenk,
    	pfr: pfr,
    	phi: phi,
    	phiv: phiv,
    	phmmat: phmmat,
    	phone: phone,
    	pi: pi,
    	pitchfork: pitchfork,
    	piv: piv,
    	planck: planck,
    	planckh: planckh,
    	plankv: plankv,
    	plus: plus,
    	plusacir: plusacir,
    	plusb: plusb,
    	pluscir: pluscir,
    	plusdo: plusdo,
    	plusdu: plusdu,
    	pluse: pluse,
    	plusm: plusm,
    	plusmn: plusmn,
    	plussim: plussim,
    	plustwo: plustwo,
    	pm: pm,
    	pointint: pointint,
    	popf: popf,
    	poun: poun,
    	pound: pound,
    	pr: pr,
    	prE: prE,
    	prap: prap,
    	prcue: prcue,
    	pre: pre,
    	prec: prec,
    	precapprox: precapprox,
    	preccurlyeq: preccurlyeq,
    	preceq: preceq,
    	precnapprox: precnapprox,
    	precneqq: precneqq,
    	precnsim: precnsim,
    	precsim: precsim,
    	prime: prime,
    	primes: primes,
    	prnE: prnE,
    	prnap: prnap,
    	prnsim: prnsim,
    	prod: prod,
    	profalar: profalar,
    	profline: profline,
    	profsurf: profsurf,
    	prop: prop,
    	propto: propto,
    	prsim: prsim,
    	prurel: prurel,
    	pscr: pscr,
    	psi: psi,
    	puncsp: puncsp,
    	qfr: qfr,
    	qint: qint,
    	qopf: qopf,
    	qprime: qprime,
    	qscr: qscr,
    	quaternions: quaternions,
    	quatint: quatint,
    	quest: quest,
    	questeq: questeq,
    	quo: quo,
    	quot: quot,
    	rAarr: rAarr,
    	rArr: rArr,
    	rAtail: rAtail,
    	rBarr: rBarr,
    	rHar: rHar,
    	race: race,
    	racute: racute,
    	radic: radic,
    	raemptyv: raemptyv,
    	rang: rang,
    	rangd: rangd,
    	range: range,
    	rangle: rangle,
    	raqu: raqu,
    	raquo: raquo,
    	rarr: rarr,
    	rarrap: rarrap,
    	rarrb: rarrb,
    	rarrbfs: rarrbfs,
    	rarrc: rarrc,
    	rarrfs: rarrfs,
    	rarrhk: rarrhk,
    	rarrlp: rarrlp,
    	rarrpl: rarrpl,
    	rarrsim: rarrsim,
    	rarrtl: rarrtl,
    	rarrw: rarrw,
    	ratail: ratail,
    	ratio: ratio,
    	rationals: rationals,
    	rbarr: rbarr,
    	rbbrk: rbbrk,
    	rbrace: rbrace,
    	rbrack: rbrack,
    	rbrke: rbrke,
    	rbrksld: rbrksld,
    	rbrkslu: rbrkslu,
    	rcaron: rcaron,
    	rcedil: rcedil,
    	rceil: rceil,
    	rcub: rcub,
    	rcy: rcy,
    	rdca: rdca,
    	rdldhar: rdldhar,
    	rdquo: rdquo,
    	rdquor: rdquor,
    	rdsh: rdsh,
    	real: real,
    	realine: realine,
    	realpart: realpart,
    	reals: reals,
    	rect: rect,
    	re: re,
    	reg: reg,
    	rfisht: rfisht,
    	rfloor: rfloor,
    	rfr: rfr,
    	rhard: rhard,
    	rharu: rharu,
    	rharul: rharul,
    	rho: rho,
    	rhov: rhov,
    	rightarrow: rightarrow,
    	rightarrowtail: rightarrowtail,
    	rightharpoondown: rightharpoondown,
    	rightharpoonup: rightharpoonup,
    	rightleftarrows: rightleftarrows,
    	rightleftharpoons: rightleftharpoons,
    	rightrightarrows: rightrightarrows,
    	rightsquigarrow: rightsquigarrow,
    	rightthreetimes: rightthreetimes,
    	ring: ring,
    	risingdotseq: risingdotseq,
    	rlarr: rlarr,
    	rlhar: rlhar,
    	rlm: rlm,
    	rmoust: rmoust,
    	rmoustache: rmoustache,
    	rnmid: rnmid,
    	roang: roang,
    	roarr: roarr,
    	robrk: robrk,
    	ropar: ropar,
    	ropf: ropf,
    	roplus: roplus,
    	rotimes: rotimes,
    	rpar: rpar,
    	rpargt: rpargt,
    	rppolint: rppolint,
    	rrarr: rrarr,
    	rsaquo: rsaquo,
    	rscr: rscr,
    	rsh: rsh,
    	rsqb: rsqb,
    	rsquo: rsquo,
    	rsquor: rsquor,
    	rthree: rthree,
    	rtimes: rtimes,
    	rtri: rtri,
    	rtrie: rtrie,
    	rtrif: rtrif,
    	rtriltri: rtriltri,
    	ruluhar: ruluhar,
    	rx: rx,
    	sacute: sacute,
    	sbquo: sbquo,
    	sc: sc,
    	scE: scE,
    	scap: scap,
    	scaron: scaron,
    	sccue: sccue,
    	sce: sce,
    	scedil: scedil,
    	scirc: scirc,
    	scnE: scnE,
    	scnap: scnap,
    	scnsim: scnsim,
    	scpolint: scpolint,
    	scsim: scsim,
    	scy: scy,
    	sdot: sdot,
    	sdotb: sdotb,
    	sdote: sdote,
    	seArr: seArr,
    	searhk: searhk,
    	searr: searr,
    	searrow: searrow,
    	sec: sec,
    	sect: sect,
    	semi: semi,
    	seswar: seswar,
    	setminus: setminus,
    	setmn: setmn,
    	sext: sext,
    	sfr: sfr,
    	sfrown: sfrown,
    	sharp: sharp,
    	shchcy: shchcy,
    	shcy: shcy,
    	shortmid: shortmid,
    	shortparallel: shortparallel,
    	sh: sh,
    	shy: shy,
    	sigma: sigma,
    	sigmaf: sigmaf,
    	sigmav: sigmav,
    	sim: sim,
    	simdot: simdot,
    	sime: sime,
    	simeq: simeq,
    	simg: simg,
    	simgE: simgE,
    	siml: siml,
    	simlE: simlE,
    	simne: simne,
    	simplus: simplus,
    	simrarr: simrarr,
    	slarr: slarr,
    	smallsetminus: smallsetminus,
    	smashp: smashp,
    	smeparsl: smeparsl,
    	smid: smid,
    	smile: smile,
    	smt: smt,
    	smte: smte,
    	smtes: smtes,
    	softcy: softcy,
    	sol: sol,
    	solb: solb,
    	solbar: solbar,
    	sopf: sopf,
    	spades: spades,
    	spadesuit: spadesuit,
    	spar: spar,
    	sqcap: sqcap,
    	sqcaps: sqcaps,
    	sqcup: sqcup,
    	sqcups: sqcups,
    	sqsub: sqsub,
    	sqsube: sqsube,
    	sqsubset: sqsubset,
    	sqsubseteq: sqsubseteq,
    	sqsup: sqsup,
    	sqsupe: sqsupe,
    	sqsupset: sqsupset,
    	sqsupseteq: sqsupseteq,
    	squ: squ,
    	square: square,
    	squarf: squarf,
    	squf: squf,
    	srarr: srarr,
    	sscr: sscr,
    	ssetmn: ssetmn,
    	ssmile: ssmile,
    	sstarf: sstarf,
    	star: star,
    	starf: starf,
    	straightepsilon: straightepsilon,
    	straightphi: straightphi,
    	strns: strns,
    	sub: sub,
    	subE: subE,
    	subdot: subdot,
    	sube: sube,
    	subedot: subedot,
    	submult: submult,
    	subnE: subnE,
    	subne: subne,
    	subplus: subplus,
    	subrarr: subrarr,
    	subset: subset,
    	subseteq: subseteq,
    	subseteqq: subseteqq,
    	subsetneq: subsetneq,
    	subsetneqq: subsetneqq,
    	subsim: subsim,
    	subsub: subsub,
    	subsup: subsup,
    	succ: succ,
    	succapprox: succapprox,
    	succcurlyeq: succcurlyeq,
    	succeq: succeq,
    	succnapprox: succnapprox,
    	succneqq: succneqq,
    	succnsim: succnsim,
    	succsim: succsim,
    	sum: sum,
    	sung: sung,
    	sup: sup,
    	sup1: sup1,
    	sup2: sup2,
    	sup3: sup3,
    	supE: supE,
    	supdot: supdot,
    	supdsub: supdsub,
    	supe: supe,
    	supedot: supedot,
    	suphsol: suphsol,
    	suphsub: suphsub,
    	suplarr: suplarr,
    	supmult: supmult,
    	supnE: supnE,
    	supne: supne,
    	supplus: supplus,
    	supset: supset,
    	supseteq: supseteq,
    	supseteqq: supseteqq,
    	supsetneq: supsetneq,
    	supsetneqq: supsetneqq,
    	supsim: supsim,
    	supsub: supsub,
    	supsup: supsup,
    	swArr: swArr,
    	swarhk: swarhk,
    	swarr: swarr,
    	swarrow: swarrow,
    	swnwar: swnwar,
    	szli: szli,
    	szlig: szlig,
    	target: target,
    	tau: tau,
    	tbrk: tbrk,
    	tcaron: tcaron,
    	tcedil: tcedil,
    	tcy: tcy,
    	tdot: tdot,
    	telrec: telrec,
    	tfr: tfr,
    	there4: there4,
    	therefore: therefore,
    	theta: theta,
    	thetasym: thetasym,
    	thetav: thetav,
    	thickapprox: thickapprox,
    	thicksim: thicksim,
    	thinsp: thinsp,
    	thkap: thkap,
    	thksim: thksim,
    	thor: thor,
    	thorn: thorn,
    	tilde: tilde,
    	time: time,
    	times: times,
    	timesb: timesb,
    	timesbar: timesbar,
    	timesd: timesd,
    	tint: tint,
    	toea: toea,
    	top: top,
    	topbot: topbot,
    	topcir: topcir,
    	topf: topf,
    	topfork: topfork,
    	tosa: tosa,
    	tprime: tprime,
    	trade: trade,
    	triangle: triangle,
    	triangledown: triangledown,
    	triangleleft: triangleleft,
    	trianglelefteq: trianglelefteq,
    	triangleq: triangleq,
    	triangleright: triangleright,
    	trianglerighteq: trianglerighteq,
    	tridot: tridot,
    	trie: trie,
    	triminus: triminus,
    	triplus: triplus,
    	trisb: trisb,
    	tritime: tritime,
    	trpezium: trpezium,
    	tscr: tscr,
    	tscy: tscy,
    	tshcy: tshcy,
    	tstrok: tstrok,
    	twixt: twixt,
    	twoheadleftarrow: twoheadleftarrow,
    	twoheadrightarrow: twoheadrightarrow,
    	uArr: uArr,
    	uHar: uHar,
    	uacut: uacut,
    	uacute: uacute,
    	uarr: uarr,
    	ubrcy: ubrcy,
    	ubreve: ubreve,
    	ucir: ucir,
    	ucirc: ucirc,
    	ucy: ucy,
    	udarr: udarr,
    	udblac: udblac,
    	udhar: udhar,
    	ufisht: ufisht,
    	ufr: ufr,
    	ugrav: ugrav,
    	ugrave: ugrave,
    	uharl: uharl,
    	uharr: uharr,
    	uhblk: uhblk,
    	ulcorn: ulcorn,
    	ulcorner: ulcorner,
    	ulcrop: ulcrop,
    	ultri: ultri,
    	umacr: umacr,
    	um: um,
    	uml: uml,
    	uogon: uogon,
    	uopf: uopf,
    	uparrow: uparrow,
    	updownarrow: updownarrow,
    	upharpoonleft: upharpoonleft,
    	upharpoonright: upharpoonright,
    	uplus: uplus,
    	upsi: upsi,
    	upsih: upsih,
    	upsilon: upsilon,
    	upuparrows: upuparrows,
    	urcorn: urcorn,
    	urcorner: urcorner,
    	urcrop: urcrop,
    	uring: uring,
    	urtri: urtri,
    	uscr: uscr,
    	utdot: utdot,
    	utilde: utilde,
    	utri: utri,
    	utrif: utrif,
    	uuarr: uuarr,
    	uum: uum,
    	uuml: uuml,
    	uwangle: uwangle,
    	vArr: vArr,
    	vBar: vBar,
    	vBarv: vBarv,
    	vDash: vDash,
    	vangrt: vangrt,
    	varepsilon: varepsilon,
    	varkappa: varkappa,
    	varnothing: varnothing,
    	varphi: varphi,
    	varpi: varpi,
    	varpropto: varpropto,
    	varr: varr,
    	varrho: varrho,
    	varsigma: varsigma,
    	varsubsetneq: varsubsetneq,
    	varsubsetneqq: varsubsetneqq,
    	varsupsetneq: varsupsetneq,
    	varsupsetneqq: varsupsetneqq,
    	vartheta: vartheta,
    	vartriangleleft: vartriangleleft,
    	vartriangleright: vartriangleright,
    	vcy: vcy,
    	vdash: vdash,
    	vee: vee,
    	veebar: veebar,
    	veeeq: veeeq,
    	vellip: vellip,
    	verbar: verbar,
    	vert: vert,
    	vfr: vfr,
    	vltri: vltri,
    	vnsub: vnsub,
    	vnsup: vnsup,
    	vopf: vopf,
    	vprop: vprop,
    	vrtri: vrtri,
    	vscr: vscr,
    	vsubnE: vsubnE,
    	vsubne: vsubne,
    	vsupnE: vsupnE,
    	vsupne: vsupne,
    	vzigzag: vzigzag,
    	wcirc: wcirc,
    	wedbar: wedbar,
    	wedge: wedge,
    	wedgeq: wedgeq,
    	weierp: weierp,
    	wfr: wfr,
    	wopf: wopf,
    	wp: wp,
    	wr: wr,
    	wreath: wreath,
    	wscr: wscr,
    	xcap: xcap,
    	xcirc: xcirc,
    	xcup: xcup,
    	xdtri: xdtri,
    	xfr: xfr,
    	xhArr: xhArr,
    	xharr: xharr,
    	xi: xi,
    	xlArr: xlArr,
    	xlarr: xlarr,
    	xmap: xmap,
    	xnis: xnis,
    	xodot: xodot,
    	xopf: xopf,
    	xoplus: xoplus,
    	xotime: xotime,
    	xrArr: xrArr,
    	xrarr: xrarr,
    	xscr: xscr,
    	xsqcup: xsqcup,
    	xuplus: xuplus,
    	xutri: xutri,
    	xvee: xvee,
    	xwedge: xwedge,
    	yacut: yacut,
    	yacute: yacute,
    	yacy: yacy,
    	ycirc: ycirc,
    	ycy: ycy,
    	ye: ye,
    	yen: yen,
    	yfr: yfr,
    	yicy: yicy,
    	yopf: yopf,
    	yscr: yscr,
    	yucy: yucy,
    	yum: yum,
    	yuml: yuml,
    	zacute: zacute,
    	zcaron: zcaron,
    	zcy: zcy,
    	zdot: zdot,
    	zeetrf: zeetrf,
    	zeta: zeta,
    	zfr: zfr,
    	zhcy: zhcy,
    	zigrarr: zigrarr,
    	zopf: zopf,
    	zscr: zscr,
    	zwj: zwj,
    	zwnj: zwnj,
    	"Map": "⤅",
    	"in": "∈"
    };

    var characterEntities = /*#__PURE__*/Object.freeze({
        AEli: AEli,
        AElig: AElig,
        AM: AM,
        AMP: AMP,
        Aacut: Aacut,
        Aacute: Aacute,
        Abreve: Abreve,
        Acir: Acir,
        Acirc: Acirc,
        Acy: Acy,
        Afr: Afr,
        Agrav: Agrav,
        Agrave: Agrave,
        Alpha: Alpha,
        Amacr: Amacr,
        And: And,
        Aogon: Aogon,
        Aopf: Aopf,
        ApplyFunction: ApplyFunction,
        Arin: Arin,
        Aring: Aring,
        Ascr: Ascr,
        Assign: Assign,
        Atild: Atild,
        Atilde: Atilde,
        Aum: Aum,
        Auml: Auml,
        Backslash: Backslash,
        Barv: Barv,
        Barwed: Barwed,
        Bcy: Bcy,
        Because: Because,
        Bernoullis: Bernoullis,
        Beta: Beta,
        Bfr: Bfr,
        Bopf: Bopf,
        Breve: Breve,
        Bscr: Bscr,
        Bumpeq: Bumpeq,
        CHcy: CHcy,
        COP: COP,
        COPY: COPY,
        Cacute: Cacute,
        Cap: Cap,
        CapitalDifferentialD: CapitalDifferentialD,
        Cayleys: Cayleys,
        Ccaron: Ccaron,
        Ccedi: Ccedi,
        Ccedil: Ccedil,
        Ccirc: Ccirc,
        Cconint: Cconint,
        Cdot: Cdot,
        Cedilla: Cedilla,
        CenterDot: CenterDot,
        Cfr: Cfr,
        Chi: Chi,
        CircleDot: CircleDot,
        CircleMinus: CircleMinus,
        CirclePlus: CirclePlus,
        CircleTimes: CircleTimes,
        ClockwiseContourIntegral: ClockwiseContourIntegral,
        CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
        CloseCurlyQuote: CloseCurlyQuote,
        Colon: Colon,
        Colone: Colone,
        Congruent: Congruent,
        Conint: Conint,
        ContourIntegral: ContourIntegral,
        Copf: Copf,
        Coproduct: Coproduct,
        CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
        Cross: Cross,
        Cscr: Cscr,
        Cup: Cup,
        CupCap: CupCap,
        DD: DD,
        DDotrahd: DDotrahd,
        DJcy: DJcy,
        DScy: DScy,
        DZcy: DZcy,
        Dagger: Dagger,
        Darr: Darr,
        Dashv: Dashv,
        Dcaron: Dcaron,
        Dcy: Dcy,
        Del: Del,
        Delta: Delta,
        Dfr: Dfr,
        DiacriticalAcute: DiacriticalAcute,
        DiacriticalDot: DiacriticalDot,
        DiacriticalDoubleAcute: DiacriticalDoubleAcute,
        DiacriticalGrave: DiacriticalGrave,
        DiacriticalTilde: DiacriticalTilde,
        Diamond: Diamond,
        DifferentialD: DifferentialD,
        Dopf: Dopf,
        Dot: Dot,
        DotDot: DotDot,
        DotEqual: DotEqual,
        DoubleContourIntegral: DoubleContourIntegral,
        DoubleDot: DoubleDot,
        DoubleDownArrow: DoubleDownArrow,
        DoubleLeftArrow: DoubleLeftArrow,
        DoubleLeftRightArrow: DoubleLeftRightArrow,
        DoubleLeftTee: DoubleLeftTee,
        DoubleLongLeftArrow: DoubleLongLeftArrow,
        DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
        DoubleLongRightArrow: DoubleLongRightArrow,
        DoubleRightArrow: DoubleRightArrow,
        DoubleRightTee: DoubleRightTee,
        DoubleUpArrow: DoubleUpArrow,
        DoubleUpDownArrow: DoubleUpDownArrow,
        DoubleVerticalBar: DoubleVerticalBar,
        DownArrow: DownArrow,
        DownArrowBar: DownArrowBar,
        DownArrowUpArrow: DownArrowUpArrow,
        DownBreve: DownBreve,
        DownLeftRightVector: DownLeftRightVector,
        DownLeftTeeVector: DownLeftTeeVector,
        DownLeftVector: DownLeftVector,
        DownLeftVectorBar: DownLeftVectorBar,
        DownRightTeeVector: DownRightTeeVector,
        DownRightVector: DownRightVector,
        DownRightVectorBar: DownRightVectorBar,
        DownTee: DownTee,
        DownTeeArrow: DownTeeArrow,
        Downarrow: Downarrow,
        Dscr: Dscr,
        Dstrok: Dstrok,
        ENG: ENG,
        ET: ET,
        ETH: ETH,
        Eacut: Eacut,
        Eacute: Eacute,
        Ecaron: Ecaron,
        Ecir: Ecir,
        Ecirc: Ecirc,
        Ecy: Ecy,
        Edot: Edot,
        Efr: Efr,
        Egrav: Egrav,
        Egrave: Egrave,
        Element: Element,
        Emacr: Emacr,
        EmptySmallSquare: EmptySmallSquare,
        EmptyVerySmallSquare: EmptyVerySmallSquare,
        Eogon: Eogon,
        Eopf: Eopf,
        Epsilon: Epsilon,
        Equal: Equal,
        EqualTilde: EqualTilde,
        Equilibrium: Equilibrium,
        Escr: Escr,
        Esim: Esim,
        Eta: Eta,
        Eum: Eum,
        Euml: Euml,
        Exists: Exists,
        ExponentialE: ExponentialE,
        Fcy: Fcy,
        Ffr: Ffr,
        FilledSmallSquare: FilledSmallSquare,
        FilledVerySmallSquare: FilledVerySmallSquare,
        Fopf: Fopf,
        ForAll: ForAll,
        Fouriertrf: Fouriertrf,
        Fscr: Fscr,
        GJcy: GJcy,
        G: G,
        GT: GT,
        Gamma: Gamma,
        Gammad: Gammad,
        Gbreve: Gbreve,
        Gcedil: Gcedil,
        Gcirc: Gcirc,
        Gcy: Gcy,
        Gdot: Gdot,
        Gfr: Gfr,
        Gg: Gg,
        Gopf: Gopf,
        GreaterEqual: GreaterEqual,
        GreaterEqualLess: GreaterEqualLess,
        GreaterFullEqual: GreaterFullEqual,
        GreaterGreater: GreaterGreater,
        GreaterLess: GreaterLess,
        GreaterSlantEqual: GreaterSlantEqual,
        GreaterTilde: GreaterTilde,
        Gscr: Gscr,
        Gt: Gt,
        HARDcy: HARDcy,
        Hacek: Hacek,
        Hat: Hat,
        Hcirc: Hcirc,
        Hfr: Hfr,
        HilbertSpace: HilbertSpace,
        Hopf: Hopf,
        HorizontalLine: HorizontalLine,
        Hscr: Hscr,
        Hstrok: Hstrok,
        HumpDownHump: HumpDownHump,
        HumpEqual: HumpEqual,
        IEcy: IEcy,
        IJlig: IJlig,
        IOcy: IOcy,
        Iacut: Iacut,
        Iacute: Iacute,
        Icir: Icir,
        Icirc: Icirc,
        Icy: Icy,
        Idot: Idot,
        Ifr: Ifr,
        Igrav: Igrav,
        Igrave: Igrave,
        Im: Im,
        Imacr: Imacr,
        ImaginaryI: ImaginaryI,
        Implies: Implies,
        Int: Int,
        Integral: Integral,
        Intersection: Intersection,
        InvisibleComma: InvisibleComma,
        InvisibleTimes: InvisibleTimes,
        Iogon: Iogon,
        Iopf: Iopf,
        Iota: Iota,
        Iscr: Iscr,
        Itilde: Itilde,
        Iukcy: Iukcy,
        Ium: Ium,
        Iuml: Iuml,
        Jcirc: Jcirc,
        Jcy: Jcy,
        Jfr: Jfr,
        Jopf: Jopf,
        Jscr: Jscr,
        Jsercy: Jsercy,
        Jukcy: Jukcy,
        KHcy: KHcy,
        KJcy: KJcy,
        Kappa: Kappa,
        Kcedil: Kcedil,
        Kcy: Kcy,
        Kfr: Kfr,
        Kopf: Kopf,
        Kscr: Kscr,
        LJcy: LJcy,
        L: L,
        LT: LT,
        Lacute: Lacute,
        Lambda: Lambda,
        Lang: Lang,
        Laplacetrf: Laplacetrf,
        Larr: Larr,
        Lcaron: Lcaron,
        Lcedil: Lcedil,
        Lcy: Lcy,
        LeftAngleBracket: LeftAngleBracket,
        LeftArrow: LeftArrow,
        LeftArrowBar: LeftArrowBar,
        LeftArrowRightArrow: LeftArrowRightArrow,
        LeftCeiling: LeftCeiling,
        LeftDoubleBracket: LeftDoubleBracket,
        LeftDownTeeVector: LeftDownTeeVector,
        LeftDownVector: LeftDownVector,
        LeftDownVectorBar: LeftDownVectorBar,
        LeftFloor: LeftFloor,
        LeftRightArrow: LeftRightArrow,
        LeftRightVector: LeftRightVector,
        LeftTee: LeftTee,
        LeftTeeArrow: LeftTeeArrow,
        LeftTeeVector: LeftTeeVector,
        LeftTriangle: LeftTriangle,
        LeftTriangleBar: LeftTriangleBar,
        LeftTriangleEqual: LeftTriangleEqual,
        LeftUpDownVector: LeftUpDownVector,
        LeftUpTeeVector: LeftUpTeeVector,
        LeftUpVector: LeftUpVector,
        LeftUpVectorBar: LeftUpVectorBar,
        LeftVector: LeftVector,
        LeftVectorBar: LeftVectorBar,
        Leftarrow: Leftarrow,
        Leftrightarrow: Leftrightarrow,
        LessEqualGreater: LessEqualGreater,
        LessFullEqual: LessFullEqual,
        LessGreater: LessGreater,
        LessLess: LessLess,
        LessSlantEqual: LessSlantEqual,
        LessTilde: LessTilde,
        Lfr: Lfr,
        Ll: Ll,
        Lleftarrow: Lleftarrow,
        Lmidot: Lmidot,
        LongLeftArrow: LongLeftArrow,
        LongLeftRightArrow: LongLeftRightArrow,
        LongRightArrow: LongRightArrow,
        Longleftarrow: Longleftarrow,
        Longleftrightarrow: Longleftrightarrow,
        Longrightarrow: Longrightarrow,
        Lopf: Lopf,
        LowerLeftArrow: LowerLeftArrow,
        LowerRightArrow: LowerRightArrow,
        Lscr: Lscr,
        Lsh: Lsh,
        Lstrok: Lstrok,
        Lt: Lt,
        Mcy: Mcy,
        MediumSpace: MediumSpace,
        Mellintrf: Mellintrf,
        Mfr: Mfr,
        MinusPlus: MinusPlus,
        Mopf: Mopf,
        Mscr: Mscr,
        Mu: Mu,
        NJcy: NJcy,
        Nacute: Nacute,
        Ncaron: Ncaron,
        Ncedil: Ncedil,
        Ncy: Ncy,
        NegativeMediumSpace: NegativeMediumSpace,
        NegativeThickSpace: NegativeThickSpace,
        NegativeThinSpace: NegativeThinSpace,
        NegativeVeryThinSpace: NegativeVeryThinSpace,
        NestedGreaterGreater: NestedGreaterGreater,
        NestedLessLess: NestedLessLess,
        NewLine: NewLine,
        Nfr: Nfr,
        NoBreak: NoBreak,
        NonBreakingSpace: NonBreakingSpace,
        Nopf: Nopf,
        Not: Not,
        NotCongruent: NotCongruent,
        NotCupCap: NotCupCap,
        NotDoubleVerticalBar: NotDoubleVerticalBar,
        NotElement: NotElement,
        NotEqual: NotEqual,
        NotEqualTilde: NotEqualTilde,
        NotExists: NotExists,
        NotGreater: NotGreater,
        NotGreaterEqual: NotGreaterEqual,
        NotGreaterFullEqual: NotGreaterFullEqual,
        NotGreaterGreater: NotGreaterGreater,
        NotGreaterLess: NotGreaterLess,
        NotGreaterSlantEqual: NotGreaterSlantEqual,
        NotGreaterTilde: NotGreaterTilde,
        NotHumpDownHump: NotHumpDownHump,
        NotHumpEqual: NotHumpEqual,
        NotLeftTriangle: NotLeftTriangle,
        NotLeftTriangleBar: NotLeftTriangleBar,
        NotLeftTriangleEqual: NotLeftTriangleEqual,
        NotLess: NotLess,
        NotLessEqual: NotLessEqual,
        NotLessGreater: NotLessGreater,
        NotLessLess: NotLessLess,
        NotLessSlantEqual: NotLessSlantEqual,
        NotLessTilde: NotLessTilde,
        NotNestedGreaterGreater: NotNestedGreaterGreater,
        NotNestedLessLess: NotNestedLessLess,
        NotPrecedes: NotPrecedes,
        NotPrecedesEqual: NotPrecedesEqual,
        NotPrecedesSlantEqual: NotPrecedesSlantEqual,
        NotReverseElement: NotReverseElement,
        NotRightTriangle: NotRightTriangle,
        NotRightTriangleBar: NotRightTriangleBar,
        NotRightTriangleEqual: NotRightTriangleEqual,
        NotSquareSubset: NotSquareSubset,
        NotSquareSubsetEqual: NotSquareSubsetEqual,
        NotSquareSuperset: NotSquareSuperset,
        NotSquareSupersetEqual: NotSquareSupersetEqual,
        NotSubset: NotSubset,
        NotSubsetEqual: NotSubsetEqual,
        NotSucceeds: NotSucceeds,
        NotSucceedsEqual: NotSucceedsEqual,
        NotSucceedsSlantEqual: NotSucceedsSlantEqual,
        NotSucceedsTilde: NotSucceedsTilde,
        NotSuperset: NotSuperset,
        NotSupersetEqual: NotSupersetEqual,
        NotTilde: NotTilde,
        NotTildeEqual: NotTildeEqual,
        NotTildeFullEqual: NotTildeFullEqual,
        NotTildeTilde: NotTildeTilde,
        NotVerticalBar: NotVerticalBar,
        Nscr: Nscr,
        Ntild: Ntild,
        Ntilde: Ntilde,
        Nu: Nu,
        OElig: OElig,
        Oacut: Oacut,
        Oacute: Oacute,
        Ocir: Ocir,
        Ocirc: Ocirc,
        Ocy: Ocy,
        Odblac: Odblac,
        Ofr: Ofr,
        Ograv: Ograv,
        Ograve: Ograve,
        Omacr: Omacr,
        Omega: Omega,
        Omicron: Omicron,
        Oopf: Oopf,
        OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
        OpenCurlyQuote: OpenCurlyQuote,
        Or: Or,
        Oscr: Oscr,
        Oslas: Oslas,
        Oslash: Oslash,
        Otild: Otild,
        Otilde: Otilde,
        Otimes: Otimes,
        Oum: Oum,
        Ouml: Ouml,
        OverBar: OverBar,
        OverBrace: OverBrace,
        OverBracket: OverBracket,
        OverParenthesis: OverParenthesis,
        PartialD: PartialD,
        Pcy: Pcy,
        Pfr: Pfr,
        Phi: Phi,
        Pi: Pi,
        PlusMinus: PlusMinus,
        Poincareplane: Poincareplane,
        Popf: Popf,
        Pr: Pr,
        Precedes: Precedes,
        PrecedesEqual: PrecedesEqual,
        PrecedesSlantEqual: PrecedesSlantEqual,
        PrecedesTilde: PrecedesTilde,
        Prime: Prime,
        Product: Product,
        Proportion: Proportion,
        Proportional: Proportional,
        Pscr: Pscr,
        Psi: Psi,
        QUO: QUO,
        QUOT: QUOT,
        Qfr: Qfr,
        Qopf: Qopf,
        Qscr: Qscr,
        RBarr: RBarr,
        RE: RE,
        REG: REG,
        Racute: Racute,
        Rang: Rang,
        Rarr: Rarr,
        Rarrtl: Rarrtl,
        Rcaron: Rcaron,
        Rcedil: Rcedil,
        Rcy: Rcy,
        Re: Re,
        ReverseElement: ReverseElement,
        ReverseEquilibrium: ReverseEquilibrium,
        ReverseUpEquilibrium: ReverseUpEquilibrium,
        Rfr: Rfr,
        Rho: Rho,
        RightAngleBracket: RightAngleBracket,
        RightArrow: RightArrow,
        RightArrowBar: RightArrowBar,
        RightArrowLeftArrow: RightArrowLeftArrow,
        RightCeiling: RightCeiling,
        RightDoubleBracket: RightDoubleBracket,
        RightDownTeeVector: RightDownTeeVector,
        RightDownVector: RightDownVector,
        RightDownVectorBar: RightDownVectorBar,
        RightFloor: RightFloor,
        RightTee: RightTee,
        RightTeeArrow: RightTeeArrow,
        RightTeeVector: RightTeeVector,
        RightTriangle: RightTriangle,
        RightTriangleBar: RightTriangleBar,
        RightTriangleEqual: RightTriangleEqual,
        RightUpDownVector: RightUpDownVector,
        RightUpTeeVector: RightUpTeeVector,
        RightUpVector: RightUpVector,
        RightUpVectorBar: RightUpVectorBar,
        RightVector: RightVector,
        RightVectorBar: RightVectorBar,
        Rightarrow: Rightarrow,
        Ropf: Ropf,
        RoundImplies: RoundImplies,
        Rrightarrow: Rrightarrow,
        Rscr: Rscr,
        Rsh: Rsh,
        RuleDelayed: RuleDelayed,
        SHCHcy: SHCHcy,
        SHcy: SHcy,
        SOFTcy: SOFTcy,
        Sacute: Sacute,
        Sc: Sc,
        Scaron: Scaron,
        Scedil: Scedil,
        Scirc: Scirc,
        Scy: Scy,
        Sfr: Sfr,
        ShortDownArrow: ShortDownArrow,
        ShortLeftArrow: ShortLeftArrow,
        ShortRightArrow: ShortRightArrow,
        ShortUpArrow: ShortUpArrow,
        Sigma: Sigma,
        SmallCircle: SmallCircle,
        Sopf: Sopf,
        Sqrt: Sqrt,
        Square: Square,
        SquareIntersection: SquareIntersection,
        SquareSubset: SquareSubset,
        SquareSubsetEqual: SquareSubsetEqual,
        SquareSuperset: SquareSuperset,
        SquareSupersetEqual: SquareSupersetEqual,
        SquareUnion: SquareUnion,
        Sscr: Sscr,
        Star: Star,
        Sub: Sub,
        Subset: Subset,
        SubsetEqual: SubsetEqual,
        Succeeds: Succeeds,
        SucceedsEqual: SucceedsEqual,
        SucceedsSlantEqual: SucceedsSlantEqual,
        SucceedsTilde: SucceedsTilde,
        SuchThat: SuchThat,
        Sum: Sum,
        Sup: Sup,
        Superset: Superset,
        SupersetEqual: SupersetEqual,
        Supset: Supset,
        THOR: THOR,
        THORN: THORN,
        TRADE: TRADE,
        TSHcy: TSHcy,
        TScy: TScy,
        Tab: Tab,
        Tau: Tau,
        Tcaron: Tcaron,
        Tcedil: Tcedil,
        Tcy: Tcy,
        Tfr: Tfr,
        Therefore: Therefore,
        Theta: Theta,
        ThickSpace: ThickSpace,
        ThinSpace: ThinSpace,
        Tilde: Tilde,
        TildeEqual: TildeEqual,
        TildeFullEqual: TildeFullEqual,
        TildeTilde: TildeTilde,
        Topf: Topf,
        TripleDot: TripleDot,
        Tscr: Tscr,
        Tstrok: Tstrok,
        Uacut: Uacut,
        Uacute: Uacute,
        Uarr: Uarr,
        Uarrocir: Uarrocir,
        Ubrcy: Ubrcy,
        Ubreve: Ubreve,
        Ucir: Ucir,
        Ucirc: Ucirc,
        Ucy: Ucy,
        Udblac: Udblac,
        Ufr: Ufr,
        Ugrav: Ugrav,
        Ugrave: Ugrave,
        Umacr: Umacr,
        UnderBar: UnderBar,
        UnderBrace: UnderBrace,
        UnderBracket: UnderBracket,
        UnderParenthesis: UnderParenthesis,
        Union: Union,
        UnionPlus: UnionPlus,
        Uogon: Uogon,
        Uopf: Uopf,
        UpArrow: UpArrow,
        UpArrowBar: UpArrowBar,
        UpArrowDownArrow: UpArrowDownArrow,
        UpDownArrow: UpDownArrow,
        UpEquilibrium: UpEquilibrium,
        UpTee: UpTee,
        UpTeeArrow: UpTeeArrow,
        Uparrow: Uparrow,
        Updownarrow: Updownarrow,
        UpperLeftArrow: UpperLeftArrow,
        UpperRightArrow: UpperRightArrow,
        Upsi: Upsi,
        Upsilon: Upsilon,
        Uring: Uring,
        Uscr: Uscr,
        Utilde: Utilde,
        Uum: Uum,
        Uuml: Uuml,
        VDash: VDash,
        Vbar: Vbar,
        Vcy: Vcy,
        Vdash: Vdash,
        Vdashl: Vdashl,
        Vee: Vee,
        Verbar: Verbar,
        Vert: Vert,
        VerticalBar: VerticalBar,
        VerticalLine: VerticalLine,
        VerticalSeparator: VerticalSeparator,
        VerticalTilde: VerticalTilde,
        VeryThinSpace: VeryThinSpace,
        Vfr: Vfr,
        Vopf: Vopf,
        Vscr: Vscr,
        Vvdash: Vvdash,
        Wcirc: Wcirc,
        Wedge: Wedge,
        Wfr: Wfr,
        Wopf: Wopf,
        Wscr: Wscr,
        Xfr: Xfr,
        Xi: Xi,
        Xopf: Xopf,
        Xscr: Xscr,
        YAcy: YAcy,
        YIcy: YIcy,
        YUcy: YUcy,
        Yacut: Yacut,
        Yacute: Yacute,
        Ycirc: Ycirc,
        Ycy: Ycy,
        Yfr: Yfr,
        Yopf: Yopf,
        Yscr: Yscr,
        Yuml: Yuml,
        ZHcy: ZHcy,
        Zacute: Zacute,
        Zcaron: Zcaron,
        Zcy: Zcy,
        Zdot: Zdot,
        ZeroWidthSpace: ZeroWidthSpace,
        Zeta: Zeta,
        Zfr: Zfr,
        Zopf: Zopf,
        Zscr: Zscr,
        aacut: aacut,
        aacute: aacute,
        abreve: abreve,
        ac: ac,
        acE: acE,
        acd: acd,
        acir: acir,
        acirc: acirc,
        acut: acut,
        acute: acute,
        acy: acy,
        aeli: aeli,
        aelig: aelig,
        af: af,
        afr: afr,
        agrav: agrav,
        agrave: agrave,
        alefsym: alefsym,
        aleph: aleph,
        alpha: alpha,
        amacr: amacr,
        amalg: amalg,
        am: am,
        amp: amp,
        and: and,
        andand: andand,
        andd: andd,
        andslope: andslope,
        andv: andv,
        ang: ang,
        ange: ange,
        angle: angle,
        angmsd: angmsd,
        angmsdaa: angmsdaa,
        angmsdab: angmsdab,
        angmsdac: angmsdac,
        angmsdad: angmsdad,
        angmsdae: angmsdae,
        angmsdaf: angmsdaf,
        angmsdag: angmsdag,
        angmsdah: angmsdah,
        angrt: angrt,
        angrtvb: angrtvb,
        angrtvbd: angrtvbd,
        angsph: angsph,
        angst: angst,
        angzarr: angzarr,
        aogon: aogon,
        aopf: aopf,
        ap: ap,
        apE: apE,
        apacir: apacir,
        ape: ape,
        apid: apid,
        apos: apos,
        approx: approx,
        approxeq: approxeq,
        arin: arin,
        aring: aring,
        ascr: ascr,
        ast: ast,
        asymp: asymp,
        asympeq: asympeq,
        atild: atild,
        atilde: atilde,
        aum: aum,
        auml: auml,
        awconint: awconint,
        awint: awint,
        bNot: bNot,
        backcong: backcong,
        backepsilon: backepsilon,
        backprime: backprime,
        backsim: backsim,
        backsimeq: backsimeq,
        barvee: barvee,
        barwed: barwed,
        barwedge: barwedge,
        bbrk: bbrk,
        bbrktbrk: bbrktbrk,
        bcong: bcong,
        bcy: bcy,
        bdquo: bdquo,
        becaus: becaus,
        because: because,
        bemptyv: bemptyv,
        bepsi: bepsi,
        bernou: bernou,
        beta: beta,
        beth: beth,
        between: between,
        bfr: bfr,
        bigcap: bigcap,
        bigcirc: bigcirc,
        bigcup: bigcup,
        bigodot: bigodot,
        bigoplus: bigoplus,
        bigotimes: bigotimes,
        bigsqcup: bigsqcup,
        bigstar: bigstar,
        bigtriangledown: bigtriangledown,
        bigtriangleup: bigtriangleup,
        biguplus: biguplus,
        bigvee: bigvee,
        bigwedge: bigwedge,
        bkarow: bkarow,
        blacklozenge: blacklozenge,
        blacksquare: blacksquare,
        blacktriangle: blacktriangle,
        blacktriangledown: blacktriangledown,
        blacktriangleleft: blacktriangleleft,
        blacktriangleright: blacktriangleright,
        blank: blank,
        blk12: blk12,
        blk14: blk14,
        blk34: blk34,
        block: block,
        bne: bne,
        bnequiv: bnequiv,
        bnot: bnot,
        bopf: bopf,
        bot: bot,
        bottom: bottom,
        bowtie: bowtie,
        boxDL: boxDL,
        boxDR: boxDR,
        boxDl: boxDl,
        boxDr: boxDr,
        boxH: boxH,
        boxHD: boxHD,
        boxHU: boxHU,
        boxHd: boxHd,
        boxHu: boxHu,
        boxUL: boxUL,
        boxUR: boxUR,
        boxUl: boxUl,
        boxUr: boxUr,
        boxV: boxV,
        boxVH: boxVH,
        boxVL: boxVL,
        boxVR: boxVR,
        boxVh: boxVh,
        boxVl: boxVl,
        boxVr: boxVr,
        boxbox: boxbox,
        boxdL: boxdL,
        boxdR: boxdR,
        boxdl: boxdl,
        boxdr: boxdr,
        boxh: boxh,
        boxhD: boxhD,
        boxhU: boxhU,
        boxhd: boxhd,
        boxhu: boxhu,
        boxminus: boxminus,
        boxplus: boxplus,
        boxtimes: boxtimes,
        boxuL: boxuL,
        boxuR: boxuR,
        boxul: boxul,
        boxur: boxur,
        boxv: boxv,
        boxvH: boxvH,
        boxvL: boxvL,
        boxvR: boxvR,
        boxvh: boxvh,
        boxvl: boxvl,
        boxvr: boxvr,
        bprime: bprime,
        breve: breve,
        brvba: brvba,
        brvbar: brvbar,
        bscr: bscr,
        bsemi: bsemi,
        bsim: bsim,
        bsime: bsime,
        bsol: bsol,
        bsolb: bsolb,
        bsolhsub: bsolhsub,
        bull: bull,
        bullet: bullet,
        bump: bump,
        bumpE: bumpE,
        bumpe: bumpe,
        bumpeq: bumpeq,
        cacute: cacute,
        cap: cap,
        capand: capand,
        capbrcup: capbrcup,
        capcap: capcap,
        capcup: capcup,
        capdot: capdot,
        caps: caps,
        caret: caret,
        caron: caron,
        ccaps: ccaps,
        ccaron: ccaron,
        ccedi: ccedi,
        ccedil: ccedil,
        ccirc: ccirc,
        ccups: ccups,
        ccupssm: ccupssm,
        cdot: cdot,
        cedi: cedi,
        cedil: cedil,
        cemptyv: cemptyv,
        cen: cen,
        cent: cent,
        centerdot: centerdot,
        cfr: cfr,
        chcy: chcy,
        check: check,
        checkmark: checkmark,
        chi: chi,
        cir: cir,
        cirE: cirE,
        circ: circ,
        circeq: circeq,
        circlearrowleft: circlearrowleft,
        circlearrowright: circlearrowright,
        circledR: circledR,
        circledS: circledS,
        circledast: circledast,
        circledcirc: circledcirc,
        circleddash: circleddash,
        cire: cire,
        cirfnint: cirfnint,
        cirmid: cirmid,
        cirscir: cirscir,
        clubs: clubs,
        clubsuit: clubsuit,
        colon: colon,
        colone: colone,
        coloneq: coloneq,
        comma: comma,
        commat: commat,
        comp: comp,
        compfn: compfn,
        complement: complement,
        complexes: complexes,
        cong: cong,
        congdot: congdot,
        conint: conint,
        copf: copf,
        coprod: coprod,
        cop: cop,
        copy: copy,
        copysr: copysr,
        crarr: crarr,
        cross: cross,
        cscr: cscr,
        csub: csub,
        csube: csube,
        csup: csup,
        csupe: csupe,
        ctdot: ctdot,
        cudarrl: cudarrl,
        cudarrr: cudarrr,
        cuepr: cuepr,
        cuesc: cuesc,
        cularr: cularr,
        cularrp: cularrp,
        cup: cup,
        cupbrcap: cupbrcap,
        cupcap: cupcap,
        cupcup: cupcup,
        cupdot: cupdot,
        cupor: cupor,
        cups: cups,
        curarr: curarr,
        curarrm: curarrm,
        curlyeqprec: curlyeqprec,
        curlyeqsucc: curlyeqsucc,
        curlyvee: curlyvee,
        curlywedge: curlywedge,
        curre: curre,
        curren: curren,
        curvearrowleft: curvearrowleft,
        curvearrowright: curvearrowright,
        cuvee: cuvee,
        cuwed: cuwed,
        cwconint: cwconint,
        cwint: cwint,
        cylcty: cylcty,
        dArr: dArr,
        dHar: dHar,
        dagger: dagger,
        daleth: daleth,
        darr: darr,
        dash: dash,
        dashv: dashv,
        dbkarow: dbkarow,
        dblac: dblac,
        dcaron: dcaron,
        dcy: dcy,
        dd: dd,
        ddagger: ddagger,
        ddarr: ddarr,
        ddotseq: ddotseq,
        de: de,
        deg: deg,
        delta: delta,
        demptyv: demptyv,
        dfisht: dfisht,
        dfr: dfr,
        dharl: dharl,
        dharr: dharr,
        diam: diam,
        diamond: diamond,
        diamondsuit: diamondsuit,
        diams: diams,
        die: die,
        digamma: digamma,
        disin: disin,
        div: div,
        divid: divid,
        divide: divide,
        divideontimes: divideontimes,
        divonx: divonx,
        djcy: djcy,
        dlcorn: dlcorn,
        dlcrop: dlcrop,
        dollar: dollar,
        dopf: dopf,
        dot: dot,
        doteq: doteq,
        doteqdot: doteqdot,
        dotminus: dotminus,
        dotplus: dotplus,
        dotsquare: dotsquare,
        doublebarwedge: doublebarwedge,
        downarrow: downarrow,
        downdownarrows: downdownarrows,
        downharpoonleft: downharpoonleft,
        downharpoonright: downharpoonright,
        drbkarow: drbkarow,
        drcorn: drcorn,
        drcrop: drcrop,
        dscr: dscr,
        dscy: dscy,
        dsol: dsol,
        dstrok: dstrok,
        dtdot: dtdot,
        dtri: dtri,
        dtrif: dtrif,
        duarr: duarr,
        duhar: duhar,
        dwangle: dwangle,
        dzcy: dzcy,
        dzigrarr: dzigrarr,
        eDDot: eDDot,
        eDot: eDot,
        eacut: eacut,
        eacute: eacute,
        easter: easter,
        ecaron: ecaron,
        ecir: ecir,
        ecirc: ecirc,
        ecolon: ecolon,
        ecy: ecy,
        edot: edot,
        ee: ee,
        efDot: efDot,
        efr: efr,
        eg: eg,
        egrav: egrav,
        egrave: egrave,
        egs: egs,
        egsdot: egsdot,
        el: el,
        elinters: elinters,
        ell: ell,
        els: els,
        elsdot: elsdot,
        emacr: emacr,
        empty: empty,
        emptyset: emptyset,
        emptyv: emptyv,
        emsp13: emsp13,
        emsp14: emsp14,
        emsp: emsp,
        eng: eng,
        ensp: ensp,
        eogon: eogon,
        eopf: eopf,
        epar: epar,
        eparsl: eparsl,
        eplus: eplus,
        epsi: epsi,
        epsilon: epsilon,
        epsiv: epsiv,
        eqcirc: eqcirc,
        eqcolon: eqcolon,
        eqsim: eqsim,
        eqslantgtr: eqslantgtr,
        eqslantless: eqslantless,
        equals: equals,
        equest: equest,
        equiv: equiv,
        equivDD: equivDD,
        eqvparsl: eqvparsl,
        erDot: erDot,
        erarr: erarr,
        escr: escr,
        esdot: esdot,
        esim: esim,
        eta: eta,
        et: et,
        eth: eth,
        eum: eum,
        euml: euml,
        euro: euro,
        excl: excl,
        exist: exist,
        expectation: expectation,
        exponentiale: exponentiale,
        fallingdotseq: fallingdotseq,
        fcy: fcy,
        female: female,
        ffilig: ffilig,
        fflig: fflig,
        ffllig: ffllig,
        ffr: ffr,
        filig: filig,
        fjlig: fjlig,
        flat: flat,
        fllig: fllig,
        fltns: fltns,
        fnof: fnof,
        fopf: fopf,
        forall: forall,
        fork: fork,
        forkv: forkv,
        fpartint: fpartint,
        frac1: frac1,
        frac12: frac12,
        frac13: frac13,
        frac14: frac14,
        frac15: frac15,
        frac16: frac16,
        frac18: frac18,
        frac23: frac23,
        frac25: frac25,
        frac3: frac3,
        frac34: frac34,
        frac35: frac35,
        frac38: frac38,
        frac45: frac45,
        frac56: frac56,
        frac58: frac58,
        frac78: frac78,
        frasl: frasl,
        frown: frown,
        fscr: fscr,
        gE: gE,
        gEl: gEl,
        gacute: gacute,
        gamma: gamma,
        gammad: gammad,
        gap: gap,
        gbreve: gbreve,
        gcirc: gcirc,
        gcy: gcy,
        gdot: gdot,
        ge: ge,
        gel: gel,
        geq: geq,
        geqq: geqq,
        geqslant: geqslant,
        ges: ges,
        gescc: gescc,
        gesdot: gesdot,
        gesdoto: gesdoto,
        gesdotol: gesdotol,
        gesl: gesl,
        gesles: gesles,
        gfr: gfr,
        gg: gg,
        ggg: ggg,
        gimel: gimel,
        gjcy: gjcy,
        gl: gl,
        glE: glE,
        gla: gla,
        glj: glj,
        gnE: gnE,
        gnap: gnap,
        gnapprox: gnapprox,
        gne: gne,
        gneq: gneq,
        gneqq: gneqq,
        gnsim: gnsim,
        gopf: gopf,
        grave: grave,
        gscr: gscr,
        gsim: gsim,
        gsime: gsime,
        gsiml: gsiml,
        g: g,
        gt: gt,
        gtcc: gtcc,
        gtcir: gtcir,
        gtdot: gtdot,
        gtlPar: gtlPar,
        gtquest: gtquest,
        gtrapprox: gtrapprox,
        gtrarr: gtrarr,
        gtrdot: gtrdot,
        gtreqless: gtreqless,
        gtreqqless: gtreqqless,
        gtrless: gtrless,
        gtrsim: gtrsim,
        gvertneqq: gvertneqq,
        gvnE: gvnE,
        hArr: hArr,
        hairsp: hairsp,
        half: half,
        hamilt: hamilt,
        hardcy: hardcy,
        harr: harr,
        harrcir: harrcir,
        harrw: harrw,
        hbar: hbar,
        hcirc: hcirc,
        hearts: hearts,
        heartsuit: heartsuit,
        hellip: hellip,
        hercon: hercon,
        hfr: hfr,
        hksearow: hksearow,
        hkswarow: hkswarow,
        hoarr: hoarr,
        homtht: homtht,
        hookleftarrow: hookleftarrow,
        hookrightarrow: hookrightarrow,
        hopf: hopf,
        horbar: horbar,
        hscr: hscr,
        hslash: hslash,
        hstrok: hstrok,
        hybull: hybull,
        hyphen: hyphen,
        iacut: iacut,
        iacute: iacute,
        ic: ic,
        icir: icir,
        icirc: icirc,
        icy: icy,
        iecy: iecy,
        iexc: iexc,
        iexcl: iexcl,
        iff: iff,
        ifr: ifr,
        igrav: igrav,
        igrave: igrave,
        ii: ii,
        iiiint: iiiint,
        iiint: iiint,
        iinfin: iinfin,
        iiota: iiota,
        ijlig: ijlig,
        imacr: imacr,
        image: image,
        imagline: imagline,
        imagpart: imagpart,
        imath: imath,
        imof: imof,
        imped: imped,
        incare: incare,
        infin: infin,
        infintie: infintie,
        inodot: inodot,
        int: int,
        intcal: intcal,
        integers: integers,
        intercal: intercal,
        intlarhk: intlarhk,
        intprod: intprod,
        iocy: iocy,
        iogon: iogon,
        iopf: iopf,
        iota: iota,
        iprod: iprod,
        iques: iques,
        iquest: iquest,
        iscr: iscr,
        isin: isin,
        isinE: isinE,
        isindot: isindot,
        isins: isins,
        isinsv: isinsv,
        isinv: isinv,
        it: it,
        itilde: itilde,
        iukcy: iukcy,
        ium: ium,
        iuml: iuml,
        jcirc: jcirc,
        jcy: jcy,
        jfr: jfr,
        jmath: jmath,
        jopf: jopf,
        jscr: jscr,
        jsercy: jsercy,
        jukcy: jukcy,
        kappa: kappa,
        kappav: kappav,
        kcedil: kcedil,
        kcy: kcy,
        kfr: kfr,
        kgreen: kgreen,
        khcy: khcy,
        kjcy: kjcy,
        kopf: kopf,
        kscr: kscr,
        lAarr: lAarr,
        lArr: lArr,
        lAtail: lAtail,
        lBarr: lBarr,
        lE: lE,
        lEg: lEg,
        lHar: lHar,
        lacute: lacute,
        laemptyv: laemptyv,
        lagran: lagran,
        lambda: lambda,
        lang: lang,
        langd: langd,
        langle: langle,
        lap: lap,
        laqu: laqu,
        laquo: laquo,
        larr: larr,
        larrb: larrb,
        larrbfs: larrbfs,
        larrfs: larrfs,
        larrhk: larrhk,
        larrlp: larrlp,
        larrpl: larrpl,
        larrsim: larrsim,
        larrtl: larrtl,
        lat: lat,
        latail: latail,
        late: late,
        lates: lates,
        lbarr: lbarr,
        lbbrk: lbbrk,
        lbrace: lbrace,
        lbrack: lbrack,
        lbrke: lbrke,
        lbrksld: lbrksld,
        lbrkslu: lbrkslu,
        lcaron: lcaron,
        lcedil: lcedil,
        lceil: lceil,
        lcub: lcub,
        lcy: lcy,
        ldca: ldca,
        ldquo: ldquo,
        ldquor: ldquor,
        ldrdhar: ldrdhar,
        ldrushar: ldrushar,
        ldsh: ldsh,
        le: le,
        leftarrow: leftarrow,
        leftarrowtail: leftarrowtail,
        leftharpoondown: leftharpoondown,
        leftharpoonup: leftharpoonup,
        leftleftarrows: leftleftarrows,
        leftrightarrow: leftrightarrow,
        leftrightarrows: leftrightarrows,
        leftrightharpoons: leftrightharpoons,
        leftrightsquigarrow: leftrightsquigarrow,
        leftthreetimes: leftthreetimes,
        leg: leg,
        leq: leq,
        leqq: leqq,
        leqslant: leqslant,
        les: les,
        lescc: lescc,
        lesdot: lesdot,
        lesdoto: lesdoto,
        lesdotor: lesdotor,
        lesg: lesg,
        lesges: lesges,
        lessapprox: lessapprox,
        lessdot: lessdot,
        lesseqgtr: lesseqgtr,
        lesseqqgtr: lesseqqgtr,
        lessgtr: lessgtr,
        lesssim: lesssim,
        lfisht: lfisht,
        lfloor: lfloor,
        lfr: lfr,
        lg: lg,
        lgE: lgE,
        lhard: lhard,
        lharu: lharu,
        lharul: lharul,
        lhblk: lhblk,
        ljcy: ljcy,
        ll: ll,
        llarr: llarr,
        llcorner: llcorner,
        llhard: llhard,
        lltri: lltri,
        lmidot: lmidot,
        lmoust: lmoust,
        lmoustache: lmoustache,
        lnE: lnE,
        lnap: lnap,
        lnapprox: lnapprox,
        lne: lne,
        lneq: lneq,
        lneqq: lneqq,
        lnsim: lnsim,
        loang: loang,
        loarr: loarr,
        lobrk: lobrk,
        longleftarrow: longleftarrow,
        longleftrightarrow: longleftrightarrow,
        longmapsto: longmapsto,
        longrightarrow: longrightarrow,
        looparrowleft: looparrowleft,
        looparrowright: looparrowright,
        lopar: lopar,
        lopf: lopf,
        loplus: loplus,
        lotimes: lotimes,
        lowast: lowast,
        lowbar: lowbar,
        loz: loz,
        lozenge: lozenge,
        lozf: lozf,
        lpar: lpar,
        lparlt: lparlt,
        lrarr: lrarr,
        lrcorner: lrcorner,
        lrhar: lrhar,
        lrhard: lrhard,
        lrm: lrm,
        lrtri: lrtri,
        lsaquo: lsaquo,
        lscr: lscr,
        lsh: lsh,
        lsim: lsim,
        lsime: lsime,
        lsimg: lsimg,
        lsqb: lsqb,
        lsquo: lsquo,
        lsquor: lsquor,
        lstrok: lstrok,
        l: l,
        lt: lt,
        ltcc: ltcc,
        ltcir: ltcir,
        ltdot: ltdot,
        lthree: lthree,
        ltimes: ltimes,
        ltlarr: ltlarr,
        ltquest: ltquest,
        ltrPar: ltrPar,
        ltri: ltri,
        ltrie: ltrie,
        ltrif: ltrif,
        lurdshar: lurdshar,
        luruhar: luruhar,
        lvertneqq: lvertneqq,
        lvnE: lvnE,
        mDDot: mDDot,
        mac: mac,
        macr: macr,
        male: male,
        malt: malt,
        maltese: maltese,
        map: map,
        mapsto: mapsto,
        mapstodown: mapstodown,
        mapstoleft: mapstoleft,
        mapstoup: mapstoup,
        marker: marker,
        mcomma: mcomma,
        mcy: mcy,
        mdash: mdash,
        measuredangle: measuredangle,
        mfr: mfr,
        mho: mho,
        micr: micr,
        micro: micro,
        mid: mid,
        midast: midast,
        midcir: midcir,
        middo: middo,
        middot: middot,
        minus: minus,
        minusb: minusb,
        minusd: minusd,
        minusdu: minusdu,
        mlcp: mlcp,
        mldr: mldr,
        mnplus: mnplus,
        models: models,
        mopf: mopf,
        mp: mp,
        mscr: mscr,
        mstpos: mstpos,
        mu: mu,
        multimap: multimap,
        mumap: mumap,
        nGg: nGg,
        nGt: nGt,
        nGtv: nGtv,
        nLeftarrow: nLeftarrow,
        nLeftrightarrow: nLeftrightarrow,
        nLl: nLl,
        nLt: nLt,
        nLtv: nLtv,
        nRightarrow: nRightarrow,
        nVDash: nVDash,
        nVdash: nVdash,
        nabla: nabla,
        nacute: nacute,
        nang: nang,
        nap: nap,
        napE: napE,
        napid: napid,
        napos: napos,
        napprox: napprox,
        natur: natur,
        natural: natural,
        naturals: naturals,
        nbs: nbs,
        nbsp: nbsp,
        nbump: nbump,
        nbumpe: nbumpe,
        ncap: ncap,
        ncaron: ncaron,
        ncedil: ncedil,
        ncong: ncong,
        ncongdot: ncongdot,
        ncup: ncup,
        ncy: ncy,
        ndash: ndash,
        ne: ne,
        neArr: neArr,
        nearhk: nearhk,
        nearr: nearr,
        nearrow: nearrow,
        nedot: nedot,
        nequiv: nequiv,
        nesear: nesear,
        nesim: nesim,
        nexist: nexist,
        nexists: nexists,
        nfr: nfr,
        ngE: ngE,
        nge: nge,
        ngeq: ngeq,
        ngeqq: ngeqq,
        ngeqslant: ngeqslant,
        nges: nges,
        ngsim: ngsim,
        ngt: ngt,
        ngtr: ngtr,
        nhArr: nhArr,
        nharr: nharr,
        nhpar: nhpar,
        ni: ni,
        nis: nis,
        nisd: nisd,
        niv: niv,
        njcy: njcy,
        nlArr: nlArr,
        nlE: nlE,
        nlarr: nlarr,
        nldr: nldr,
        nle: nle,
        nleftarrow: nleftarrow,
        nleftrightarrow: nleftrightarrow,
        nleq: nleq,
        nleqq: nleqq,
        nleqslant: nleqslant,
        nles: nles,
        nless: nless,
        nlsim: nlsim,
        nlt: nlt,
        nltri: nltri,
        nltrie: nltrie,
        nmid: nmid,
        nopf: nopf,
        no: no,
        not: not,
        notin: notin,
        notinE: notinE,
        notindot: notindot,
        notinva: notinva,
        notinvb: notinvb,
        notinvc: notinvc,
        notni: notni,
        notniva: notniva,
        notnivb: notnivb,
        notnivc: notnivc,
        npar: npar,
        nparallel: nparallel,
        nparsl: nparsl,
        npart: npart,
        npolint: npolint,
        npr: npr,
        nprcue: nprcue,
        npre: npre,
        nprec: nprec,
        npreceq: npreceq,
        nrArr: nrArr,
        nrarr: nrarr,
        nrarrc: nrarrc,
        nrarrw: nrarrw,
        nrightarrow: nrightarrow,
        nrtri: nrtri,
        nrtrie: nrtrie,
        nsc: nsc,
        nsccue: nsccue,
        nsce: nsce,
        nscr: nscr,
        nshortmid: nshortmid,
        nshortparallel: nshortparallel,
        nsim: nsim,
        nsime: nsime,
        nsimeq: nsimeq,
        nsmid: nsmid,
        nspar: nspar,
        nsqsube: nsqsube,
        nsqsupe: nsqsupe,
        nsub: nsub,
        nsubE: nsubE,
        nsube: nsube,
        nsubset: nsubset,
        nsubseteq: nsubseteq,
        nsubseteqq: nsubseteqq,
        nsucc: nsucc,
        nsucceq: nsucceq,
        nsup: nsup,
        nsupE: nsupE,
        nsupe: nsupe,
        nsupset: nsupset,
        nsupseteq: nsupseteq,
        nsupseteqq: nsupseteqq,
        ntgl: ntgl,
        ntild: ntild,
        ntilde: ntilde,
        ntlg: ntlg,
        ntriangleleft: ntriangleleft,
        ntrianglelefteq: ntrianglelefteq,
        ntriangleright: ntriangleright,
        ntrianglerighteq: ntrianglerighteq,
        nu: nu,
        num: num,
        numero: numero,
        numsp: numsp,
        nvDash: nvDash,
        nvHarr: nvHarr,
        nvap: nvap,
        nvdash: nvdash,
        nvge: nvge,
        nvgt: nvgt,
        nvinfin: nvinfin,
        nvlArr: nvlArr,
        nvle: nvle,
        nvlt: nvlt,
        nvltrie: nvltrie,
        nvrArr: nvrArr,
        nvrtrie: nvrtrie,
        nvsim: nvsim,
        nwArr: nwArr,
        nwarhk: nwarhk,
        nwarr: nwarr,
        nwarrow: nwarrow,
        nwnear: nwnear,
        oS: oS,
        oacut: oacut,
        oacute: oacute,
        oast: oast,
        ocir: ocir,
        ocirc: ocirc,
        ocy: ocy,
        odash: odash,
        odblac: odblac,
        odiv: odiv,
        odot: odot,
        odsold: odsold,
        oelig: oelig,
        ofcir: ofcir,
        ofr: ofr,
        ogon: ogon,
        ograv: ograv,
        ograve: ograve,
        ogt: ogt,
        ohbar: ohbar,
        ohm: ohm,
        oint: oint,
        olarr: olarr,
        olcir: olcir,
        olcross: olcross,
        oline: oline,
        olt: olt,
        omacr: omacr,
        omega: omega,
        omicron: omicron,
        omid: omid,
        ominus: ominus,
        oopf: oopf,
        opar: opar,
        operp: operp,
        oplus: oplus,
        or: or,
        orarr: orarr,
        ord: ord,
        order: order$1,
        orderof: orderof,
        ordf: ordf,
        ordm: ordm,
        origof: origof,
        oror: oror,
        orslope: orslope,
        orv: orv,
        oscr: oscr,
        oslas: oslas,
        oslash: oslash,
        osol: osol,
        otild: otild,
        otilde: otilde,
        otimes: otimes,
        otimesas: otimesas,
        oum: oum,
        ouml: ouml,
        ovbar: ovbar,
        par: par,
        para: para,
        parallel: parallel,
        parsim: parsim,
        parsl: parsl,
        part: part,
        pcy: pcy,
        percnt: percnt,
        period: period,
        permil: permil,
        perp: perp,
        pertenk: pertenk,
        pfr: pfr,
        phi: phi,
        phiv: phiv,
        phmmat: phmmat,
        phone: phone,
        pi: pi,
        pitchfork: pitchfork,
        piv: piv,
        planck: planck,
        planckh: planckh,
        plankv: plankv,
        plus: plus,
        plusacir: plusacir,
        plusb: plusb,
        pluscir: pluscir,
        plusdo: plusdo,
        plusdu: plusdu,
        pluse: pluse,
        plusm: plusm,
        plusmn: plusmn,
        plussim: plussim,
        plustwo: plustwo,
        pm: pm,
        pointint: pointint,
        popf: popf,
        poun: poun,
        pound: pound,
        pr: pr,
        prE: prE,
        prap: prap,
        prcue: prcue,
        pre: pre,
        prec: prec,
        precapprox: precapprox,
        preccurlyeq: preccurlyeq,
        preceq: preceq,
        precnapprox: precnapprox,
        precneqq: precneqq,
        precnsim: precnsim,
        precsim: precsim,
        prime: prime,
        primes: primes,
        prnE: prnE,
        prnap: prnap,
        prnsim: prnsim,
        prod: prod,
        profalar: profalar,
        profline: profline,
        profsurf: profsurf,
        prop: prop,
        propto: propto,
        prsim: prsim,
        prurel: prurel,
        pscr: pscr,
        psi: psi,
        puncsp: puncsp,
        qfr: qfr,
        qint: qint,
        qopf: qopf,
        qprime: qprime,
        qscr: qscr,
        quaternions: quaternions,
        quatint: quatint,
        quest: quest,
        questeq: questeq,
        quo: quo,
        quot: quot,
        rAarr: rAarr,
        rArr: rArr,
        rAtail: rAtail,
        rBarr: rBarr,
        rHar: rHar,
        race: race,
        racute: racute,
        radic: radic,
        raemptyv: raemptyv,
        rang: rang,
        rangd: rangd,
        range: range,
        rangle: rangle,
        raqu: raqu,
        raquo: raquo,
        rarr: rarr,
        rarrap: rarrap,
        rarrb: rarrb,
        rarrbfs: rarrbfs,
        rarrc: rarrc,
        rarrfs: rarrfs,
        rarrhk: rarrhk,
        rarrlp: rarrlp,
        rarrpl: rarrpl,
        rarrsim: rarrsim,
        rarrtl: rarrtl,
        rarrw: rarrw,
        ratail: ratail,
        ratio: ratio,
        rationals: rationals,
        rbarr: rbarr,
        rbbrk: rbbrk,
        rbrace: rbrace,
        rbrack: rbrack,
        rbrke: rbrke,
        rbrksld: rbrksld,
        rbrkslu: rbrkslu,
        rcaron: rcaron,
        rcedil: rcedil,
        rceil: rceil,
        rcub: rcub,
        rcy: rcy,
        rdca: rdca,
        rdldhar: rdldhar,
        rdquo: rdquo,
        rdquor: rdquor,
        rdsh: rdsh,
        real: real,
        realine: realine,
        realpart: realpart,
        reals: reals,
        rect: rect,
        re: re,
        reg: reg,
        rfisht: rfisht,
        rfloor: rfloor,
        rfr: rfr,
        rhard: rhard,
        rharu: rharu,
        rharul: rharul,
        rho: rho,
        rhov: rhov,
        rightarrow: rightarrow,
        rightarrowtail: rightarrowtail,
        rightharpoondown: rightharpoondown,
        rightharpoonup: rightharpoonup,
        rightleftarrows: rightleftarrows,
        rightleftharpoons: rightleftharpoons,
        rightrightarrows: rightrightarrows,
        rightsquigarrow: rightsquigarrow,
        rightthreetimes: rightthreetimes,
        ring: ring,
        risingdotseq: risingdotseq,
        rlarr: rlarr,
        rlhar: rlhar,
        rlm: rlm,
        rmoust: rmoust,
        rmoustache: rmoustache,
        rnmid: rnmid,
        roang: roang,
        roarr: roarr,
        robrk: robrk,
        ropar: ropar,
        ropf: ropf,
        roplus: roplus,
        rotimes: rotimes,
        rpar: rpar,
        rpargt: rpargt,
        rppolint: rppolint,
        rrarr: rrarr,
        rsaquo: rsaquo,
        rscr: rscr,
        rsh: rsh,
        rsqb: rsqb,
        rsquo: rsquo,
        rsquor: rsquor,
        rthree: rthree,
        rtimes: rtimes,
        rtri: rtri,
        rtrie: rtrie,
        rtrif: rtrif,
        rtriltri: rtriltri,
        ruluhar: ruluhar,
        rx: rx,
        sacute: sacute,
        sbquo: sbquo,
        sc: sc,
        scE: scE,
        scap: scap,
        scaron: scaron,
        sccue: sccue,
        sce: sce,
        scedil: scedil,
        scirc: scirc,
        scnE: scnE,
        scnap: scnap,
        scnsim: scnsim,
        scpolint: scpolint,
        scsim: scsim,
        scy: scy,
        sdot: sdot,
        sdotb: sdotb,
        sdote: sdote,
        seArr: seArr,
        searhk: searhk,
        searr: searr,
        searrow: searrow,
        sec: sec,
        sect: sect,
        semi: semi,
        seswar: seswar,
        setminus: setminus,
        setmn: setmn,
        sext: sext,
        sfr: sfr,
        sfrown: sfrown,
        sharp: sharp,
        shchcy: shchcy,
        shcy: shcy,
        shortmid: shortmid,
        shortparallel: shortparallel,
        sh: sh,
        shy: shy,
        sigma: sigma,
        sigmaf: sigmaf,
        sigmav: sigmav,
        sim: sim,
        simdot: simdot,
        sime: sime,
        simeq: simeq,
        simg: simg,
        simgE: simgE,
        siml: siml,
        simlE: simlE,
        simne: simne,
        simplus: simplus,
        simrarr: simrarr,
        slarr: slarr,
        smallsetminus: smallsetminus,
        smashp: smashp,
        smeparsl: smeparsl,
        smid: smid,
        smile: smile,
        smt: smt,
        smte: smte,
        smtes: smtes,
        softcy: softcy,
        sol: sol,
        solb: solb,
        solbar: solbar,
        sopf: sopf,
        spades: spades,
        spadesuit: spadesuit,
        spar: spar,
        sqcap: sqcap,
        sqcaps: sqcaps,
        sqcup: sqcup,
        sqcups: sqcups,
        sqsub: sqsub,
        sqsube: sqsube,
        sqsubset: sqsubset,
        sqsubseteq: sqsubseteq,
        sqsup: sqsup,
        sqsupe: sqsupe,
        sqsupset: sqsupset,
        sqsupseteq: sqsupseteq,
        squ: squ,
        square: square,
        squarf: squarf,
        squf: squf,
        srarr: srarr,
        sscr: sscr,
        ssetmn: ssetmn,
        ssmile: ssmile,
        sstarf: sstarf,
        star: star,
        starf: starf,
        straightepsilon: straightepsilon,
        straightphi: straightphi,
        strns: strns,
        sub: sub,
        subE: subE,
        subdot: subdot,
        sube: sube,
        subedot: subedot,
        submult: submult,
        subnE: subnE,
        subne: subne,
        subplus: subplus,
        subrarr: subrarr,
        subset: subset,
        subseteq: subseteq,
        subseteqq: subseteqq,
        subsetneq: subsetneq,
        subsetneqq: subsetneqq,
        subsim: subsim,
        subsub: subsub,
        subsup: subsup,
        succ: succ,
        succapprox: succapprox,
        succcurlyeq: succcurlyeq,
        succeq: succeq,
        succnapprox: succnapprox,
        succneqq: succneqq,
        succnsim: succnsim,
        succsim: succsim,
        sum: sum,
        sung: sung,
        sup: sup,
        sup1: sup1,
        sup2: sup2,
        sup3: sup3,
        supE: supE,
        supdot: supdot,
        supdsub: supdsub,
        supe: supe,
        supedot: supedot,
        suphsol: suphsol,
        suphsub: suphsub,
        suplarr: suplarr,
        supmult: supmult,
        supnE: supnE,
        supne: supne,
        supplus: supplus,
        supset: supset,
        supseteq: supseteq,
        supseteqq: supseteqq,
        supsetneq: supsetneq,
        supsetneqq: supsetneqq,
        supsim: supsim,
        supsub: supsub,
        supsup: supsup,
        swArr: swArr,
        swarhk: swarhk,
        swarr: swarr,
        swarrow: swarrow,
        swnwar: swnwar,
        szli: szli,
        szlig: szlig,
        target: target,
        tau: tau,
        tbrk: tbrk,
        tcaron: tcaron,
        tcedil: tcedil,
        tcy: tcy,
        tdot: tdot,
        telrec: telrec,
        tfr: tfr,
        there4: there4,
        therefore: therefore,
        theta: theta,
        thetasym: thetasym,
        thetav: thetav,
        thickapprox: thickapprox,
        thicksim: thicksim,
        thinsp: thinsp,
        thkap: thkap,
        thksim: thksim,
        thor: thor,
        thorn: thorn,
        tilde: tilde,
        time: time,
        times: times,
        timesb: timesb,
        timesbar: timesbar,
        timesd: timesd,
        tint: tint,
        toea: toea,
        top: top,
        topbot: topbot,
        topcir: topcir,
        topf: topf,
        topfork: topfork,
        tosa: tosa,
        tprime: tprime,
        trade: trade,
        triangle: triangle,
        triangledown: triangledown,
        triangleleft: triangleleft,
        trianglelefteq: trianglelefteq,
        triangleq: triangleq,
        triangleright: triangleright,
        trianglerighteq: trianglerighteq,
        tridot: tridot,
        trie: trie,
        triminus: triminus,
        triplus: triplus,
        trisb: trisb,
        tritime: tritime,
        trpezium: trpezium,
        tscr: tscr,
        tscy: tscy,
        tshcy: tshcy,
        tstrok: tstrok,
        twixt: twixt,
        twoheadleftarrow: twoheadleftarrow,
        twoheadrightarrow: twoheadrightarrow,
        uArr: uArr,
        uHar: uHar,
        uacut: uacut,
        uacute: uacute,
        uarr: uarr,
        ubrcy: ubrcy,
        ubreve: ubreve,
        ucir: ucir,
        ucirc: ucirc,
        ucy: ucy,
        udarr: udarr,
        udblac: udblac,
        udhar: udhar,
        ufisht: ufisht,
        ufr: ufr,
        ugrav: ugrav,
        ugrave: ugrave,
        uharl: uharl,
        uharr: uharr,
        uhblk: uhblk,
        ulcorn: ulcorn,
        ulcorner: ulcorner,
        ulcrop: ulcrop,
        ultri: ultri,
        umacr: umacr,
        um: um,
        uml: uml,
        uogon: uogon,
        uopf: uopf,
        uparrow: uparrow,
        updownarrow: updownarrow,
        upharpoonleft: upharpoonleft,
        upharpoonright: upharpoonright,
        uplus: uplus,
        upsi: upsi,
        upsih: upsih,
        upsilon: upsilon,
        upuparrows: upuparrows,
        urcorn: urcorn,
        urcorner: urcorner,
        urcrop: urcrop,
        uring: uring,
        urtri: urtri,
        uscr: uscr,
        utdot: utdot,
        utilde: utilde,
        utri: utri,
        utrif: utrif,
        uuarr: uuarr,
        uum: uum,
        uuml: uuml,
        uwangle: uwangle,
        vArr: vArr,
        vBar: vBar,
        vBarv: vBarv,
        vDash: vDash,
        vangrt: vangrt,
        varepsilon: varepsilon,
        varkappa: varkappa,
        varnothing: varnothing,
        varphi: varphi,
        varpi: varpi,
        varpropto: varpropto,
        varr: varr,
        varrho: varrho,
        varsigma: varsigma,
        varsubsetneq: varsubsetneq,
        varsubsetneqq: varsubsetneqq,
        varsupsetneq: varsupsetneq,
        varsupsetneqq: varsupsetneqq,
        vartheta: vartheta,
        vartriangleleft: vartriangleleft,
        vartriangleright: vartriangleright,
        vcy: vcy,
        vdash: vdash,
        vee: vee,
        veebar: veebar,
        veeeq: veeeq,
        vellip: vellip,
        verbar: verbar,
        vert: vert,
        vfr: vfr,
        vltri: vltri,
        vnsub: vnsub,
        vnsup: vnsup,
        vopf: vopf,
        vprop: vprop,
        vrtri: vrtri,
        vscr: vscr,
        vsubnE: vsubnE,
        vsubne: vsubne,
        vsupnE: vsupnE,
        vsupne: vsupne,
        vzigzag: vzigzag,
        wcirc: wcirc,
        wedbar: wedbar,
        wedge: wedge,
        wedgeq: wedgeq,
        weierp: weierp,
        wfr: wfr,
        wopf: wopf,
        wp: wp,
        wr: wr,
        wreath: wreath,
        wscr: wscr,
        xcap: xcap,
        xcirc: xcirc,
        xcup: xcup,
        xdtri: xdtri,
        xfr: xfr,
        xhArr: xhArr,
        xharr: xharr,
        xi: xi,
        xlArr: xlArr,
        xlarr: xlarr,
        xmap: xmap,
        xnis: xnis,
        xodot: xodot,
        xopf: xopf,
        xoplus: xoplus,
        xotime: xotime,
        xrArr: xrArr,
        xrarr: xrarr,
        xscr: xscr,
        xsqcup: xsqcup,
        xuplus: xuplus,
        xutri: xutri,
        xvee: xvee,
        xwedge: xwedge,
        yacut: yacut,
        yacute: yacute,
        yacy: yacy,
        ycirc: ycirc,
        ycy: ycy,
        ye: ye,
        yen: yen,
        yfr: yfr,
        yicy: yicy,
        yopf: yopf,
        yscr: yscr,
        yucy: yucy,
        yum: yum,
        yuml: yuml,
        zacute: zacute,
        zcaron: zcaron,
        zcy: zcy,
        zdot: zdot,
        zeetrf: zeetrf,
        zeta: zeta,
        zfr: zfr,
        zhcy: zhcy,
        zigrarr: zigrarr,
        zopf: zopf,
        zscr: zscr,
        zwj: zwj,
        zwnj: zwnj,
        default: index$1
    });

    var AElig$1 = "Æ";
    var AMP$1 = "&";
    var Aacute$1 = "Á";
    var Acirc$1 = "Â";
    var Agrave$1 = "À";
    var Aring$1 = "Å";
    var Atilde$1 = "Ã";
    var Auml$1 = "Ä";
    var COPY$1 = "©";
    var Ccedil$1 = "Ç";
    var ETH$1 = "Ð";
    var Eacute$1 = "É";
    var Ecirc$1 = "Ê";
    var Egrave$1 = "È";
    var Euml$1 = "Ë";
    var GT$1 = ">";
    var Iacute$1 = "Í";
    var Icirc$1 = "Î";
    var Igrave$1 = "Ì";
    var Iuml$1 = "Ï";
    var LT$1 = "<";
    var Ntilde$1 = "Ñ";
    var Oacute$1 = "Ó";
    var Ocirc$1 = "Ô";
    var Ograve$1 = "Ò";
    var Oslash$1 = "Ø";
    var Otilde$1 = "Õ";
    var Ouml$1 = "Ö";
    var QUOT$1 = "\"";
    var REG$1 = "®";
    var THORN$1 = "Þ";
    var Uacute$1 = "Ú";
    var Ucirc$1 = "Û";
    var Ugrave$1 = "Ù";
    var Uuml$1 = "Ü";
    var Yacute$1 = "Ý";
    var aacute$1 = "á";
    var acirc$1 = "â";
    var acute$1 = "´";
    var aelig$1 = "æ";
    var agrave$1 = "à";
    var amp$1 = "&";
    var aring$1 = "å";
    var atilde$1 = "ã";
    var auml$1 = "ä";
    var brvbar$1 = "¦";
    var ccedil$1 = "ç";
    var cedil$1 = "¸";
    var cent$1 = "¢";
    var copy$1 = "©";
    var curren$1 = "¤";
    var deg$1 = "°";
    var divide$1 = "÷";
    var eacute$1 = "é";
    var ecirc$1 = "ê";
    var egrave$1 = "è";
    var eth$1 = "ð";
    var euml$1 = "ë";
    var frac12$1 = "½";
    var frac14$1 = "¼";
    var frac34$1 = "¾";
    var gt$1 = ">";
    var iacute$1 = "í";
    var icirc$1 = "î";
    var iexcl$1 = "¡";
    var igrave$1 = "ì";
    var iquest$1 = "¿";
    var iuml$1 = "ï";
    var laquo$1 = "«";
    var lt$1 = "<";
    var macr$1 = "¯";
    var micro$1 = "µ";
    var middot$1 = "·";
    var nbsp$1 = " ";
    var not$1 = "¬";
    var ntilde$1 = "ñ";
    var oacute$1 = "ó";
    var ocirc$1 = "ô";
    var ograve$1 = "ò";
    var ordf$1 = "ª";
    var ordm$1 = "º";
    var oslash$1 = "ø";
    var otilde$1 = "õ";
    var ouml$1 = "ö";
    var para$1 = "¶";
    var plusmn$1 = "±";
    var pound$1 = "£";
    var quot$1 = "\"";
    var raquo$1 = "»";
    var reg$1 = "®";
    var sect$1 = "§";
    var shy$1 = "­";
    var sup1$1 = "¹";
    var sup2$1 = "²";
    var sup3$1 = "³";
    var szlig$1 = "ß";
    var thorn$1 = "þ";
    var times$1 = "×";
    var uacute$1 = "ú";
    var ucirc$1 = "û";
    var ugrave$1 = "ù";
    var uml$1 = "¨";
    var uuml$1 = "ü";
    var yacute$1 = "ý";
    var yen$1 = "¥";
    var yuml$1 = "ÿ";
    var index$2 = {
    	AElig: AElig$1,
    	AMP: AMP$1,
    	Aacute: Aacute$1,
    	Acirc: Acirc$1,
    	Agrave: Agrave$1,
    	Aring: Aring$1,
    	Atilde: Atilde$1,
    	Auml: Auml$1,
    	COPY: COPY$1,
    	Ccedil: Ccedil$1,
    	ETH: ETH$1,
    	Eacute: Eacute$1,
    	Ecirc: Ecirc$1,
    	Egrave: Egrave$1,
    	Euml: Euml$1,
    	GT: GT$1,
    	Iacute: Iacute$1,
    	Icirc: Icirc$1,
    	Igrave: Igrave$1,
    	Iuml: Iuml$1,
    	LT: LT$1,
    	Ntilde: Ntilde$1,
    	Oacute: Oacute$1,
    	Ocirc: Ocirc$1,
    	Ograve: Ograve$1,
    	Oslash: Oslash$1,
    	Otilde: Otilde$1,
    	Ouml: Ouml$1,
    	QUOT: QUOT$1,
    	REG: REG$1,
    	THORN: THORN$1,
    	Uacute: Uacute$1,
    	Ucirc: Ucirc$1,
    	Ugrave: Ugrave$1,
    	Uuml: Uuml$1,
    	Yacute: Yacute$1,
    	aacute: aacute$1,
    	acirc: acirc$1,
    	acute: acute$1,
    	aelig: aelig$1,
    	agrave: agrave$1,
    	amp: amp$1,
    	aring: aring$1,
    	atilde: atilde$1,
    	auml: auml$1,
    	brvbar: brvbar$1,
    	ccedil: ccedil$1,
    	cedil: cedil$1,
    	cent: cent$1,
    	copy: copy$1,
    	curren: curren$1,
    	deg: deg$1,
    	divide: divide$1,
    	eacute: eacute$1,
    	ecirc: ecirc$1,
    	egrave: egrave$1,
    	eth: eth$1,
    	euml: euml$1,
    	frac12: frac12$1,
    	frac14: frac14$1,
    	frac34: frac34$1,
    	gt: gt$1,
    	iacute: iacute$1,
    	icirc: icirc$1,
    	iexcl: iexcl$1,
    	igrave: igrave$1,
    	iquest: iquest$1,
    	iuml: iuml$1,
    	laquo: laquo$1,
    	lt: lt$1,
    	macr: macr$1,
    	micro: micro$1,
    	middot: middot$1,
    	nbsp: nbsp$1,
    	not: not$1,
    	ntilde: ntilde$1,
    	oacute: oacute$1,
    	ocirc: ocirc$1,
    	ograve: ograve$1,
    	ordf: ordf$1,
    	ordm: ordm$1,
    	oslash: oslash$1,
    	otilde: otilde$1,
    	ouml: ouml$1,
    	para: para$1,
    	plusmn: plusmn$1,
    	pound: pound$1,
    	quot: quot$1,
    	raquo: raquo$1,
    	reg: reg$1,
    	sect: sect$1,
    	shy: shy$1,
    	sup1: sup1$1,
    	sup2: sup2$1,
    	sup3: sup3$1,
    	szlig: szlig$1,
    	thorn: thorn$1,
    	times: times$1,
    	uacute: uacute$1,
    	ucirc: ucirc$1,
    	ugrave: ugrave$1,
    	uml: uml$1,
    	uuml: uuml$1,
    	yacute: yacute$1,
    	yen: yen$1,
    	yuml: yuml$1
    };

    var characterEntitiesLegacy = /*#__PURE__*/Object.freeze({
        AElig: AElig$1,
        AMP: AMP$1,
        Aacute: Aacute$1,
        Acirc: Acirc$1,
        Agrave: Agrave$1,
        Aring: Aring$1,
        Atilde: Atilde$1,
        Auml: Auml$1,
        COPY: COPY$1,
        Ccedil: Ccedil$1,
        ETH: ETH$1,
        Eacute: Eacute$1,
        Ecirc: Ecirc$1,
        Egrave: Egrave$1,
        Euml: Euml$1,
        GT: GT$1,
        Iacute: Iacute$1,
        Icirc: Icirc$1,
        Igrave: Igrave$1,
        Iuml: Iuml$1,
        LT: LT$1,
        Ntilde: Ntilde$1,
        Oacute: Oacute$1,
        Ocirc: Ocirc$1,
        Ograve: Ograve$1,
        Oslash: Oslash$1,
        Otilde: Otilde$1,
        Ouml: Ouml$1,
        QUOT: QUOT$1,
        REG: REG$1,
        THORN: THORN$1,
        Uacute: Uacute$1,
        Ucirc: Ucirc$1,
        Ugrave: Ugrave$1,
        Uuml: Uuml$1,
        Yacute: Yacute$1,
        aacute: aacute$1,
        acirc: acirc$1,
        acute: acute$1,
        aelig: aelig$1,
        agrave: agrave$1,
        amp: amp$1,
        aring: aring$1,
        atilde: atilde$1,
        auml: auml$1,
        brvbar: brvbar$1,
        ccedil: ccedil$1,
        cedil: cedil$1,
        cent: cent$1,
        copy: copy$1,
        curren: curren$1,
        deg: deg$1,
        divide: divide$1,
        eacute: eacute$1,
        ecirc: ecirc$1,
        egrave: egrave$1,
        eth: eth$1,
        euml: euml$1,
        frac12: frac12$1,
        frac14: frac14$1,
        frac34: frac34$1,
        gt: gt$1,
        iacute: iacute$1,
        icirc: icirc$1,
        iexcl: iexcl$1,
        igrave: igrave$1,
        iquest: iquest$1,
        iuml: iuml$1,
        laquo: laquo$1,
        lt: lt$1,
        macr: macr$1,
        micro: micro$1,
        middot: middot$1,
        nbsp: nbsp$1,
        not: not$1,
        ntilde: ntilde$1,
        oacute: oacute$1,
        ocirc: ocirc$1,
        ograve: ograve$1,
        ordf: ordf$1,
        ordm: ordm$1,
        oslash: oslash$1,
        otilde: otilde$1,
        ouml: ouml$1,
        para: para$1,
        plusmn: plusmn$1,
        pound: pound$1,
        quot: quot$1,
        raquo: raquo$1,
        reg: reg$1,
        sect: sect$1,
        shy: shy$1,
        sup1: sup1$1,
        sup2: sup2$1,
        sup3: sup3$1,
        szlig: szlig$1,
        thorn: thorn$1,
        times: times$1,
        uacute: uacute$1,
        ucirc: ucirc$1,
        ugrave: ugrave$1,
        uml: uml$1,
        uuml: uuml$1,
        yacute: yacute$1,
        yen: yen$1,
        yuml: yuml$1,
        default: index$2
    });

    var index$3 = {
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

    var characterReferenceInvalid = /*#__PURE__*/Object.freeze({
        default: index$3
    });

    var isDecimal = decimal;

    /* Check if the given character code, or the character
     * code at the first character, is decimal. */
    function decimal(character) {
      var code = typeof character === 'string' ? character.charCodeAt(0) : character;

      return code >= 48 && code <= 57 /* 0-9 */
    }

    var isHexadecimal = hexadecimal;

    /* Check if the given character code, or the character
     * code at the first character, is hexadecimal. */
    function hexadecimal(character) {
      var code = typeof character === 'string' ? character.charCodeAt(0) : character;

      return (
        (code >= 97 /* a */ && code <= 102) /* z */ ||
        (code >= 65 /* A */ && code <= 70) /* Z */ ||
        (code >= 48 /* A */ && code <= 57) /* Z */
      )
    }

    var isAlphabetical = alphabetical;

    /* Check if the given character code, or the character
     * code at the first character, is alphabetical. */
    function alphabetical(character) {
      var code = typeof character === 'string' ? character.charCodeAt(0) : character;

      return (
        (code >= 97 && code <= 122) /* a-z */ ||
        (code >= 65 && code <= 90) /* A-Z */
      )
    }

    var isAlphanumerical = alphanumerical;

    /* Check if the given character code, or the character
     * code at the first character, is alphanumerical. */
    function alphanumerical(character) {
      return isAlphabetical(character) || isDecimal(character)
    }

    var characterEntities$1 = ( characterEntities && index$1 ) || characterEntities;

    var legacy = ( characterEntitiesLegacy && index$2 ) || characterEntitiesLegacy;

    var invalid = ( characterReferenceInvalid && index$3 ) || characterReferenceInvalid;

    var parseEntities_1 = parseEntities;

    var own$3 = {}.hasOwnProperty;
    var fromCharCode = String.fromCharCode;
    var noop$1 = Function.prototype;

    /* Default settings. */
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

    /* Reference types. */
    var NAMED = 'named';
    var HEXADECIMAL = 'hexadecimal';
    var DECIMAL = 'decimal';

    /* Map of bases. */
    var BASE = {};

    BASE[HEXADECIMAL] = 16;
    BASE[DECIMAL] = 10;

    /* Map of types to tests. Each type of character reference
     * accepts different characters. This test is used to
     * detect whether a reference has ended (as the semicolon
     * is not strictly needed). */
    var TESTS = {};

    TESTS[NAMED] = isAlphanumerical;
    TESTS[DECIMAL] = isDecimal;
    TESTS[HEXADECIMAL] = isHexadecimal;

    /* Warning messages. */
    var NAMED_NOT_TERMINATED = 1;
    var NUMERIC_NOT_TERMINATED = 2;
    var NAMED_EMPTY = 3;
    var NUMERIC_EMPTY = 4;
    var NAMED_UNKNOWN = 5;
    var NUMERIC_DISALLOWED = 6;
    var NUMERIC_PROHIBITED = 7;

    var MESSAGES = {};

    MESSAGES[NAMED_NOT_TERMINATED] =
      'Named character references must be terminated by a semicolon';
    MESSAGES[NUMERIC_NOT_TERMINATED] =
      'Numeric character references must be terminated by a semicolon';
    MESSAGES[NAMED_EMPTY] = 'Named character references cannot be empty';
    MESSAGES[NUMERIC_EMPTY] = 'Numeric character references cannot be empty';
    MESSAGES[NAMED_UNKNOWN] = 'Named character references must be known';
    MESSAGES[NUMERIC_DISALLOWED] =
      'Numeric character references cannot be disallowed';
    MESSAGES[NUMERIC_PROHIBITED] =
      'Numeric character references cannot be outside the permissible Unicode range';

    /* Wrap to ensure clean parameters are given to `parse`. */
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

    /* Parse entities. */
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

      /* Cache the current point. */
      prev = now();

      /* Wrap `handleWarning`. */
      warning = handleWarning ? parseError : noop$1;

      /* Ensure the algorithm walks over the first character
       * and the end (inclusive). */
      index--;
      length++;

      while (++index < length) {
        /* If the previous character was a newline. */
        if (character === '\n') {
          column = indent[lines] || 1;
        }

        character = at(index);

        /* Handle anything other than an ampersand,
         * including newlines and EOF. */
        if (character !== '&') {
          if (character === '\n') {
            line++;
            lines++;
            column = 0;
          }

          if (character) {
            queue += character;
            column++;
          } else {
            flush();
          }
        } else {
          following = at(index + 1);

          /* The behaviour depends on the identity of the next
           * character. */
          if (
            following === '\t' /* Tab */ ||
            following === '\n' /* Newline */ ||
            following === '\f' /* Form feed */ ||
            following === ' ' /* Space */ ||
            following === '<' /* Less-than */ ||
            following === '&' /* Ampersand */ ||
            following === '' ||
            (additional && following === additional)
          ) {
            /* Not a character reference. No characters
             * are consumed, and nothing is returned.
             * This is not an error, either. */
            queue += character;
            column++;

            continue
          }

          start = index + 1;
          begin = start;
          end = start;

          /* Numerical entity. */
          if (following !== '#') {
            type = NAMED;
          } else {
            end = ++begin;

            /* The behaviour further depends on the
             * character after the U+0023 NUMBER SIGN. */
            following = at(end);

            if (following === 'x' || following === 'X') {
              /* ASCII hex digits. */
              type = HEXADECIMAL;
              end = ++begin;
            } else {
              /* ASCII digits. */
              type = DECIMAL;
            }
          }

          entityCharacters = '';
          entity = '';
          characters = '';
          test = TESTS[type];
          end--;

          while (++end < length) {
            following = at(end);

            if (!test(following)) {
              break
            }

            characters += following;

            /* Check if we can match a legacy named
             * reference.  If so, we cache that as the
             * last viable named reference.  This
             * ensures we do not need to walk backwards
             * later. */
            if (type === NAMED && own$3.call(legacy, characters)) {
              entityCharacters = characters;
              entity = legacy[characters];
            }
          }

          terminated = at(end) === ';';

          if (terminated) {
            end++;

            if (type === NAMED && own$3.call(characterEntities$1, characters)) {
              entityCharacters = characters;
              entity = characterEntities$1[characters];
            }
          }

          diff = 1 + end - start;

          if (!terminated && !nonTerminated) ; else if (!characters) {
            /* An empty (possible) entity is valid, unless
             * its numeric (thus an ampersand followed by
             * an octothorp). */
            if (type !== NAMED) {
              warning(NUMERIC_EMPTY, diff);
            }
          } else if (type === NAMED) {
            /* An ampersand followed by anything
             * unknown, and not terminated, is invalid. */
            if (terminated && !entity) {
              warning(NAMED_UNKNOWN, 1);
            } else {
              /* If theres something after an entity
               * name which is not known, cap the
               * reference. */
              if (entityCharacters !== characters) {
                end = begin + entityCharacters.length;
                diff = 1 + end - begin;
                terminated = false;
              }

              /* If the reference is not terminated,
               * warn. */
              if (!terminated) {
                reason = entityCharacters ? NAMED_NOT_TERMINATED : NAMED_EMPTY;

                if (!settings.attribute) {
                  warning(reason, diff);
                } else {
                  following = at(end);

                  if (following === '=') {
                    warning(reason, diff);
                    entity = null;
                  } else if (isAlphanumerical(following)) {
                    entity = null;
                  } else {
                    warning(reason, diff);
                  }
                }
              }
            }

            reference = entity;
          } else {
            if (!terminated) {
              /* All non-terminated numeric entities are
               * not rendered, and trigger a warning. */
              warning(NUMERIC_NOT_TERMINATED, diff);
            }

            /* When terminated and number, parse as
             * either hexadecimal or decimal. */
            reference = parseInt(characters, BASE[type]);

            /* Trigger a warning when the parsed number
             * is prohibited, and replace with
             * replacement character. */
            if (prohibited(reference)) {
              warning(NUMERIC_PROHIBITED, diff);
              reference = '\uFFFD';
            } else if (reference in invalid) {
              /* Trigger a warning when the parsed number
               * is disallowed, and replace by an
               * alternative. */
              warning(NUMERIC_DISALLOWED, diff);
              reference = invalid[reference];
            } else {
              /* Parse the number. */
              output = '';

              /* Trigger a warning when the parsed
               * number should not be used. */
              if (disallowed(reference)) {
                warning(NUMERIC_DISALLOWED, diff);
              }

              /* Stringify the number. */
              if (reference > 0xffff) {
                reference -= 0x10000;
                output += fromCharCode((reference >>> (10 & 0x3ff)) | 0xd800);
                reference = 0xdc00 | (reference & 0x3ff);
              }

              reference = output + fromCharCode(reference);
            }
          }

          /* If we could not find a reference, queue the
           * checked characters (as normal characters),
           * and move the pointer to their end. This is
           * possible because we can be certain neither
           * newlines nor ampersands are included. */
          if (!reference) {
            characters = value.slice(start - 1, end);
            queue += characters;
            column += characters.length;
            index = end - 1;
          } else {
            /* Found it! First eat the queued
             * characters as normal text, then eat
             * an entity. */
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
          }
        }
      }

      /* Return the reduced nodes, and any possible warnings. */
      return result.join('')

      /* Get current position. */
      function now() {
        return {
          line: line,
          column: column,
          offset: index + (pos.offset || 0)
        }
      }

      /* “Throw” a parse-error: a warning. */
      function parseError(code, offset) {
        var position = now();

        position.column += offset;
        position.offset += offset;

        handleWarning.call(warningContext, MESSAGES[code], position, code);
      }

      /* Get character at position. */
      function at(position) {
        return value.charAt(position)
      }

      /* Flush `queue` (normal text). Macro invoked before
       * each entity and at the end of `value`.
       * Does nothing when `queue` is empty. */
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

    /* Check if `character` is outside the permissible unicode range. */
    function prohibited(code) {
      return (code >= 0xd800 && code <= 0xdfff) || code > 0x10ffff
    }

    /* Check if `character` is disallowed. */
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

    /* Get markdown escapes. */
    function escapes(options) {
      var settings = options || {};

      if (settings.commonmark) {
        return commonmark
      }

      return settings.gfm ? gfm : defaults$1
    }

    var blockElements = [
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
    ]
    ;

    var blockElements$1 = /*#__PURE__*/Object.freeze({
        default: blockElements
    });

    var require$$0$1 = ( blockElements$1 && blockElements ) || blockElements$1;

    var defaults$2 = {
      position: true,
      gfm: true,
      commonmark: false,
      footnotes: false,
      pedantic: false,
      blocks: require$$0$1
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

    /* eslint-disable max-params */

    /* Expose. */
    var unistUtilIs = is;

    /* Assert if `test` passes for `node`.
     * When a `parent` node is known the `index` of node */
    function is(test, node, index, parent, context) {
      var hasParent = parent !== null && parent !== undefined;
      var hasIndex = index !== null && index !== undefined;
      var check = convert(test);

      if (
        hasIndex &&
        (typeof index !== 'number' || index < 0 || index === Infinity)
      ) {
        throw new Error('Expected positive finite index or child node')
      }

      if (hasParent && (!is(null, parent) || !parent.children)) {
        throw new Error('Expected parent node')
      }

      if (!node || !node.type || typeof node.type !== 'string') {
        return false
      }

      if (hasParent !== hasIndex) {
        throw new Error('Expected both parent and index')
      }

      return Boolean(check.call(context, node, index, parent))
    }

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

    /* Utility assert each property in `test` is represented
     * in `node`, and each values are strictly equal. */
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

    /* Utility to convert a string into a function which checks
     * a given node’s type for said string. */
    function typeFactory(test) {
      return type

      function type(node) {
        return Boolean(node && node.type === test)
      }
    }

    /* Utility to return true. */
    function ok() {
      return true
    }

    var unistUtilVisit = visit;



    var CONTINUE = true;
    var SKIP = 'skip';
    var EXIT = false;

    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;

    function visit(tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        visitor = test;
        test = null;
      }

      one(tree);

      /* Visit a single node. */
      function one(node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!test || node.type === test || unistUtilIs(test, node, index, parent || null)) {
          result = visitor(node, index, parent || null);
        }

        if (result === EXIT) {
          return result
        }

        if (node.children && result !== SKIP) {
          return all(node.children, node) === EXIT ? EXIT : result
        }

        return result
      }

      /* Visit children in `parent`. */
      function all(children, parent) {
        var step = reverse ? -1 : 1;
        var index = (reverse ? children.length : -1) + step;
        var child;
        var result;

        while (index > -1 && index < children.length) {
          child = children[index];
          result = child && one(child, index, parent);

          if (result === EXIT) {
            return result
          }

          index = typeof result === 'number' ? result : index + step;
        }

        return CONTINUE
      }
    }

    var unistUtilRemovePosition = removePosition;

    /* Remove `position`s from `tree`. */
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
    var re$1 = /\s/;

    /* Check if the given character code, or the character
     * code at the first character, is a whitespace character. */
    function whitespace(character) {
      return re$1.test(
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

    /* Remove final newline characters from `value`. */
    function trimTrailingLines(value) {
      var val = String(value);
      var index = val.length;

      while (val.charAt(--index) === line) {
        /* Empty */
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

    /* collapse(' \t\nbar \nbaz\t'); // ' bar baz ' */
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
    var C_NEWLINE$10 = '\n';
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

        if (character === C_NEWLINE$10) {
          subqueue = character;
          index++;

          while (index < length) {
            character = value.charAt(index);

            if (character !== C_NEWLINE$10) {
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
    var C_NEWLINE$11 = '\n';
    var C_TAB$10 = '\t';
    var C_SPACE$10 = ' ';
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

        if (character !== C_SPACE$10 && character !== C_TAB$10) {
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
          character !== C_TAB$10 &&
          character !== C_SPACE$10 &&
          character !== C_NEWLINE$11
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
          character !== C_TAB$10 &&
          character !== C_SPACE$10 &&
          character !== C_NEWLINE$11
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

          if (character === C_NEWLINE$11) {
            index++;
            character = value.charAt(index);

            if (character === C_NEWLINE$11 || character === test) {
              return;
            }

            queue += C_NEWLINE$11;
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

        if (character !== C_TAB$10 && character !== C_SPACE$10) {
          break;
        }

        subvalue += character;
        index++;
      }

      character = value.charAt(index);

      if (!character || character === C_NEWLINE$11) {
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
    var C_SPACE$11 = ' ';
    var C_NEWLINE$12 = '\n';
    var C_TAB$11 = '\t';

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
        lineIndex = value.indexOf(C_NEWLINE$12, index);
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
      subvalue = lines.join(C_NEWLINE$12);
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
          eat(C_NEWLINE$12);
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

          if (character === C_TAB$11 || character === C_SPACE$11) {
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
          eat(C_NEWLINE$12 + alignments);
        }
      }

      return table;
    }

    var paragraph_1 = paragraph;

    var C_NEWLINE$13 = '\n';
    var C_TAB$12 = '\t';
    var C_SPACE$12 = ' ';

    var TAB_SIZE$1 = 4;

    /* Tokenise paragraph. */
    function paragraph(eat, value, silent) {
      var self = this;
      var settings = self.options;
      var commonmark = settings.commonmark;
      var gfm = settings.gfm;
      var tokenizers = self.blockTokenizers;
      var interruptors = self.interruptParagraph;
      var index = value.indexOf(C_NEWLINE$13);
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
        if (value.charAt(index + 1) === C_NEWLINE$13) {
          break;
        }

        /* In commonmark-mode, following indented lines
         * are part of the paragraph. */
        if (commonmark) {
          size = 0;
          position = index + 1;

          while (position < length) {
            character = value.charAt(position);

            if (character === C_TAB$12) {
              size = TAB_SIZE$1;
              break;
            } else if (character === C_SPACE$12) {
              size++;
            } else {
              break;
            }

            position++;
          }

          if (size >= TAB_SIZE$1) {
            index = value.indexOf(C_NEWLINE$13, index + 1);
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
        index = value.indexOf(C_NEWLINE$13, index + 1);

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
    var re$2 = /\w/;

    /* Check if the given character code, or the character
     * code at the first character, is a word character. */
    function wordCharacter(character) {
      return re$2.test(
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

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    function makeEmptyFunction(arg) {
      return function () {
        return arg;
      };
    }

    /**
     * This function accepts and discards inputs; it has no side effects. This is
     * primarily useful idiomatically for overridable function endpoints which
     * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
     */
    var emptyFunction = function emptyFunction() {};

    emptyFunction.thatReturns = makeEmptyFunction;
    emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
    emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
    emptyFunction.thatReturnsNull = makeEmptyFunction(null);
    emptyFunction.thatReturnsThis = function () {
      return this;
    };
    emptyFunction.thatReturnsArgument = function (arg) {
      return arg;
    };

    var emptyFunction_1 = emptyFunction;

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */

    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */

    var validateFormat = function validateFormat(format) {};

    if (process.env.NODE_ENV !== 'production') {
      validateFormat = function validateFormat(format) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      };
    }

    function invariant(condition, format, a, b, c, d, e, f) {
      validateFormat(format);

      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function () {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
      }
    }

    var invariant_1 = invariant;

    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warning = emptyFunction_1;

    if (process.env.NODE_ENV !== 'production') {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
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

      warning = function warning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (format.indexOf('Failed Composite propType: ') === 0) {
          return; // Ignore CompositeComponent proptype check.
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var warning_1 = warning;

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
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
    			if (hasOwnProperty$2.call(from, key)) {
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

    if (process.env.NODE_ENV !== 'production') {
      var invariant$1 = invariant_1;
      var warning$1 = warning_1;
      var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
      var loggedTypeFailures = {};
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
          if (typeSpecs.hasOwnProperty(typeSpecName)) {
            var error;
            // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.
            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
            } catch (ex) {
              error = ex;
            }
            warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error.message] = true;

              var stack = getStack ? getStack() : '';

              warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
            }
          }
        }
      }
    }

    var checkPropTypes_1 = checkPropTypes;

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
              invariant_1(
                false,
                'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                'Use `PropTypes.checkPropTypes()` to call them. ' +
                'Read more at http://fb.me/use-check-prop-types'
              );
            } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
              // Old behavior for people using React.PropTypes
              var cacheKey = componentName + ':' + propName;
              if (
                !manualPropTypeCallCache[cacheKey] &&
                // Avoid spamming the console because they are often not actionable except for lib authors
                manualPropTypeWarningCount < 3
              ) {
                warning_1(
                  false,
                  'You are manually calling a React.PropTypes validation ' +
                  'function for the `%s` prop on `%s`. This is deprecated ' +
                  'and will throw in the standalone `prop-types` package. ' +
                  'You may be seeing this warning due to a third-party PropTypes ' +
                  'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
                  propFullName,
                  componentName
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
        return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
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
          process.env.NODE_ENV !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
          return emptyFunction_1.thatReturnsNull;
        }

        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }

          var valuesString = JSON.stringify(expectedValues);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
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
            if (propValue.hasOwnProperty(key)) {
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
          process.env.NODE_ENV !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
          return emptyFunction_1.thatReturnsNull;
        }

        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== 'function') {
            warning_1(
              false,
              'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received %s at index %s.',
              getPostfixForTypeWarning(checker),
              i
            );
            return emptyFunction_1.thatReturnsNull;
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
      ReactPropTypes.PropTypes = ReactPropTypes;

      return ReactPropTypes;
    };

    var factoryWithThrowingShims = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret_1) {
          // It is still safe when called from React.
          return;
        }
        invariant_1(
          false,
          'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
          'Use PropTypes.checkPropTypes() to call them. ' +
          'Read more at http://fb.me/use-check-prop-types'
        );
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
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim
      };

      ReactPropTypes.checkPropTypes = emptyFunction_1;
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
      var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
        Symbol.for &&
        Symbol.for('react.element')) ||
        0xeac7;

      var isValidElement = function(object) {
        return typeof object === 'object' &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE;
      };

      // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod
      var throwOnDirectAccess = true;
      module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
    } else {
      // By explicitly using `prop-types` you are opting into new production behavior.
      // http://fb.me/prop-types-in-prod
      module.exports = factoryWithThrowingShims();
    }
    });

    /**
     * Naive, simple plugin to match inline nodes without attributes
     * This allows say <strong>foo</strong>, but not <strong class="very">foo</strong>
     * For proper HTML support, you'll want a different plugin
     **/


    var type = 'virtualHtml';
    var selfClosingRe = /^<(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\s*\/?>$/i;
    var simpleTagRe = /^<(\/?)([a-z]+)\s*>$/;

    var naiveHtml = function (tree) {
      var open = void 0;
      var currentParent = void 0;
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

        var current = getSimpleTag(node, parent);
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
      return match ? { tag: match[2], opening: !match[1], node: node } : false;
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
        var args = [index, 1].concat(node.children);
        Array.prototype.splice.apply(parent.children, args);
      }
    }

    var disallowNode = {
    	ofType: ofType,
    	ifNotMatch: ifNotMatch
    };

    function astToReact(node, options) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var renderer = options.renderers[node.type];

      var pos = node.position.start;
      var key = [node.type, pos.line, pos.column].join('-');

      if (node.type === 'text') {
        return renderer ? renderer(node.value, key) : node.value;
      }

      if (typeof renderer !== 'function' && typeof renderer !== 'string' && !isReactFragment(renderer)) {
        throw new Error('Renderer for type `' + node.type + '` not defined or is not renderable');
      }

      var nodeProps = getNodeProps(node, key, options, renderer, parent, index);

      return React__default.createElement(renderer, nodeProps, nodeProps.children || resolveChildren() || undefined);

      function resolveChildren() {
        return node.children && node.children.map(function (childNode, i) {
          return astToReact(childNode, options, { node: node, props: nodeProps }, i);
        });
      }
    }

    function isReactFragment(renderer) {
      return React__default.Fragment && React__default.Fragment === renderer;
    }

    // eslint-disable-next-line max-params, complexity
    function getNodeProps(node, key, opts, renderer, parent, index) {
      var props = { key: key };

      var isTagRenderer = typeof renderer === 'string';

      // `sourcePos` is true if the user wants source information (line/column info from markdown source)
      if (opts.sourcePos && node.position) {
        props['data-sourcepos'] = flattenPosition(node.position);
      }

      if (opts.rawSourcePos && !isTagRenderer) {
        props.sourcePosition = node.position;
      }

      var ref = node.identifier ? opts.definitions[node.identifier] || {} : null;

      switch (node.type) {
        case 'root':
          assignDefined(props, { className: opts.className });
          break;
        case 'heading':
          props.level = node.depth;
          break;
        case 'list':
          props.start = node.start;
          props.ordered = node.ordered;
          props.tight = !node.loose;
          break;
        case 'listItem':
          props.checked = node.checked;
          props.tight = !node.loose;
          props.children = (props.tight ? unwrapParagraphs(node) : node.children).map(function (childNode, i) {
            return astToReact(childNode, opts, { node: node, props: props }, i);
          });
          break;
        case 'definition':
          assignDefined(props, { identifier: node.identifier, title: node.title, url: node.url });
          break;
        case 'code':
          assignDefined(props, { language: node.lang && node.lang.split(/\s/, 1)[0] });
          break;
        case 'inlineCode':
          props.children = node.value;
          props.inline = true;
          break;
        case 'link':
          assignDefined(props, {
            title: node.title || undefined,
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

    function flattenPosition(pos) {
      return [pos.start.line, ':', pos.start.column, '-', pos.end.line, ':', pos.end.column].map(String).join('');
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

        if (colon === protocol.length && url.slice(0, protocol.length) === protocol) {
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
      }

      // eslint-disable-next-line no-script-url
      return 'javascript:void(0)';
    };

    var createElement = React__default.createElement;

    var renderers = {
      root: 'div',
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

      list: List,
      listItem: ListItem,
      definition: NullRenderer,
      heading: Heading,
      inlineCode: InlineCode,
      code: CodeBlock,
      html: Html,
      virtualHtml: VirtualHtml
    };

    function SimpleRenderer(tag, props) {
      return createElement(tag, getCoreProps(props), props.children);
    }

    function TableCell(props) {
      var style = props.align ? { textAlign: props.align } : undefined;
      var coreProps = getCoreProps(props);
      return createElement(props.isHeader ? 'th' : 'td', style ? immutable({ style: style }, coreProps) : coreProps, props.children);
    }

    function Heading(props) {
      return createElement('h' + props.level, getCoreProps(props), props.children);
    }

    function List(props) {
      var attrs = getCoreProps(props);
      if (props.start !== null && props.start !== 1) {
        attrs.start = props.start.toString();
      }

      return createElement(props.ordered ? 'ol' : 'ul', attrs, props.children);
    }

    function ListItem(props) {
      var checkbox = null;
      if (props.checked !== null) {
        var checked = props.checked;
        checkbox = createElement('input', { type: 'checkbox', checked: checked, readOnly: true });
      }

      return createElement('li', getCoreProps(props), checkbox, props.children);
    }

    function CodeBlock(props) {
      var className = props.language && 'language-' + props.language;
      var code = createElement('code', className ? { className: className } : null, props.value);
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
        // @todo when fiber lands, we can simply render props.value
        return createElement(tag, null, props.value);
      }

      var nodeProps = { dangerouslySetInnerHTML: { __html: props.value } };
      return createElement(tag, nodeProps);
    }

    function VirtualHtml(props) {
      return createElement(props.tag, getCoreProps(props), props.children);
    }

    function NullRenderer() {
      return null;
    }

    function getCoreProps(props) {
      return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
    }

    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }













    var allTypes = Object.keys(renderers);

    var ReactMarkdown = function ReactMarkdown(props) {
      var src = props.source || props.children || '';

      if (props.allowedTypes && props.disallowedTypes) {
        throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined');
      }

      var renderers$$1 = immutable(renderers, props.renderers);

      var plugins = [remarkParse].concat(props.plugins || []);
      var parser = plugins.reduce(applyParserPlugin, unified_1());

      var rawAst = parser.parse(src);
      var renderProps = immutable(props, {
        renderers: renderers$$1,
        definitions: getDefinitions(rawAst)
      });

      var astPlugins = determineAstPlugins(props);
      var ast = astPlugins.reduce(function (node, plugin) {
        return plugin(node, renderProps);
      }, rawAst);

      return astToReact_1(ast, renderProps);
    };

    function applyParserPlugin(parser, plugin) {
      return Array.isArray(plugin) ? parser.use.apply(parser, _toConsumableArray(plugin)) : parser.use(plugin);
    }

    function determineAstPlugins(props) {
      var plugins = [wrapTableRows];

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
      if (renderHtml) {
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
      plugins: []
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
      transformImageUri: propTypes.func,
      astPlugins: propTypes.arrayOf(propTypes.func),
      unwrapDisallowed: propTypes.bool,
      renderers: propTypes.object,
      plugins: propTypes.array
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

    var util$2 = {
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
      css = util$2.trimRight(css);
      if (css[css.length - 1] !== ';') css += ';';
      var cssLength = css.length;
      var isParenthesisOpen = false;
      var lastPos = 0;
      var i = 0;
      var retCSS = '';

      function addNewAttr () {
        // 如果没有正常的闭合圆括号，则直接忽略当前属性
        if (!isParenthesisOpen) {
          var source = util$2.trim(css.slice(lastPos, i));
          var j = source.indexOf(':');
          if (j !== -1) {
            var name = util$2.trim(source.slice(0, j));
            var value = util$2.trim(source.slice(j + 1));
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

      return util$2.trim(retCSS);
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
    function isNull$1 (obj) {
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
          if (isNull$1(ret)) {
            return name + ':' + value;
          } else {
            return ret;
          }

        } else {

          var ret = onIgnoreAttr(name, value, opts);
          if (!isNull$1(ret)) {
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

    var util$3 = {
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
        value = util$3.trim(value);
        if (value === "#") return "#";
        if (
          !(
            value.substr(0, 7) === "http://" ||
            value.substr(0, 8) === "https://" ||
            value.substr(0, 7) === "mailto:" ||
            value.substr(0, 4) === "tel:" ||
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
      return util$3.trim(str2);
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
        return util$3.indexOf(tags, tag) !== -1;
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
          util$3.forEach(removeList, function(pos) {
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
      var i = util$3.spaceIndex(html);
      if (i === -1) {
        var tagName = html.slice(1, -1);
      } else {
        var tagName = html.slice(1, i + 1);
      }
      tagName = util$3.trim(tagName).toLowerCase();
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
      "user strict";

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
      "user strict";

      var lastPos = 0;
      var retAttrs = [];
      var tmpName = false;
      var len = html.length;

      function addAttr(name, value) {
        name = util$3.trim(name);
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
              v = util$3.trim(html.slice(lastPos + 1, j));
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
              v = util$3.trim(html.slice(lastPos, i));
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
              v = util$3.trim(html.slice(lastPos, i));
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
          addAttr(tmpName, stripQuoteWrap(util$3.trim(html.slice(lastPos))));
        }
      }

      return util$3.trim(retAttrs.join(" "));
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
    function isNull$2(obj) {
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
      var i = util$3.spaceIndex(html);
      if (i === -1) {
        return {
          html: "",
          closing: html[html.length - 2] === "/"
        };
      }
      html = util$3.trim(html.slice(i + 1, -1));
      var isClosing = html[html.length - 1] === "/";
      if (isClosing) html = util$3.trim(html.slice(0, -1));
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
          if (!isNull$2(ret)) return ret;

          if (info.isWhite) {
            if (info.isClosing) {
              return "</" + tag + ">";
            }

            var attrs = getAttrs(html);
            var whiteAttrList = whiteList[tag];
            var attrsHtml = parseAttr$1(attrs.html, function(name, value) {
              // call `onTagAttr()`
              var isWhiteAttr = util$3.indexOf(whiteAttrList, name) !== -1;
              var ret = onTagAttr(tag, name, value, isWhiteAttr);
              if (!isNull$2(ret)) return ret;

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
                if (!isNull$2(ret)) return ret;
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
            if (!isNull$2(ret)) return ret;
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
      var xss$$1 = new xss(options);
      return xss$$1.process(html);
    }

    exports = module.exports = filterXSS;
    exports.FilterXSS = xss;
    for (var i in _default$1) exports[i] = _default$1[i];
    for (var i in parser$2) exports[i] = parser$2[i];

    // using `xss` on the browser, output `filterXSS` to the globals
    if (typeof window !== "undefined") {
      window.filterXSS = module.exports;
    }
    });
    var lib_1$1 = lib$1.FilterXSS;

    var FormattedText = (function (_super) {
        tslib_1.__extends(FormattedText, _super);
        function FormattedText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormattedText.filterXss = function (_a) {
            var value = _a.value, _b = _a.whiteList, whiteList = _b === void 0 ? {
                source: ['src', 'type'],
                img: ['src', 'alt', 'title', 'width', 'height', 'style'],
                video: [
                    'autoplay', 'controls', 'loop',
                    'preload', 'src', 'height',
                    'width', 'style',
                ],
            } : _b;
            var options = {
                whiteList: tslib_1.__assign({}, lib$1.getDefaultWhiteList(), whiteList),
                stripIgnoreTagBody: ['script'],
            };
            return lib$1(value, options);
        };
        FormattedText.prototype.render = function () {
            var _a = this.props, value = _a.value, _b = _a.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b, whiteList = _a.whiteList;
            if (typeof value !== 'string')
                return null;
            if (allowFilteredHtml && value.indexOf('<') === 0) {
                var filteredContent = FormattedText.filterXss({ value: value, whiteList: whiteList });
                return (React.createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } }));
            }
            return (React.createElement(reactMarkdown, { source: value, escapeHtml: false }));
        };
        return FormattedText;
    }(React.PureComponent));

    var MdTextarea = (function (_super) {
        tslib_1.__extends(MdTextarea, _super);
        function MdTextarea(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                showEdit: true,
            };
            _this.handleToggle = _this.handleToggle.bind(_this);
            return _this;
        }
        MdTextarea.prototype.toggle = function (show) {
            if (show === void 0) { show = !this.state.showEdit; }
            this.setState({ showEdit: show });
        };
        MdTextarea.prototype.handleToggle = function () {
            this.toggle();
        };
        MdTextarea.prototype.renderTextarea = function () {
            var _a = this.props, type = _a.type, allowFilteredHtml = _a.allowFilteredHtml, whiteList = _a.whiteList, other = tslib_1.__rest(_a, ["type", "allowFilteredHtml", "whiteList"]);
            return (React.createElement(reactstrap.Input, tslib_1.__assign({ type: "textarea" }, other)));
        };
        MdTextarea.prototype.renderTabs = function () {
            var _this = this;
            var _a = this.props, id = _a.id, value = _a.value, toggle = _a.toggle, _b = _a.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b;
            return (React.createElement(React.Fragment, null,
                React.createElement(reactstrap.Nav, { tabs: true, key: "Nav" },
                    React.createElement(reactstrap.NavItem, null,
                        React.createElement(reactstrap.NavLink, { active: this.state.showEdit, onClick: toggle ? this.handleToggle : function () { _this.toggle(true); } }, "Edit")),
                    React.createElement(reactstrap.NavItem, null,
                        React.createElement(reactstrap.NavLink, { active: !this.state.showEdit, onClick: toggle ? this.handleToggle : function () { _this.toggle(false); } }, "Preview"))),
                React.createElement(reactstrap.TabContent, { key: "Content", id: "tabpane_" + id, activeTab: this.state.showEdit ? 'Edit' : 'Preview' },
                    React.createElement(reactstrap.TabPane, { tabId: "Edit" },
                        React.createElement(wrapper, null,
                            allowFilteredHtml &&
                                React.createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text."),
                            this.renderTextarea())),
                    React.createElement(reactstrap.TabPane, { tabId: "Preview" },
                        React.createElement(wrapper, null,
                            React.createElement(FormattedText, tslib_1.__assign({}, { value: value, allowFilteredHtml: allowFilteredHtml })))))));
        };
        MdTextarea.prototype.getFilteredValue = function () {
            var _a = this.props, value = _a.value, whiteList = _a.whiteList;
            return FormattedText.filterXss({ value: value, whiteList: whiteList });
        };
        MdTextarea.prototype.render = function () {
            var type = this.props.type;
            if (type && ['text', 'textarea'].includes(type.toLowerCase())) {
                return this.renderTextarea();
            }
            return this.renderTabs();
        };
        return MdTextarea;
    }(React.Component));

    exports.Textarea = MdTextarea;
    exports.FormattedText = FormattedText;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=textarea.umd.js.map
