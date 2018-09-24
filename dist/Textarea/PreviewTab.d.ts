import * as React from 'react';
export interface Props {
    allowFilteredHtml: boolean;
    value: string;
    skipRender: boolean;
}
export default class PreviewTabMD extends React.Component<Props> {
    shouldComponentUpdate(newProps: Props): boolean;
    render(): JSX.Element;
}
