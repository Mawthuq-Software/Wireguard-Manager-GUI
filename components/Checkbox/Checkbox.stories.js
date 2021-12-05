export default {
  title: 'Wireguard-Manager-GUI/Atoms/Checkbox',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<Checkbox v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  boxBool: true,
}

export const Secondary = Template.bind({})
Secondary.args = {
  boxBool: false,
}

export const Labelled = Template.bind({})
Labelled.args = {
  boxBool: false,
  label: 'Remember Me',
}
