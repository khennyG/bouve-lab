declare module 'react-katex' {
  import * as React from 'react';
  export interface KatexBaseProps {
    children?: React.ReactNode;
    math?: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }
  export interface InlineMathProps extends KatexBaseProps {}
  export interface BlockMathProps extends KatexBaseProps {}
  export const InlineMath: React.FC<InlineMathProps>;
  export const BlockMath: React.FC<BlockMathProps>;
  export default class TeX extends React.Component<KatexBaseProps> {}
}
