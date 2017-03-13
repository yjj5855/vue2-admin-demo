import * as mutations from './mutation-types'
import axios from 'axios'
import { parseParams } from '../../libs/axiosConfig'

export function FETCH_LIST_DATA ({commit, dispatch, state}, params) {
  let base = state.base
  commit(mutations.UPDATE_BASE, { loading: true })
  return new Promise((resolve, reject) => {
    axios.get('/v1/employee/employees/', {
      params: {
        ...parseParams(params),
        start: (params.currentPage - 1) * params.pageSize,
        length: params.pageSize,
        '-': new Date().getTime(),
        draw: params.draw + 1
      }
    }).then((data) => {
      // commit(mutations.UPDATE_BASE, {
      //   paramsData: {
      //     ...params,
      //     draw: params.draw + 1
      //   },
      //   respData: {
      //     ...state.base.respData,
      //     list: [],
      //     total: 100
      //   }
      // })
      resolve(data)
    }).catch((err) => {
      commit(mutations.UPDATE_BASE, base)
      reject(err)
    }).finally(() => {
      commit(mutations.UPDATE_BASE, {
        paramsData: {
          ...params,
          draw: params.draw + 1
        },
        respData: {
          ...state.base.respData,
          list: [
            {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }
          ],
          total: 4353
        }
      })
      commit(mutations.UPDATE_BASE, { loading: false })
    })
  })
}
