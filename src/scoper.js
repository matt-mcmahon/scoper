import { interpolate } from './interpolate'

export const scoper = styles => (classLiterals, ...classValues) => {
  return interpolate(classLiterals, classValues)
    .map(className =>
      styles && typeof styles[className] === 'string' ? styles[className] : ''
    )
    .join(' ')
}

export default scoper
