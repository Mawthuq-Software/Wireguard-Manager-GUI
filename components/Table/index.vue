<template>
    <div>
        <table class="w-full border-collapse">
            <tbody>
                <tr :class="headerClasses">
                    <th v-for="header in headers" :key="header">
                        <td :class="valueClass">
                            {{header}}
                        </td>
                    </th>
                </tr>
                <tr v-for="row in rows" :key="row[0]" :class="rowClasses">
                    <td v-for="value in row" :key="value[0]" :class="valueClass">
                        {{value}}
                    </td>
                    <div v-if="button.exists" :class="valueClass">
                        <Button :label="button.label" @btn-click="modifyKey(row)"/>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Button from "../Button"

export default {
    name: "Table",
    components: {
        Button
    },
    props: { 
        headers: {
            type: Array,
            default() { 
                return [] 
            }
        },
        rows: {
            type: Array,
            default() { 
                return [] 
            }
        },
        button: {
            type: Object,
            default() {
                return{ 
                    "exists": false,
                }
            }
        }
    },
    computed: {
        valueClass() {
            return {
                'py-4': true,
                'px-2': true,
                'text-white': true,
            }
        },
        headerClasses() {
            return {
                'bg-background-light': true,
            }
        },
        rowClasses() {
            return {
                'odd:bg-background-light': true,
                'even:bg-background-ultralight': true,
                'last:rounded': true,
            }
        },
    },
    methods: {
        modifyKey(row) {
           this.$emit('btn-click', row)
        } 
    },
}
</script>