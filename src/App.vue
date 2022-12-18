<template>
  <div class="main-container">
    <div class="elevator-font">
      направление:
      {{ direction === "up" ? "↑" : direction === "down" ? "↓" : "-" }}
    </div>
    <div class="elevator-font">этаж: {{ elevatorPositionExact }}</div>

    <div class="elevator-buttons-container">
      <div class="elevator_container">
        <div
          :class="['elevator', elevatorOnFloor]"
          @transitionend="moveElevator"
        >
          <div class="buttons-in-elevator-container">
            <button
              v-for="elevatorFloor in 5"
              :key="elevatorFloor"
              :class="[
                floorCallsInsideElevator[elevatorFloor]
                  ? 'button-called'
                  : 'button-not-called',
              ]"
              @click="insideElevatorCall(elevatorFloor)"
            >
              {{ elevatorFloor }}
            </button>
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
      floorCalls: {},
      floorCallsInsideElevator: {},
      minFloor: null,
      maxFloor: null,
      inMove: false,
      floorToMove: null,
      elevatorPosition: 1,
      direction: null,
      floors: Array.from({ length: 5 }, (_, index) => 5 - index),
      elevatorPositionExact: 1,
    };
  },

  computed: {
    elevatorOnFloor() {
      return `floor-${this.elevatorPosition}`;
    },
  },

  watch: {
    minFloor(floor) {
      if (this.minFloor === null || this.inMove) {
        return;
      }
      this.startElevator(floor);
    },

    maxFloor(floor) {
      if (this.maxFloor === null || this.inMove) {
        return;
      }
      this.startElevator(floor);
    },
  },

  methods: {
    elevatorCall(floor) {
      this.floorCalls[floor] = true;

      this.handleElevatorCall(floor);
    },

    insideElevatorCall(floor) {
      this.floorCallsInsideElevator[floor] = true;

      this.handleElevatorCall(floor);
    },

    handleElevatorCall(floor) {
      if (this.elevatorPosition > floor) {
        if (this.minFloor === null || floor < this.minFloor) {
          this.minFloor = floor;

          return;
        }
      }

      if (this.elevatorPosition < floor) {
        if (this.maxFloor === null || floor > this.maxFloor) {
          this.maxFloor = floor;

          return;
        }
      }
    },

    startElevator(floor) {
      if (this.floorToMove) {
        this.floorCalls[this.floorToMove] = false;
      }

      if (!this.minFloor && !this.maxFloor) {
        this.inMove = false;
        this.floorToMove = null;
        return;
      }

      this.inMove = true;

      this.floorToMove = floor;

      setTimeout(this.moveElevator, watingTimer);
    },

    moveElevator() {
      if (this.elevatorPosition !== this.elevatorPositionExact) {
        this.elevatorPositionExact = this.elevatorPosition;
      }

      if (this.floorToMove > this.elevatorPosition) {
        this.direction = "up";
      } else if (this.floorToMove < this.elevatorPosition) {
        this.direction = "down";
      } else {
        if (this.direction === "up") {
          let newFloorToMove = this.maxFloor;
          this.direction = null;

          if (this.floorToMove === this.maxFloor) {
            this.maxFloor = null;

            newFloorToMove = this.minFloor;
          }

          return this.startElevator(newFloorToMove);
        } else {
          let newFloorToMove = this.minFloor;
          this.direction = null;

          if (this.floorToMove === this.minFloor) {
            this.minFloor = null;

            newFloorToMove = this.maxFloor;
          }

          return this.startElevator(newFloorToMove);
        }
      }

      if (
        this.floorCalls[this.elevatorPosition] ||
        this.floorCallsInsideElevator[this.elevatorPosition]
      ) {
        this.floorCalls[this.elevatorPosition] = false;
        this.floorCallsInsideElevator[this.elevatorPosition] = false;

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
  background-color: rgb(110, 87, 87);
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
  display: flex;
  min-height: 0;
}
.floor-2 {
  translate: 0 calc((-100% - 16px) * 1);
  display: flex;
  min-height: 0;
}
.floor-3 {
  translate: 0 calc((-100% - 16px) * 2);
  display: flex;
  min-height: 0;
}
.floor-4 {
  translate: 0 calc((-100% - 16px) * 3);
  display: flex;
  min-height: 0;
}
.floor-5 {
  translate: 0 calc((-100% - 16px) * 4);
  display: flex;
  min-height: 0;
}

.button-called {
  background-color: rgb(73, 148, 12);
}

.button-not-called {
  background-color: rgb(119, 6, 6);
}

.buttons-in-elevator-container {
  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: right;
  height: 140px;
  flex-wrap: wrap;
}

.buttons-in-elevator-container > button {
  border-radius: 30%;
  height: 40px;
  width: 40px;
}

.elevator-font {
  font-size: 30px;
}
</style>
