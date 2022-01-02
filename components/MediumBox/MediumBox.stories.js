export default {
  title: 'Wireguard-Manager-GUI/Atoms/MediumBox',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<MediumBox v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {}
