import { registerSW } from 'virtual:pwa-register'

const emit = (name, detail) => {
  document.dispatchEvent(new CustomEvent(name, { detail }))
}

export const registerPWA = () => {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      emit('pwa:need-refresh', { confirm: () => updateSW(true) })
    },
    onOfflineReady() {
      emit('pwa:offline-ready')
    },
  })

  return updateSW
}
