const tieBreakingSort = (hitA, hitB) => {
  // Default Algolia ranking formula (textual + geo + custom ranking)
  const criteria = [
    'nbTypos:asc',
    'geoDistance:asc',
    'words:desc',
    'filters:desc',
    'proximityDistance:asc',
    'firstMatchedWord:asc',
    'nbExactWords:desc',
    'userScore:desc',
  ]
  let rank = 0

  for (let i = 0; i < criteria.length; ++i) {
    const criterion = criteria[i].split(':')
    const criterionName = criterion[0]
    const criterionOrder = criterion[1]

    if (hitA._rankingInfo[criterionName] === hitB._rankingInfo[criterionName]) {
      continue
    } else if (criterionOrder === 'asc') {
      rank = hitA._rankingInfo[criterionName] - hitB._rankingInfo[criterionName]
      break
    } else if (criterionOrder === 'desc') {
      rank = hitB._rankingInfo[criterionName] - hitA._rankingInfo[criterionName]
      break
    }
  }

  if (rank === 0) {
    // no tie-break, using objectID (higher is better, so 'B' > 'A' and '2' > '1')
    return hitA.objectID > hitB.objectID ? 1 : -1
  } else {
    return rank
  }
}

module.exports = tieBreakingSort
