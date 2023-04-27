<script setup lang="ts">
import useModalStore from "../store/modal";
const { setOpen } = useModalStore();
</script>

<template>
  <button @click.stop="setOpen()">
    <slot name="button">+</slot>
  </button>
</template>

<style scoped>
button {
  --size: 70px;
  border-radius: 50%;
  padding: 12px;
  width: var(--size);
  height: var(--size);
  border: 2px solid black;
  color: black;
  font-size: 14px;
  transition: 200ms ease;
  background-color: white;
  cursor: pointer;
  margin: 12px;
  margin-left: auto;
  display: block;
}

button:hover {
  background-color: black;
  color: white;
}

button:active {
  scale: 0.9;
}
</style>
