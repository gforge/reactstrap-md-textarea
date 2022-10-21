(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('react'), require('reactstrap')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tslib', 'react', 'reactstrap'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["reactstrap-md-textarea"] = {}, global.tslib, global.React, global.reactstrap));
})(this, (function (exports, tslib, React, reactstrap) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

    var wrapper = function (_a) {
        var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
        return (React__namespace.createElement("div", { style: tslib.__assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
    };
    var InputWrapper = React__namespace.memo(wrapper);

    function InputTabMD(props) {
        var allowFilteredHtml = props.allowFilteredHtml, other = tslib.__rest(props, ["allowFilteredHtml"]);
        return (React__namespace.createElement(InputWrapper, null,
            allowFilteredHtml && (React__namespace.createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text.")),
            React__namespace.createElement(reactstrap.Input, tslib.__assign({ type: "textarea" }, other))));
    }
    var InputTab = React__namespace.memo(InputTabMD);

    const protocols = ['http', 'https', 'mailto', 'tel'];

    /**
     * @param {string} uri
     * @returns {string}
     */
    function uriTransformer(uri) {
      const url = (uri || '').trim();
      const first = url.charAt(0);

      if (first === '#' || first === '/') {
        return url
      }

      const colon = url.indexOf(':');
      if (colon === -1) {
        return url
      }

      let index = -1;

      while (++index < protocols.length) {
        const protocol = protocols[index];

        if (
          colon === protocol.length &&
          url.slice(0, protocol.length).toLowerCase() === protocol
        ) {
          return url
        }
      }

      index = url.indexOf('?');
      if (index !== -1 && colon > index) {
        return url
      }

      index = url.indexOf('#');
      if (index !== -1 && colon > index) {
        return url
      }

      // eslint-disable-next-line no-script-url
      return 'javascript:void(0)'
    }

    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    var isBuffer = function isBuffer (obj) {
      return obj != null && obj.constructor != null &&
        typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    };

    /**
     * @typedef {import('unist').Point} Point
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Position} Position
     * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
     */

    /**
     * Stringify one point, a position (start and end points), or a node’s
     * positional information.
     *
     * @param {Node|NodeLike|Position|Point|null} [value]
     * @returns {string}
     */
    function stringifyPosition(value) {
      // Nothing.
      if (!value || typeof value !== 'object') {
        return ''
      }

      // Node.
      if ('position' in value || 'type' in value) {
        return position(value.position)
      }

      // Position.
      if ('start' in value || 'end' in value) {
        return position(value)
      }

      // Point.
      if ('line' in value || 'column' in value) {
        return point$1(value)
      }

      // ?
      return ''
    }

    /**
     * @param {Point|undefined} point
     * @returns {string}
     */
    function point$1(point) {
      return index$1(point && point.line) + ':' + index$1(point && point.column)
    }

    /**
     * @param {Position|undefined} pos
     * @returns {string}
     */
    function position(pos) {
      return point$1(pos && pos.start) + '-' + point$1(pos && pos.end)
    }

    /**
     * @param {number|undefined} value
     * @returns {number}
     */
    function index$1(value) {
      return value && typeof value === 'number' ? value : 1
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Position} Position
     * @typedef {import('unist').Point} Point
     * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
     */

    class VFileMessage extends Error {
      /**
       * Constructor of a message for `reason` at `place` from `origin`.
       * When an error is passed in as `reason`, copies the `stack`.
       *
       * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
       * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
       * @param {string} [origin] Place in code the message originates from (`string`, optional).
       */
      constructor(reason, place, origin) {
        /** @type {[string|null, string|null]} */
        const parts = [null, null];
        /** @type {Position} */
        let position = {
          // @ts-expect-error: we always follows the structure of `position`.
          start: {line: null, column: null},
          // @ts-expect-error: "
          end: {line: null, column: null}
        };

        super();

        if (typeof place === 'string') {
          origin = place;
          place = undefined;
        }

        if (typeof origin === 'string') {
          const index = origin.indexOf(':');

          if (index === -1) {
            parts[1] = origin;
          } else {
            parts[0] = origin.slice(0, index);
            parts[1] = origin.slice(index + 1);
          }
        }

        if (place) {
          // Node.
          if ('type' in place || 'position' in place) {
            if (place.position) {
              position = place.position;
            }
          }
          // Position.
          else if ('start' in place || 'end' in place) {
            position = place;
          }
          // Point.
          else if ('line' in place || 'column' in place) {
            position.start = place;
          }
        }

        // Fields from `Error`
        this.name = stringifyPosition(place) || '1:1';
        this.message = typeof reason === 'object' ? reason.message : reason;
        this.stack = typeof reason === 'object' ? reason.stack : '';

        /**
         * Reason for message.
         * @type {string}
         */
        this.reason = this.message;
        /**
         * If true, marks associated file as no longer processable.
         * @type {boolean?}
         */
        // eslint-disable-next-line no-unused-expressions
        this.fatal;
        /**
         * Starting line of error.
         * @type {number?}
         */
        this.line = position.start.line;
        /**
         * Starting column of error.
         * @type {number?}
         */
        this.column = position.start.column;
        /**
         * Namespace of warning.
         * @type {string?}
         */
        this.source = parts[0];
        /**
         * Category of message.
         * @type {string?}
         */
        this.ruleId = parts[1];
        /**
         * Full range information, when available.
         * Has start and end properties, both set to an object with line and column, set to number?.
         * @type {Position?}
         */
        this.position = position;

        // The following fields are “well known”.
        // Not standard.
        // Feel free to add other non-standard fields to your messages.

        /* eslint-disable no-unused-expressions */
        /**
         * You can use this to specify the source value that’s being reported, which
         * is deemed incorrect.
         * @type {string?}
         */
        this.actual;
        /**
         * You can use this to suggest values that should be used instead of
         * `actual`, one or more values that are deemed as acceptable.
         * @type {Array<string>?}
         */
        this.expected;
        /**
         * You may add a file property with a path of a file (used throughout the VFile ecosystem).
         * @type {string?}
         */
        this.file;
        /**
         * You may add a url property with a link to documentation for the message.
         * @type {string?}
         */
        this.url;
        /**
         * You may add a note property with a long form description of the message (supported by vfile-reporter).
         * @type {string?}
         */
        this.note;
        /* eslint-enable no-unused-expressions */
      }
    }

    VFileMessage.prototype.file = '';
    VFileMessage.prototype.name = '';
    VFileMessage.prototype.reason = '';
    VFileMessage.prototype.message = '';
    VFileMessage.prototype.stack = '';
    VFileMessage.prototype.fatal = null;
    VFileMessage.prototype.column = null;
    VFileMessage.prototype.line = null;
    VFileMessage.prototype.source = null;
    VFileMessage.prototype.ruleId = null;
    VFileMessage.prototype.position = null;

    // A derivative work based on:
    // <https://github.com/browserify/path-browserify>.
    // Which is licensed:
    //
    // MIT License
    //
    // Copyright (c) 2013 James Halliday
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy of
    // this software and associated documentation files (the "Software"), to deal in
    // the Software without restriction, including without limitation the rights to
    // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    // the Software, and to permit persons to whom the Software is furnished to do so,
    // subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in all
    // copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    // A derivative work based on:
    //
    // Parts of that are extracted from Node’s internal `path` module:
    // <https://github.com/nodejs/node/blob/master/lib/path.js>.
    // Which is licensed:
    //
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

    const path = {basename, dirname, extname, join, sep: '/'};

    /* eslint-disable max-depth, complexity */

    /**
     * @param {string} path
     * @param {string} [ext]
     * @returns {string}
     */
    function basename(path, ext) {
      if (ext !== undefined && typeof ext !== 'string') {
        throw new TypeError('"ext" argument must be a string')
      }

      assertPath$1(path);
      let start = 0;
      let end = -1;
      let index = path.length;
      /** @type {boolean|undefined} */
      let seenNonSlash;

      if (ext === undefined || ext.length === 0 || ext.length > path.length) {
        while (index--) {
          if (path.charCodeAt(index) === 47 /* `/` */) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now.
            if (seenNonSlash) {
              start = index + 1;
              break
            }
          } else if (end < 0) {
            // We saw the first non-path separator, mark this as the end of our
            // path component.
            seenNonSlash = true;
            end = index + 1;
          }
        }

        return end < 0 ? '' : path.slice(start, end)
      }

      if (ext === path) {
        return ''
      }

      let firstNonSlashEnd = -1;
      let extIndex = ext.length - 1;

      while (index--) {
        if (path.charCodeAt(index) === 47 /* `/` */) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now.
          if (seenNonSlash) {
            start = index + 1;
            break
          }
        } else {
          if (firstNonSlashEnd < 0) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching.
            seenNonSlash = true;
            firstNonSlashEnd = index + 1;
          }

          if (extIndex > -1) {
            // Try to match the explicit extension.
            if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
              if (extIndex < 0) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = index;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIndex = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) {
        end = firstNonSlashEnd;
      } else if (end < 0) {
        end = path.length;
      }

      return path.slice(start, end)
    }

    /**
     * @param {string} path
     * @returns {string}
     */
    function dirname(path) {
      assertPath$1(path);

      if (path.length === 0) {
        return '.'
      }

      let end = -1;
      let index = path.length;
      /** @type {boolean|undefined} */
      let unmatchedSlash;

      // Prefix `--` is important to not run on `0`.
      while (--index) {
        if (path.charCodeAt(index) === 47 /* `/` */) {
          if (unmatchedSlash) {
            end = index;
            break
          }
        } else if (!unmatchedSlash) {
          // We saw the first non-path separator
          unmatchedSlash = true;
        }
      }

      return end < 0
        ? path.charCodeAt(0) === 47 /* `/` */
          ? '/'
          : '.'
        : end === 1 && path.charCodeAt(0) === 47 /* `/` */
        ? '//'
        : path.slice(0, end)
    }

    /**
     * @param {string} path
     * @returns {string}
     */
    function extname(path) {
      assertPath$1(path);

      let index = path.length;

      let end = -1;
      let startPart = 0;
      let startDot = -1;
      // Track the state of characters (if any) we see before our first dot and
      // after any path separator we find.
      let preDotState = 0;
      /** @type {boolean|undefined} */
      let unmatchedSlash;

      while (index--) {
        const code = path.charCodeAt(index);

        if (code === 47 /* `/` */) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now.
          if (unmatchedSlash) {
            startPart = index + 1;
            break
          }

          continue
        }

        if (end < 0) {
          // We saw the first non-path separator, mark this as the end of our
          // extension.
          unmatchedSlash = true;
          end = index + 1;
        }

        if (code === 46 /* `.` */) {
          // If this is our first dot, mark it as the start of our extension.
          if (startDot < 0) {
            startDot = index;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot > -1) {
          // We saw a non-dot and non-path separator before our dot, so we should
          // have a good chance at having a non-empty extension.
          preDotState = -1;
        }
      }

      if (
        startDot < 0 ||
        end < 0 ||
        // We saw a non-dot character immediately before the dot.
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly `..`.
        (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
      ) {
        return ''
      }

      return path.slice(startDot, end)
    }

    /**
     * @param {Array<string>} segments
     * @returns {string}
     */
    function join(...segments) {
      let index = -1;
      /** @type {string|undefined} */
      let joined;

      while (++index < segments.length) {
        assertPath$1(segments[index]);

        if (segments[index]) {
          joined =
            joined === undefined ? segments[index] : joined + '/' + segments[index];
        }
      }

      return joined === undefined ? '.' : normalize$1(joined)
    }

    /**
     * Note: `normalize` is not exposed as `path.normalize`, so some code is
     * manually removed from it.
     *
     * @param {string} path
     * @returns {string}
     */
    function normalize$1(path) {
      assertPath$1(path);

      const absolute = path.charCodeAt(0) === 47; /* `/` */

      // Normalize the path according to POSIX rules.
      let value = normalizeString(path, !absolute);

      if (value.length === 0 && !absolute) {
        value = '.';
      }

      if (value.length > 0 && path.charCodeAt(path.length - 1) === 47 /* / */) {
        value += '/';
      }

      return absolute ? '/' + value : value
    }

    /**
     * Resolve `.` and `..` elements in a path with directory names.
     *
     * @param {string} path
     * @param {boolean} allowAboveRoot
     * @returns {string}
     */
    function normalizeString(path, allowAboveRoot) {
      let result = '';
      let lastSegmentLength = 0;
      let lastSlash = -1;
      let dots = 0;
      let index = -1;
      /** @type {number|undefined} */
      let code;
      /** @type {number} */
      let lastSlashIndex;

      while (++index <= path.length) {
        if (index < path.length) {
          code = path.charCodeAt(index);
        } else if (code === 47 /* `/` */) {
          break
        } else {
          code = 47; /* `/` */
        }

        if (code === 47 /* `/` */) {
          if (lastSlash === index - 1 || dots === 1) ; else if (lastSlash !== index - 1 && dots === 2) {
            if (
              result.length < 2 ||
              lastSegmentLength !== 2 ||
              result.charCodeAt(result.length - 1) !== 46 /* `.` */ ||
              result.charCodeAt(result.length - 2) !== 46 /* `.` */
            ) {
              if (result.length > 2) {
                lastSlashIndex = result.lastIndexOf('/');

                if (lastSlashIndex !== result.length - 1) {
                  if (lastSlashIndex < 0) {
                    result = '';
                    lastSegmentLength = 0;
                  } else {
                    result = result.slice(0, lastSlashIndex);
                    lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
                  }

                  lastSlash = index;
                  dots = 0;
                  continue
                }
              } else if (result.length > 0) {
                result = '';
                lastSegmentLength = 0;
                lastSlash = index;
                dots = 0;
                continue
              }
            }

            if (allowAboveRoot) {
              result = result.length > 0 ? result + '/..' : '..';
              lastSegmentLength = 2;
            }
          } else {
            if (result.length > 0) {
              result += '/' + path.slice(lastSlash + 1, index);
            } else {
              result = path.slice(lastSlash + 1, index);
            }

            lastSegmentLength = index - lastSlash - 1;
          }

          lastSlash = index;
          dots = 0;
        } else if (code === 46 /* `.` */ && dots > -1) {
          dots++;
        } else {
          dots = -1;
        }
      }

      return result
    }

    /**
     * @param {string} path
     */
    function assertPath$1(path) {
      if (typeof path !== 'string') {
        throw new TypeError(
          'Path must be a string. Received ' + JSON.stringify(path)
        )
      }
    }

    /* eslint-enable max-depth, complexity */

    // Somewhat based on:
    // <https://github.com/defunctzombie/node-process/blob/master/browser.js>.
    // But I don’t think one tiny line of code can be copyrighted. 😅
    const proc = {cwd};

    function cwd() {
      return '/'
    }

    /**
     * @typedef URL
     * @property {string} hash
     * @property {string} host
     * @property {string} hostname
     * @property {string} href
     * @property {string} origin
     * @property {string} password
     * @property {string} pathname
     * @property {string} port
     * @property {string} protocol
     * @property {string} search
     * @property {any} searchParams
     * @property {string} username
     * @property {() => string} toString
     * @property {() => string} toJSON
     */

    /**
     * @param {unknown} fileURLOrPath
     * @returns {fileURLOrPath is URL}
     */
    // From: <https://github.com/nodejs/node/blob/fcf8ba4/lib/internal/url.js#L1501>
    function isUrl(fileURLOrPath) {
      return (
        fileURLOrPath !== null &&
        typeof fileURLOrPath === 'object' &&
        // @ts-expect-error: indexable.
        fileURLOrPath.href &&
        // @ts-expect-error: indexable.
        fileURLOrPath.origin
      )
    }

    /// <reference lib="dom" />

    // See: <https://github.com/nodejs/node/blob/fcf8ba4/lib/internal/url.js>

    /**
     * @param {string|URL} path
     */
    function urlToPath(path) {
      if (typeof path === 'string') {
        path = new URL(path);
      } else if (!isUrl(path)) {
        /** @type {NodeJS.ErrnoException} */
        const error = new TypeError(
          'The "path" argument must be of type string or an instance of URL. Received `' +
            path +
            '`'
        );
        error.code = 'ERR_INVALID_ARG_TYPE';
        throw error
      }

      if (path.protocol !== 'file:') {
        /** @type {NodeJS.ErrnoException} */
        const error = new TypeError('The URL must be of scheme file');
        error.code = 'ERR_INVALID_URL_SCHEME';
        throw error
      }

      return getPathFromURLPosix(path)
    }

    /**
     * @param {URL} url
     */
    function getPathFromURLPosix(url) {
      if (url.hostname !== '') {
        /** @type {NodeJS.ErrnoException} */
        const error = new TypeError(
          'File URL host must be "localhost" or empty on darwin'
        );
        error.code = 'ERR_INVALID_FILE_URL_HOST';
        throw error
      }

      const pathname = url.pathname;
      let index = -1;

      while (++index < pathname.length) {
        if (
          pathname.charCodeAt(index) === 37 /* `%` */ &&
          pathname.charCodeAt(index + 1) === 50 /* `2` */
        ) {
          const third = pathname.charCodeAt(index + 2);
          if (third === 70 /* `F` */ || third === 102 /* `f` */) {
            /** @type {NodeJS.ErrnoException} */
            const error = new TypeError(
              'File URL path must not include encoded / characters'
            );
            error.code = 'ERR_INVALID_FILE_URL_PATH';
            throw error
          }
        }
      }

      return decodeURIComponent(pathname)
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Position} Position
     * @typedef {import('unist').Point} Point
     * @typedef {Record<string, unknown> & {type: string, position?: Position|undefined}} NodeLike
     * @typedef {import('./minurl.shared.js').URL} URL
     * @typedef {import('../index.js').Data} Data
     * @typedef {import('../index.js').Value} Value
     *
     * @typedef {'ascii'|'utf8'|'utf-8'|'utf16le'|'ucs2'|'ucs-2'|'base64'|'base64url'|'latin1'|'binary'|'hex'} BufferEncoding
     *   Encodings supported by the buffer class.
     *   This is a copy of the typing from Node, copied to prevent Node globals from
     *   being needed.
     *   Copied from: <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/90a4ec8/types/node/buffer.d.ts#L170>
     *
     * @typedef {Value|Options|VFile|URL} Compatible
     *   Things that can be passed to the constructor.
     *
     * @typedef VFileCoreOptions
     * @property {Value} [value]
     * @property {string} [cwd]
     * @property {Array<string>} [history]
     * @property {string|URL} [path]
     * @property {string} [basename]
     * @property {string} [stem]
     * @property {string} [extname]
     * @property {string} [dirname]
     * @property {Data} [data]
     *
     * @typedef Map
     *   Raw source map, see:
     *   <https://github.com/mozilla/source-map/blob/58819f0/source-map.d.ts#L15-L23>.
     * @property {number} version
     * @property {Array<string>} sources
     * @property {Array<string>} names
     * @property {string|undefined} [sourceRoot]
     * @property {Array<string>|undefined} [sourcesContent]
     * @property {string} mappings
     * @property {string} file
     *
     * @typedef {{[key: string]: unknown} & VFileCoreOptions} Options
     *   Configuration: a bunch of keys that will be shallow copied over to the new
     *   file.
     *
     * @typedef {Record<string, unknown>} ReporterSettings
     * @typedef {<T = ReporterSettings>(files: Array<VFile>, options: T) => string} Reporter
     */

    // Order of setting (least specific to most), we need this because otherwise
    // `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
    // stem can be set.
    const order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

    class VFile {
      /**
       * Create a new virtual file.
       *
       * If `options` is `string` or `Buffer`, it’s treated as `{value: options}`.
       * If `options` is a `URL`, it’s treated as `{path: options}`.
       * If `options` is a `VFile`, shallow copies its data over to the new file.
       * All fields in `options` are set on the newly created `VFile`.
       *
       * Path related fields are set in the following order (least specific to
       * most specific): `history`, `path`, `basename`, `stem`, `extname`,
       * `dirname`.
       *
       * It’s not possible to set either `dirname` or `extname` without setting
       * either `history`, `path`, `basename`, or `stem` as well.
       *
       * @param {Compatible} [value]
       */
      constructor(value) {
        /** @type {Options} */
        let options;

        if (!value) {
          options = {};
        } else if (typeof value === 'string' || isBuffer(value)) {
          // @ts-expect-error Looks like a buffer.
          options = {value};
        } else if (isUrl(value)) {
          options = {path: value};
        } else {
          // @ts-expect-error Looks like file or options.
          options = value;
        }

        /**
         * Place to store custom information (default: `{}`).
         * It’s OK to store custom data directly on the file but moving it to
         * `data` is recommended.
         * @type {Data}
         */
        this.data = {};

        /**
         * List of messages associated with the file.
         * @type {Array<VFileMessage>}
         */
        this.messages = [];

        /**
         * List of filepaths the file moved between.
         * The first is the original path and the last is the current path.
         * @type {Array<string>}
         */
        this.history = [];

        /**
         * Base of `path` (default: `process.cwd()` or `'/'` in browsers).
         * @type {string}
         */
        this.cwd = proc.cwd();

        /* eslint-disable no-unused-expressions */
        /**
         * Raw value.
         * @type {Value}
         */
        this.value;

        // The below are non-standard, they are “well-known”.
        // As in, used in several tools.

        /**
         * Whether a file was saved to disk.
         * This is used by vfile reporters.
         * @type {boolean}
         */
        this.stored;

        /**
         * Sometimes files have a non-string, compiled, representation.
         * This can be stored in the `result` field.
         * One example is when turning markdown into React nodes.
         * This is used by unified to store non-string results.
         * @type {unknown}
         */
        this.result;

        /**
         * Sometimes files have a source map associated with them.
         * This can be stored in the `map` field.
         * This should be a `Map` type, which is equivalent to the `RawSourceMap`
         * type from the `source-map` module.
         * @type {Map|undefined}
         */
        this.map;
        /* eslint-enable no-unused-expressions */

        // Set path related properties in the correct order.
        let index = -1;

        while (++index < order.length) {
          const prop = order[index];

          // Note: we specifically use `in` instead of `hasOwnProperty` to accept
          // `vfile`s too.
          if (prop in options && options[prop] !== undefined) {
            // @ts-expect-error: TS is confused by the different types for `history`.
            this[prop] = prop === 'history' ? [...options[prop]] : options[prop];
          }
        }

        /** @type {string} */
        let prop;

        // Set non-path related properties.
        for (prop in options) {
          // @ts-expect-error: fine to set other things.
          if (!order.includes(prop)) this[prop] = options[prop];
        }
      }

      /**
       * Get the full path (example: `'~/index.min.js'`).
       * @returns {string}
       */
      get path() {
        return this.history[this.history.length - 1]
      }

      /**
       * Set the full path (example: `'~/index.min.js'`).
       * Cannot be nullified.
       * You can set a file URL (a `URL` object with a `file:` protocol) which will
       * be turned into a path with `url.fileURLToPath`.
       * @param {string|URL} path
       */
      set path(path) {
        if (isUrl(path)) {
          path = urlToPath(path);
        }

        assertNonEmpty(path, 'path');

        if (this.path !== path) {
          this.history.push(path);
        }
      }

      /**
       * Get the parent path (example: `'~'`).
       */
      get dirname() {
        return typeof this.path === 'string' ? path.dirname(this.path) : undefined
      }

      /**
       * Set the parent path (example: `'~'`).
       * Cannot be set if there’s no `path` yet.
       */
      set dirname(dirname) {
        assertPath(this.basename, 'dirname');
        this.path = path.join(dirname || '', this.basename);
      }

      /**
       * Get the basename (including extname) (example: `'index.min.js'`).
       */
      get basename() {
        return typeof this.path === 'string' ? path.basename(this.path) : undefined
      }

      /**
       * Set basename (including extname) (`'index.min.js'`).
       * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
       * on windows).
       * Cannot be nullified (use `file.path = file.dirname` instead).
       */
      set basename(basename) {
        assertNonEmpty(basename, 'basename');
        assertPart(basename, 'basename');
        this.path = path.join(this.dirname || '', basename);
      }

      /**
       * Get the extname (including dot) (example: `'.js'`).
       */
      get extname() {
        return typeof this.path === 'string' ? path.extname(this.path) : undefined
      }

      /**
       * Set the extname (including dot) (example: `'.js'`).
       * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
       * on windows).
       * Cannot be set if there’s no `path` yet.
       */
      set extname(extname) {
        assertPart(extname, 'extname');
        assertPath(this.dirname, 'extname');

        if (extname) {
          if (extname.charCodeAt(0) !== 46 /* `.` */) {
            throw new Error('`extname` must start with `.`')
          }

          if (extname.includes('.', 1)) {
            throw new Error('`extname` cannot contain multiple dots')
          }
        }

        this.path = path.join(this.dirname, this.stem + (extname || ''));
      }

      /**
       * Get the stem (basename w/o extname) (example: `'index.min'`).
       */
      get stem() {
        return typeof this.path === 'string'
          ? path.basename(this.path, this.extname)
          : undefined
      }

      /**
       * Set the stem (basename w/o extname) (example: `'index.min'`).
       * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
       * on windows).
       * Cannot be nullified (use `file.path = file.dirname` instead).
       */
      set stem(stem) {
        assertNonEmpty(stem, 'stem');
        assertPart(stem, 'stem');
        this.path = path.join(this.dirname || '', stem + (this.extname || ''));
      }

      /**
       * Serialize the file.
       *
       * @param {BufferEncoding} [encoding='utf8']
       *   When `value` is a `Buffer`, `encoding` is a character encoding to
       *   understand it as (default: `'utf8'`).
       * @returns {string}
       *   Serialized file.
       */
      toString(encoding) {
        return (this.value || '').toString(encoding)
      }

      /**
       * Constructs a new `VFileMessage`, where `fatal` is set to `false`, and
       * associates it with the file by adding it to `vfile.messages` and setting
       * `message.file` to the current filepath.
       *
       * @param {string|Error} reason
       *   Human readable reason for the message, uses the stack and message of the error if given.
       * @param {Node|NodeLike|Position|Point} [place]
       *   Place where the message occurred in the file.
       * @param {string} [origin]
       *   Computer readable reason for the message
       * @returns {VFileMessage}
       *   Message.
       */
      message(reason, place, origin) {
        const message = new VFileMessage(reason, place, origin);

        if (this.path) {
          message.name = this.path + ':' + message.name;
          message.file = this.path;
        }

        message.fatal = false;

        this.messages.push(message);

        return message
      }

      /**
       * Like `VFile#message()`, but associates an informational message where
       * `fatal` is set to `null`.
       *
       * @param {string|Error} reason
       *   Human readable reason for the message, uses the stack and message of the error if given.
       * @param {Node|NodeLike|Position|Point} [place]
       *   Place where the message occurred in the file.
       * @param {string} [origin]
       *   Computer readable reason for the message
       * @returns {VFileMessage}
       *   Message.
       */
      info(reason, place, origin) {
        const message = this.message(reason, place, origin);

        message.fatal = null;

        return message
      }

      /**
       * Like `VFile#message()`, but associates a fatal message where `fatal` is
       * set to `true`, and then immediately throws it.
       *
       * > 👉 **Note**: a fatal error means that a file is no longer processable.
       *
       * @param {string|Error} reason
       *   Human readable reason for the message, uses the stack and message of the error if given.
       * @param {Node|NodeLike|Position|Point} [place]
       *   Place where the message occurred in the file.
       * @param {string} [origin]
       *   Computer readable reason for the message
       * @returns {never}
       *   Message.
       */
      fail(reason, place, origin) {
        const message = this.message(reason, place, origin);

        message.fatal = true;

        throw message
      }
    }

    /**
     * Assert that `part` is not a path (as in, does not contain `path.sep`).
     *
     * @param {string|undefined} part
     * @param {string} name
     * @returns {void}
     */
    function assertPart(part, name) {
      if (part && part.includes(path.sep)) {
        throw new Error(
          '`' + name + '` cannot be a path: did not expect `' + path.sep + '`'
        )
      }
    }

    /**
     * Assert that `part` is not empty.
     *
     * @param {string|undefined} part
     * @param {string} name
     * @returns {asserts part is string}
     */
    function assertNonEmpty(part, name) {
      if (!part) {
        throw new Error('`' + name + '` cannot be empty')
      }
    }

    /**
     * Assert `path` exists.
     *
     * @param {string|undefined} path
     * @param {string} name
     * @returns {asserts path is string}
     */
    function assertPath(path, name) {
      if (!path) {
        throw new Error('Setting `' + name + '` requires `path` to be set too')
      }
    }

    /**
     * Throw a given error.
     *
     * @param {Error|null|undefined} [error]
     *   Maybe error.
     * @returns {asserts error is null|undefined}
     */
    function bail(error) {
      if (error) {
        throw error
      }
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

    var isPlainObject$1 = function isPlainObject(obj) {
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

    var extend = function extend() {
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
    					if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = isArray(copy)))) {
    						if (copyIsArray) {
    							copyIsArray = false;
    							clone = src && isArray(src) ? src : [];
    						} else {
    							clone = src && isPlainObject$1(src) ? src : {};
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

    function isPlainObject(value) {
    	if (typeof value !== 'object' || value === null) {
    		return false;
    	}

    	const prototype = Object.getPrototypeOf(value);
    	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
    }

    /**
     * @typedef {(error?: Error|null|undefined, ...output: Array<any>) => void} Callback
     * @typedef {(...input: Array<any>) => any} Middleware
     *
     * @typedef {(...input: Array<any>) => void} Run
     *   Call all middleware.
     * @typedef {(fn: Middleware) => Pipeline} Use
     *   Add `fn` (middleware) to the list.
     * @typedef {{run: Run, use: Use}} Pipeline
     *   Middleware.
     */

    /**
     * Create new middleware.
     *
     * @returns {Pipeline}
     */
    function trough() {
      /** @type {Array<Middleware>} */
      const fns = [];
      /** @type {Pipeline} */
      const pipeline = {run, use};

      return pipeline

      /** @type {Run} */
      function run(...values) {
        let middlewareIndex = -1;
        /** @type {Callback} */
        const callback = values.pop();

        if (typeof callback !== 'function') {
          throw new TypeError('Expected function as last argument, not ' + callback)
        }

        next(null, ...values);

        /**
         * Run the next `fn`, or we’re done.
         *
         * @param {Error|null|undefined} error
         * @param {Array<any>} output
         */
        function next(error, ...output) {
          const fn = fns[++middlewareIndex];
          let index = -1;

          if (error) {
            callback(error);
            return
          }

          // Copy non-nullish input into values.
          while (++index < values.length) {
            if (output[index] === null || output[index] === undefined) {
              output[index] = values[index];
            }
          }

          // Save the newly created `output` for the next call.
          values = output;

          // Next or done.
          if (fn) {
            wrap$1(fn, next)(...output);
          } else {
            callback(null, ...output);
          }
        }
      }

      /** @type {Use} */
      function use(middelware) {
        if (typeof middelware !== 'function') {
          throw new TypeError(
            'Expected `middelware` to be a function, not ' + middelware
          )
        }

        fns.push(middelware);
        return pipeline
      }
    }

    /**
     * Wrap `middleware`.
     * Can be sync or async; return a promise, receive a callback, or return new
     * values and errors.
     *
     * @param {Middleware} middleware
     * @param {Callback} callback
     */
    function wrap$1(middleware, callback) {
      /** @type {boolean} */
      let called;

      return wrapped

      /**
       * Call `middleware`.
       * @this {any}
       * @param {Array<any>} parameters
       * @returns {void}
       */
      function wrapped(...parameters) {
        const fnExpectsCallback = middleware.length > parameters.length;
        /** @type {any} */
        let result;

        if (fnExpectsCallback) {
          parameters.push(done);
        }

        try {
          result = middleware.apply(this, parameters);
        } catch (error) {
          const exception = /** @type {Error} */ (error);

          // Well, this is quite the pickle.
          // `middleware` received a callback and called it synchronously, but that
          // threw an error.
          // The only thing left to do is to throw the thing instead.
          if (fnExpectsCallback && called) {
            throw exception
          }

          return done(exception)
        }

        if (!fnExpectsCallback) {
          if (result instanceof Promise) {
            result.then(then, done);
          } else if (result instanceof Error) {
            done(result);
          } else {
            then(result);
          }
        }
      }

      /**
       * Call `callback`, only once.
       * @type {Callback}
       */
      function done(error, ...output) {
        if (!called) {
          called = true;
          callback(error, ...output);
        }
      }

      /**
       * Call `done` with one value.
       *
       * @param {any} [value]
       */
      function then(value) {
        done(null, value);
      }
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('vfile').VFileCompatible} VFileCompatible
     * @typedef {import('vfile').VFileValue} VFileValue
     * @typedef {import('..').Processor} Processor
     * @typedef {import('..').Plugin} Plugin
     * @typedef {import('..').Preset} Preset
     * @typedef {import('..').Pluggable} Pluggable
     * @typedef {import('..').PluggableList} PluggableList
     * @typedef {import('..').Transformer} Transformer
     * @typedef {import('..').Parser} Parser
     * @typedef {import('..').Compiler} Compiler
     * @typedef {import('..').RunCallback} RunCallback
     * @typedef {import('..').ProcessCallback} ProcessCallback
     *
     * @typedef Context
     * @property {Node} tree
     * @property {VFile} file
     */

    // Expose a frozen processor.
    const unified = base().freeze();

    const own$8 = {}.hasOwnProperty;

    // Function to create the first processor.
    /**
     * @returns {Processor}
     */
    function base() {
      const transformers = trough();
      /** @type {Processor['attachers']} */
      const attachers = [];
      /** @type {Record<string, unknown>} */
      let namespace = {};
      /** @type {boolean|undefined} */
      let frozen;
      let freezeIndex = -1;

      // Data management.
      // @ts-expect-error: overloads are handled.
      processor.data = data;
      processor.Parser = undefined;
      processor.Compiler = undefined;

      // Lock.
      processor.freeze = freeze;

      // Plugins.
      processor.attachers = attachers;
      // @ts-expect-error: overloads are handled.
      processor.use = use;

      // API.
      processor.parse = parse;
      processor.stringify = stringify;
      // @ts-expect-error: overloads are handled.
      processor.run = run;
      processor.runSync = runSync;
      // @ts-expect-error: overloads are handled.
      processor.process = process;
      processor.processSync = processSync;

      // Expose.
      return processor

      // Create a new processor based on the processor in the current scope.
      /** @type {Processor} */
      function processor() {
        const destination = base();
        let index = -1;

        while (++index < attachers.length) {
          destination.use(...attachers[index]);
        }

        destination.data(extend(true, {}, namespace));

        return destination
      }

      /**
       * @param {string|Record<string, unknown>} [key]
       * @param {unknown} [value]
       * @returns {unknown}
       */
      function data(key, value) {
        if (typeof key === 'string') {
          // Set `key`.
          if (arguments.length === 2) {
            assertUnfrozen('data', frozen);
            namespace[key] = value;
            return processor
          }

          // Get `key`.
          return (own$8.call(namespace, key) && namespace[key]) || null
        }

        // Set space.
        if (key) {
          assertUnfrozen('data', frozen);
          namespace = key;
          return processor
        }

        // Get space.
        return namespace
      }

      /** @type {Processor['freeze']} */
      function freeze() {
        if (frozen) {
          return processor
        }

        while (++freezeIndex < attachers.length) {
          const [attacher, ...options] = attachers[freezeIndex];

          if (options[0] === false) {
            continue
          }

          if (options[0] === true) {
            options[0] = undefined;
          }

          /** @type {Transformer|void} */
          const transformer = attacher.call(processor, ...options);

          if (typeof transformer === 'function') {
            transformers.use(transformer);
          }
        }

        frozen = true;
        freezeIndex = Number.POSITIVE_INFINITY;

        return processor
      }

      /**
       * @param {Pluggable|null|undefined} [value]
       * @param {...unknown} options
       * @returns {Processor}
       */
      function use(value, ...options) {
        /** @type {Record<string, unknown>|undefined} */
        let settings;

        assertUnfrozen('use', frozen);

        if (value === null || value === undefined) ; else if (typeof value === 'function') {
          addPlugin(value, ...options);
        } else if (typeof value === 'object') {
          if (Array.isArray(value)) {
            addList(value);
          } else {
            addPreset(value);
          }
        } else {
          throw new TypeError('Expected usable value, not `' + value + '`')
        }

        if (settings) {
          namespace.settings = Object.assign(namespace.settings || {}, settings);
        }

        return processor

        /**
         * @param {import('..').Pluggable<unknown[]>} value
         * @returns {void}
         */
        function add(value) {
          if (typeof value === 'function') {
            addPlugin(value);
          } else if (typeof value === 'object') {
            if (Array.isArray(value)) {
              const [plugin, ...options] = value;
              addPlugin(plugin, ...options);
            } else {
              addPreset(value);
            }
          } else {
            throw new TypeError('Expected usable value, not `' + value + '`')
          }
        }

        /**
         * @param {Preset} result
         * @returns {void}
         */
        function addPreset(result) {
          addList(result.plugins);

          if (result.settings) {
            settings = Object.assign(settings || {}, result.settings);
          }
        }

        /**
         * @param {PluggableList|null|undefined} [plugins]
         * @returns {void}
         */
        function addList(plugins) {
          let index = -1;

          if (plugins === null || plugins === undefined) ; else if (Array.isArray(plugins)) {
            while (++index < plugins.length) {
              const thing = plugins[index];
              add(thing);
            }
          } else {
            throw new TypeError('Expected a list of plugins, not `' + plugins + '`')
          }
        }

        /**
         * @param {Plugin} plugin
         * @param {...unknown} [value]
         * @returns {void}
         */
        function addPlugin(plugin, value) {
          let index = -1;
          /** @type {Processor['attachers'][number]|undefined} */
          let entry;

          while (++index < attachers.length) {
            if (attachers[index][0] === plugin) {
              entry = attachers[index];
              break
            }
          }

          if (entry) {
            if (isPlainObject(entry[1]) && isPlainObject(value)) {
              value = extend(true, entry[1], value);
            }

            entry[1] = value;
          } else {
            // @ts-expect-error: fine.
            attachers.push([...arguments]);
          }
        }
      }

      /** @type {Processor['parse']} */
      function parse(doc) {
        processor.freeze();
        const file = vfile(doc);
        const Parser = processor.Parser;
        assertParser('parse', Parser);

        if (newable(Parser, 'parse')) {
          // @ts-expect-error: `newable` checks this.
          return new Parser(String(file), file).parse()
        }

        // @ts-expect-error: `newable` checks this.
        return Parser(String(file), file) // eslint-disable-line new-cap
      }

      /** @type {Processor['stringify']} */
      function stringify(node, doc) {
        processor.freeze();
        const file = vfile(doc);
        const Compiler = processor.Compiler;
        assertCompiler('stringify', Compiler);
        assertNode(node);

        if (newable(Compiler, 'compile')) {
          // @ts-expect-error: `newable` checks this.
          return new Compiler(node, file).compile()
        }

        // @ts-expect-error: `newable` checks this.
        return Compiler(node, file) // eslint-disable-line new-cap
      }

      /**
       * @param {Node} node
       * @param {VFileCompatible|RunCallback} [doc]
       * @param {RunCallback} [callback]
       * @returns {Promise<Node>|void}
       */
      function run(node, doc, callback) {
        assertNode(node);
        processor.freeze();

        if (!callback && typeof doc === 'function') {
          callback = doc;
          doc = undefined;
        }

        if (!callback) {
          return new Promise(executor)
        }

        executor(null, callback);

        /**
         * @param {null|((node: Node) => void)} resolve
         * @param {(error: Error) => void} reject
         * @returns {void}
         */
        function executor(resolve, reject) {
          // @ts-expect-error: `doc` can’t be a callback anymore, we checked.
          transformers.run(node, vfile(doc), done);

          /**
           * @param {Error|null} error
           * @param {Node} tree
           * @param {VFile} file
           * @returns {void}
           */
          function done(error, tree, file) {
            tree = tree || node;
            if (error) {
              reject(error);
            } else if (resolve) {
              resolve(tree);
            } else {
              // @ts-expect-error: `callback` is defined if `resolve` is not.
              callback(null, tree, file);
            }
          }
        }
      }

      /** @type {Processor['runSync']} */
      function runSync(node, file) {
        /** @type {Node|undefined} */
        let result;
        /** @type {boolean|undefined} */
        let complete;

        processor.run(node, file, done);

        assertDone('runSync', 'run', complete);

        // @ts-expect-error: we either bailed on an error or have a tree.
        return result

        /**
         * @param {Error|null} [error]
         * @param {Node} [tree]
         * @returns {void}
         */
        function done(error, tree) {
          bail(error);
          result = tree;
          complete = true;
        }
      }

      /**
       * @param {VFileCompatible} doc
       * @param {ProcessCallback} [callback]
       * @returns {Promise<VFile>|undefined}
       */
      function process(doc, callback) {
        processor.freeze();
        assertParser('process', processor.Parser);
        assertCompiler('process', processor.Compiler);

        if (!callback) {
          return new Promise(executor)
        }

        executor(null, callback);

        /**
         * @param {null|((file: VFile) => void)} resolve
         * @param {(error?: Error|null|undefined) => void} reject
         * @returns {void}
         */
        function executor(resolve, reject) {
          const file = vfile(doc);

          processor.run(processor.parse(file), file, (error, tree, file) => {
            if (error || !tree || !file) {
              done(error);
            } else {
              /** @type {unknown} */
              const result = processor.stringify(tree, file);

              if (result === undefined || result === null) ; else if (looksLikeAVFileValue(result)) {
                file.value = result;
              } else {
                file.result = result;
              }

              done(error, file);
            }
          });

          /**
           * @param {Error|null|undefined} [error]
           * @param {VFile|undefined} [file]
           * @returns {void}
           */
          function done(error, file) {
            if (error || !file) {
              reject(error);
            } else if (resolve) {
              resolve(file);
            } else {
              // @ts-expect-error: `callback` is defined if `resolve` is not.
              callback(null, file);
            }
          }
        }
      }

      /** @type {Processor['processSync']} */
      function processSync(doc) {
        /** @type {boolean|undefined} */
        let complete;

        processor.freeze();
        assertParser('processSync', processor.Parser);
        assertCompiler('processSync', processor.Compiler);

        const file = vfile(doc);

        processor.process(file, done);

        assertDone('processSync', 'process', complete);

        return file

        /**
         * @param {Error|null|undefined} [error]
         * @returns {void}
         */
        function done(error) {
          complete = true;
          bail(error);
        }
      }
    }

    /**
     * Check if `value` is a constructor.
     *
     * @param {unknown} value
     * @param {string} name
     * @returns {boolean}
     */
    function newable(value, name) {
      return (
        typeof value === 'function' &&
        // Prototypes do exist.
        // type-coverage:ignore-next-line
        value.prototype &&
        // A function with keys in its prototype is probably a constructor.
        // Classes’ prototype methods are not enumerable, so we check if some value
        // exists in the prototype.
        // type-coverage:ignore-next-line
        (keys(value.prototype) || name in value.prototype)
      )
    }

    /**
     * Check if `value` is an object with keys.
     *
     * @param {Record<string, unknown>} value
     * @returns {boolean}
     */
    function keys(value) {
      /** @type {string} */
      let key;

      for (key in value) {
        if (own$8.call(value, key)) {
          return true
        }
      }

      return false
    }

    /**
     * Assert a parser is available.
     *
     * @param {string} name
     * @param {unknown} value
     * @returns {asserts value is Parser}
     */
    function assertParser(name, value) {
      if (typeof value !== 'function') {
        throw new TypeError('Cannot `' + name + '` without `Parser`')
      }
    }

    /**
     * Assert a compiler is available.
     *
     * @param {string} name
     * @param {unknown} value
     * @returns {asserts value is Compiler}
     */
    function assertCompiler(name, value) {
      if (typeof value !== 'function') {
        throw new TypeError('Cannot `' + name + '` without `Compiler`')
      }
    }

    /**
     * Assert the processor is not frozen.
     *
     * @param {string} name
     * @param {unknown} frozen
     * @returns {asserts frozen is false}
     */
    function assertUnfrozen(name, frozen) {
      if (frozen) {
        throw new Error(
          'Cannot call `' +
            name +
            '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
        )
      }
    }

    /**
     * Assert `node` is a unist node.
     *
     * @param {unknown} node
     * @returns {asserts node is Node}
     */
    function assertNode(node) {
      // `isPlainObj` unfortunately uses `any` instead of `unknown`.
      // type-coverage:ignore-next-line
      if (!isPlainObject(node) || typeof node.type !== 'string') {
        throw new TypeError('Expected node, got `' + node + '`')
        // Fine.
      }
    }

    /**
     * Assert that `complete` is `true`.
     *
     * @param {string} name
     * @param {string} asyncName
     * @param {unknown} complete
     * @returns {asserts complete is true}
     */
    function assertDone(name, asyncName, complete) {
      if (!complete) {
        throw new Error(
          '`' + name + '` finished async. Use `' + asyncName + '` instead'
        )
      }
    }

    /**
     * @param {VFileCompatible} [value]
     * @returns {VFile}
     */
    function vfile(value) {
      return looksLikeAVFile(value) ? value : new VFile(value)
    }

    /**
     * @param {VFileCompatible} [value]
     * @returns {value is VFile}
     */
    function looksLikeAVFile(value) {
      return Boolean(
        value &&
          typeof value === 'object' &&
          'message' in value &&
          'messages' in value
      )
    }

    /**
     * @param {unknown} [value]
     * @returns {value is VFileValue}
     */
    function looksLikeAVFileValue(value) {
      return typeof value === 'string' || isBuffer(value)
    }

    /**
     * @typedef Options
     * @property {boolean} [includeImageAlt=true]
     */

    /**
     * Get the text content of a node.
     * Prefer the node’s plain-text fields, otherwise serialize its children,
     * and if the given value is an array, serialize the nodes in it.
     *
     * @param {unknown} node
     * @param {Options} [options]
     * @returns {string}
     */
    function toString(node, options) {
      var {includeImageAlt = true} = options || {};
      return one$1(node, includeImageAlt)
    }

    /**
     * @param {unknown} node
     * @param {boolean} includeImageAlt
     * @returns {string}
     */
    function one$1(node, includeImageAlt) {
      return (
        (node &&
          typeof node === 'object' &&
          // @ts-ignore looks like a literal.
          (node.value ||
            // @ts-ignore looks like an image.
            (includeImageAlt ? node.alt : '') ||
            // @ts-ignore looks like a parent.
            ('children' in node && all$1(node.children, includeImageAlt)) ||
            (Array.isArray(node) && all$1(node, includeImageAlt)))) ||
        ''
      )
    }

    /**
     * @param {Array.<unknown>} values
     * @param {boolean} includeImageAlt
     * @returns {string}
     */
    function all$1(values, includeImageAlt) {
      /** @type {Array.<string>} */
      var result = [];
      var index = -1;

      while (++index < values.length) {
        result[index] = one$1(values[index], includeImageAlt);
      }

      return result.join('')
    }

    /**
     * Like `Array#splice`, but smarter for giant arrays.
     *
     * `Array#splice` takes all items to be inserted as individual argument which
     * causes a stack overflow in V8 when trying to insert 100k items for instance.
     *
     * Otherwise, this does not return the removed items, and takes `items` as an
     * array instead of rest parameters.
     *
     * @template {unknown} T
     * @param {T[]} list
     * @param {number} start
     * @param {number} remove
     * @param {T[]} items
     * @returns {void}
     */
    function splice(list, start, remove, items) {
      const end = list.length;
      let chunkStart = 0;
      /** @type {unknown[]} */

      let parameters; // Make start between zero and `end` (included).

      if (start < 0) {
        start = -start > end ? 0 : end + start;
      } else {
        start = start > end ? end : start;
      }

      remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

      if (items.length < 10000) {
        parameters = Array.from(items);
        parameters.unshift(start, remove) // @ts-expect-error Hush, it’s fine.
        ;[].splice.apply(list, parameters);
      } else {
        // Delete `remove` items starting from `start`
        if (remove) [].splice.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

        while (chunkStart < items.length) {
          parameters = items.slice(chunkStart, chunkStart + 10000);
          parameters.unshift(start, 0) // @ts-expect-error Hush, it’s fine.
          ;[].splice.apply(list, parameters);
          chunkStart += 10000;
          start += 10000;
        }
      }
    }
    /**
     * Append `items` (an array) at the end of `list` (another array).
     * When `list` was empty, returns `items` instead.
     *
     * This prevents a potentially expensive operation when `list` is empty,
     * and adds items in batches to prevent V8 from hanging.
     *
     * @template {unknown} T
     * @param {T[]} list
     * @param {T[]} items
     * @returns {T[]}
     */

    function push(list, items) {
      if (list.length > 0) {
        splice(list, list.length, 0, items);
        return list
      }

      return items
    }

    /**
     * @typedef {import('micromark-util-types').NormalizedExtension} NormalizedExtension
     * @typedef {import('micromark-util-types').Extension} Extension
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
     */

    const hasOwnProperty$1 = {}.hasOwnProperty;

    /**
     * Combine several syntax extensions into one.
     *
     * @param {Extension[]} extensions List of syntax extensions.
     * @returns {NormalizedExtension} A single combined extension.
     */
    function combineExtensions(extensions) {
      /** @type {NormalizedExtension} */
      const all = {};
      let index = -1;

      while (++index < extensions.length) {
        syntaxExtension(all, extensions[index]);
      }

      return all
    }

    /**
     * Merge `extension` into `all`.
     *
     * @param {NormalizedExtension} all Extension to merge into.
     * @param {Extension} extension Extension to merge.
     * @returns {void}
     */
    function syntaxExtension(all, extension) {
      /** @type {string} */
      let hook;

      for (hook in extension) {
        const maybe = hasOwnProperty$1.call(all, hook) ? all[hook] : undefined;
        const left = maybe || (all[hook] = {});
        const right = extension[hook];
        /** @type {string} */
        let code;

        for (code in right) {
          if (!hasOwnProperty$1.call(left, code)) left[code] = [];
          const value = right[code];
          constructs(
            // @ts-expect-error Looks like a list.
            left[code],
            Array.isArray(value) ? value : value ? [value] : []
          );
        }
      }
    }

    /**
     * Merge `list` into `existing` (both lists of constructs).
     * Mutates `existing`.
     *
     * @param {unknown[]} existing
     * @param {unknown[]} list
     * @returns {void}
     */
    function constructs(existing, list) {
      let index = -1;
      /** @type {unknown[]} */
      const before = [];

      while (++index < list.length) {
    (list[index].add === 'after' ? existing : before).push(list[index]);
      }

      splice(existing, 0, 0, before);
    }

    // This module is generated by `script/`.
    //
    // CommonMark handles attention (emphasis, strong) markers based on what comes
    // before or after them.
    // One such difference is if those characters are Unicode punctuation.
    // This script is generated from the Unicode data.
    const unicodePunctuationRegex =
      /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

    /**
     * @typedef {import('micromark-util-types').Code} Code
     */
    /**
     * Check whether the character code represents an ASCII alpha (`a` through `z`,
     * case insensitive).
     *
     * An **ASCII alpha** is an ASCII upper alpha or ASCII lower alpha.
     *
     * An **ASCII upper alpha** is a character in the inclusive range U+0041 (`A`)
     * to U+005A (`Z`).
     *
     * An **ASCII lower alpha** is a character in the inclusive range U+0061 (`a`)
     * to U+007A (`z`).
     */

    const asciiAlpha = regexCheck(/[A-Za-z]/);
    /**
     * Check whether the character code represents an ASCII digit (`0` through `9`).
     *
     * An **ASCII digit** is a character in the inclusive range U+0030 (`0`) to
     * U+0039 (`9`).
     */

    const asciiDigit = regexCheck(/\d/);
    /**
     * Check whether the character code represents an ASCII hex digit (`a` through
     * `f`, case insensitive, or `0` through `9`).
     *
     * An **ASCII hex digit** is an ASCII digit (see `asciiDigit`), ASCII upper hex
     * digit, or an ASCII lower hex digit.
     *
     * An **ASCII upper hex digit** is a character in the inclusive range U+0041
     * (`A`) to U+0046 (`F`).
     *
     * An **ASCII lower hex digit** is a character in the inclusive range U+0061
     * (`a`) to U+0066 (`f`).
     */

    const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
    /**
     * Check whether the character code represents an ASCII alphanumeric (`a`
     * through `z`, case insensitive, or `0` through `9`).
     *
     * An **ASCII alphanumeric** is an ASCII digit (see `asciiDigit`) or ASCII alpha
     * (see `asciiAlpha`).
     */

    const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
    /**
     * Check whether the character code represents ASCII punctuation.
     *
     * An **ASCII punctuation** is a character in the inclusive ranges U+0021
     * EXCLAMATION MARK (`!`) to U+002F SLASH (`/`), U+003A COLON (`:`) to U+0040 AT
     * SIGN (`@`), U+005B LEFT SQUARE BRACKET (`[`) to U+0060 GRAVE ACCENT
     * (`` ` ``), or U+007B LEFT CURLY BRACE (`{`) to U+007E TILDE (`~`).
     */

    const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
    /**
     * Check whether the character code represents an ASCII atext.
     *
     * atext is an ASCII alphanumeric (see `asciiAlphanumeric`), or a character in
     * the inclusive ranges U+0023 NUMBER SIGN (`#`) to U+0027 APOSTROPHE (`'`),
     * U+002A ASTERISK (`*`), U+002B PLUS SIGN (`+`), U+002D DASH (`-`), U+002F
     * SLASH (`/`), U+003D EQUALS TO (`=`), U+003F QUESTION MARK (`?`), U+005E
     * CARET (`^`) to U+0060 GRAVE ACCENT (`` ` ``), or U+007B LEFT CURLY BRACE
     * (`{`) to U+007E TILDE (`~`).
     *
     * See:
     * **\[RFC5322]**:
     * [Internet Message Format](https://tools.ietf.org/html/rfc5322).
     * P. Resnick.
     * IETF.
     */

    const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
    /**
     * Check whether a character code is an ASCII control character.
     *
     * An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
     * to U+001F (US), or U+007F (DEL).
     *
     * @param {Code} code
     * @returns {code is number}
     */

    function asciiControl(code) {
      return (
        // Special whitespace codes (which have negative values), C0 and Control
        // character DEL
        code !== null && (code < 32 || code === 127)
      )
    }
    /**
     * Check whether a character code is a markdown line ending (see
     * `markdownLineEnding`) or markdown space (see `markdownSpace`).
     *
     * @param {Code} code
     * @returns {code is number}
     */

    function markdownLineEndingOrSpace(code) {
      return code !== null && (code < 0 || code === 32)
    }
    /**
     * Check whether a character code is a markdown line ending.
     *
     * A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
     * LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
     *
     * In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
     * RETURN (CR) are replaced by these virtual characters depending on whether
     * they occurred together.
     *
     * @param {Code} code
     * @returns {code is number}
     */

    function markdownLineEnding(code) {
      return code !== null && code < -2
    }
    /**
     * Check whether a character code is a markdown space.
     *
     * A **markdown space** is the concrete character U+0020 SPACE (SP) and the
     * virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
     *
     * In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
     * replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
     * SPACE (VS) characters, depending on the column at which the tab occurred.
     *
     * @param {Code} code
     * @returns {code is number}
     */

    function markdownSpace(code) {
      return code === -2 || code === -1 || code === 32
    }
    /**
     * Check whether the character code represents Unicode whitespace.
     *
     * Note that this does handle micromark specific markdown whitespace characters.
     * See `markdownLineEndingOrSpace` to check that.
     *
     * A **Unicode whitespace** is a character in the Unicode `Zs` (Separator,
     * Space) category, or U+0009 CHARACTER TABULATION (HT), U+000A LINE FEED (LF),
     * U+000C (FF), or U+000D CARRIAGE RETURN (CR) (**\[UNICODE]**).
     *
     * See:
     * **\[UNICODE]**:
     * [The Unicode Standard](https://www.unicode.org/versions/).
     * Unicode Consortium.
     */

    const unicodeWhitespace = regexCheck(/\s/);
    /**
     * Check whether the character code represents Unicode punctuation.
     *
     * A **Unicode punctuation** is a character in the Unicode `Pc` (Punctuation,
     * Connector), `Pd` (Punctuation, Dash), `Pe` (Punctuation, Close), `Pf`
     * (Punctuation, Final quote), `Pi` (Punctuation, Initial quote), `Po`
     * (Punctuation, Other), or `Ps` (Punctuation, Open) categories, or an ASCII
     * punctuation (see `asciiPunctuation`).
     *
     * See:
     * **\[UNICODE]**:
     * [The Unicode Standard](https://www.unicode.org/versions/).
     * Unicode Consortium.
     */
    // Size note: removing ASCII from the regex and using `asciiPunctuation` here
    // In fact adds to the bundle size.

    const unicodePunctuation = regexCheck(unicodePunctuationRegex);
    /**
     * Create a code check from a regex.
     *
     * @param {RegExp} regex
     * @returns {(code: Code) => code is number}
     */

    function regexCheck(regex) {
      return check
      /**
       * Check whether a code matches the bound regex.
       *
       * @param {Code} code Character code
       * @returns {code is number} Whether the character code matches the bound regex
       */

      function check(code) {
        return code !== null && regex.test(String.fromCharCode(code))
      }
    }

    /**
     * @typedef {import('micromark-util-types').Effects} Effects
     * @typedef {import('micromark-util-types').State} State
     */
    /**
     * @param {Effects} effects
     * @param {State} ok
     * @param {string} type
     * @param {number} [max=Infinity]
     * @returns {State}
     */

    function factorySpace(effects, ok, type, max) {
      const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
      let size = 0;
      return start
      /** @type {State} */

      function start(code) {
        if (markdownSpace(code)) {
          effects.enter(type);
          return prefix(code)
        }

        return ok(code)
      }
      /** @type {State} */

      function prefix(code) {
        if (markdownSpace(code) && size++ < limit) {
          effects.consume(code);
          return prefix
        }

        effects.exit(type);
        return ok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
     * @typedef {import('micromark-util-types').Initializer} Initializer
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {InitialConstruct} */
    const content$1 = {
      tokenize: initializeContent
    };
    /** @type {Initializer} */

    function initializeContent(effects) {
      const contentStart = effects.attempt(
        this.parser.constructs.contentInitial,
        afterContentStartConstruct,
        paragraphInitial
      );
      /** @type {Token} */

      let previous;
      return contentStart
      /** @type {State} */

      function afterContentStartConstruct(code) {
        if (code === null) {
          effects.consume(code);
          return
        }

        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        return factorySpace(effects, contentStart, 'linePrefix')
      }
      /** @type {State} */

      function paragraphInitial(code) {
        effects.enter('paragraph');
        return lineStart(code)
      }
      /** @type {State} */

      function lineStart(code) {
        const token = effects.enter('chunkText', {
          contentType: 'text',
          previous
        });

        if (previous) {
          previous.next = token;
        }

        previous = token;
        return data(code)
      }
      /** @type {State} */

      function data(code) {
        if (code === null) {
          effects.exit('chunkText');
          effects.exit('paragraph');
          effects.consume(code);
          return
        }

        if (markdownLineEnding(code)) {
          effects.consume(code);
          effects.exit('chunkText');
          return lineStart
        } // Data.

        effects.consume(code);
        return data
      }
    }

    /**
     * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
     * @typedef {import('micromark-util-types').Initializer} Initializer
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Point} Point
     */
    /** @type {InitialConstruct} */

    const document$1 = {
      tokenize: initializeDocument
    };
    /** @type {Construct} */

    const containerConstruct = {
      tokenize: tokenizeContainer
    };
    /** @type {Initializer} */

    function initializeDocument(effects) {
      const self = this;
      /** @type {Array<StackItem>} */

      const stack = [];
      let continued = 0;
      /** @type {TokenizeContext|undefined} */

      let childFlow;
      /** @type {Token|undefined} */

      let childToken;
      /** @type {number} */

      let lineStartOffset;
      return start
      /** @type {State} */

      function start(code) {
        // First we iterate through the open blocks, starting with the root
        // document, and descending through last children down to the last open
        // block.
        // Each block imposes a condition that the line must satisfy if the block is
        // to remain open.
        // For example, a block quote requires a `>` character.
        // A paragraph requires a non-blank line.
        // In this phase we may match all or just some of the open blocks.
        // But we cannot close unmatched blocks yet, because we may have a lazy
        // continuation line.
        if (continued < stack.length) {
          const item = stack[continued];
          self.containerState = item[1];
          return effects.attempt(
            item[0].continuation,
            documentContinue,
            checkNewContainers
          )(code)
        } // Done.

        return checkNewContainers(code)
      }
      /** @type {State} */

      function documentContinue(code) {
        continued++; // Note: this field is called `_closeFlow` but it also closes containers.
        // Perhaps a good idea to rename it but it’s already used in the wild by
        // extensions.

        if (self.containerState._closeFlow) {
          self.containerState._closeFlow = undefined;

          if (childFlow) {
            closeFlow();
          } // Note: this algorithm for moving events around is similar to the
          // algorithm when dealing with lazy lines in `writeToChild`.

          const indexBeforeExits = self.events.length;
          let indexBeforeFlow = indexBeforeExits;
          /** @type {Point|undefined} */

          let point; // Find the flow chunk.

          while (indexBeforeFlow--) {
            if (
              self.events[indexBeforeFlow][0] === 'exit' &&
              self.events[indexBeforeFlow][1].type === 'chunkFlow'
            ) {
              point = self.events[indexBeforeFlow][1].end;
              break
            }
          }

          exitContainers(continued); // Fix positions.

          let index = indexBeforeExits;

          while (index < self.events.length) {
            self.events[index][1].end = Object.assign({}, point);
            index++;
          } // Inject the exits earlier (they’re still also at the end).

          splice(
            self.events,
            indexBeforeFlow + 1,
            0,
            self.events.slice(indexBeforeExits)
          ); // Discard the duplicate exits.

          self.events.length = index;
          return checkNewContainers(code)
        }

        return start(code)
      }
      /** @type {State} */

      function checkNewContainers(code) {
        // Next, after consuming the continuation markers for existing blocks, we
        // look for new block starts (e.g. `>` for a block quote).
        // If we encounter a new block start, we close any blocks unmatched in
        // step 1 before creating the new block as a child of the last matched
        // block.
        if (continued === stack.length) {
          // No need to `check` whether there’s a container, of `exitContainers`
          // would be moot.
          // We can instead immediately `attempt` to parse one.
          if (!childFlow) {
            return documentContinued(code)
          } // If we have concrete content, such as block HTML or fenced code,
          // we can’t have containers “pierce” into them, so we can immediately
          // start.

          if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
            return flowStart(code)
          } // If we do have flow, it could still be a blank line,
          // but we’d be interrupting it w/ a new container if there’s a current
          // construct.

          self.interrupt = Boolean(
            childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
          );
        } // Check if there is a new container.

        self.containerState = {};
        return effects.check(
          containerConstruct,
          thereIsANewContainer,
          thereIsNoNewContainer
        )(code)
      }
      /** @type {State} */

      function thereIsANewContainer(code) {
        if (childFlow) closeFlow();
        exitContainers(continued);
        return documentContinued(code)
      }
      /** @type {State} */

      function thereIsNoNewContainer(code) {
        self.parser.lazy[self.now().line] = continued !== stack.length;
        lineStartOffset = self.now().offset;
        return flowStart(code)
      }
      /** @type {State} */

      function documentContinued(code) {
        // Try new containers.
        self.containerState = {};
        return effects.attempt(
          containerConstruct,
          containerContinue,
          flowStart
        )(code)
      }
      /** @type {State} */

      function containerContinue(code) {
        continued++;
        stack.push([self.currentConstruct, self.containerState]); // Try another.

        return documentContinued(code)
      }
      /** @type {State} */

      function flowStart(code) {
        if (code === null) {
          if (childFlow) closeFlow();
          exitContainers(0);
          effects.consume(code);
          return
        }

        childFlow = childFlow || self.parser.flow(self.now());
        effects.enter('chunkFlow', {
          contentType: 'flow',
          previous: childToken,
          _tokenizer: childFlow
        });
        return flowContinue(code)
      }
      /** @type {State} */

      function flowContinue(code) {
        if (code === null) {
          writeToChild(effects.exit('chunkFlow'), true);
          exitContainers(0);
          effects.consume(code);
          return
        }

        if (markdownLineEnding(code)) {
          effects.consume(code);
          writeToChild(effects.exit('chunkFlow')); // Get ready for the next line.

          continued = 0;
          self.interrupt = undefined;
          return start
        }

        effects.consume(code);
        return flowContinue
      }
      /**
       * @param {Token} token
       * @param {boolean} [eof]
       * @returns {void}
       */

      function writeToChild(token, eof) {
        const stream = self.sliceStream(token);
        if (eof) stream.push(null);
        token.previous = childToken;
        if (childToken) childToken.next = token;
        childToken = token;
        childFlow.defineSkip(token.start);
        childFlow.write(stream); // Alright, so we just added a lazy line:
        //
        // ```markdown
        // > a
        // b.
        //
        // Or:
        //
        // > ~~~c
        // d
        //
        // Or:
        //
        // > | e |
        // f
        // ```
        //
        // The construct in the second example (fenced code) does not accept lazy
        // lines, so it marked itself as done at the end of its first line, and
        // then the content construct parses `d`.
        // Most constructs in markdown match on the first line: if the first line
        // forms a construct, a non-lazy line can’t “unmake” it.
        //
        // The construct in the third example is potentially a GFM table, and
        // those are *weird*.
        // It *could* be a table, from the first line, if the following line
        // matches a condition.
        // In this case, that second line is lazy, which “unmakes” the first line
        // and turns the whole into one content block.
        //
        // We’ve now parsed the non-lazy and the lazy line, and can figure out
        // whether the lazy line started a new flow block.
        // If it did, we exit the current containers between the two flow blocks.

        if (self.parser.lazy[token.start.line]) {
          let index = childFlow.events.length;

          while (index--) {
            if (
              // The token starts before the line ending…
              childFlow.events[index][1].start.offset < lineStartOffset && // …and either is not ended yet…
              (!childFlow.events[index][1].end || // …or ends after it.
                childFlow.events[index][1].end.offset > lineStartOffset)
            ) {
              // Exit: there’s still something open, which means it’s a lazy line
              // part of something.
              return
            }
          } // Note: this algorithm for moving events around is similar to the
          // algorithm when closing flow in `documentContinue`.

          const indexBeforeExits = self.events.length;
          let indexBeforeFlow = indexBeforeExits;
          /** @type {boolean|undefined} */

          let seen;
          /** @type {Point|undefined} */

          let point; // Find the previous chunk (the one before the lazy line).

          while (indexBeforeFlow--) {
            if (
              self.events[indexBeforeFlow][0] === 'exit' &&
              self.events[indexBeforeFlow][1].type === 'chunkFlow'
            ) {
              if (seen) {
                point = self.events[indexBeforeFlow][1].end;
                break
              }

              seen = true;
            }
          }

          exitContainers(continued); // Fix positions.

          index = indexBeforeExits;

          while (index < self.events.length) {
            self.events[index][1].end = Object.assign({}, point);
            index++;
          } // Inject the exits earlier (they’re still also at the end).

          splice(
            self.events,
            indexBeforeFlow + 1,
            0,
            self.events.slice(indexBeforeExits)
          ); // Discard the duplicate exits.

          self.events.length = index;
        }
      }
      /**
       * @param {number} size
       * @returns {void}
       */

      function exitContainers(size) {
        let index = stack.length; // Exit open containers.

        while (index-- > size) {
          const entry = stack[index];
          self.containerState = entry[1];
          entry[0].exit.call(self, effects);
        }

        stack.length = size;
      }

      function closeFlow() {
        childFlow.write([null]);
        childToken = undefined;
        childFlow = undefined;
        self.containerState._closeFlow = undefined;
      }
    }
    /** @type {Tokenizer} */

    function tokenizeContainer(effects, ok, nok) {
      return factorySpace(
        effects,
        effects.attempt(this.parser.constructs.document, ok, nok),
        'linePrefix',
        this.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4
      )
    }

    /**
     * @typedef {import('micromark-util-types').Code} Code
     */

    /**
     * Classify whether a character code represents whitespace, punctuation, or
     * something else.
     *
     * Used for attention (emphasis, strong), whose sequences can open or close
     * based on the class of surrounding characters.
     *
     * Note that eof (`null`) is seen as whitespace.
     *
     * @param {Code} code
     * @returns {number|undefined}
     */
    function classifyCharacter(code) {
      if (
        code === null ||
        markdownLineEndingOrSpace(code) ||
        unicodeWhitespace(code)
      ) {
        return 1
      }

      if (unicodePunctuation(code)) {
        return 2
      }
    }

    /**
     * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
     * @typedef {import('micromark-util-types').Event} Event
     * @typedef {import('micromark-util-types').Resolver} Resolver
     */

    /**
     * Call all `resolveAll`s.
     *
     * @param {{resolveAll?: Resolver}[]} constructs
     * @param {Event[]} events
     * @param {TokenizeContext} context
     * @returns {Event[]}
     */
    function resolveAll(constructs, events, context) {
      /** @type {Resolver[]} */
      const called = [];
      let index = -1;

      while (++index < constructs.length) {
        const resolve = constructs[index].resolveAll;

        if (resolve && !called.includes(resolve)) {
          events = resolve(events, context);
          called.push(resolve);
        }
      }

      return events
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').Event} Event
     * @typedef {import('micromark-util-types').Code} Code
     * @typedef {import('micromark-util-types').Point} Point
     */

    /** @type {Construct} */
    const attention = {
      name: 'attention',
      tokenize: tokenizeAttention,
      resolveAll: resolveAllAttention
    };
    /**
     * Take all events and resolve attention to emphasis or strong.
     *
     * @type {Resolver}
     */

    function resolveAllAttention(events, context) {
      let index = -1;
      /** @type {number} */

      let open;
      /** @type {Token} */

      let group;
      /** @type {Token} */

      let text;
      /** @type {Token} */

      let openingSequence;
      /** @type {Token} */

      let closingSequence;
      /** @type {number} */

      let use;
      /** @type {Event[]} */

      let nextEvents;
      /** @type {number} */

      let offset; // Walk through all events.
      //
      // Note: performance of this is fine on an mb of normal markdown, but it’s
      // a bottleneck for malicious stuff.

      while (++index < events.length) {
        // Find a token that can close.
        if (
          events[index][0] === 'enter' &&
          events[index][1].type === 'attentionSequence' &&
          events[index][1]._close
        ) {
          open = index; // Now walk back to find an opener.

          while (open--) {
            // Find a token that can open the closer.
            if (
              events[open][0] === 'exit' &&
              events[open][1].type === 'attentionSequence' &&
              events[open][1]._open && // If the markers are the same:
              context.sliceSerialize(events[open][1]).charCodeAt(0) ===
                context.sliceSerialize(events[index][1]).charCodeAt(0)
            ) {
              // If the opening can close or the closing can open,
              // and the close size *is not* a multiple of three,
              // but the sum of the opening and closing size *is* multiple of three,
              // then don’t match.
              if (
                (events[open][1]._close || events[index][1]._open) &&
                (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
                !(
                  (events[open][1].end.offset -
                    events[open][1].start.offset +
                    events[index][1].end.offset -
                    events[index][1].start.offset) %
                  3
                )
              ) {
                continue
              } // Number of markers to use from the sequence.

              use =
                events[open][1].end.offset - events[open][1].start.offset > 1 &&
                events[index][1].end.offset - events[index][1].start.offset > 1
                  ? 2
                  : 1;
              const start = Object.assign({}, events[open][1].end);
              const end = Object.assign({}, events[index][1].start);
              movePoint(start, -use);
              movePoint(end, use);
              openingSequence = {
                type: use > 1 ? 'strongSequence' : 'emphasisSequence',
                start,
                end: Object.assign({}, events[open][1].end)
              };
              closingSequence = {
                type: use > 1 ? 'strongSequence' : 'emphasisSequence',
                start: Object.assign({}, events[index][1].start),
                end
              };
              text = {
                type: use > 1 ? 'strongText' : 'emphasisText',
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index][1].start)
              };
              group = {
                type: use > 1 ? 'strong' : 'emphasis',
                start: Object.assign({}, openingSequence.start),
                end: Object.assign({}, closingSequence.end)
              };
              events[open][1].end = Object.assign({}, openingSequence.start);
              events[index][1].start = Object.assign({}, closingSequence.end);
              nextEvents = []; // If there are more markers in the opening, add them before.

              if (events[open][1].end.offset - events[open][1].start.offset) {
                nextEvents = push(nextEvents, [
                  ['enter', events[open][1], context],
                  ['exit', events[open][1], context]
                ]);
              } // Opening.

              nextEvents = push(nextEvents, [
                ['enter', group, context],
                ['enter', openingSequence, context],
                ['exit', openingSequence, context],
                ['enter', text, context]
              ]); // Between.

              nextEvents = push(
                nextEvents,
                resolveAll(
                  context.parser.constructs.insideSpan.null,
                  events.slice(open + 1, index),
                  context
                )
              ); // Closing.

              nextEvents = push(nextEvents, [
                ['exit', text, context],
                ['enter', closingSequence, context],
                ['exit', closingSequence, context],
                ['exit', group, context]
              ]); // If there are more markers in the closing, add them after.

              if (events[index][1].end.offset - events[index][1].start.offset) {
                offset = 2;
                nextEvents = push(nextEvents, [
                  ['enter', events[index][1], context],
                  ['exit', events[index][1], context]
                ]);
              } else {
                offset = 0;
              }

              splice(events, open - 1, index - open + 3, nextEvents);
              index = open + nextEvents.length - offset - 2;
              break
            }
          }
        }
      } // Remove remaining sequences.

      index = -1;

      while (++index < events.length) {
        if (events[index][1].type === 'attentionSequence') {
          events[index][1].type = 'data';
        }
      }

      return events
    }
    /** @type {Tokenizer} */

    function tokenizeAttention(effects, ok) {
      const attentionMarkers = this.parser.constructs.attentionMarkers.null;
      const previous = this.previous;
      const before = classifyCharacter(previous);
      /** @type {NonNullable<Code>} */

      let marker;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('attentionSequence');
        marker = code;
        return sequence(code)
      }
      /** @type {State} */

      function sequence(code) {
        if (code === marker) {
          effects.consume(code);
          return sequence
        }

        const token = effects.exit('attentionSequence');
        const after = classifyCharacter(code);
        const open =
          !after || (after === 2 && before) || attentionMarkers.includes(code);
        const close =
          !before || (before === 2 && after) || attentionMarkers.includes(previous);
        token._open = Boolean(marker === 42 ? open : open && (before || !close));
        token._close = Boolean(marker === 42 ? close : close && (after || !open));
        return ok(code)
      }
    }
    /**
     * Move a point a bit.
     *
     * Note: `move` only works inside lines! It’s not possible to move past other
     * chunks (replacement characters, tabs, or line endings).
     *
     * @param {Point} point
     * @param {number} offset
     * @returns {void}
     */

    function movePoint(point, offset) {
      point.column += offset;
      point.offset += offset;
      point._bufferIndex += offset;
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const autolink = {
      name: 'autolink',
      tokenize: tokenizeAutolink
    };
    /** @type {Tokenizer} */

    function tokenizeAutolink(effects, ok, nok) {
      let size = 1;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('autolink');
        effects.enter('autolinkMarker');
        effects.consume(code);
        effects.exit('autolinkMarker');
        effects.enter('autolinkProtocol');
        return open
      }
      /** @type {State} */

      function open(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          return schemeOrEmailAtext
        }

        return asciiAtext(code) ? emailAtext(code) : nok(code)
      }
      /** @type {State} */

      function schemeOrEmailAtext(code) {
        return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)
          ? schemeInsideOrEmailAtext(code)
          : emailAtext(code)
      }
      /** @type {State} */

      function schemeInsideOrEmailAtext(code) {
        if (code === 58) {
          effects.consume(code);
          return urlInside
        }

        if (
          (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) &&
          size++ < 32
        ) {
          effects.consume(code);
          return schemeInsideOrEmailAtext
        }

        return emailAtext(code)
      }
      /** @type {State} */

      function urlInside(code) {
        if (code === 62) {
          effects.exit('autolinkProtocol');
          return end(code)
        }

        if (code === null || code === 32 || code === 60 || asciiControl(code)) {
          return nok(code)
        }

        effects.consume(code);
        return urlInside
      }
      /** @type {State} */

      function emailAtext(code) {
        if (code === 64) {
          effects.consume(code);
          size = 0;
          return emailAtSignOrDot
        }

        if (asciiAtext(code)) {
          effects.consume(code);
          return emailAtext
        }

        return nok(code)
      }
      /** @type {State} */

      function emailAtSignOrDot(code) {
        return asciiAlphanumeric(code) ? emailLabel(code) : nok(code)
      }
      /** @type {State} */

      function emailLabel(code) {
        if (code === 46) {
          effects.consume(code);
          size = 0;
          return emailAtSignOrDot
        }

        if (code === 62) {
          // Exit, then change the type.
          effects.exit('autolinkProtocol').type = 'autolinkEmail';
          return end(code)
        }

        return emailValue(code)
      }
      /** @type {State} */

      function emailValue(code) {
        if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
          effects.consume(code);
          return code === 45 ? emailValue : emailLabel
        }

        return nok(code)
      }
      /** @type {State} */

      function end(code) {
        effects.enter('autolinkMarker');
        effects.consume(code);
        effects.exit('autolinkMarker');
        effects.exit('autolink');
        return ok
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const blankLine = {
      tokenize: tokenizeBlankLine,
      partial: true
    };
    /** @type {Tokenizer} */

    function tokenizeBlankLine(effects, ok, nok) {
      return factorySpace(effects, afterWhitespace, 'linePrefix')
      /** @type {State} */

      function afterWhitespace(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Exiter} Exiter
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const blockQuote = {
      name: 'blockQuote',
      tokenize: tokenizeBlockQuoteStart,
      continuation: {
        tokenize: tokenizeBlockQuoteContinuation
      },
      exit
    };
    /** @type {Tokenizer} */

    function tokenizeBlockQuoteStart(effects, ok, nok) {
      const self = this;
      return start
      /** @type {State} */

      function start(code) {
        if (code === 62) {
          const state = self.containerState;

          if (!state.open) {
            effects.enter('blockQuote', {
              _container: true
            });
            state.open = true;
          }

          effects.enter('blockQuotePrefix');
          effects.enter('blockQuoteMarker');
          effects.consume(code);
          effects.exit('blockQuoteMarker');
          return after
        }

        return nok(code)
      }
      /** @type {State} */

      function after(code) {
        if (markdownSpace(code)) {
          effects.enter('blockQuotePrefixWhitespace');
          effects.consume(code);
          effects.exit('blockQuotePrefixWhitespace');
          effects.exit('blockQuotePrefix');
          return ok
        }

        effects.exit('blockQuotePrefix');
        return ok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeBlockQuoteContinuation(effects, ok, nok) {
      return factorySpace(
        effects,
        effects.attempt(blockQuote, ok, nok),
        'linePrefix',
        this.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4
      )
    }
    /** @type {Exiter} */

    function exit(effects) {
      effects.exit('blockQuote');
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const characterEscape = {
      name: 'characterEscape',
      tokenize: tokenizeCharacterEscape
    };
    /** @type {Tokenizer} */

    function tokenizeCharacterEscape(effects, ok, nok) {
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('characterEscape');
        effects.enter('escapeMarker');
        effects.consume(code);
        effects.exit('escapeMarker');
        return open
      }
      /** @type {State} */

      function open(code) {
        if (asciiPunctuation(code)) {
          effects.enter('characterEscapeValue');
          effects.consume(code);
          effects.exit('characterEscapeValue');
          effects.exit('characterEscape');
          return ok
        }

        return nok(code)
      }
    }

    /**
     * Map of named character references.
     *
     * @type {Record<string, string>}
     */
    const characterEntities = {
      AElig: 'Æ',
      AMP: '&',
      Aacute: 'Á',
      Abreve: 'Ă',
      Acirc: 'Â',
      Acy: 'А',
      Afr: '𝔄',
      Agrave: 'À',
      Alpha: 'Α',
      Amacr: 'Ā',
      And: '⩓',
      Aogon: 'Ą',
      Aopf: '𝔸',
      ApplyFunction: '⁡',
      Aring: 'Å',
      Ascr: '𝒜',
      Assign: '≔',
      Atilde: 'Ã',
      Auml: 'Ä',
      Backslash: '∖',
      Barv: '⫧',
      Barwed: '⌆',
      Bcy: 'Б',
      Because: '∵',
      Bernoullis: 'ℬ',
      Beta: 'Β',
      Bfr: '𝔅',
      Bopf: '𝔹',
      Breve: '˘',
      Bscr: 'ℬ',
      Bumpeq: '≎',
      CHcy: 'Ч',
      COPY: '©',
      Cacute: 'Ć',
      Cap: '⋒',
      CapitalDifferentialD: 'ⅅ',
      Cayleys: 'ℭ',
      Ccaron: 'Č',
      Ccedil: 'Ç',
      Ccirc: 'Ĉ',
      Cconint: '∰',
      Cdot: 'Ċ',
      Cedilla: '¸',
      CenterDot: '·',
      Cfr: 'ℭ',
      Chi: 'Χ',
      CircleDot: '⊙',
      CircleMinus: '⊖',
      CirclePlus: '⊕',
      CircleTimes: '⊗',
      ClockwiseContourIntegral: '∲',
      CloseCurlyDoubleQuote: '”',
      CloseCurlyQuote: '’',
      Colon: '∷',
      Colone: '⩴',
      Congruent: '≡',
      Conint: '∯',
      ContourIntegral: '∮',
      Copf: 'ℂ',
      Coproduct: '∐',
      CounterClockwiseContourIntegral: '∳',
      Cross: '⨯',
      Cscr: '𝒞',
      Cup: '⋓',
      CupCap: '≍',
      DD: 'ⅅ',
      DDotrahd: '⤑',
      DJcy: 'Ђ',
      DScy: 'Ѕ',
      DZcy: 'Џ',
      Dagger: '‡',
      Darr: '↡',
      Dashv: '⫤',
      Dcaron: 'Ď',
      Dcy: 'Д',
      Del: '∇',
      Delta: 'Δ',
      Dfr: '𝔇',
      DiacriticalAcute: '´',
      DiacriticalDot: '˙',
      DiacriticalDoubleAcute: '˝',
      DiacriticalGrave: '`',
      DiacriticalTilde: '˜',
      Diamond: '⋄',
      DifferentialD: 'ⅆ',
      Dopf: '𝔻',
      Dot: '¨',
      DotDot: '⃜',
      DotEqual: '≐',
      DoubleContourIntegral: '∯',
      DoubleDot: '¨',
      DoubleDownArrow: '⇓',
      DoubleLeftArrow: '⇐',
      DoubleLeftRightArrow: '⇔',
      DoubleLeftTee: '⫤',
      DoubleLongLeftArrow: '⟸',
      DoubleLongLeftRightArrow: '⟺',
      DoubleLongRightArrow: '⟹',
      DoubleRightArrow: '⇒',
      DoubleRightTee: '⊨',
      DoubleUpArrow: '⇑',
      DoubleUpDownArrow: '⇕',
      DoubleVerticalBar: '∥',
      DownArrow: '↓',
      DownArrowBar: '⤓',
      DownArrowUpArrow: '⇵',
      DownBreve: '̑',
      DownLeftRightVector: '⥐',
      DownLeftTeeVector: '⥞',
      DownLeftVector: '↽',
      DownLeftVectorBar: '⥖',
      DownRightTeeVector: '⥟',
      DownRightVector: '⇁',
      DownRightVectorBar: '⥗',
      DownTee: '⊤',
      DownTeeArrow: '↧',
      Downarrow: '⇓',
      Dscr: '𝒟',
      Dstrok: 'Đ',
      ENG: 'Ŋ',
      ETH: 'Ð',
      Eacute: 'É',
      Ecaron: 'Ě',
      Ecirc: 'Ê',
      Ecy: 'Э',
      Edot: 'Ė',
      Efr: '𝔈',
      Egrave: 'È',
      Element: '∈',
      Emacr: 'Ē',
      EmptySmallSquare: '◻',
      EmptyVerySmallSquare: '▫',
      Eogon: 'Ę',
      Eopf: '𝔼',
      Epsilon: 'Ε',
      Equal: '⩵',
      EqualTilde: '≂',
      Equilibrium: '⇌',
      Escr: 'ℰ',
      Esim: '⩳',
      Eta: 'Η',
      Euml: 'Ë',
      Exists: '∃',
      ExponentialE: 'ⅇ',
      Fcy: 'Ф',
      Ffr: '𝔉',
      FilledSmallSquare: '◼',
      FilledVerySmallSquare: '▪',
      Fopf: '𝔽',
      ForAll: '∀',
      Fouriertrf: 'ℱ',
      Fscr: 'ℱ',
      GJcy: 'Ѓ',
      GT: '>',
      Gamma: 'Γ',
      Gammad: 'Ϝ',
      Gbreve: 'Ğ',
      Gcedil: 'Ģ',
      Gcirc: 'Ĝ',
      Gcy: 'Г',
      Gdot: 'Ġ',
      Gfr: '𝔊',
      Gg: '⋙',
      Gopf: '𝔾',
      GreaterEqual: '≥',
      GreaterEqualLess: '⋛',
      GreaterFullEqual: '≧',
      GreaterGreater: '⪢',
      GreaterLess: '≷',
      GreaterSlantEqual: '⩾',
      GreaterTilde: '≳',
      Gscr: '𝒢',
      Gt: '≫',
      HARDcy: 'Ъ',
      Hacek: 'ˇ',
      Hat: '^',
      Hcirc: 'Ĥ',
      Hfr: 'ℌ',
      HilbertSpace: 'ℋ',
      Hopf: 'ℍ',
      HorizontalLine: '─',
      Hscr: 'ℋ',
      Hstrok: 'Ħ',
      HumpDownHump: '≎',
      HumpEqual: '≏',
      IEcy: 'Е',
      IJlig: 'Ĳ',
      IOcy: 'Ё',
      Iacute: 'Í',
      Icirc: 'Î',
      Icy: 'И',
      Idot: 'İ',
      Ifr: 'ℑ',
      Igrave: 'Ì',
      Im: 'ℑ',
      Imacr: 'Ī',
      ImaginaryI: 'ⅈ',
      Implies: '⇒',
      Int: '∬',
      Integral: '∫',
      Intersection: '⋂',
      InvisibleComma: '⁣',
      InvisibleTimes: '⁢',
      Iogon: 'Į',
      Iopf: '𝕀',
      Iota: 'Ι',
      Iscr: 'ℐ',
      Itilde: 'Ĩ',
      Iukcy: 'І',
      Iuml: 'Ï',
      Jcirc: 'Ĵ',
      Jcy: 'Й',
      Jfr: '𝔍',
      Jopf: '𝕁',
      Jscr: '𝒥',
      Jsercy: 'Ј',
      Jukcy: 'Є',
      KHcy: 'Х',
      KJcy: 'Ќ',
      Kappa: 'Κ',
      Kcedil: 'Ķ',
      Kcy: 'К',
      Kfr: '𝔎',
      Kopf: '𝕂',
      Kscr: '𝒦',
      LJcy: 'Љ',
      LT: '<',
      Lacute: 'Ĺ',
      Lambda: 'Λ',
      Lang: '⟪',
      Laplacetrf: 'ℒ',
      Larr: '↞',
      Lcaron: 'Ľ',
      Lcedil: 'Ļ',
      Lcy: 'Л',
      LeftAngleBracket: '⟨',
      LeftArrow: '←',
      LeftArrowBar: '⇤',
      LeftArrowRightArrow: '⇆',
      LeftCeiling: '⌈',
      LeftDoubleBracket: '⟦',
      LeftDownTeeVector: '⥡',
      LeftDownVector: '⇃',
      LeftDownVectorBar: '⥙',
      LeftFloor: '⌊',
      LeftRightArrow: '↔',
      LeftRightVector: '⥎',
      LeftTee: '⊣',
      LeftTeeArrow: '↤',
      LeftTeeVector: '⥚',
      LeftTriangle: '⊲',
      LeftTriangleBar: '⧏',
      LeftTriangleEqual: '⊴',
      LeftUpDownVector: '⥑',
      LeftUpTeeVector: '⥠',
      LeftUpVector: '↿',
      LeftUpVectorBar: '⥘',
      LeftVector: '↼',
      LeftVectorBar: '⥒',
      Leftarrow: '⇐',
      Leftrightarrow: '⇔',
      LessEqualGreater: '⋚',
      LessFullEqual: '≦',
      LessGreater: '≶',
      LessLess: '⪡',
      LessSlantEqual: '⩽',
      LessTilde: '≲',
      Lfr: '𝔏',
      Ll: '⋘',
      Lleftarrow: '⇚',
      Lmidot: 'Ŀ',
      LongLeftArrow: '⟵',
      LongLeftRightArrow: '⟷',
      LongRightArrow: '⟶',
      Longleftarrow: '⟸',
      Longleftrightarrow: '⟺',
      Longrightarrow: '⟹',
      Lopf: '𝕃',
      LowerLeftArrow: '↙',
      LowerRightArrow: '↘',
      Lscr: 'ℒ',
      Lsh: '↰',
      Lstrok: 'Ł',
      Lt: '≪',
      Map: '⤅',
      Mcy: 'М',
      MediumSpace: ' ',
      Mellintrf: 'ℳ',
      Mfr: '𝔐',
      MinusPlus: '∓',
      Mopf: '𝕄',
      Mscr: 'ℳ',
      Mu: 'Μ',
      NJcy: 'Њ',
      Nacute: 'Ń',
      Ncaron: 'Ň',
      Ncedil: 'Ņ',
      Ncy: 'Н',
      NegativeMediumSpace: '​',
      NegativeThickSpace: '​',
      NegativeThinSpace: '​',
      NegativeVeryThinSpace: '​',
      NestedGreaterGreater: '≫',
      NestedLessLess: '≪',
      NewLine: '\n',
      Nfr: '𝔑',
      NoBreak: '⁠',
      NonBreakingSpace: ' ',
      Nopf: 'ℕ',
      Not: '⫬',
      NotCongruent: '≢',
      NotCupCap: '≭',
      NotDoubleVerticalBar: '∦',
      NotElement: '∉',
      NotEqual: '≠',
      NotEqualTilde: '≂̸',
      NotExists: '∄',
      NotGreater: '≯',
      NotGreaterEqual: '≱',
      NotGreaterFullEqual: '≧̸',
      NotGreaterGreater: '≫̸',
      NotGreaterLess: '≹',
      NotGreaterSlantEqual: '⩾̸',
      NotGreaterTilde: '≵',
      NotHumpDownHump: '≎̸',
      NotHumpEqual: '≏̸',
      NotLeftTriangle: '⋪',
      NotLeftTriangleBar: '⧏̸',
      NotLeftTriangleEqual: '⋬',
      NotLess: '≮',
      NotLessEqual: '≰',
      NotLessGreater: '≸',
      NotLessLess: '≪̸',
      NotLessSlantEqual: '⩽̸',
      NotLessTilde: '≴',
      NotNestedGreaterGreater: '⪢̸',
      NotNestedLessLess: '⪡̸',
      NotPrecedes: '⊀',
      NotPrecedesEqual: '⪯̸',
      NotPrecedesSlantEqual: '⋠',
      NotReverseElement: '∌',
      NotRightTriangle: '⋫',
      NotRightTriangleBar: '⧐̸',
      NotRightTriangleEqual: '⋭',
      NotSquareSubset: '⊏̸',
      NotSquareSubsetEqual: '⋢',
      NotSquareSuperset: '⊐̸',
      NotSquareSupersetEqual: '⋣',
      NotSubset: '⊂⃒',
      NotSubsetEqual: '⊈',
      NotSucceeds: '⊁',
      NotSucceedsEqual: '⪰̸',
      NotSucceedsSlantEqual: '⋡',
      NotSucceedsTilde: '≿̸',
      NotSuperset: '⊃⃒',
      NotSupersetEqual: '⊉',
      NotTilde: '≁',
      NotTildeEqual: '≄',
      NotTildeFullEqual: '≇',
      NotTildeTilde: '≉',
      NotVerticalBar: '∤',
      Nscr: '𝒩',
      Ntilde: 'Ñ',
      Nu: 'Ν',
      OElig: 'Œ',
      Oacute: 'Ó',
      Ocirc: 'Ô',
      Ocy: 'О',
      Odblac: 'Ő',
      Ofr: '𝔒',
      Ograve: 'Ò',
      Omacr: 'Ō',
      Omega: 'Ω',
      Omicron: 'Ο',
      Oopf: '𝕆',
      OpenCurlyDoubleQuote: '“',
      OpenCurlyQuote: '‘',
      Or: '⩔',
      Oscr: '𝒪',
      Oslash: 'Ø',
      Otilde: 'Õ',
      Otimes: '⨷',
      Ouml: 'Ö',
      OverBar: '‾',
      OverBrace: '⏞',
      OverBracket: '⎴',
      OverParenthesis: '⏜',
      PartialD: '∂',
      Pcy: 'П',
      Pfr: '𝔓',
      Phi: 'Φ',
      Pi: 'Π',
      PlusMinus: '±',
      Poincareplane: 'ℌ',
      Popf: 'ℙ',
      Pr: '⪻',
      Precedes: '≺',
      PrecedesEqual: '⪯',
      PrecedesSlantEqual: '≼',
      PrecedesTilde: '≾',
      Prime: '″',
      Product: '∏',
      Proportion: '∷',
      Proportional: '∝',
      Pscr: '𝒫',
      Psi: 'Ψ',
      QUOT: '"',
      Qfr: '𝔔',
      Qopf: 'ℚ',
      Qscr: '𝒬',
      RBarr: '⤐',
      REG: '®',
      Racute: 'Ŕ',
      Rang: '⟫',
      Rarr: '↠',
      Rarrtl: '⤖',
      Rcaron: 'Ř',
      Rcedil: 'Ŗ',
      Rcy: 'Р',
      Re: 'ℜ',
      ReverseElement: '∋',
      ReverseEquilibrium: '⇋',
      ReverseUpEquilibrium: '⥯',
      Rfr: 'ℜ',
      Rho: 'Ρ',
      RightAngleBracket: '⟩',
      RightArrow: '→',
      RightArrowBar: '⇥',
      RightArrowLeftArrow: '⇄',
      RightCeiling: '⌉',
      RightDoubleBracket: '⟧',
      RightDownTeeVector: '⥝',
      RightDownVector: '⇂',
      RightDownVectorBar: '⥕',
      RightFloor: '⌋',
      RightTee: '⊢',
      RightTeeArrow: '↦',
      RightTeeVector: '⥛',
      RightTriangle: '⊳',
      RightTriangleBar: '⧐',
      RightTriangleEqual: '⊵',
      RightUpDownVector: '⥏',
      RightUpTeeVector: '⥜',
      RightUpVector: '↾',
      RightUpVectorBar: '⥔',
      RightVector: '⇀',
      RightVectorBar: '⥓',
      Rightarrow: '⇒',
      Ropf: 'ℝ',
      RoundImplies: '⥰',
      Rrightarrow: '⇛',
      Rscr: 'ℛ',
      Rsh: '↱',
      RuleDelayed: '⧴',
      SHCHcy: 'Щ',
      SHcy: 'Ш',
      SOFTcy: 'Ь',
      Sacute: 'Ś',
      Sc: '⪼',
      Scaron: 'Š',
      Scedil: 'Ş',
      Scirc: 'Ŝ',
      Scy: 'С',
      Sfr: '𝔖',
      ShortDownArrow: '↓',
      ShortLeftArrow: '←',
      ShortRightArrow: '→',
      ShortUpArrow: '↑',
      Sigma: 'Σ',
      SmallCircle: '∘',
      Sopf: '𝕊',
      Sqrt: '√',
      Square: '□',
      SquareIntersection: '⊓',
      SquareSubset: '⊏',
      SquareSubsetEqual: '⊑',
      SquareSuperset: '⊐',
      SquareSupersetEqual: '⊒',
      SquareUnion: '⊔',
      Sscr: '𝒮',
      Star: '⋆',
      Sub: '⋐',
      Subset: '⋐',
      SubsetEqual: '⊆',
      Succeeds: '≻',
      SucceedsEqual: '⪰',
      SucceedsSlantEqual: '≽',
      SucceedsTilde: '≿',
      SuchThat: '∋',
      Sum: '∑',
      Sup: '⋑',
      Superset: '⊃',
      SupersetEqual: '⊇',
      Supset: '⋑',
      THORN: 'Þ',
      TRADE: '™',
      TSHcy: 'Ћ',
      TScy: 'Ц',
      Tab: '\t',
      Tau: 'Τ',
      Tcaron: 'Ť',
      Tcedil: 'Ţ',
      Tcy: 'Т',
      Tfr: '𝔗',
      Therefore: '∴',
      Theta: 'Θ',
      ThickSpace: '  ',
      ThinSpace: ' ',
      Tilde: '∼',
      TildeEqual: '≃',
      TildeFullEqual: '≅',
      TildeTilde: '≈',
      Topf: '𝕋',
      TripleDot: '⃛',
      Tscr: '𝒯',
      Tstrok: 'Ŧ',
      Uacute: 'Ú',
      Uarr: '↟',
      Uarrocir: '⥉',
      Ubrcy: 'Ў',
      Ubreve: 'Ŭ',
      Ucirc: 'Û',
      Ucy: 'У',
      Udblac: 'Ű',
      Ufr: '𝔘',
      Ugrave: 'Ù',
      Umacr: 'Ū',
      UnderBar: '_',
      UnderBrace: '⏟',
      UnderBracket: '⎵',
      UnderParenthesis: '⏝',
      Union: '⋃',
      UnionPlus: '⊎',
      Uogon: 'Ų',
      Uopf: '𝕌',
      UpArrow: '↑',
      UpArrowBar: '⤒',
      UpArrowDownArrow: '⇅',
      UpDownArrow: '↕',
      UpEquilibrium: '⥮',
      UpTee: '⊥',
      UpTeeArrow: '↥',
      Uparrow: '⇑',
      Updownarrow: '⇕',
      UpperLeftArrow: '↖',
      UpperRightArrow: '↗',
      Upsi: 'ϒ',
      Upsilon: 'Υ',
      Uring: 'Ů',
      Uscr: '𝒰',
      Utilde: 'Ũ',
      Uuml: 'Ü',
      VDash: '⊫',
      Vbar: '⫫',
      Vcy: 'В',
      Vdash: '⊩',
      Vdashl: '⫦',
      Vee: '⋁',
      Verbar: '‖',
      Vert: '‖',
      VerticalBar: '∣',
      VerticalLine: '|',
      VerticalSeparator: '❘',
      VerticalTilde: '≀',
      VeryThinSpace: ' ',
      Vfr: '𝔙',
      Vopf: '𝕍',
      Vscr: '𝒱',
      Vvdash: '⊪',
      Wcirc: 'Ŵ',
      Wedge: '⋀',
      Wfr: '𝔚',
      Wopf: '𝕎',
      Wscr: '𝒲',
      Xfr: '𝔛',
      Xi: 'Ξ',
      Xopf: '𝕏',
      Xscr: '𝒳',
      YAcy: 'Я',
      YIcy: 'Ї',
      YUcy: 'Ю',
      Yacute: 'Ý',
      Ycirc: 'Ŷ',
      Ycy: 'Ы',
      Yfr: '𝔜',
      Yopf: '𝕐',
      Yscr: '𝒴',
      Yuml: 'Ÿ',
      ZHcy: 'Ж',
      Zacute: 'Ź',
      Zcaron: 'Ž',
      Zcy: 'З',
      Zdot: 'Ż',
      ZeroWidthSpace: '​',
      Zeta: 'Ζ',
      Zfr: 'ℨ',
      Zopf: 'ℤ',
      Zscr: '𝒵',
      aacute: 'á',
      abreve: 'ă',
      ac: '∾',
      acE: '∾̳',
      acd: '∿',
      acirc: 'â',
      acute: '´',
      acy: 'а',
      aelig: 'æ',
      af: '⁡',
      afr: '𝔞',
      agrave: 'à',
      alefsym: 'ℵ',
      aleph: 'ℵ',
      alpha: 'α',
      amacr: 'ā',
      amalg: '⨿',
      amp: '&',
      and: '∧',
      andand: '⩕',
      andd: '⩜',
      andslope: '⩘',
      andv: '⩚',
      ang: '∠',
      ange: '⦤',
      angle: '∠',
      angmsd: '∡',
      angmsdaa: '⦨',
      angmsdab: '⦩',
      angmsdac: '⦪',
      angmsdad: '⦫',
      angmsdae: '⦬',
      angmsdaf: '⦭',
      angmsdag: '⦮',
      angmsdah: '⦯',
      angrt: '∟',
      angrtvb: '⊾',
      angrtvbd: '⦝',
      angsph: '∢',
      angst: 'Å',
      angzarr: '⍼',
      aogon: 'ą',
      aopf: '𝕒',
      ap: '≈',
      apE: '⩰',
      apacir: '⩯',
      ape: '≊',
      apid: '≋',
      apos: "'",
      approx: '≈',
      approxeq: '≊',
      aring: 'å',
      ascr: '𝒶',
      ast: '*',
      asymp: '≈',
      asympeq: '≍',
      atilde: 'ã',
      auml: 'ä',
      awconint: '∳',
      awint: '⨑',
      bNot: '⫭',
      backcong: '≌',
      backepsilon: '϶',
      backprime: '‵',
      backsim: '∽',
      backsimeq: '⋍',
      barvee: '⊽',
      barwed: '⌅',
      barwedge: '⌅',
      bbrk: '⎵',
      bbrktbrk: '⎶',
      bcong: '≌',
      bcy: 'б',
      bdquo: '„',
      becaus: '∵',
      because: '∵',
      bemptyv: '⦰',
      bepsi: '϶',
      bernou: 'ℬ',
      beta: 'β',
      beth: 'ℶ',
      between: '≬',
      bfr: '𝔟',
      bigcap: '⋂',
      bigcirc: '◯',
      bigcup: '⋃',
      bigodot: '⨀',
      bigoplus: '⨁',
      bigotimes: '⨂',
      bigsqcup: '⨆',
      bigstar: '★',
      bigtriangledown: '▽',
      bigtriangleup: '△',
      biguplus: '⨄',
      bigvee: '⋁',
      bigwedge: '⋀',
      bkarow: '⤍',
      blacklozenge: '⧫',
      blacksquare: '▪',
      blacktriangle: '▴',
      blacktriangledown: '▾',
      blacktriangleleft: '◂',
      blacktriangleright: '▸',
      blank: '␣',
      blk12: '▒',
      blk14: '░',
      blk34: '▓',
      block: '█',
      bne: '=⃥',
      bnequiv: '≡⃥',
      bnot: '⌐',
      bopf: '𝕓',
      bot: '⊥',
      bottom: '⊥',
      bowtie: '⋈',
      boxDL: '╗',
      boxDR: '╔',
      boxDl: '╖',
      boxDr: '╓',
      boxH: '═',
      boxHD: '╦',
      boxHU: '╩',
      boxHd: '╤',
      boxHu: '╧',
      boxUL: '╝',
      boxUR: '╚',
      boxUl: '╜',
      boxUr: '╙',
      boxV: '║',
      boxVH: '╬',
      boxVL: '╣',
      boxVR: '╠',
      boxVh: '╫',
      boxVl: '╢',
      boxVr: '╟',
      boxbox: '⧉',
      boxdL: '╕',
      boxdR: '╒',
      boxdl: '┐',
      boxdr: '┌',
      boxh: '─',
      boxhD: '╥',
      boxhU: '╨',
      boxhd: '┬',
      boxhu: '┴',
      boxminus: '⊟',
      boxplus: '⊞',
      boxtimes: '⊠',
      boxuL: '╛',
      boxuR: '╘',
      boxul: '┘',
      boxur: '└',
      boxv: '│',
      boxvH: '╪',
      boxvL: '╡',
      boxvR: '╞',
      boxvh: '┼',
      boxvl: '┤',
      boxvr: '├',
      bprime: '‵',
      breve: '˘',
      brvbar: '¦',
      bscr: '𝒷',
      bsemi: '⁏',
      bsim: '∽',
      bsime: '⋍',
      bsol: '\\',
      bsolb: '⧅',
      bsolhsub: '⟈',
      bull: '•',
      bullet: '•',
      bump: '≎',
      bumpE: '⪮',
      bumpe: '≏',
      bumpeq: '≏',
      cacute: 'ć',
      cap: '∩',
      capand: '⩄',
      capbrcup: '⩉',
      capcap: '⩋',
      capcup: '⩇',
      capdot: '⩀',
      caps: '∩︀',
      caret: '⁁',
      caron: 'ˇ',
      ccaps: '⩍',
      ccaron: 'č',
      ccedil: 'ç',
      ccirc: 'ĉ',
      ccups: '⩌',
      ccupssm: '⩐',
      cdot: 'ċ',
      cedil: '¸',
      cemptyv: '⦲',
      cent: '¢',
      centerdot: '·',
      cfr: '𝔠',
      chcy: 'ч',
      check: '✓',
      checkmark: '✓',
      chi: 'χ',
      cir: '○',
      cirE: '⧃',
      circ: 'ˆ',
      circeq: '≗',
      circlearrowleft: '↺',
      circlearrowright: '↻',
      circledR: '®',
      circledS: 'Ⓢ',
      circledast: '⊛',
      circledcirc: '⊚',
      circleddash: '⊝',
      cire: '≗',
      cirfnint: '⨐',
      cirmid: '⫯',
      cirscir: '⧂',
      clubs: '♣',
      clubsuit: '♣',
      colon: ':',
      colone: '≔',
      coloneq: '≔',
      comma: ',',
      commat: '@',
      comp: '∁',
      compfn: '∘',
      complement: '∁',
      complexes: 'ℂ',
      cong: '≅',
      congdot: '⩭',
      conint: '∮',
      copf: '𝕔',
      coprod: '∐',
      copy: '©',
      copysr: '℗',
      crarr: '↵',
      cross: '✗',
      cscr: '𝒸',
      csub: '⫏',
      csube: '⫑',
      csup: '⫐',
      csupe: '⫒',
      ctdot: '⋯',
      cudarrl: '⤸',
      cudarrr: '⤵',
      cuepr: '⋞',
      cuesc: '⋟',
      cularr: '↶',
      cularrp: '⤽',
      cup: '∪',
      cupbrcap: '⩈',
      cupcap: '⩆',
      cupcup: '⩊',
      cupdot: '⊍',
      cupor: '⩅',
      cups: '∪︀',
      curarr: '↷',
      curarrm: '⤼',
      curlyeqprec: '⋞',
      curlyeqsucc: '⋟',
      curlyvee: '⋎',
      curlywedge: '⋏',
      curren: '¤',
      curvearrowleft: '↶',
      curvearrowright: '↷',
      cuvee: '⋎',
      cuwed: '⋏',
      cwconint: '∲',
      cwint: '∱',
      cylcty: '⌭',
      dArr: '⇓',
      dHar: '⥥',
      dagger: '†',
      daleth: 'ℸ',
      darr: '↓',
      dash: '‐',
      dashv: '⊣',
      dbkarow: '⤏',
      dblac: '˝',
      dcaron: 'ď',
      dcy: 'д',
      dd: 'ⅆ',
      ddagger: '‡',
      ddarr: '⇊',
      ddotseq: '⩷',
      deg: '°',
      delta: 'δ',
      demptyv: '⦱',
      dfisht: '⥿',
      dfr: '𝔡',
      dharl: '⇃',
      dharr: '⇂',
      diam: '⋄',
      diamond: '⋄',
      diamondsuit: '♦',
      diams: '♦',
      die: '¨',
      digamma: 'ϝ',
      disin: '⋲',
      div: '÷',
      divide: '÷',
      divideontimes: '⋇',
      divonx: '⋇',
      djcy: 'ђ',
      dlcorn: '⌞',
      dlcrop: '⌍',
      dollar: '$',
      dopf: '𝕕',
      dot: '˙',
      doteq: '≐',
      doteqdot: '≑',
      dotminus: '∸',
      dotplus: '∔',
      dotsquare: '⊡',
      doublebarwedge: '⌆',
      downarrow: '↓',
      downdownarrows: '⇊',
      downharpoonleft: '⇃',
      downharpoonright: '⇂',
      drbkarow: '⤐',
      drcorn: '⌟',
      drcrop: '⌌',
      dscr: '𝒹',
      dscy: 'ѕ',
      dsol: '⧶',
      dstrok: 'đ',
      dtdot: '⋱',
      dtri: '▿',
      dtrif: '▾',
      duarr: '⇵',
      duhar: '⥯',
      dwangle: '⦦',
      dzcy: 'џ',
      dzigrarr: '⟿',
      eDDot: '⩷',
      eDot: '≑',
      eacute: 'é',
      easter: '⩮',
      ecaron: 'ě',
      ecir: '≖',
      ecirc: 'ê',
      ecolon: '≕',
      ecy: 'э',
      edot: 'ė',
      ee: 'ⅇ',
      efDot: '≒',
      efr: '𝔢',
      eg: '⪚',
      egrave: 'è',
      egs: '⪖',
      egsdot: '⪘',
      el: '⪙',
      elinters: '⏧',
      ell: 'ℓ',
      els: '⪕',
      elsdot: '⪗',
      emacr: 'ē',
      empty: '∅',
      emptyset: '∅',
      emptyv: '∅',
      emsp13: ' ',
      emsp14: ' ',
      emsp: ' ',
      eng: 'ŋ',
      ensp: ' ',
      eogon: 'ę',
      eopf: '𝕖',
      epar: '⋕',
      eparsl: '⧣',
      eplus: '⩱',
      epsi: 'ε',
      epsilon: 'ε',
      epsiv: 'ϵ',
      eqcirc: '≖',
      eqcolon: '≕',
      eqsim: '≂',
      eqslantgtr: '⪖',
      eqslantless: '⪕',
      equals: '=',
      equest: '≟',
      equiv: '≡',
      equivDD: '⩸',
      eqvparsl: '⧥',
      erDot: '≓',
      erarr: '⥱',
      escr: 'ℯ',
      esdot: '≐',
      esim: '≂',
      eta: 'η',
      eth: 'ð',
      euml: 'ë',
      euro: '€',
      excl: '!',
      exist: '∃',
      expectation: 'ℰ',
      exponentiale: 'ⅇ',
      fallingdotseq: '≒',
      fcy: 'ф',
      female: '♀',
      ffilig: 'ﬃ',
      fflig: 'ﬀ',
      ffllig: 'ﬄ',
      ffr: '𝔣',
      filig: 'ﬁ',
      fjlig: 'fj',
      flat: '♭',
      fllig: 'ﬂ',
      fltns: '▱',
      fnof: 'ƒ',
      fopf: '𝕗',
      forall: '∀',
      fork: '⋔',
      forkv: '⫙',
      fpartint: '⨍',
      frac12: '½',
      frac13: '⅓',
      frac14: '¼',
      frac15: '⅕',
      frac16: '⅙',
      frac18: '⅛',
      frac23: '⅔',
      frac25: '⅖',
      frac34: '¾',
      frac35: '⅗',
      frac38: '⅜',
      frac45: '⅘',
      frac56: '⅚',
      frac58: '⅝',
      frac78: '⅞',
      frasl: '⁄',
      frown: '⌢',
      fscr: '𝒻',
      gE: '≧',
      gEl: '⪌',
      gacute: 'ǵ',
      gamma: 'γ',
      gammad: 'ϝ',
      gap: '⪆',
      gbreve: 'ğ',
      gcirc: 'ĝ',
      gcy: 'г',
      gdot: 'ġ',
      ge: '≥',
      gel: '⋛',
      geq: '≥',
      geqq: '≧',
      geqslant: '⩾',
      ges: '⩾',
      gescc: '⪩',
      gesdot: '⪀',
      gesdoto: '⪂',
      gesdotol: '⪄',
      gesl: '⋛︀',
      gesles: '⪔',
      gfr: '𝔤',
      gg: '≫',
      ggg: '⋙',
      gimel: 'ℷ',
      gjcy: 'ѓ',
      gl: '≷',
      glE: '⪒',
      gla: '⪥',
      glj: '⪤',
      gnE: '≩',
      gnap: '⪊',
      gnapprox: '⪊',
      gne: '⪈',
      gneq: '⪈',
      gneqq: '≩',
      gnsim: '⋧',
      gopf: '𝕘',
      grave: '`',
      gscr: 'ℊ',
      gsim: '≳',
      gsime: '⪎',
      gsiml: '⪐',
      gt: '>',
      gtcc: '⪧',
      gtcir: '⩺',
      gtdot: '⋗',
      gtlPar: '⦕',
      gtquest: '⩼',
      gtrapprox: '⪆',
      gtrarr: '⥸',
      gtrdot: '⋗',
      gtreqless: '⋛',
      gtreqqless: '⪌',
      gtrless: '≷',
      gtrsim: '≳',
      gvertneqq: '≩︀',
      gvnE: '≩︀',
      hArr: '⇔',
      hairsp: ' ',
      half: '½',
      hamilt: 'ℋ',
      hardcy: 'ъ',
      harr: '↔',
      harrcir: '⥈',
      harrw: '↭',
      hbar: 'ℏ',
      hcirc: 'ĥ',
      hearts: '♥',
      heartsuit: '♥',
      hellip: '…',
      hercon: '⊹',
      hfr: '𝔥',
      hksearow: '⤥',
      hkswarow: '⤦',
      hoarr: '⇿',
      homtht: '∻',
      hookleftarrow: '↩',
      hookrightarrow: '↪',
      hopf: '𝕙',
      horbar: '―',
      hscr: '𝒽',
      hslash: 'ℏ',
      hstrok: 'ħ',
      hybull: '⁃',
      hyphen: '‐',
      iacute: 'í',
      ic: '⁣',
      icirc: 'î',
      icy: 'и',
      iecy: 'е',
      iexcl: '¡',
      iff: '⇔',
      ifr: '𝔦',
      igrave: 'ì',
      ii: 'ⅈ',
      iiiint: '⨌',
      iiint: '∭',
      iinfin: '⧜',
      iiota: '℩',
      ijlig: 'ĳ',
      imacr: 'ī',
      image: 'ℑ',
      imagline: 'ℐ',
      imagpart: 'ℑ',
      imath: 'ı',
      imof: '⊷',
      imped: 'Ƶ',
      in: '∈',
      incare: '℅',
      infin: '∞',
      infintie: '⧝',
      inodot: 'ı',
      int: '∫',
      intcal: '⊺',
      integers: 'ℤ',
      intercal: '⊺',
      intlarhk: '⨗',
      intprod: '⨼',
      iocy: 'ё',
      iogon: 'į',
      iopf: '𝕚',
      iota: 'ι',
      iprod: '⨼',
      iquest: '¿',
      iscr: '𝒾',
      isin: '∈',
      isinE: '⋹',
      isindot: '⋵',
      isins: '⋴',
      isinsv: '⋳',
      isinv: '∈',
      it: '⁢',
      itilde: 'ĩ',
      iukcy: 'і',
      iuml: 'ï',
      jcirc: 'ĵ',
      jcy: 'й',
      jfr: '𝔧',
      jmath: 'ȷ',
      jopf: '𝕛',
      jscr: '𝒿',
      jsercy: 'ј',
      jukcy: 'є',
      kappa: 'κ',
      kappav: 'ϰ',
      kcedil: 'ķ',
      kcy: 'к',
      kfr: '𝔨',
      kgreen: 'ĸ',
      khcy: 'х',
      kjcy: 'ќ',
      kopf: '𝕜',
      kscr: '𝓀',
      lAarr: '⇚',
      lArr: '⇐',
      lAtail: '⤛',
      lBarr: '⤎',
      lE: '≦',
      lEg: '⪋',
      lHar: '⥢',
      lacute: 'ĺ',
      laemptyv: '⦴',
      lagran: 'ℒ',
      lambda: 'λ',
      lang: '⟨',
      langd: '⦑',
      langle: '⟨',
      lap: '⪅',
      laquo: '«',
      larr: '←',
      larrb: '⇤',
      larrbfs: '⤟',
      larrfs: '⤝',
      larrhk: '↩',
      larrlp: '↫',
      larrpl: '⤹',
      larrsim: '⥳',
      larrtl: '↢',
      lat: '⪫',
      latail: '⤙',
      late: '⪭',
      lates: '⪭︀',
      lbarr: '⤌',
      lbbrk: '❲',
      lbrace: '{',
      lbrack: '[',
      lbrke: '⦋',
      lbrksld: '⦏',
      lbrkslu: '⦍',
      lcaron: 'ľ',
      lcedil: 'ļ',
      lceil: '⌈',
      lcub: '{',
      lcy: 'л',
      ldca: '⤶',
      ldquo: '“',
      ldquor: '„',
      ldrdhar: '⥧',
      ldrushar: '⥋',
      ldsh: '↲',
      le: '≤',
      leftarrow: '←',
      leftarrowtail: '↢',
      leftharpoondown: '↽',
      leftharpoonup: '↼',
      leftleftarrows: '⇇',
      leftrightarrow: '↔',
      leftrightarrows: '⇆',
      leftrightharpoons: '⇋',
      leftrightsquigarrow: '↭',
      leftthreetimes: '⋋',
      leg: '⋚',
      leq: '≤',
      leqq: '≦',
      leqslant: '⩽',
      les: '⩽',
      lescc: '⪨',
      lesdot: '⩿',
      lesdoto: '⪁',
      lesdotor: '⪃',
      lesg: '⋚︀',
      lesges: '⪓',
      lessapprox: '⪅',
      lessdot: '⋖',
      lesseqgtr: '⋚',
      lesseqqgtr: '⪋',
      lessgtr: '≶',
      lesssim: '≲',
      lfisht: '⥼',
      lfloor: '⌊',
      lfr: '𝔩',
      lg: '≶',
      lgE: '⪑',
      lhard: '↽',
      lharu: '↼',
      lharul: '⥪',
      lhblk: '▄',
      ljcy: 'љ',
      ll: '≪',
      llarr: '⇇',
      llcorner: '⌞',
      llhard: '⥫',
      lltri: '◺',
      lmidot: 'ŀ',
      lmoust: '⎰',
      lmoustache: '⎰',
      lnE: '≨',
      lnap: '⪉',
      lnapprox: '⪉',
      lne: '⪇',
      lneq: '⪇',
      lneqq: '≨',
      lnsim: '⋦',
      loang: '⟬',
      loarr: '⇽',
      lobrk: '⟦',
      longleftarrow: '⟵',
      longleftrightarrow: '⟷',
      longmapsto: '⟼',
      longrightarrow: '⟶',
      looparrowleft: '↫',
      looparrowright: '↬',
      lopar: '⦅',
      lopf: '𝕝',
      loplus: '⨭',
      lotimes: '⨴',
      lowast: '∗',
      lowbar: '_',
      loz: '◊',
      lozenge: '◊',
      lozf: '⧫',
      lpar: '(',
      lparlt: '⦓',
      lrarr: '⇆',
      lrcorner: '⌟',
      lrhar: '⇋',
      lrhard: '⥭',
      lrm: '‎',
      lrtri: '⊿',
      lsaquo: '‹',
      lscr: '𝓁',
      lsh: '↰',
      lsim: '≲',
      lsime: '⪍',
      lsimg: '⪏',
      lsqb: '[',
      lsquo: '‘',
      lsquor: '‚',
      lstrok: 'ł',
      lt: '<',
      ltcc: '⪦',
      ltcir: '⩹',
      ltdot: '⋖',
      lthree: '⋋',
      ltimes: '⋉',
      ltlarr: '⥶',
      ltquest: '⩻',
      ltrPar: '⦖',
      ltri: '◃',
      ltrie: '⊴',
      ltrif: '◂',
      lurdshar: '⥊',
      luruhar: '⥦',
      lvertneqq: '≨︀',
      lvnE: '≨︀',
      mDDot: '∺',
      macr: '¯',
      male: '♂',
      malt: '✠',
      maltese: '✠',
      map: '↦',
      mapsto: '↦',
      mapstodown: '↧',
      mapstoleft: '↤',
      mapstoup: '↥',
      marker: '▮',
      mcomma: '⨩',
      mcy: 'м',
      mdash: '—',
      measuredangle: '∡',
      mfr: '𝔪',
      mho: '℧',
      micro: 'µ',
      mid: '∣',
      midast: '*',
      midcir: '⫰',
      middot: '·',
      minus: '−',
      minusb: '⊟',
      minusd: '∸',
      minusdu: '⨪',
      mlcp: '⫛',
      mldr: '…',
      mnplus: '∓',
      models: '⊧',
      mopf: '𝕞',
      mp: '∓',
      mscr: '𝓂',
      mstpos: '∾',
      mu: 'μ',
      multimap: '⊸',
      mumap: '⊸',
      nGg: '⋙̸',
      nGt: '≫⃒',
      nGtv: '≫̸',
      nLeftarrow: '⇍',
      nLeftrightarrow: '⇎',
      nLl: '⋘̸',
      nLt: '≪⃒',
      nLtv: '≪̸',
      nRightarrow: '⇏',
      nVDash: '⊯',
      nVdash: '⊮',
      nabla: '∇',
      nacute: 'ń',
      nang: '∠⃒',
      nap: '≉',
      napE: '⩰̸',
      napid: '≋̸',
      napos: 'ŉ',
      napprox: '≉',
      natur: '♮',
      natural: '♮',
      naturals: 'ℕ',
      nbsp: ' ',
      nbump: '≎̸',
      nbumpe: '≏̸',
      ncap: '⩃',
      ncaron: 'ň',
      ncedil: 'ņ',
      ncong: '≇',
      ncongdot: '⩭̸',
      ncup: '⩂',
      ncy: 'н',
      ndash: '–',
      ne: '≠',
      neArr: '⇗',
      nearhk: '⤤',
      nearr: '↗',
      nearrow: '↗',
      nedot: '≐̸',
      nequiv: '≢',
      nesear: '⤨',
      nesim: '≂̸',
      nexist: '∄',
      nexists: '∄',
      nfr: '𝔫',
      ngE: '≧̸',
      nge: '≱',
      ngeq: '≱',
      ngeqq: '≧̸',
      ngeqslant: '⩾̸',
      nges: '⩾̸',
      ngsim: '≵',
      ngt: '≯',
      ngtr: '≯',
      nhArr: '⇎',
      nharr: '↮',
      nhpar: '⫲',
      ni: '∋',
      nis: '⋼',
      nisd: '⋺',
      niv: '∋',
      njcy: 'њ',
      nlArr: '⇍',
      nlE: '≦̸',
      nlarr: '↚',
      nldr: '‥',
      nle: '≰',
      nleftarrow: '↚',
      nleftrightarrow: '↮',
      nleq: '≰',
      nleqq: '≦̸',
      nleqslant: '⩽̸',
      nles: '⩽̸',
      nless: '≮',
      nlsim: '≴',
      nlt: '≮',
      nltri: '⋪',
      nltrie: '⋬',
      nmid: '∤',
      nopf: '𝕟',
      not: '¬',
      notin: '∉',
      notinE: '⋹̸',
      notindot: '⋵̸',
      notinva: '∉',
      notinvb: '⋷',
      notinvc: '⋶',
      notni: '∌',
      notniva: '∌',
      notnivb: '⋾',
      notnivc: '⋽',
      npar: '∦',
      nparallel: '∦',
      nparsl: '⫽⃥',
      npart: '∂̸',
      npolint: '⨔',
      npr: '⊀',
      nprcue: '⋠',
      npre: '⪯̸',
      nprec: '⊀',
      npreceq: '⪯̸',
      nrArr: '⇏',
      nrarr: '↛',
      nrarrc: '⤳̸',
      nrarrw: '↝̸',
      nrightarrow: '↛',
      nrtri: '⋫',
      nrtrie: '⋭',
      nsc: '⊁',
      nsccue: '⋡',
      nsce: '⪰̸',
      nscr: '𝓃',
      nshortmid: '∤',
      nshortparallel: '∦',
      nsim: '≁',
      nsime: '≄',
      nsimeq: '≄',
      nsmid: '∤',
      nspar: '∦',
      nsqsube: '⋢',
      nsqsupe: '⋣',
      nsub: '⊄',
      nsubE: '⫅̸',
      nsube: '⊈',
      nsubset: '⊂⃒',
      nsubseteq: '⊈',
      nsubseteqq: '⫅̸',
      nsucc: '⊁',
      nsucceq: '⪰̸',
      nsup: '⊅',
      nsupE: '⫆̸',
      nsupe: '⊉',
      nsupset: '⊃⃒',
      nsupseteq: '⊉',
      nsupseteqq: '⫆̸',
      ntgl: '≹',
      ntilde: 'ñ',
      ntlg: '≸',
      ntriangleleft: '⋪',
      ntrianglelefteq: '⋬',
      ntriangleright: '⋫',
      ntrianglerighteq: '⋭',
      nu: 'ν',
      num: '#',
      numero: '№',
      numsp: ' ',
      nvDash: '⊭',
      nvHarr: '⤄',
      nvap: '≍⃒',
      nvdash: '⊬',
      nvge: '≥⃒',
      nvgt: '>⃒',
      nvinfin: '⧞',
      nvlArr: '⤂',
      nvle: '≤⃒',
      nvlt: '<⃒',
      nvltrie: '⊴⃒',
      nvrArr: '⤃',
      nvrtrie: '⊵⃒',
      nvsim: '∼⃒',
      nwArr: '⇖',
      nwarhk: '⤣',
      nwarr: '↖',
      nwarrow: '↖',
      nwnear: '⤧',
      oS: 'Ⓢ',
      oacute: 'ó',
      oast: '⊛',
      ocir: '⊚',
      ocirc: 'ô',
      ocy: 'о',
      odash: '⊝',
      odblac: 'ő',
      odiv: '⨸',
      odot: '⊙',
      odsold: '⦼',
      oelig: 'œ',
      ofcir: '⦿',
      ofr: '𝔬',
      ogon: '˛',
      ograve: 'ò',
      ogt: '⧁',
      ohbar: '⦵',
      ohm: 'Ω',
      oint: '∮',
      olarr: '↺',
      olcir: '⦾',
      olcross: '⦻',
      oline: '‾',
      olt: '⧀',
      omacr: 'ō',
      omega: 'ω',
      omicron: 'ο',
      omid: '⦶',
      ominus: '⊖',
      oopf: '𝕠',
      opar: '⦷',
      operp: '⦹',
      oplus: '⊕',
      or: '∨',
      orarr: '↻',
      ord: '⩝',
      order: 'ℴ',
      orderof: 'ℴ',
      ordf: 'ª',
      ordm: 'º',
      origof: '⊶',
      oror: '⩖',
      orslope: '⩗',
      orv: '⩛',
      oscr: 'ℴ',
      oslash: 'ø',
      osol: '⊘',
      otilde: 'õ',
      otimes: '⊗',
      otimesas: '⨶',
      ouml: 'ö',
      ovbar: '⌽',
      par: '∥',
      para: '¶',
      parallel: '∥',
      parsim: '⫳',
      parsl: '⫽',
      part: '∂',
      pcy: 'п',
      percnt: '%',
      period: '.',
      permil: '‰',
      perp: '⊥',
      pertenk: '‱',
      pfr: '𝔭',
      phi: 'φ',
      phiv: 'ϕ',
      phmmat: 'ℳ',
      phone: '☎',
      pi: 'π',
      pitchfork: '⋔',
      piv: 'ϖ',
      planck: 'ℏ',
      planckh: 'ℎ',
      plankv: 'ℏ',
      plus: '+',
      plusacir: '⨣',
      plusb: '⊞',
      pluscir: '⨢',
      plusdo: '∔',
      plusdu: '⨥',
      pluse: '⩲',
      plusmn: '±',
      plussim: '⨦',
      plustwo: '⨧',
      pm: '±',
      pointint: '⨕',
      popf: '𝕡',
      pound: '£',
      pr: '≺',
      prE: '⪳',
      prap: '⪷',
      prcue: '≼',
      pre: '⪯',
      prec: '≺',
      precapprox: '⪷',
      preccurlyeq: '≼',
      preceq: '⪯',
      precnapprox: '⪹',
      precneqq: '⪵',
      precnsim: '⋨',
      precsim: '≾',
      prime: '′',
      primes: 'ℙ',
      prnE: '⪵',
      prnap: '⪹',
      prnsim: '⋨',
      prod: '∏',
      profalar: '⌮',
      profline: '⌒',
      profsurf: '⌓',
      prop: '∝',
      propto: '∝',
      prsim: '≾',
      prurel: '⊰',
      pscr: '𝓅',
      psi: 'ψ',
      puncsp: ' ',
      qfr: '𝔮',
      qint: '⨌',
      qopf: '𝕢',
      qprime: '⁗',
      qscr: '𝓆',
      quaternions: 'ℍ',
      quatint: '⨖',
      quest: '?',
      questeq: '≟',
      quot: '"',
      rAarr: '⇛',
      rArr: '⇒',
      rAtail: '⤜',
      rBarr: '⤏',
      rHar: '⥤',
      race: '∽̱',
      racute: 'ŕ',
      radic: '√',
      raemptyv: '⦳',
      rang: '⟩',
      rangd: '⦒',
      range: '⦥',
      rangle: '⟩',
      raquo: '»',
      rarr: '→',
      rarrap: '⥵',
      rarrb: '⇥',
      rarrbfs: '⤠',
      rarrc: '⤳',
      rarrfs: '⤞',
      rarrhk: '↪',
      rarrlp: '↬',
      rarrpl: '⥅',
      rarrsim: '⥴',
      rarrtl: '↣',
      rarrw: '↝',
      ratail: '⤚',
      ratio: '∶',
      rationals: 'ℚ',
      rbarr: '⤍',
      rbbrk: '❳',
      rbrace: '}',
      rbrack: ']',
      rbrke: '⦌',
      rbrksld: '⦎',
      rbrkslu: '⦐',
      rcaron: 'ř',
      rcedil: 'ŗ',
      rceil: '⌉',
      rcub: '}',
      rcy: 'р',
      rdca: '⤷',
      rdldhar: '⥩',
      rdquo: '”',
      rdquor: '”',
      rdsh: '↳',
      real: 'ℜ',
      realine: 'ℛ',
      realpart: 'ℜ',
      reals: 'ℝ',
      rect: '▭',
      reg: '®',
      rfisht: '⥽',
      rfloor: '⌋',
      rfr: '𝔯',
      rhard: '⇁',
      rharu: '⇀',
      rharul: '⥬',
      rho: 'ρ',
      rhov: 'ϱ',
      rightarrow: '→',
      rightarrowtail: '↣',
      rightharpoondown: '⇁',
      rightharpoonup: '⇀',
      rightleftarrows: '⇄',
      rightleftharpoons: '⇌',
      rightrightarrows: '⇉',
      rightsquigarrow: '↝',
      rightthreetimes: '⋌',
      ring: '˚',
      risingdotseq: '≓',
      rlarr: '⇄',
      rlhar: '⇌',
      rlm: '‏',
      rmoust: '⎱',
      rmoustache: '⎱',
      rnmid: '⫮',
      roang: '⟭',
      roarr: '⇾',
      robrk: '⟧',
      ropar: '⦆',
      ropf: '𝕣',
      roplus: '⨮',
      rotimes: '⨵',
      rpar: ')',
      rpargt: '⦔',
      rppolint: '⨒',
      rrarr: '⇉',
      rsaquo: '›',
      rscr: '𝓇',
      rsh: '↱',
      rsqb: ']',
      rsquo: '’',
      rsquor: '’',
      rthree: '⋌',
      rtimes: '⋊',
      rtri: '▹',
      rtrie: '⊵',
      rtrif: '▸',
      rtriltri: '⧎',
      ruluhar: '⥨',
      rx: '℞',
      sacute: 'ś',
      sbquo: '‚',
      sc: '≻',
      scE: '⪴',
      scap: '⪸',
      scaron: 'š',
      sccue: '≽',
      sce: '⪰',
      scedil: 'ş',
      scirc: 'ŝ',
      scnE: '⪶',
      scnap: '⪺',
      scnsim: '⋩',
      scpolint: '⨓',
      scsim: '≿',
      scy: 'с',
      sdot: '⋅',
      sdotb: '⊡',
      sdote: '⩦',
      seArr: '⇘',
      searhk: '⤥',
      searr: '↘',
      searrow: '↘',
      sect: '§',
      semi: ';',
      seswar: '⤩',
      setminus: '∖',
      setmn: '∖',
      sext: '✶',
      sfr: '𝔰',
      sfrown: '⌢',
      sharp: '♯',
      shchcy: 'щ',
      shcy: 'ш',
      shortmid: '∣',
      shortparallel: '∥',
      shy: '­',
      sigma: 'σ',
      sigmaf: 'ς',
      sigmav: 'ς',
      sim: '∼',
      simdot: '⩪',
      sime: '≃',
      simeq: '≃',
      simg: '⪞',
      simgE: '⪠',
      siml: '⪝',
      simlE: '⪟',
      simne: '≆',
      simplus: '⨤',
      simrarr: '⥲',
      slarr: '←',
      smallsetminus: '∖',
      smashp: '⨳',
      smeparsl: '⧤',
      smid: '∣',
      smile: '⌣',
      smt: '⪪',
      smte: '⪬',
      smtes: '⪬︀',
      softcy: 'ь',
      sol: '/',
      solb: '⧄',
      solbar: '⌿',
      sopf: '𝕤',
      spades: '♠',
      spadesuit: '♠',
      spar: '∥',
      sqcap: '⊓',
      sqcaps: '⊓︀',
      sqcup: '⊔',
      sqcups: '⊔︀',
      sqsub: '⊏',
      sqsube: '⊑',
      sqsubset: '⊏',
      sqsubseteq: '⊑',
      sqsup: '⊐',
      sqsupe: '⊒',
      sqsupset: '⊐',
      sqsupseteq: '⊒',
      squ: '□',
      square: '□',
      squarf: '▪',
      squf: '▪',
      srarr: '→',
      sscr: '𝓈',
      ssetmn: '∖',
      ssmile: '⌣',
      sstarf: '⋆',
      star: '☆',
      starf: '★',
      straightepsilon: 'ϵ',
      straightphi: 'ϕ',
      strns: '¯',
      sub: '⊂',
      subE: '⫅',
      subdot: '⪽',
      sube: '⊆',
      subedot: '⫃',
      submult: '⫁',
      subnE: '⫋',
      subne: '⊊',
      subplus: '⪿',
      subrarr: '⥹',
      subset: '⊂',
      subseteq: '⊆',
      subseteqq: '⫅',
      subsetneq: '⊊',
      subsetneqq: '⫋',
      subsim: '⫇',
      subsub: '⫕',
      subsup: '⫓',
      succ: '≻',
      succapprox: '⪸',
      succcurlyeq: '≽',
      succeq: '⪰',
      succnapprox: '⪺',
      succneqq: '⪶',
      succnsim: '⋩',
      succsim: '≿',
      sum: '∑',
      sung: '♪',
      sup1: '¹',
      sup2: '²',
      sup3: '³',
      sup: '⊃',
      supE: '⫆',
      supdot: '⪾',
      supdsub: '⫘',
      supe: '⊇',
      supedot: '⫄',
      suphsol: '⟉',
      suphsub: '⫗',
      suplarr: '⥻',
      supmult: '⫂',
      supnE: '⫌',
      supne: '⊋',
      supplus: '⫀',
      supset: '⊃',
      supseteq: '⊇',
      supseteqq: '⫆',
      supsetneq: '⊋',
      supsetneqq: '⫌',
      supsim: '⫈',
      supsub: '⫔',
      supsup: '⫖',
      swArr: '⇙',
      swarhk: '⤦',
      swarr: '↙',
      swarrow: '↙',
      swnwar: '⤪',
      szlig: 'ß',
      target: '⌖',
      tau: 'τ',
      tbrk: '⎴',
      tcaron: 'ť',
      tcedil: 'ţ',
      tcy: 'т',
      tdot: '⃛',
      telrec: '⌕',
      tfr: '𝔱',
      there4: '∴',
      therefore: '∴',
      theta: 'θ',
      thetasym: 'ϑ',
      thetav: 'ϑ',
      thickapprox: '≈',
      thicksim: '∼',
      thinsp: ' ',
      thkap: '≈',
      thksim: '∼',
      thorn: 'þ',
      tilde: '˜',
      times: '×',
      timesb: '⊠',
      timesbar: '⨱',
      timesd: '⨰',
      tint: '∭',
      toea: '⤨',
      top: '⊤',
      topbot: '⌶',
      topcir: '⫱',
      topf: '𝕥',
      topfork: '⫚',
      tosa: '⤩',
      tprime: '‴',
      trade: '™',
      triangle: '▵',
      triangledown: '▿',
      triangleleft: '◃',
      trianglelefteq: '⊴',
      triangleq: '≜',
      triangleright: '▹',
      trianglerighteq: '⊵',
      tridot: '◬',
      trie: '≜',
      triminus: '⨺',
      triplus: '⨹',
      trisb: '⧍',
      tritime: '⨻',
      trpezium: '⏢',
      tscr: '𝓉',
      tscy: 'ц',
      tshcy: 'ћ',
      tstrok: 'ŧ',
      twixt: '≬',
      twoheadleftarrow: '↞',
      twoheadrightarrow: '↠',
      uArr: '⇑',
      uHar: '⥣',
      uacute: 'ú',
      uarr: '↑',
      ubrcy: 'ў',
      ubreve: 'ŭ',
      ucirc: 'û',
      ucy: 'у',
      udarr: '⇅',
      udblac: 'ű',
      udhar: '⥮',
      ufisht: '⥾',
      ufr: '𝔲',
      ugrave: 'ù',
      uharl: '↿',
      uharr: '↾',
      uhblk: '▀',
      ulcorn: '⌜',
      ulcorner: '⌜',
      ulcrop: '⌏',
      ultri: '◸',
      umacr: 'ū',
      uml: '¨',
      uogon: 'ų',
      uopf: '𝕦',
      uparrow: '↑',
      updownarrow: '↕',
      upharpoonleft: '↿',
      upharpoonright: '↾',
      uplus: '⊎',
      upsi: 'υ',
      upsih: 'ϒ',
      upsilon: 'υ',
      upuparrows: '⇈',
      urcorn: '⌝',
      urcorner: '⌝',
      urcrop: '⌎',
      uring: 'ů',
      urtri: '◹',
      uscr: '𝓊',
      utdot: '⋰',
      utilde: 'ũ',
      utri: '▵',
      utrif: '▴',
      uuarr: '⇈',
      uuml: 'ü',
      uwangle: '⦧',
      vArr: '⇕',
      vBar: '⫨',
      vBarv: '⫩',
      vDash: '⊨',
      vangrt: '⦜',
      varepsilon: 'ϵ',
      varkappa: 'ϰ',
      varnothing: '∅',
      varphi: 'ϕ',
      varpi: 'ϖ',
      varpropto: '∝',
      varr: '↕',
      varrho: 'ϱ',
      varsigma: 'ς',
      varsubsetneq: '⊊︀',
      varsubsetneqq: '⫋︀',
      varsupsetneq: '⊋︀',
      varsupsetneqq: '⫌︀',
      vartheta: 'ϑ',
      vartriangleleft: '⊲',
      vartriangleright: '⊳',
      vcy: 'в',
      vdash: '⊢',
      vee: '∨',
      veebar: '⊻',
      veeeq: '≚',
      vellip: '⋮',
      verbar: '|',
      vert: '|',
      vfr: '𝔳',
      vltri: '⊲',
      vnsub: '⊂⃒',
      vnsup: '⊃⃒',
      vopf: '𝕧',
      vprop: '∝',
      vrtri: '⊳',
      vscr: '𝓋',
      vsubnE: '⫋︀',
      vsubne: '⊊︀',
      vsupnE: '⫌︀',
      vsupne: '⊋︀',
      vzigzag: '⦚',
      wcirc: 'ŵ',
      wedbar: '⩟',
      wedge: '∧',
      wedgeq: '≙',
      weierp: '℘',
      wfr: '𝔴',
      wopf: '𝕨',
      wp: '℘',
      wr: '≀',
      wreath: '≀',
      wscr: '𝓌',
      xcap: '⋂',
      xcirc: '◯',
      xcup: '⋃',
      xdtri: '▽',
      xfr: '𝔵',
      xhArr: '⟺',
      xharr: '⟷',
      xi: 'ξ',
      xlArr: '⟸',
      xlarr: '⟵',
      xmap: '⟼',
      xnis: '⋻',
      xodot: '⨀',
      xopf: '𝕩',
      xoplus: '⨁',
      xotime: '⨂',
      xrArr: '⟹',
      xrarr: '⟶',
      xscr: '𝓍',
      xsqcup: '⨆',
      xuplus: '⨄',
      xutri: '△',
      xvee: '⋁',
      xwedge: '⋀',
      yacute: 'ý',
      yacy: 'я',
      ycirc: 'ŷ',
      ycy: 'ы',
      yen: '¥',
      yfr: '𝔶',
      yicy: 'ї',
      yopf: '𝕪',
      yscr: '𝓎',
      yucy: 'ю',
      yuml: 'ÿ',
      zacute: 'ź',
      zcaron: 'ž',
      zcy: 'з',
      zdot: 'ż',
      zeetrf: 'ℨ',
      zeta: 'ζ',
      zfr: '𝔷',
      zhcy: 'ж',
      zigrarr: '⇝',
      zopf: '𝕫',
      zscr: '𝓏',
      zwj: '‍',
      zwnj: '‌'
    };

    const own$7 = {}.hasOwnProperty;

    /**
     * Decode a single character reference (without the `&` or `;`).
     * You probably only need this when you’re building parsers yourself that follow
     * different rules compared to HTML.
     * This is optimized to be tiny in browsers.
     *
     * @param {string} value
     *   `notin` (named), `#123` (deci), `#x123` (hexa).
     * @returns {string|false}
     *   Decoded reference.
     */
    function decodeNamedCharacterReference(value) {
      return own$7.call(characterEntities, value) ? characterEntities[value] : false
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /** @type {Construct} */
    const characterReference = {
      name: 'characterReference',
      tokenize: tokenizeCharacterReference
    };
    /** @type {Tokenizer} */

    function tokenizeCharacterReference(effects, ok, nok) {
      const self = this;
      let size = 0;
      /** @type {number} */

      let max;
      /** @type {(code: Code) => code is number} */

      let test;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('characterReference');
        effects.enter('characterReferenceMarker');
        effects.consume(code);
        effects.exit('characterReferenceMarker');
        return open
      }
      /** @type {State} */

      function open(code) {
        if (code === 35) {
          effects.enter('characterReferenceMarkerNumeric');
          effects.consume(code);
          effects.exit('characterReferenceMarkerNumeric');
          return numeric
        }

        effects.enter('characterReferenceValue');
        max = 31;
        test = asciiAlphanumeric;
        return value(code)
      }
      /** @type {State} */

      function numeric(code) {
        if (code === 88 || code === 120) {
          effects.enter('characterReferenceMarkerHexadecimal');
          effects.consume(code);
          effects.exit('characterReferenceMarkerHexadecimal');
          effects.enter('characterReferenceValue');
          max = 6;
          test = asciiHexDigit;
          return value
        }

        effects.enter('characterReferenceValue');
        max = 7;
        test = asciiDigit;
        return value(code)
      }
      /** @type {State} */

      function value(code) {
        /** @type {Token} */
        let token;

        if (code === 59 && size) {
          token = effects.exit('characterReferenceValue');

          if (
            test === asciiAlphanumeric &&
            !decodeNamedCharacterReference(self.sliceSerialize(token))
          ) {
            return nok(code)
          }

          effects.enter('characterReferenceMarker');
          effects.consume(code);
          effects.exit('characterReferenceMarker');
          effects.exit('characterReference');
          return ok
        }

        if (test(code) && size++ < max) {
          effects.consume(code);
          return value
        }

        return nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /** @type {Construct} */
    const codeFenced = {
      name: 'codeFenced',
      tokenize: tokenizeCodeFenced,
      concrete: true
    };
    /** @type {Tokenizer} */

    function tokenizeCodeFenced(effects, ok, nok) {
      const self = this;
      /** @type {Construct} */

      const closingFenceConstruct = {
        tokenize: tokenizeClosingFence,
        partial: true
      };
      /** @type {Construct} */

      const nonLazyLine = {
        tokenize: tokenizeNonLazyLine,
        partial: true
      };
      const tail = this.events[this.events.length - 1];
      const initialPrefix =
        tail && tail[1].type === 'linePrefix'
          ? tail[2].sliceSerialize(tail[1], true).length
          : 0;
      let sizeOpen = 0;
      /** @type {NonNullable<Code>} */

      let marker;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('codeFenced');
        effects.enter('codeFencedFence');
        effects.enter('codeFencedFenceSequence');
        marker = code;
        return sequenceOpen(code)
      }
      /** @type {State} */

      function sequenceOpen(code) {
        if (code === marker) {
          effects.consume(code);
          sizeOpen++;
          return sequenceOpen
        }

        effects.exit('codeFencedFenceSequence');
        return sizeOpen < 3
          ? nok(code)
          : factorySpace(effects, infoOpen, 'whitespace')(code)
      }
      /** @type {State} */

      function infoOpen(code) {
        if (code === null || markdownLineEnding(code)) {
          return openAfter(code)
        }

        effects.enter('codeFencedFenceInfo');
        effects.enter('chunkString', {
          contentType: 'string'
        });
        return info(code)
      }
      /** @type {State} */

      function info(code) {
        if (code === null || markdownLineEndingOrSpace(code)) {
          effects.exit('chunkString');
          effects.exit('codeFencedFenceInfo');
          return factorySpace(effects, infoAfter, 'whitespace')(code)
        }

        if (code === 96 && code === marker) return nok(code)
        effects.consume(code);
        return info
      }
      /** @type {State} */

      function infoAfter(code) {
        if (code === null || markdownLineEnding(code)) {
          return openAfter(code)
        }

        effects.enter('codeFencedFenceMeta');
        effects.enter('chunkString', {
          contentType: 'string'
        });
        return meta(code)
      }
      /** @type {State} */

      function meta(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit('chunkString');
          effects.exit('codeFencedFenceMeta');
          return openAfter(code)
        }

        if (code === 96 && code === marker) return nok(code)
        effects.consume(code);
        return meta
      }
      /** @type {State} */

      function openAfter(code) {
        effects.exit('codeFencedFence');
        return self.interrupt ? ok(code) : contentStart(code)
      }
      /** @type {State} */

      function contentStart(code) {
        if (code === null) {
          return after(code)
        }

        if (markdownLineEnding(code)) {
          return effects.attempt(
            nonLazyLine,
            effects.attempt(
              closingFenceConstruct,
              after,
              initialPrefix
                ? factorySpace(
                    effects,
                    contentStart,
                    'linePrefix',
                    initialPrefix + 1
                  )
                : contentStart
            ),
            after
          )(code)
        }

        effects.enter('codeFlowValue');
        return contentContinue(code)
      }
      /** @type {State} */

      function contentContinue(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit('codeFlowValue');
          return contentStart(code)
        }

        effects.consume(code);
        return contentContinue
      }
      /** @type {State} */

      function after(code) {
        effects.exit('codeFenced');
        return ok(code)
      }
      /** @type {Tokenizer} */

      function tokenizeNonLazyLine(effects, ok, nok) {
        const self = this;
        return start
        /** @type {State} */

        function start(code) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return lineStart
        }
        /** @type {State} */

        function lineStart(code) {
          return self.parser.lazy[self.now().line] ? nok(code) : ok(code)
        }
      }
      /** @type {Tokenizer} */

      function tokenizeClosingFence(effects, ok, nok) {
        let size = 0;
        return factorySpace(
          effects,
          closingSequenceStart,
          'linePrefix',
          this.parser.constructs.disable.null.includes('codeIndented')
            ? undefined
            : 4
        )
        /** @type {State} */

        function closingSequenceStart(code) {
          effects.enter('codeFencedFence');
          effects.enter('codeFencedFenceSequence');
          return closingSequence(code)
        }
        /** @type {State} */

        function closingSequence(code) {
          if (code === marker) {
            effects.consume(code);
            size++;
            return closingSequence
          }

          if (size < sizeOpen) return nok(code)
          effects.exit('codeFencedFenceSequence');
          return factorySpace(effects, closingSequenceEnd, 'whitespace')(code)
        }
        /** @type {State} */

        function closingSequenceEnd(code) {
          if (code === null || markdownLineEnding(code)) {
            effects.exit('codeFencedFence');
            return ok(code)
          }

          return nok(code)
        }
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const codeIndented = {
      name: 'codeIndented',
      tokenize: tokenizeCodeIndented
    };
    /** @type {Construct} */

    const indentedContent = {
      tokenize: tokenizeIndentedContent,
      partial: true
    };
    /** @type {Tokenizer} */

    function tokenizeCodeIndented(effects, ok, nok) {
      const self = this;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('codeIndented');
        return factorySpace(effects, afterStartPrefix, 'linePrefix', 4 + 1)(code)
      }
      /** @type {State} */

      function afterStartPrefix(code) {
        const tail = self.events[self.events.length - 1];
        return tail &&
          tail[1].type === 'linePrefix' &&
          tail[2].sliceSerialize(tail[1], true).length >= 4
          ? afterPrefix(code)
          : nok(code)
      }
      /** @type {State} */

      function afterPrefix(code) {
        if (code === null) {
          return after(code)
        }

        if (markdownLineEnding(code)) {
          return effects.attempt(indentedContent, afterPrefix, after)(code)
        }

        effects.enter('codeFlowValue');
        return content(code)
      }
      /** @type {State} */

      function content(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit('codeFlowValue');
          return afterPrefix(code)
        }

        effects.consume(code);
        return content
      }
      /** @type {State} */

      function after(code) {
        effects.exit('codeIndented');
        return ok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeIndentedContent(effects, ok, nok) {
      const self = this;
      return start
      /** @type {State} */

      function start(code) {
        // If this is a lazy line, it can’t be code.
        if (self.parser.lazy[self.now().line]) {
          return nok(code)
        }

        if (markdownLineEnding(code)) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return start
        }

        return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)(code)
      }
      /** @type {State} */

      function afterPrefix(code) {
        const tail = self.events[self.events.length - 1];
        return tail &&
          tail[1].type === 'linePrefix' &&
          tail[2].sliceSerialize(tail[1], true).length >= 4
          ? ok(code)
          : markdownLineEnding(code)
          ? start(code)
          : nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Previous} Previous
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const codeText = {
      name: 'codeText',
      tokenize: tokenizeCodeText,
      resolve: resolveCodeText,
      previous
    };
    /** @type {Resolver} */

    function resolveCodeText(events) {
      let tailExitIndex = events.length - 4;
      let headEnterIndex = 3;
      /** @type {number} */

      let index;
      /** @type {number|undefined} */

      let enter; // If we start and end with an EOL or a space.

      if (
        (events[headEnterIndex][1].type === 'lineEnding' ||
          events[headEnterIndex][1].type === 'space') &&
        (events[tailExitIndex][1].type === 'lineEnding' ||
          events[tailExitIndex][1].type === 'space')
      ) {
        index = headEnterIndex; // And we have data.

        while (++index < tailExitIndex) {
          if (events[index][1].type === 'codeTextData') {
            // Then we have padding.
            events[headEnterIndex][1].type = 'codeTextPadding';
            events[tailExitIndex][1].type = 'codeTextPadding';
            headEnterIndex += 2;
            tailExitIndex -= 2;
            break
          }
        }
      } // Merge adjacent spaces and data.

      index = headEnterIndex - 1;
      tailExitIndex++;

      while (++index <= tailExitIndex) {
        if (enter === undefined) {
          if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
            enter = index;
          }
        } else if (
          index === tailExitIndex ||
          events[index][1].type === 'lineEnding'
        ) {
          events[enter][1].type = 'codeTextData';

          if (index !== enter + 2) {
            events[enter][1].end = events[index - 1][1].end;
            events.splice(enter + 2, index - enter - 2);
            tailExitIndex -= index - enter - 2;
            index = enter + 2;
          }

          enter = undefined;
        }
      }

      return events
    }
    /** @type {Previous} */

    function previous(code) {
      // If there is a previous code, there will always be a tail.
      return (
        code !== 96 ||
        this.events[this.events.length - 1][1].type === 'characterEscape'
      )
    }
    /** @type {Tokenizer} */

    function tokenizeCodeText(effects, ok, nok) {
      let sizeOpen = 0;
      /** @type {number} */

      let size;
      /** @type {Token} */

      let token;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('codeText');
        effects.enter('codeTextSequence');
        return openingSequence(code)
      }
      /** @type {State} */

      function openingSequence(code) {
        if (code === 96) {
          effects.consume(code);
          sizeOpen++;
          return openingSequence
        }

        effects.exit('codeTextSequence');
        return gap(code)
      }
      /** @type {State} */

      function gap(code) {
        // EOF.
        if (code === null) {
          return nok(code)
        } // Closing fence?
        // Could also be data.

        if (code === 96) {
          token = effects.enter('codeTextSequence');
          size = 0;
          return closingSequence(code)
        } // Tabs don’t work, and virtual spaces don’t make sense.

        if (code === 32) {
          effects.enter('space');
          effects.consume(code);
          effects.exit('space');
          return gap
        }

        if (markdownLineEnding(code)) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return gap
        } // Data.

        effects.enter('codeTextData');
        return data(code)
      } // In code.

      /** @type {State} */

      function data(code) {
        if (
          code === null ||
          code === 32 ||
          code === 96 ||
          markdownLineEnding(code)
        ) {
          effects.exit('codeTextData');
          return gap(code)
        }

        effects.consume(code);
        return data
      } // Closing fence.

      /** @type {State} */

      function closingSequence(code) {
        // More.
        if (code === 96) {
          effects.consume(code);
          size++;
          return closingSequence
        } // Done!

        if (size === sizeOpen) {
          effects.exit('codeTextSequence');
          effects.exit('codeText');
          return ok(code)
        } // More or less accents: mark as data.

        token.type = 'codeTextData';
        return data(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').Chunk} Chunk
     * @typedef {import('micromark-util-types').Event} Event
     */

    /**
     * Tokenize subcontent.
     *
     * @param {Event[]} events
     * @returns {boolean}
     */
    function subtokenize(events) {
      /** @type {Record<string, number>} */
      const jumps = {};
      let index = -1;
      /** @type {Event} */

      let event;
      /** @type {number|undefined} */

      let lineIndex;
      /** @type {number} */

      let otherIndex;
      /** @type {Event} */

      let otherEvent;
      /** @type {Event[]} */

      let parameters;
      /** @type {Event[]} */

      let subevents;
      /** @type {boolean|undefined} */

      let more;

      while (++index < events.length) {
        while (index in jumps) {
          index = jumps[index];
        }

        event = events[index]; // Add a hook for the GFM tasklist extension, which needs to know if text
        // is in the first content of a list item.

        if (
          index &&
          event[1].type === 'chunkFlow' &&
          events[index - 1][1].type === 'listItemPrefix'
        ) {
          subevents = event[1]._tokenizer.events;
          otherIndex = 0;

          if (
            otherIndex < subevents.length &&
            subevents[otherIndex][1].type === 'lineEndingBlank'
          ) {
            otherIndex += 2;
          }

          if (
            otherIndex < subevents.length &&
            subevents[otherIndex][1].type === 'content'
          ) {
            while (++otherIndex < subevents.length) {
              if (subevents[otherIndex][1].type === 'content') {
                break
              }

              if (subevents[otherIndex][1].type === 'chunkText') {
                subevents[otherIndex][1]._isInFirstContentOfListItem = true;
                otherIndex++;
              }
            }
          }
        } // Enter.

        if (event[0] === 'enter') {
          if (event[1].contentType) {
            Object.assign(jumps, subcontent(events, index));
            index = jumps[index];
            more = true;
          }
        } // Exit.
        else if (event[1]._container) {
          otherIndex = index;
          lineIndex = undefined;

          while (otherIndex--) {
            otherEvent = events[otherIndex];

            if (
              otherEvent[1].type === 'lineEnding' ||
              otherEvent[1].type === 'lineEndingBlank'
            ) {
              if (otherEvent[0] === 'enter') {
                if (lineIndex) {
                  events[lineIndex][1].type = 'lineEndingBlank';
                }

                otherEvent[1].type = 'lineEnding';
                lineIndex = otherIndex;
              }
            } else {
              break
            }
          }

          if (lineIndex) {
            // Fix position.
            event[1].end = Object.assign({}, events[lineIndex][1].start); // Switch container exit w/ line endings.

            parameters = events.slice(lineIndex, index);
            parameters.unshift(event);
            splice(events, lineIndex, index - lineIndex + 1, parameters);
          }
        }
      }

      return !more
    }
    /**
     * Tokenize embedded tokens.
     *
     * @param {Event[]} events
     * @param {number} eventIndex
     * @returns {Record<string, number>}
     */

    function subcontent(events, eventIndex) {
      const token = events[eventIndex][1];
      const context = events[eventIndex][2];
      let startPosition = eventIndex - 1;
      /** @type {number[]} */

      const startPositions = [];
      const tokenizer =
        token._tokenizer || context.parser[token.contentType](token.start);
      const childEvents = tokenizer.events;
      /** @type {[number, number][]} */

      const jumps = [];
      /** @type {Record<string, number>} */

      const gaps = {};
      /** @type {Chunk[]} */

      let stream;
      /** @type {Token|undefined} */

      let previous;
      let index = -1;
      /** @type {Token|undefined} */

      let current = token;
      let adjust = 0;
      let start = 0;
      const breaks = [start]; // Loop forward through the linked tokens to pass them in order to the
      // subtokenizer.

      while (current) {
        // Find the position of the event for this token.
        while (events[++startPosition][1] !== current) {
          // Empty.
        }

        startPositions.push(startPosition);

        if (!current._tokenizer) {
          stream = context.sliceStream(current);

          if (!current.next) {
            stream.push(null);
          }

          if (previous) {
            tokenizer.defineSkip(current.start);
          }

          if (current._isInFirstContentOfListItem) {
            tokenizer._gfmTasklistFirstContentOfListItem = true;
          }

          tokenizer.write(stream);

          if (current._isInFirstContentOfListItem) {
            tokenizer._gfmTasklistFirstContentOfListItem = undefined;
          }
        } // Unravel the next token.

        previous = current;
        current = current.next;
      } // Now, loop back through all events (and linked tokens), to figure out which
      // parts belong where.

      current = token;

      while (++index < childEvents.length) {
        if (
          // Find a void token that includes a break.
          childEvents[index][0] === 'exit' &&
          childEvents[index - 1][0] === 'enter' &&
          childEvents[index][1].type === childEvents[index - 1][1].type &&
          childEvents[index][1].start.line !== childEvents[index][1].end.line
        ) {
          start = index + 1;
          breaks.push(start); // Help GC.

          current._tokenizer = undefined;
          current.previous = undefined;
          current = current.next;
        }
      } // Help GC.

      tokenizer.events = []; // If there’s one more token (which is the cases for lines that end in an
      // EOF), that’s perfect: the last point we found starts it.
      // If there isn’t then make sure any remaining content is added to it.

      if (current) {
        // Help GC.
        current._tokenizer = undefined;
        current.previous = undefined;
      } else {
        breaks.pop();
      } // Now splice the events from the subtokenizer into the current events,
      // moving back to front so that splice indices aren’t affected.

      index = breaks.length;

      while (index--) {
        const slice = childEvents.slice(breaks[index], breaks[index + 1]);
        const start = startPositions.pop();
        jumps.unshift([start, start + slice.length - 1]);
        splice(events, start, 2, slice);
      }

      index = -1;

      while (++index < jumps.length) {
        gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
        adjust += jumps[index][1] - jumps[index][0] - 1;
      }

      return gaps
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     */

    /**
     * No name because it must not be turned off.
     * @type {Construct}
     */
    const content = {
      tokenize: tokenizeContent,
      resolve: resolveContent
    };
    /** @type {Construct} */

    const continuationConstruct = {
      tokenize: tokenizeContinuation,
      partial: true
    };
    /**
     * Content is transparent: it’s parsed right now. That way, definitions are also
     * parsed right now: before text in paragraphs (specifically, media) are parsed.
     *
     * @type {Resolver}
     */

    function resolveContent(events) {
      subtokenize(events);
      return events
    }
    /** @type {Tokenizer} */

    function tokenizeContent(effects, ok) {
      /** @type {Token} */
      let previous;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('content');
        previous = effects.enter('chunkContent', {
          contentType: 'content'
        });
        return data(code)
      }
      /** @type {State} */

      function data(code) {
        if (code === null) {
          return contentEnd(code)
        }

        if (markdownLineEnding(code)) {
          return effects.check(
            continuationConstruct,
            contentContinue,
            contentEnd
          )(code)
        } // Data.

        effects.consume(code);
        return data
      }
      /** @type {State} */

      function contentEnd(code) {
        effects.exit('chunkContent');
        effects.exit('content');
        return ok(code)
      }
      /** @type {State} */

      function contentContinue(code) {
        effects.consume(code);
        effects.exit('chunkContent');
        previous.next = effects.enter('chunkContent', {
          contentType: 'content',
          previous
        });
        previous = previous.next;
        return data
      }
    }
    /** @type {Tokenizer} */

    function tokenizeContinuation(effects, ok, nok) {
      const self = this;
      return startLookahead
      /** @type {State} */

      function startLookahead(code) {
        effects.exit('chunkContent');
        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        return factorySpace(effects, prefixed, 'linePrefix')
      }
      /** @type {State} */

      function prefixed(code) {
        if (code === null || markdownLineEnding(code)) {
          return nok(code)
        }

        const tail = self.events[self.events.length - 1];

        if (
          !self.parser.constructs.disable.null.includes('codeIndented') &&
          tail &&
          tail[1].type === 'linePrefix' &&
          tail[2].sliceSerialize(tail[1], true).length >= 4
        ) {
          return ok(code)
        }

        return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Effects} Effects
     * @typedef {import('micromark-util-types').State} State
     */

    /**
     * @param {Effects} effects
     * @param {State} ok
     * @param {State} nok
     * @param {string} type
     * @param {string} literalType
     * @param {string} literalMarkerType
     * @param {string} rawType
     * @param {string} stringType
     * @param {number} [max=Infinity]
     * @returns {State}
     */
    // eslint-disable-next-line max-params
    function factoryDestination(
      effects,
      ok,
      nok,
      type,
      literalType,
      literalMarkerType,
      rawType,
      stringType,
      max
    ) {
      const limit = max || Number.POSITIVE_INFINITY;
      let balance = 0;
      return start
      /** @type {State} */

      function start(code) {
        if (code === 60) {
          effects.enter(type);
          effects.enter(literalType);
          effects.enter(literalMarkerType);
          effects.consume(code);
          effects.exit(literalMarkerType);
          return destinationEnclosedBefore
        }

        if (code === null || code === 41 || asciiControl(code)) {
          return nok(code)
        }

        effects.enter(type);
        effects.enter(rawType);
        effects.enter(stringType);
        effects.enter('chunkString', {
          contentType: 'string'
        });
        return destinationRaw(code)
      }
      /** @type {State} */

      function destinationEnclosedBefore(code) {
        if (code === 62) {
          effects.enter(literalMarkerType);
          effects.consume(code);
          effects.exit(literalMarkerType);
          effects.exit(literalType);
          effects.exit(type);
          return ok
        }

        effects.enter(stringType);
        effects.enter('chunkString', {
          contentType: 'string'
        });
        return destinationEnclosed(code)
      }
      /** @type {State} */

      function destinationEnclosed(code) {
        if (code === 62) {
          effects.exit('chunkString');
          effects.exit(stringType);
          return destinationEnclosedBefore(code)
        }

        if (code === null || code === 60 || markdownLineEnding(code)) {
          return nok(code)
        }

        effects.consume(code);
        return code === 92 ? destinationEnclosedEscape : destinationEnclosed
      }
      /** @type {State} */

      function destinationEnclosedEscape(code) {
        if (code === 60 || code === 62 || code === 92) {
          effects.consume(code);
          return destinationEnclosed
        }

        return destinationEnclosed(code)
      }
      /** @type {State} */

      function destinationRaw(code) {
        if (code === 40) {
          if (++balance > limit) return nok(code)
          effects.consume(code);
          return destinationRaw
        }

        if (code === 41) {
          if (!balance--) {
            effects.exit('chunkString');
            effects.exit(stringType);
            effects.exit(rawType);
            effects.exit(type);
            return ok(code)
          }

          effects.consume(code);
          return destinationRaw
        }

        if (code === null || markdownLineEndingOrSpace(code)) {
          if (balance) return nok(code)
          effects.exit('chunkString');
          effects.exit(stringType);
          effects.exit(rawType);
          effects.exit(type);
          return ok(code)
        }

        if (asciiControl(code)) return nok(code)
        effects.consume(code);
        return code === 92 ? destinationRawEscape : destinationRaw
      }
      /** @type {State} */

      function destinationRawEscape(code) {
        if (code === 40 || code === 41 || code === 92) {
          effects.consume(code);
          return destinationRaw
        }

        return destinationRaw(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Effects} Effects
     * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
     * @typedef {import('micromark-util-types').State} State
     */

    /**
     * @this {TokenizeContext}
     * @param {Effects} effects
     * @param {State} ok
     * @param {State} nok
     * @param {string} type
     * @param {string} markerType
     * @param {string} stringType
     * @returns {State}
     */
    // eslint-disable-next-line max-params
    function factoryLabel(effects, ok, nok, type, markerType, stringType) {
      const self = this;
      let size = 0;
      /** @type {boolean} */

      let data;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.enter(stringType);
        return atBreak
      }
      /** @type {State} */

      function atBreak(code) {
        if (
          code === null ||
          code === 91 ||
          (code === 93 && !data) ||
          /* To do: remove in the future once we’ve switched from
           * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
           * which doesn’t need this */

          /* Hidden footnotes hook */

          /* c8 ignore next 3 */
          (code === 94 &&
            !size &&
            '_hiddenFootnoteSupport' in self.parser.constructs) ||
          size > 999
        ) {
          return nok(code)
        }

        if (code === 93) {
          effects.exit(stringType);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.exit(type);
          return ok
        }

        if (markdownLineEnding(code)) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return atBreak
        }

        effects.enter('chunkString', {
          contentType: 'string'
        });
        return label(code)
      }
      /** @type {State} */

      function label(code) {
        if (
          code === null ||
          code === 91 ||
          code === 93 ||
          markdownLineEnding(code) ||
          size++ > 999
        ) {
          effects.exit('chunkString');
          return atBreak(code)
        }

        effects.consume(code);
        data = data || !markdownSpace(code);
        return code === 92 ? labelEscape : label
      }
      /** @type {State} */

      function labelEscape(code) {
        if (code === 91 || code === 92 || code === 93) {
          effects.consume(code);
          size++;
          return label
        }

        return label(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Effects} Effects
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /**
     * @param {Effects} effects
     * @param {State} ok
     * @param {State} nok
     * @param {string} type
     * @param {string} markerType
     * @param {string} stringType
     * @returns {State}
     */
    // eslint-disable-next-line max-params
    function factoryTitle(effects, ok, nok, type, markerType, stringType) {
      /** @type {NonNullable<Code>} */
      let marker;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        marker = code === 40 ? 41 : code;
        return atFirstTitleBreak
      }
      /** @type {State} */

      function atFirstTitleBreak(code) {
        if (code === marker) {
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.exit(type);
          return ok
        }

        effects.enter(stringType);
        return atTitleBreak(code)
      }
      /** @type {State} */

      function atTitleBreak(code) {
        if (code === marker) {
          effects.exit(stringType);
          return atFirstTitleBreak(marker)
        }

        if (code === null) {
          return nok(code)
        } // Note: blank lines can’t exist in content.

        if (markdownLineEnding(code)) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return factorySpace(effects, atTitleBreak, 'linePrefix')
        }

        effects.enter('chunkString', {
          contentType: 'string'
        });
        return title(code)
      }
      /** @type {State} */

      function title(code) {
        if (code === marker || code === null || markdownLineEnding(code)) {
          effects.exit('chunkString');
          return atTitleBreak(code)
        }

        effects.consume(code);
        return code === 92 ? titleEscape : title
      }
      /** @type {State} */

      function titleEscape(code) {
        if (code === marker || code === 92) {
          effects.consume(code);
          return title
        }

        return title(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Effects} Effects
     * @typedef {import('micromark-util-types').State} State
     */

    /**
     * @param {Effects} effects
     * @param {State} ok
     */
    function factoryWhitespace(effects, ok) {
      /** @type {boolean} */
      let seen;
      return start
      /** @type {State} */

      function start(code) {
        if (markdownLineEnding(code)) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          seen = true;
          return start
        }

        if (markdownSpace(code)) {
          return factorySpace(
            effects,
            start,
            seen ? 'linePrefix' : 'lineSuffix'
          )(code)
        }

        return ok(code)
      }
    }

    /**
     * Normalize an identifier (such as used in definitions).
     *
     * @param {string} value
     * @returns {string}
     */
    function normalizeIdentifier(value) {
      return (
        value // Collapse Markdown whitespace.
          .replace(/[\t\n\r ]+/g, ' ') // Trim.
          .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
          // counterpart is uppercased will result in a different uppercase
          // character.
          // Hence, to get that form, we perform both lower- and uppercase.
          // Upper case makes sure keys will not interact with default prototypal
          // methods: no method is uppercase.
          .toLowerCase()
          .toUpperCase()
      )
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const definition = {
      name: 'definition',
      tokenize: tokenizeDefinition
    };
    /** @type {Construct} */

    const titleConstruct = {
      tokenize: tokenizeTitle,
      partial: true
    };
    /** @type {Tokenizer} */

    function tokenizeDefinition(effects, ok, nok) {
      const self = this;
      /** @type {string} */

      let identifier;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('definition');
        return factoryLabel.call(
          self,
          effects,
          labelAfter,
          nok,
          'definitionLabel',
          'definitionLabelMarker',
          'definitionLabelString'
        )(code)
      }
      /** @type {State} */

      function labelAfter(code) {
        identifier = normalizeIdentifier(
          self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
        );

        if (code === 58) {
          effects.enter('definitionMarker');
          effects.consume(code);
          effects.exit('definitionMarker'); // Note: blank lines can’t exist in content.

          return factoryWhitespace(
            effects,
            factoryDestination(
              effects,
              effects.attempt(
                titleConstruct,
                factorySpace(effects, after, 'whitespace'),
                factorySpace(effects, after, 'whitespace')
              ),
              nok,
              'definitionDestination',
              'definitionDestinationLiteral',
              'definitionDestinationLiteralMarker',
              'definitionDestinationRaw',
              'definitionDestinationString'
            )
          )
        }

        return nok(code)
      }
      /** @type {State} */

      function after(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit('definition');

          if (!self.parser.defined.includes(identifier)) {
            self.parser.defined.push(identifier);
          }

          return ok(code)
        }

        return nok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeTitle(effects, ok, nok) {
      return start
      /** @type {State} */

      function start(code) {
        return markdownLineEndingOrSpace(code)
          ? factoryWhitespace(effects, before)(code)
          : nok(code)
      }
      /** @type {State} */

      function before(code) {
        if (code === 34 || code === 39 || code === 40) {
          return factoryTitle(
            effects,
            factorySpace(effects, after, 'whitespace'),
            nok,
            'definitionTitle',
            'definitionTitleMarker',
            'definitionTitleString'
          )(code)
        }

        return nok(code)
      }
      /** @type {State} */

      function after(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const hardBreakEscape = {
      name: 'hardBreakEscape',
      tokenize: tokenizeHardBreakEscape
    };
    /** @type {Tokenizer} */

    function tokenizeHardBreakEscape(effects, ok, nok) {
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('hardBreakEscape');
        effects.enter('escapeMarker');
        effects.consume(code);
        return open
      }
      /** @type {State} */

      function open(code) {
        if (markdownLineEnding(code)) {
          effects.exit('escapeMarker');
          effects.exit('hardBreakEscape');
          return ok(code)
        }

        return nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const headingAtx = {
      name: 'headingAtx',
      tokenize: tokenizeHeadingAtx,
      resolve: resolveHeadingAtx
    };
    /** @type {Resolver} */

    function resolveHeadingAtx(events, context) {
      let contentEnd = events.length - 2;
      let contentStart = 3;
      /** @type {Token} */

      let content;
      /** @type {Token} */

      let text; // Prefix whitespace, part of the opening.

      if (events[contentStart][1].type === 'whitespace') {
        contentStart += 2;
      } // Suffix whitespace, part of the closing.

      if (
        contentEnd - 2 > contentStart &&
        events[contentEnd][1].type === 'whitespace'
      ) {
        contentEnd -= 2;
      }

      if (
        events[contentEnd][1].type === 'atxHeadingSequence' &&
        (contentStart === contentEnd - 1 ||
          (contentEnd - 4 > contentStart &&
            events[contentEnd - 2][1].type === 'whitespace'))
      ) {
        contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
      }

      if (contentEnd > contentStart) {
        content = {
          type: 'atxHeadingText',
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end
        };
        text = {
          type: 'chunkText',
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end,
          // @ts-expect-error Constants are fine to assign.
          contentType: 'text'
        };
        splice(events, contentStart, contentEnd - contentStart + 1, [
          ['enter', content, context],
          ['enter', text, context],
          ['exit', text, context],
          ['exit', content, context]
        ]);
      }

      return events
    }
    /** @type {Tokenizer} */

    function tokenizeHeadingAtx(effects, ok, nok) {
      const self = this;
      let size = 0;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('atxHeading');
        effects.enter('atxHeadingSequence');
        return fenceOpenInside(code)
      }
      /** @type {State} */

      function fenceOpenInside(code) {
        if (code === 35 && size++ < 6) {
          effects.consume(code);
          return fenceOpenInside
        }

        if (code === null || markdownLineEndingOrSpace(code)) {
          effects.exit('atxHeadingSequence');
          return self.interrupt ? ok(code) : headingBreak(code)
        }

        return nok(code)
      }
      /** @type {State} */

      function headingBreak(code) {
        if (code === 35) {
          effects.enter('atxHeadingSequence');
          return sequence(code)
        }

        if (code === null || markdownLineEnding(code)) {
          effects.exit('atxHeading');
          return ok(code)
        }

        if (markdownSpace(code)) {
          return factorySpace(effects, headingBreak, 'whitespace')(code)
        }

        effects.enter('atxHeadingText');
        return data(code)
      }
      /** @type {State} */

      function sequence(code) {
        if (code === 35) {
          effects.consume(code);
          return sequence
        }

        effects.exit('atxHeadingSequence');
        return headingBreak(code)
      }
      /** @type {State} */

      function data(code) {
        if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
          effects.exit('atxHeadingText');
          return headingBreak(code)
        }

        effects.consume(code);
        return data
      }
    }

    /**
     * List of lowercase HTML tag names which when parsing HTML (flow), result
     * in more relaxed rules (condition 6): because they are known blocks, the
     * HTML-like syntax doesn’t have to be strictly parsed.
     * For tag names not in this list, a more strict algorithm (condition 7) is used
     * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
     *
     * This is copied from:
     * <https://spec.commonmark.org/0.30/#html-blocks>.
     */
    const htmlBlockNames = [
      'address',
      'article',
      'aside',
      'base',
      'basefont',
      'blockquote',
      'body',
      'caption',
      'center',
      'col',
      'colgroup',
      'dd',
      'details',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'frame',
      'frameset',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hr',
      'html',
      'iframe',
      'legend',
      'li',
      'link',
      'main',
      'menu',
      'menuitem',
      'nav',
      'noframes',
      'ol',
      'optgroup',
      'option',
      'p',
      'param',
      'section',
      'summary',
      'table',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'title',
      'tr',
      'track',
      'ul'
    ];

    /**
     * List of lowercase HTML tag names which when parsing HTML (flow), result in
     * HTML that can include lines w/o exiting, until a closing tag also in this
     * list is found (condition 1).
     *
     * This module is copied from:
     * <https://spec.commonmark.org/0.30/#html-blocks>.
     *
     * Note that `textarea` was added in `CommonMark@0.30`.
     */
    const htmlRawNames = ['pre', 'script', 'style', 'textarea'];

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */
    /** @type {Construct} */

    const htmlFlow = {
      name: 'htmlFlow',
      tokenize: tokenizeHtmlFlow,
      resolveTo: resolveToHtmlFlow,
      concrete: true
    };
    /** @type {Construct} */

    const nextBlankConstruct = {
      tokenize: tokenizeNextBlank,
      partial: true
    };
    /** @type {Resolver} */

    function resolveToHtmlFlow(events) {
      let index = events.length;

      while (index--) {
        if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
          break
        }
      }

      if (index > 1 && events[index - 2][1].type === 'linePrefix') {
        // Add the prefix start to the HTML token.
        events[index][1].start = events[index - 2][1].start; // Add the prefix start to the HTML line token.

        events[index + 1][1].start = events[index - 2][1].start; // Remove the line prefix.

        events.splice(index - 2, 2);
      }

      return events
    }
    /** @type {Tokenizer} */

    function tokenizeHtmlFlow(effects, ok, nok) {
      const self = this;
      /** @type {number} */

      let kind;
      /** @type {boolean} */

      let startTag;
      /** @type {string} */

      let buffer;
      /** @type {number} */

      let index;
      /** @type {Code} */

      let marker;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('htmlFlow');
        effects.enter('htmlFlowData');
        effects.consume(code);
        return open
      }
      /** @type {State} */

      function open(code) {
        if (code === 33) {
          effects.consume(code);
          return declarationStart
        }

        if (code === 47) {
          effects.consume(code);
          return tagCloseStart
        }

        if (code === 63) {
          effects.consume(code);
          kind = 3; // While we’re in an instruction instead of a declaration, we’re on a `?`
          // right now, so we do need to search for `>`, similar to declarations.

          return self.interrupt ? ok : continuationDeclarationInside
        }

        if (asciiAlpha(code)) {
          effects.consume(code);
          buffer = String.fromCharCode(code);
          startTag = true;
          return tagName
        }

        return nok(code)
      }
      /** @type {State} */

      function declarationStart(code) {
        if (code === 45) {
          effects.consume(code);
          kind = 2;
          return commentOpenInside
        }

        if (code === 91) {
          effects.consume(code);
          kind = 5;
          buffer = 'CDATA[';
          index = 0;
          return cdataOpenInside
        }

        if (asciiAlpha(code)) {
          effects.consume(code);
          kind = 4;
          return self.interrupt ? ok : continuationDeclarationInside
        }

        return nok(code)
      }
      /** @type {State} */

      function commentOpenInside(code) {
        if (code === 45) {
          effects.consume(code);
          return self.interrupt ? ok : continuationDeclarationInside
        }

        return nok(code)
      }
      /** @type {State} */

      function cdataOpenInside(code) {
        if (code === buffer.charCodeAt(index++)) {
          effects.consume(code);
          return index === buffer.length
            ? self.interrupt
              ? ok
              : continuation
            : cdataOpenInside
        }

        return nok(code)
      }
      /** @type {State} */

      function tagCloseStart(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          buffer = String.fromCharCode(code);
          return tagName
        }

        return nok(code)
      }
      /** @type {State} */

      function tagName(code) {
        if (
          code === null ||
          code === 47 ||
          code === 62 ||
          markdownLineEndingOrSpace(code)
        ) {
          if (
            code !== 47 &&
            startTag &&
            htmlRawNames.includes(buffer.toLowerCase())
          ) {
            kind = 1;
            return self.interrupt ? ok(code) : continuation(code)
          }

          if (htmlBlockNames.includes(buffer.toLowerCase())) {
            kind = 6;

            if (code === 47) {
              effects.consume(code);
              return basicSelfClosing
            }

            return self.interrupt ? ok(code) : continuation(code)
          }

          kind = 7; // Do not support complete HTML when interrupting

          return self.interrupt && !self.parser.lazy[self.now().line]
            ? nok(code)
            : startTag
            ? completeAttributeNameBefore(code)
            : completeClosingTagAfter(code)
        }

        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          buffer += String.fromCharCode(code);
          return tagName
        }

        return nok(code)
      }
      /** @type {State} */

      function basicSelfClosing(code) {
        if (code === 62) {
          effects.consume(code);
          return self.interrupt ? ok : continuation
        }

        return nok(code)
      }
      /** @type {State} */

      function completeClosingTagAfter(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeClosingTagAfter
        }

        return completeEnd(code)
      }
      /** @type {State} */

      function completeAttributeNameBefore(code) {
        if (code === 47) {
          effects.consume(code);
          return completeEnd
        }

        if (code === 58 || code === 95 || asciiAlpha(code)) {
          effects.consume(code);
          return completeAttributeName
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeNameBefore
        }

        return completeEnd(code)
      }
      /** @type {State} */

      function completeAttributeName(code) {
        if (
          code === 45 ||
          code === 46 ||
          code === 58 ||
          code === 95 ||
          asciiAlphanumeric(code)
        ) {
          effects.consume(code);
          return completeAttributeName
        }

        return completeAttributeNameAfter(code)
      }
      /** @type {State} */

      function completeAttributeNameAfter(code) {
        if (code === 61) {
          effects.consume(code);
          return completeAttributeValueBefore
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeNameAfter
        }

        return completeAttributeNameBefore(code)
      }
      /** @type {State} */

      function completeAttributeValueBefore(code) {
        if (
          code === null ||
          code === 60 ||
          code === 61 ||
          code === 62 ||
          code === 96
        ) {
          return nok(code)
        }

        if (code === 34 || code === 39) {
          effects.consume(code);
          marker = code;
          return completeAttributeValueQuoted
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeValueBefore
        }

        marker = null;
        return completeAttributeValueUnquoted(code)
      }
      /** @type {State} */

      function completeAttributeValueQuoted(code) {
        if (code === null || markdownLineEnding(code)) {
          return nok(code)
        }

        if (code === marker) {
          effects.consume(code);
          return completeAttributeValueQuotedAfter
        }

        effects.consume(code);
        return completeAttributeValueQuoted
      }
      /** @type {State} */

      function completeAttributeValueUnquoted(code) {
        if (
          code === null ||
          code === 34 ||
          code === 39 ||
          code === 60 ||
          code === 61 ||
          code === 62 ||
          code === 96 ||
          markdownLineEndingOrSpace(code)
        ) {
          return completeAttributeNameAfter(code)
        }

        effects.consume(code);
        return completeAttributeValueUnquoted
      }
      /** @type {State} */

      function completeAttributeValueQuotedAfter(code) {
        if (code === 47 || code === 62 || markdownSpace(code)) {
          return completeAttributeNameBefore(code)
        }

        return nok(code)
      }
      /** @type {State} */

      function completeEnd(code) {
        if (code === 62) {
          effects.consume(code);
          return completeAfter
        }

        return nok(code)
      }
      /** @type {State} */

      function completeAfter(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAfter
        }

        return code === null || markdownLineEnding(code)
          ? continuation(code)
          : nok(code)
      }
      /** @type {State} */

      function continuation(code) {
        if (code === 45 && kind === 2) {
          effects.consume(code);
          return continuationCommentInside
        }

        if (code === 60 && kind === 1) {
          effects.consume(code);
          return continuationRawTagOpen
        }

        if (code === 62 && kind === 4) {
          effects.consume(code);
          return continuationClose
        }

        if (code === 63 && kind === 3) {
          effects.consume(code);
          return continuationDeclarationInside
        }

        if (code === 93 && kind === 5) {
          effects.consume(code);
          return continuationCharacterDataInside
        }

        if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
          return effects.check(
            nextBlankConstruct,
            continuationClose,
            continuationAtLineEnding
          )(code)
        }

        if (code === null || markdownLineEnding(code)) {
          return continuationAtLineEnding(code)
        }

        effects.consume(code);
        return continuation
      }
      /** @type {State} */

      function continuationAtLineEnding(code) {
        effects.exit('htmlFlowData');
        return htmlContinueStart(code)
      }
      /** @type {State} */

      function htmlContinueStart(code) {
        if (code === null) {
          return done(code)
        }

        if (markdownLineEnding(code)) {
          return effects.attempt(
            {
              tokenize: htmlLineEnd,
              partial: true
            },
            htmlContinueStart,
            done
          )(code)
        }

        effects.enter('htmlFlowData');
        return continuation(code)
      }
      /** @type {Tokenizer} */

      function htmlLineEnd(effects, ok, nok) {
        return start
        /** @type {State} */

        function start(code) {
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          return lineStart
        }
        /** @type {State} */

        function lineStart(code) {
          return self.parser.lazy[self.now().line] ? nok(code) : ok(code)
        }
      }
      /** @type {State} */

      function continuationCommentInside(code) {
        if (code === 45) {
          effects.consume(code);
          return continuationDeclarationInside
        }

        return continuation(code)
      }
      /** @type {State} */

      function continuationRawTagOpen(code) {
        if (code === 47) {
          effects.consume(code);
          buffer = '';
          return continuationRawEndTag
        }

        return continuation(code)
      }
      /** @type {State} */

      function continuationRawEndTag(code) {
        if (code === 62 && htmlRawNames.includes(buffer.toLowerCase())) {
          effects.consume(code);
          return continuationClose
        }

        if (asciiAlpha(code) && buffer.length < 8) {
          effects.consume(code);
          buffer += String.fromCharCode(code);
          return continuationRawEndTag
        }

        return continuation(code)
      }
      /** @type {State} */

      function continuationCharacterDataInside(code) {
        if (code === 93) {
          effects.consume(code);
          return continuationDeclarationInside
        }

        return continuation(code)
      }
      /** @type {State} */

      function continuationDeclarationInside(code) {
        if (code === 62) {
          effects.consume(code);
          return continuationClose
        } // More dashes.

        if (code === 45 && kind === 2) {
          effects.consume(code);
          return continuationDeclarationInside
        }

        return continuation(code)
      }
      /** @type {State} */

      function continuationClose(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit('htmlFlowData');
          return done(code)
        }

        effects.consume(code);
        return continuationClose
      }
      /** @type {State} */

      function done(code) {
        effects.exit('htmlFlow');
        return ok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeNextBlank(effects, ok, nok) {
      return start
      /** @type {State} */

      function start(code) {
        effects.exit('htmlFlowData');
        effects.enter('lineEndingBlank');
        effects.consume(code);
        effects.exit('lineEndingBlank');
        return effects.attempt(blankLine, ok, nok)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /** @type {Construct} */
    const htmlText = {
      name: 'htmlText',
      tokenize: tokenizeHtmlText
    };
    /** @type {Tokenizer} */

    function tokenizeHtmlText(effects, ok, nok) {
      const self = this;
      /** @type {NonNullable<Code>|undefined} */

      let marker;
      /** @type {string} */

      let buffer;
      /** @type {number} */

      let index;
      /** @type {State} */

      let returnState;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('htmlText');
        effects.enter('htmlTextData');
        effects.consume(code);
        return open
      }
      /** @type {State} */

      function open(code) {
        if (code === 33) {
          effects.consume(code);
          return declarationOpen
        }

        if (code === 47) {
          effects.consume(code);
          return tagCloseStart
        }

        if (code === 63) {
          effects.consume(code);
          return instruction
        }

        if (asciiAlpha(code)) {
          effects.consume(code);
          return tagOpen
        }

        return nok(code)
      }
      /** @type {State} */

      function declarationOpen(code) {
        if (code === 45) {
          effects.consume(code);
          return commentOpen
        }

        if (code === 91) {
          effects.consume(code);
          buffer = 'CDATA[';
          index = 0;
          return cdataOpen
        }

        if (asciiAlpha(code)) {
          effects.consume(code);
          return declaration
        }

        return nok(code)
      }
      /** @type {State} */

      function commentOpen(code) {
        if (code === 45) {
          effects.consume(code);
          return commentStart
        }

        return nok(code)
      }
      /** @type {State} */

      function commentStart(code) {
        if (code === null || code === 62) {
          return nok(code)
        }

        if (code === 45) {
          effects.consume(code);
          return commentStartDash
        }

        return comment(code)
      }
      /** @type {State} */

      function commentStartDash(code) {
        if (code === null || code === 62) {
          return nok(code)
        }

        return comment(code)
      }
      /** @type {State} */

      function comment(code) {
        if (code === null) {
          return nok(code)
        }

        if (code === 45) {
          effects.consume(code);
          return commentClose
        }

        if (markdownLineEnding(code)) {
          returnState = comment;
          return atLineEnding(code)
        }

        effects.consume(code);
        return comment
      }
      /** @type {State} */

      function commentClose(code) {
        if (code === 45) {
          effects.consume(code);
          return end
        }

        return comment(code)
      }
      /** @type {State} */

      function cdataOpen(code) {
        if (code === buffer.charCodeAt(index++)) {
          effects.consume(code);
          return index === buffer.length ? cdata : cdataOpen
        }

        return nok(code)
      }
      /** @type {State} */

      function cdata(code) {
        if (code === null) {
          return nok(code)
        }

        if (code === 93) {
          effects.consume(code);
          return cdataClose
        }

        if (markdownLineEnding(code)) {
          returnState = cdata;
          return atLineEnding(code)
        }

        effects.consume(code);
        return cdata
      }
      /** @type {State} */

      function cdataClose(code) {
        if (code === 93) {
          effects.consume(code);
          return cdataEnd
        }

        return cdata(code)
      }
      /** @type {State} */

      function cdataEnd(code) {
        if (code === 62) {
          return end(code)
        }

        if (code === 93) {
          effects.consume(code);
          return cdataEnd
        }

        return cdata(code)
      }
      /** @type {State} */

      function declaration(code) {
        if (code === null || code === 62) {
          return end(code)
        }

        if (markdownLineEnding(code)) {
          returnState = declaration;
          return atLineEnding(code)
        }

        effects.consume(code);
        return declaration
      }
      /** @type {State} */

      function instruction(code) {
        if (code === null) {
          return nok(code)
        }

        if (code === 63) {
          effects.consume(code);
          return instructionClose
        }

        if (markdownLineEnding(code)) {
          returnState = instruction;
          return atLineEnding(code)
        }

        effects.consume(code);
        return instruction
      }
      /** @type {State} */

      function instructionClose(code) {
        return code === 62 ? end(code) : instruction(code)
      }
      /** @type {State} */

      function tagCloseStart(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          return tagClose
        }

        return nok(code)
      }
      /** @type {State} */

      function tagClose(code) {
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagClose
        }

        return tagCloseBetween(code)
      }
      /** @type {State} */

      function tagCloseBetween(code) {
        if (markdownLineEnding(code)) {
          returnState = tagCloseBetween;
          return atLineEnding(code)
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return tagCloseBetween
        }

        return end(code)
      }
      /** @type {State} */

      function tagOpen(code) {
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagOpen
        }

        if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code)
        }

        return nok(code)
      }
      /** @type {State} */

      function tagOpenBetween(code) {
        if (code === 47) {
          effects.consume(code);
          return end
        }

        if (code === 58 || code === 95 || asciiAlpha(code)) {
          effects.consume(code);
          return tagOpenAttributeName
        }

        if (markdownLineEnding(code)) {
          returnState = tagOpenBetween;
          return atLineEnding(code)
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenBetween
        }

        return end(code)
      }
      /** @type {State} */

      function tagOpenAttributeName(code) {
        if (
          code === 45 ||
          code === 46 ||
          code === 58 ||
          code === 95 ||
          asciiAlphanumeric(code)
        ) {
          effects.consume(code);
          return tagOpenAttributeName
        }

        return tagOpenAttributeNameAfter(code)
      }
      /** @type {State} */

      function tagOpenAttributeNameAfter(code) {
        if (code === 61) {
          effects.consume(code);
          return tagOpenAttributeValueBefore
        }

        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeNameAfter;
          return atLineEnding(code)
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenAttributeNameAfter
        }

        return tagOpenBetween(code)
      }
      /** @type {State} */

      function tagOpenAttributeValueBefore(code) {
        if (
          code === null ||
          code === 60 ||
          code === 61 ||
          code === 62 ||
          code === 96
        ) {
          return nok(code)
        }

        if (code === 34 || code === 39) {
          effects.consume(code);
          marker = code;
          return tagOpenAttributeValueQuoted
        }

        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeValueBefore;
          return atLineEnding(code)
        }

        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenAttributeValueBefore
        }

        effects.consume(code);
        marker = undefined;
        return tagOpenAttributeValueUnquoted
      }
      /** @type {State} */

      function tagOpenAttributeValueQuoted(code) {
        if (code === marker) {
          effects.consume(code);
          return tagOpenAttributeValueQuotedAfter
        }

        if (code === null) {
          return nok(code)
        }

        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeValueQuoted;
          return atLineEnding(code)
        }

        effects.consume(code);
        return tagOpenAttributeValueQuoted
      }
      /** @type {State} */

      function tagOpenAttributeValueQuotedAfter(code) {
        if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code)
        }

        return nok(code)
      }
      /** @type {State} */

      function tagOpenAttributeValueUnquoted(code) {
        if (
          code === null ||
          code === 34 ||
          code === 39 ||
          code === 60 ||
          code === 61 ||
          code === 96
        ) {
          return nok(code)
        }

        if (code === 62 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code)
        }

        effects.consume(code);
        return tagOpenAttributeValueUnquoted
      } // We can’t have blank lines in content, so no need to worry about empty
      // tokens.

      /** @type {State} */

      function atLineEnding(code) {
        effects.exit('htmlTextData');
        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        return factorySpace(
          effects,
          afterPrefix,
          'linePrefix',
          self.parser.constructs.disable.null.includes('codeIndented')
            ? undefined
            : 4
        )
      }
      /** @type {State} */

      function afterPrefix(code) {
        effects.enter('htmlTextData');
        return returnState(code)
      }
      /** @type {State} */

      function end(code) {
        if (code === 62) {
          effects.consume(code);
          effects.exit('htmlTextData');
          effects.exit('htmlText');
          return ok
        }

        return nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').Event} Event
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /** @type {Construct} */
    const labelEnd = {
      name: 'labelEnd',
      tokenize: tokenizeLabelEnd,
      resolveTo: resolveToLabelEnd,
      resolveAll: resolveAllLabelEnd
    };
    /** @type {Construct} */

    const resourceConstruct = {
      tokenize: tokenizeResource
    };
    /** @type {Construct} */

    const fullReferenceConstruct = {
      tokenize: tokenizeFullReference
    };
    /** @type {Construct} */

    const collapsedReferenceConstruct = {
      tokenize: tokenizeCollapsedReference
    };
    /** @type {Resolver} */

    function resolveAllLabelEnd(events) {
      let index = -1;
      /** @type {Token} */

      let token;

      while (++index < events.length) {
        token = events[index][1];

        if (
          token.type === 'labelImage' ||
          token.type === 'labelLink' ||
          token.type === 'labelEnd'
        ) {
          // Remove the marker.
          events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
          token.type = 'data';
          index++;
        }
      }

      return events
    }
    /** @type {Resolver} */

    function resolveToLabelEnd(events, context) {
      let index = events.length;
      let offset = 0;
      /** @type {Token} */

      let token;
      /** @type {number|undefined} */

      let open;
      /** @type {number|undefined} */

      let close;
      /** @type {Event[]} */

      let media; // Find an opening.

      while (index--) {
        token = events[index][1];

        if (open) {
          // If we see another link, or inactive link label, we’ve been here before.
          if (
            token.type === 'link' ||
            (token.type === 'labelLink' && token._inactive)
          ) {
            break
          } // Mark other link openings as inactive, as we can’t have links in
          // links.

          if (events[index][0] === 'enter' && token.type === 'labelLink') {
            token._inactive = true;
          }
        } else if (close) {
          if (
            events[index][0] === 'enter' &&
            (token.type === 'labelImage' || token.type === 'labelLink') &&
            !token._balanced
          ) {
            open = index;

            if (token.type !== 'labelLink') {
              offset = 2;
              break
            }
          }
        } else if (token.type === 'labelEnd') {
          close = index;
        }
      }

      const group = {
        type: events[open][1].type === 'labelLink' ? 'link' : 'image',
        start: Object.assign({}, events[open][1].start),
        end: Object.assign({}, events[events.length - 1][1].end)
      };
      const label = {
        type: 'label',
        start: Object.assign({}, events[open][1].start),
        end: Object.assign({}, events[close][1].end)
      };
      const text = {
        type: 'labelText',
        start: Object.assign({}, events[open + offset + 2][1].end),
        end: Object.assign({}, events[close - 2][1].start)
      };
      media = [
        ['enter', group, context],
        ['enter', label, context]
      ]; // Opening marker.

      media = push(media, events.slice(open + 1, open + offset + 3)); // Text open.

      media = push(media, [['enter', text, context]]); // Between.

      media = push(
        media,
        resolveAll(
          context.parser.constructs.insideSpan.null,
          events.slice(open + offset + 4, close - 3),
          context
        )
      ); // Text close, marker close, label close.

      media = push(media, [
        ['exit', text, context],
        events[close - 2],
        events[close - 1],
        ['exit', label, context]
      ]); // Reference, resource, or so.

      media = push(media, events.slice(close + 1)); // Media close.

      media = push(media, [['exit', group, context]]);
      splice(events, open, events.length, media);
      return events
    }
    /** @type {Tokenizer} */

    function tokenizeLabelEnd(effects, ok, nok) {
      const self = this;
      let index = self.events.length;
      /** @type {Token} */

      let labelStart;
      /** @type {boolean} */

      let defined; // Find an opening.

      while (index--) {
        if (
          (self.events[index][1].type === 'labelImage' ||
            self.events[index][1].type === 'labelLink') &&
          !self.events[index][1]._balanced
        ) {
          labelStart = self.events[index][1];
          break
        }
      }

      return start
      /** @type {State} */

      function start(code) {
        if (!labelStart) {
          return nok(code)
        } // It’s a balanced bracket, but contains a link.

        if (labelStart._inactive) return balanced(code)
        defined = self.parser.defined.includes(
          normalizeIdentifier(
            self.sliceSerialize({
              start: labelStart.end,
              end: self.now()
            })
          )
        );
        effects.enter('labelEnd');
        effects.enter('labelMarker');
        effects.consume(code);
        effects.exit('labelMarker');
        effects.exit('labelEnd');
        return afterLabelEnd
      }
      /** @type {State} */

      function afterLabelEnd(code) {
        // Resource: `[asd](fgh)`.
        if (code === 40) {
          return effects.attempt(
            resourceConstruct,
            ok,
            defined ? ok : balanced
          )(code)
        } // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?

        if (code === 91) {
          return effects.attempt(
            fullReferenceConstruct,
            ok,
            defined
              ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
              : balanced
          )(code)
        } // Shortcut reference: `[asd]`?

        return defined ? ok(code) : balanced(code)
      }
      /** @type {State} */

      function balanced(code) {
        labelStart._balanced = true;
        return nok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeResource(effects, ok, nok) {
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('resource');
        effects.enter('resourceMarker');
        effects.consume(code);
        effects.exit('resourceMarker');
        return factoryWhitespace(effects, open)
      }
      /** @type {State} */

      function open(code) {
        if (code === 41) {
          return end(code)
        }

        return factoryDestination(
          effects,
          destinationAfter,
          nok,
          'resourceDestination',
          'resourceDestinationLiteral',
          'resourceDestinationLiteralMarker',
          'resourceDestinationRaw',
          'resourceDestinationString',
          32
        )(code)
      }
      /** @type {State} */

      function destinationAfter(code) {
        return markdownLineEndingOrSpace(code)
          ? factoryWhitespace(effects, between)(code)
          : end(code)
      }
      /** @type {State} */

      function between(code) {
        if (code === 34 || code === 39 || code === 40) {
          return factoryTitle(
            effects,
            factoryWhitespace(effects, end),
            nok,
            'resourceTitle',
            'resourceTitleMarker',
            'resourceTitleString'
          )(code)
        }

        return end(code)
      }
      /** @type {State} */

      function end(code) {
        if (code === 41) {
          effects.enter('resourceMarker');
          effects.consume(code);
          effects.exit('resourceMarker');
          effects.exit('resource');
          return ok
        }

        return nok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeFullReference(effects, ok, nok) {
      const self = this;
      return start
      /** @type {State} */

      function start(code) {
        return factoryLabel.call(
          self,
          effects,
          afterLabel,
          nok,
          'reference',
          'referenceMarker',
          'referenceString'
        )(code)
      }
      /** @type {State} */

      function afterLabel(code) {
        return self.parser.defined.includes(
          normalizeIdentifier(
            self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
          )
        )
          ? ok(code)
          : nok(code)
      }
    }
    /** @type {Tokenizer} */

    function tokenizeCollapsedReference(effects, ok, nok) {
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('reference');
        effects.enter('referenceMarker');
        effects.consume(code);
        effects.exit('referenceMarker');
        return open
      }
      /** @type {State} */

      function open(code) {
        if (code === 93) {
          effects.enter('referenceMarker');
          effects.consume(code);
          effects.exit('referenceMarker');
          effects.exit('reference');
          return ok
        }

        return nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */
    /** @type {Construct} */

    const labelStartImage = {
      name: 'labelStartImage',
      tokenize: tokenizeLabelStartImage,
      resolveAll: labelEnd.resolveAll
    };
    /** @type {Tokenizer} */

    function tokenizeLabelStartImage(effects, ok, nok) {
      const self = this;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('labelImage');
        effects.enter('labelImageMarker');
        effects.consume(code);
        effects.exit('labelImageMarker');
        return open
      }
      /** @type {State} */

      function open(code) {
        if (code === 91) {
          effects.enter('labelMarker');
          effects.consume(code);
          effects.exit('labelMarker');
          effects.exit('labelImage');
          return after
        }

        return nok(code)
      }
      /** @type {State} */

      function after(code) {
        /* To do: remove in the future once we’ve switched from
         * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
         * which doesn’t need this */

        /* Hidden footnotes hook */

        /* c8 ignore next 3 */
        return code === 94 && '_hiddenFootnoteSupport' in self.parser.constructs
          ? nok(code)
          : ok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */
    /** @type {Construct} */

    const labelStartLink = {
      name: 'labelStartLink',
      tokenize: tokenizeLabelStartLink,
      resolveAll: labelEnd.resolveAll
    };
    /** @type {Tokenizer} */

    function tokenizeLabelStartLink(effects, ok, nok) {
      const self = this;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('labelLink');
        effects.enter('labelMarker');
        effects.consume(code);
        effects.exit('labelMarker');
        effects.exit('labelLink');
        return after
      }
      /** @type {State} */

      function after(code) {
        /* To do: remove in the future once we’ve switched from
         * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
         * which doesn’t need this */

        /* Hidden footnotes hook. */

        /* c8 ignore next 3 */
        return code === 94 && '_hiddenFootnoteSupport' in self.parser.constructs
          ? nok(code)
          : ok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {Construct} */
    const lineEnding = {
      name: 'lineEnding',
      tokenize: tokenizeLineEnding
    };
    /** @type {Tokenizer} */

    function tokenizeLineEnding(effects, ok) {
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        return factorySpace(effects, ok, 'linePrefix')
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /** @type {Construct} */
    const thematicBreak$1 = {
      name: 'thematicBreak',
      tokenize: tokenizeThematicBreak
    };
    /** @type {Tokenizer} */

    function tokenizeThematicBreak(effects, ok, nok) {
      let size = 0;
      /** @type {NonNullable<Code>} */

      let marker;
      return start
      /** @type {State} */

      function start(code) {
        effects.enter('thematicBreak');
        marker = code;
        return atBreak(code)
      }
      /** @type {State} */

      function atBreak(code) {
        if (code === marker) {
          effects.enter('thematicBreakSequence');
          return sequence(code)
        }

        if (markdownSpace(code)) {
          return factorySpace(effects, atBreak, 'whitespace')(code)
        }

        if (size < 3 || (code !== null && !markdownLineEnding(code))) {
          return nok(code)
        }

        effects.exit('thematicBreak');
        return ok(code)
      }
      /** @type {State} */

      function sequence(code) {
        if (code === marker) {
          effects.consume(code);
          size++;
          return sequence
        }

        effects.exit('thematicBreakSequence');
        return atBreak(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
     * @typedef {import('micromark-util-types').Exiter} Exiter
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */
    /** @type {Construct} */

    const list$1 = {
      name: 'list',
      tokenize: tokenizeListStart,
      continuation: {
        tokenize: tokenizeListContinuation
      },
      exit: tokenizeListEnd
    };
    /** @type {Construct} */

    const listItemPrefixWhitespaceConstruct = {
      tokenize: tokenizeListItemPrefixWhitespace,
      partial: true
    };
    /** @type {Construct} */

    const indentConstruct = {
      tokenize: tokenizeIndent,
      partial: true
    };
    /**
     * @type {Tokenizer}
     * @this {TokenizeContextWithState}
     */

    function tokenizeListStart(effects, ok, nok) {
      const self = this;
      const tail = self.events[self.events.length - 1];
      let initialSize =
        tail && tail[1].type === 'linePrefix'
          ? tail[2].sliceSerialize(tail[1], true).length
          : 0;
      let size = 0;
      return start
      /** @type {State} */

      function start(code) {
        const kind =
          self.containerState.type ||
          (code === 42 || code === 43 || code === 45
            ? 'listUnordered'
            : 'listOrdered');

        if (
          kind === 'listUnordered'
            ? !self.containerState.marker || code === self.containerState.marker
            : asciiDigit(code)
        ) {
          if (!self.containerState.type) {
            self.containerState.type = kind;
            effects.enter(kind, {
              _container: true
            });
          }

          if (kind === 'listUnordered') {
            effects.enter('listItemPrefix');
            return code === 42 || code === 45
              ? effects.check(thematicBreak$1, nok, atMarker)(code)
              : atMarker(code)
          }

          if (!self.interrupt || code === 49) {
            effects.enter('listItemPrefix');
            effects.enter('listItemValue');
            return inside(code)
          }
        }

        return nok(code)
      }
      /** @type {State} */

      function inside(code) {
        if (asciiDigit(code) && ++size < 10) {
          effects.consume(code);
          return inside
        }

        if (
          (!self.interrupt || size < 2) &&
          (self.containerState.marker
            ? code === self.containerState.marker
            : code === 41 || code === 46)
        ) {
          effects.exit('listItemValue');
          return atMarker(code)
        }

        return nok(code)
      }
      /**
       * @type {State}
       **/

      function atMarker(code) {
        effects.enter('listItemMarker');
        effects.consume(code);
        effects.exit('listItemMarker');
        self.containerState.marker = self.containerState.marker || code;
        return effects.check(
          blankLine, // Can’t be empty when interrupting.
          self.interrupt ? nok : onBlank,
          effects.attempt(
            listItemPrefixWhitespaceConstruct,
            endOfPrefix,
            otherPrefix
          )
        )
      }
      /** @type {State} */

      function onBlank(code) {
        self.containerState.initialBlankLine = true;
        initialSize++;
        return endOfPrefix(code)
      }
      /** @type {State} */

      function otherPrefix(code) {
        if (markdownSpace(code)) {
          effects.enter('listItemPrefixWhitespace');
          effects.consume(code);
          effects.exit('listItemPrefixWhitespace');
          return endOfPrefix
        }

        return nok(code)
      }
      /** @type {State} */

      function endOfPrefix(code) {
        self.containerState.size =
          initialSize +
          self.sliceSerialize(effects.exit('listItemPrefix'), true).length;
        return ok(code)
      }
    }
    /**
     * @type {Tokenizer}
     * @this {TokenizeContextWithState}
     */

    function tokenizeListContinuation(effects, ok, nok) {
      const self = this;
      self.containerState._closeFlow = undefined;
      return effects.check(blankLine, onBlank, notBlank)
      /** @type {State} */

      function onBlank(code) {
        self.containerState.furtherBlankLines =
          self.containerState.furtherBlankLines ||
          self.containerState.initialBlankLine; // We have a blank line.
        // Still, try to consume at most the items size.

        return factorySpace(
          effects,
          ok,
          'listItemIndent',
          self.containerState.size + 1
        )(code)
      }
      /** @type {State} */

      function notBlank(code) {
        if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
          self.containerState.furtherBlankLines = undefined;
          self.containerState.initialBlankLine = undefined;
          return notInCurrentItem(code)
        }

        self.containerState.furtherBlankLines = undefined;
        self.containerState.initialBlankLine = undefined;
        return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
      }
      /** @type {State} */

      function notInCurrentItem(code) {
        // While we do continue, we signal that the flow should be closed.
        self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

        self.interrupt = undefined;
        return factorySpace(
          effects,
          effects.attempt(list$1, ok, nok),
          'linePrefix',
          self.parser.constructs.disable.null.includes('codeIndented')
            ? undefined
            : 4
        )(code)
      }
    }
    /**
     * @type {Tokenizer}
     * @this {TokenizeContextWithState}
     */

    function tokenizeIndent(effects, ok, nok) {
      const self = this;
      return factorySpace(
        effects,
        afterPrefix,
        'listItemIndent',
        self.containerState.size + 1
      )
      /** @type {State} */

      function afterPrefix(code) {
        const tail = self.events[self.events.length - 1];
        return tail &&
          tail[1].type === 'listItemIndent' &&
          tail[2].sliceSerialize(tail[1], true).length === self.containerState.size
          ? ok(code)
          : nok(code)
      }
    }
    /**
     * @type {Exiter}
     * @this {TokenizeContextWithState}
     */

    function tokenizeListEnd(effects) {
      effects.exit(this.containerState.type);
    }
    /**
     * @type {Tokenizer}
     * @this {TokenizeContextWithState}
     */

    function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
      const self = this;
      return factorySpace(
        effects,
        afterPrefix,
        'listItemPrefixWhitespace',
        self.parser.constructs.disable.null.includes('codeIndented')
          ? undefined
          : 4 + 1
      )
      /** @type {State} */

      function afterPrefix(code) {
        const tail = self.events[self.events.length - 1];
        return !markdownSpace(code) &&
          tail &&
          tail[1].type === 'listItemPrefixWhitespace'
          ? ok(code)
          : nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */

    /** @type {Construct} */
    const setextUnderline = {
      name: 'setextUnderline',
      tokenize: tokenizeSetextUnderline,
      resolveTo: resolveToSetextUnderline
    };
    /** @type {Resolver} */

    function resolveToSetextUnderline(events, context) {
      let index = events.length;
      /** @type {number|undefined} */

      let content;
      /** @type {number|undefined} */

      let text;
      /** @type {number|undefined} */

      let definition; // Find the opening of the content.
      // It’ll always exist: we don’t tokenize if it isn’t there.

      while (index--) {
        if (events[index][0] === 'enter') {
          if (events[index][1].type === 'content') {
            content = index;
            break
          }

          if (events[index][1].type === 'paragraph') {
            text = index;
          }
        } // Exit
        else {
          if (events[index][1].type === 'content') {
            // Remove the content end (if needed we’ll add it later)
            events.splice(index, 1);
          }

          if (!definition && events[index][1].type === 'definition') {
            definition = index;
          }
        }
      }

      const heading = {
        type: 'setextHeading',
        start: Object.assign({}, events[text][1].start),
        end: Object.assign({}, events[events.length - 1][1].end)
      }; // Change the paragraph to setext heading text.

      events[text][1].type = 'setextHeadingText'; // If we have definitions in the content, we’ll keep on having content,
      // but we need move it.

      if (definition) {
        events.splice(text, 0, ['enter', heading, context]);
        events.splice(definition + 1, 0, ['exit', events[content][1], context]);
        events[content][1].end = Object.assign({}, events[definition][1].end);
      } else {
        events[content][1] = heading;
      } // Add the heading exit at the end.

      events.push(['exit', heading, context]);
      return events
    }
    /** @type {Tokenizer} */

    function tokenizeSetextUnderline(effects, ok, nok) {
      const self = this;
      let index = self.events.length;
      /** @type {NonNullable<Code>} */

      let marker;
      /** @type {boolean} */

      let paragraph; // Find an opening.

      while (index--) {
        // Skip enter/exit of line ending, line prefix, and content.
        // We can now either have a definition or a paragraph.
        if (
          self.events[index][1].type !== 'lineEnding' &&
          self.events[index][1].type !== 'linePrefix' &&
          self.events[index][1].type !== 'content'
        ) {
          paragraph = self.events[index][1].type === 'paragraph';
          break
        }
      }

      return start
      /** @type {State} */

      function start(code) {
        if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
          effects.enter('setextHeadingLine');
          effects.enter('setextHeadingLineSequence');
          marker = code;
          return closingSequence(code)
        }

        return nok(code)
      }
      /** @type {State} */

      function closingSequence(code) {
        if (code === marker) {
          effects.consume(code);
          return closingSequence
        }

        effects.exit('setextHeadingLineSequence');
        return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code)
      }
      /** @type {State} */

      function closingSequenceEnd(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit('setextHeadingLine');
          return ok(code)
        }

        return nok(code)
      }
    }

    /**
     * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
     * @typedef {import('micromark-util-types').Initializer} Initializer
     * @typedef {import('micromark-util-types').State} State
     */

    /** @type {InitialConstruct} */
    const flow$1 = {
      tokenize: initializeFlow
    };
    /** @type {Initializer} */

    function initializeFlow(effects) {
      const self = this;
      const initial = effects.attempt(
        // Try to parse a blank line.
        blankLine,
        atBlankEnding, // Try to parse initial flow (essentially, only code).
        effects.attempt(
          this.parser.constructs.flowInitial,
          afterConstruct,
          factorySpace(
            effects,
            effects.attempt(
              this.parser.constructs.flow,
              afterConstruct,
              effects.attempt(content, afterConstruct)
            ),
            'linePrefix'
          )
        )
      );
      return initial
      /** @type {State} */

      function atBlankEnding(code) {
        if (code === null) {
          effects.consume(code);
          return
        }

        effects.enter('lineEndingBlank');
        effects.consume(code);
        effects.exit('lineEndingBlank');
        self.currentConstruct = undefined;
        return initial
      }
      /** @type {State} */

      function afterConstruct(code) {
        if (code === null) {
          effects.consume(code);
          return
        }

        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        self.currentConstruct = undefined;
        return initial
      }
    }

    /**
     * @typedef {import('micromark-util-types').Resolver} Resolver
     * @typedef {import('micromark-util-types').Initializer} Initializer
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Code} Code
     */
    const resolver = {
      resolveAll: createResolver()
    };
    const string$1 = initializeFactory('string');
    const text$2 = initializeFactory('text');
    /**
     * @param {'string'|'text'} field
     * @returns {InitialConstruct}
     */

    function initializeFactory(field) {
      return {
        tokenize: initializeText,
        resolveAll: createResolver(
          field === 'text' ? resolveAllLineSuffixes : undefined
        )
      }
      /** @type {Initializer} */

      function initializeText(effects) {
        const self = this;
        const constructs = this.parser.constructs[field];
        const text = effects.attempt(constructs, start, notText);
        return start
        /** @type {State} */

        function start(code) {
          return atBreak(code) ? text(code) : notText(code)
        }
        /** @type {State} */

        function notText(code) {
          if (code === null) {
            effects.consume(code);
            return
          }

          effects.enter('data');
          effects.consume(code);
          return data
        }
        /** @type {State} */

        function data(code) {
          if (atBreak(code)) {
            effects.exit('data');
            return text(code)
          } // Data.

          effects.consume(code);
          return data
        }
        /**
         * @param {Code} code
         * @returns {boolean}
         */

        function atBreak(code) {
          if (code === null) {
            return true
          }

          const list = constructs[code];
          let index = -1;

          if (list) {
            while (++index < list.length) {
              const item = list[index];

              if (!item.previous || item.previous.call(self, self.previous)) {
                return true
              }
            }
          }

          return false
        }
      }
    }
    /**
     * @param {Resolver} [extraResolver]
     * @returns {Resolver}
     */

    function createResolver(extraResolver) {
      return resolveAllText
      /** @type {Resolver} */

      function resolveAllText(events, context) {
        let index = -1;
        /** @type {number|undefined} */

        let enter; // A rather boring computation (to merge adjacent `data` events) which
        // improves mm performance by 29%.

        while (++index <= events.length) {
          if (enter === undefined) {
            if (events[index] && events[index][1].type === 'data') {
              enter = index;
              index++;
            }
          } else if (!events[index] || events[index][1].type !== 'data') {
            // Don’t do anything if there is one data token.
            if (index !== enter + 2) {
              events[enter][1].end = events[index - 1][1].end;
              events.splice(enter + 2, index - enter - 2);
              index = enter + 2;
            }

            enter = undefined;
          }
        }

        return extraResolver ? extraResolver(events, context) : events
      }
    }
    /**
     * A rather ugly set of instructions which again looks at chunks in the input
     * stream.
     * The reason to do this here is that it is *much* faster to parse in reverse.
     * And that we can’t hook into `null` to split the line suffix before an EOF.
     * To do: figure out if we can make this into a clean utility, or even in core.
     * As it will be useful for GFMs literal autolink extension (and maybe even
     * tables?)
     *
     * @type {Resolver}
     */

    function resolveAllLineSuffixes(events, context) {
      let eventIndex = 0; // Skip first.

      while (++eventIndex <= events.length) {
        if (
          (eventIndex === events.length ||
            events[eventIndex][1].type === 'lineEnding') &&
          events[eventIndex - 1][1].type === 'data'
        ) {
          const data = events[eventIndex - 1][1];
          const chunks = context.sliceStream(data);
          let index = chunks.length;
          let bufferIndex = -1;
          let size = 0;
          /** @type {boolean|undefined} */

          let tabs;

          while (index--) {
            const chunk = chunks[index];

            if (typeof chunk === 'string') {
              bufferIndex = chunk.length;

              while (chunk.charCodeAt(bufferIndex - 1) === 32) {
                size++;
                bufferIndex--;
              }

              if (bufferIndex) break
              bufferIndex = -1;
            } // Number
            else if (chunk === -2) {
              tabs = true;
              size++;
            } else if (chunk === -1) ; else {
              // Replacement character, exit.
              index++;
              break
            }
          }

          if (size) {
            const token = {
              type:
                eventIndex === events.length || tabs || size < 2
                  ? 'lineSuffix'
                  : 'hardBreakTrailing',
              start: {
                line: data.end.line,
                column: data.end.column - size,
                offset: data.end.offset - size,
                _index: data.start._index + index,
                _bufferIndex: index
                  ? bufferIndex
                  : data.start._bufferIndex + bufferIndex
              },
              end: Object.assign({}, data.end)
            };
            data.end = Object.assign({}, token.start);

            if (data.start.offset === data.end.offset) {
              Object.assign(data, token);
            } else {
              events.splice(
                eventIndex,
                0,
                ['enter', token, context],
                ['exit', token, context]
              );
              eventIndex += 2;
            }
          }

          eventIndex++;
        }
      }

      return events
    }

    /**
     * @typedef {import('micromark-util-types').Code} Code
     * @typedef {import('micromark-util-types').Chunk} Chunk
     * @typedef {import('micromark-util-types').Point} Point
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').Effects} Effects
     * @typedef {import('micromark-util-types').State} State
     * @typedef {import('micromark-util-types').Construct} Construct
     * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
     * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
     * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
     * @typedef {import('micromark-util-types').ParseContext} ParseContext
     */

    /**
     * Create a tokenizer.
     * Tokenizers deal with one type of data (e.g., containers, flow, text).
     * The parser is the object dealing with it all.
     * `initialize` works like other constructs, except that only its `tokenize`
     * function is used, in which case it doesn’t receive an `ok` or `nok`.
     * `from` can be given to set the point before the first character, although
     * when further lines are indented, they must be set with `defineSkip`.
     *
     * @param {ParseContext} parser
     * @param {InitialConstruct} initialize
     * @param {Omit<Point, '_index'|'_bufferIndex'>} [from]
     * @returns {TokenizeContext}
     */
    function createTokenizer(parser, initialize, from) {
      /** @type {Point} */
      let point = Object.assign(
        from
          ? Object.assign({}, from)
          : {
              line: 1,
              column: 1,
              offset: 0
            },
        {
          _index: 0,
          _bufferIndex: -1
        }
      );
      /** @type {Record<string, number>} */

      const columnStart = {};
      /** @type {Array<Construct>} */

      const resolveAllConstructs = [];
      /** @type {Array<Chunk>} */

      let chunks = [];
      /** @type {Array<Token>} */

      let stack = [];
      /**
       * Tools used for tokenizing.
       *
       * @type {Effects}
       */

      const effects = {
        consume,
        enter,
        exit,
        attempt: constructFactory(onsuccessfulconstruct),
        check: constructFactory(onsuccessfulcheck),
        interrupt: constructFactory(onsuccessfulcheck, {
          interrupt: true
        })
      };
      /**
       * State and tools for resolving and serializing.
       *
       * @type {TokenizeContext}
       */

      const context = {
        previous: null,
        code: null,
        containerState: {},
        events: [],
        parser,
        sliceStream,
        sliceSerialize,
        now,
        defineSkip,
        write
      };
      /**
       * The state function.
       *
       * @type {State|void}
       */

      let state = initialize.tokenize.call(context, effects);

      if (initialize.resolveAll) {
        resolveAllConstructs.push(initialize);
      }

      return context
      /** @type {TokenizeContext['write']} */

      function write(slice) {
        chunks = push(chunks, slice);
        main(); // Exit if we’re not done, resolve might change stuff.

        if (chunks[chunks.length - 1] !== null) {
          return []
        }

        addResult(initialize, 0); // Otherwise, resolve, and exit.

        context.events = resolveAll(resolveAllConstructs, context.events, context);
        return context.events
      } //
      // Tools.
      //

      /** @type {TokenizeContext['sliceSerialize']} */

      function sliceSerialize(token, expandTabs) {
        return serializeChunks(sliceStream(token), expandTabs)
      }
      /** @type {TokenizeContext['sliceStream']} */

      function sliceStream(token) {
        return sliceChunks(chunks, token)
      }
      /** @type {TokenizeContext['now']} */

      function now() {
        return Object.assign({}, point)
      }
      /** @type {TokenizeContext['defineSkip']} */

      function defineSkip(value) {
        columnStart[value.line] = value.column;
        accountForPotentialSkip();
      } //
      // State management.
      //

      /**
       * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
       * `consume`).
       * Here is where we walk through the chunks, which either include strings of
       * several characters, or numerical character codes.
       * The reason to do this in a loop instead of a call is so the stack can
       * drain.
       *
       * @returns {void}
       */

      function main() {
        /** @type {number} */
        let chunkIndex;

        while (point._index < chunks.length) {
          const chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

          if (typeof chunk === 'string') {
            chunkIndex = point._index;

            if (point._bufferIndex < 0) {
              point._bufferIndex = 0;
            }

            while (
              point._index === chunkIndex &&
              point._bufferIndex < chunk.length
            ) {
              go(chunk.charCodeAt(point._bufferIndex));
            }
          } else {
            go(chunk);
          }
        }
      }
      /**
       * Deal with one code.
       *
       * @param {Code} code
       * @returns {void}
       */

      function go(code) {
        state = state(code);
      }
      /** @type {Effects['consume']} */

      function consume(code) {
        if (markdownLineEnding(code)) {
          point.line++;
          point.column = 1;
          point.offset += code === -3 ? 2 : 1;
          accountForPotentialSkip();
        } else if (code !== -1) {
          point.column++;
          point.offset++;
        } // Not in a string chunk.

        if (point._bufferIndex < 0) {
          point._index++;
        } else {
          point._bufferIndex++; // At end of string chunk.
          // @ts-expect-error Points w/ non-negative `_bufferIndex` reference
          // strings.

          if (point._bufferIndex === chunks[point._index].length) {
            point._bufferIndex = -1;
            point._index++;
          }
        } // Expose the previous character.

        context.previous = code; // Mark as consumed.
      }
      /** @type {Effects['enter']} */

      function enter(type, fields) {
        /** @type {Token} */
        // @ts-expect-error Patch instead of assign required fields to help GC.
        const token = fields || {};
        token.type = type;
        token.start = now();
        context.events.push(['enter', token, context]);
        stack.push(token);
        return token
      }
      /** @type {Effects['exit']} */

      function exit(type) {
        const token = stack.pop();
        token.end = now();
        context.events.push(['exit', token, context]);
        return token
      }
      /**
       * Use results.
       *
       * @type {ReturnHandle}
       */

      function onsuccessfulconstruct(construct, info) {
        addResult(construct, info.from);
      }
      /**
       * Discard results.
       *
       * @type {ReturnHandle}
       */

      function onsuccessfulcheck(_, info) {
        info.restore();
      }
      /**
       * Factory to attempt/check/interrupt.
       *
       * @param {ReturnHandle} onreturn
       * @param {Record<string, unknown>} [fields]
       */

      function constructFactory(onreturn, fields) {
        return hook
        /**
         * Handle either an object mapping codes to constructs, a list of
         * constructs, or a single construct.
         *
         * @param {Construct|Array<Construct>|ConstructRecord} constructs
         * @param {State} returnState
         * @param {State} [bogusState]
         * @returns {State}
         */

        function hook(constructs, returnState, bogusState) {
          /** @type {Array<Construct>} */
          let listOfConstructs;
          /** @type {number} */

          let constructIndex;
          /** @type {Construct} */

          let currentConstruct;
          /** @type {Info} */

          let info;
          return Array.isArray(constructs)
            ? /* c8 ignore next 1 */
              handleListOfConstructs(constructs)
            : 'tokenize' in constructs // @ts-expect-error Looks like a construct.
            ? handleListOfConstructs([constructs])
            : handleMapOfConstructs(constructs)
          /**
           * Handle a list of construct.
           *
           * @param {ConstructRecord} map
           * @returns {State}
           */

          function handleMapOfConstructs(map) {
            return start
            /** @type {State} */

            function start(code) {
              const def = code !== null && map[code];
              const all = code !== null && map.null;
              const list = [
                // To do: add more extension tests.

                /* c8 ignore next 2 */
                ...(Array.isArray(def) ? def : def ? [def] : []),
                ...(Array.isArray(all) ? all : all ? [all] : [])
              ];
              return handleListOfConstructs(list)(code)
            }
          }
          /**
           * Handle a list of construct.
           *
           * @param {Array<Construct>} list
           * @returns {State}
           */

          function handleListOfConstructs(list) {
            listOfConstructs = list;
            constructIndex = 0;

            if (list.length === 0) {
              return bogusState
            }

            return handleConstruct(list[constructIndex])
          }
          /**
           * Handle a single construct.
           *
           * @param {Construct} construct
           * @returns {State}
           */

          function handleConstruct(construct) {
            return start
            /** @type {State} */

            function start(code) {
              // To do: not needed to store if there is no bogus state, probably?
              // Currently doesn’t work because `inspect` in document does a check
              // w/o a bogus, which doesn’t make sense. But it does seem to help perf
              // by not storing.
              info = store();
              currentConstruct = construct;

              if (!construct.partial) {
                context.currentConstruct = construct;
              }

              if (
                construct.name &&
                context.parser.constructs.disable.null.includes(construct.name)
              ) {
                return nok()
              }

              return construct.tokenize.call(
                // If we do have fields, create an object w/ `context` as its
                // prototype.
                // This allows a “live binding”, which is needed for `interrupt`.
                fields ? Object.assign(Object.create(context), fields) : context,
                effects,
                ok,
                nok
              )(code)
            }
          }
          /** @type {State} */

          function ok(code) {
            onreturn(currentConstruct, info);
            return returnState
          }
          /** @type {State} */

          function nok(code) {
            info.restore();

            if (++constructIndex < listOfConstructs.length) {
              return handleConstruct(listOfConstructs[constructIndex])
            }

            return bogusState
          }
        }
      }
      /**
       * @param {Construct} construct
       * @param {number} from
       * @returns {void}
       */

      function addResult(construct, from) {
        if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
          resolveAllConstructs.push(construct);
        }

        if (construct.resolve) {
          splice(
            context.events,
            from,
            context.events.length - from,
            construct.resolve(context.events.slice(from), context)
          );
        }

        if (construct.resolveTo) {
          context.events = construct.resolveTo(context.events, context);
        }
      }
      /**
       * Store state.
       *
       * @returns {Info}
       */

      function store() {
        const startPoint = now();
        const startPrevious = context.previous;
        const startCurrentConstruct = context.currentConstruct;
        const startEventsIndex = context.events.length;
        const startStack = Array.from(stack);
        return {
          restore,
          from: startEventsIndex
        }
        /**
         * Restore state.
         *
         * @returns {void}
         */

        function restore() {
          point = startPoint;
          context.previous = startPrevious;
          context.currentConstruct = startCurrentConstruct;
          context.events.length = startEventsIndex;
          stack = startStack;
          accountForPotentialSkip();
        }
      }
      /**
       * Move the current point a bit forward in the line when it’s on a column
       * skip.
       *
       * @returns {void}
       */

      function accountForPotentialSkip() {
        if (point.line in columnStart && point.column < 2) {
          point.column = columnStart[point.line];
          point.offset += columnStart[point.line] - 1;
        }
      }
    }
    /**
     * Get the chunks from a slice of chunks in the range of a token.
     *
     * @param {Array<Chunk>} chunks
     * @param {Pick<Token, 'start'|'end'>} token
     * @returns {Array<Chunk>}
     */

    function sliceChunks(chunks, token) {
      const startIndex = token.start._index;
      const startBufferIndex = token.start._bufferIndex;
      const endIndex = token.end._index;
      const endBufferIndex = token.end._bufferIndex;
      /** @type {Array<Chunk>} */

      let view;

      if (startIndex === endIndex) {
        // @ts-expect-error `_bufferIndex` is used on string chunks.
        view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
      } else {
        view = chunks.slice(startIndex, endIndex);

        if (startBufferIndex > -1) {
          // @ts-expect-error `_bufferIndex` is used on string chunks.
          view[0] = view[0].slice(startBufferIndex);
        }

        if (endBufferIndex > 0) {
          // @ts-expect-error `_bufferIndex` is used on string chunks.
          view.push(chunks[endIndex].slice(0, endBufferIndex));
        }
      }

      return view
    }
    /**
     * Get the string value of a slice of chunks.
     *
     * @param {Array<Chunk>} chunks
     * @param {boolean} [expandTabs=false]
     * @returns {string}
     */

    function serializeChunks(chunks, expandTabs) {
      let index = -1;
      /** @type {Array<string>} */

      const result = [];
      /** @type {boolean|undefined} */

      let atTab;

      while (++index < chunks.length) {
        const chunk = chunks[index];
        /** @type {string} */

        let value;

        if (typeof chunk === 'string') {
          value = chunk;
        } else
          switch (chunk) {
            case -5: {
              value = '\r';
              break
            }

            case -4: {
              value = '\n';
              break
            }

            case -3: {
              value = '\r' + '\n';
              break
            }

            case -2: {
              value = expandTabs ? ' ' : '\t';
              break
            }

            case -1: {
              if (!expandTabs && atTab) continue
              value = ' ';
              break
            }

            default: {
              // Currently only replacement character.
              value = String.fromCharCode(chunk);
            }
          }

        atTab = chunk === -2;
        result.push(value);
      }

      return result.join('')
    }

    /**
     * @typedef {import('micromark-util-types').Extension} Extension
     */
    /** @type {Extension['document']} */

    const document = {
      [42]: list$1,
      [43]: list$1,
      [45]: list$1,
      [48]: list$1,
      [49]: list$1,
      [50]: list$1,
      [51]: list$1,
      [52]: list$1,
      [53]: list$1,
      [54]: list$1,
      [55]: list$1,
      [56]: list$1,
      [57]: list$1,
      [62]: blockQuote
    };
    /** @type {Extension['contentInitial']} */

    const contentInitial = {
      [91]: definition
    };
    /** @type {Extension['flowInitial']} */

    const flowInitial = {
      [-2]: codeIndented,
      [-1]: codeIndented,
      [32]: codeIndented
    };
    /** @type {Extension['flow']} */

    const flow = {
      [35]: headingAtx,
      [42]: thematicBreak$1,
      [45]: [setextUnderline, thematicBreak$1],
      [60]: htmlFlow,
      [61]: setextUnderline,
      [95]: thematicBreak$1,
      [96]: codeFenced,
      [126]: codeFenced
    };
    /** @type {Extension['string']} */

    const string = {
      [38]: characterReference,
      [92]: characterEscape
    };
    /** @type {Extension['text']} */

    const text$1 = {
      [-5]: lineEnding,
      [-4]: lineEnding,
      [-3]: lineEnding,
      [33]: labelStartImage,
      [38]: characterReference,
      [42]: attention,
      [60]: [autolink, htmlText],
      [91]: labelStartLink,
      [92]: [hardBreakEscape, characterEscape],
      [93]: labelEnd,
      [95]: attention,
      [96]: codeText
    };
    /** @type {Extension['insideSpan']} */

    const insideSpan = {
      null: [attention, resolver]
    };
    /** @type {Extension['attentionMarkers']} */

    const attentionMarkers = {
      null: [42, 95]
    };
    /** @type {Extension['disable']} */

    const disable = {
      null: []
    };

    var defaultConstructs = /*#__PURE__*/Object.freeze({
        __proto__: null,
        document: document,
        contentInitial: contentInitial,
        flowInitial: flowInitial,
        flow: flow,
        string: string,
        text: text$1,
        insideSpan: insideSpan,
        attentionMarkers: attentionMarkers,
        disable: disable
    });

    /**
     * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
     * @typedef {import('micromark-util-types').FullNormalizedExtension} FullNormalizedExtension
     * @typedef {import('micromark-util-types').ParseOptions} ParseOptions
     * @typedef {import('micromark-util-types').ParseContext} ParseContext
     * @typedef {import('micromark-util-types').Create} Create
     */
    /**
     * @param {ParseOptions} [options]
     * @returns {ParseContext}
     */

    function parse(options = {}) {
      /** @type {FullNormalizedExtension} */
      // @ts-expect-error `defaultConstructs` is full, so the result will be too.
      const constructs = combineExtensions(
        // @ts-expect-error Same as above.
        [defaultConstructs].concat(options.extensions || [])
      );
      /** @type {ParseContext} */

      const parser = {
        defined: [],
        lazy: {},
        constructs,
        content: create(content$1),
        document: create(document$1),
        flow: create(flow$1),
        string: create(string$1),
        text: create(text$2)
      };
      return parser
      /**
       * @param {InitialConstruct} initial
       */

      function create(initial) {
        return creator
        /** @type {Create} */

        function creator(from) {
          return createTokenizer(parser, initial, from)
        }
      }
    }

    /**
     * @typedef {import('micromark-util-types').Encoding} Encoding
     * @typedef {import('micromark-util-types').Value} Value
     * @typedef {import('micromark-util-types').Chunk} Chunk
     * @typedef {import('micromark-util-types').Code} Code
     */

    /**
     * @callback Preprocessor
     * @param {Value} value
     * @param {Encoding} [encoding]
     * @param {boolean} [end=false]
     * @returns {Array<Chunk>}
     */
    const search = /[\0\t\n\r]/g;
    /**
     * @returns {Preprocessor}
     */

    function preprocess() {
      let column = 1;
      let buffer = '';
      /** @type {boolean|undefined} */

      let start = true;
      /** @type {boolean|undefined} */

      let atCarriageReturn;
      return preprocessor
      /** @type {Preprocessor} */

      function preprocessor(value, encoding, end) {
        /** @type {Array<Chunk>} */
        const chunks = [];
        /** @type {RegExpMatchArray|null} */

        let match;
        /** @type {number} */

        let next;
        /** @type {number} */

        let startPosition;
        /** @type {number} */

        let endPosition;
        /** @type {Code} */

        let code; // @ts-expect-error `Buffer` does allow an encoding.

        value = buffer + value.toString(encoding);
        startPosition = 0;
        buffer = '';

        if (start) {
          if (value.charCodeAt(0) === 65279) {
            startPosition++;
          }

          start = undefined;
        }

        while (startPosition < value.length) {
          search.lastIndex = startPosition;
          match = search.exec(value);
          endPosition =
            match && match.index !== undefined ? match.index : value.length;
          code = value.charCodeAt(endPosition);

          if (!match) {
            buffer = value.slice(startPosition);
            break
          }

          if (code === 10 && startPosition === endPosition && atCarriageReturn) {
            chunks.push(-3);
            atCarriageReturn = undefined;
          } else {
            if (atCarriageReturn) {
              chunks.push(-5);
              atCarriageReturn = undefined;
            }

            if (startPosition < endPosition) {
              chunks.push(value.slice(startPosition, endPosition));
              column += endPosition - startPosition;
            }

            switch (code) {
              case 0: {
                chunks.push(65533);
                column++;
                break
              }

              case 9: {
                next = Math.ceil(column / 4) * 4;
                chunks.push(-2);

                while (column++ < next) chunks.push(-1);

                break
              }

              case 10: {
                chunks.push(-4);
                column = 1;
                break
              }

              default: {
                atCarriageReturn = true;
                column = 1;
              }
            }
          }

          startPosition = endPosition + 1;
        }

        if (end) {
          if (atCarriageReturn) chunks.push(-5);
          if (buffer) chunks.push(buffer);
          chunks.push(null);
        }

        return chunks
      }
    }

    /**
     * @typedef {import('micromark-util-types').Event} Event
     */
    /**
     * @param {Array<Event>} events
     * @returns {Array<Event>}
     */

    function postprocess(events) {
      while (!subtokenize(events)) {
        // Empty
      }

      return events
    }

    /**
     * Turn the number (in string form as either hexa- or plain decimal) coming from
     * a numeric character reference into a character.
     *
     * @param {string} value
     *   Value to decode.
     * @param {number} base
     *   Numeric base.
     * @returns {string}
     */
    function decodeNumericCharacterReference(value, base) {
      const code = Number.parseInt(value, base);

      if (
        // C0 except for HT, LF, FF, CR, space
        code < 9 ||
        code === 11 ||
        (code > 13 && code < 32) || // Control character (DEL) of the basic block and C1 controls.
        (code > 126 && code < 160) || // Lone high surrogates and low surrogates.
        (code > 55295 && code < 57344) || // Noncharacters.
        (code > 64975 && code < 65008) ||
        (code & 65535) === 65535 ||
        (code & 65535) === 65534 || // Out of range
        code > 1114111
      ) {
        return '\uFFFD'
      }

      return String.fromCharCode(code)
    }

    const characterEscapeOrReference =
      /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
    /**
     * Utility to decode markdown strings (which occur in places such as fenced
     * code info strings, destinations, labels, and titles).
     * The “string” content type allows character escapes and -references.
     * This decodes those.
     *
     * @param {string} value
     * @returns {string}
     */

    function decodeString(value) {
      return value.replace(characterEscapeOrReference, decode)
    }
    /**
     * @param {string} $0
     * @param {string} $1
     * @param {string} $2
     * @returns {string}
     */

    function decode($0, $1, $2) {
      if ($1) {
        // Escape.
        return $1
      } // Reference.

      const head = $2.charCodeAt(0);

      if (head === 35) {
        const head = $2.charCodeAt(1);
        const hex = head === 120 || head === 88;
        return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10)
      }

      return decodeNamedCharacterReference($2) || $0
    }

    /**
     * @typedef {import('micromark-util-types').Encoding} Encoding
     * @typedef {import('micromark-util-types').Event} Event
     * @typedef {import('micromark-util-types').ParseOptions} ParseOptions
     * @typedef {import('micromark-util-types').Token} Token
     * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
     * @typedef {import('micromark-util-types').Value} Value
     * @typedef {import('unist').Parent} UnistParent
     * @typedef {import('unist').Point} Point
     * @typedef {import('mdast').PhrasingContent} PhrasingContent
     * @typedef {import('mdast').Content} Content
     * @typedef {Root|Content} Node
     * @typedef {Extract<Node, UnistParent>} Parent
     * @typedef {import('mdast').Break} Break
     * @typedef {import('mdast').Blockquote} Blockquote
     * @typedef {import('mdast').Code} Code
     * @typedef {import('mdast').Definition} Definition
     * @typedef {import('mdast').Emphasis} Emphasis
     * @typedef {import('mdast').Heading} Heading
     * @typedef {import('mdast').HTML} HTML
     * @typedef {import('mdast').Image} Image
     * @typedef {import('mdast').ImageReference} ImageReference
     * @typedef {import('mdast').InlineCode} InlineCode
     * @typedef {import('mdast').Link} Link
     * @typedef {import('mdast').LinkReference} LinkReference
     * @typedef {import('mdast').List} List
     * @typedef {import('mdast').ListItem} ListItem
     * @typedef {import('mdast').Paragraph} Paragraph
     * @typedef {import('mdast').Root} Root
     * @typedef {import('mdast').Strong} Strong
     * @typedef {import('mdast').Text} Text
     * @typedef {import('mdast').ThematicBreak} ThematicBreak
     *
     * @typedef {UnistParent & {type: 'fragment', children: Array<PhrasingContent>}} Fragment
     */
    const own$6 = {}.hasOwnProperty;
    /**
     * @param value Markdown to parse (`string` or `Buffer`).
     * @param [encoding] Character encoding to understand `value` as when it’s a `Buffer` (`string`, default: `'utf8'`).
     * @param [options] Configuration
     */

    const fromMarkdown =
      /**
       * @type {(
       *   ((value: Value, encoding: Encoding, options?: Options) => Root) &
       *   ((value: Value, options?: Options) => Root)
       * )}
       */

      /**
       * @param {Value} value
       * @param {Encoding} [encoding]
       * @param {Options} [options]
       * @returns {Root}
       */
      function (value, encoding, options) {
        if (typeof encoding !== 'string') {
          options = encoding;
          encoding = undefined;
        }

        return compiler(options)(
          postprocess(
            parse(options).document().write(preprocess()(value, encoding, true))
          )
        )
      };
    /**
     * Note this compiler only understand complete buffering, not streaming.
     *
     * @param {Options} [options]
     */

    function compiler(options = {}) {
      /** @type {NormalizedExtension} */
      // @ts-expect-error: our base has all required fields, so the result will too.
      const config = configure(
        {
          transforms: [],
          canContainEols: [
            'emphasis',
            'fragment',
            'heading',
            'paragraph',
            'strong'
          ],
          enter: {
            autolink: opener(link),
            autolinkProtocol: onenterdata,
            autolinkEmail: onenterdata,
            atxHeading: opener(heading),
            blockQuote: opener(blockQuote),
            characterEscape: onenterdata,
            characterReference: onenterdata,
            codeFenced: opener(codeFlow),
            codeFencedFenceInfo: buffer,
            codeFencedFenceMeta: buffer,
            codeIndented: opener(codeFlow, buffer),
            codeText: opener(codeText, buffer),
            codeTextData: onenterdata,
            data: onenterdata,
            codeFlowValue: onenterdata,
            definition: opener(definition),
            definitionDestinationString: buffer,
            definitionLabelString: buffer,
            definitionTitleString: buffer,
            emphasis: opener(emphasis),
            hardBreakEscape: opener(hardBreak),
            hardBreakTrailing: opener(hardBreak),
            htmlFlow: opener(html, buffer),
            htmlFlowData: onenterdata,
            htmlText: opener(html, buffer),
            htmlTextData: onenterdata,
            image: opener(image),
            label: buffer,
            link: opener(link),
            listItem: opener(listItem),
            listItemValue: onenterlistitemvalue,
            listOrdered: opener(list, onenterlistordered),
            listUnordered: opener(list),
            paragraph: opener(paragraph),
            reference: onenterreference,
            referenceString: buffer,
            resourceDestinationString: buffer,
            resourceTitleString: buffer,
            setextHeading: opener(heading),
            strong: opener(strong),
            thematicBreak: opener(thematicBreak)
          },
          exit: {
            atxHeading: closer(),
            atxHeadingSequence: onexitatxheadingsequence,
            autolink: closer(),
            autolinkEmail: onexitautolinkemail,
            autolinkProtocol: onexitautolinkprotocol,
            blockQuote: closer(),
            characterEscapeValue: onexitdata,
            characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
            characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
            characterReferenceValue: onexitcharacterreferencevalue,
            codeFenced: closer(onexitcodefenced),
            codeFencedFence: onexitcodefencedfence,
            codeFencedFenceInfo: onexitcodefencedfenceinfo,
            codeFencedFenceMeta: onexitcodefencedfencemeta,
            codeFlowValue: onexitdata,
            codeIndented: closer(onexitcodeindented),
            codeText: closer(onexitcodetext),
            codeTextData: onexitdata,
            data: onexitdata,
            definition: closer(),
            definitionDestinationString: onexitdefinitiondestinationstring,
            definitionLabelString: onexitdefinitionlabelstring,
            definitionTitleString: onexitdefinitiontitlestring,
            emphasis: closer(),
            hardBreakEscape: closer(onexithardbreak),
            hardBreakTrailing: closer(onexithardbreak),
            htmlFlow: closer(onexithtmlflow),
            htmlFlowData: onexitdata,
            htmlText: closer(onexithtmltext),
            htmlTextData: onexitdata,
            image: closer(onexitimage),
            label: onexitlabel,
            labelText: onexitlabeltext,
            lineEnding: onexitlineending,
            link: closer(onexitlink),
            listItem: closer(),
            listOrdered: closer(),
            listUnordered: closer(),
            paragraph: closer(),
            referenceString: onexitreferencestring,
            resourceDestinationString: onexitresourcedestinationstring,
            resourceTitleString: onexitresourcetitlestring,
            resource: onexitresource,
            setextHeading: closer(onexitsetextheading),
            setextHeadingLineSequence: onexitsetextheadinglinesequence,
            setextHeadingText: onexitsetextheadingtext,
            strong: closer(),
            thematicBreak: closer()
          }
        },
        options.mdastExtensions || []
      );
      /** @type {CompileData} */

      const data = {};
      return compile
      /**
       * @param {Array<Event>} events
       * @returns {Root}
       */

      function compile(events) {
        /** @type {Root} */
        let tree = {
          type: 'root',
          children: []
        };
        /** @type {CompileContext['stack']} */

        const stack = [tree];
        /** @type {CompileContext['tokenStack']} */

        const tokenStack = [];
        /** @type {Array<number>} */

        const listStack = [];
        /** @type {Omit<CompileContext, 'sliceSerialize'>} */

        const context = {
          stack,
          tokenStack,
          config,
          enter,
          exit,
          buffer,
          resume,
          setData,
          getData
        };
        let index = -1;

        while (++index < events.length) {
          // We preprocess lists to add `listItem` tokens, and to infer whether
          // items the list itself are spread out.
          if (
            events[index][1].type === 'listOrdered' ||
            events[index][1].type === 'listUnordered'
          ) {
            if (events[index][0] === 'enter') {
              listStack.push(index);
            } else {
              const tail = listStack.pop();
              index = prepareList(events, tail, index);
            }
          }
        }

        index = -1;

        while (++index < events.length) {
          const handler = config[events[index][0]];

          if (own$6.call(handler, events[index][1].type)) {
            handler[events[index][1].type].call(
              Object.assign(
                {
                  sliceSerialize: events[index][2].sliceSerialize
                },
                context
              ),
              events[index][1]
            );
          }
        }

        if (tokenStack.length > 0) {
          const tail = tokenStack[tokenStack.length - 1];
          const handler = tail[1] || defaultOnError;
          handler.call(context, undefined, tail[0]);
        } // Figure out `root` position.

        tree.position = {
          start: point(
            events.length > 0
              ? events[0][1].start
              : {
                  line: 1,
                  column: 1,
                  offset: 0
                }
          ),
          end: point(
            events.length > 0
              ? events[events.length - 2][1].end
              : {
                  line: 1,
                  column: 1,
                  offset: 0
                }
          )
        };
        index = -1;

        while (++index < config.transforms.length) {
          tree = config.transforms[index](tree) || tree;
        }

        return tree
      }
      /**
       * @param {Array<Event>} events
       * @param {number} start
       * @param {number} length
       * @returns {number}
       */

      function prepareList(events, start, length) {
        let index = start - 1;
        let containerBalance = -1;
        let listSpread = false;
        /** @type {Token|undefined} */

        let listItem;
        /** @type {number|undefined} */

        let lineIndex;
        /** @type {number|undefined} */

        let firstBlankLineIndex;
        /** @type {boolean|undefined} */

        let atMarker;

        while (++index <= length) {
          const event = events[index];

          if (
            event[1].type === 'listUnordered' ||
            event[1].type === 'listOrdered' ||
            event[1].type === 'blockQuote'
          ) {
            if (event[0] === 'enter') {
              containerBalance++;
            } else {
              containerBalance--;
            }

            atMarker = undefined;
          } else if (event[1].type === 'lineEndingBlank') {
            if (event[0] === 'enter') {
              if (
                listItem &&
                !atMarker &&
                !containerBalance &&
                !firstBlankLineIndex
              ) {
                firstBlankLineIndex = index;
              }

              atMarker = undefined;
            }
          } else if (
            event[1].type === 'linePrefix' ||
            event[1].type === 'listItemValue' ||
            event[1].type === 'listItemMarker' ||
            event[1].type === 'listItemPrefix' ||
            event[1].type === 'listItemPrefixWhitespace'
          ) ; else {
            atMarker = undefined;
          }

          if (
            (!containerBalance &&
              event[0] === 'enter' &&
              event[1].type === 'listItemPrefix') ||
            (containerBalance === -1 &&
              event[0] === 'exit' &&
              (event[1].type === 'listUnordered' ||
                event[1].type === 'listOrdered'))
          ) {
            if (listItem) {
              let tailIndex = index;
              lineIndex = undefined;

              while (tailIndex--) {
                const tailEvent = events[tailIndex];

                if (
                  tailEvent[1].type === 'lineEnding' ||
                  tailEvent[1].type === 'lineEndingBlank'
                ) {
                  if (tailEvent[0] === 'exit') continue

                  if (lineIndex) {
                    events[lineIndex][1].type = 'lineEndingBlank';
                    listSpread = true;
                  }

                  tailEvent[1].type = 'lineEnding';
                  lineIndex = tailIndex;
                } else if (
                  tailEvent[1].type === 'linePrefix' ||
                  tailEvent[1].type === 'blockQuotePrefix' ||
                  tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
                  tailEvent[1].type === 'blockQuoteMarker' ||
                  tailEvent[1].type === 'listItemIndent'
                ) ; else {
                  break
                }
              }

              if (
                firstBlankLineIndex &&
                (!lineIndex || firstBlankLineIndex < lineIndex)
              ) {
                // @ts-expect-error Patched.
                listItem._spread = true;
              } // Fix position.

              listItem.end = Object.assign(
                {},
                lineIndex ? events[lineIndex][1].start : event[1].end
              );
              events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
              index++;
              length++;
            } // Create a new list item.

            if (event[1].type === 'listItemPrefix') {
              listItem = {
                type: 'listItem',
                // @ts-expect-error Patched
                _spread: false,
                start: Object.assign({}, event[1].start)
              }; // @ts-expect-error: `listItem` is most definitely defined, TS...

              events.splice(index, 0, ['enter', listItem, event[2]]);
              index++;
              length++;
              firstBlankLineIndex = undefined;
              atMarker = true;
            }
          }
        } // @ts-expect-error Patched.

        events[start][1]._spread = listSpread;
        return length
      }
      /**
       * @type {CompileContext['setData']}
       * @param [value]
       */

      function setData(key, value) {
        data[key] = value;
      }
      /**
       * @type {CompileContext['getData']}
       * @template {string} K
       * @param {K} key
       * @returns {CompileData[K]}
       */

      function getData(key) {
        return data[key]
      }
      /**
       * @param {Point} d
       * @returns {Point}
       */

      function point(d) {
        return {
          line: d.line,
          column: d.column,
          offset: d.offset
        }
      }
      /**
       * @param {(token: Token) => Node} create
       * @param {Handle} [and]
       * @returns {Handle}
       */

      function opener(create, and) {
        return open
        /**
         * @this {CompileContext}
         * @param {Token} token
         * @returns {void}
         */

        function open(token) {
          enter.call(this, create(token), token);
          if (and) and.call(this, token);
        }
      }
      /** @type {CompileContext['buffer']} */

      function buffer() {
        this.stack.push({
          type: 'fragment',
          children: []
        });
      }
      /**
       * @type {CompileContext['enter']}
       * @template {Node} N
       * @this {CompileContext}
       * @param {N} node
       * @param {Token} token
       * @param {OnEnterError} [errorHandler]
       * @returns {N}
       */

      function enter(node, token, errorHandler) {
        const parent = this.stack[this.stack.length - 1];
        // @ts-expect-error: Assume `Node` can exist as a child of `parent`.
        parent.children.push(node);
        this.stack.push(node);
        this.tokenStack.push([token, errorHandler]); // @ts-expect-error: `end` will be patched later.

        node.position = {
          start: point(token.start)
        };
        return node
      }
      /**
       * @param {Handle} [and]
       * @returns {Handle}
       */

      function closer(and) {
        return close
        /**
         * @this {CompileContext}
         * @param {Token} token
         * @returns {void}
         */

        function close(token) {
          if (and) and.call(this, token);
          exit.call(this, token);
        }
      }
      /**
       * @type {CompileContext['exit']}
       * @this {CompileContext}
       * @param {Token} token
       * @param {OnExitError} [onExitError]
       * @returns {Node}
       */

      function exit(token, onExitError) {
        const node = this.stack.pop();
        const open = this.tokenStack.pop();

        if (!open) {
          throw new Error(
            'Cannot close `' +
              token.type +
              '` (' +
              stringifyPosition({
                start: token.start,
                end: token.end
              }) +
              '): it’s not open'
          )
        } else if (open[0].type !== token.type) {
          if (onExitError) {
            onExitError.call(this, token, open[0]);
          } else {
            const handler = open[1] || defaultOnError;
            handler.call(this, token, open[0]);
          }
        }

        node.position.end = point(token.end);
        return node
      }
      /**
       * @this {CompileContext}
       * @returns {string}
       */

      function resume() {
        return toString(this.stack.pop())
      } //
      // Handlers.
      //

      /** @type {Handle} */

      function onenterlistordered() {
        setData('expectingFirstListItemValue', true);
      }
      /** @type {Handle} */

      function onenterlistitemvalue(token) {
        if (getData('expectingFirstListItemValue')) {
          const ancestor =
            /** @type {List} */
            this.stack[this.stack.length - 2];
          ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
          setData('expectingFirstListItemValue');
        }
      }
      /** @type {Handle} */

      function onexitcodefencedfenceinfo() {
        const data = this.resume();
        const node =
          /** @type {Code} */
          this.stack[this.stack.length - 1];
        node.lang = data;
      }
      /** @type {Handle} */

      function onexitcodefencedfencemeta() {
        const data = this.resume();
        const node =
          /** @type {Code} */
          this.stack[this.stack.length - 1];
        node.meta = data;
      }
      /** @type {Handle} */

      function onexitcodefencedfence() {
        // Exit if this is the closing fence.
        if (getData('flowCodeInside')) return
        this.buffer();
        setData('flowCodeInside', true);
      }
      /** @type {Handle} */

      function onexitcodefenced() {
        const data = this.resume();
        const node =
          /** @type {Code} */
          this.stack[this.stack.length - 1];
        node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
        setData('flowCodeInside');
      }
      /** @type {Handle} */

      function onexitcodeindented() {
        const data = this.resume();
        const node =
          /** @type {Code} */
          this.stack[this.stack.length - 1];
        node.value = data.replace(/(\r?\n|\r)$/g, '');
      }
      /** @type {Handle} */

      function onexitdefinitionlabelstring(token) {
        // Discard label, use the source content instead.
        const label = this.resume();
        const node =
          /** @type {Definition} */
          this.stack[this.stack.length - 1];
        node.label = label;
        node.identifier = normalizeIdentifier(
          this.sliceSerialize(token)
        ).toLowerCase();
      }
      /** @type {Handle} */

      function onexitdefinitiontitlestring() {
        const data = this.resume();
        const node =
          /** @type {Definition} */
          this.stack[this.stack.length - 1];
        node.title = data;
      }
      /** @type {Handle} */

      function onexitdefinitiondestinationstring() {
        const data = this.resume();
        const node =
          /** @type {Definition} */
          this.stack[this.stack.length - 1];
        node.url = data;
      }
      /** @type {Handle} */

      function onexitatxheadingsequence(token) {
        const node =
          /** @type {Heading} */
          this.stack[this.stack.length - 1];

        if (!node.depth) {
          const depth = this.sliceSerialize(token).length;
          node.depth = depth;
        }
      }
      /** @type {Handle} */

      function onexitsetextheadingtext() {
        setData('setextHeadingSlurpLineEnding', true);
      }
      /** @type {Handle} */

      function onexitsetextheadinglinesequence(token) {
        const node =
          /** @type {Heading} */
          this.stack[this.stack.length - 1];
        node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
      }
      /** @type {Handle} */

      function onexitsetextheading() {
        setData('setextHeadingSlurpLineEnding');
      }
      /** @type {Handle} */

      function onenterdata(token) {
        const parent =
          /** @type {Parent} */
          this.stack[this.stack.length - 1];
        /** @type {Node} */

        let tail = parent.children[parent.children.length - 1];

        if (!tail || tail.type !== 'text') {
          // Add a new text node.
          tail = text(); // @ts-expect-error: we’ll add `end` later.

          tail.position = {
            start: point(token.start)
          }; // @ts-expect-error: Assume `parent` accepts `text`.

          parent.children.push(tail);
        }

        this.stack.push(tail);
      }
      /** @type {Handle} */

      function onexitdata(token) {
        const tail = this.stack.pop();
        tail.value += this.sliceSerialize(token);
        tail.position.end = point(token.end);
      }
      /** @type {Handle} */

      function onexitlineending(token) {
        const context = this.stack[this.stack.length - 1];

        // If we’re at a hard break, include the line ending in there.
        if (getData('atHardBreak')) {
          const tail = context.children[context.children.length - 1];
          tail.position.end = point(token.end);
          setData('atHardBreak');
          return
        }

        if (
          !getData('setextHeadingSlurpLineEnding') &&
          config.canContainEols.includes(context.type)
        ) {
          onenterdata.call(this, token);
          onexitdata.call(this, token);
        }
      }
      /** @type {Handle} */

      function onexithardbreak() {
        setData('atHardBreak', true);
      }
      /** @type {Handle} */

      function onexithtmlflow() {
        const data = this.resume();
        const node =
          /** @type {HTML} */
          this.stack[this.stack.length - 1];
        node.value = data;
      }
      /** @type {Handle} */

      function onexithtmltext() {
        const data = this.resume();
        const node =
          /** @type {HTML} */
          this.stack[this.stack.length - 1];
        node.value = data;
      }
      /** @type {Handle} */

      function onexitcodetext() {
        const data = this.resume();
        const node =
          /** @type {InlineCode} */
          this.stack[this.stack.length - 1];
        node.value = data;
      }
      /** @type {Handle} */

      function onexitlink() {
        const context =
          /** @type {Link & {identifier: string, label: string}} */
          this.stack[this.stack.length - 1]; // To do: clean.

        if (getData('inReference')) {
          context.type += 'Reference'; // @ts-expect-error: mutate.

          context.referenceType = getData('referenceType') || 'shortcut'; // @ts-expect-error: mutate.

          delete context.url;
          delete context.title;
        } else {
          // @ts-expect-error: mutate.
          delete context.identifier; // @ts-expect-error: mutate.

          delete context.label;
        }

        setData('referenceType');
      }
      /** @type {Handle} */

      function onexitimage() {
        const context =
          /** @type {Image & {identifier: string, label: string}} */
          this.stack[this.stack.length - 1]; // To do: clean.

        if (getData('inReference')) {
          context.type += 'Reference'; // @ts-expect-error: mutate.

          context.referenceType = getData('referenceType') || 'shortcut'; // @ts-expect-error: mutate.

          delete context.url;
          delete context.title;
        } else {
          // @ts-expect-error: mutate.
          delete context.identifier; // @ts-expect-error: mutate.

          delete context.label;
        }

        setData('referenceType');
      }
      /** @type {Handle} */

      function onexitlabeltext(token) {
        const ancestor =
          /** @type {(Link|Image) & {identifier: string, label: string}} */
          this.stack[this.stack.length - 2];
        const string = this.sliceSerialize(token);
        ancestor.label = decodeString(string);
        ancestor.identifier = normalizeIdentifier(string).toLowerCase();
      }
      /** @type {Handle} */

      function onexitlabel() {
        const fragment =
          /** @type {Fragment} */
          this.stack[this.stack.length - 1];
        const value = this.resume();
        const node =
          /** @type {(Link|Image) & {identifier: string, label: string}} */
          this.stack[this.stack.length - 1]; // Assume a reference.

        setData('inReference', true);

        if (node.type === 'link') {
          // @ts-expect-error: Assume static phrasing content.
          node.children = fragment.children;
        } else {
          node.alt = value;
        }
      }
      /** @type {Handle} */

      function onexitresourcedestinationstring() {
        const data = this.resume();
        const node =
          /** @type {Link|Image} */
          this.stack[this.stack.length - 1];
        node.url = data;
      }
      /** @type {Handle} */

      function onexitresourcetitlestring() {
        const data = this.resume();
        const node =
          /** @type {Link|Image} */
          this.stack[this.stack.length - 1];
        node.title = data;
      }
      /** @type {Handle} */

      function onexitresource() {
        setData('inReference');
      }
      /** @type {Handle} */

      function onenterreference() {
        setData('referenceType', 'collapsed');
      }
      /** @type {Handle} */

      function onexitreferencestring(token) {
        const label = this.resume();
        const node =
          /** @type {LinkReference|ImageReference} */
          this.stack[this.stack.length - 1];
        node.label = label;
        node.identifier = normalizeIdentifier(
          this.sliceSerialize(token)
        ).toLowerCase();
        setData('referenceType', 'full');
      }
      /** @type {Handle} */

      function onexitcharacterreferencemarker(token) {
        setData('characterReferenceType', token.type);
      }
      /** @type {Handle} */

      function onexitcharacterreferencevalue(token) {
        const data = this.sliceSerialize(token);
        const type = getData('characterReferenceType');
        /** @type {string} */

        let value;

        if (type) {
          value = decodeNumericCharacterReference(
            data,
            type === 'characterReferenceMarkerNumeric' ? 10 : 16
          );
          setData('characterReferenceType');
        } else {
          // @ts-expect-error `decodeNamedCharacterReference` can return false for
          // invalid named character references, but everything we’ve tokenized is
          // valid.
          value = decodeNamedCharacterReference(data);
        }

        const tail = this.stack.pop();
        tail.value += value;
        tail.position.end = point(token.end);
      }
      /** @type {Handle} */

      function onexitautolinkprotocol(token) {
        onexitdata.call(this, token);
        const node =
          /** @type {Link} */
          this.stack[this.stack.length - 1];
        node.url = this.sliceSerialize(token);
      }
      /** @type {Handle} */

      function onexitautolinkemail(token) {
        onexitdata.call(this, token);
        const node =
          /** @type {Link} */
          this.stack[this.stack.length - 1];
        node.url = 'mailto:' + this.sliceSerialize(token);
      } //
      // Creaters.
      //

      /** @returns {Blockquote} */

      function blockQuote() {
        return {
          type: 'blockquote',
          children: []
        }
      }
      /** @returns {Code} */

      function codeFlow() {
        return {
          type: 'code',
          lang: null,
          meta: null,
          value: ''
        }
      }
      /** @returns {InlineCode} */

      function codeText() {
        return {
          type: 'inlineCode',
          value: ''
        }
      }
      /** @returns {Definition} */

      function definition() {
        return {
          type: 'definition',
          identifier: '',
          label: null,
          title: null,
          url: ''
        }
      }
      /** @returns {Emphasis} */

      function emphasis() {
        return {
          type: 'emphasis',
          children: []
        }
      }
      /** @returns {Heading} */

      function heading() {
        // @ts-expect-error `depth` will be set later.
        return {
          type: 'heading',
          depth: undefined,
          children: []
        }
      }
      /** @returns {Break} */

      function hardBreak() {
        return {
          type: 'break'
        }
      }
      /** @returns {HTML} */

      function html() {
        return {
          type: 'html',
          value: ''
        }
      }
      /** @returns {Image} */

      function image() {
        return {
          type: 'image',
          title: null,
          url: '',
          alt: null
        }
      }
      /** @returns {Link} */

      function link() {
        return {
          type: 'link',
          title: null,
          url: '',
          children: []
        }
      }
      /**
       * @param {Token} token
       * @returns {List}
       */

      function list(token) {
        return {
          type: 'list',
          ordered: token.type === 'listOrdered',
          start: null,
          // @ts-expect-error Patched.
          spread: token._spread,
          children: []
        }
      }
      /**
       * @param {Token} token
       * @returns {ListItem}
       */

      function listItem(token) {
        return {
          type: 'listItem',
          // @ts-expect-error Patched.
          spread: token._spread,
          checked: null,
          children: []
        }
      }
      /** @returns {Paragraph} */

      function paragraph() {
        return {
          type: 'paragraph',
          children: []
        }
      }
      /** @returns {Strong} */

      function strong() {
        return {
          type: 'strong',
          children: []
        }
      }
      /** @returns {Text} */

      function text() {
        return {
          type: 'text',
          value: ''
        }
      }
      /** @returns {ThematicBreak} */

      function thematicBreak() {
        return {
          type: 'thematicBreak'
        }
      }
    }
    /**
     * @param {Extension} combined
     * @param {Array<Extension|Array<Extension>>} extensions
     * @returns {Extension}
     */

    function configure(combined, extensions) {
      let index = -1;

      while (++index < extensions.length) {
        const value = extensions[index];

        if (Array.isArray(value)) {
          configure(combined, value);
        } else {
          extension(combined, value);
        }
      }

      return combined
    }
    /**
     * @param {Extension} combined
     * @param {Extension} extension
     * @returns {void}
     */

    function extension(combined, extension) {
      /** @type {string} */
      let key;

      for (key in extension) {
        if (own$6.call(extension, key)) {
          const list = key === 'canContainEols' || key === 'transforms';
          const maybe = own$6.call(combined, key) ? combined[key] : undefined;
          /* c8 ignore next */

          const left = maybe || (combined[key] = list ? [] : {});
          const right = extension[key];

          if (right) {
            if (list) {
              // @ts-expect-error: `left` is an array.
              combined[key] = [...left, ...right];
            } else {
              Object.assign(left, right);
            }
          }
        }
      }
    }
    /** @type {OnEnterError} */

    function defaultOnError(left, right) {
      if (left) {
        throw new Error(
          'Cannot close `' +
            left.type +
            '` (' +
            stringifyPosition({
              start: left.start,
              end: left.end
            }) +
            '): a different token (`' +
            right.type +
            '`, ' +
            stringifyPosition({
              start: right.start,
              end: right.end
            }) +
            ') is open'
        )
      } else {
        throw new Error(
          'Cannot close document, a token (`' +
            right.type +
            '`, ' +
            stringifyPosition({
              start: right.start,
              end: right.end
            }) +
            ') is still open'
        )
      }
    }

    /**
     * @typedef {import('mdast').Root} Root
     * @typedef {import('mdast-util-from-markdown').Options} Options
     */

    /** @type {import('unified').Plugin<[Options?] | void[], string, Root>} */
    function remarkParse(options) {
      /** @type {import('unified').ParserFunction<Root>} */
      const parser = (doc) => {
        // Assume options.
        const settings = /** @type {Options} */ (this.data('settings'));

        return fromMarkdown(
          doc,
          Object.assign({}, settings, options, {
            // Note: these options are not in the readme.
            // The goal is for them to be set by plugins on `data` instead of being
            // passed by users.
            extensions: this.data('micromarkExtensions') || [],
            mdastExtensions: this.data('fromMarkdownExtensions') || []
          })
        )
      };

      Object.assign(this, {Parser: parser});
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Parent} Parent
     * @typedef {import('unist').Literal} Literal
     * @typedef {Object.<string, unknown>} Props
     * @typedef {Array.<Node>|string} ChildrenOrValue
     *
     * @typedef {(<T extends string, P extends Record<string, unknown>, C extends Node[]>(type: T, props: P, children: C) => {type: T, children: C} & P)} BuildParentWithProps
     * @typedef {(<T extends string, P extends Record<string, unknown>>(type: T, props: P, value: string) => {type: T, value: string} & P)} BuildLiteralWithProps
     * @typedef {(<T extends string, P extends Record<string, unknown>>(type: T, props: P) => {type: T} & P)} BuildVoidWithProps
     * @typedef {(<T extends string, C extends Node[]>(type: T, children: C) => {type: T, children: C})} BuildParent
     * @typedef {(<T extends string>(type: T, value: string) => {type: T, value: string})} BuildLiteral
     * @typedef {(<T extends string>(type: T) => {type: T})} BuildVoid
     */

    var u$1 = /**
     * @type {BuildVoid & BuildVoidWithProps & BuildLiteral & BuildLiteralWithProps & BuildParent & BuildParentWithProps}
     */ (
      /**
       * @param {string} type Type of node
       * @param {Props|ChildrenOrValue} [props] Additional properties for node (or `children` or `value`)
       * @param {ChildrenOrValue} [value] `children` or `value` of node
       * @returns {Node}
       */
      function (type, props, value) {
        /** @type {Node} */
        var node = {type: String(type)};

        if (
          (value === undefined || value === null) &&
          (typeof props === 'string' || Array.isArray(props))
        ) {
          value = props;
        } else {
          Object.assign(node, props);
        }

        if (Array.isArray(value)) {
          node.children = value;
        } else if (value !== undefined && value !== null) {
          node.value = String(value);
        }

        return node
      }
    );

    /**
     * @typedef {import('mdast').Root|import('mdast').Parent['children'][number]} MdastNode
     * @typedef {import('./index.js').H} H
     * @typedef {import('./index.js').Handler} Handler
     * @typedef {import('./index.js').Content} Content
     */

    const own$5 = {}.hasOwnProperty;

    /**
     * Transform an unknown node.
     * @type {Handler}
     * @param {MdastNode} node
     */
    function unknown(h, node) {
      const data = node.data || {};

      if (
        'value' in node &&
        !(
          own$5.call(data, 'hName') ||
          own$5.call(data, 'hProperties') ||
          own$5.call(data, 'hChildren')
        )
      ) {
        return h.augment(node, u$1('text', node.value))
      }

      return h(node, 'div', all(h, node))
    }

    /**
     * @type {Handler}
     * @param {MdastNode} node
     */
    function one(h, node, parent) {
      const type = node && node.type;
      /** @type {Handler} */
      let fn;

      // Fail on non-nodes.
      if (!type) {
        throw new Error('Expected node, got `' + node + '`')
      }

      if (own$5.call(h.handlers, type)) {
        fn = h.handlers[type];
      } else if (h.passThrough && h.passThrough.includes(type)) {
        fn = returnNode;
      } else {
        fn = h.unknownHandler;
      }

      return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
    }

    /**
     * @type {Handler}
     * @param {MdastNode} node
     */
    function returnNode(h, node) {
      // @ts-expect-error: Pass through custom node.
      return 'children' in node ? {...node, children: all(h, node)} : node
    }

    /**
     * @param {H} h
     * @param {MdastNode} parent
     */
    function all(h, parent) {
      /** @type {Array<Content>} */
      const values = [];

      if ('children' in parent) {
        const nodes = parent.children;
        let index = -1;

        while (++index < nodes.length) {
          const result = one(h, nodes[index], parent);

          if (result) {
            if (index && nodes[index - 1].type === 'break') {
              if (!Array.isArray(result) && result.type === 'text') {
                result.value = result.value.replace(/^\s+/, '');
              }

              if (!Array.isArray(result) && result.type === 'element') {
                const head = result.children[0];

                if (head && head.type === 'text') {
                  head.value = head.value.replace(/^\s+/, '');
                }
              }
            }

            if (Array.isArray(result)) {
              values.push(...result);
            } else {
              values.push(result);
            }
          }
        }
      }

      return values
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Parent} Parent
     *
     * @typedef {string} Type
     * @typedef {Object<string, unknown>} Props
     *
     * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
     */

    const convert =
      /**
       * @type {(
       *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
       *   ((test?: Test) => AssertAnything)
       * )}
       */
      (
        /**
         * Generate an assertion from a check.
         * @param {Test} [test]
         * When nullish, checks if `node` is a `Node`.
         * When `string`, works like passing `function (node) {return node.type === test}`.
         * When `function` checks if function passed the node is true.
         * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
         * When `array`, checks any one of the subtests pass.
         * @returns {AssertAnything}
         */
        function (test) {
          if (test === undefined || test === null) {
            return ok
          }

          if (typeof test === 'string') {
            return typeFactory(test)
          }

          if (typeof test === 'object') {
            return Array.isArray(test) ? anyFactory(test) : propsFactory(test)
          }

          if (typeof test === 'function') {
            return castFactory(test)
          }

          throw new Error('Expected function, string, or object as test')
        }
      );
    /**
     * @param {Array.<Type|Props|TestFunctionAnything>} tests
     * @returns {AssertAnything}
     */
    function anyFactory(tests) {
      /** @type {Array.<AssertAnything>} */
      const checks = [];
      let index = -1;

      while (++index < tests.length) {
        checks[index] = convert(tests[index]);
      }

      return castFactory(any)

      /**
       * @this {unknown}
       * @param {unknown[]} parameters
       * @returns {boolean}
       */
      function any(...parameters) {
        let index = -1;

        while (++index < checks.length) {
          if (checks[index].call(this, ...parameters)) return true
        }

        return false
      }
    }

    /**
     * Utility to assert each property in `test` is represented in `node`, and each
     * values are strictly equal.
     *
     * @param {Props} check
     * @returns {AssertAnything}
     */
    function propsFactory(check) {
      return castFactory(all)

      /**
       * @param {Node} node
       * @returns {boolean}
       */
      function all(node) {
        /** @type {string} */
        let key;

        for (key in check) {
          // @ts-expect-error: hush, it sure works as an index.
          if (node[key] !== check[key]) return false
        }

        return true
      }
    }

    /**
     * Utility to convert a string into a function which checks a given node’s type
     * for said string.
     *
     * @param {Type} check
     * @returns {AssertAnything}
     */
    function typeFactory(check) {
      return castFactory(type)

      /**
       * @param {Node} node
       */
      function type(node) {
        return node && node.type === check
      }
    }

    /**
     * Utility to convert a string into a function which checks a given node’s type
     * for said string.
     * @param {TestFunctionAnything} check
     * @returns {AssertAnything}
     */
    function castFactory(check) {
      return assertion

      /**
       * @this {unknown}
       * @param {Array.<unknown>} parameters
       * @returns {boolean}
       */
      function assertion(...parameters) {
        // @ts-expect-error: spreading is fine.
        return Boolean(check.call(this, ...parameters))
      }
    }

    // Utility to return true.
    function ok() {
      return true
    }

    /**
     * @param {string} d
     * @returns {string}
     */
    function color(d) {
      return d
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Parent} Parent
     * @typedef {import('unist-util-is').Test} Test
     * @typedef {import('./complex-types.js').Action} Action
     * @typedef {import('./complex-types.js').Index} Index
     * @typedef {import('./complex-types.js').ActionTuple} ActionTuple
     * @typedef {import('./complex-types.js').VisitorResult} VisitorResult
     * @typedef {import('./complex-types.js').Visitor} Visitor
     */

    /**
     * Continue traversing as normal
     */
    const CONTINUE = true;
    /**
     * Do not traverse this node’s children
     */
    const SKIP = 'skip';
    /**
     * Stop traversing immediately
     */
    const EXIT = false;

    /**
     * Visit children of tree which pass test.
     *
     * @param tree
     *   Tree to walk
     * @param [test]
     *   `unist-util-is`-compatible test
     * @param visitor
     *   Function called for nodes that pass `test`.
     * @param [reverse=false]
     *   Traverse in reverse preorder (NRL) instead of preorder (NLR) (default).
     */
    const visitParents =
      /**
       * @type {(
       *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types.js').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
       *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types.js').BuildVisitor<Tree>, reverse?: boolean) => void)
       * )}
       */
      (
        /**
         * @param {Node} tree
         * @param {Test} test
         * @param {import('./complex-types.js').Visitor<Node>} visitor
         * @param {boolean} [reverse=false]
         */
        function (tree, test, visitor, reverse) {
          if (typeof test === 'function' && typeof visitor !== 'function') {
            reverse = visitor;
            // @ts-expect-error no visitor given, so `visitor` is test.
            visitor = test;
            test = null;
          }

          const is = convert(test);
          const step = reverse ? -1 : 1;

          factory(tree, null, [])();

          /**
           * @param {Node} node
           * @param {number?} index
           * @param {Array<Parent>} parents
           */
          function factory(node, index, parents) {
            /** @type {Record<string, unknown>} */
            // @ts-expect-error: hush
            const value = typeof node === 'object' && node !== null ? node : {};
            /** @type {string|undefined} */
            let name;

            if (typeof value.type === 'string') {
              name =
                typeof value.tagName === 'string'
                  ? value.tagName
                  : typeof value.name === 'string'
                  ? value.name
                  : undefined;

              Object.defineProperty(visit, 'name', {
                value:
                  'node (' +
                  color(value.type + (name ? '<' + name + '>' : '')) +
                  ')'
              });
            }

            return visit

            function visit() {
              /** @type {ActionTuple} */
              let result = [];
              /** @type {ActionTuple} */
              let subresult;
              /** @type {number} */
              let offset;
              /** @type {Array<Parent>} */
              let grandparents;

              if (!test || is(node, index, parents[parents.length - 1] || null)) {
                result = toResult(visitor(node, parents));

                if (result[0] === EXIT) {
                  return result
                }
              }

              // @ts-expect-error looks like a parent.
              if (node.children && result[0] !== SKIP) {
                // @ts-expect-error looks like a parent.
                offset = (reverse ? node.children.length : -1) + step;
                // @ts-expect-error looks like a parent.
                grandparents = parents.concat(node);

                // @ts-expect-error looks like a parent.
                while (offset > -1 && offset < node.children.length) {
                  // @ts-expect-error looks like a parent.
                  subresult = factory(node.children[offset], offset, grandparents)();

                  if (subresult[0] === EXIT) {
                    return subresult
                  }

                  offset =
                    typeof subresult[1] === 'number' ? subresult[1] : offset + step;
                }
              }

              return result
            }
          }
        }
      );

    /**
     * @param {VisitorResult} value
     * @returns {ActionTuple}
     */
    function toResult(value) {
      if (Array.isArray(value)) {
        return value
      }

      if (typeof value === 'number') {
        return [CONTINUE, value]
      }

      return [value]
    }

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('unist').Parent} Parent
     * @typedef {import('unist-util-is').Test} Test
     * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
     * @typedef {import('./complex-types.js').Visitor} Visitor
     */

    /**
     * Visit children of tree which pass test.
     *
     * @param tree
     *   Tree to walk
     * @param [test]
     *   `unist-util-is`-compatible test
     * @param visitor
     *   Function called for nodes that pass `test`.
     * @param reverse
     *   Traverse in reverse preorder (NRL) instead of preorder (NLR) (default).
     */
    const visit =
      /**
       * @type {(
       *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types.js').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
       *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types.js').BuildVisitor<Tree>, reverse?: boolean) => void)
       * )}
       */
      (
        /**
         * @param {Node} tree
         * @param {Test} test
         * @param {import('./complex-types.js').Visitor} visitor
         * @param {boolean} [reverse]
         */
        function (tree, test, visitor, reverse) {
          if (typeof test === 'function' && typeof visitor !== 'function') {
            reverse = visitor;
            visitor = test;
            test = null;
          }

          visitParents(tree, test, overload, reverse);

          /**
           * @param {Node} node
           * @param {Array<Parent>} parents
           */
          function overload(node, parents) {
            const parent = parents[parents.length - 1];
            return visitor(
              node,
              parent ? parent.children.indexOf(node) : null,
              parent
            )
          }
        }
      );

    /**
     * @typedef {import('unist').Position} Position
     * @typedef {import('unist').Node} Node
     * @typedef {Record<string, unknown> & {type: string, position?: PositionLike|undefined}} NodeLike
     * @typedef {import('unist').Point} Point
     *
     * @typedef {Partial<Point>} PointLike
     *
     * @typedef PositionLike
     * @property {PointLike} [start]
     * @property {PointLike} [end]
     */

    const pointStart = point('start');
    const pointEnd = point('end');

    /**
     * Get the positional info of `node`.
     *
     * @param {'start'|'end'} type
     */
    function point(type) {
      return point

      /**
       * Get the positional info of `node`.
       *
       * @param {NodeLike|Node} [node]
       * @returns {Point}
       */
      function point(node) {
        const point = (node && node.position && node.position[type]) || {};

        return {
          line: point.line || null,
          column: point.column || null,
          offset: point.offset > -1 ? point.offset : null
        }
      }
    }

    /**
     * @typedef {Object} PointLike
     * @property {number} [line]
     * @property {number} [column]
     * @property {number} [offset]
     *
     * @typedef {Object} PositionLike
     * @property {PointLike} [start]
     * @property {PointLike} [end]
     *
     * @typedef {Object} NodeLike
     * @property {PositionLike} [position]
     */

    /**
     * Check if `node` is *generated*.
     *
     * @param {NodeLike} [node]
     * @returns {boolean}
     */
    function generated(node) {
      return (
        !node ||
        !node.position ||
        !node.position.start ||
        !node.position.start.line ||
        !node.position.start.column ||
        !node.position.end ||
        !node.position.end.line ||
        !node.position.end.column
      )
    }

    /**
     * @typedef {import('mdast').Root|import('mdast').Content} Node
     * @typedef {import('mdast').Definition} Definition
     */

    const own$4 = {}.hasOwnProperty;

    /**
     * Find definitions in `node`.
     * Uses CommonMark precedence, which means that earlier definitions are
     * preferred over duplicate later definitions.
     *
     * @param {Node} node
     */
    function definitions(node) {
      /** @type {Record<string, Definition>} */
      const cache = Object.create(null);

      if (!node || !node.type) {
        throw new Error('mdast-util-definitions expected node')
      }

      visit(node, 'definition', (definition) => {
        const id = clean(definition.identifier);
        if (id && !own$4.call(cache, id)) {
          cache[id] = definition;
        }
      });

      return definition

      /**
       * Get a node from the bound definition cache.
       *
       * @param {string} identifier
       * @returns {Definition|null}
       */
      function definition(identifier) {
        const id = clean(identifier);
        return id && own$4.call(cache, id) ? cache[id] : null
      }
    }

    /**
     * @param {string} [value]
     * @returns {string}
     */
    function clean(value) {
      return String(value || '').toUpperCase()
    }

    /**
     * Normalize a URL (such as used in definitions).
     *
     * Encode unsafe characters with percent-encoding, skipping already encoded
     * sequences.
     *
     * @param {string} value
     * @returns {string}
     */

    function normalizeUri(value) {
      /** @type {Array<string>} */
      const result = [];
      let index = -1;
      let start = 0;
      let skip = 0;

      while (++index < value.length) {
        const code = value.charCodeAt(index);
        /** @type {string} */

        let replace = ''; // A correct percent encoded value.

        if (
          code === 37 &&
          asciiAlphanumeric(value.charCodeAt(index + 1)) &&
          asciiAlphanumeric(value.charCodeAt(index + 2))
        ) {
          skip = 2;
        } // ASCII.
        else if (code < 128) {
          if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) {
            replace = String.fromCharCode(code);
          }
        } // Astral.
        else if (code > 55295 && code < 57344) {
          const next = value.charCodeAt(index + 1); // A correct surrogate pair.

          if (code < 56320 && next > 56319 && next < 57344) {
            replace = String.fromCharCode(code, next);
            skip = 1;
          } // Lone surrogate.
          else {
            replace = '\uFFFD';
          }
        } // Unicode.
        else {
          replace = String.fromCharCode(code);
        }

        if (replace) {
          result.push(value.slice(start, index), encodeURIComponent(replace));
          start = index + skip + 1;
          replace = '';
        }

        if (skip) {
          index += skip;
          skip = 0;
        }
      }

      return result.join('') + value.slice(start)
    }

    /**
     * @typedef {import('./index.js').Content} Content
     */

    /**
     * Wrap `nodes` with line feeds between each entry.
     * Optionally adds line feeds at the start and end.
     *
     * @param {Array<Content>} nodes
     * @param {boolean} [loose=false]
     * @returns {Array<Content>}
     */
    function wrap(nodes, loose) {
      /** @type {Array<Content>} */
      const result = [];
      let index = -1;

      if (loose) {
        result.push(u$1('text', '\n'));
      }

      while (++index < nodes.length) {
        if (index) result.push(u$1('text', '\n'));
        result.push(nodes[index]);
      }

      if (loose && nodes.length > 0) {
        result.push(u$1('text', '\n'));
      }

      return result
    }

    /**
     * @typedef {import('hast').Element} Element
     * @typedef {import('hast').ElementContent} ElementContent
     * @typedef {import('./index.js').H} H
     */

    /**
     * @param {H} h
     * @returns {Element|null}
     */
    function footer(h) {
      let index = -1;
      /** @type {Array<ElementContent>} */
      const listItems = [];

      while (++index < h.footnoteOrder.length) {
        const def = h.footnoteById[h.footnoteOrder[index].toUpperCase()];

        if (!def) {
          continue
        }

        const content = all(h, def);
        const id = String(def.identifier);
        const safeId = normalizeUri(id.toLowerCase());
        let referenceIndex = 0;
        /** @type {Array<ElementContent>} */
        const backReferences = [];

        while (++referenceIndex <= h.footnoteCounts[id]) {
          /** @type {Element} */
          const backReference = {
            type: 'element',
            tagName: 'a',
            properties: {
              href:
                '#' +
                h.clobberPrefix +
                'fnref-' +
                safeId +
                (referenceIndex > 1 ? '-' + referenceIndex : ''),
              dataFootnoteBackref: true,
              className: ['data-footnote-backref'],
              ariaLabel: h.footnoteBackLabel
            },
            children: [{type: 'text', value: '↩'}]
          };

          if (referenceIndex > 1) {
            backReference.children.push({
              type: 'element',
              tagName: 'sup',
              children: [{type: 'text', value: String(referenceIndex)}]
            });
          }

          if (backReferences.length > 0) {
            backReferences.push({type: 'text', value: ' '});
          }

          backReferences.push(backReference);
        }

        const tail = content[content.length - 1];

        if (tail && tail.type === 'element' && tail.tagName === 'p') {
          const tailTail = tail.children[tail.children.length - 1];
          if (tailTail && tailTail.type === 'text') {
            tailTail.value += ' ';
          } else {
            tail.children.push({type: 'text', value: ' '});
          }

          tail.children.push(...backReferences);
        } else {
          content.push(...backReferences);
        }

        /** @type {Element} */
        const listItem = {
          type: 'element',
          tagName: 'li',
          properties: {id: h.clobberPrefix + 'fn-' + safeId},
          children: wrap(content, true)
        };

        if (def.position) {
          listItem.position = def.position;
        }

        listItems.push(listItem);
      }

      if (listItems.length === 0) {
        return null
      }

      return {
        type: 'element',
        tagName: 'section',
        properties: {dataFootnotes: true, className: ['footnotes']},
        children: [
          {
            type: 'element',
            tagName: h.footnoteLabelTagName,
            properties: {
              ...JSON.parse(JSON.stringify(h.footnoteLabelProperties)),
              id: 'footnote-label'
            },
            children: [u$1('text', h.footnoteLabel)]
          },
          {type: 'text', value: '\n'},
          {
            type: 'element',
            tagName: 'ol',
            properties: {},
            children: wrap(listItems, true)
          },
          {type: 'text', value: '\n'}
        ]
      }
    }

    /**
     * @typedef {import('mdast').Blockquote} Blockquote
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Blockquote} node
     */
    function blockquote(h, node) {
      return h(node, 'blockquote', wrap(all(h, node), true))
    }

    /**
     * @typedef {import('hast').Element} Element
     * @typedef {import('hast').Text} Text
     * @typedef {import('mdast').Break} Break
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Break} node
     * @returns {Array<Element|Text>}
     */
    function hardBreak(h, node) {
      return [h(node, 'br'), u$1('text', '\n')]
    }

    /**
     * @typedef {import('mdast').Code} Code
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Code} node
     */
    function code(h, node) {
      const value = node.value ? node.value + '\n' : '';
      // To do: next major, use `node.lang` w/o regex, the splitting’s been going
      // on for years in remark now.
      const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
      /** @type {Properties} */
      const props = {};

      if (lang) {
        props.className = ['language-' + lang];
      }

      const code = h(node, 'code', props, [u$1('text', value)]);

      if (node.meta) {
        code.data = {meta: node.meta};
      }

      return h(node.position, 'pre', [code])
    }

    /**
     * @typedef {import('mdast').Delete} Delete
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Delete} node
     */
    function strikethrough(h, node) {
      return h(node, 'del', all(h, node))
    }

    /**
     * @typedef {import('mdast').Emphasis} Emphasis
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Emphasis} node
     */
    function emphasis(h, node) {
      return h(node, 'em', all(h, node))
    }

    /**
     * @typedef {import('mdast').FootnoteReference} FootnoteReference
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {FootnoteReference} node
     */
    function footnoteReference(h, node) {
      const id = String(node.identifier);
      const safeId = normalizeUri(id.toLowerCase());
      const index = h.footnoteOrder.indexOf(id);
      /** @type {number} */
      let counter;

      if (index === -1) {
        h.footnoteOrder.push(id);
        h.footnoteCounts[id] = 1;
        counter = h.footnoteOrder.length;
      } else {
        h.footnoteCounts[id]++;
        counter = index + 1;
      }

      const reuseCounter = h.footnoteCounts[id];

      return h(node, 'sup', [
        h(
          node.position,
          'a',
          {
            href: '#' + h.clobberPrefix + 'fn-' + safeId,
            id:
              h.clobberPrefix +
              'fnref-' +
              safeId +
              (reuseCounter > 1 ? '-' + reuseCounter : ''),
            dataFootnoteRef: true,
            ariaDescribedBy: 'footnote-label'
          },
          [u$1('text', String(counter))]
        )
      ])
    }

    /**
     * @typedef {import('mdast').Footnote} Footnote
     * @typedef {import('../index.js').Handler} Handler
     *
     * @todo
     *   `footnote` (or “inline note”) are a pandoc footnotes feature (`^[a note]`)
     *   that does not exist in GFM.
     *   We still have support for it, so that things remain working with
     *   `micromark-extension-footnote` and `mdast-util-footnote`, but in the future
     *   we might be able to remove it?
     */

    /**
     * @type {Handler}
     * @param {Footnote} node
     */
    function footnote(h, node) {
      const footnoteById = h.footnoteById;
      let no = 1;

      while (no in footnoteById) no++;

      const identifier = String(no);

      footnoteById[identifier] = {
        type: 'footnoteDefinition',
        identifier,
        children: [{type: 'paragraph', children: node.children}],
        position: node.position
      };

      return footnoteReference(h, {
        type: 'footnoteReference',
        identifier,
        position: node.position
      })
    }

    /**
     * @typedef {import('mdast').Heading} Heading
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Heading} node
     */
    function heading(h, node) {
      return h(node, 'h' + node.depth, all(h, node))
    }

    /**
     * @typedef {import('mdast').HTML} HTML
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * Return either a `raw` node in dangerous mode, otherwise nothing.
     *
     * @type {Handler}
     * @param {HTML} node
     */
    function html$2(h, node) {
      return h.dangerous ? h.augment(node, u$1('raw', node.value)) : null
    }

    /**
     * @typedef {import('mdast').LinkReference} LinkReference
     * @typedef {import('mdast').ImageReference} ImageReference
     * @typedef {import('./index.js').Handler} Handler
     * @typedef {import('./index.js').Content} Content
     */

    /**
     * Return the content of a reference without definition as plain text.
     *
     * @type {Handler}
     * @param {ImageReference|LinkReference} node
     * @returns {Content|Array<Content>}
     */
    function revert(h, node) {
      const subtype = node.referenceType;
      let suffix = ']';

      if (subtype === 'collapsed') {
        suffix += '[]';
      } else if (subtype === 'full') {
        suffix += '[' + (node.label || node.identifier) + ']';
      }

      if (node.type === 'imageReference') {
        return u$1('text', '![' + node.alt + suffix)
      }

      const contents = all(h, node);
      const head = contents[0];

      if (head && head.type === 'text') {
        head.value = '[' + head.value;
      } else {
        contents.unshift(u$1('text', '['));
      }

      const tail = contents[contents.length - 1];

      if (tail && tail.type === 'text') {
        tail.value += suffix;
      } else {
        contents.push(u$1('text', suffix));
      }

      return contents
    }

    /**
     * @typedef {import('mdast').ImageReference} ImageReference
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {ImageReference} node
     */
    function imageReference(h, node) {
      const def = h.definition(node.identifier);

      if (!def) {
        return revert(h, node)
      }

      /** @type {Properties} */
      const props = {src: normalizeUri(def.url || ''), alt: node.alt};

      if (def.title !== null && def.title !== undefined) {
        props.title = def.title;
      }

      return h(node, 'img', props)
    }

    /**
     * @typedef {import('mdast').Image} Image
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Image} node
     */
    function image(h, node) {
      /** @type {Properties} */
      const props = {src: normalizeUri(node.url), alt: node.alt};

      if (node.title !== null && node.title !== undefined) {
        props.title = node.title;
      }

      return h(node, 'img', props)
    }

    /**
     * @typedef {import('mdast').InlineCode} InlineCode
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {InlineCode} node
     */
    function inlineCode(h, node) {
      return h(node, 'code', [u$1('text', node.value.replace(/\r?\n|\r/g, ' '))])
    }

    /**
     * @typedef {import('mdast').LinkReference} LinkReference
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {LinkReference} node
     */
    function linkReference(h, node) {
      const def = h.definition(node.identifier);

      if (!def) {
        return revert(h, node)
      }

      /** @type {Properties} */
      const props = {href: normalizeUri(def.url || '')};

      if (def.title !== null && def.title !== undefined) {
        props.title = def.title;
      }

      return h(node, 'a', props, all(h, node))
    }

    /**
     * @typedef {import('mdast').Link} Link
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Link} node
     */
    function link(h, node) {
      /** @type {Properties} */
      const props = {href: normalizeUri(node.url)};

      if (node.title !== null && node.title !== undefined) {
        props.title = node.title;
      }

      return h(node, 'a', props, all(h, node))
    }

    /**
     * @typedef {import('mdast').ListItem} ListItem
     * @typedef {import('mdast').List} List
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('hast').Element} Element
     * @typedef {import('../index.js').Handler} Handler
     * @typedef {import('../index.js').Content} Content
     */

    /**
     * @type {Handler}
     * @param {ListItem} node
     * @param {List} parent
     */
    function listItem(h, node, parent) {
      const result = all(h, node);
      const loose = parent ? listLoose(parent) : listItemLoose(node);
      /** @type {Properties} */
      const props = {};
      /** @type {Array<Content>} */
      const wrapped = [];

      if (typeof node.checked === 'boolean') {
        /** @type {Element} */
        let paragraph;

        if (
          result[0] &&
          result[0].type === 'element' &&
          result[0].tagName === 'p'
        ) {
          paragraph = result[0];
        } else {
          paragraph = h(null, 'p', []);
          result.unshift(paragraph);
        }

        if (paragraph.children.length > 0) {
          paragraph.children.unshift(u$1('text', ' '));
        }

        paragraph.children.unshift(
          h(null, 'input', {
            type: 'checkbox',
            checked: node.checked,
            disabled: true
          })
        );

        // According to github-markdown-css, this class hides bullet.
        // See: <https://github.com/sindresorhus/github-markdown-css>.
        props.className = ['task-list-item'];
      }

      let index = -1;

      while (++index < result.length) {
        const child = result[index];

        // Add eols before nodes, except if this is a loose, first paragraph.
        if (
          loose ||
          index !== 0 ||
          child.type !== 'element' ||
          child.tagName !== 'p'
        ) {
          wrapped.push(u$1('text', '\n'));
        }

        if (child.type === 'element' && child.tagName === 'p' && !loose) {
          wrapped.push(...child.children);
        } else {
          wrapped.push(child);
        }
      }

      const tail = result[result.length - 1];

      // Add a final eol.
      if (tail && (loose || !('tagName' in tail) || tail.tagName !== 'p')) {
        wrapped.push(u$1('text', '\n'));
      }

      return h(node, 'li', props, wrapped)
    }

    /**
     * @param {List} node
     * @return {Boolean}
     */
    function listLoose(node) {
      let loose = node.spread;
      const children = node.children;
      let index = -1;

      while (!loose && ++index < children.length) {
        loose = listItemLoose(children[index]);
      }

      return Boolean(loose)
    }

    /**
     * @param {ListItem} node
     * @return {Boolean}
     */
    function listItemLoose(node) {
      const spread = node.spread;

      return spread === undefined || spread === null
        ? node.children.length > 1
        : spread
    }

    /**
     * @typedef {import('mdast').List} List
     * @typedef {import('hast').Element} Element
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {List} node
     * @returns {Element}
     */
    function list(h, node) {
      /** @type {Properties} */
      const props = {};
      const name = node.ordered ? 'ol' : 'ul';
      const items = all(h, node);
      let index = -1;

      if (typeof node.start === 'number' && node.start !== 1) {
        props.start = node.start;
      }

      // Like GitHub, add a class for custom styling.
      while (++index < items.length) {
        const item = items[index];

        if (
          item.type === 'element' &&
          item.tagName === 'li' &&
          item.properties &&
          Array.isArray(item.properties.className) &&
          item.properties.className.includes('task-list-item')
        ) {
          props.className = ['contains-task-list'];
          break
        }
      }

      return h(node, name, props, wrap(items, true))
    }

    /**
     * @typedef {import('mdast').Paragraph} Paragraph
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Paragraph} node
     */
    function paragraph(h, node) {
      return h(node, 'p', all(h, node))
    }

    /**
     * @typedef {import('mdast').Root} Root
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Root} node
     */
    function root(h, node) {
      // @ts-expect-error `root`s are also fine.
      return h.augment(node, u$1('root', wrap(all(h, node))))
    }

    /**
     * @typedef {import('mdast').Strong} Strong
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Strong} node
     */
    function strong(h, node) {
      return h(node, 'strong', all(h, node))
    }

    /**
     * @typedef {import('mdast').Table} Table
     * @typedef {import('hast').Element} Element
     * @typedef {import('../index.js').Handler} Handler
     * @typedef {import('../index.js').Content} Content
     */

    /**
     * @type {Handler}
     * @param {Table} node
     */
    function table(h, node) {
      const rows = node.children;
      let index = -1;
      const align = node.align || [];
      /** @type {Array<Element>} */
      const result = [];

      while (++index < rows.length) {
        const row = rows[index].children;
        const name = index === 0 ? 'th' : 'td';
        /** @type {Array<Content>} */
        const out = [];
        let cellIndex = -1;
        const length = node.align ? align.length : row.length;

        while (++cellIndex < length) {
          const cell = row[cellIndex];
          out.push(
            h(cell, name, {align: align[cellIndex]}, cell ? all(h, cell) : [])
          );
        }

        result[index] = h(rows[index], 'tr', wrap(out, true));
      }

      return h(
        node,
        'table',
        wrap(
          [h(result[0].position, 'thead', wrap([result[0]], true))].concat(
            result[1]
              ? h(
                  {
                    start: pointStart(result[1]),
                    end: pointEnd(result[result.length - 1])
                  },
                  'tbody',
                  wrap(result.slice(1), true)
                )
              : []
          ),
          true
        )
      )
    }

    const tab = 9; /* `\t` */
    const space = 32; /* ` ` */

    /**
     * Remove initial and final spaces and tabs at the line breaks in `value`.
     * Does not trim initial and final spaces and tabs of the value itself.
     *
     * @param {string} value
     *   Value to trim.
     * @returns {string}
     *   Trimmed value.
     */
    function trimLines(value) {
      const source = String(value);
      const search = /\r?\n|\r/g;
      let match = search.exec(source);
      let last = 0;
      /** @type {Array<string>} */
      const lines = [];

      while (match) {
        lines.push(
          trimLine(source.slice(last, match.index), last > 0, true),
          match[0]
        );

        last = match.index + match[0].length;
        match = search.exec(source);
      }

      lines.push(trimLine(source.slice(last), last > 0, false));

      return lines.join('')
    }

    /**
     * @param {string} value
     *   Line to trim.
     * @param {boolean} start
     *   Whether to trim the start of the line.
     * @param {boolean} end
     *   Whether to trim the end of the line.
     * @returns {string}
     *   Trimmed line.
     */
    function trimLine(value, start, end) {
      let startIndex = 0;
      let endIndex = value.length;

      if (start) {
        let code = value.codePointAt(startIndex);

        while (code === tab || code === space) {
          startIndex++;
          code = value.codePointAt(startIndex);
        }
      }

      if (end) {
        let code = value.codePointAt(endIndex - 1);

        while (code === tab || code === space) {
          endIndex--;
          code = value.codePointAt(endIndex - 1);
        }
      }

      return endIndex > startIndex ? value.slice(startIndex, endIndex) : ''
    }

    /**
     * @typedef {import('mdast').Text} Text
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {Text} node
     */
    function text(h, node) {
      return h.augment(node, u$1('text', trimLines(String(node.value))))
    }

    /**
     * @typedef {import('mdast').ThematicBreak} ThematicBreak
     * @typedef {import('hast').Element} Element
     * @typedef {import('../index.js').Handler} Handler
     */

    /**
     * @type {Handler}
     * @param {ThematicBreak} [node]
     * @returns {Element}
     */
    function thematicBreak(h, node) {
      return h(node, 'hr')
    }

    const handlers = {
      blockquote,
      break: hardBreak,
      code,
      delete: strikethrough,
      emphasis,
      footnoteReference,
      footnote,
      heading,
      html: html$2,
      imageReference,
      image,
      inlineCode,
      linkReference,
      link,
      listItem,
      list,
      paragraph,
      root,
      strong,
      table,
      text,
      thematicBreak,
      toml: ignore,
      yaml: ignore,
      definition: ignore,
      footnoteDefinition: ignore
    };

    // Return nothing for nodes that are ignored.
    function ignore() {
      return null
    }

    /**
     * @typedef {import('mdast').Root|import('mdast').Parent['children'][number]} MdastNode
     * @typedef {import('hast').Root|import('hast').Parent['children'][number]} HastNode
     * @typedef {import('mdast').Parent} Parent
     * @typedef {import('mdast').Definition} Definition
     * @typedef {import('mdast').FootnoteDefinition} FootnoteDefinition
     * @typedef {import('hast').Properties} Properties
     * @typedef {import('hast').Element} Element
     * @typedef {import('hast').ElementContent} Content
     * @typedef {import('unist-util-position').PositionLike} PositionLike
     *
     * @typedef EmbeddedHastFields
     * @property {string} [hName]
     *   Defines the tag name of an element.
     * @property {Properties} [hProperties]
     *   Defines the properties of an element.
     * @property {Array<Content>} [hChildren]
     *   Defines the (hast) children of an element.
     *
     * @typedef {Record<string, unknown> & EmbeddedHastFields} Data
     *   unist data with embedded hast fields.
     *
     * @typedef {MdastNode & {data?: Data}} NodeWithData
     *   unist node with embedded hast data.
     *
     * @callback Handler
     *   Handle a node.
     * @param {H} h
     *   Handle context.
     * @param {any} node
     *   mdast node to handle.
     * @param {Parent|null} parent
     *   Parent of `node`.
     * @returns {Content|Array<Content>|null|undefined}
     *   hast node.
     *
     * @callback HFunctionProps
     * @param {MdastNode|PositionLike|null|undefined} node
     *   mdast node or unist position.
     * @param {string} tagName
     *   HTML tag name.
     * @param {Properties} props
     *   Properties.
     * @param {Array<Content>?} [children]
     *   hast content.
     * @returns {Element}
     *   Compiled element.
     *
     * @callback HFunctionNoProps
     * @param {MdastNode|PositionLike|null|undefined} node
     *   mdast node or unist position.
     * @param {string} tagName
     *   HTML tag name.
     * @param {Array<Content>?} [children]
     *   hast content
     * @returns {Element}
     *   Compiled element.
     *
     * @typedef HFields
     * @property {boolean} dangerous
     *   Whether HTML is allowed.
     * @property {string} clobberPrefix
     *   Prefix to use to prevent DOM clobbering.
     * @property {string} footnoteLabel
     *   Label to use to introduce the footnote section.
     * @property {string} footnoteLabelTagName
     *   HTML used for the footnote label.
     * @property {Properties} footnoteLabelProperties
     *   Properties on the HTML tag used for the footnote label.
     * @property {string} footnoteBackLabel
     *   Label to use to go back to a footnote call from the footnote section.
     * @property {(identifier: string) => Definition|null} definition
     *   Definition cache.
     * @property {Record<string, FootnoteDefinition>} footnoteById
     *   Footnote cache.
     * @property {Array<string>} footnoteOrder
     *   Order in which footnotes occur.
     * @property {Record<string, number>} footnoteCounts
     *   Counts the same footnote was used.
     * @property {Handlers} handlers
     *   Applied handlers.
     * @property {Handler} unknownHandler
     *   Handler for any none not in `passThrough` or otherwise handled.
     * @property {(left: NodeWithData|PositionLike|null|undefined, right: Content) => Content} augment
     *   Like `h` but lower-level and usable on non-elements.
     * @property {Array<string>} passThrough
     *   List of node types to pass through untouched (except for their children).
     *
     * @typedef Options
     *   Configuration (optional).
     * @property {boolean} [allowDangerousHtml=false]
     *   Whether to allow `html` nodes and inject them as `raw` HTML.
     * @property {string} [clobberPrefix='user-content-']
     *   Prefix to use before the `id` attribute to prevent it from *clobbering*.
     *   attributes.
     *   DOM clobbering is this:
     *
     *   ```html
     *   <p id=x></p>
     *   <script>alert(x)</script>
     *   ```
     *
     *   Elements by their ID are made available in browsers on the `window` object.
     *   Using a prefix prevents this from being a problem.
     * @property {string} [footnoteLabel='Footnotes']
     *   Label to use for the footnotes section.
     *   Affects screen reader users.
     *   Change it if you’re authoring in a different language.
     * @property {string} [footnoteLabelTagName='h2']
     *   HTML tag to use for the footnote label.
     *   Can be changed to match your document structure and play well with your choice of css.
     * @property {Properties} [footnoteLabelProperties={className: ['sr-only']}]
     *   Properties to use on the footnote label.
     *   A 'sr-only' class is added by default to hide this from sighted users.
     *   Change it to make the label visible, or add classes for other purposes.
     * @property {string} [footnoteBackLabel='Back to content']
     *   Label to use from backreferences back to their footnote call.
     *   Affects screen reader users.
     *   Change it if you’re authoring in a different language.
     * @property {Handlers} [handlers]
     *   Object mapping mdast nodes to functions handling them
     * @property {Array<string>} [passThrough]
     *   List of custom mdast node types to pass through (keep) in hast
     * @property {Handler} [unknownHandler]
     *   Handler for all unknown nodes.
     *
     * @typedef {Record<string, Handler>} Handlers
     *   Map of node types to handlers
     * @typedef {HFunctionProps & HFunctionNoProps & HFields} H
     *   Handle context
     */

    const own$3 = {}.hasOwnProperty;

    /**
     * Turn mdast into hast.
     *
     * @param {MdastNode} tree
     *   mdast node.
     * @param {Options} [options]
     *   Configuration (optional).
     * @returns {H}
     *   `h` function.
     */
    function factory(tree, options) {
      const settings = options || {};
      const dangerous = settings.allowDangerousHtml || false;
      /** @type {Record<string, FootnoteDefinition>} */
      const footnoteById = {};

      h.dangerous = dangerous;
      h.clobberPrefix =
        settings.clobberPrefix === undefined || settings.clobberPrefix === null
          ? 'user-content-'
          : settings.clobberPrefix;
      h.footnoteLabel = settings.footnoteLabel || 'Footnotes';
      h.footnoteLabelTagName = settings.footnoteLabelTagName || 'h2';
      h.footnoteLabelProperties = settings.footnoteLabelProperties || {
        className: ['sr-only']
      };
      h.footnoteBackLabel = settings.footnoteBackLabel || 'Back to content';
      h.definition = definitions(tree);
      h.footnoteById = footnoteById;
      /** @type {Array<string>} */
      h.footnoteOrder = [];
      /** @type {Record<string, number>} */
      h.footnoteCounts = {};
      h.augment = augment;
      h.handlers = {...handlers, ...settings.handlers};
      h.unknownHandler = settings.unknownHandler;
      h.passThrough = settings.passThrough;

      visit(tree, 'footnoteDefinition', (definition) => {
        const id = String(definition.identifier).toUpperCase();

        // Mimick CM behavior of link definitions.
        // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8290999/index.js#L26>.
        if (!own$3.call(footnoteById, id)) {
          footnoteById[id] = definition;
        }
      });

      // @ts-expect-error Hush, it’s fine!
      return h

      /**
       * Finalise the created `right`, a hast node, from `left`, an mdast node.
       *
       * @param {(NodeWithData|PositionLike)?} left
       * @param {Content} right
       * @returns {Content}
       */
      function augment(left, right) {
        // Handle `data.hName`, `data.hProperties, `data.hChildren`.
        if (left && 'data' in left && left.data) {
          /** @type {Data} */
          const data = left.data;

          if (data.hName) {
            if (right.type !== 'element') {
              right = {
                type: 'element',
                tagName: '',
                properties: {},
                children: []
              };
            }

            right.tagName = data.hName;
          }

          if (right.type === 'element' && data.hProperties) {
            right.properties = {...right.properties, ...data.hProperties};
          }

          if ('children' in right && right.children && data.hChildren) {
            right.children = data.hChildren;
          }
        }

        if (left) {
          const ctx = 'type' in left ? left : {position: left};

          if (!generated(ctx)) {
            // @ts-expect-error: fine.
            right.position = {start: pointStart(ctx), end: pointEnd(ctx)};
          }
        }

        return right
      }

      /**
       * Create an element for `node`.
       *
       * @type {HFunctionProps}
       */
      function h(node, tagName, props, children) {
        if (Array.isArray(props)) {
          children = props;
          props = {};
        }

        // @ts-expect-error augmenting an element yields an element.
        return augment(node, {
          type: 'element',
          tagName,
          properties: props || {},
          children: children || []
        })
      }
    }

    /**
     * Transform `tree` (an mdast node) to a hast node.
     *
     * @param {MdastNode} tree mdast node
     * @param {Options} [options] Configuration
     * @returns {HastNode|null|undefined} hast node
     */
    function toHast(tree, options) {
      const h = factory(tree, options);
      const node = one(h, tree, null);
      const foot = footer(h);

      if (foot) {
        // @ts-expect-error If there’s a footer, there were definitions, meaning block
        // content.
        // So assume `node` is a parent node.
        node.children.push(u$1('text', '\n'), foot);
      }

      return Array.isArray(node) ? {type: 'root', children: node} : node
    }

    /**
     * @typedef {import('hast').Root} HastRoot
     * @typedef {import('mdast').Root} MdastRoot
     * @typedef {import('mdast-util-to-hast').Options} Options
     * @typedef {import('unified').Processor<any, any, any, any>} Processor
     *
     * @typedef {import('mdast-util-to-hast')} DoNotTouchAsThisImportIncludesRawInTree
     */

    // Note: the `<MdastRoot, HastRoot>` overload doesn’t seem to work :'(

    /**
     * Plugin that turns markdown into HTML to support rehype.
     *
     * *   If a destination processor is given, that processor runs with a new HTML
     *     (hast) tree (bridge-mode).
     *     As the given processor runs with a hast tree, and rehype plugins support
     *     hast, that means rehype plugins can be used with the given processor.
     *     The hast tree is discarded in the end.
     *     It’s highly unlikely that you want to do this.
     * *   The common case is to not pass a destination processor, in which case the
     *     current processor continues running with a new HTML (hast) tree
     *     (mutate-mode).
     *     As the current processor continues with a hast tree, and rehype plugins
     *     support hast, that means rehype plugins can be used after
     *     `remark-rehype`.
     *     It’s likely that this is what you want to do.
     *
     * @param destination
     *   Optional unified processor.
     * @param options
     *   Options passed to `mdast-util-to-hast`.
     */
    const remarkRehype =
      /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
      (
        function (destination, options) {
          return destination && 'run' in destination
            ? bridge(destination, options)
            : mutate(destination || options)
        }
      );

    var remarkRehype$1 = remarkRehype;

    /**
     * Bridge-mode.
     * Runs the destination with the new hast tree.
     *
     * @type {import('unified').Plugin<[Processor, Options?], MdastRoot>}
     */
    function bridge(destination, options) {
      return (node, file, next) => {
        destination.run(toHast(node, options), file, (error) => {
          next(error);
        });
      }
    }

    /**
     * Mutate-mode.
     * Further plugins run on the hast tree.
     *
     * @type {import('unified').Plugin<[Options?]|void[], MdastRoot, HastRoot>}
     */
    function mutate(options) {
      // @ts-expect-error: assume a corresponding node is returned by `toHast`.
      return (node) => toHast(node, options)
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var b$1="function"===typeof Symbol&&Symbol.for,c$1=b$1?Symbol.for("react.element"):60103,d$1=b$1?Symbol.for("react.portal"):60106,e$1=b$1?Symbol.for("react.fragment"):60107,f$1=b$1?Symbol.for("react.strict_mode"):60108,g$1=b$1?Symbol.for("react.profiler"):60114,h$1=b$1?Symbol.for("react.provider"):60109,k$1=b$1?Symbol.for("react.context"):60110,l$1=b$1?Symbol.for("react.async_mode"):60111,m$1=b$1?Symbol.for("react.concurrent_mode"):60111,n$1=b$1?Symbol.for("react.forward_ref"):60112,p$1=b$1?Symbol.for("react.suspense"):60113,q$1=b$1?
    Symbol.for("react.suspense_list"):60120,r=b$1?Symbol.for("react.memo"):60115,t$1=b$1?Symbol.for("react.lazy"):60116,v$1=b$1?Symbol.for("react.block"):60121,w=b$1?Symbol.for("react.fundamental"):60117,x=b$1?Symbol.for("react.responder"):60118,y=b$1?Symbol.for("react.scope"):60119;
    function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c$1:switch(a=a.type,a){case l$1:case m$1:case e$1:case g$1:case f$1:case p$1:return a;default:switch(a=a&&a.$$typeof,a){case k$1:case n$1:case t$1:case r:case h$1:return a;default:return u}}case d$1:return u}}}function A(a){return z(a)===m$1}var AsyncMode=l$1;var ConcurrentMode=m$1;var ContextConsumer$1=k$1;var ContextProvider$1=h$1;var Element$1=c$1;var ForwardRef$1=n$1;var Fragment$1=e$1;var Lazy$1=t$1;var Memo$1=r;var Portal$1=d$1;
    var Profiler$1=g$1;var StrictMode$1=f$1;var Suspense$1=p$1;var isAsyncMode$1=function(a){return A(a)||z(a)===l$1};var isConcurrentMode$1=A;var isContextConsumer$1=function(a){return z(a)===k$1};var isContextProvider$1=function(a){return z(a)===h$1};var isElement$1=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c$1};var isForwardRef$1=function(a){return z(a)===n$1};var isFragment$1=function(a){return z(a)===e$1};var isLazy$1=function(a){return z(a)===t$1};
    var isMemo$1=function(a){return z(a)===r};var isPortal$1=function(a){return z(a)===d$1};var isProfiler$1=function(a){return z(a)===g$1};var isStrictMode$1=function(a){return z(a)===f$1};var isSuspense$1=function(a){return z(a)===p$1};
    var isValidElementType$1=function(a){return "string"===typeof a||"function"===typeof a||a===e$1||a===m$1||a===g$1||a===f$1||a===p$1||a===q$1||"object"===typeof a&&null!==a&&(a.$$typeof===t$1||a.$$typeof===r||a.$$typeof===h$1||a.$$typeof===k$1||a.$$typeof===n$1||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v$1)};var typeOf$1=z;

    var reactIs_production_min$1 = {
    	AsyncMode: AsyncMode,
    	ConcurrentMode: ConcurrentMode,
    	ContextConsumer: ContextConsumer$1,
    	ContextProvider: ContextProvider$1,
    	Element: Element$1,
    	ForwardRef: ForwardRef$1,
    	Fragment: Fragment$1,
    	Lazy: Lazy$1,
    	Memo: Memo$1,
    	Portal: Portal$1,
    	Profiler: Profiler$1,
    	StrictMode: StrictMode$1,
    	Suspense: Suspense$1,
    	isAsyncMode: isAsyncMode$1,
    	isConcurrentMode: isConcurrentMode$1,
    	isContextConsumer: isContextConsumer$1,
    	isContextProvider: isContextProvider$1,
    	isElement: isElement$1,
    	isForwardRef: isForwardRef$1,
    	isFragment: isFragment$1,
    	isLazy: isLazy$1,
    	isMemo: isMemo$1,
    	isPortal: isPortal$1,
    	isProfiler: isProfiler$1,
    	isStrictMode: isStrictMode$1,
    	isSuspense: isSuspense$1,
    	isValidElementType: isValidElementType$1,
    	typeOf: typeOf$1
    };

    var reactIs_development$1 = createCommonjsModule(function (module, exports) {



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
    reactIs_development$1.AsyncMode;
    reactIs_development$1.ConcurrentMode;
    reactIs_development$1.ContextConsumer;
    reactIs_development$1.ContextProvider;
    reactIs_development$1.Element;
    reactIs_development$1.ForwardRef;
    reactIs_development$1.Fragment;
    reactIs_development$1.Lazy;
    reactIs_development$1.Memo;
    reactIs_development$1.Portal;
    reactIs_development$1.Profiler;
    reactIs_development$1.StrictMode;
    reactIs_development$1.Suspense;
    reactIs_development$1.isAsyncMode;
    reactIs_development$1.isConcurrentMode;
    reactIs_development$1.isContextConsumer;
    reactIs_development$1.isContextProvider;
    reactIs_development$1.isElement;
    reactIs_development$1.isForwardRef;
    reactIs_development$1.isFragment;
    reactIs_development$1.isLazy;
    reactIs_development$1.isMemo;
    reactIs_development$1.isPortal;
    reactIs_development$1.isProfiler;
    reactIs_development$1.isStrictMode;
    reactIs_development$1.isSuspense;
    reactIs_development$1.isValidElementType;
    reactIs_development$1.typeOf;

    var reactIs$1 = createCommonjsModule(function (module) {

    if (process.env.NODE_ENV === 'production') {
      module.exports = reactIs_production_min$1;
    } else {
      module.exports = reactIs_development$1;
    }
    });

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
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
    			if (hasOwnProperty.call(from, key)) {
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

    var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

    var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

    var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

    var has$1 = has$2;

    var printWarning$1 = function() {};

    if (process.env.NODE_ENV !== 'production') {
      var ReactPropTypesSecret = ReactPropTypesSecret$1;
      var loggedTypeFailures = {};
      var has = has$1;

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
        } catch (x) { /**/ }
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
    function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
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
                  'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
                  'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
                );
                err.name = 'Invariant Violation';
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning$1(
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

              printWarning$1(
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
    checkPropTypes$1.resetWarningCache = function() {
      if (process.env.NODE_ENV !== 'production') {
        loggedTypeFailures = {};
      }
    };

    var checkPropTypes_1 = checkPropTypes$1;

    var checkPropTypes = checkPropTypes_1;

    var printWarning = function() {};

    if (process.env.NODE_ENV !== 'production') {
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
        bigint: createPrimitiveTypeChecker('bigint'),
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
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === 'object' ? data: {};
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

          if (secret !== ReactPropTypesSecret$1) {
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
                printWarning(
                  'You are manually calling a React.PropTypes validation ' +
                  'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
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

            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
              {expectedType: expectedType}
            );
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
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);
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
          if (!reactIs$1.isValidElementType(propValue)) {
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
              printWarning(
                'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
                'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
              );
            } else {
              printWarning('Invalid argument supplied to oneOf, expected an array.');
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
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
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
          process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
          return emptyFunctionThatReturnsNull;
        }

        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== 'function') {
            printWarning(
              'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
            );
            return emptyFunctionThatReturnsNull;
          }
        }

        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has$1(checkerResult.data, 'expectedType')) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
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

      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
          'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
        );
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
            if (typeof checker !== 'function') {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
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
          // We need to check all keys in case some are required but missing from props.
          var allKeys = objectAssign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has$1(shapeTypes, key) && typeof checker !== 'function') {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
                '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
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

      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;

      return ReactPropTypes;
    };

    function emptyFunction() {}
    function emptyFunctionWithReset() {}
    emptyFunctionWithReset.resetWarningCache = emptyFunction;

    var factoryWithThrowingShims = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret$1) {
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
        bigint: shim,
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

    var require$$1 = factoryWithTypeCheckers;

    var require$$2 = factoryWithThrowingShims;

    var propTypes = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    if (process.env.NODE_ENV !== 'production') {
      var ReactIs = reactIs$1;

      // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod
      var throwOnDirectAccess = true;
      module.exports = require$$1(ReactIs.isElement, throwOnDirectAccess);
    } else {
      // By explicitly using `prop-types` you are opting into new production behavior.
      // http://fb.me/prop-types-in-prod
      module.exports = require$$2();
    }
    });

    var PropTypes = propTypes;

    /**
     * @typedef {import('./info.js').Info} Info
     * @typedef {Record<string, Info>} Properties
     * @typedef {Record<string, string>} Normal
     */

    class Schema {
      /**
       * @constructor
       * @param {Properties} property
       * @param {Normal} normal
       * @param {string} [space]
       */
      constructor(property, normal, space) {
        this.property = property;
        this.normal = normal;
        if (space) {
          this.space = space;
        }
      }
    }

    /** @type {Properties} */
    Schema.prototype.property = {};
    /** @type {Normal} */
    Schema.prototype.normal = {};
    /** @type {string|null} */
    Schema.prototype.space = null;

    /**
     * @typedef {import('./schema.js').Properties} Properties
     * @typedef {import('./schema.js').Normal} Normal
     */

    /**
     * @param {Schema[]} definitions
     * @param {string} [space]
     * @returns {Schema}
     */
    function merge(definitions, space) {
      /** @type {Properties} */
      const property = {};
      /** @type {Normal} */
      const normal = {};
      let index = -1;

      while (++index < definitions.length) {
        Object.assign(property, definitions[index].property);
        Object.assign(normal, definitions[index].normal);
      }

      return new Schema(property, normal, space)
    }

    /**
     * @param {string} value
     * @returns {string}
     */
    function normalize(value) {
      return value.toLowerCase()
    }

    class Info {
      /**
       * @constructor
       * @param {string} property
       * @param {string} attribute
       */
      constructor(property, attribute) {
        /** @type {string} */
        this.property = property;
        /** @type {string} */
        this.attribute = attribute;
      }
    }

    /** @type {string|null} */
    Info.prototype.space = null;
    Info.prototype.boolean = false;
    Info.prototype.booleanish = false;
    Info.prototype.overloadedBoolean = false;
    Info.prototype.number = false;
    Info.prototype.commaSeparated = false;
    Info.prototype.spaceSeparated = false;
    Info.prototype.commaOrSpaceSeparated = false;
    Info.prototype.mustUseProperty = false;
    Info.prototype.defined = false;

    let powers = 0;

    const boolean = increment();
    const booleanish = increment();
    const overloadedBoolean = increment();
    const number = increment();
    const spaceSeparated = increment();
    const commaSeparated = increment();
    const commaOrSpaceSeparated = increment();

    function increment() {
      return 2 ** ++powers
    }

    var types = /*#__PURE__*/Object.freeze({
        __proto__: null,
        boolean: boolean,
        booleanish: booleanish,
        overloadedBoolean: overloadedBoolean,
        number: number,
        spaceSeparated: spaceSeparated,
        commaSeparated: commaSeparated,
        commaOrSpaceSeparated: commaOrSpaceSeparated
    });

    /** @type {Array<keyof types>} */
    // @ts-expect-error: hush.
    const checks = Object.keys(types);

    class DefinedInfo extends Info {
      /**
       * @constructor
       * @param {string} property
       * @param {string} attribute
       * @param {number|null} [mask]
       * @param {string} [space]
       */
      constructor(property, attribute, mask, space) {
        let index = -1;

        super(property, attribute);

        mark(this, 'space', space);

        if (typeof mask === 'number') {
          while (++index < checks.length) {
            const check = checks[index];
            mark(this, checks[index], (mask & types[check]) === types[check]);
          }
        }
      }
    }

    DefinedInfo.prototype.defined = true;

    /**
     * @param {DefinedInfo} values
     * @param {string} key
     * @param {unknown} value
     */
    function mark(values, key, value) {
      if (value) {
        // @ts-expect-error: assume `value` matches the expected value of `key`.
        values[key] = value;
      }
    }

    /**
     * @typedef {import('./schema.js').Properties} Properties
     * @typedef {import('./schema.js').Normal} Normal
     *
     * @typedef {Record<string, string>} Attributes
     *
     * @typedef {Object} Definition
     * @property {Record<string, number|null>} properties
     * @property {(attributes: Attributes, property: string) => string} transform
     * @property {string} [space]
     * @property {Attributes} [attributes]
     * @property {Array<string>} [mustUseProperty]
     */

    const own$2 = {}.hasOwnProperty;

    /**
     * @param {Definition} definition
     * @returns {Schema}
     */
    function create(definition) {
      /** @type {Properties} */
      const property = {};
      /** @type {Normal} */
      const normal = {};
      /** @type {string} */
      let prop;

      for (prop in definition.properties) {
        if (own$2.call(definition.properties, prop)) {
          const value = definition.properties[prop];
          const info = new DefinedInfo(
            prop,
            definition.transform(definition.attributes || {}, prop),
            value,
            definition.space
          );

          if (
            definition.mustUseProperty &&
            definition.mustUseProperty.includes(prop)
          ) {
            info.mustUseProperty = true;
          }

          property[prop] = info;

          normal[normalize(prop)] = prop;
          normal[normalize(info.attribute)] = prop;
        }
      }

      return new Schema(property, normal, definition.space)
    }

    const xlink = create({
      space: 'xlink',
      transform(_, prop) {
        return 'xlink:' + prop.slice(5).toLowerCase()
      },
      properties: {
        xLinkActuate: null,
        xLinkArcRole: null,
        xLinkHref: null,
        xLinkRole: null,
        xLinkShow: null,
        xLinkTitle: null,
        xLinkType: null
      }
    });

    const xml = create({
      space: 'xml',
      transform(_, prop) {
        return 'xml:' + prop.slice(3).toLowerCase()
      },
      properties: {xmlLang: null, xmlBase: null, xmlSpace: null}
    });

    /**
     * @param {Record<string, string>} attributes
     * @param {string} attribute
     * @returns {string}
     */
    function caseSensitiveTransform(attributes, attribute) {
      return attribute in attributes ? attributes[attribute] : attribute
    }

    /**
     * @param {Record<string, string>} attributes
     * @param {string} property
     * @returns {string}
     */
    function caseInsensitiveTransform(attributes, property) {
      return caseSensitiveTransform(attributes, property.toLowerCase())
    }

    const xmlns = create({
      space: 'xmlns',
      attributes: {xmlnsxlink: 'xmlns:xlink'},
      transform: caseInsensitiveTransform,
      properties: {xmlns: null, xmlnsXLink: null}
    });

    const aria = create({
      transform(_, prop) {
        return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase()
      },
      properties: {
        ariaActiveDescendant: null,
        ariaAtomic: booleanish,
        ariaAutoComplete: null,
        ariaBusy: booleanish,
        ariaChecked: booleanish,
        ariaColCount: number,
        ariaColIndex: number,
        ariaColSpan: number,
        ariaControls: spaceSeparated,
        ariaCurrent: null,
        ariaDescribedBy: spaceSeparated,
        ariaDetails: null,
        ariaDisabled: booleanish,
        ariaDropEffect: spaceSeparated,
        ariaErrorMessage: null,
        ariaExpanded: booleanish,
        ariaFlowTo: spaceSeparated,
        ariaGrabbed: booleanish,
        ariaHasPopup: null,
        ariaHidden: booleanish,
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: spaceSeparated,
        ariaLevel: number,
        ariaLive: null,
        ariaModal: booleanish,
        ariaMultiLine: booleanish,
        ariaMultiSelectable: booleanish,
        ariaOrientation: null,
        ariaOwns: spaceSeparated,
        ariaPlaceholder: null,
        ariaPosInSet: number,
        ariaPressed: booleanish,
        ariaReadOnly: booleanish,
        ariaRelevant: null,
        ariaRequired: booleanish,
        ariaRoleDescription: spaceSeparated,
        ariaRowCount: number,
        ariaRowIndex: number,
        ariaRowSpan: number,
        ariaSelected: booleanish,
        ariaSetSize: number,
        ariaSort: null,
        ariaValueMax: number,
        ariaValueMin: number,
        ariaValueNow: number,
        ariaValueText: null,
        role: null
      }
    });

    const html$1 = create({
      space: 'html',
      attributes: {
        acceptcharset: 'accept-charset',
        classname: 'class',
        htmlfor: 'for',
        httpequiv: 'http-equiv'
      },
      transform: caseInsensitiveTransform,
      mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
      properties: {
        // Standard Properties.
        abbr: null,
        accept: commaSeparated,
        acceptCharset: spaceSeparated,
        accessKey: spaceSeparated,
        action: null,
        allow: null,
        allowFullScreen: boolean,
        allowPaymentRequest: boolean,
        allowUserMedia: boolean,
        alt: null,
        as: null,
        async: boolean,
        autoCapitalize: null,
        autoComplete: spaceSeparated,
        autoFocus: boolean,
        autoPlay: boolean,
        capture: boolean,
        charSet: null,
        checked: boolean,
        cite: null,
        className: spaceSeparated,
        cols: number,
        colSpan: null,
        content: null,
        contentEditable: booleanish,
        controls: boolean,
        controlsList: spaceSeparated,
        coords: number | commaSeparated,
        crossOrigin: null,
        data: null,
        dateTime: null,
        decoding: null,
        default: boolean,
        defer: boolean,
        dir: null,
        dirName: null,
        disabled: boolean,
        download: overloadedBoolean,
        draggable: booleanish,
        encType: null,
        enterKeyHint: null,
        form: null,
        formAction: null,
        formEncType: null,
        formMethod: null,
        formNoValidate: boolean,
        formTarget: null,
        headers: spaceSeparated,
        height: number,
        hidden: boolean,
        high: number,
        href: null,
        hrefLang: null,
        htmlFor: spaceSeparated,
        httpEquiv: spaceSeparated,
        id: null,
        imageSizes: null,
        imageSrcSet: null,
        inputMode: null,
        integrity: null,
        is: null,
        isMap: boolean,
        itemId: null,
        itemProp: spaceSeparated,
        itemRef: spaceSeparated,
        itemScope: boolean,
        itemType: spaceSeparated,
        kind: null,
        label: null,
        lang: null,
        language: null,
        list: null,
        loading: null,
        loop: boolean,
        low: number,
        manifest: null,
        max: null,
        maxLength: number,
        media: null,
        method: null,
        min: null,
        minLength: number,
        multiple: boolean,
        muted: boolean,
        name: null,
        nonce: null,
        noModule: boolean,
        noValidate: boolean,
        onAbort: null,
        onAfterPrint: null,
        onAuxClick: null,
        onBeforePrint: null,
        onBeforeUnload: null,
        onBlur: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onContextLost: null,
        onContextMenu: null,
        onContextRestored: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFormData: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLanguageChange: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadEnd: null,
        onLoadStart: null,
        onMessage: null,
        onMessageError: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRejectionHandled: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSecurityPolicyViolation: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onSlotChange: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnhandledRejection: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onWheel: null,
        open: boolean,
        optimum: number,
        pattern: null,
        ping: spaceSeparated,
        placeholder: null,
        playsInline: boolean,
        poster: null,
        preload: null,
        readOnly: boolean,
        referrerPolicy: null,
        rel: spaceSeparated,
        required: boolean,
        reversed: boolean,
        rows: number,
        rowSpan: number,
        sandbox: spaceSeparated,
        scope: null,
        scoped: boolean,
        seamless: boolean,
        selected: boolean,
        shape: null,
        size: number,
        sizes: null,
        slot: null,
        span: number,
        spellCheck: booleanish,
        src: null,
        srcDoc: null,
        srcLang: null,
        srcSet: null,
        start: number,
        step: null,
        style: null,
        tabIndex: number,
        target: null,
        title: null,
        translate: null,
        type: null,
        typeMustMatch: boolean,
        useMap: null,
        value: booleanish,
        width: number,
        wrap: null,

        // Legacy.
        // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
        align: null, // Several. Use CSS `text-align` instead,
        aLink: null, // `<body>`. Use CSS `a:active {color}` instead
        archive: spaceSeparated, // `<object>`. List of URIs to archives
        axis: null, // `<td>` and `<th>`. Use `scope` on `<th>`
        background: null, // `<body>`. Use CSS `background-image` instead
        bgColor: null, // `<body>` and table elements. Use CSS `background-color` instead
        border: number, // `<table>`. Use CSS `border-width` instead,
        borderColor: null, // `<table>`. Use CSS `border-color` instead,
        bottomMargin: number, // `<body>`
        cellPadding: null, // `<table>`
        cellSpacing: null, // `<table>`
        char: null, // Several table elements. When `align=char`, sets the character to align on
        charOff: null, // Several table elements. When `char`, offsets the alignment
        classId: null, // `<object>`
        clear: null, // `<br>`. Use CSS `clear` instead
        code: null, // `<object>`
        codeBase: null, // `<object>`
        codeType: null, // `<object>`
        color: null, // `<font>` and `<hr>`. Use CSS instead
        compact: boolean, // Lists. Use CSS to reduce space between items instead
        declare: boolean, // `<object>`
        event: null, // `<script>`
        face: null, // `<font>`. Use CSS instead
        frame: null, // `<table>`
        frameBorder: null, // `<iframe>`. Use CSS `border` instead
        hSpace: number, // `<img>` and `<object>`
        leftMargin: number, // `<body>`
        link: null, // `<body>`. Use CSS `a:link {color: *}` instead
        longDesc: null, // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
        lowSrc: null, // `<img>`. Use a `<picture>`
        marginHeight: number, // `<body>`
        marginWidth: number, // `<body>`
        noResize: boolean, // `<frame>`
        noHref: boolean, // `<area>`. Use no href instead of an explicit `nohref`
        noShade: boolean, // `<hr>`. Use background-color and height instead of borders
        noWrap: boolean, // `<td>` and `<th>`
        object: null, // `<applet>`
        profile: null, // `<head>`
        prompt: null, // `<isindex>`
        rev: null, // `<link>`
        rightMargin: number, // `<body>`
        rules: null, // `<table>`
        scheme: null, // `<meta>`
        scrolling: booleanish, // `<frame>`. Use overflow in the child context
        standby: null, // `<object>`
        summary: null, // `<table>`
        text: null, // `<body>`. Use CSS `color` instead
        topMargin: number, // `<body>`
        valueType: null, // `<param>`
        version: null, // `<html>`. Use a doctype.
        vAlign: null, // Several. Use CSS `vertical-align` instead
        vLink: null, // `<body>`. Use CSS `a:visited {color}` instead
        vSpace: number, // `<img>` and `<object>`

        // Non-standard Properties.
        allowTransparency: null,
        autoCorrect: null,
        autoSave: null,
        disablePictureInPicture: boolean,
        disableRemotePlayback: boolean,
        prefix: null,
        property: null,
        results: number,
        security: null,
        unselectable: null
      }
    });

    const svg$1 = create({
      space: 'svg',
      attributes: {
        accentHeight: 'accent-height',
        alignmentBaseline: 'alignment-baseline',
        arabicForm: 'arabic-form',
        baselineShift: 'baseline-shift',
        capHeight: 'cap-height',
        className: 'class',
        clipPath: 'clip-path',
        clipRule: 'clip-rule',
        colorInterpolation: 'color-interpolation',
        colorInterpolationFilters: 'color-interpolation-filters',
        colorProfile: 'color-profile',
        colorRendering: 'color-rendering',
        crossOrigin: 'crossorigin',
        dataType: 'datatype',
        dominantBaseline: 'dominant-baseline',
        enableBackground: 'enable-background',
        fillOpacity: 'fill-opacity',
        fillRule: 'fill-rule',
        floodColor: 'flood-color',
        floodOpacity: 'flood-opacity',
        fontFamily: 'font-family',
        fontSize: 'font-size',
        fontSizeAdjust: 'font-size-adjust',
        fontStretch: 'font-stretch',
        fontStyle: 'font-style',
        fontVariant: 'font-variant',
        fontWeight: 'font-weight',
        glyphName: 'glyph-name',
        glyphOrientationHorizontal: 'glyph-orientation-horizontal',
        glyphOrientationVertical: 'glyph-orientation-vertical',
        hrefLang: 'hreflang',
        horizAdvX: 'horiz-adv-x',
        horizOriginX: 'horiz-origin-x',
        horizOriginY: 'horiz-origin-y',
        imageRendering: 'image-rendering',
        letterSpacing: 'letter-spacing',
        lightingColor: 'lighting-color',
        markerEnd: 'marker-end',
        markerMid: 'marker-mid',
        markerStart: 'marker-start',
        navDown: 'nav-down',
        navDownLeft: 'nav-down-left',
        navDownRight: 'nav-down-right',
        navLeft: 'nav-left',
        navNext: 'nav-next',
        navPrev: 'nav-prev',
        navRight: 'nav-right',
        navUp: 'nav-up',
        navUpLeft: 'nav-up-left',
        navUpRight: 'nav-up-right',
        onAbort: 'onabort',
        onActivate: 'onactivate',
        onAfterPrint: 'onafterprint',
        onBeforePrint: 'onbeforeprint',
        onBegin: 'onbegin',
        onCancel: 'oncancel',
        onCanPlay: 'oncanplay',
        onCanPlayThrough: 'oncanplaythrough',
        onChange: 'onchange',
        onClick: 'onclick',
        onClose: 'onclose',
        onCopy: 'oncopy',
        onCueChange: 'oncuechange',
        onCut: 'oncut',
        onDblClick: 'ondblclick',
        onDrag: 'ondrag',
        onDragEnd: 'ondragend',
        onDragEnter: 'ondragenter',
        onDragExit: 'ondragexit',
        onDragLeave: 'ondragleave',
        onDragOver: 'ondragover',
        onDragStart: 'ondragstart',
        onDrop: 'ondrop',
        onDurationChange: 'ondurationchange',
        onEmptied: 'onemptied',
        onEnd: 'onend',
        onEnded: 'onended',
        onError: 'onerror',
        onFocus: 'onfocus',
        onFocusIn: 'onfocusin',
        onFocusOut: 'onfocusout',
        onHashChange: 'onhashchange',
        onInput: 'oninput',
        onInvalid: 'oninvalid',
        onKeyDown: 'onkeydown',
        onKeyPress: 'onkeypress',
        onKeyUp: 'onkeyup',
        onLoad: 'onload',
        onLoadedData: 'onloadeddata',
        onLoadedMetadata: 'onloadedmetadata',
        onLoadStart: 'onloadstart',
        onMessage: 'onmessage',
        onMouseDown: 'onmousedown',
        onMouseEnter: 'onmouseenter',
        onMouseLeave: 'onmouseleave',
        onMouseMove: 'onmousemove',
        onMouseOut: 'onmouseout',
        onMouseOver: 'onmouseover',
        onMouseUp: 'onmouseup',
        onMouseWheel: 'onmousewheel',
        onOffline: 'onoffline',
        onOnline: 'ononline',
        onPageHide: 'onpagehide',
        onPageShow: 'onpageshow',
        onPaste: 'onpaste',
        onPause: 'onpause',
        onPlay: 'onplay',
        onPlaying: 'onplaying',
        onPopState: 'onpopstate',
        onProgress: 'onprogress',
        onRateChange: 'onratechange',
        onRepeat: 'onrepeat',
        onReset: 'onreset',
        onResize: 'onresize',
        onScroll: 'onscroll',
        onSeeked: 'onseeked',
        onSeeking: 'onseeking',
        onSelect: 'onselect',
        onShow: 'onshow',
        onStalled: 'onstalled',
        onStorage: 'onstorage',
        onSubmit: 'onsubmit',
        onSuspend: 'onsuspend',
        onTimeUpdate: 'ontimeupdate',
        onToggle: 'ontoggle',
        onUnload: 'onunload',
        onVolumeChange: 'onvolumechange',
        onWaiting: 'onwaiting',
        onZoom: 'onzoom',
        overlinePosition: 'overline-position',
        overlineThickness: 'overline-thickness',
        paintOrder: 'paint-order',
        panose1: 'panose-1',
        pointerEvents: 'pointer-events',
        referrerPolicy: 'referrerpolicy',
        renderingIntent: 'rendering-intent',
        shapeRendering: 'shape-rendering',
        stopColor: 'stop-color',
        stopOpacity: 'stop-opacity',
        strikethroughPosition: 'strikethrough-position',
        strikethroughThickness: 'strikethrough-thickness',
        strokeDashArray: 'stroke-dasharray',
        strokeDashOffset: 'stroke-dashoffset',
        strokeLineCap: 'stroke-linecap',
        strokeLineJoin: 'stroke-linejoin',
        strokeMiterLimit: 'stroke-miterlimit',
        strokeOpacity: 'stroke-opacity',
        strokeWidth: 'stroke-width',
        tabIndex: 'tabindex',
        textAnchor: 'text-anchor',
        textDecoration: 'text-decoration',
        textRendering: 'text-rendering',
        typeOf: 'typeof',
        underlinePosition: 'underline-position',
        underlineThickness: 'underline-thickness',
        unicodeBidi: 'unicode-bidi',
        unicodeRange: 'unicode-range',
        unitsPerEm: 'units-per-em',
        vAlphabetic: 'v-alphabetic',
        vHanging: 'v-hanging',
        vIdeographic: 'v-ideographic',
        vMathematical: 'v-mathematical',
        vectorEffect: 'vector-effect',
        vertAdvY: 'vert-adv-y',
        vertOriginX: 'vert-origin-x',
        vertOriginY: 'vert-origin-y',
        wordSpacing: 'word-spacing',
        writingMode: 'writing-mode',
        xHeight: 'x-height',
        // These were camelcased in Tiny. Now lowercased in SVG 2
        playbackOrder: 'playbackorder',
        timelineBegin: 'timelinebegin'
      },
      transform: caseSensitiveTransform,
      properties: {
        about: commaOrSpaceSeparated,
        accentHeight: number,
        accumulate: null,
        additive: null,
        alignmentBaseline: null,
        alphabetic: number,
        amplitude: number,
        arabicForm: null,
        ascent: number,
        attributeName: null,
        attributeType: null,
        azimuth: number,
        bandwidth: null,
        baselineShift: null,
        baseFrequency: null,
        baseProfile: null,
        bbox: null,
        begin: null,
        bias: number,
        by: null,
        calcMode: null,
        capHeight: number,
        className: spaceSeparated,
        clip: null,
        clipPath: null,
        clipPathUnits: null,
        clipRule: null,
        color: null,
        colorInterpolation: null,
        colorInterpolationFilters: null,
        colorProfile: null,
        colorRendering: null,
        content: null,
        contentScriptType: null,
        contentStyleType: null,
        crossOrigin: null,
        cursor: null,
        cx: null,
        cy: null,
        d: null,
        dataType: null,
        defaultAction: null,
        descent: number,
        diffuseConstant: number,
        direction: null,
        display: null,
        dur: null,
        divisor: number,
        dominantBaseline: null,
        download: boolean,
        dx: null,
        dy: null,
        edgeMode: null,
        editable: null,
        elevation: number,
        enableBackground: null,
        end: null,
        event: null,
        exponent: number,
        externalResourcesRequired: null,
        fill: null,
        fillOpacity: number,
        fillRule: null,
        filter: null,
        filterRes: null,
        filterUnits: null,
        floodColor: null,
        floodOpacity: null,
        focusable: null,
        focusHighlight: null,
        fontFamily: null,
        fontSize: null,
        fontSizeAdjust: null,
        fontStretch: null,
        fontStyle: null,
        fontVariant: null,
        fontWeight: null,
        format: null,
        fr: null,
        from: null,
        fx: null,
        fy: null,
        g1: commaSeparated,
        g2: commaSeparated,
        glyphName: commaSeparated,
        glyphOrientationHorizontal: null,
        glyphOrientationVertical: null,
        glyphRef: null,
        gradientTransform: null,
        gradientUnits: null,
        handler: null,
        hanging: number,
        hatchContentUnits: null,
        hatchUnits: null,
        height: null,
        href: null,
        hrefLang: null,
        horizAdvX: number,
        horizOriginX: number,
        horizOriginY: number,
        id: null,
        ideographic: number,
        imageRendering: null,
        initialVisibility: null,
        in: null,
        in2: null,
        intercept: number,
        k: number,
        k1: number,
        k2: number,
        k3: number,
        k4: number,
        kernelMatrix: commaOrSpaceSeparated,
        kernelUnitLength: null,
        keyPoints: null, // SEMI_COLON_SEPARATED
        keySplines: null, // SEMI_COLON_SEPARATED
        keyTimes: null, // SEMI_COLON_SEPARATED
        kerning: null,
        lang: null,
        lengthAdjust: null,
        letterSpacing: null,
        lightingColor: null,
        limitingConeAngle: number,
        local: null,
        markerEnd: null,
        markerMid: null,
        markerStart: null,
        markerHeight: null,
        markerUnits: null,
        markerWidth: null,
        mask: null,
        maskContentUnits: null,
        maskUnits: null,
        mathematical: null,
        max: null,
        media: null,
        mediaCharacterEncoding: null,
        mediaContentEncodings: null,
        mediaSize: number,
        mediaTime: null,
        method: null,
        min: null,
        mode: null,
        name: null,
        navDown: null,
        navDownLeft: null,
        navDownRight: null,
        navLeft: null,
        navNext: null,
        navPrev: null,
        navRight: null,
        navUp: null,
        navUpLeft: null,
        navUpRight: null,
        numOctaves: null,
        observer: null,
        offset: null,
        onAbort: null,
        onActivate: null,
        onAfterPrint: null,
        onBeforePrint: null,
        onBegin: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnd: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFocusIn: null,
        onFocusOut: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadStart: null,
        onMessage: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onMouseWheel: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRepeat: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onShow: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onZoom: null,
        opacity: null,
        operator: null,
        order: null,
        orient: null,
        orientation: null,
        origin: null,
        overflow: null,
        overlay: null,
        overlinePosition: number,
        overlineThickness: number,
        paintOrder: null,
        panose1: null,
        path: null,
        pathLength: number,
        patternContentUnits: null,
        patternTransform: null,
        patternUnits: null,
        phase: null,
        ping: spaceSeparated,
        pitch: null,
        playbackOrder: null,
        pointerEvents: null,
        points: null,
        pointsAtX: number,
        pointsAtY: number,
        pointsAtZ: number,
        preserveAlpha: null,
        preserveAspectRatio: null,
        primitiveUnits: null,
        propagate: null,
        property: commaOrSpaceSeparated,
        r: null,
        radius: null,
        referrerPolicy: null,
        refX: null,
        refY: null,
        rel: commaOrSpaceSeparated,
        rev: commaOrSpaceSeparated,
        renderingIntent: null,
        repeatCount: null,
        repeatDur: null,
        requiredExtensions: commaOrSpaceSeparated,
        requiredFeatures: commaOrSpaceSeparated,
        requiredFonts: commaOrSpaceSeparated,
        requiredFormats: commaOrSpaceSeparated,
        resource: null,
        restart: null,
        result: null,
        rotate: null,
        rx: null,
        ry: null,
        scale: null,
        seed: null,
        shapeRendering: null,
        side: null,
        slope: null,
        snapshotTime: null,
        specularConstant: number,
        specularExponent: number,
        spreadMethod: null,
        spacing: null,
        startOffset: null,
        stdDeviation: null,
        stemh: null,
        stemv: null,
        stitchTiles: null,
        stopColor: null,
        stopOpacity: null,
        strikethroughPosition: number,
        strikethroughThickness: number,
        string: null,
        stroke: null,
        strokeDashArray: commaOrSpaceSeparated,
        strokeDashOffset: null,
        strokeLineCap: null,
        strokeLineJoin: null,
        strokeMiterLimit: number,
        strokeOpacity: number,
        strokeWidth: null,
        style: null,
        surfaceScale: number,
        syncBehavior: null,
        syncBehaviorDefault: null,
        syncMaster: null,
        syncTolerance: null,
        syncToleranceDefault: null,
        systemLanguage: commaOrSpaceSeparated,
        tabIndex: number,
        tableValues: null,
        target: null,
        targetX: number,
        targetY: number,
        textAnchor: null,
        textDecoration: null,
        textRendering: null,
        textLength: null,
        timelineBegin: null,
        title: null,
        transformBehavior: null,
        type: null,
        typeOf: commaOrSpaceSeparated,
        to: null,
        transform: null,
        u1: null,
        u2: null,
        underlinePosition: number,
        underlineThickness: number,
        unicode: null,
        unicodeBidi: null,
        unicodeRange: null,
        unitsPerEm: number,
        values: null,
        vAlphabetic: number,
        vMathematical: number,
        vectorEffect: null,
        vHanging: number,
        vIdeographic: number,
        version: null,
        vertAdvY: number,
        vertOriginX: number,
        vertOriginY: number,
        viewBox: null,
        viewTarget: null,
        visibility: null,
        width: null,
        widths: null,
        wordSpacing: null,
        writingMode: null,
        x: null,
        x1: null,
        x2: null,
        xChannelSelector: null,
        xHeight: number,
        y: null,
        y1: null,
        y2: null,
        yChannelSelector: null,
        z: null,
        zoomAndPan: null
      }
    });

    /**
     * @typedef {import('./util/schema.js').Schema} Schema
     */

    const valid = /^data[-\w.:]+$/i;
    const dash = /-[a-z]/g;
    const cap = /[A-Z]/g;

    /**
     * @param {Schema} schema
     * @param {string} value
     * @returns {Info}
     */
    function find(schema, value) {
      const normal = normalize(value);
      let prop = value;
      let Type = Info;

      if (normal in schema.normal) {
        return schema.property[schema.normal[normal]]
      }

      if (normal.length > 4 && normal.slice(0, 4) === 'data' && valid.test(value)) {
        // Attribute or property.
        if (value.charAt(4) === '-') {
          // Turn it into a property.
          const rest = value.slice(5).replace(dash, camelcase);
          prop = 'data' + rest.charAt(0).toUpperCase() + rest.slice(1);
        } else {
          // Turn it into an attribute.
          const rest = value.slice(4);

          if (!dash.test(rest)) {
            let dashes = rest.replace(cap, kebab);

            if (dashes.charAt(0) !== '-') {
              dashes = '-' + dashes;
            }

            value = 'data' + dashes;
          }
        }

        Type = DefinedInfo;
      }

      return new Type(prop, value)
    }

    /**
     * @param {string} $0
     * @returns {string}
     */
    function kebab($0) {
      return '-' + $0.toLowerCase()
    }

    /**
     * @param {string} $0
     * @returns {string}
     */
    function camelcase($0) {
      return $0.charAt(1).toUpperCase()
    }

    const hastToReact = {
      classId: 'classID',
      dataType: 'datatype',
      itemId: 'itemID',
      strokeDashArray: 'strokeDasharray',
      strokeDashOffset: 'strokeDashoffset',
      strokeLineCap: 'strokeLinecap',
      strokeLineJoin: 'strokeLinejoin',
      strokeMiterLimit: 'strokeMiterlimit',
      typeOf: 'typeof',
      xLinkActuate: 'xlinkActuate',
      xLinkArcRole: 'xlinkArcrole',
      xLinkHref: 'xlinkHref',
      xLinkRole: 'xlinkRole',
      xLinkShow: 'xlinkShow',
      xLinkTitle: 'xlinkTitle',
      xLinkType: 'xlinkType',
      xmlnsXLink: 'xmlnsXlink'
    };

    /**
     * @typedef {import('./lib/util/info.js').Info} Info
     * @typedef {import('./lib/util/schema.js').Schema} Schema
     */
    const html = merge([xml, xlink, xmlns, aria, html$1], 'html');
    const svg = merge([xml, xlink, xmlns, aria, svg$1], 'svg');

    /**
     * @typedef {import('unist').Node} Node
     * @typedef {import('hast').Root} Root
     * @typedef {import('hast').Element} Element
     *
     * @callback AllowElement
     * @param {Element} element
     * @param {number} index
     * @param {Element|Root} parent
     * @returns {boolean|undefined}
     *
     * @typedef Options
     * @property {Array<string>} [allowedElements]
     * @property {Array<string>} [disallowedElements=[]]
     * @property {AllowElement} [allowElement]
     * @property {boolean} [unwrapDisallowed=false]
     */

    /**
     * @type {import('unified').Plugin<[Options], Root>}
     */
    function rehypeFilter(options) {
      if (options.allowedElements && options.disallowedElements) {
        throw new TypeError(
          'Only one of `allowedElements` and `disallowedElements` should be defined'
        )
      }

      if (
        options.allowedElements ||
        options.disallowedElements ||
        options.allowElement
      ) {
        return (tree) => {
          visit(tree, 'element', (node, index, parent_) => {
            const parent = /** @type {Element|Root} */ (parent_);
            /** @type {boolean|undefined} */
            let remove;

            if (options.allowedElements) {
              remove = !options.allowedElements.includes(node.tagName);
            } else if (options.disallowedElements) {
              remove = options.disallowedElements.includes(node.tagName);
            }

            if (!remove && options.allowElement && typeof index === 'number') {
              remove = !options.allowElement(node, index, parent);
            }

            if (remove && typeof index === 'number') {
              if (options.unwrapDisallowed && node.children) {
                parent.children.splice(index, 1, ...node.children);
              } else {
                parent.children.splice(index, 1);
              }

              return index
            }

            return undefined
          });
        }
      }
    }

    /**
     * @license React
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var b=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
    function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k:case h:case l:case q:case p:case g:return a;default:return r}}case c:return r}}}var ContextConsumer=h;var ContextProvider=g;var Element=b;var ForwardRef=l;var Fragment=d;var Lazy=q;var Memo=p;var Portal=c;var Profiler=f;var StrictMode=e;var Suspense=m;
    var SuspenseList=n;var isAsyncMode=function(){return !1};var isConcurrentMode=function(){return !1};var isContextConsumer=function(a){return v(a)===h};var isContextProvider=function(a){return v(a)===g};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};var isForwardRef=function(a){return v(a)===l};var isFragment=function(a){return v(a)===d};var isLazy=function(a){return v(a)===q};var isMemo=function(a){return v(a)===p};
    var isPortal=function(a){return v(a)===c};var isProfiler=function(a){return v(a)===f};var isStrictMode=function(a){return v(a)===e};var isSuspense=function(a){return v(a)===m};var isSuspenseList=function(a){return v(a)===n};
    var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?!0:!1};var typeOf=v;

    var reactIs_production_min = {
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
    	SuspenseList: SuspenseList,
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
    	isSuspenseList: isSuspenseList,
    	isValidElementType: isValidElementType,
    	typeOf: typeOf
    };

    var reactIs_development = createCommonjsModule(function (module, exports) {

    if (process.env.NODE_ENV !== "production") {
      (function() {

    // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types.
    var REACT_ELEMENT_TYPE = Symbol.for('react.element');
    var REACT_PORTAL_TYPE = Symbol.for('react.portal');
    var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
    var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
    var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
    var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
    var REACT_CONTEXT_TYPE = Symbol.for('react.context');
    var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
    var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
    var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
    var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
    var REACT_MEMO_TYPE = Symbol.for('react.memo');
    var REACT_LAZY_TYPE = Symbol.for('react.lazy');
    var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');

    // -----------------------------------------------------------------------------

    var enableScopeAPI = false; // Experimental Create Event Handle API.
    var enableCacheElement = false;
    var enableTransitionTracing = false; // No known bugs, but needs performance testing

    var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
    // stuff. Intended to enable React core members to more easily debug scheduling
    // issues in DEV builds.

    var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

    var REACT_MODULE_REFERENCE;

    {
      REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
    }

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
        return true;
      }

      if (typeof type === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
          return true;
        }
      }

      return false;
    }

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_SERVER_CONTEXT_TYPE:
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
    }
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
    var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false;
    var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
        }
      }

      return false;
    }
    function isConcurrentMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
          hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
        }
      }

      return false;
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
    function isSuspenseList(object) {
      return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
    }

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
    exports.SuspenseList = SuspenseList;
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
    exports.isSuspenseList = isSuspenseList;
    exports.isValidElementType = isValidElementType;
    exports.typeOf = typeOf;
      })();
    }
    });
    reactIs_development.ContextConsumer;
    reactIs_development.ContextProvider;
    reactIs_development.Element;
    reactIs_development.ForwardRef;
    reactIs_development.Fragment;
    reactIs_development.Lazy;
    reactIs_development.Memo;
    reactIs_development.Portal;
    reactIs_development.Profiler;
    reactIs_development.StrictMode;
    reactIs_development.Suspense;
    reactIs_development.SuspenseList;
    reactIs_development.isAsyncMode;
    reactIs_development.isConcurrentMode;
    reactIs_development.isContextConsumer;
    reactIs_development.isContextProvider;
    reactIs_development.isElement;
    reactIs_development.isForwardRef;
    reactIs_development.isFragment;
    reactIs_development.isLazy;
    reactIs_development.isMemo;
    reactIs_development.isPortal;
    reactIs_development.isProfiler;
    reactIs_development.isStrictMode;
    reactIs_development.isSuspense;
    reactIs_development.isSuspenseList;
    reactIs_development.isValidElementType;
    reactIs_development.typeOf;

    var reactIs = createCommonjsModule(function (module) {

    if (process.env.NODE_ENV === 'production') {
      module.exports = reactIs_production_min;
    } else {
      module.exports = reactIs_development;
    }
    });

    /**
     * @param {unknown} thing
     * @returns {boolean}
     */
    function whitespace(thing) {
      /** @type {string} */
      var value =
        // @ts-ignore looks like a node.
        thing && typeof thing === 'object' && thing.type === 'text'
          ? // @ts-ignore looks like a text.
            thing.value || ''
          : thing;

      // HTML whitespace expression.
      // See <https://html.spec.whatwg.org/#space-character>.
      return typeof value === 'string' && value.replace(/[ \t\n\f\r]/g, '') === ''
    }

    /**
     * Parse space separated tokens to an array of strings.
     *
     * @param {string} value Space separated tokens
     * @returns {Array.<string>} Tokens
     */

    /**
     * Serialize an array of strings as space separated tokens.
     *
     * @param {Array.<string|number>} values Tokens
     * @returns {string} Space separated tokens
     */
    function stringify$1(values) {
      return values.join(' ').trim()
    }

    /**
     * @typedef {Object} StringifyOptions
     * @property {boolean} [padLeft=true] Whether to pad a space before a token (`boolean`, default: `true`).
     * @property {boolean} [padRight=false] Whether to pad a space after a token (`boolean`, default: `false`).
     */

    /**
     * Serialize an array of strings to comma separated tokens.
     *
     * @param {Array.<string|number>} values
     * @param {StringifyOptions} [options]
     * @returns {string}
     */
    function stringify(values, options) {
      var settings = options || {};

      // Ensure the last empty entry is seen.
      if (values[values.length - 1] === '') {
        values = values.concat('');
      }

      return values
        .join(
          (settings.padRight ? ' ' : '') +
            ',' +
            (settings.padLeft === false ? '' : ' ')
        )
        .trim()
    }

    // http://www.w3.org/TR/CSS21/grammar.html
    // https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
    var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

    var NEWLINE_REGEX = /\n/g;
    var WHITESPACE_REGEX = /^\s*/;

    // declaration
    var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
    var COLON_REGEX = /^:\s*/;
    var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
    var SEMICOLON_REGEX = /^[;\s]*/;

    // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
    var TRIM_REGEX = /^\s+|\s+$/g;

    // strings
    var NEWLINE = '\n';
    var FORWARD_SLASH = '/';
    var ASTERISK = '*';
    var EMPTY_STRING = '';

    // types
    var TYPE_COMMENT = 'comment';
    var TYPE_DECLARATION = 'declaration';

    /**
     * @param {String} style
     * @param {Object} [options]
     * @return {Object[]}
     * @throws {TypeError}
     * @throws {Error}
     */
    var inlineStyleParser = function(style, options) {
      if (typeof style !== 'string') {
        throw new TypeError('First argument must be a string');
      }

      if (!style) return [];

      options = options || {};

      /**
       * Positional.
       */
      var lineno = 1;
      var column = 1;

      /**
       * Update lineno and column based on `str`.
       *
       * @param {String} str
       */
      function updatePosition(str) {
        var lines = str.match(NEWLINE_REGEX);
        if (lines) lineno += lines.length;
        var i = str.lastIndexOf(NEWLINE);
        column = ~i ? str.length - i : column + str.length;
      }

      /**
       * Mark position and patch `node.position`.
       *
       * @return {Function}
       */
      function position() {
        var start = { line: lineno, column: column };
        return function(node) {
          node.position = new Position(start);
          whitespace();
          return node;
        };
      }

      /**
       * Store position information for a node.
       *
       * @constructor
       * @property {Object} start
       * @property {Object} end
       * @property {undefined|String} source
       */
      function Position(start) {
        this.start = start;
        this.end = { line: lineno, column: column };
        this.source = options.source;
      }

      /**
       * Non-enumerable source string.
       */
      Position.prototype.content = style;

      /**
       * Error `msg`.
       *
       * @param {String} msg
       * @throws {Error}
       */
      function error(msg) {
        var err = new Error(
          options.source + ':' + lineno + ':' + column + ': ' + msg
        );
        err.reason = msg;
        err.filename = options.source;
        err.line = lineno;
        err.column = column;
        err.source = style;

        if (options.silent) ; else {
          throw err;
        }
      }

      /**
       * Match `re` and return captures.
       *
       * @param {RegExp} re
       * @return {undefined|Array}
       */
      function match(re) {
        var m = re.exec(style);
        if (!m) return;
        var str = m[0];
        updatePosition(str);
        style = style.slice(str.length);
        return m;
      }

      /**
       * Parse whitespace.
       */
      function whitespace() {
        match(WHITESPACE_REGEX);
      }

      /**
       * Parse comments.
       *
       * @param {Object[]} [rules]
       * @return {Object[]}
       */
      function comments(rules) {
        var c;
        rules = rules || [];
        while ((c = comment())) {
          if (c !== false) {
            rules.push(c);
          }
        }
        return rules;
      }

      /**
       * Parse comment.
       *
       * @return {Object}
       * @throws {Error}
       */
      function comment() {
        var pos = position();
        if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;

        var i = 2;
        while (
          EMPTY_STRING != style.charAt(i) &&
          (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
        ) {
          ++i;
        }
        i += 2;

        if (EMPTY_STRING === style.charAt(i - 1)) {
          return error('End of comment missing');
        }

        var str = style.slice(2, i - 2);
        column += 2;
        updatePosition(str);
        style = style.slice(i);
        column += 2;

        return pos({
          type: TYPE_COMMENT,
          comment: str
        });
      }

      /**
       * Parse declaration.
       *
       * @return {Object}
       * @throws {Error}
       */
      function declaration() {
        var pos = position();

        // prop
        var prop = match(PROPERTY_REGEX);
        if (!prop) return;
        comment();

        // :
        if (!match(COLON_REGEX)) return error("property missing ':'");

        // val
        var val = match(VALUE_REGEX);

        var ret = pos({
          type: TYPE_DECLARATION,
          property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
          value: val
            ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
            : EMPTY_STRING
        });

        // ;
        match(SEMICOLON_REGEX);

        return ret;
      }

      /**
       * Parse declarations.
       *
       * @return {Object[]}
       */
      function declarations() {
        var decls = [];

        comments(decls);

        // declarations
        var decl;
        while ((decl = declaration())) {
          if (decl !== false) {
            decls.push(decl);
            comments(decls);
          }
        }

        return decls;
      }

      whitespace();
      return declarations();
    };

    /**
     * Trim `str`.
     *
     * @param {String} str
     * @return {String}
     */
    function trim(str) {
      return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
    }

    /**
     * Parses inline style to object.
     *
     * @example
     * // returns { 'line-height': '42' }
     * StyleToObject('line-height: 42;');
     *
     * @param  {String}      style      - The inline style.
     * @param  {Function}    [iterator] - The iterator function.
     * @return {null|Object}
     */
    function StyleToObject(style, iterator) {
      var output = null;
      if (!style || typeof style !== 'string') {
        return output;
      }

      var declaration;
      var declarations = inlineStyleParser(style);
      var hasIterator = typeof iterator === 'function';
      var property;
      var value;

      for (var i = 0, len = declarations.length; i < len; i++) {
        declaration = declarations[i];
        property = declaration.property;
        value = declaration.value;

        if (hasIterator) {
          iterator(property, value, declaration);
        } else if (value) {
          output || (output = {});
          output[property] = value;
        }
      }

      return output;
    }

    var styleToObject = StyleToObject;

    /**
     * @template T
     * @typedef {import('react').ComponentType<T>} ComponentType<T>
     */

    const own$1 = {}.hasOwnProperty;

    // The table-related elements that must not contain whitespace text according
    // to React.
    const tableElements = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr']);

    /**
     * @param {Context} context
     * @param {Element|Root} node
     */
    function childrenToReact(context, node) {
      /** @type {Array<ReactNode>} */
      const children = [];
      let childIndex = -1;
      /** @type {Comment|Doctype|Element|Raw|Text} */
      let child;

      while (++childIndex < node.children.length) {
        child = node.children[childIndex];

        if (child.type === 'element') {
          children.push(toReact(context, child, childIndex, node));
        } else if (child.type === 'text') {
          // Currently, a warning is triggered by react for *any* white space in
          // tables.
          // So we drop it.
          // See: <https://github.com/facebook/react/pull/7081>.
          // See: <https://github.com/facebook/react/pull/7515>.
          // See: <https://github.com/remarkjs/remark-react/issues/64>.
          // See: <https://github.com/remarkjs/react-markdown/issues/576>.
          if (
            node.type !== 'element' ||
            !tableElements.has(node.tagName) ||
            !whitespace(child)
          ) {
            children.push(child.value);
          }
        } else if (child.type === 'raw' && !context.options.skipHtml) {
          // Default behavior is to show (encoded) HTML.
          children.push(child.value);
        }
      }

      return children
    }

    /**
     * @param {Context} context
     * @param {Element} node
     * @param {number} index
     * @param {Element|Root} parent
     */
    function toReact(context, node, index, parent) {
      const options = context.options;
      const parentSchema = context.schema;
      /** @type {ReactMarkdownNames} */
      // @ts-expect-error assume a known HTML/SVG element.
      const name = node.tagName;
      /** @type {Record<string, unknown>} */
      const properties = {};
      let schema = parentSchema;
      /** @type {string} */
      let property;

      if (parentSchema.space === 'html' && name === 'svg') {
        schema = svg;
        context.schema = schema;
      }

      if (node.properties) {
        for (property in node.properties) {
          if (own$1.call(node.properties, property)) {
            addProperty(properties, property, node.properties[property], context);
          }
        }
      }

      if (name === 'ol' || name === 'ul') {
        context.listDepth++;
      }

      const children = childrenToReact(context, node);

      if (name === 'ol' || name === 'ul') {
        context.listDepth--;
      }

      // Restore parent schema.
      context.schema = parentSchema;

      // Nodes created by plugins do not have positional info, in which case we use
      // an object that matches the position interface.
      const position = node.position || {
        start: {line: null, column: null, offset: null},
        end: {line: null, column: null, offset: null}
      };
      const component =
        options.components && own$1.call(options.components, name)
          ? options.components[name]
          : name;
      const basic = typeof component === 'string' || component === React.Fragment;

      if (!reactIs.isValidElementType(component)) {
        throw new TypeError(
          `Component for name \`${name}\` not defined or is not renderable`
        )
      }

      properties.key = [
        name,
        position.start.line,
        position.start.column,
        index
      ].join('-');

      if (name === 'a' && options.linkTarget) {
        properties.target =
          typeof options.linkTarget === 'function'
            ? options.linkTarget(
                String(properties.href || ''),
                node.children,
                typeof properties.title === 'string' ? properties.title : null
              )
            : options.linkTarget;
      }

      if (name === 'a' && options.transformLinkUri) {
        properties.href = options.transformLinkUri(
          String(properties.href || ''),
          node.children,
          typeof properties.title === 'string' ? properties.title : null
        );
      }

      if (
        !basic &&
        name === 'code' &&
        parent.type === 'element' &&
        parent.tagName !== 'pre'
      ) {
        properties.inline = true;
      }

      if (
        !basic &&
        (name === 'h1' ||
          name === 'h2' ||
          name === 'h3' ||
          name === 'h4' ||
          name === 'h5' ||
          name === 'h6')
      ) {
        properties.level = Number.parseInt(name.charAt(1), 10);
      }

      if (name === 'img' && options.transformImageUri) {
        properties.src = options.transformImageUri(
          String(properties.src || ''),
          String(properties.alt || ''),
          typeof properties.title === 'string' ? properties.title : null
        );
      }

      if (!basic && name === 'li' && parent.type === 'element') {
        const input = getInputElement(node);
        properties.checked =
          input && input.properties ? Boolean(input.properties.checked) : null;
        properties.index = getElementsBeforeCount(parent, node);
        properties.ordered = parent.tagName === 'ol';
      }

      if (!basic && (name === 'ol' || name === 'ul')) {
        properties.ordered = name === 'ol';
        properties.depth = context.listDepth;
      }

      if (name === 'td' || name === 'th') {
        if (properties.align) {
          if (!properties.style) properties.style = {};
          // @ts-expect-error assume `style` is an object
          properties.style.textAlign = properties.align;
          delete properties.align;
        }

        if (!basic) {
          properties.isHeader = name === 'th';
        }
      }

      if (!basic && name === 'tr' && parent.type === 'element') {
        properties.isHeader = Boolean(parent.tagName === 'thead');
      }

      // If `sourcePos` is given, pass source information (line/column info from markdown source).
      if (options.sourcePos) {
        properties['data-sourcepos'] = flattenPosition(position);
      }

      if (!basic && options.rawSourcePos) {
        properties.sourcePosition = node.position;
      }

      // If `includeElementIndex` is given, pass node index info to components.
      if (!basic && options.includeElementIndex) {
        properties.index = getElementsBeforeCount(parent, node);
        properties.siblingCount = getElementsBeforeCount(parent);
      }

      if (!basic) {
        properties.node = node;
      }

      // Ensure no React warnings are emitted for void elements w/ children.
      return children.length > 0
        ? React.createElement(component, properties, children)
        : React.createElement(component, properties)
    }

    /**
     * @param {Element|Root} node
     * @returns {Element?}
     */
    function getInputElement(node) {
      let index = -1;

      while (++index < node.children.length) {
        const child = node.children[index];

        if (child.type === 'element' && child.tagName === 'input') {
          return child
        }
      }

      return null
    }

    /**
     * @param {Element|Root} parent
     * @param {Element} [node]
     * @returns {number}
     */
    function getElementsBeforeCount(parent, node) {
      let index = -1;
      let count = 0;

      while (++index < parent.children.length) {
        if (parent.children[index] === node) break
        if (parent.children[index].type === 'element') count++;
      }

      return count
    }

    /**
     * @param {Record<string, unknown>} props
     * @param {string} prop
     * @param {unknown} value
     * @param {Context} ctx
     */
    function addProperty(props, prop, value, ctx) {
      const info = find(ctx.schema, prop);
      let result = value;

      // Ignore nullish and `NaN` values.
      // eslint-disable-next-line no-self-compare
      if (result === null || result === undefined || result !== result) {
        return
      }

      // Accept `array`.
      // Most props are space-separated.
      if (Array.isArray(result)) {
        result = info.commaSeparated ? stringify(result) : stringify$1(result);
      }

      if (info.property === 'style' && typeof result === 'string') {
        result = parseStyle$1(result);
      }

      if (info.space && info.property) {
        props[
          own$1.call(hastToReact, info.property)
            ? hastToReact[info.property]
            : info.property
        ] = result;
      } else if (info.attribute) {
        props[info.attribute] = result;
      }
    }

    /**
     * @param {string} value
     * @returns {Record<string, string>}
     */
    function parseStyle$1(value) {
      /** @type {Record<string, string>} */
      const result = {};

      try {
        styleToObject(value, iterator);
      } catch {
        // Silent.
      }

      return result

      /**
       * @param {string} name
       * @param {string} v
       */
      function iterator(name, v) {
        const k = name.slice(0, 4) === '-ms-' ? `ms-${name.slice(4)}` : name;
        result[k.replace(/-([a-z])/g, styleReplacer)] = v;
      }
    }

    /**
     * @param {unknown} _
     * @param {string} $1
     */
    function styleReplacer(_, $1) {
      return $1.toUpperCase()
    }

    /**
     * @param {Position|{start: {line: null, column: null, offset: null}, end: {line: null, column: null, offset: null}}} pos
     * @returns {string}
     */
    function flattenPosition(pos) {
      return [
        pos.start.line,
        ':',
        pos.start.column,
        '-',
        pos.end.line,
        ':',
        pos.end.column
      ]
        .map((d) => String(d))
        .join('')
    }

    /**
     * @typedef {import('react').ReactNode} ReactNode
     * @typedef {import('react').ReactElement<{}>} ReactElement
     * @typedef {import('unified').PluggableList} PluggableList
     * @typedef {import('hast').Root} Root
     * @typedef {import('./rehype-filter.js').Options} FilterOptions
     * @typedef {import('./ast-to-react.js').Options} TransformOptions
     *
     * @typedef CoreOptions
     * @property {string} children
     *
     * @typedef PluginOptions
     * @property {PluggableList} [remarkPlugins=[]]
     * @property {PluggableList} [rehypePlugins=[]]
     * @property {import('remark-rehype').Options | undefined} [remarkRehypeOptions={}]
     *
     * @typedef LayoutOptions
     * @property {string} [className]
     *
     * @typedef {CoreOptions & PluginOptions & LayoutOptions & FilterOptions & TransformOptions} ReactMarkdownOptions
     *
     * @typedef Deprecation
     * @property {string} id
     * @property {string} [to]
     */

    const own = {}.hasOwnProperty;
    const changelog =
      'https://github.com/remarkjs/react-markdown/blob/main/changelog.md';

    /** @type {Record<string, Deprecation>} */
    const deprecated = {
      plugins: {to: 'plugins', id: 'change-plugins-to-remarkplugins'},
      renderers: {to: 'components', id: 'change-renderers-to-components'},
      astPlugins: {id: 'remove-buggy-html-in-markdown-parser'},
      allowDangerousHtml: {id: 'remove-buggy-html-in-markdown-parser'},
      escapeHtml: {id: 'remove-buggy-html-in-markdown-parser'},
      source: {to: 'children', id: 'change-source-to-children'},
      allowNode: {
        to: 'allowElement',
        id: 'replace-allownode-allowedtypes-and-disallowedtypes'
      },
      allowedTypes: {
        to: 'allowedElements',
        id: 'replace-allownode-allowedtypes-and-disallowedtypes'
      },
      disallowedTypes: {
        to: 'disallowedElements',
        id: 'replace-allownode-allowedtypes-and-disallowedtypes'
      },
      includeNodeIndex: {
        to: 'includeElementIndex',
        id: 'change-includenodeindex-to-includeelementindex'
      }
    };

    /**
     * React component to render markdown.
     *
     * @param {ReactMarkdownOptions} options
     * @returns {ReactElement}
     */
    function ReactMarkdown(options) {
      for (const key in deprecated) {
        if (own.call(deprecated, key) && own.call(options, key)) {
          const deprecation = deprecated[key];
          console.warn(
            `[react-markdown] Warning: please ${
          deprecation.to ? `use \`${deprecation.to}\` instead of` : 'remove'
        } \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`
          );
          delete deprecated[key];
        }
      }

      const processor = unified()
        .use(remarkParse)
        .use(options.remarkPlugins || [])
        .use(remarkRehype$1, {
          ...options.remarkRehypeOptions,
          allowDangerousHtml: true
        })
        .use(options.rehypePlugins || [])
        .use(rehypeFilter, options);

      const file = new VFile();

      if (typeof options.children === 'string') {
        file.value = options.children;
      } else if (options.children !== undefined && options.children !== null) {
        console.warn(
          `[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`
        );
      }

      const hastNode = processor.runSync(processor.parse(file), file);

      if (hastNode.type !== 'root') {
        throw new TypeError('Expected a `root` node')
      }

      /** @type {ReactElement} */
      let result = React.createElement(
        React.Fragment,
        {},
        childrenToReact({options, schema: html, listDepth: 0}, hastNode)
      );

      if (options.className) {
        result = React.createElement('div', {className: options.className}, result);
      }

      return result
    }

    ReactMarkdown.defaultProps = {transformLinkUri: uriTransformer};

    ReactMarkdown.propTypes = {
      // Core options:
      children: PropTypes.string,
      // Layout options:
      className: PropTypes.string,
      // Filter options:
      allowElement: PropTypes.func,
      allowedElements: PropTypes.arrayOf(PropTypes.string),
      disallowedElements: PropTypes.arrayOf(PropTypes.string),
      unwrapDisallowed: PropTypes.bool,
      // Plugin options:
      remarkPlugins: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.func,
          PropTypes.arrayOf(
            PropTypes.oneOfType([
              PropTypes.bool,
              PropTypes.string,
              PropTypes.object,
              PropTypes.func,
              PropTypes.arrayOf(
                // prettier-ignore
                // type-coverage:ignore-next-line
                PropTypes.any
              )
            ])
          )
        ])
      ),
      rehypePlugins: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.func,
          PropTypes.arrayOf(
            PropTypes.oneOfType([
              PropTypes.bool,
              PropTypes.string,
              PropTypes.object,
              PropTypes.func,
              PropTypes.arrayOf(
                // prettier-ignore
                // type-coverage:ignore-next-line
                PropTypes.any
              )
            ])
          )
        ])
      ),
      // Transform options:
      sourcePos: PropTypes.bool,
      rawSourcePos: PropTypes.bool,
      skipHtml: PropTypes.bool,
      includeElementIndex: PropTypes.bool,
      transformLinkUri: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      linkTarget: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      transformImageUri: PropTypes.func,
      components: PropTypes.object
    };

    /**
     * cssfilter
     *
     * @author 老雷<leizongmin@gmail.com>
     */

    function getDefaultWhiteList$1 () {
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
    function safeAttrValue$1(name, value) {
      if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
      return value;
    }


    var whiteList$1 = getDefaultWhiteList$1();
    var getDefaultWhiteList_1$1 = getDefaultWhiteList$1;
    var onAttr_1 = onAttr;
    var onIgnoreAttr_1 = onIgnoreAttr;
    var safeAttrValue_1$1 = safeAttrValue$1;

    var _default$1 = {
    	whiteList: whiteList$1,
    	getDefaultWhiteList: getDefaultWhiteList_1$1,
    	onAttr: onAttr_1,
    	onIgnoreAttr: onIgnoreAttr_1,
    	safeAttrValue: safeAttrValue_1$1
    };

    var util$1 = {
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
      css = util$1.trimRight(css);
      if (css[css.length - 1] !== ';') css += ';';
      var cssLength = css.length;
      var isParenthesisOpen = false;
      var lastPos = 0;
      var i = 0;
      var retCSS = '';

      function addNewAttr () {
        // 如果没有正常的闭合圆括号，则直接忽略当前属性
        if (!isParenthesisOpen) {
          var source = util$1.trim(css.slice(lastPos, i));
          var j = source.indexOf(':');
          if (j !== -1) {
            var name = util$1.trim(source.slice(0, j));
            var value = util$1.trim(source.slice(j + 1));
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

      return util$1.trim(retCSS);
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
    function shallowCopyObject$1 (obj) {
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
    function FilterCSS$2 (options) {
      options = shallowCopyObject$1(options || {});
      options.whiteList = options.whiteList || _default$1.whiteList;
      options.onAttr = options.onAttr || _default$1.onAttr;
      options.onIgnoreAttr = options.onIgnoreAttr || _default$1.onIgnoreAttr;
      options.safeAttrValue = options.safeAttrValue || _default$1.safeAttrValue;
      this.options = options;
    }

    FilterCSS$2.prototype.process = function (css) {
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


    var css = FilterCSS$2;

    var lib$1 = createCommonjsModule(function (module, exports) {
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
    for (var i in _default$1) exports[i] = _default$1[i];

    // 在浏览器端使用
    if (typeof window !== 'undefined') {
      window.filterCSS = module.exports;
    }
    });
    lib$1.FilterCSS;

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
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
      spaceIndex: function (str) {
        var reg = /\s|\n|\t/;
        var match = reg.exec(str);
        return match ? match.index : -1;
      },
    };

    /**
     * default settings
     *
     * @author Zongmin Lei<leizongmin@gmail.com>
     */

    var FilterCSS$1 = lib$1.FilterCSS;
    var getDefaultCSSWhiteList = lib$1.getDefaultWhiteList;


    function getDefaultWhiteList() {
      return {
        a: ["target", "href", "title"],
        abbr: ["title"],
        address: [],
        area: ["shape", "coords", "href", "alt"],
        article: [],
        aside: [],
        audio: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "preload",
          "src",
        ],
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
        figcaption: [],
        figure: [],
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
        summary: [],
        sup: [],
        strong: [],
        strike: [],
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
        video: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "playsinline",
          "poster",
          "preload",
          "src",
          "height",
          "width",
        ],
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
    function safeAttrValue(tag, name, value, cssFilter) {
      // unescape attribute value firstly
      value = friendlyAttrValue(value);

      if (name === "href" || name === "src") {
        // filter `href` and `src` attribute
        // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
        value = util.trim(value);
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
    // var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
    var REGEXP_DEFAULT_ON_TAG_ATTR_4 =
      /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
    // var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
    // var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
    var REGEXP_DEFAULT_ON_TAG_ATTR_7 =
      /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
    var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

    /**
     * escape double quote
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
      return util.trim(str2);
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
        next = function () {};
      }

      var isRemoveAllTag = !Array.isArray(tags);
      function isRemoveTag(tag) {
        if (isRemoveAllTag) return true;
        return util.indexOf(tags, tag) !== -1;
      }

      var removeList = [];
      var posStart = false;

      return {
        onIgnoreTag: function (tag, html, options) {
          if (isRemoveTag(tag)) {
            if (options.isClosing) {
              var ret = "[/removed]";
              var end = options.position + ret.length;
              removeList.push([
                posStart !== false ? posStart : options.position,
                end,
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
        remove: function (html) {
          var rethtml = "";
          var lastPos = 0;
          util.forEach(removeList, function (pos) {
            rethtml += html.slice(lastPos, pos[0]);
            lastPos = pos[1];
          });
          rethtml += html.slice(lastPos);
          return rethtml;
        },
      };
    }

    /**
     * remove html comments
     *
     * @param {String} html
     * @return {String}
     */
    function stripCommentTag(html) {
      var retHtml = "";
      var lastPos = 0;
      while (lastPos < html.length) {
        var i = html.indexOf("<!--", lastPos);
        if (i === -1) {
          retHtml += html.slice(lastPos);
          break;
        }
        retHtml += html.slice(lastPos, i);
        var j = html.indexOf("-->", i);
        if (j === -1) {
          break;
        }
        lastPos = j + 3;
      }
      return retHtml;
    }

    /**
     * remove invisible characters
     *
     * @param {String} html
     * @return {String}
     */
    function stripBlankChar(html) {
      var chars = html.split("");
      chars = chars.filter(function (char) {
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

    var whiteList = getDefaultWhiteList();
    var getDefaultWhiteList_1 = getDefaultWhiteList;
    var onTag_1 = onTag;
    var onIgnoreTag_1 = onIgnoreTag;
    var onTagAttr_1 = onTagAttr;
    var onIgnoreTagAttr_1 = onIgnoreTagAttr;
    var safeAttrValue_1 = safeAttrValue;
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

    var _default = {
    	whiteList: whiteList,
    	getDefaultWhiteList: getDefaultWhiteList_1,
    	onTag: onTag_1,
    	onIgnoreTag: onIgnoreTag_1,
    	onTagAttr: onTagAttr_1,
    	onIgnoreTagAttr: onIgnoreTagAttr_1,
    	safeAttrValue: safeAttrValue_1,
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
      var i = util.spaceIndex(html);
      var tagName;
      if (i === -1) {
        tagName = html.slice(1, -1);
      } else {
        tagName = html.slice(1, i + 1);
      }
      tagName = util.trim(tagName).toLowerCase();
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
    function parseTag$1(html, onTag, escapeHtml) {

      var rethtml = "";
      var lastPos = 0;
      var tagStart = false;
      var quoteStart = false;
      var currentPos = 0;
      var len = html.length;
      var currentTagName = "";
      var currentHtml = "";

      chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
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
            if (c === ">" || currentPos === len - 1) {
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
            if (c === '"' || c === "'") {
              var i = 1;
              var ic = html.charAt(currentPos - i);

              while (ic.trim() === "" || ic === "=") {
                if (ic === "=") {
                  quoteStart = c;
                  continue chariterator;
                }
                ic = html.charAt(currentPos - ++i);
              }
            }
          } else {
            if (c === quoteStart) {
              quoteStart = false;
              continue;
            }
          }
        }
      }
      if (lastPos < len) {
        rethtml += escapeHtml(html.substr(lastPos));
      }

      return rethtml;
    }

    var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9\\_:.-]/gim;

    /**
     * parse input attributes and returns processed attributes
     *
     * @param {String} html e.g. `href="#" target="_blank"`
     * @param {Function} onAttr e.g. `function (name, value)`
     * @return {String}
     */
    function parseAttr$1(html, onAttr) {

      var lastPos = 0;
      var lastMarkPos = 0;
      var retAttrs = [];
      var tmpName = false;
      var len = html.length;

      function addAttr(name, value) {
        name = util.trim(name);
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
          lastMarkPos = html.charAt(lastPos) === '"' || html.charAt(lastPos) === "'" ? lastPos : findNextQuotationMark(html, i + 1);
          continue;
        }
        if (tmpName !== false) {
          if (
            i === lastMarkPos
          ) {
            j = html.indexOf(c, i + 1);
            if (j === -1) {
              break;
            } else {
              v = util.trim(html.slice(lastMarkPos + 1, j));
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
              v = util.trim(html.slice(lastPos, i));
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
              v = util.trim(html.slice(lastPos, i));
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
          addAttr(tmpName, stripQuoteWrap(util.trim(html.slice(lastPos))));
        }
      }

      return util.trim(retAttrs.join(" "));
    }

    function findNextEqual(str, i) {
      for (; i < str.length; i++) {
        var c = str[i];
        if (c === " ") continue;
        if (c === "=") return i;
        return -1;
      }
    }

    function findNextQuotationMark(str, i) {
      for (; i < str.length; i++) {
        var c = str[i];
        if (c === " ") continue;
        if (c === "'" || c === '"') return i;
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

    var parseTag_1 = parseTag$1;
    var parseAttr_1 = parseAttr$1;

    var parser = {
    	parseTag: parseTag_1,
    	parseAttr: parseAttr_1
    };

    /**
     * filter xss
     *
     * @author Zongmin Lei<leizongmin@gmail.com>
     */

    var FilterCSS = lib$1.FilterCSS;


    var parseTag = parser.parseTag;
    var parseAttr = parser.parseAttr;


    /**
     * returns `true` if the input value is `undefined` or `null`
     *
     * @param {Object} obj
     * @return {Boolean}
     */
    function isNull(obj) {
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
      var i = util.spaceIndex(html);
      if (i === -1) {
        return {
          html: "",
          closing: html[html.length - 2] === "/",
        };
      }
      html = util.trim(html.slice(i + 1, -1));
      var isClosing = html[html.length - 1] === "/";
      if (isClosing) html = util.trim(html.slice(0, -1));
      return {
        html: html,
        closing: isClosing,
      };
    }

    /**
     * shallow copy
     *
     * @param {Object} obj
     * @return {Object}
     */
    function shallowCopyObject(obj) {
      var ret = {};
      for (var i in obj) {
        ret[i] = obj[i];
      }
      return ret;
    }

    function keysToLowerCase(obj) {
      var ret = {};
      for (var i in obj) {
        if (Array.isArray(obj[i])) {
          ret[i.toLowerCase()] = obj[i].map(function (item) {
            return item.toLowerCase();
          });
        } else {
          ret[i.toLowerCase()] = obj[i];
        }
      }
      return ret;
    }

    /**
     * FilterXSS class
     *
     * @param {Object} options
     *        whiteList (or allowList), onTag, onTagAttr, onIgnoreTag,
     *        onIgnoreTagAttr, safeAttrValue, escapeHtml
     *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
     *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
     */
    function FilterXSS(options) {
      options = shallowCopyObject(options || {});

      if (options.stripIgnoreTag) {
        if (options.onIgnoreTag) {
          console.error(
            'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
          );
        }
        options.onIgnoreTag = _default.onIgnoreTagStripAll;
      }
      if (options.whiteList || options.allowList) {
        options.whiteList = keysToLowerCase(options.whiteList || options.allowList);
      } else {
        options.whiteList = _default.whiteList;
      }

      options.onTag = options.onTag || _default.onTag;
      options.onTagAttr = options.onTagAttr || _default.onTagAttr;
      options.onIgnoreTag = options.onIgnoreTag || _default.onIgnoreTag;
      options.onIgnoreTagAttr = options.onIgnoreTagAttr || _default.onIgnoreTagAttr;
      options.safeAttrValue = options.safeAttrValue || _default.safeAttrValue;
      options.escapeHtml = options.escapeHtml || _default.escapeHtml;
      this.options = options;

      if (options.css === false) {
        this.cssFilter = false;
      } else {
        options.css = options.css || {};
        this.cssFilter = new FilterCSS(options.css);
      }
    }

    /**
     * start process and returns result
     *
     * @param {String} html
     * @return {String}
     */
    FilterXSS.prototype.process = function (html) {
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
        html = _default.stripBlankChar(html);
      }

      // remove html comments
      if (!options.allowCommentTag) {
        html = _default.stripCommentTag(html);
      }

      // if enable stripIgnoreTagBody
      var stripIgnoreTagBody = false;
      if (options.stripIgnoreTagBody) {
        stripIgnoreTagBody = _default.StripTagBody(
          options.stripIgnoreTagBody,
          onIgnoreTag
        );
        onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
      }

      var retHtml = parseTag(
        html,
        function (sourcePosition, position, tag, html, isClosing) {
          var info = {
            sourcePosition: sourcePosition,
            position: position,
            isClosing: isClosing,
            isWhite: Object.prototype.hasOwnProperty.call(whiteList, tag),
          };

          // call `onTag()`
          var ret = onTag(tag, html, info);
          if (!isNull(ret)) return ret;

          if (info.isWhite) {
            if (info.isClosing) {
              return "</" + tag + ">";
            }

            var attrs = getAttrs(html);
            var whiteAttrList = whiteList[tag];
            var attrsHtml = parseAttr(attrs.html, function (name, value) {
              // call `onTagAttr()`
              var isWhiteAttr = util.indexOf(whiteAttrList, name) !== -1;
              var ret = onTagAttr(tag, name, value, isWhiteAttr);
              if (!isNull(ret)) return ret;

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
                ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
                if (!isNull(ret)) return ret;
                return;
              }
            });

            // build new tag html
            html = "<" + tag;
            if (attrsHtml) html += " " + attrsHtml;
            if (attrs.closing) html += " /";
            html += ">";
            return html;
          } else {
            // call `onIgnoreTag()`
            ret = onIgnoreTag(tag, html, info);
            if (!isNull(ret)) return ret;
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

    var lib = createCommonjsModule(function (module, exports) {
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

    (function () {
      for (var i in _default) {
        exports[i] = _default[i];
      }
      for (var j in parser) {
        exports[j] = parser[j];
      }
    })();

    // using `xss` on the browser, output `filterXSS` to the globals
    if (typeof window !== "undefined") {
      window.filterXSS = module.exports;
    }

    // using `xss` on the WebWorker, output `filterXSS` to the globals
    function isWorkerEnv() {
      return (
        typeof self !== "undefined" &&
        typeof DedicatedWorkerGlobalScope !== "undefined" &&
        self instanceof DedicatedWorkerGlobalScope
      );
    }
    if (isWorkerEnv()) {
      self.filterXSS = module.exports;
    }
    });
    var lib_1 = lib.getDefaultWhiteList;
    var lib_2 = lib.filterXSS;
    lib.FilterXSS;

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
                whiteList: tslib.__assign(tslib.__assign({}, lib_1()), whiteList),
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
                return React__namespace.createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } });
            }
            return React__namespace.createElement(ReactMarkdown, { skipHtml: false }, value);
        };
        return FormattedText;
    }(React__namespace.PureComponent));

    function PreviewTabMD(props) {
        var allowFilteredHtml = props.allowFilteredHtml, value = props.value;
        if (typeof value !== 'string') {
            return React__namespace.createElement(InputWrapper, null, "-");
        }
        return (React__namespace.createElement(InputWrapper, null,
            React__namespace.createElement(FormattedText, { value: value, allowFilteredHtml: allowFilteredHtml })));
    }
    var PreviewTab = React__namespace.memo(PreviewTabMD, function (prevProps, newProps) {
        if (newProps.skipRender)
            return false;
        var value = prevProps.value, allowFilteredHtml = prevProps.allowFilteredHtml;
        if (newProps.value !== value ||
            newProps.allowFilteredHtml !== allowFilteredHtml) {
            return true;
        }
        return false;
    });

    function MdTextarea(props) {
        var _a = props.id, id = _a === void 0 ? 'unknown_markdown_id' : _a, value = props.value, toggle = props.toggle, _b = props.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b, rows = props.rows, cols = props.cols, onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur, valid = props.valid, invalid = props.invalid, bsSize = props.bsSize, name = props.name, autoFocus = props.autoFocus, disabled = props.disabled, maxLength = props.maxLength, readOnly = props.readOnly, required = props.required, wrap = props.wrap, whiteList = props.whiteList, filteredValue = props.filteredValue;
        var _c = React__namespace.useState(true), showEdit = _c[0], setShowEdit = _c[1];
        var onEditClick = React__namespace.useCallback(function () {
            if (toggle) {
                setShowEdit(!showEdit);
            }
            else {
                setShowEdit(true);
            }
        }, [showEdit]);
        var onPreviewClick = React__namespace.useCallback(function () {
            if (toggle) {
                setShowEdit(!showEdit);
            }
            else {
                setShowEdit(false);
            }
        }, [showEdit]);
        React__namespace.useEffect(function () {
            if (!filteredValue) {
                return;
            }
            if (typeof value !== 'string') {
                filteredValue.current = undefined;
                return;
            }
            filteredValue.current = FormattedText.filterXss({ value: value, whiteList: whiteList });
        }, [value, whiteList]);
        return (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(reactstrap.Nav, { tabs: true, key: "Nav" },
                React__namespace.createElement(reactstrap.NavItem, null,
                    React__namespace.createElement(reactstrap.NavLink, { active: showEdit, onClick: onEditClick }, "Edit")),
                React__namespace.createElement(reactstrap.NavItem, null,
                    React__namespace.createElement(reactstrap.NavLink, { active: !showEdit, onClick: onPreviewClick }, "Preview"))),
            React__namespace.createElement(reactstrap.TabContent, { key: "Content", id: "tabpane_".concat(id), activeTab: showEdit ? 'Edit' : 'Preview' },
                React__namespace.createElement(reactstrap.TabPane, { tabId: "Edit" },
                    React__namespace.createElement(InputTab, tslib.__assign({ allowFilteredHtml: allowFilteredHtml, value: value, rows: rows, cols: cols }, { onChange: onChange, onFocus: onFocus, onBlur: onBlur }, {
                        valid: valid,
                        name: name,
                        invalid: invalid,
                        bsSize: bsSize,
                    }, {
                        autoFocus: autoFocus,
                        disabled: disabled,
                        maxLength: maxLength,
                        readOnly: readOnly,
                        required: required,
                        wrap: wrap,
                    }))),
                React__namespace.createElement(reactstrap.TabPane, { tabId: "Preview" },
                    React__namespace.createElement(PreviewTab, { allowFilteredHtml: allowFilteredHtml, value: value, skipRender: !showEdit })))));
    }
    var index = React__namespace.memo(MdTextarea);

    exports.FormattedText = FormattedText;
    exports.Textarea = index;

}));
//# sourceMappingURL=textarea.umd.js.map
