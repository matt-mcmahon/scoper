import { describe, Try } from 'riteway'
import defaultExport, { interpolate, splitTrim } from './interpolate'

const [a, b, c, d, e, f] = ['a', 'b', 'c', 'd', 'e', 'f']

describe('splitTrim', async assert => {
  assert({
    given: ' a b c ',
    should: 'split with no extra spaces',
    actual: splitTrim(' a b c '),
    expected: [a, b, c]
  })
})

describe('interpolate', async assert => {
  assert({
    given: 'default export',
    should: 'be function',
    actual: typeof defaultExport,
    expected: 'function'
  })

  assert({
    given: 'named export',
    should: 'be function',
    actual: typeof interpolate,
    expected: 'function'
  })

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: interpolate(),
    expected: []
  })

  assert({
    given: 'only 1st array',
    should: 'return copy of 1st array',
    actual: interpolate([a, b, c]),
    expected: [a, b, c]
  })

  assert({
    given: 'multiple words in a single element',
    should: 'split those words',
    actual: interpolate(['a b c']),
    expected: [a, b, c]
  })

  assert({
    given: 'two arrays of the same length',
    should: 'interpolate those arrays',
    actual: interpolate([a, c, e], [b, d, f]),
    expected: [a, b, c, d, e, f]
  })

  assert({
    given: `a second array that's shorter than the first`,
    should: `return all elements of a interpolated with b`,
    actual: interpolate([a, c, e, f], [b, d]),
    expected: [a, b, c, d, e, f]
  })

  assert({
    given: `a second array that's longer than the first`,
    should: `return a interpolated with b and the rest of b`,
    actual: interpolate([a, c], [b, d, e, f]),
    expected: [a, b, c, d, e, f]
  })

  assert({
    given: `nothing as the first array and a second array`,
    should: `return a copy of the second array`,
    actual: interpolate(undefined, [a, b, c]),
    expected: [a, b, c]
  })

  assert({
    given: `an a2 with multiple words in one element`,
    should: `interpolate in the right order`,
    actual: interpolate([a, d, f], ['b c', e]),
    expected: [a, b, c, d, e, f]
  })
  assert({
    given: `an a1 with multiple words in one element`,
    should: `interpolate in the right order`,
    actual: interpolate([a, 'c d', f], [b, e]),
    expected: [a, b, c, d, e, f]
  })

  assert({
    given: `extra spacing in elements`,
    should: `trim spacing`,
    actual: interpolate(['a ', ' c'], 'b'),
    expected: [a, b, c]
  })
})
