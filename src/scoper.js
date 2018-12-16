import { interpolate } from "./interpolate"

const scoper = styles => (classLiterals, ...classValues) => {
  let v
  if (Array.isArray(classLiterals)) {
    v = interpolate(classLiterals, classValues)
  } else {
    v = classLiterals.split(/\s+/u)
  }

  return v
    .map(className =>
      styles && typeof styles[className] === "string" ? styles[className] : ""
    )
    .join(" ")
    .replace(/\s+/u, " ")
    .trim()
}

export { scoper, scoper as default }
