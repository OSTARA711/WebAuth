// Path: src/models/credentials.ts

/**
 * OAuth client identifiers for optional cloud storage integrations.
 *
 * These are public client identifiers, not secrets.
 * Browser extensions must not contain OAuth client secrets.
 *
 * Use authorisation-code flows with PKCE for cloud authentication.
 */
export function getCredentials() {
  return {
    drive: {
      client_id: "", // Google OAuth client ID
    },
    dropbox: {
      client_id: "", // Dropbox app key
    },
    onedrive: {
      client_id: "", // Microsoft Identity application client ID
    },
  };
}
