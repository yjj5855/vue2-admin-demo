/**
 * 把为空的参数去掉，并把currentPage，pageSize去掉
 * @param params
 * @returns {{}}
 */
export function parseParams (params) {
  let newParams = {}
  for (let key in params) {
    if (params[key] !== '') {
      newParams[key] = params[key]
    }
  }
  if (newParams['currentPage']) { delete newParams['currentPage'] }
  if (newParams['pageSize']) { delete newParams['pageSize'] }
  return newParams
}
