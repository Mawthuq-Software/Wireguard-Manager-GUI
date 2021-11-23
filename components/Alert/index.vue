<template>
	<div> <div :class="classes"> <svg v-if="variant === 'success'"
	:class="imgClass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
	fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
	stroke-linejoin="round" class="feather feather-check-circle"><path d="M22
	11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9
	11.01"></polyline></svg> <svg v-if="variant === 'warning'" :class="imgClass"
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
	stroke="currentColor" stroke-width="2" stroke-linecap="round"
	stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29
	3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42
	0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17"
	x2="12.01" y2="17"></line></svg> <svg v-if="variant === 'danger'"
	:class="imgClass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
	fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
	stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12"
	cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line
	x1="9" y1="9" x2="15" y2="15"></line></svg> <p :class="txtClass">{{
		label
	}}</p> </div> </div>
</template>
<script>
export default {
	name: "Alert",
	props: {
		label: {
			type: String,
			default: "Alert",
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
        classes () {
            return {
                "p-4": true,
				["bg-" + this.variant + "-translucent"]: true,
				rounded: true,
				["text-" + this.variant]: true,
				["border-" + this.variant]: true,
				"font-semibold": true,
				border: true,
				flex: true,
            }
        },
		txtClass () {
			return {
				"pl-4": true,
			}
		},
		imgClass () {
			return {
				"h-6": true,
				"w-6": true,
			}
		}
    }
};
</script>
