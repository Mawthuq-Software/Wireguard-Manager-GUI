import ValidationText from './index.vue'

export default {
  title: 'Wireguard-Manager-GUI/Atoms/ValidationText',
  component: ValidationText,
}
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<ValidationText v-bind="$props" />',
})

export const Invalid = Template.bind({})
Invalid.args = {
    text: "CONTAINS LOWERCASE LETTER",
    valid: false
}

export const Valid = Template.bind({})
Valid.args = {
    text: "CONTAINS UPPERCASE LETTER",
    valid: true
}
