<template>
    <div class="w-full h-screen bg-white flex items-center justify-center">
        <div class="w-4as/12">
            <LoginForm />
        </div>
    </div>
</template>
<script>
import LoginForm from "../LoginForm"

export default {
    name: "LoginPage",
    components: {
        LoginForm
    },
    props: {},
    computed: {

    }
}
</script>