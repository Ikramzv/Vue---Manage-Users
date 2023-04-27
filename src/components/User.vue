<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps(["user"]);
defineEmits(["delete-user"]);
</script>

<template>
  <li @dblclick="$emit('delete-user', user.id, $event)">
    <b>{{ user.id }} : </b>
    <span>{{ user.name }} </span>
    <b> | </b>
    <span>{{ user.surname }}</span>
  </li>
</template>

<style scoped>
li {
  padding: 12px 8px;
  border-radius: 12px;
  background-color: white;
  border: 2px solid black;
  transition: 200ms ease;
  cursor: pointer;
  margin-bottom: 12px;
  overflow: hidden;
  transform-origin: top left;
}

li:active {
  scale: 0.9;
}

li:is(:hover) {
  background-color: black;
  color: white;
}

li.deleted {
  animation: deleted 1s ease forwards;
}

@keyframes deleted {
  50% {
    transform: translate(120%);
  }

  100% {
    transform: translate(120%);
    font-size: 0px;
    margin: 0px;
    padding: 0px;
    border: none;
  }
}
</style>
