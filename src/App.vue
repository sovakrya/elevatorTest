<template>
  <div class="main-box">
    <div class="links-lvls">
      <router-link
        v-for="link of links"
        :key="link.to.name"
        class="links-style"
        :to="link.to"
      >
        {{ link.name }}
      </router-link>
    </div>

    <routerView class="another-element"></routerView>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      links: [
        {
          to: { name: "Easy" },
          name: "легкий уровень",
        },

        {
          to: { name: "Average" },
          name: "средний уровень",
        },

        {
          to: { name: "Hard" },
          name: "сложный уровень",
        },
      ],
    };
  },
});
</script>

<style>
#app {
  display: grid;

  height: 100%;
}
.main-box {
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: 0;
}

.links-lvls {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.links-style {
  border: solid;
  padding: 4px;
}

.router-link-active {
  background-color: hsla(0, 0%, 83%, 1);
  border: solid rgb(116, 116, 116);
  color: rgb(116, 116, 116);
}

.another-element {
  flex-grow: 1;
  min-height: 0;
}

.router-link-active:hover {
  background-color: hsla(0, 0%, 95%, 1);
}
</style>
