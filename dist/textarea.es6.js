import { __assign, __rest, __extends } from 'tslib';
import { memo, createElement, PureComponent, useState, useCallback, useEffect, Fragment } from 'react';
import { Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { getDefaultWhiteList, filterXSS } from 'xss';

var wrapper = function (_a) {
    var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b;
    return (createElement("div", { style: __assign({ border: '1px solid #ddd', borderTop: '0px', borderRadius: '5px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '10px', backgroundColor: '#fff', textAlign: 'left' }, style) }, children));
};
var InputWrapper = memo(wrapper);

var InputTabMD = function (props) {
    var allowFilteredHtml = props.allowFilteredHtml, other = __rest(props, ["allowFilteredHtml"]);
    return (createElement(InputWrapper, null,
        allowFilteredHtml && (createElement("p", null, "You can input markdown or html (start with < to indicate html) for styling the text.")),
        createElement(Input, __assign({ type: "textarea" }, other))));
};
var InputTab = memo(InputTabMD);

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
            whiteList: __assign(__assign({}, getDefaultWhiteList()), whiteList),
            stripIgnoreTagBody: ['script'],
        };
        return filterXSS(value, options);
    };
    FormattedText.prototype.render = function () {
        var _a = this.props, value = _a.value, _b = _a.allowFilteredHtml, allowFilteredHtml = _b === void 0 ? false : _b, whiteList = _a.whiteList;
        if (typeof value !== 'string')
            return null;
        if (allowFilteredHtml && value.indexOf('<') === 0) {
            var filteredContent = FormattedText.filterXss({ value: value, whiteList: whiteList });
            return createElement("div", { dangerouslySetInnerHTML: { __html: filteredContent } });
        }
        return createElement(ReactMarkdown, { source: value, escapeHtml: false });
    };
    return FormattedText;
}(PureComponent));

var PreviewTabMD = function (props) {
    var allowFilteredHtml = props.allowFilteredHtml, value = props.value;
    if (typeof value !== 'string') {
        return createElement(InputWrapper, null, "-");
    }
    return (createElement(InputWrapper, null,
        createElement(FormattedText, { value: value, allowFilteredHtml: allowFilteredHtml })));
};
var PreviewTab = memo(PreviewTabMD, function (prevProps, newProps) {
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
    var _c = useState(true), showEdit = _c[0], setShowEdit = _c[1];
    var onEditClick = useCallback(function () {
        if (toggle) {
            setShowEdit(!showEdit);
        }
        else {
            setShowEdit(true);
        }
    }, [showEdit]);
    var onPreviewClick = useCallback(function () {
        if (toggle) {
            setShowEdit(!showEdit);
        }
        else {
            setShowEdit(false);
        }
    }, [showEdit]);
    useEffect(function () {
        if (!filteredValue) {
            return;
        }
        if (typeof value !== 'string') {
            filteredValue.current = undefined;
            return;
        }
        filteredValue.current = FormattedText.filterXss({ value: value, whiteList: whiteList });
    }, [value, whiteList]);
    return (createElement(Fragment, null,
        createElement(Nav, { tabs: true, key: "Nav" },
            createElement(NavItem, null,
                createElement(NavLink, { active: showEdit, onClick: onEditClick }, "Edit")),
            createElement(NavItem, null,
                createElement(NavLink, { active: !showEdit, onClick: onPreviewClick }, "Preview"))),
        createElement(TabContent, { key: "Content", id: "tabpane_" + id, activeTab: showEdit ? 'Edit' : 'Preview' },
            createElement(TabPane, { tabId: "Edit" },
                createElement(InputTab, __assign({ allowFilteredHtml: allowFilteredHtml, value: value, rows: rows, cols: cols }, { onChange: onChange, onFocus: onFocus, onBlur: onBlur }, { valid: valid, name: name, invalid: invalid, bsSize: bsSize }, { autoFocus: autoFocus, disabled: disabled, maxLength: maxLength, readOnly: readOnly, required: required, wrap: wrap }))),
            createElement(TabPane, { tabId: "Preview" },
                createElement(PreviewTab, { allowFilteredHtml: allowFilteredHtml, value: value, skipRender: !showEdit })))));
};
var index = memo(MdTextarea);

export { FormattedText, index as Textarea };
//# sourceMappingURL=textarea.es6.js.map
