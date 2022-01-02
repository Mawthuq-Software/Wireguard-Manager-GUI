export default {
  title: 'Wireguard-Manager-GUI/Atoms/Table',
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<Table v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  headers: {
    first: {
      text: 'Key Name',
    },
    second: {
      text: 'KeyID',
    },
    third: {
      text: 'ServerID',
    },
    fourth: {
      text: 'Date created',
    },
    five: {
      text: 'Edit',
    },
  },
  rows: {
    1: {
      first: {
        text: 'Joes iPhone',
      },
      second: {
        text: '1',
      },
      third: {
        text: 'EU1',
      },
      fourth: {
        text: '01/02/2021',
      },
    },
    2: {
      first: {
        text: 'Sams Laptop',
      },
      second: {
        text: '2',
      },
      third: {
        text: 'US1',
      },
      fourth: {
        text: '09/02/2021',
      },
    },
    3: {
      first: {
        text: 'Work VPN',
      },
      second: {
        text: '3',
      },
      third: {
        text: 'GB12',
      },
      fourth: {
        text: '12/12/2021',
      },
    },
  },
  button: {
    exists: true,
    label: 'Modify',
  },
}
