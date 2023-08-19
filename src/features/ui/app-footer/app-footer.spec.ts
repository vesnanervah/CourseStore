import { getByTitle } from '@testing-library/dom';
import '@testing-library/jest-dom';

import { AppFooter } from './app-footer';

let dom: HTMLElement;

describe('AppFooter', () => {
  beforeEach(() => {
    const footer = new AppFooter();
    dom = footer.getHtmlElement();
  });

  describe('on mount', () => {
    it.skip('should contain rs school link and copyright', () => {
      // Assert
      expect(getByTitle(dom, 'RS School link')).toBeDefined();
      // expect(getByText(dom, COPYRIGHT)).toBeDefined();
    });
  });
});
