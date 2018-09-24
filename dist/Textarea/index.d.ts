import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface State {
    showEdit: boolean;
}
export interface Props extends InputProps {
    value: string;
    allowFilteredHtml: boolean;
    rows?: number;
    cols?: number;
    toggle?: boolean;
    whiteList?: {
        [propName: string]: string[];
    };
}
declare class MdTextarea extends React.PureComponent<Props, State> {
    static defaultProps: {
        allowFilteredHtml: boolean;
    };
    state: {
        showEdit: boolean;
    };
    toggle(show?: boolean): void;
    handleToggle: () => void;
    activateEdit: () => void;
    deActivateEdit: () => void;
    render(): JSX.Element;
    getFilteredValue(): string;
}
export default MdTextarea;
