<template>
  <div>Elevator lvl easy</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },

  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style>
.go-home-button {
  display: flex;
}
</style>
