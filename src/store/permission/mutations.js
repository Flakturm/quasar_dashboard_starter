import defaultState from './state'

function setRoutesWithChildren(state, payload) {
  state.routesWithChildren = payload
}

function setRoutesWithoutChildren(state, payload) {
  state.routesWithoutChildren = payload
}

function resetState(state) {
  Object.assign(state, defaultState())
}

export { setRoutesWithChildren, setRoutesWithoutChildren, resetState }
