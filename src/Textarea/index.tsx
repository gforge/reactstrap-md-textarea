import * as React from 'react';
import {
  Nav, NavItem, NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import InputTab, { Props as InputProps } from './InputTab';
import PreviewTab from './PreviewTab';
import { default as FormattedText } from '../FormattedText';

export interface State {
  showEdit: boolean;
}

export interface Props extends InputProps {
  id: string;
  value: string;
  allowFilteredHtml: boolean;
  toggle?: boolean;
  whiteList?: { [propName: string]: string[] };
}

class MdTextarea extends React.PureComponent<Props, State> {
  static defaultProps = {
    allowFilteredHtml: false,
    id: 'unknown_markdown_id',
  };

  state = {
    showEdit: true,
  };

  toggle(show: boolean = !this.state.showEdit) {
    this.setState({ showEdit: show });
  }

  handleToggle = () => this.toggle();
  activateEdit = () => this.toggle(true);
  deActivateEdit = () => this.toggle(false);

  render() {
    const {
      id, value, toggle, allowFilteredHtml,
      rows, cols, onChange, onFocus, onBlur,
      valid, invalid, bsSize, name,
      autoFocus, disabled, maxLength, readOnly, required, wrap,
    } = this.props;
    const { showEdit } = this.state;

    return (
      <React.Fragment>
        <Nav tabs={true} key="Nav">
          <NavItem>
            <NavLink
              active={showEdit}
              onClick={toggle ? this.handleToggle : this.activateEdit}
            >
              Edit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={!showEdit}
              onClick={toggle ? this.handleToggle : this.deActivateEdit}
            >
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
              {...{ valid, name, invalid, bsSize }}
              {...{ autoFocus, disabled, maxLength, readOnly, required, wrap }}
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
      </React.Fragment>
    );
  }

  getFilteredValue() {
    const { value, whiteList } = this.props;
    return FormattedText.filterXss({ value, whiteList });
  }
}

export default MdTextarea;
