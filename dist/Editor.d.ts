/// <reference types="react" />
import * as React from 'react';
import { InputProps } from 'reactstrap';
import { Props as FormattedInput } from './FormattedText';
export interface State {
    showEdit: boolean;
}
export interface Props extends FormattedInput, InputProps {
    value: string;
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
    getFilteredValue(): string;
    render(): JSX.Element;
}
export default ReactstrapMdTextarea;
