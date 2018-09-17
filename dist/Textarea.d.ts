import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface State {
    showEdit: boolean;
}
export interface Props extends InputProps {
    value: string;
    allowFilteredHtml?: boolean;
    toggle?: boolean;
    whiteList?: {
        [propName: string]: string[];
    };
    rows?: number;
    cols?: number;
}
declare class MdTextarea extends React.PureComponent<Props, State> {
    state: {
        showEdit: boolean;
    };
    toggle(show?: boolean): void;
    handleToggle: () => void;
    renderTextarea(): JSX.Element;
    renderTabs(): JSX.Element;
    getFilteredValue(): string;
    render(): JSX.Element;
}
export default MdTextarea;
