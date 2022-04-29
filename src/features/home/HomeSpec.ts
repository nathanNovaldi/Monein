export interface HomeSpec {
  width: number;
  height: number;
  x: number;
  y: number;
  title: string;
  redirection: string;
  getIcon: Function;
  backgroundImageSrc?: string;
  params: any;
}
