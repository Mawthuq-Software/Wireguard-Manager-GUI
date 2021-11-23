import LoginForm from "./index.vue";

export default {
	title: "Wireguard-Manager-GUI/Composites/LoginForm",
	component: LoginForm,
};
const Template = (args) => ({
	// Components used in your story `template` are defined in the `components` object
	components: { LoginForm },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<LoginForm v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};
