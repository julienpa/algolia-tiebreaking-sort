/* global require, test, expect */
const tieBreakingSort = require('./tiebreakingsort')
const searchResults = require('./searchresults.json')

test('sample results to not be sorted', () => {
  const unsorted = searchResults.hits.map(hit => hit.objectID)
  expect(unsorted).not.toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8'])
})

test('tieBreakingSort to sort sample results', () => {
  const sorted = searchResults.hits.sort(tieBreakingSort).map(hit => hit.objectID)
  expect(sorted).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8'])
})
