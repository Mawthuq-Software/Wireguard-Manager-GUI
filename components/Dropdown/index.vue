<template>
  <div>
    <div>
      <label for="select" class="font-semibold block py-2 text-white">{{
        label
      }}</label>
      <div class="relative">
        <div
          class="
            h-10
            bg-background-light
            flex
            rounded
            items-center
            cursor-pointer
          "
          @click="toggleDropdown"
        >
          <p class="px-4 appearance-none outline-none text-white w-full">
            {{ selectedItem }}
          </p>
          <button
            class="
              cursor-pointer
              outline-none
              focus:outline-none
              transition-all
              text-gray-300
              hover:text-gray-600
            "
            @click="clearClick"
          >
            <svg
              class="w-4 h-4 mx-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <label
            class="
              cursor-pointer
              outline-none
              focus:outline-none
              border-l border-gray-200
              transition-all
              text-gray-300
              hover:text-gray-600
            "
          >
            <svg
              class="w-4 h-4 mx-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </label>
        </div>
        <div :class="dropdownClass">
          <div
            v-for="item in items"
            :key="item"
            class="cursor-pointer group"
            @click="selected(item)"
          >
            <a :class="itemsClass">{{ item }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dropdown',
  props: {
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      selectedItem: '',
      dropdownHidden: true,
    }
  },
  computed: {
    dropdownClass() {
      return {
        absolute: true,
        rounded: true,
        shadow: true,
        'bg-background-light': true,
        'overflow-hidden': true,
        hidden: this.dropdownHidden,
        'text-white': true,
        'peer-checked:flex': true,
        'flex-col': true,
        'w-full': true,
      }
    },
    itemsClass() {
      return {
        block: true,
        'p-2': true,
        'border-transparent': true,
        'border-l-4': true,
        'group-hover:border-primary': true,
        'group-hover:bg-background': true,
      }
    },
  },
  methods: {
    clearClick() {
      this.selectedItem = ''
      this.$emit('item-selected', this.selectedItem)
    },
    toggleDropdown() {
      this.dropdownHidden = !this.dropdownHidden
    },
    selected(item) {
      this.selectedItem = item
      this.dropdownHidden = true
      this.$emit('item-selected', this.selectedItem)
    },
  },
}
</script>
