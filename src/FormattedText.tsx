import * as React from 'react';
import { default as ReactMarkdown } from 'react-markdown';
import { default as xss } from 'xss';

export interface FormattedInput {
  value: string;
  allowDangerousHtml: boolean;
  whiteList?: { [propName: string]: string[] };
}

export default ({
  value,
  allowDangerousHtml = false,
  whiteList = {
    source: ['src', 'type'],
    img: ['src', 'alt', 'title', 'width', 'height', 'style'],
    video: [
      'autoplay', 'controls', 'loop',
      'preload', 'src', 'height',
      'width', 'style',
    ],
  },
}: FormattedInput) => {
  if (typeof value !== 'string') return null;

  if (allowDangerousHtml && value.indexOf('<') === 0) {
    const options = {
      whiteList: {
        ...xss.getDefaultWhiteList(),
        ...whiteList,
      },
      stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
      // to filter out its content
    };
    const filteredContent = xss(value, options);
    console.log(filteredContent);

    return (<div dangerouslySetInnerHTML={{ __html: filteredContent }} />);
  }

  return (
    <ReactMarkdown
      source={value}
      escapeHtml={false}
    />);
};
