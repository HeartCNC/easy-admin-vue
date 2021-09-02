import * as Dicts from './label-value'

const r = [{ label: '全部', value: '' }]

export function getDict(dict, insertAll) {
  for (const key in Dicts) {
    if (Object.hasOwnProperty.call(Dicts, key)) {
      const element = Dicts[key]
      if (key === dict) {
        return insertAll ? r.concat(element) : element
      }
    }
  }
  return []
}

export function getDictLabel(value, dict) {
  const d = getDict(dict).find(item => item.value === value)
  return d && d.label || ''
}
