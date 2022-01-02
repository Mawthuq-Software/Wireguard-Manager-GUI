export default {
  title: 'Wireguard-Manager-GUI/Composites/StatisticCard',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<StatisticCard v-bind="$props" />',
})

export const Keys = Template.bind({})
Keys.args = {
  statName: 'Number of keys',
  statCount: '100',
}

export const Servers = Template.bind({})
Servers.args = {
  statName: 'Number of servers',
  statCount: '5',
}
