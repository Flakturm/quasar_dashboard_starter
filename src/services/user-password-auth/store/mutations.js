import { LocalStorage } from 'quasar'
import defaultState from './state'

function setLoggedIn(state, value) {
  state.loggedIn = value

  LocalStorage.set('user.loggedIn', value)
}

function setDetails(state, payload) {
  const { roles, permissions, ...reducedPayload } = payload
  state.details = reducedPayload
}

function setRoles(state, payload) {
  state.roles = payload.roles
}

function setPermissions(state, payload) {
  if (payload.permissions) {
    state.permissions = payload.permissions
  }
}

function resetState(state) {
  Object.assign(state, defaultState())
  LocalStorage.set('user.loggedIn', false)
}

export { setLoggedIn, setDetails, setRoles, setPermissions, resetState }
