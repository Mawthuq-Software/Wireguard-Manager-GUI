export default {
	title: 'Wireguard-Manager-GUI/Atoms/Button',
};
  
  // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
	label: "Primary",
	variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: "Secondary",
	variant: "secondary",
};

export const Warning = Template.bind({});
Warning.args = {
	label: "Warning",
	variant: "warning",
};
