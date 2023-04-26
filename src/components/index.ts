import ceshi from './EnterSearchAdd/index.vue'
import RefreshButton from './RefreshButton/index.vue'
const components = [ceshi, RefreshButton]
export default {
  install(app: any) {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  },
}
