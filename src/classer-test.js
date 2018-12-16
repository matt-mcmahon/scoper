import { describe, Try } from "riteway"
import defaultExport, { classer } from "./classer"
import { classer as mainExport } from "./main"
import styles from "./test-styles.json"

describe("classer", async assert => {
  const [a, b, c] = ["a", "b", "c"]
  const className = classer(styles)

  assert({
    given: "classer",
    should: "be function",
    actual: typeof classer,
    expected: "function",
  })

  assert({
    given: "main export",
    should: "be identicial to classer",
    actual: mainExport === classer,
    expected: true,
  })

  assert({
    given: "default export",
    should: "be identicial to classer",
    actual: defaultExport === classer,
    expected: true,
  })

  assert({
    given: "a b c",
    should: 'return { className: "aa bb cc" }',
    actual: className`a b c`,
    expected: { className: "aa bb cc" },
  })
})
