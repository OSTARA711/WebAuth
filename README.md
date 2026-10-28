# WebAuth

**Browser-based two-factor authentication, with KAMBOS interoperability as the first development priority.**

WebAuth is an open-source browser extension project based on [Authenticator by Authenticator-Extension](https://github.com/Authenticator-Extension/Authenticator). It is being developed for **Firefox, Google Chrome and Microsoft Edge**, with a long-term focus on integrating browser-based two-factor authentication with [KAMBOS](https://github.com/OSTARA711/kambos), the independent desktop security application.

The objective is to make authentication credentials easier to manage across the browser and KAMBOS without making a remote account or cloud service a requirement for the core workflow.

**Project status:** KAMBOS interoperability is a development priority. Until the integration and its security tests are implemented and documented, compatibility with KAMBOS must not be assumed.

## Project goals

- **Browser authentication:** Maintain and improve the inherited authenticator functionality.
- **KAMBOS interoperability:** Develop a compatible, encrypted transfer workflow between WebAuth and KAMBOS.
- **User control:** Prioritise local credential management and user-initiated transfers.
- **Cross-browser support:** Target Firefox, Chrome and Microsoft Edge.
- **Open source:** Keep the project available for inspection, modification and community contributions under the applicable licence terms.

## KAMBOS interoperability

The first major feature planned for WebAuth is interoperability with KAMBOS.

The intended workflow is to let users transfer their authenticator data between the browser extension and KAMBOS, using a documented and versioned encrypted format.

The implementation must establish a shared format before the two applications can reliably exchange data. That specification needs to define:

- The file format and version identifier.
- The credential payload structure and encoding.
- Password-based key derivation parameters and salt handling.
- Encryption algorithm, nonce, authentication tag and associated data, where applicable.
- Validation and error handling for incorrect passwords, corrupted files and unsupported versions.
- Safe import and export behaviour, including avoiding partial imports.
- Compatibility tests using files produced by both applications.

KAMBOS uses its RINN v2 format, based on Argon2id key derivation and AES-256-GCM authenticated encryption. These algorithm names alone do not establish file-format compatibility. WebAuth and KAMBOS must agree on all relevant parameters and data structures before RINN compatibility can be claimed.

**Security principle:** Authentication data should not be exported in plaintext by default. The final implementation should clearly identify any unencrypted export option, if one is supported at all, and explain its risks.

Until the interoperability feature is implemented and tested, users should continue to treat WebAuth and KAMBOS as separate applications.

## Browser support

WebAuth targets:

- Mozilla Firefox
- Google Chrome
- Microsoft Edge

The project retains the existing extension build system while the codebase is progressively adapted to the WebAuth identity and roadmap.

Browser-store publication, installation instructions and supported browser versions will be documented when the corresponding WebAuth releases are available. The existence of an upstream Authenticator release does not mean that a customised WebAuth release has been published or approved by the original project.

## Building from source

WebAuth currently uses the inherited Node.js and npm build system.

### Requirements

- Node.js
- npm
- Git

### Install dependencies

Clone your WebAuth repository and enter its directory:

    git clone https://github.com/OSTARA711/WebAuth.git
    cd WebAuth
    npm ci

### Build for Firefox

    npm run firefox

### Build for Chrome

    npm run chrome

### Build for Microsoft Edge

    npm run edge

### Production build

    npm run prod

### Tests

    npm test

These commands use the build scripts currently defined by the inherited project. Their output locations and behaviour should be verified against the current build scripts before packaging or distributing a WebAuth release.

## Development priorities

Development will proceed incrementally, with interoperability taking priority over unnecessary architectural changes.

1. **Establish WebAuth identity:** Update project metadata, extension branding, documentation and relevant links.
2. **Verify the inherited functionality:** Review authentication, credential storage, import/export and browser compatibility.
3. **Specify the interoperability format:** Agree on the format and cryptographic parameters shared with KAMBOS.
4. **Implement encrypted transfer:** Add explicit import and export workflows with strict validation.
5. **Test interoperability:** Verify compatibility, corruption handling, wrong-password handling and failure recovery.
6. **Prepare releases:** Document supported browsers, installation, known limitations and security-relevant changes.

## Security and responsible use

Two-factor authentication protects accounts only when the authenticator and its stored credentials are handled appropriately.

Users should:

- Protect exported authentication data as sensitive information.
- Store recovery codes separately from their authenticator data.
- Keep backup files secure and remove temporary copies when they are no longer needed.
- Verify the origin and legitimacy of websites before entering authentication codes.
- Report suspected vulnerabilities privately to the project maintainer where an appropriate reporting channel is available.

WebAuth is under active development. This README does not constitute a security audit or a guarantee that the inherited codebase is free of vulnerabilities. Review the source and relevant dependency advisories before relying on a build for important accounts.

## Licence and attribution

WebAuth is based on the MIT-licensed [Authenticator project](https://github.com/Authenticator-Extension/Authenticator).

The original project licence and copyright notices must be retained as required by the MIT licence. New WebAuth contributions and branding may be developed independently, subject to the applicable licences and rights of third parties.

See [`LICENSE`](LICENSE) for the licence included in this repository.

WebAuth is an independent project. It is not an official release of the original Authenticator project, and no endorsement by the original maintainers is implied.

## Related project

- [KAMBOS — desktop security application](https://github.com/OSTARA711/kambos)

## Contributing

Contributions are welcome, particularly in the areas of browser compatibility, credential handling, encrypted import/export, interoperability testing and documentation.

Before proposing cryptographic or credential-format changes, document the intended behaviour and compatibility implications. Security-sensitive changes should include reproducible tests and should not silently change an established file format.
