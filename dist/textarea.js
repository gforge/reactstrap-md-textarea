'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var React = require('react');
var reactstrap = require('reactstrap');
var ReactMarkdown = _interopDefault(require('react-markdown'));
var xss = require('xss');

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
            return React.createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } });
        }
        return React.createElement(ReactMarkdown, { source: value, escapeHtml: false });
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
var index = React.memo(MdTextarea);

exports.FormattedText = FormattedText;
exports.Textarea = index;
//# sourceMappingURL=textarea.js.map
