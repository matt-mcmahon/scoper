import scoper from "./scoper"

const classer = styles => (classLiterals, ...classValues) => {
  const className = scoper(styles)(classLiterals, ...classValues)
  return { className }
}

export { classer, classer as default }
