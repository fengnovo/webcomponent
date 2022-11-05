<template>
  <div>
    <div class="vueFont">Hello vote vue</div>
    <wired-input ref="aInput" placeholder="Enter name"></wired-input>
    <wired-button @click="handleClick">Click Me</wired-button>
  </div>
</template>

<script>
import { WiredButton, WiredInput } from "wired-elements";
export default {
  methods: {
    handleClick() {
      alert(this.$refs.aInput.value);
    },
  },
};
</script>

<style scoped>
.vueFont {
  color: blue;
}
</style>