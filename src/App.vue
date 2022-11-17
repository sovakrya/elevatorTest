<template>
  <div class="main-container">
    <div class="elevator-buttons-container">
      <div class="elevator_container">
        <div
          :class="['elevator', elevatorOnFloor]"
          @transitionend="moveElevator"
        ></div>
      </div>

      <div class="buttons-container">
        <button
          v-for="floor in 5"
          :key="floor"
          :class="[floorCalls[floor] ? 'button-called' : 'button-not-called']"
          :disabled="floorCalls[floor]"
          @click="elevatorCall(floor)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      floorQueue: [],
      floorCalls: {},
      inMove: false,
      elevatorOnFloor: "floor-1",
      floorToMove: null,
    };
  },

  watch: {
    "floorQueue.length"(newValue, oldValue) {
      if (newValue < oldValue) {
        return;
      }
      if (!this.inMove) {
        this.moveElevator();
      }
    },
  },

  methods: {
    elevatorCall(floor) {
      this.floorQueue.push(floor);

      this.floorCalls[floor] = true;
    },

    moveElevator() {
      if (this.floorToMove) {
        this.floorCalls[this.floorToMove] = false;
      }

      if (!this.floorQueue.length) {
        this.inMove = false;
        this.floorToMove = null;
        return;
      }

      this.inMove = true;

      setTimeout(() => {
        const floor = this.floorQueue.shift();

        this.elevatorOnFloor = `floor-${6 - floor}`;

        this.floorToMove = floor;
      }, 1000);
    },
  },
});
</script>

<style>
#app {
  display: grid;
  place-items: center;

  height: 100%;
}

.main-container {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}

.elevator-buttons-container {
  display: flex;
  gap: 22px;
  justify-content: space-between;
}

.elevator_container {
  height: 800px;
  width: 300px;
  border: solid 2px;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  padding: 16px;
  gap: 16px;
  position: relative;
}

.elevator {
  background-color: brown;
  transition-property: all;
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
  grid-row: 5;
}

.buttons-container {
  display: grid;
  gap: 22px;
  padding: 22px;
  place-items: center;
  height: 800px;
  width: 300px;
}

.buttons-container > button {
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

.floor-1 {
  translate: 0 calc((-100% - 16px) * 0);
}
.floor-2 {
  translate: 0 calc((-100% - 16px) * 1);
}
.floor-3 {
  translate: 0 calc((-100% - 16px) * 2);
}
.floor-4 {
  translate: 0 calc((-100% - 16px) * 3);
}
.floor-5 {
  translate: 0 calc((-100% - 16px) * 4);
}

.button-called {
  background-color: rgb(73, 148, 12);
}

.button-not-called {
  background-color: brown;
}
</style>
