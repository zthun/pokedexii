# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.17.1](https://github.com/zthun/pokedexii/compare/v0.17.0...v0.17.1) (2023-08-20)

**Note:** Version bump only for package @zthun/pokedexii





## [0.17.0](https://github.com/zthun/pokedexii/compare/v0.16.1...v0.17.0) (2023-08-20)


### ⚠ BREAKING CHANGES

* type service moved to api
* pokemon service moved to api
* species service moved to pokedex-api

### Features

* evolution builder can now build eevee ([0d1e839](https://github.com/zthun/pokedexii/commit/0d1e839770caf520bd63952edb6c56c086d068ef))
* evolution builder can now build goomy ([02aa75e](https://github.com/zthun/pokedexii/commit/02aa75e8741319198ddaeda761f50f295c8f0536))
* evolution builder can now build mantyke ([038a782](https://github.com/zthun/pokedexii/commit/038a7823b025c2cf46f99d01c17267e21be32e9c))
* evolution builder can now build pancham, shelmet, and tyrogue ([d85956d](https://github.com/zthun/pokedexii/commit/d85956d2e804ba6b1b95274200d2809274faac73))
* evolution builder can now build tangela ([d464ebe](https://github.com/zthun/pokedexii/commit/d464ebe72d53d1dc6ef9dda151b0bebd36e2459c))
* evolution builder can now construct feebas ([9c914cd](https://github.com/zthun/pokedexii/commit/9c914cd6ef99d21f9b7ed0f9770c5b88d3953ab2))
* evolution builder can now construct inkay ([8ff7915](https://github.com/zthun/pokedexii/commit/8ff79153298e4a960c221db2af44083ef978c029))
* evolution card now show identification of the evolution ([37fd070](https://github.com/zthun/pokedexii/commit/37fd07027b635e215e7f7e5d42bb9e90501d9161))
* evolution service retrieves evolution data ([909bd28](https://github.com/zthun/pokedexii/commit/909bd28910b31b18893bc6b54d817d8ddf0001f2))
* pokedex api allows for advanced queries of pokemon api data ([6132c01](https://github.com/zthun/pokedexii/commit/6132c017861f445b57c03d1122b5a3d8d3748ed2))
* pokedex-api pokemon service retrieves pokemon variants ([0232bcc](https://github.com/zthun/pokedexii/commit/0232bcca6e3c833006aa7f8f2830103e305fe09e))
* pokemon api retrieves variants ([11dba48](https://github.com/zthun/pokedexii/commit/11dba483ad49ca6956194d38ef2872c3f616ea07))
* pokemon builder can now construct charizard variants ([09ba179](https://github.com/zthun/pokedexii/commit/09ba17925833dc022c97b5c82ff70fe2bce04b14))
* pokemon service can query pokemon lists ([07cfec8](https://github.com/zthun/pokedexii/commit/07cfec8bade55d69f090e06e7684912d3a9119f2))
* pokemon service retrieves species variants ([4b54cb8](https://github.com/zthun/pokedexii/commit/4b54cb8edc6e1772df39c4a0cffdf3af91cc6a41))
* species can now have directed artwork and types ([46a73a3](https://github.com/zthun/pokedexii/commit/46a73a393cf0041f98fbceb75e61a439dbe6a7a1))
* species controller can list or get a single pokemon species ([d0f87b5](https://github.com/zthun/pokedexii/commit/d0f87b59f988943d5b9b8f55389553c22b033621))
* species endpoint retrieves the pokemon species ([fd8d954](https://github.com/zthun/pokedexii/commit/fd8d954e15b6f6fbeec7895a4f70fb39fab45953))
* support for urshifu main variant in tests ([026ff4f](https://github.com/zthun/pokedexii/commit/026ff4f5895941e2825a4e8b09f68fc0079a023c))
* type builder an now construct electric, water, and rock for testing ([2528d67](https://github.com/zthun/pokedexii/commit/2528d6769c20684fc16941392b8234c0c7a9f57b))
* type service returns type information ([efc4f5f](https://github.com/zthun/pokedexii/commit/efc4f5f8973e775c466428f833c2422dfd4518e6))
* you can now search on the type ([a75e9cd](https://github.com/zthun/pokedexii/commit/a75e9cd916e070a08c862f85970808fef96b2dd0))


### Bug Fixes

* get and list now properly search the names ([a397448](https://github.com/zthun/pokedexii/commit/a3974485e58889f91ecf346bf0cd0ea3e3926253))
* red console warnings about duplicate keys should no longer happen on the species details page ([436499b](https://github.com/zthun/pokedexii/commit/436499b021f49e7e9901c7c52d8e160c4b21ccd0))
* species now converts the language name ([13f3f39](https://github.com/zthun/pokedexii/commit/13f3f392c0e11e0c2c0c3a01e56d271083f3e9dc))


### Code Refactoring

* pokemon service moved to api ([335f214](https://github.com/zthun/pokedexii/commit/335f214428072c25b41c60cbccd3b7fa00994b33))
* species service moved to pokedex-api ([54aaac1](https://github.com/zthun/pokedexii/commit/54aaac14937fec961f21a192f9cdc2dfb9fe712d))
* type service moved to api ([c357bfc](https://github.com/zthun/pokedexii/commit/c357bfcfe1af34814d05dfd0e571fccadbc1a046))



## [0.16.1](https://github.com/zthun/pokedexii/compare/v0.16.0...v0.16.1) (2023-08-12)

**Note:** Version bump only for package @zthun/pokedexii





## [0.16.0](https://github.com/zthun/pokedexii/compare/v0.15.0...v0.16.0) (2023-08-07)


### Features

* attributes now render pokemon abilities ([a7b1e56](https://github.com/zthun/pokedexii/commit/a7b1e56f37cbfb9a943fd268cbc2cbe8b53efa51))
* pokemon now have ability data ([3459199](https://github.com/zthun/pokedexii/commit/34591990b8260b6dde63ccd4b55d447c5f5c8e53))



## [0.15.0](https://github.com/zthun/pokedexii/compare/v0.14.0...v0.15.0) (2023-08-07)


### Features

* darker theme colors ([aa9d429](https://github.com/zthun/pokedexii/commit/aa9d4290a9397ca17948a1fa88c482c94b094660))
* do not return unknown or shadow in the type list ([a86647b](https://github.com/zthun/pokedexii/commit/a86647ba53baa6c58b1cf1207b9a343f9d6f5dd2))
* root level navigation drawer ([d516c4a](https://github.com/zthun/pokedexii/commit/d516c4a8ad40ae4d329af6a3fec5a1bad46b7e98))
* type badge list can display icons only ([922faf7](https://github.com/zthun/pokedexii/commit/922faf7741b4f1b25c9477aad1c5155fc20fe810))
* type badges display icons ([90f3761](https://github.com/zthun/pokedexii/commit/90f37612b0db0be88ce7e869f85c54f5fd2cc105))
* type icons ([1621626](https://github.com/zthun/pokedexii/commit/16216263d2deb81157dce55d8e74ef70cfd62b93))
* type list page for showing type matchups ([dce4ee7](https://github.com/zthun/pokedexii/commit/dce4ee78ae7278759d5b078bfbdd6fa71cd2c5da))
* types can now have artwork ([9601d09](https://github.com/zthun/pokedexii/commit/9601d09bc5a22c0d9ed7cb6f1730590db561e7e6))



## [0.14.0](https://github.com/zthun/pokedexii/compare/v0.13.1...v0.14.0) (2023-07-26)


### Features

* species list now uses a load more pagination strategy ([debc389](https://github.com/zthun/pokedexii/commit/debc389867fb7946c4665c67934f37974ae4c6e2))



## [0.13.1](https://github.com/zthun/pokedexii/compare/v0.13.0...v0.13.1) (2023-07-23)

**Note:** Version bump only for package @zthun/pokedexii





## [0.13.0](https://github.com/zthun/pokedexii/compare/v0.12.0...v0.13.0) (2023-07-23)


### Features

* render trigger information for evolutions ([5a1517b](https://github.com/zthun/pokedexii/commit/5a1517be61c88b98f72539805f63e6bd0ac51aee))


### Bug Fixes

* gender order now matches pokeapi ([2bb3619](https://github.com/zthun/pokedexii/commit/2bb36193a486ba7a77f5651c44b1468d5d8f0846))



## [0.12.0](https://github.com/zthun/pokedexii/compare/v0.11.2...v0.12.0) (2023-07-22)


### Features

* clicking on an evolution node takes you to the species ([0bf3b5e](https://github.com/zthun/pokedexii/commit/0bf3b5ef017553c2e1f81699fb7275b2df02f913))


### Bug Fixes

* variant resets to first when location changes on species details ([a9a9ac1](https://github.com/zthun/pokedexii/commit/a9a9ac1a21d5bbe181184796e69c960c8d20e670))



## [0.11.2](https://github.com/zthun/pokedexii/compare/v0.11.1...v0.11.2) (2023-07-22)

**Note:** Version bump only for package @zthun/pokedexii





## [0.11.1](https://github.com/zthun/pokedexii/compare/v0.11.0...v0.11.1) (2023-07-17)


### Bug Fixes

* species page should no longer display horizontal scrollbars ([cc32ec1](https://github.com/zthun/pokedexii/commit/cc32ec18d959868b38c1625774568e23b22c7e15))



## [0.11.0](https://github.com/zthun/pokedexii/compare/v0.10.0...v0.11.0) (2023-07-17)


### Features

* add evolution information to species details ([c55031e](https://github.com/zthun/pokedexii/commit/c55031e7a09ceed5ed0f6efb7a8dae1fbd64b389))
* species details evolution chain card describes the growth path of the pokemon ([4bcdde9](https://github.com/zthun/pokedexii/commit/4bcdde9e2e9c9234b27a541d43c92d6975bdac67))
* support ralts, kirlia, gardevoir, and gallade ([fe5be0c](https://github.com/zthun/pokedexii/commit/fe5be0cff20f9631b22418d9c8eb559af2fa4877))


### Bug Fixes

* api response signatures ([c00705d](https://github.com/zthun/pokedexii/commit/c00705d5bedaa17aebf225319c09ca6352f9344f))
* evolution id can now be discovered when retrieving species information ([301043e](https://github.com/zthun/pokedexii/commit/301043e3637d9d7fe05e2d37d645fe8292199c03))
* missing assignments for relative stats and beauty ([ddaef90](https://github.com/zthun/pokedexii/commit/ddaef90dd56eee30a142793d6cf0779886c54be3))
* missing evolution trigger values and wrong assignments ([27bb2bb](https://github.com/zthun/pokedexii/commit/27bb2bb616ba18b53078427d4bf50ba06b56d5c1))



## [0.10.0](https://github.com/zthun/pokedexii/compare/v0.9.0...v0.10.0) (2023-07-12)


### Features

* added species specific card support ([8909ff5](https://github.com/zthun/pokedexii/commit/8909ff504f9d175a93d2e2fcae7072f06713156c))



## [0.9.0](https://github.com/zthun/pokedexii/compare/v0.8.1...v0.9.0) (2023-07-12)


### Features

* added charizard to species builder ([38b475e](https://github.com/zthun/pokedexii/commit/38b475ec4f2e0fc1f7fc3740b045c36111522f5b))



## [0.8.1](https://github.com/zthun/pokedexii/compare/v0.8.0...v0.8.1) (2023-07-11)


### Bug Fixes

* no more warnings on duplicate ids ([50dd86f](https://github.com/zthun/pokedexii/commit/50dd86fd87282e6be6f9dc10fc6aaa22274d57be))
* resource name for species is pokemon-species ([015b503](https://github.com/zthun/pokedexii/commit/015b503f5e064a0022afa496d131068f33408cea))



## [0.8.0](https://github.com/zthun/pokedexii/compare/v0.7.2...v0.8.0) (2023-07-11)


### Features

* allow id in search ([a7dab25](https://github.com/zthun/pokedexii/commit/a7dab25859e3ff415f64c2df70c22ac4bb2f9a5e))
* evolution model ([af18440](https://github.com/zthun/pokedexii/commit/af18440a9b6b71899686ae4d2ae5ed2e3b20ab3c))
* gender support ([2785e4b](https://github.com/zthun/pokedexii/commit/2785e4b10092298ffc38e972c2595f4c9184fafc))
* ids can now be strings or numbers ([78de024](https://github.com/zthun/pokedexii/commit/78de02443896353d9c81631f388f8beebf192bfa))
* species service describes pokemon species ([e714452](https://github.com/zthun/pokedexii/commit/e714452585dd1e697af5c9265c149d711f00a7ad))
* support for species and evolutions ([3bebf18](https://github.com/zthun/pokedexii/commit/3bebf185e558474d4b66061b9f5ceda9ddb8a707))



## [0.7.2](https://github.com/zthun/pokedexii/compare/v0.7.1...v0.7.2) (2023-07-10)

**Note:** Version bump only for package @zthun/pokedexii





## [0.7.1](https://github.com/zthun/pokedexii/compare/v0.7.0...v0.7.1) (2023-07-10)


### Bug Fixes

* api resource should now cache properly ([e764a4b](https://github.com/zthun/pokedexii/commit/e764a4b4e5b2fdf2694d8c413ad37d971ef35851))



## [0.7.0](https://github.com/zthun/pokedexii/compare/v0.6.0...v0.7.0) (2023-07-09)


### Features

* add pokemon height and weight ([1ccbbcf](https://github.com/zthun/pokedexii/commit/1ccbbcf75939e069c14e556a0b3b2dea4fc3a9d2))
* add support for pokemon weaknesses ([69c202e](https://github.com/zthun/pokedexii/commit/69c202e294145daf514b586fb49c078233e61405))
* details page now renders weaknesses ([5fc2e90](https://github.com/zthun/pokedexii/commit/5fc2e90f25c9dcf6fc107ba75bd8c1ce72ba496a))
* pokemon attributes describe height, weight, and type strengths and weaknesses ([db8cb67](https://github.com/zthun/pokedexii/commit/db8cb67ee5d65aa134be1a762bb0c643440e9b23))
* pokemon type service allows for type retrieval ([f26f48c](https://github.com/zthun/pokedexii/commit/f26f48c96c5aaca6970a0fd5c8fe74d9ba386eae))



## [0.6.0](https://github.com/zthun/pokedexii/compare/v0.5.0...v0.6.0) (2023-07-08)


### Features

* details page shows pokemon information ([745a615](https://github.com/zthun/pokedexii/commit/745a615834d2b0896374dd345aae508d7a40f063))
* pokemon not gives back stat information ([35947f0](https://github.com/zthun/pokedexii/commit/35947f0b7c41c36a2b2e6e3f377a312779b83d1f))
* service converts pokeapi stats to stat information ([35ef91d](https://github.com/zthun/pokedexii/commit/35ef91d6664f15907bbfc28c734994f0b87ddb3f))
* stats have their own themes ([2f3de30](https://github.com/zthun/pokedexii/commit/2f3de30fdc906a49d04af9d8f7945fe2db4dc7c6))



## [0.5.0](https://github.com/zthun/pokedexii/compare/v0.4.0...v0.5.0) (2023-07-08)


### Features

* cards now display pokemon types ([badae25](https://github.com/zthun/pokedexii/commit/badae25aaaa2b6cd17c4b8341ff080dca31f77a6))
* pokemon theme ([3cd1c18](https://github.com/zthun/pokedexii/commit/3cd1c18e8ad7afe90b647f55de6fcdd15dcc3027))
* type badge displays a fashionable pokemon type ([0b473e3](https://github.com/zthun/pokedexii/commit/0b473e3e25aeca8b79ca059c65ad4c6122c36102))


### Bug Fixes

* export pokemon type ([4c4f67b](https://github.com/zthun/pokedexii/commit/4c4f67b518d2cef2de084a41785c79872ff50ef2))



## [0.4.0](https://github.com/zthun/pokedexii/compare/v0.3.4...v0.4.0) (2023-07-08)


### Features

* official artwork retrieval is now supported ([3db1c5c](https://github.com/zthun/pokedexii/commit/3db1c5c741991ae01051266f8ca542a55f088a73))



## [0.3.4](https://github.com/zthun/pokedexii/compare/v0.3.3...v0.3.4) (2023-06-24)

**Note:** Version bump only for package @zthun/pokedexii





## [0.3.3](https://github.com/zthun/pokedexii/compare/v0.3.2...v0.3.3) (2023-06-21)

**Note:** Version bump only for package @zthun/pokedexii





## [0.3.2](https://github.com/zthun/pokedexii/compare/v0.3.1...v0.3.2) (2023-02-24)

**Note:** Version bump only for package @zthun/pokedexii





## [0.3.1](https://github.com/zthun/pokedexii/compare/v0.3.0...v0.3.1) (2023-02-20)

**Note:** Version bump only for package @zthun/pokedexii





## [0.3.0](https://github.com/zthun/pokedexii/compare/v0.2.0...v0.3.0) (2023-02-20)


### Features

* added data matching strategies ([caf73a6](https://github.com/zthun/pokedexii/commit/caf73a6fa1e2e6c141219aa744fb995c7d4fdfbf))
* added search capabilities ([4480381](https://github.com/zthun/pokedexii/commit/448038156c982c4a9d891281079d9506ddd1b0de))
* added support for search in the data request ([d1187b0](https://github.com/zthun/pokedexii/commit/d1187b0216737a1f517c5233b929d9d5ebd1906c))
* added useAmbassadorState ([1185e9d](https://github.com/zthun/pokedexii/commit/1185e9d9b61d2f87b61a2fb9e9ad9478cf07a3ec))



## [0.2.0](https://github.com/zthun/pokedexii/compare/v0.1.1...v0.2.0) (2023-02-19)


### Features

* added count support to the pokemon service ([a8a741b](https://github.com/zthun/pokedexii/commit/a8a741bb90cb4bb4037d1f5c98799d8b6a5f8504))
* added page navigation ([c6d0145](https://github.com/zthun/pokedexii/commit/c6d0145e0e4173161a4a26412dfda60e1e707e5b))
* pokemon cards now have ellipse headers ([7452260](https://github.com/zthun/pokedexii/commit/745226046e08cd0c86d45e98fce7bc926aa4e64c))



## [0.1.1](https://github.com/zthun/pokedexii/compare/v0.1.0...v0.1.1) (2023-02-19)

**Note:** Version bump only for package @zthun/pokedexii





## [0.1.0](https://github.com/zthun/pokedexii/compare/v0.0.3...v0.1.0) (2023-02-19)


### Features

* added pokemon details ([e0b86f2](https://github.com/zthun/pokedexii/commit/e0b86f20b51c55d8b83e47207168ce201950ac49))
* added pokemon list ([0803daa](https://github.com/zthun/pokedexii/commit/0803daad2e7ed091639547c52793b34777d615a1))
* added the pokemon service ([ecc3a06](https://github.com/zthun/pokedexii/commit/ecc3a064a99a504ed0b30e981bf17a6fed6e2a24))
* app bar displays application name ([1c4c4ea](https://github.com/zthun/pokedexii/commit/1c4c4ea0ee289c94d89ebf5d2111c966a6c3af0c))
* pokemon list displays pages of pokemon ([5eed3e2](https://github.com/zthun/pokedexii/commit/5eed3e2d33ab8df4514c6ca00164377079c48c04))



## [0.0.3](https://github.com/zthun/pokedexii/compare/v0.0.2...v0.0.3) (2023-02-18)

**Note:** Version bump only for package @zthun/pokedexii





## [0.0.2](https://github.com/zthun/pokedexii/compare/v0.0.1...v0.0.2) (2023-02-18)

**Note:** Version bump only for package @zthun/pokedexii





## 0.0.1 (2023-02-18)

**Note:** Version bump only for package @zthun/pokedexii
