export type GoogleTokensResult = {
  id_token: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type GoogleUser = {
  id_token: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
};
