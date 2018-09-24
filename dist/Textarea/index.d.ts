import * as React from 'react';
import { Props as InputProps } from './InputTab';
export interface State {
    showEdit: boolean;
}
export interface Props extends InputProps {
    id: string;
    value: string;
    allowFilteredHtml: boolean;
    toggle?: boolean;
    whiteList?: {
        [propName: string]: string[];
    };
}
declare class MdTextarea extends React.PureComponent<Props, State> {
    static defaultProps: {
        allowFilteredHtml: boolean;
        id: string;
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
