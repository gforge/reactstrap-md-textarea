import { __extends, __rest, __assign } from 'tslib';
import { createElement, Fragment, Component, PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import xss from 'xss';
import { Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

var wrapper = function (_a) {
    var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
    return (createElement("div", { style: __assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
};

var FormattedText = (function (_super) {
    __extends(FormattedText, _super);
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
            whiteList: __assign({}, xss.getDefaultWhiteList(), whiteList),
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
            return (createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } }));
        }
        return (createElement(ReactMarkdown, { source: value, escapeHtml: false }));
    };
    return FormattedText;
}(PureComponent));

var MdTextarea = (function (_super) {
    __extends(MdTextarea, _super);
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
        var _a = this.props, type = _a.type, allowFilteredHtml = _a.allowFilteredHtml, whiteList = _a.whiteList, other = __rest(_a, ["type", "allowFilteredHtml", "whiteList"]);
        return (createElement(Input, __assign({ type: "textarea" }, other)));
    };
    MdTextarea.prototype.renderTabs = function () {
        var _this = this;
        var _a = this.props, id = _a.id, value = _a.value, toggle = _a.toggle, _b = _a.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b;
        return (createElement(Fragment, null,
            createElement(Nav, { tabs: true, key: "Nav" },
                createElement(NavItem, null,
                    createElement(NavLink, { active: this.state.showEdit, onClick: toggle ? this.handleToggle : function () { _this.toggle(true); } }, "Edit")),
                createElement(NavItem, null,
                    createElement(NavLink, { active: !this.state.showEdit, onClick: toggle ? this.handleToggle : function () { _this.toggle(false); } }, "Preview"))),
            createElement(TabContent, { key: "Content", id: "tabpane_" + id, activeTab: this.state.showEdit ? 'Edit' : 'Preview' },
                createElement(TabPane, { tabId: "Edit" },
                    createElement(wrapper, null,
                        allowFilteredHtml &&
                            createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text."),
                        this.renderTextarea())),
                createElement(TabPane, { tabId: "Preview" },
                    createElement(wrapper, null,
                        createElement(FormattedText, __assign({}, { value: value, allowFilteredHtml: allowFilteredHtml })))))));
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
}(Component));

export { MdTextarea as Textarea, FormattedText };
//# sourceMappingURL=textarea.es6.js.map
