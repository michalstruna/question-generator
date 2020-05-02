const app = { current: document.querySelector<HTMLElement>('#app')! }
const nav = { current: document.querySelector<HTMLElement>('#nav')! }

export default () => ({ app, nav })