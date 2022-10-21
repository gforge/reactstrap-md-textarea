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
declare function MdTextarea(props: TextareaProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof MdTextarea>;
export default _default;
