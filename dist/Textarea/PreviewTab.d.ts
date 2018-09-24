import * as React from 'react';
export interface Props {
    allowFilteredHtml: boolean;
    value: string;
}
export default class PreviewTabMD extends React.PureComponent<Props> {
    render(): JSX.Element;
}
