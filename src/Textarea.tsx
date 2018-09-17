import * as React from 'react';
import {
  Input, InputProps,
  Nav, NavItem, NavLink,
  TabContent, TabPane,
} from 'reactstrap';
import InputWrapper from './InputWrapper';
import { default as FormattedText } from './FormattedText';

export interface State {
  showEdit: boolean;
}

export interface Props extends InputProps {
  value: string;
  allowFilteredHtml?: boolean;
  toggle?: boolean;
  whiteList?: { [propName: string]: string[] };
  rows?: number;
  cols?: number;
}

class MdTextarea extends React.PureComponent<Props, State> {
  state = {
    showEdit: true,
  };

  toggle(show: boolean = !this.state.showEdit) {
    this.setState({ showEdit: show });
  }

  handleToggle = () => this.toggle();

  renderTextarea() {
    const { type, allowFilteredHtml, whiteList, ...other } = this.props;
    return (
      <Input
        type="textarea"
        {...other}
      />);
  }

  renderTabs() {
    const { id, value, toggle, allowFilteredHtml = false } = this.props;
    return (
      <React.Fragment>
        <Nav tabs={true} key="Nav">
          <NavItem>
            <NavLink
              active={this.state.showEdit}
              onClick={toggle ? this.handleToggle : () => { this.toggle(true); }}
            >
              Edit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={!this.state.showEdit}
              onClick={toggle ? this.handleToggle : () => { this.toggle(false); }}
            >
              Preview
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          key="Content"
          id={`tabpane_${id}`}
          activeTab={this.state.showEdit ? 'Edit' : 'Preview'}
        >
          <TabPane tabId="Edit">
            <InputWrapper>
              {allowFilteredHtml &&
                <p>
                  You can input markdown or html (start with &lt; to indicate html)
                  for styling the text.
                </p>
              }
              {this.renderTextarea()}
            </InputWrapper>
          </TabPane>
          <TabPane tabId="Preview">
            <InputWrapper>
              <FormattedText {...{ value, allowFilteredHtml }} />
            </InputWrapper>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }

  getFilteredValue() {
    const { value, whiteList } = this.props;
    return FormattedText.filterXss({ value, whiteList });
  }

  render() {
    const { type } = this.props;
    if (type && ['text', 'textarea'].includes(type.toLowerCase())) {
      return this.renderTextarea();
    }

    return this.renderTabs();
  }
}

export default MdTextarea;
