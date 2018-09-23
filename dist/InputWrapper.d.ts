import * as React from 'react';
export interface Props {
    style?: {
        [propName: string]: string;
    };
    children: React.ReactNode;
}
declare const wrapper: ({ children, style }: Props) => JSX.Element;
export default wrapper;
