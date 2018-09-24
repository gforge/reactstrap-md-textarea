import * as React from 'react';
export interface Props {
    allowFilteredHtml: boolean;
    value: string;
    rows?: number;
    cols?: number;
}
export default class InputTabMD extends React.PureComponent<Props> {
    render(): JSX.Element;
}
