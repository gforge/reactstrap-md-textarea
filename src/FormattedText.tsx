import * as React from 'react';
import { default as ReactMarkdown } from 'react-markdown';
import { filterXSS as xss, getDefaultWhiteList } from 'xss';

export interface FilterInput {
  value: string;
  whiteList?: { [propName: string]: string[] };
}

export interface Props extends FilterInput {
  allowFilteredHtml?: boolean;
}

export default class FormattedText extends React.PureComponent<Props> {
  static filterXss({
    value,
    whiteList = {
      source: ['src', 'type'],
      img: ['src', 'alt', 'title', 'width', 'height', 'style'],
      video: [
        'autoplay',
        'controls',
        'loop',
        'preload',
        'src',
        'height',
        'width',
        'style',
      ],
    },
  }: FilterInput): string {
    const options = {
      whiteList: {
        ...getDefaultWhiteList(),
        ...whiteList,
      },
      stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
      // to filter out its content
    };
    return xss(value, options);
  }

  render() {
    const { value, allowFilteredHtml = false, whiteList } = this.props;

    if (typeof value !== 'string') return null;

    if (allowFilteredHtml && value.indexOf('<') === 0) {
      const filteredContent = FormattedText.filterXss({ value, whiteList });
      return <div dangerouslySetInnerHTML={{ __html: filteredContent }} />;
    }

    return <ReactMarkdown source={value} escapeHtml={false} />;
  }
}
