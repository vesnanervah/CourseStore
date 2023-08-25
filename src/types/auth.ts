import { TokenInfo } from '@commercetools/sdk-client-v2';

type AuthToken = TokenInfo;

type LocaleData = {
  token: AuthToken | null;
};

interface AuthListener {
  listenLogout(): void;
  listenLogin(): void;
}

export { AuthToken, LocaleData, AuthListener };
