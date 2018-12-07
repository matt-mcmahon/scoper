import { describe, Try } from 'riteway'
import defaultExport, { scoper } from './scoper.js'

const [a, b, c] = ['a', 'b', 'c']

const styles = {
  a: 'aa',
  b: 'bb',
  c: 'cc',
  one: 'one1',
  two: 'two2',
  three: 'three3'
}

const scope = scoper(styles)

describe('scoper', async assert => {
  assert({
    given: 'default export',
    should: 'be function',
    actual: typeof defaultExport,
    expected: 'function'
  })

  assert({
    given: 'named export',
    should: 'be function',
    actual: typeof scoper,
    expected: 'function'
  })

  assert({
    given: 'className "a"',
    should: 'expand to "aa"',
    actual: scope`a`,
    expected: `aa`
  })

  assert({
    given: 'className "a b"',
    should: 'expand to "aa bb"',
    actual: scope`a b`,
    expected: `aa bb`
  })

  assert({
    given: ' template "a ${b} c"',
    should: 'expand to "aa bb cc"',
    actual: scope`a ${b} c`,
    expected: `aa bb cc`
  })

  assert({
    given: '${a} ${b} ${c}',
    should: 'expand to "aa bb cc"',
    actual: scope`${a} ${b} ${c}`,
    expected: `aa bb cc`
  })

  assert({
    given: 'A normal string',
    should: 'work when invoked like a function',
    actual: scope('one two three'),
    expected: 'one1 two2 three3'
  })

  assert({
    given: '`one undefined`',
    should: 'not add an extra space at the end',
    actual: scope`one undefined`,
    expected: `one1`
  })

  assert({
    given: '`undefined two`',
    should: 'not add an extra space at the beginning',
    actual: scope`undefined two`,
    expected: `two2`
  })

  assert({
    given: '`one undefined three`',
    should: 'not add extra spaces in the middle',
    actual: scope`one undefined three`,
    expected: `one1 three3`
  })
})
