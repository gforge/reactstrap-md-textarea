import * as React from 'react';
import InputWrapper from './InputWrapper';
import { default as FormattedText } from '../FormattedText';
import { InputProps } from 'reactstrap';

export interface PreviewProps extends Pick<InputProps, 'value'> {
  allowFilteredHtml: boolean | undefined;
  skipRender: boolean;
}

const PreviewTabMD = (props: PreviewProps) => {
  const { allowFilteredHtml, value } = props;
  if (typeof value !== 'string') {
    return <InputWrapper>-</InputWrapper>;
  }

  return (
    <InputWrapper>
      <FormattedText value={value} allowFilteredHtml={allowFilteredHtml} />
    </InputWrapper>
  );
};

export default React.memo(
  PreviewTabMD,
  (prevProps: PreviewProps, newProps: PreviewProps) => {
    if (newProps.skipRender) return false;

    const { value, allowFilteredHtml } = prevProps;
    if (
      newProps.value !== value ||
      newProps.allowFilteredHtml !== allowFilteredHtml
    ) {
      return true;
    }

    return false;
  }
);
