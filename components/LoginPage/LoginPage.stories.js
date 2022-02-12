import LoginPage from './index.vue'

export default {
  title: 'Wireguard-Manager-GUI/Composites/LoginPage',
  component: LoginPage,
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<LoginPage v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {}
