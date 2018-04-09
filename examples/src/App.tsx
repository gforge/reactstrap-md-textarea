import * as React from 'react';
import ReactstrapMdTextarea from 'reactstrap-md-textarea';

import './App.css';

const mdTxt =
  `# Markdown input
Yeah, everything one could ever dream of!
`;

const htmlTxt =
  `<h1>Markdown input</h1>

<p>Yeah, everything one could ever dream of!</p>

<p>This also allows for including videos, imgs etc:</p>

<img src="https://openclipart.org/download/174860/bookworm-penguin.svg" />
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

        <ReactstrapMdTextarea
          onChange={(e) => this.onChange('mdTxt', e.target.value)}
          value={this.state.mdTxt}
        />

        <div className="spacer" />

        <ReactstrapMdTextarea
          onChange={(e) => this.onChange('htmlTxt', e.target.value)}
          rows={10}
          allowDangerousHtml={true}
          value={this.state.htmlTxt}
        />

        <p>
          Note that the allowDangerousHtml must be set for the html to be parsed.
        </p>
        </article>
      </div>
    );
  }
}

export default App;
