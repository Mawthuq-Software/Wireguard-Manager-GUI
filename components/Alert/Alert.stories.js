export default {
	title: 'Wireguard-Manager-GUI/Atoms/Alert',
};
  
  // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: '<Alert v-bind="$props" />',
	argTypes: {
		variant: {
			options: ["success", "warning", "danger"],
			control: { type: "select" },
		},
	},
});

export const Success = Template.bind({});
Success.args = {
	label: "You have successfully deleted the selected keys",
	variant: "success",
};

export const Warning = Template.bind({});
Warning.args = {
	label: "Be careful! Your keys are still in use",
	variant: "warning",
};
export const Danger = Template.bind({});
Danger.args = {
	label: "You cannot delete the selected keys",
	variant: "danger",
};
