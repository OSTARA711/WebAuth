// Path: src/models/backup.ts

/**
 * ALESIA — Backup subsystem
 *
 * Legacy cloud backup implementations have been removed.
 *
 * The previous implementation depended on:
 * - Google Drive OAuth and refresh tokens.
 * - Dropbox implicit OAuth and access tokens.
 * - Microsoft OneDrive OAuth and refresh tokens.
 * - Plain JSON backup serialisation.
 *
 * These mechanisms are not part of ALESIA.
 *
 * Future backup functionality will use the KAMBOS-compatible
 * .RINN v2 encrypted container format.
 *
 * Cloud storage, if introduced, will only handle opaque encrypted
 * .RINN files. It will not handle plaintext OTP credentials.
 *
 * No provider classes or authentication mechanisms are currently
 * exported from this module.
 */

export {};
