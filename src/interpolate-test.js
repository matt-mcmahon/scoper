import { describe, Try } from "riteway"
import defaultExport, { interpolate, splitTrim } from "./interpolate"

const [a, b, c, d, e, f] = ["a", "b", "c", "d", "e", "f"]

describe("splitTrim", async assert => {
  assert({
    given: " a b c ",
    should: "split with no extra spaces",
    actual: splitTrim(" a b c "),
    expected: [a, b, c],
  })
})

describe("interpolate", async assert => {
  assert({
    given: "default export",
    should: "be function",
    actual: typeof defaultExport,
    expected: "function",
  })

  assert({
    given: "named export",
    should: "be function",
    actual: typeof interpolate,
    expected: "function",
  })

  assert({
    given: "no arguments",
    should: "return an empty array",
    actual: interpolate(),
    expected: [],
  })

  assert({
    given: "only 1st array",
    should: "return copy of 1st array",
    actual: interpolate([a, b, c]),
    expected: [a, b, c],
  })

  assert({
    given: "multiple words in a single element",
    should: "split those words",
    actual: interpolate(["a b c"]),
    expected: [a, b, c],
  })

  assert({
    given: "two arrays of the same length",
    should: "interpolate those arrays",
    actual: interpolate([a, c, e], [b, d, f]),
    expected: [a, b, c, d, e, f],
  })

  assert({
    given: `shorter second array`,
    should: `include all elements of both`,
    actual: interpolate([a, c, e, f], [b, d]),
    expected: [a, b, c, d, e, f],
  })

  assert({
    given: `shorter first array`,
    should: `include all elements of both`,
    actual: interpolate([a, c], [b, d, e, f]),
    expected: [a, b, c, d, e, f],
  })

  {
    const as = undefined
    const bs = [a, b, c]
    const actual = interpolate(as, bs)
    const expected = [a, b, c]
    assert({
      given: `undefined first array`,
      should: `return a copy of second array`,
      actual,
      expected,
    })
    assert({
      given: `undefined first array`,
      should: `... but not second array`,
      actual: bs === actual,
      expected: false,
    })
  }

  assert({
    given: `array 1 with unsplit words`,
    should: `maintain correct order`,
    actual: interpolate([a, "c d", f], [b, e]),
    expected: [a, b, c, d, e, f],
  })

  assert({
    given: `array 2 with unsplit words`,
    should: `maintain correct order`,
    actual: interpolate([a, d, f], ["b c", e]),
    expected: [a, b, c, d, e, f],
  })

  assert({
    given: `extra spacing`,
    should: `trim spacing`,
    actual: interpolate(["a ", " c"], "b"),
    expected: [a, b, c],
  })
})
