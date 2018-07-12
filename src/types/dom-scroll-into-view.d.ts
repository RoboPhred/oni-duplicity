declare module "dom-scroll-into-view" {
  export interface ScrollIntoViewConfig {
    alignWithLeft?: boolean;
    alignWithTop?: boolean;
    offsetTop?: number;
    offsetLeft?: number;
    offsetBottom?: number;
    offsetRight?: number;
    allowHorizontalScroll?: boolean;
    onlyScrollIfNeeded?: boolean;
  }

  function scrollIntoView(
    source: HTMLElement,
    container: HTMLElement,
    config?: ScrollIntoViewConfig
  ): void;

  export default scrollIntoView;
}
