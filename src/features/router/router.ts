type Route = {
  location: string;
  callback: () => void;
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
    return window.location.hash.replace(/^#/, '') || '/';
  }

  public navigate(to: string, options: NavigateOptions = DEFAULT_NAVIGATE_OPTIONS): void {
    if (to === this.currentLocation) {
      return;
    }

    const route = this.routes.find(({ location }) => location === to);
    if (route) {
      this.currentLocation = to;

      if (options.pushState) {
        if (options.replace) {
          window.history.replaceState({}, '', `${window.location.origin}${to}`);
        } else {
          window.history.pushState({}, '', `${window.location.origin}${to}`);
        }
      }
      route.callback();
    } else if (this.fallback) {
      const { location, callback } = this.fallback;
      this.currentLocation = location;
      callback();
      window.history.pushState({}, '', `${window.location.origin}${location}`);
    }
  }

  public setRoutes(routes: Route[], fallback: Route): void {
    this.routes = routes;
    this.fallback = fallback;
  }
}
