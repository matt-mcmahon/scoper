import { describe, Try } from "riteway"
import defaultExport, { scoper } from "./scoper"
import { scoper as mainExport } from "./main"
import styles from "./test-styles.json"

describe("scoper", async assert => {
  const [a, b, c] = ["a", "b", "c"]
  const scope = scoper(styles)

  assert({
    given: "scoper",
    should: "be function",
    actual: typeof scoper,
    expected: "function",
  })

  assert({
    given: "main export",
    should: "be identicial to scoper",
    actual: mainExport === scoper,
    expected: true,
  })

  assert({
    given: "default export",
    should: "be identicial to scoper",
    actual: defaultExport === scoper,
    expected: true,
  })

  assert({
    given: 'className "a"',
    should: 'expand to "aa"',
    actual: scope`a`,
    expected: `aa`,
  })

  assert({
    given: 'className "a b"',
    should: 'expand to "aa bb"',
    actual: scope`a b`,
    expected: `aa bb`,
  })

  assert({
    given: ' template "a ${b} c"',
    should: 'expand to "aa bb cc"',
    actual: scope`a ${b} c`,
    expected: `aa bb cc`,
  })

  assert({
    given: "${a} ${b} ${c}",
    should: 'expand to "aa bb cc"',
    actual: scope`${a} ${b} ${c}`,
    expected: `aa bb cc`,
  })

  assert({
    given: "A normal string",
    should: "work when invoked like a function",
    actual: scope("one two three"),
    expected: "one1 two2 three3",
  })

  assert({
    given: "`one undefined`",
    should: "not add an extra space at the end",
    actual: scope`one undefined`,
    expected: `one1`,
  })

  assert({
    given: "`undefined two`",
    should: "not add an extra space at the beginning",
    actual: scope`undefined two`,
    expected: `two2`,
  })

  assert({
    given: "`one undefined three`",
    should: "not add extra spaces in the middle",
    actual: scope`one undefined three`,
    expected: `one1 three3`,
  })
})
