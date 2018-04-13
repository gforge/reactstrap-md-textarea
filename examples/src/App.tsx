import * as React from 'react';
import { Textarea, FormattedText } from 'reactstrap-md-textarea';
import { Card, CardHeader, CardBody } from 'reactstrap';

import './App.css';

const mdTxt =
  `## Markdown input
Yeah, everything one could ever dream of!
`;

const htmlTxt =
  `<h3>Pure html input</h3>

<p>Yeah, everything one could ever dream of!</p>

<p>This also allows for including videos, imgs etc:</p>

<img src="https://openclipart.org/download/174860/bookworm-penguin.svg" width="300px"/>
`;

class App extends React.Component {
  state = {
    mdTxt,
    htmlTxt,
  };

  onChange(tag: string, value: string) {
    const newState = {};
    newState[tag] = value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test for reactstrap-md-textarea</h1>
        </header>
        <article>

          <h1>Some textarea examples</h1>

          <Card>
            <CardHeader>Basic</CardHeader>
            <CardBody>
              <Textarea
                onChange={(e) => this.onChange('mdTxt', e.target.value)}
                value={this.state.mdTxt}
              />
            </CardBody>
          </Card>

          <br />
          <Card>
            <CardHeader>Html based</CardHeader>

            <CardBody>
              <Textarea
                onChange={(e) => this.onChange('htmlTxt', e.target.value)}
                rows={10}
                allowFilteredHtml={true}
                value={this.state.htmlTxt}
              />
            </CardBody>
          </Card>

          <br />
          <Card>
            <CardHeader>Allow toggling back and forth</CardHeader>

            <CardBody>
              <Textarea
                onChange={(e) => this.onChange('mdTxt', e.target.value)}
                value={this.state.mdTxt}
                toggle={true}
              />
              <p>
                Note that the <code>allowFilteredHtml</code> must be set for the html to be parsed.
              </p>
            </CardBody>
          </Card>

          <br />
          <h1>The filtered output from the html</h1>

          <Card>
            <CardHeader>Pure output from <code>FormattedText.filterXss</code></CardHeader>
            <CardBody>
              <code>
                <pre>
                  {FormattedText.filterXss({ value: this.state.htmlTxt })}
                </pre>
              </code>
            </CardBody>
          </Card>

          <br />
          <Card>
            <CardHeader>The FormattedText component</CardHeader>
            <CardBody>
              <FormattedText value={this.state.htmlTxt} allowFilteredHtml={true} />
            </CardBody>
          </Card>
        </article>
      </div>
    );
  }
}

export default App;
