# Algolia tie-breaking sort

![npm](https://img.shields.io/npm/dm/algolia-tiebreaking-sort)
![node-lts](https://img.shields.io/node/v-lts/algolia-tiebreaking-sort)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## What is it?

This package is a simple and fast post-processing sorting of search results
coming from Algolia, with zero dependency.
Original idea and implementation from [mikaa123](https://github.com/mikaa123)!

## When should it be used?

The main use-case for this is to re-rank an Algolia result set after it has
been returned by the search engine.
Such need could happen if you want to merge results coming from different
indices, or if you have a complex ranking strategy that needs 2 layers of
sorting (Algolia has advanced result-tweaking solutions, but can only apply
one global ranking strategy).

For the most performance-conscious people, a quick benchmark with
Array.prototype.sort() and Node.js v14.0.0 showed that the function can sort
8000 results in less than 50 milliseconds.

## How to use it?

Regular install through npm or yarn:

```bash
npm i algolia-tiebreaking-sort
# or
yarn add algolia-tiebreaking-sort
```

Then the most straightforward way to use it is the following:

```javascript
const algoliasearch = require('algoliasearch')
const tieBreakingSort = require('algolia-tiebreaking-sort')

const client = algoliasearch('APPID', 'APIKEY')
const index1 = client.initIndex('index_name_1')
const index2 = client.initIndex('index_name_2')

// Only requirement is to have `_rankingInfo` and `objectID` for each hit
const search1 = index1.search('my query', { getRankingInfo: true })
const search2 = index2.search('my query', { getRankingInfo: true })

Promise.all([search1, search2]).then(results => {
  const hits = [...results[0].hits, ...results[1].hits]
  console.log(hits.sort(tieBreakingSort))
})
```

## What are the next steps?

Potential improvements include:
- Handle sort-by criteria
- Make the ranking formula configurable, allowing custom ones
- Optimize speed
- Rewrite in Typescript

## How to run tests?

Just clone this repository and run:
```bash
npm test
# or
yarn test
```

## Disclaimer

This package is not officially supported by [Algolia](https://www.algolia.com/),
so it cannot be held responsible for any use in production. If you need support,
use GitHub issues or the [community forum](https://discourse.algolia.com/), but
**not** Algolia email support.
