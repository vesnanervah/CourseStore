import { BaseView } from './base-view';

class DummyView extends BaseView {
  constructor(createElement: boolean = true) {
    super();

    if (createElement) {
      this.createElement();
    }
  }

  private createElement() {
    this.htmlElement = document.createElement('div');
  }
}

describe('BaseView', () => {
  describe('when HTML element is not set', () => {
    it('should throw error', () => {
      // Arrange
      const view = new DummyView(false);

      // Assert
      expect(() => view.getHtmlElement()).toThrow();
    });
  });

  describe('when HTML element is set', () => {
    it('should return HTML element', () => {
      // Arrange
      const view = new DummyView();

      // Assert
      const element = view.getHtmlElement();
      expect(element).toBeInstanceOf(HTMLDivElement);
    });
  });
});
