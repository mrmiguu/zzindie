// Derived from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations

export type ObjKey = string | number | symbol
export type ObjSet<T extends ObjKey> = { [key in T]: true }

export const isSuperset = <T>(set: Set<T>, subset: Set<T>) => {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}

export const union = <T>(setA: Set<T>, setB: Set<T>) => {
  const _union = new Set(setA)
  for (const elem of setB) {
    _union.add(elem)
  }
  return _union
}

export const intersection = <T>(setA: Set<T>, setB: Set<T>) => {
  const _intersection = new Set()
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

export const symmetricDifference = <T>(setA: Set<T>, setB: Set<T>) => {
  const _difference = new Set(setA)
  for (const elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem)
    } else {
      _difference.add(elem)
    }
  }
  return _difference
}

export const difference = <T extends ObjKey>(setA: ObjSet<T>, setB: ObjSet<T>) => {
  const _difference = { ...setA }
  for (const elem in setB) {
    delete _difference[elem]
  }
  return _difference
}
