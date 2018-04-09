/// <reference types="react" />
import * as React from 'react';
import { InputProps } from 'reactstrap';
export interface State {
    showEdit: boolean;
}
export interface Props extends InputProps {
    value: string;
    allowDangerousHtml?: boolean;
    rows?: number;
    cols?: number;
}
declare class ReactstrapMdTextarea extends React.Component<Props, State> {
    constructor(props: Props);
    state: {
        showEdit: boolean;
    };
    toggle(show: boolean): void;
    renderTextarea(): JSX.Element;
    renderTabs(): JSX.Element;
    render(): JSX.Element;
}
export default ReactstrapMdTextarea;
