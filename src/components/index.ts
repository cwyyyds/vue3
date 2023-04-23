import ceshi from './EnterSearchAdd/index.vue'
const components = [ceshi]
export default {
  install(app: any) {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  },
}
