import * as React from 'react';
import { Input } from 'reactstrap';
import InputWrapper from './InputWrapper';

export interface Props {
  allowFilteredHtml: boolean;
  value: string;
  name?: string;
  valid?: boolean;
  invalid?: boolean;
  rows?: number;
  cols?: number;
  bsSize?: 'lg' | 'sm';
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  readOnly?: boolean;
  required?: boolean;
  wrap?: 'hard' | 'soft';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default class InputTabMD extends React.PureComponent<Props> {
  render() {
    const { allowFilteredHtml, ...other } = this.props;

    return (
      <InputWrapper>
        {allowFilteredHtml &&
          <p>
            You can input markdown or html (start with &lt; to indicate html)
            for styling the text.
              </p>
        }
        <Input
          type="textarea"
          {...other}
        />
      </InputWrapper>
    );
  }
}