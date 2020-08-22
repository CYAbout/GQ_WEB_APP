export const setStateData = (store, payload) => {
  console.log('actions:',payload)
  store.commit('SET_STATE_DATA', payload)
}
// 底部亮起标示
export const setFootFlag = (store, payload) => {
  store.commit('SET_FOOT_FLAG', payload)
}
// 订单ID
export const setOrderId = (store, payload) => {
  store.commit('SET_ORDER_ID', payload)
}