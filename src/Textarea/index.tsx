import * as React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  InputProps,
} from 'reactstrap';
import InputTab from './InputTab';
import PreviewTab from './PreviewTab';
import FormattedText from '../FormattedText';

export interface State {
  showEdit: boolean;
}

export interface TextareaProps extends InputProps {
  allowFilteredHtml?: boolean;
  toggle?: boolean;
  whiteList?: { [propName: string]: string[] };
  filteredValue?: React.MutableRefObject<string | undefined>;
}

function MdTextarea(props: TextareaProps) {
  const {
    id = 'unknown_markdown_id',
    value,
    toggle,
    allowFilteredHtml = false,
    rows,
    cols,
    onChange,
    onFocus,
    onBlur,
    valid,
    invalid,
    bsSize,
    name,
    autoFocus,
    disabled,
    maxLength,
    readOnly,
    required,
    wrap,
    whiteList,
    filteredValue,
  } = props;
  const [showEdit, setShowEdit] = React.useState(true);
  const onEditClick = React.useCallback(() => {
    if (toggle) {
      setShowEdit(!showEdit);
    } else {
      setShowEdit(true);
    }
  }, [showEdit]);
  const onPreviewClick = React.useCallback(() => {
    if (toggle) {
      setShowEdit(!showEdit);
    } else {
      setShowEdit(false);
    }
  }, [showEdit]);

  React.useEffect(() => {
    if (!filteredValue) {
      return;
    }

    if (typeof value !== 'string') {
      filteredValue.current = undefined;
      return;
    }

    filteredValue.current = FormattedText.filterXss({ value, whiteList });
  }, [value, whiteList]);

  return (
    <>
      <Nav tabs key="Nav">
        <NavItem>
          <NavLink active={showEdit} onClick={onEditClick}>
            Edit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={!showEdit} onClick={onPreviewClick}>
            Preview
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent
        key="Content"
        id={`tabpane_${id}`}
        activeTab={showEdit ? 'Edit' : 'Preview'}
      >
        <TabPane tabId="Edit">
          <InputTab
            allowFilteredHtml={allowFilteredHtml}
            value={value}
            rows={rows}
            cols={cols}
            {...{ onChange, onFocus, onBlur }}
            {...{
              valid,
              name,
              invalid,
              bsSize,
            }}
            {...{
              autoFocus,
              disabled,
              maxLength,
              readOnly,
              required,
              wrap,
            }}
          />
        </TabPane>
        <TabPane tabId="Preview">
          <PreviewTab
            allowFilteredHtml={allowFilteredHtml}
            value={value}
            skipRender={!showEdit}
          />
        </TabPane>
      </TabContent>
    </>
  );
}

export default React.memo(MdTextarea);
