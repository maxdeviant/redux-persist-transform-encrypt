# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.1] - 2016-12-26
### Fixed
- Fixed default export for sync transform.

## [1.0.0] - 2016-12-24
### Changed
- Separated sync and async transforms into separate exports ([@maxdeviant](https://github.com/maxdeviant) in [#11](https://github.com/maxdeviant/redux-persist-transform-encrypt/pull/11))

## [0.2.0] - 2016-12-18
### Added
- Added `createProgressiveEncryptor` which provides the ability to encrypt state progressively ([@stovmascript](https://github.com/stovmascript) in [#5](https://github.com/maxdeviant/redux-persist-transform-encrypt/pull/5)).

### Fixed
- Updated `redux-persist` peer dependency to `v4.x.x` ([#8](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/8))

## [0.1.2] - 2016-07-13
### Added
- Added Changelog

### Fixed
- Added direct `json-stringify-safe` dependency to fix failing Travis build

## [0.1.1] - 2016-07-13
### Fixed
- Removed `.babelrc` from npm package ([#3](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/3))

## [0.1.0] - 2016-05-15
### Added
- Initial release

[1.0.1]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/576d7fc...v0.1.0
