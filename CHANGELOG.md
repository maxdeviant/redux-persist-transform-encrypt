# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2022-07-28

### Added

- Added support for passing type parameters to `createTransform`
- Added support for passing `TransformConfig` to `createTransform`

### Changed

- Updated dependencies
  - Includes upgrade to `crypto-js@4.1.1`

## [3.0.1] - 2020-10-23

### Changed

- Downgraded `crypto-js` to `3.1.9-1` to fix error in React Native ([#49](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/49))

### Removed

- Removed `readable-stream` dependency, as it is no longer used

## [3.0.0] - 2020-10-17

### Changed

- Library has been rewritten in TypeScript
- No more default export; must use the `encryptTransform` named import instead

### Removed

- Removed asynchronous support, as it was never working properly in the first place
  - Asynchronous support is tracked by [#48](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/48)

## [2.0.1] - 2018-04-02

### Added

- Added `onError` to allow for custom error handling
  ([@ekynoxe](https://github.com/ekynoxe) in
  [#20](https://github.com/maxdeviant/redux-persist-transform-encrypt/pull/20))

## [2.0.0] - 2017-11-11

### Changed

- Added support for `redux-persist@5`

## [1.0.2] - 2017-04-05

### Changed

- Import only required modules from `crypto-js`
  ([@7rulnik](https://github.com/7rulnik) in
  [#14](https://github.com/maxdeviant/redux-persist-transform-encrypt/pull/14))

## [1.0.1] - 2016-12-26

### Fixed

- Fixed default export for sync transform

## [1.0.0] - 2016-12-24

### Changed

- Separated sync and async transforms into separate exports
  ([@maxdeviant](https://github.com/maxdeviant) in
  [#11](https://github.com/maxdeviant/redux-persist-transform-encrypt/pull/11))

## [0.2.0] - 2016-12-18

### Added

- Added `createProgressiveEncryptor` which provides the ability to encrypt state
  progressively ([@stovmascript](https://github.com/stovmascript) in
  [#5](https://github.com/maxdeviant/redux-persist-transform-encrypt/pull/5))

### Fixed

- Updated `redux-persist` peer dependency to `v4.x.x`
  ([#8](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/8))

## [0.1.2] - 2016-07-13

### Added

- Added Changelog

### Fixed

- Added direct `json-stringify-safe` dependency to fix failing Travis build

## [0.1.1] - 2016-07-13

### Fixed

- Removed `.babelrc` from npm package
  ([#3](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/3))

## [0.1.0] - 2016-05-15

### Added

- Initial release

[unreleased]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v3.0.1...v4.0.0
[3.0.1]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v2.0.1...v3.0.0
[2.0.1]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/maxdeviant/redux-persist-transform-encrypt/compare/576d7fc...v0.1.0
