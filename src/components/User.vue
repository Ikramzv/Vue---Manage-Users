<script setup>
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
