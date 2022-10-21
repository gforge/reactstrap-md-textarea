import * as React from 'react';
import { InputProps } from 'reactstrap';
import InputWrapper from './InputWrapper';
import FormattedText from '../FormattedText';

export interface PreviewProps extends Pick<InputProps, 'value'> {
  allowFilteredHtml: boolean | undefined;

  // eslint-disable-next-line react/no-unused-prop-types
  skipRender: boolean;
}

function PreviewTabMD(props: PreviewProps) {
  const { allowFilteredHtml, value } = props;
  if (typeof value !== 'string') {
    return <InputWrapper>-</InputWrapper>;
  }

  return (
    <InputWrapper>
      <FormattedText value={value} allowFilteredHtml={allowFilteredHtml} />
    </InputWrapper>
  );
}

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
