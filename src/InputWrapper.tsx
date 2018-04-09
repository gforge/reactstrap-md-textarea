// @ts-ignore
import * as React from 'react';

export interface Props {
  style?: { [propName: string]: string };
}

const wrapper: React.SFC<Props> = ({ children, style = {} }) => (
  <div
    style={{
      border: '1px solid #ddd',
      borderTop: '0px',
      borderRadius: '5px',
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
      padding: '10px',
      backgroundColor: '#fff',
      textAlign: 'left',
      ...style,
    }}
  >
    {children}
  </div>
);

export default wrapper;
