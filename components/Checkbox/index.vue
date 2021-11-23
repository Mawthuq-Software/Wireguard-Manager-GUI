<template>
	<div>
		<input type="checkbox" :checked="boxBool" @change="checkData" />
	</div>
</template>
<script>
export default {
	name: "Checkbox",
	props: {
		boxBool: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			boxCheck: this.boxBool,
		};
	},
	methods: {
		checkData() {
			this.boxCheck = !this.boxCheck;
			this.$emit("checkChange", this.boxCheck);
		},
	},
};
</script>
<style scoped>
input {
	height: 15px;
	width: 15px;
	border-radius: 2.5px;
}
</style>
