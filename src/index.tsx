import * as React from 'react';
import {
  Input, InputProps,
  Nav, NavItem, NavLink,
  TabContent, TabPane,
} from 'reactstrap';
import InputWrapper from './InputWrapper';
import FormattedText from './FormattedText';

export interface State {
  showEdit: boolean;
}

export interface Props extends InputProps {
  value: string;
  allowDangerousHtml?: boolean;
  rows?: number;
  cols?: number;
}

class ReactstrapMdTextarea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }
  state = {
    showEdit: true,
  };

  toggle(show: boolean) {
    this.setState({ showEdit: show });
  }

  renderTextarea() {
    const { type, ...other } = this.props;
    return (
      <Input
        type="textarea"
        {...other}
      />);
  }

  renderTabs() {
    const { id, value, allowDangerousHtml = false } = this.props;
    return (
      <React.Fragment>
        <Nav tabs={true} key="Nav">
          <NavItem>
            <NavLink
              active={this.state.showEdit}
              onClick={() => { this.toggle(true); }}
            >
              Edit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={!this.state.showEdit}
              onClick={() => { this.toggle(false); }}
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
              {allowDangerousHtml &&
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
              <FormattedText {...{ value, allowDangerousHtml }} />
            </InputWrapper>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }

  render() {
    const { type } = this.props;
    if (type && ['text', 'textarea'].includes(type.toLowerCase())) {
      return this.renderTextarea();
    }

    return this.renderTabs();
  }
}

export default ReactstrapMdTextarea;
