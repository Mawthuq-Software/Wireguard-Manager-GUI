export default {
  title: 'Wireguard-Manager-GUI/Composites/KeysSection',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<KeysSection v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  headers: ['Key Name', 'KeyID', 'ServerID', 'Date created', 'Edit'],
  rows: [
    ['Joes iPhone', 'EU1', '10.0.0.2', 'true'],
    ['Sams Laptop', 'US1', '10.0.1.2', 'false'],
    ['Work VPN', 'GB12', '10.0.0.3', 'true'],
  ],
  button: {
    exists: true,
    label: 'Modify',
  },
}
