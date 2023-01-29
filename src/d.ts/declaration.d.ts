declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
}
declare module '*.module.css' {
  const content: any;
  export = content;
}
declare module '*.module.scss' {
  const content: any;
  export = content;
}
declare module '*.module.less' {
  const content: any;
  export = content;
}
declare module '*.ts' {
  const content: any = {

  };
  export = content; 
}
declare module '*.js' {
  const content: any;
  export = content; 
}
declare module '*.module.css' {
  const content: any;
  export = content;
}
declare module '*.module.scss' {
  const content: any;
  export = content;
}
declare module '*.module.less' {
  const content: any;
  export = content;
}

declare module '*.css' {
  const content: any;
  export = content;
}
declare module '*.scss' {
  const content: any;
  export = content;
}
declare module '*.less' {
  const content: any;
  export = content;
}
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';

interface Window {
  _odc_params: any;
  publicPath: string;
  _forceRefresh: boolean;
  newVersionModal: any;
  Tracert: any;
  /**
   * ODC 请求地址
   */
  ODCApiHost: string;
  /**
   * 当前环境信息
   */
  currentEnv: string;
}

declare let window: Window;
