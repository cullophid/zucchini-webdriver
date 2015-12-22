export const elementNotFound = (selector) => () => {
  return Promise.reject(new Error(` Could not find element matching ${selector}`))
}

export const textNotFound = (selector, text) => () =>
  Promise.reject(new Error(` Could not find element matching '${selector}' with text ${text}`))

export const attrNotFound = (selector, name, value) => () =>
  Promise.reject(new Error(` Could not find element matching '${selector}' with the attr ${name}=${value}`))
