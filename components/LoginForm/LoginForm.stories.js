import LoginForm from './index.vue'

export default {
  title: 'Wireguard-Manager-GUI/Composites/LoginForm',
  component: LoginForm,
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<LoginForm v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {}
