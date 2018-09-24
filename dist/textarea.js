'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_1 = require('tslib');
var React = require('react');
var reactstrap = require('reactstrap');
var ReactMarkdown = _interopDefault(require('react-markdown'));
var xss = _interopDefault(require('xss'));

var wrapper = function (_a) {
    var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
    return (React.createElement("div", { style: tslib_1.__assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
};

var InputTabMD = (function (_super) {
    tslib_1.__extends(InputTabMD, _super);
    function InputTabMD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputTabMD.prototype.render = function () {
        var _a = this.props, allowFilteredHtml = _a.allowFilteredHtml, other = tslib_1.__rest(_a, ["allowFilteredHtml"]);
        return (React.createElement(wrapper, null,
            allowFilteredHtml &&
                React.createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text."),
            React.createElement(reactstrap.Input, tslib_1.__assign({ type: "textarea" }, other))));
    };
    return InputTabMD;
}(React.PureComponent));

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
            whiteList: tslib_1.__assign({}, xss.getDefaultWhiteList(), whiteList),
            stripIgnoreTagBody: ['script'],
        };
        return xss(value, options);
    };
    FormattedText.prototype.render = function () {
        var _a = this.props, value = _a.value, _b = _a.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b, whiteList = _a.whiteList;
        if (typeof value !== 'string')
            return null;
        if (allowFilteredHtml && value.indexOf('<') === 0) {
            var filteredContent = FormattedText.filterXss({ value: value, whiteList: whiteList });
            return (React.createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } }));
        }
        return (React.createElement(ReactMarkdown, { source: value, escapeHtml: false }));
    };
    return FormattedText;
}(React.PureComponent));

var PreviewTabMD = (function (_super) {
    tslib_1.__extends(PreviewTabMD, _super);
    function PreviewTabMD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviewTabMD.prototype.shouldComponentUpdate = function (newProps) {
        if (newProps.skipRender)
            return false;
        var _a = this.props, value = _a.value, allowFilteredHtml = _a.allowFilteredHtml;
        if (newProps.value !== value ||
            newProps.allowFilteredHtml !== allowFilteredHtml) {
            return true;
        }
        return false;
    };
    PreviewTabMD.prototype.render = function () {
        var _a = this.props, allowFilteredHtml = _a.allowFilteredHtml, value = _a.value;
        return (React.createElement(wrapper, null,
            React.createElement(FormattedText, { value: value, allowFilteredHtml: allowFilteredHtml })));
    };
    return PreviewTabMD;
}(React.Component));

var MdTextarea = (function (_super) {
    tslib_1.__extends(MdTextarea, _super);
    function MdTextarea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showEdit: true,
        };
        _this.handleToggle = function () { return _this.toggle(); };
        _this.activateEdit = function () { return _this.toggle(true); };
        _this.deActivateEdit = function () { return _this.toggle(false); };
        return _this;
    }
    MdTextarea.prototype.toggle = function (show) {
        if (show === void 0) { show = !this.state.showEdit; }
        this.setState({ showEdit: show });
    };
    MdTextarea.prototype.render = function () {
        var _a = this.props, id = _a.id, value = _a.value, toggle = _a.toggle, allowFilteredHtml = _a.allowFilteredHtml, rows = _a.rows, cols = _a.cols, onChange = _a.onChange, onFocus = _a.onFocus, onBlur = _a.onBlur, valid = _a.valid, invalid = _a.invalid, bsSize = _a.bsSize, name = _a.name, autoFocus = _a.autoFocus, disabled = _a.disabled, maxLength = _a.maxLength, readOnly = _a.readOnly, required = _a.required, wrap = _a.wrap;
        var showEdit = this.state.showEdit;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap.Nav, { tabs: true, key: "Nav" },
                React.createElement(reactstrap.NavItem, null,
                    React.createElement(reactstrap.NavLink, { active: showEdit, onClick: toggle ? this.handleToggle : this.activateEdit }, "Edit")),
                React.createElement(reactstrap.NavItem, null,
                    React.createElement(reactstrap.NavLink, { active: !showEdit, onClick: toggle ? this.handleToggle : this.deActivateEdit }, "Preview"))),
            React.createElement(reactstrap.TabContent, { key: "Content", id: "tabpane_" + id, activeTab: showEdit ? 'Edit' : 'Preview' },
                React.createElement(reactstrap.TabPane, { tabId: "Edit" },
                    React.createElement(InputTabMD, tslib_1.__assign({ allowFilteredHtml: allowFilteredHtml, value: value, rows: rows, cols: cols }, { onChange: onChange, onFocus: onFocus, onBlur: onBlur }, { valid: valid, name: name, invalid: invalid, bsSize: bsSize }, { autoFocus: autoFocus, disabled: disabled, maxLength: maxLength, readOnly: readOnly, required: required, wrap: wrap }))),
                React.createElement(reactstrap.TabPane, { tabId: "Preview" },
                    React.createElement(PreviewTabMD, { allowFilteredHtml: allowFilteredHtml, value: value, skipRender: !showEdit })))));
    };
    MdTextarea.prototype.getFilteredValue = function () {
        var _a = this.props, value = _a.value, whiteList = _a.whiteList;
        return FormattedText.filterXss({ value: value, whiteList: whiteList });
    };
    MdTextarea.defaultProps = {
        allowFilteredHtml: false,
        id: 'unknown_markdown_id',
    };
    return MdTextarea;
}(React.PureComponent));

exports.Textarea = MdTextarea;
exports.FormattedText = FormattedText;
//# sourceMappingURL=textarea.js.map
