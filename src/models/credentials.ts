// Path: src/models/credentials.ts

/**
 * ALESIA does not currently require embedded OAuth credentials.
 *
 * Cloud storage integrations are intentionally excluded from the
 * initial implementation.
 *
 * If optional cloud integrations are introduced later, they must use:
 * - Public OAuth client identifiers only.
 * - Authorisation Code Flow with PKCE.
 * - No embedded client secrets.
 *
 * Cloud storage must handle opaque encrypted .RINN files only.
 */

export {};
