import { shallow, mount } from 'avoriaz'
import App from '@/App'
import Recipe from '@/components/Recipe'

it('renders without crashing', () => {
  shallow(App)
})

it('should add a new recipe when clicking the button', () => {
  const wrapper = shallow(App)
  const button = wrapper.find('button')[0]
  button.trigger('click')

  expect(wrapper.find(Recipe)).toHaveLength(2)
})

it('should update an existing recipe', () => {
  const wrapper = mount(App)
  const recipe = wrapper.find(Recipe)[0]
  recipe.trigger('click')
  recipe.setData({ content: 'foobar' })
  const button = wrapper.find('.Icon-button')[0]
  button.trigger('click')

  expect(recipe.data().content).toBe('foobar')
})

it('should delete an existing recipe', () => {
  const wrapper = mount(App)
  const recipe = wrapper.find(Recipe)[0]
  recipe.trigger('click')
  const button = wrapper.find('.Icon-button')[2]
  button.trigger('click')

  expect(wrapper.find(Recipe)).toHaveLength(0)
})
