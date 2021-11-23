<template>
	<div class="wg-input flex flex-col">
		<label class="pb-2 leading-none">{{ label }}</label>
		<input
			:placeholder="placeholder"
			:class="classes"
			:type="type"
			@change="inputData"
		/>
	</div>
</template>

<script>
export default {
	name: "Input",

	props: {
		label: {
			type: String,
			default: "Label",
		},
		placeholder: {
			type: String,
			default: "Placeholder",
		},
		type: {
			type: String,
			validator: (value) => ["text", "password"].includes(value),
			default: "password",
		},
	},
	computed: {
        classes () {
            return {
                "flex-1": true,
				"border-gray-300": true,
				rounded: true,
				"py-2": true,
				"px-4": true,
				border: true,
				"focus:border-blue-500": true,
				"focus:outline-none": true,
            }
        }
    },
	methods: {
		inputData(evt) {
			this.$emit("dataChange", evt);
		},
	},
};
</script>
