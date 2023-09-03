import matcherWitchCache from './matcher';

export type UrlParams = {
  [key: string]: string;
} | null;

type Route = {
  location?: string;
  callback: (params?: UrlParams) => void;
};

type NavigateOptions = {
  replace?: boolean;
  pushState?: boolean;
};

const DEFAULT_NAVIGATE_OPTIONS: NavigateOptions = {
  replace: false,
  pushState: true,
};

export class AppRouter {
  private static instance = new AppRouter();
  private routes: Route[] = [];
  private currentLocation: string | null = null;
  private fallback: Route | null = null;
  private matcher = matcherWitchCache();

  private constructor() {
    // empty
  }

  public static getInstance(): AppRouter {
    return this.instance;
  }

  public init(): void {
    window.addEventListener('popstate', () => {
      const location = window.location.pathname;
      if (location !== this.currentLocation) {
        this.navigate(window.location.pathname, { pushState: false });
      }
    });
    window.addEventListener('DOMContentLoaded', () => {
      const location = window.location.pathname;
      if (location !== this.currentLocation) {
        this.navigate(window.location.pathname, { replace: true });
      }
    });
  }

  public getLocation(): string {
    return window.location.toString();
  }

  public navigate(to: string, options: NavigateOptions = DEFAULT_NAVIGATE_OPTIONS): void {
    if (to === this.currentLocation) {
      return;
    }
    this.currentLocation = to;

    let urlParams = null;
    const route = this.routes.find(({ location = '' }) => {
      const [match, params] = this.matcher(location, to);
      urlParams = params;
      return match;
    });
    if (route) {
      if (options.pushState) {
        if (options.replace) {
          window.history.replaceState({}, '', `${window.location.origin}${to}`);
        } else {
          window.history.pushState({}, '', `${window.location.origin}${to}`);
        }
      }
      route.callback(urlParams);
    } else if (this.fallback) {
      const { callback } = this.fallback;
      window.history.pushState({}, '', `${window.location.origin}${to}`);
      callback(urlParams);
    }
  }

  public setRoutes(routes: Route[], fallback: Route): void {
    this.routes = routes;
    this.fallback = fallback;
  }
}
