import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Textarea, FormattedText } from '../src';

import './App.css';

const defaults = {
  mdTxt: `## Markdown input
Yeah, everything one could ever dream of!
`,
  htmlTxt: `<h3>Pure html input</h3>

<p>Yeah, everything one could ever dream of!</p>

<p>This also allows for including videos, imgs etc:</p>

<img src="https://openclipart.org/download/174860/bookworm-penguin.svg" width="300px"/>
`,
};

function App() {
  const [mdTxt, setMdTxt] = useState(defaults.mdTxt);
  const [htmlTxt, setHtmlTxt] = useState(defaults.htmlTxt);

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
              onChange={(e) => setMdTxt(e.target.value)}
              value={mdTxt}
            />
          </CardBody>
        </Card>

        <br />
        <Card>
          <CardHeader>Html based</CardHeader>

          <CardBody>
            <Textarea
              onChange={(e) => setHtmlTxt(e.target.value)}
              rows={10}
              allowFilteredHtml
              value={htmlTxt}
            />
          </CardBody>
        </Card>

        <br />
        <Card>
          <CardHeader>Allow toggling back and forth</CardHeader>

          <CardBody>
            <Textarea
              onChange={(e) => setMdTxt(e.target.value)}
              value={mdTxt}
              toggle
            />
            <p>
              Note that the <code>allowFilteredHtml</code> must be set for the
              html to be parsed.
            </p>
          </CardBody>
        </Card>

        <br />
        <h1>The filtered output from the html</h1>

        <Card>
          <CardHeader>
            Pure output from <code>FormattedText.filterXss</code>
          </CardHeader>
          <CardBody>
            <code>
              <pre>{FormattedText.filterXss({ value: htmlTxt })}</pre>
            </code>
          </CardBody>
        </Card>

        <br />
        <Card>
          <CardHeader>The FormattedText component</CardHeader>
          <CardBody>
            <FormattedText value={htmlTxt} allowFilteredHtml />
          </CardBody>
        </Card>

        <br />
        <Card>
          <CardHeader>
            The FormattedText component without allowFilteredHtml
          </CardHeader>
          <CardBody>
            <FormattedText value={mdTxt} />
          </CardBody>
        </Card>
      </article>
    </div>
  );
}

export default App;
