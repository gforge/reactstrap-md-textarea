'use strict';

var tslib = require('tslib');
var React = require('react');
var reactstrap = require('reactstrap');
var ReactMarkdown = require('react-markdown');
var xss = require('xss');

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
            whiteList: tslib.__assign(tslib.__assign({}, xss.getDefaultWhiteList()), whiteList),
            stripIgnoreTagBody: ['script'],
        };
        return xss.filterXSS(value, options);
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
//# sourceMappingURL=textarea.js.map
