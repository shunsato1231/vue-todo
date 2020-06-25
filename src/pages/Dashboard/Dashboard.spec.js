import { mount } from '@vue/test-utils'
import Dashboard from './Dashboard.vue'

describe('Item.vue', () => {
  test('render test', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.exists()).toBe(true)
  })
})