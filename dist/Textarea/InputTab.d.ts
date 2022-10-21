import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface InputMdProps extends InputProps {
    allowFilteredHtml: boolean | undefined;
}
declare function InputTabMD(props: InputMdProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof InputTabMD>;
export default _default;
