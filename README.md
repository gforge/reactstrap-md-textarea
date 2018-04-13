[![npm version](https://badge.fury.io/js/reactstrap-md-textarea.svg)](https://badge.fury.io/js/reactstrap-md-textarea)

# A markdown textarea component

This component is for allowing input in markdown format and then showing it
to the user in a separate tab. The tabs are handled by the
[`reactstrap`](https://www.npmjs.com/package/reactstrap) library
that relies on the [bootstrap](https://getbootstrap.com/) components.
Checkout the [examples](https://gforge.github.io/reactstrap-md-textarea/).

## Basic usage

You have will set a limited number of properties. All properties except for
`allowFilteredHtml` are passed to the underlying `reactstrap::Input` element.
For displaying the markdown is passed through [`react-markdown`](https://www.npmjs.com/package/react-markdown)
package.

```{js}
import { Textarea as MdTextarea } from 'reactstrap-md-textarea';

...
<MdTextarea
  onChange={(e) => this.onChange('mdTxt', e.target.value)}
  value={this.state.mdTxt}
/>
```

## Adding html direct rendering

As you may sometimes need advanced `html` features there is an option of passing
direct html to the component. It will render the html onto a div after sanitizing
the input using [xss](https://www.npmjs.com/package/xss). **Note!** the function
doesn't filter the return value. That is up to the user.

```{js}
import { Textarea as MdTextarea } from 'reactstrap-md-textarea';

...
<MdTextarea
  onChange={(e) => this.onChange('htmlTxt', e.target.value)}
  rows={10}
  allowFilteredHtml={true}
  value={this.state.htmlTxt}
/>
```

## Formatter

The package also exposes the formatter with the markdown and html options:

```{js}
import { FormattedText } from 'reactstrap-md-textarea';

<FormattedText value="#My MD text" />
```
