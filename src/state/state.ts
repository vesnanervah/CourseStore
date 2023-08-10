import { DEFAULT_STATE } from '../constants/state';

import { AppState, StateKeys } from '../types';

export class State {
  private static instanceDataState = new State();

  private state = new Map<StateKeys, AppState[StateKeys]>(
    Object.entries(DEFAULT_STATE) as [StateKeys, AppState[StateKeys]][],
  );

  private listeners = new Map<StateKeys, Set<(param: AppState[StateKeys]) => void>>();

  private constructor() {
    // empty
  }

  static getInstance(): State {
    return this.instanceDataState;
  }

  public setValue<T extends AppState, U extends StateKeys>(name: U, value: T[U]): void {
    this.state.set(name, value);
    this.notify(name, value);
  }

  public getValue<T extends AppState, U extends StateKeys>(name: U): T[U] {
    if (this.state.has(name)) {
      return this.state.get(name) as T[U];
    }
    throw new Error(`Unknown state key '${name}'`);
  }

  public subscribe<T extends AppState, U extends StateKeys>(
    nameEvent: U,
    listenerMethod: (param: T[U]) => void,
  ): void {
    let listListeners = this.listeners.get(nameEvent) as Set<(param: T[U]) => void> | undefined;
    if (!listListeners) {
      listListeners = new Set<(param: T[U]) => void>();
      this.listeners.set(nameEvent, listListeners as Set<(param: AppState[StateKeys]) => void>);
    }
    listListeners.add(listenerMethod);
  }

  public unsubscribe<T extends AppState, U extends StateKeys>(
    nameEvent: U,
    listenerMethod: (param: T[U]) => void,
  ): void {
    const listListeners = this.listeners.get(nameEvent) as Set<(param: T[U]) => void> | undefined;
    if (listListeners) {
      listListeners.delete(listenerMethod);
    }
  }

  private notify<T extends AppState, U extends StateKeys>(nameEvent: U, params: T[U]): void {
    const listListeners = this.listeners.get(nameEvent);
    if (listListeners) {
      listListeners.forEach((listener) => listener(params));
    }
  }
}
