import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface PreviewProps extends Pick<InputProps, 'value'> {
    allowFilteredHtml: boolean | undefined;
    skipRender: boolean;
}
declare const _default: React.MemoExoticComponent<(props: PreviewProps) => JSX.Element>;
export default _default;
