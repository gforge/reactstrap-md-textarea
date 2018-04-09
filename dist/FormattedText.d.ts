/// <reference types="react" />
export interface FormattedInput {
    value: string;
    allowDangerousHtml: boolean;
    whiteList?: {
        [propName: string]: string[];
    };
}
declare const _default: ({ value, allowDangerousHtml, whiteList, }: FormattedInput) => JSX.Element | null;
export default _default;
