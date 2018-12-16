import { describe, Try } from "riteway"
import defaultExport, * as allExports from "./main.js"

describe("main.js", async assert => {
  assert({
    given: "the default export",
    should: "be a function",
    actual: typeof defaultExport,
    expected: "function",
  })

  {
    const expected = ["default", "scoper", "classer"].sort()
    const actual = Object.keys(allExports).sort()

    assert({
      given: "all exports",
      should: `include only [${expected.join(", ")}]`,
      actual,
      expected,
    })
  }

  {
    const { scoper } = allExports
    assert({
      given: "export scoper",
      should: "be identical to default export",
      actual: scoper,
      expected: defaultExport,
    })
  }
})
