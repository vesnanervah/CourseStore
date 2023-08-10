import { PageSlug, StateKeys } from '../types';
import { State } from './state';
import { DEFAULT_STATE } from '../constants/state';

// eslint-disable-next-line max-lines-per-function
describe('State', () => {
  afterEach(() => {
    State.reset();
  });

  describe('when instantieted two times', () => {
    it('should return same instance', () => {
      // Arrange
      const instance1 = State.getInstance();
      const instance2 = State.getInstance();

      // Assert
      expect(instance1).toBe(instance2);
    });
  });

  describe("when state's value is yet not set", () => {
    it('should return default value', () => {
      // Arrange
      const state = State.getInstance();

      // Assert
      const value = state.getValue(StateKeys.CURRENT_PAGE_SLUG);
      expect(value).toBe(DEFAULT_STATE[StateKeys.CURRENT_PAGE_SLUG]);
    });
  });

  describe('when accessing invalid state key', () => {
    it('should throw', () => {
      // Arrange
      const state = State.getInstance();

      // Assert
      expect(() => state.getValue('garbage' as StateKeys)).toThrow();
    });
  });

  describe("when state's page slug value is set to main", () => {
    it('should return main page slug', () => {
      // Arrange
      const state = State.getInstance();

      // Act
      state.setValue(StateKeys.CURRENT_PAGE_SLUG, PageSlug.Main);

      // Assert
      const value = state.getValue(StateKeys.CURRENT_PAGE_SLUG);
      expect(value).toBe(PageSlug.Main);
    });
  });

  describe('on state value change', () => {
    it('should notify all subscribers', () => {
      // Arrange
      const state = State.getInstance();
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      state.subscribe(StateKeys.CURRENT_PAGE_SLUG, cb1);
      state.subscribe(StateKeys.CURRENT_PAGE_SLUG, cb2);

      // Act
      state.setValue(StateKeys.CURRENT_PAGE_SLUG, PageSlug.Main);
      state.setValue(StateKeys.CURRENT_PAGE_SLUG, PageSlug.NotFound);

      // Assert
      expect(cb1).toBeCalledTimes(2);
      expect(cb2).toBeCalledTimes(2);
    });
  });

  describe('on unsubscribe', () => {
    it.todo('should remove listeners');
  });
});
