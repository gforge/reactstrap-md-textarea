'use strict';

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
            whiteList: tslib_1.__assign({}, xss.getDefaultWhiteList(), whiteList),
            stripIgnoreTagBody: ['script'],
        };
        var filteredContent = xss(value, options);
        console.log(filteredContent);
        return (React.createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } }));
    }
    return (React.createElement(ReactMarkdown, { source: value, escapeHtml: false }));
});

var ReactstrapMdTextarea = (function (_super) {
    tslib_1.__extends(ReactstrapMdTextarea, _super);
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
        var _a = this.props, type = _a.type, other = tslib_1.__rest(_a, ["type"]);
        return (React.createElement(reactstrap.Input, tslib_1.__assign({ type: "textarea" }, other)));
    };
    ReactstrapMdTextarea.prototype.renderTabs = function () {
        var _this = this;
        var _a = this.props, id = _a.id, value = _a.value, _b = _a.allowDangerousHtml, allowDangerousHtml = _b === void 0 ? false : _b;
        return (React.createElement(React.Fragment, null,
            React.createElement(reactstrap.Nav, { tabs: true, key: "Nav" },
                React.createElement(reactstrap.NavItem, null,
                    React.createElement(reactstrap.NavLink, { active: this.state.showEdit, onClick: function () { _this.toggle(true); } }, "Edit")),
                React.createElement(reactstrap.NavItem, null,
                    React.createElement(reactstrap.NavLink, { active: !this.state.showEdit, onClick: function () { _this.toggle(false); } }, "Preview"))),
            React.createElement(reactstrap.TabContent, { key: "Content", id: "tabpane_" + id, activeTab: this.state.showEdit ? 'Edit' : 'Preview' },
                React.createElement(reactstrap.TabPane, { tabId: "Edit" },
                    React.createElement(wrapper, null,
                        allowDangerousHtml &&
                            React.createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text."),
                        this.renderTextarea())),
                React.createElement(reactstrap.TabPane, { tabId: "Preview" },
                    React.createElement(wrapper, null,
                        React.createElement(FormattedText, tslib_1.__assign({}, { value: value, allowDangerousHtml: allowDangerousHtml })))))));
    };
    ReactstrapMdTextarea.prototype.render = function () {
        var type = this.props.type;
        if (type && ['text', 'textarea'].includes(type.toLowerCase())) {
            return this.renderTextarea();
        }
        return this.renderTabs();
    };
    return ReactstrapMdTextarea;
}(React.Component));

module.exports = ReactstrapMdTextarea;
//# sourceMappingURL=textarea.js.map
