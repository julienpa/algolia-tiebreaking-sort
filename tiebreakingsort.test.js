/* global require, test, expect */

const tieBreakingSort = require('./tiebreakingsort')
const searchResults = require('./searchresults.json')
const { performance } = require('perf_hooks')

/**
 * Functional tests
 */
test('sample results to not be sorted', () => {
  const unsorted = searchResults.hits.map(hit => hit.objectID)
  expect(unsorted).not.toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8'])
})

test('tieBreakingSort to sort sample results', () => {
  const sorted = searchResults.hits.sort(tieBreakingSort).map(hit => hit.objectID)
  expect(sorted).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8'])
})

/**
 * Performance tests
 */
const maxExecutionTimeMS = 50
const nbLoops = 1000
const nbItems = searchResults.hits.length
test(`sorting ${nbLoops * nbItems} results to take less than ${maxExecutionTimeMS}ms`, () => {
  const unsorted = []
  for (let i = 0; i < nbLoops; ++i) {
    unsorted.push(...searchResults.hits)
  }
  expect(unsorted.length).toEqual(nbLoops * nbItems)

  const t0 = performance.now()
  unsorted.sort(tieBreakingSort)
  const t1 = performance.now()

  expect(t1 - t0).toBeLessThan(maxExecutionTimeMS)
})
