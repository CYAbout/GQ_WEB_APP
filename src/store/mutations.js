export const SET_STATE_DATA = function (state, payload) {
  console.log('mutations;',payload)
  state._data = payload
}
export const SET_FOOT_FLAG = function (state, payload) {
  state._footFlag = payload
}
export const SET_ORDER_ID = function (state, payload) {
  state._orderId = payload
}