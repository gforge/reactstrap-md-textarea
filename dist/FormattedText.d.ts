import * as React from 'react';
export interface FilterInput {
    value: string;
    whiteList?: {
        [propName: string]: string[];
    };
}
export interface Props extends FilterInput {
    allowFilteredHtml?: boolean;
}
export default class FormattedText extends React.PureComponent<Props> {
    static filterXss({ value, whiteList }: FilterInput): string;
    render(): JSX.Element | null;
}
