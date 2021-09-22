import type { AuthenticationCredential } from "../fetch";
import { setGlobalAuthCredential } from "./__internal__";

/**
 * design-sdk/figma-remote works as a singleton.
 * user can set figma auth credential via this function, so that other static functions will work without 403.
 */
export function configure_auth_credentials(creds: AuthenticationCredential) {
  setGlobalAuthCredential(creds);
}
