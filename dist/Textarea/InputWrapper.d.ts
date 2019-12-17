import * as React from 'react';
export interface WrapperProps {
    style?: {
        [propName: string]: string;
    };
    children: React.ReactNode;
}
declare const _default: React.MemoExoticComponent<({ children, style }: WrapperProps) => JSX.Element>;
export default _default;
