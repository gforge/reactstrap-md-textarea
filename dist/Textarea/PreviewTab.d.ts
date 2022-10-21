import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface PreviewProps extends Pick<InputProps, 'value'> {
    allowFilteredHtml: boolean | undefined;
    skipRender: boolean;
}
declare function PreviewTabMD(props: PreviewProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof PreviewTabMD>;
export default _default;
