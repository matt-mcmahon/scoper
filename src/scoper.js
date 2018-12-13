import { interpolate } from './interpolate'

export const classer = styles => (classLiterals, ...classValues) => {
  const className = scoper(styles)(classLiterals, ...classValues)
  return { className }
}

export const scoper = styles => (classLiterals, ...classValues) => {
  let v
  if (Array.isArray(classLiterals)) {
    v = interpolate(classLiterals, classValues)
  } else {
    v = classLiterals.split(/\s+/u)
  }

  return v
    .map(className =>
      styles && typeof styles[className] === 'string' ? styles[className] : ''
    )
    .join(' ')
    .replace(/\s+/u, ' ')
    .trim()
}

export default scoper
