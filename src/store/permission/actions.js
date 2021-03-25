function setRoutes({ commit }, payload) {
  const allRoutes = this.$router.options.routes
  const rootRoutes = getRootRoutes(allRoutes)
  commit('resetState')
  commit('setRoutesWithChildren', getRoutesWithChildren(rootRoutes, payload))
  commit(
    'setRoutesWithoutChildren',
    getRoutesWithoutChildren(rootRoutes, payload)
  )
}

function getRootRoutes(routes) {
  return routes.filter((route) => route.meta && route.meta.root === true)
}

function getRoutesWithoutChildren(routes, payload) {
  return routes.filter(
    (route) =>
      route.meta.children === false &&
      hasPermission(route, payload) &&
      excludeHidden(route)
  )
}

function getRoutesWithChildren(routes, payload) {
  let items = routes.filter((route) => route.meta.children === true)

  items.forEach((item) => {
    item.children = item.children.filter((childItem) => {
      return hasPermission(childItem, payload) && excludeHidden(childItem)
    })
  })

  return items.filter((route) => route.children.length > 0)
}

function hasPermission(route, payload) {
  if (payload.roles.includes('Root')) {
    return true
  } else if (route.meta && route.meta.permissions) {
    return payload.permissions.some((permission) =>
      route.meta.permissions.includes(permission)
    )
  } else if (route.meta && route.meta.roles) {
    return payload.roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function excludeHidden(route) {
  return route.meta.hidden ? false : true
}

export { setRoutes }
