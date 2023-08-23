import BaseRegLink from './base-reg-link';
import { describe, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { getByTitle } from '@testing-library/dom';

let dom: HTMLElement;
describe('registration link', () => {
  beforeEach(() => {
    const reg = new BaseRegLink('#');
    dom = reg.getHtmlElement() as HTMLElement;
  });

  describe('on mount', () => {
    it.skip('should contain button "назад"', () => {
      // Assert
      expect(getByTitle(dom, 'назад')).toBeDefined();
    });
  });
});
