<template>
    <div>
        <table class="w-full border-collapse">
            <tbody>
                <tr :class="headerClasses">
                    <th v-for="header in headers" :key="header">
                        <td  :class="valueClass">
                            {{header.text}}
                        </td>
                    </th>
                </tr>
                <tr v-for="row in rows" :key="row" :class="rowClasses">
                    <td v-for="value in row" :key="value" :class="valueClass">
                        {{value.text}}
                    </td>
                    <div v-if="button.exists" :class="valueClass">
                        <Button :label="button.label"/>
                    </div>
                </tr>
            </tbody>
            <!-- <Row v-for="row in rows" :key="row" :values="row" :class="colorClass"/> -->
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
            type: Object,
            default() { 
                return {} 
            }
        },
        rows: {
            type: Object,
            default() { 
                return {} 
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
    }
}
</script>