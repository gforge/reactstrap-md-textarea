import * as React from 'react';
import { Textarea, FormattedText } from 'reactstrap-md-textarea';

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

        <h2>Basic</h2>
        <Textarea
          onChange={(e) => this.onChange('mdTxt', e.target.value)}
          value={this.state.mdTxt}
        />

        <div className="spacer" />
        <h2>Html based</h2>

        <Textarea
          onChange={(e) => this.onChange('htmlTxt', e.target.value)}
          rows={10}
          allowFilteredHtml={true}
          value={this.state.htmlTxt}
        />

        <div className="spacer" />
        <h2>Allow toggling back and forth</h2>

        <Textarea
          onChange={(e) => this.onChange('mdTxt', e.target.value)}
          value={this.state.mdTxt}
          toggle={true}
        />

        <p>
          Note that the allowFilteredHtml must be set for the html to be parsed.
        </p>

        <h1>The filtered output from the html</h1>
        <p>The output when using <code>FormattedText.filterXss</code>:</p>
        <code>
          {FormattedText.filterXss({ value: this.state.htmlTxt })}
        </code>

        <h1>The FormattedText component</h1>
        <FormattedText value={this.state.htmlTxt} allowFilteredHtml={true} />
        </article>
      </div>
    );
  }
}

export default App;
