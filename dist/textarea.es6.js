import { __extends, __rest, __assign } from 'tslib';
import { createElement, Fragment, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import xss from 'xss';
import { Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

var wrapper = function (_a) {
    var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
    return (createElement("div", { style: __assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
};

var FormattedText = (function (_a) {
    var value = _a.value, _b = _a.allowDangerousHtml, allowDangerousHtml = _b === void 0 ? false : _b, _c = _a.whiteList, whiteList = _c === void 0 ? {
        source: ['src', 'type'],
        img: ['src', 'alt', 'title', 'width', 'height', 'style'],
        video: [
            'autoplay', 'controls', 'loop',
            'preload', 'src', 'height',
            'width', 'style',
        ],
    } : _c;
    if (typeof value !== 'string')
        return null;
    if (allowDangerousHtml && value.indexOf('<') === 0) {
        var options = {
            whiteList: __assign({}, xss.getDefaultWhiteList(), whiteList),
            stripIgnoreTagBody: ['script'],
        };
        var filteredContent = xss(value, options);
        console.log(filteredContent);
        return (createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } }));
    }
    return (createElement(ReactMarkdown, { source: value, escapeHtml: false }));
});

var ReactstrapMdTextarea = (function (_super) {
    __extends(ReactstrapMdTextarea, _super);
    function ReactstrapMdTextarea(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showEdit: true,
        };
        _this.toggle = _this.toggle.bind(_this);
        return _this;
    }
    ReactstrapMdTextarea.prototype.toggle = function (show) {
        this.setState({ showEdit: show });
    };
    ReactstrapMdTextarea.prototype.renderTextarea = function () {
        var _a = this.props, type = _a.type, other = __rest(_a, ["type"]);
        return (createElement(Input, __assign({ type: "textarea" }, other)));
    };
    ReactstrapMdTextarea.prototype.renderTabs = function () {
        var _this = this;
        var _a = this.props, id = _a.id, value = _a.value, _b = _a.allowDangerousHtml, allowDangerousHtml = _b === void 0 ? false : _b;
        return (createElement(Fragment, null,
            createElement(Nav, { tabs: true, key: "Nav" },
                createElement(NavItem, null,
                    createElement(NavLink, { active: this.state.showEdit, onClick: function () { _this.toggle(true); } }, "Edit")),
                createElement(NavItem, null,
                    createElement(NavLink, { active: !this.state.showEdit, onClick: function () { _this.toggle(false); } }, "Preview"))),
            createElement(TabContent, { key: "Content", id: "tabpane_" + id, activeTab: this.state.showEdit ? 'Edit' : 'Preview' },
                createElement(TabPane, { tabId: "Edit" },
                    createElement(wrapper, null,
                        allowDangerousHtml &&
                            createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text."),
                        this.renderTextarea())),
                createElement(TabPane, { tabId: "Preview" },
                    createElement(wrapper, null,
                        createElement(FormattedText, __assign({}, { value: value, allowDangerousHtml: allowDangerousHtml })))))));
    };
    ReactstrapMdTextarea.prototype.render = function () {
        var type = this.props.type;
        if (type && ['text', 'textarea'].includes(type.toLowerCase())) {
            return this.renderTextarea();
        }
        return this.renderTabs();
    };
    return ReactstrapMdTextarea;
}(Component));

export default ReactstrapMdTextarea;
//# sourceMappingURL=textarea.es6.js.map
