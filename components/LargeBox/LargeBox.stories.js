export default {
  title: 'Wireguard-Manager-GUI/Atoms/LargeBox',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<LargeBox v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {}
