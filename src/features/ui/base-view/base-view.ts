export abstract class BaseView<T extends Node = HTMLElement | DocumentFragment> {
  protected htmlElement: T | null = null;

  public getHtmlElement(): T {
    if (this.htmlElement) {
      return this.htmlElement;
    }
    throw new Error('Html element is null');
  }
}

export default BaseView;
