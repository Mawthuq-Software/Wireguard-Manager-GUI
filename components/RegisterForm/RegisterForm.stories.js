import RegisterForm from './index.vue'

export default {
  title: 'Wireguard-Manager-GUI/Composites/RegisterForm',
  component: RegisterForm,
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<RegisterForm v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {}
