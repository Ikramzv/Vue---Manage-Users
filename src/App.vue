<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Modal = defineAsyncComponent(() => import("./components/Modal.vue"));
const Users = defineAsyncComponent(() => import("./components/Users.vue"));
const AddUser = defineAsyncComponent(() => import("./components/AddUser.vue"));
</script>

<template>
  <AddUser>
    <template #button> Add + </template>
  </AddUser>
  <Users />
  <Modal />
</template>
