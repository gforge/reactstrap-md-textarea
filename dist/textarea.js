'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_1 = require('tslib');
var React = require('react');
var ReactMarkdown = _interopDefault(require('react-markdown'));
var xss = _interopDefault(require('xss'));
var reactstrap = require('reactstrap');

var wrapper = function (_a) {
    var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
    return (React.createElement("div", { style: tslib_1.__assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
};

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

var MdTextarea = (function (_super) {
    tslib_1.__extends(MdTextarea, _super);
    function MdTextarea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showEdit: true,
        };
        _this.handleToggle = function () { return _this.toggle(); };
        return _this;
    }
    MdTextarea.prototype.toggle = function (show) {
        if (show === void 0) { show = !this.state.showEdit; }
        this.setState({ showEdit: show });
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
//# sourceMappingURL=textarea.js.map
