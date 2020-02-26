## [1.1.6](https://github.com/musicplayce/angular-sdk/compare/v1.1.5...v1.1.6) (2020-02-26)


### Bug Fixes

* **refreshtoken:** fix resp for second call ([8e07e33](https://github.com/musicplayce/angular-sdk/commit/8e07e33e8055ed231a0320688480649040290c72))

## [1.1.5](https://github.com/musicplayce/angular-sdk/compare/v1.1.4...v1.1.5) (2020-02-24)


### Bug Fixes

* **authservice:** get localStorage before cookie ([0b4e400](https://github.com/musicplayce/angular-sdk/commit/0b4e4003ed02fa66f88cdb05b4fe773154e28fcc))
* **authservice:** resetPassword method need its token ([4901802](https://github.com/musicplayce/angular-sdk/commit/49018027bd3fd6515cc0552d87438898e1480f06))

## [1.1.4](https://github.com/musicplayce/angular-sdk/compare/v1.1.3...v1.1.4) (2020-02-20)


### Bug Fixes

* **angular-sdk:** remove angular-sdk.service from public-api.ts ([abda392](https://github.com/musicplayce/angular-sdk/commit/abda3927822cf827b5803b0b43fc2671715e5e49))
* **js-sha256:** change crypt password method ([d5bc95a](https://github.com/musicplayce/angular-sdk/commit/d5bc95a18e27d52437c13c42899ab062323acf29))
* **sha256:** change package for encrypt password ([06972aa](https://github.com/musicplayce/angular-sdk/commit/06972aad598b9b4180f0af7ff1e85526459d49d2))

## [1.1.3](https://github.com/musicplayce/angular-sdk/compare/v1.1.2...v1.1.3) (2020-02-18)


### Bug Fixes

* **angular-sdk:** fix production flags by two inject token ([78981e0](https://github.com/musicplayce/angular-sdk/commit/78981e06bcb13b4e485c7d65618f0c45f56deb97))

## [1.1.2](https://github.com/musicplayce/angular-sdk/compare/v1.1.1...v1.1.2) (2020-02-17)


### Bug Fixes

* **authservice:** change username to name in login's params ([b981263](https://github.com/musicplayce/angular-sdk/commit/b981263e7c9741d3d0b3790923d756d1f6067c93))

## [1.1.1](https://github.com/musicplayce/angular-sdk/compare/v1.1.0...v1.1.1) (2020-02-17)


### Bug Fixes

* **authservice:** fix isAuthenticated check refresh token expiration ([0ada05a](https://github.com/musicplayce/angular-sdk/commit/0ada05ac72c284e1050ae07211cbae9f056b786a))

# [1.1.0](https://github.com/musicplayce/angular-sdk/compare/v1.0.2...v1.1.0) (2020-02-17)


### Features

* **authservice:** add forgot and singup method ([80dd294](https://github.com/musicplayce/angular-sdk/commit/80dd29415aa3c99da07353f48818fdb08fa6fd28))

## [1.0.2](https://github.com/musicplayce/angular-sdk/compare/v1.0.1...v1.0.2) (2020-02-14)


### Bug Fixes

* **authservice:** annotation in docs removed ([29058a1](https://github.com/musicplayce/angular-sdk/commit/29058a1d13e499585ad49c945d753121d83330d3))
* **refresh-token:** allow multiple unauthorized access know the error ([1f550ac](https://github.com/musicplayce/angular-sdk/commit/1f550acf2735583137c4298a33845bfe720ada21))

## [1.0.1](https://github.com/musicplayce/angular-sdk/compare/v1.0.0...v1.0.1) (2020-02-14)


### Bug Fixes

* **auth:** angular service compatibility ([fe31c9b](https://github.com/musicplayce/angular-sdk/commit/fe31c9b12e0fa929b366900d1e9f3dcfb03a1559))
* **auth:** fix password encode issues ([e02c760](https://github.com/musicplayce/angular-sdk/commit/e02c76066521d32bb8277ac29ab3fff46f99f0a0))
* **authservice:** problem in import models ([0b08e72](https://github.com/musicplayce/angular-sdk/commit/0b08e72e2185674413f0c7277cf556ba7c4fa1ce))


### Performance Improvements

* **authservice:** save iss as well ([87832d6](https://github.com/musicplayce/angular-sdk/commit/87832d6707d152c4f4da511a3c4752c7b8e28e61))

# 1.0.0 (2020-02-10)


### Features

* **auth:** auth service created ([2352c6d](https://github.com/musicplayce/angular-sdk/commit/2352c6d519da717b8216518c40d054f949ab32f5))


### BREAKING CHANGES

* **auth:** a single modification was fixed to try create a BC.
