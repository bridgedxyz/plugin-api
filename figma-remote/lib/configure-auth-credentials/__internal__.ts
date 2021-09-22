import type { AuthenticationCredential } from "../fetch";

/**
 * set me by calling `setGlobalAuthCredential(...)` <- `configure_auth_credentials(...)`
 */
export let FIGMA_REMOTE_LIB_AUTH_CREDENTIAL_GLOBAL: AuthenticationCredential;
export function setGlobalAuthCredential(
  authCredential: AuthenticationCredential
): void {
  FIGMA_REMOTE_LIB_AUTH_CREDENTIAL_GLOBAL = authCredential;
}
