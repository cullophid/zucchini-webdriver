export const elementNotFound = (selector) => () => {
  return Promise.reject(` Could not find element matching ${selector}`)
}

export const textNotFound = (selector, text) => () =>
  Promise.reject(` Could not find element matching '${selector}' with text ${text}`)
