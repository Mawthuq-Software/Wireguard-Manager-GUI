import KeyDownload from './index.vue'

export default {
  title: 'Wireguard-Manager-GUI/Composites/KeyDownload',
  component: KeyDownload,
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<KeyDownload v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  configProps: {
    privKey: "QPvKbddDQTLPZzZTuurjsnwZ6ZOQbapxdYtu/wWryXs=",
    preKey: "X//0umoe2VM0S6lfg2xfui1iyabyE/DAQaa4GAK93KU=",
    allowedIPs: "0.0.0.0/0, ::/0",
    dns: "1.1.1.1",
    ipAddress: "135.135.135.22",
    ipv4: "10.6.0.1",
    ipv6: "fe44:0202:0202::0",
    listenPort: "51820",
    serverPub: "lI1RxzM45ICbqd38+y/1KDL+wTCjfPkzZQxj+nfneFM="
  }
}
