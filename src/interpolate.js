export const splitTrim = s => s.trim().split(/\s+/u)

export const interpolate = (as = [], bs = []) => {
  const length = Math.max(as.length, bs.length)
  const result = []
  for (let i = 0; i < length; i++) {
    if (i < as.length) {
      result.push(...splitTrim(as[i]))
    }
    if (i < bs.length) {
      result.push(...splitTrim(bs[i]))
    }
  }
  return result.filter(v => /\S/u.test(v))
}
export default interpolate
