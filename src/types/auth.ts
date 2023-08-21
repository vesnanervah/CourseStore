type LocaleData = {
  isLoggedIn: boolean;
  mail?: string | undefined | null;
  password?: string | undefined | null;
};

interface AuthListener {
  listenLogout(): void;
  listenLogin(): void;
}

export { LocaleData, AuthListener };
