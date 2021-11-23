<template>
	<div>
		<button :class="btnClasses">
			{{ label }}
		</button>
	</div>
</template>
<script>
export default {
	name: "Button",
	props: {
		label: {
			type: String,
			default: "Button"
		},
		variant: {
			type: String,
			validator: (value) =>
				["primary", "secondary", "success", "warning", "danger"].includes(
					value
				),
			default: "primary",
		},
	},
	computed: {
        btnClasses () {
            return {
                ["bg-" + this.variant]: true,
				"text-white": true,
				rounded: true,
				"py-2": true,
				"px-4": true,
				uppercase: true,
				"font-semibold": true,
            }
        }
    }
};
</script>
