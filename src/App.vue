<template>
  <div class="main-container">
    <div class="elevator-buttons-container">
      <div class="elevator_container">
        <div
          :class="['elevator', elevatorOnFloor]"
          @transitionend="moveElevator"
        >
          <div class="buttons-in-elevator-container">
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>

      <div class="buttons-container">
        <button
          v-for="floor in floors"
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

const watingTimer = 3_000;

export default defineComponent({
  data() {
    return {
      floorQueue: [],
      floorCalls: {},
      inMove: false,
      floorToMove: null,
      elevatorPosition: 1,
      direction: null,
      floors: Array.from({ length: 5 }, (_, index) => 5 - index),
    };
  },

  computed: {
    elevatorOnFloor() {
      return `floor-${this.elevatorPosition}`;
    },
  },

  watch: {
    "floorQueue.length"(newValue, oldValue) {
      if (newValue < oldValue) {
        return;
      }
      if (!this.inMove) {
        this.startElevator();
      }
    },
  },

  methods: {
    elevatorCall(floor) {
      this.floorQueue.push(floor);

      this.floorCalls[floor] = true;
    },

    startElevator() {
      if (this.floorToMove) {
        this.floorCalls[this.floorToMove] = false;
      }

      if (!this.floorQueue.length) {
        this.inMove = false;
        this.floorToMove = null;
        return;
      }

      this.inMove = true;

      const floor = this.floorQueue.shift();

      this.floorToMove = floor;

      setTimeout(this.moveElevator, watingTimer);
    },

    moveElevator() {
      if (this.floorToMove > this.elevatorPosition) {
        this.direction = "up";
      } else if (this.floorToMove < this.elevatorPosition) {
        this.direction = "down";
      } else {
        this.direction = null;

        return this.startElevator();
      }

      if (this.floorCalls[this.elevatorPosition]) {
        this.floorCalls[this.elevatorPosition] = false;

        this.floorQueue.splice(
          this.floorQueue.indexOf(this.elevatorPosition),
          1
        );

        return setTimeout(this.moveElevator, watingTimer);
      }

      if (this.direction === "up") {
        this.elevatorPosition += 1;
      } else {
        this.elevatorPosition -= 1;
      }
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
  transition-timing-function: linear;
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

.buttons-in-elevator-container {
  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: right;
}

.buttons-in-elevator-container > button {
  border-radius: 50%;
  height: 17px;
  width: 17px;
}
</style>
