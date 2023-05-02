# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2023-05-02

### Fixed

-   io not being imported in client.js

## [2.1.0] - 2022-09-14

### Added

-   accountStats method (differs from wallet method)
-   JSDoc for some websocket events
-   Autolykos reward websocket event

### Changed

-   fixed API_URL_PAYOUTS url
-   websocket.js code is now directly in client.js
-   miner version now uses v3 API
-   dependencies update
-   License date

### Removed

-   buildURL useless method
-   payment_status event console.log
-   autoPay setting when changing network

## [2.0.0] - 2021-07-28

### Added

-   ES modules compatibilty
-   Socket.io-client for WebSocket
-   This CHANGELOG file
-   funding file

### Changed

-   errors
-   fix on API Error
-   v4 endpoints
-   refactoring of functions

### Removed

-   index.js
-   WS for WebSocket

## [1.0.1] - 2021-06-19

### Changed

-   Keywords in package

## [1.0.0] - 2021-06-19

### Added

-   First version
