import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface State {
    showEdit: boolean;
}
export interface TextareaProps extends InputProps {
    allowFilteredHtml?: boolean;
    toggle?: boolean;
    whiteList?: {
        [propName: string]: string[];
    };
    filteredValue?: React.MutableRefObject<string | undefined>;
}
declare const _default: React.MemoExoticComponent<(props: TextareaProps) => JSX.Element>;
export default _default;
