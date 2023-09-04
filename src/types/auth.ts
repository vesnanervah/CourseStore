import { TokenInfo } from '@commercetools/sdk-client-v2';

type AuthToken = TokenInfo;

type LocaleData = {
  token: AuthToken | null;
};

interface AuthListener {
  listenLogout(): void;
  listenLogin(): void;
}

type InvalidTokenResp = {
  statusCode: number;
  message: string;
};

export { AuthToken, LocaleData, AuthListener, InvalidTokenResp };
