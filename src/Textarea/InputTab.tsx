/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Input, InputProps } from 'reactstrap';
import InputWrapper from './InputWrapper';

export interface InputMdProps extends InputProps {
  allowFilteredHtml: boolean | undefined;
}

function InputTabMD(props: InputMdProps) {
  const { allowFilteredHtml, ...other } = props;

  return (
    <InputWrapper>
      {allowFilteredHtml && (
        <p>
          You can input markdown or html (start with &lt; to indicate html) for
          styling the text.
        </p>
      )}
      <Input type="textarea" {...other} />
    </InputWrapper>
  );
}

export default React.memo(InputTabMD);
