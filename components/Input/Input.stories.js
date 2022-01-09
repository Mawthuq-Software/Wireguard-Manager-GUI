export default {
  title: 'Wireguard-Manager-GUI/Atoms/Input',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<Input v-bind="$props" />',
})

export const EmailAddress = Template.bind({})
EmailAddress.args = {
  label: 'Email Address',
  placeholder: 'john.doe@mawthuq.com',
  type: 'text',
}

export const Password = Template.bind({})
Password.args = {
  label: 'Password',
  placeholder: '***********',
  type: 'password',
}

export const Success = Template.bind({})
Success.args = {
  label: 'Password',
  placeholder: '***********',
  type: 'password',
  success: true,
}

export const Error = Template.bind({})
Error.args = {
  label: 'Password',
  placeholder: '***********',
  type: 'password',
  error: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'text',
  placeholder: 'iasdiuwadsugdwads',
  type: 'password',
  error: false,
  disabled: true,
}