import * as React from 'react';
import InputWrapper from './InputWrapper';
import { default as FormattedText } from '../FormattedText';

export interface Props {
  allowFilteredHtml: boolean;
  value: string;
  skipRender: boolean;
}

export default class PreviewTabMD extends React.Component<Props> {
  shouldComponentUpdate(newProps: Props) {
    if (newProps.skipRender) return false;

    const { value, allowFilteredHtml } = this.props;
    if (
      newProps.value !== value ||
      newProps.allowFilteredHtml !== allowFilteredHtml
    ) {
      return true;
    }

    return false;
  }

  render() {
    const { allowFilteredHtml, value } = this.props;

    return (
      <InputWrapper>
        <FormattedText
          value={value}
          allowFilteredHtml={allowFilteredHtml}
        />
      </InputWrapper>);
  }
}