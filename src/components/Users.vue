<script lang="ts">
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import type { User as UserType } from "../store/data";
import useUsersStore from "../store/data";
import User from "./User.vue";

export default defineComponent({
  computed: {
    ...mapState(useUsersStore, {
      users: "data",
    }),
  },
  methods: {
    deleteUser(id: UserType["id"], e: Event) {
      const target = e.currentTarget as HTMLLIElement;
      target.classList.add("deleted");
      setTimeout(this.remove, 1100, id);
    },
    ...mapActions(useUsersStore, ["remove"]),
  },
  components: {
    User,
  },
});
</script>

<template>
  <ul ref="ul">
    <User
      v-for="user of users"
      :user="user"
      :key="user.id"
      @delete-user="deleteUser"
    />
  </ul>
</template>

<style scoped>
ul::-webkit-scrollbar {
  display: none;
}

ul {
  margin: 50px;
  width: 200px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 3px solid black;
  border-radius: 12px 50px 12px 12px;
  display: flex;
  flex-direction: column;
  padding: 16px 12px 4px;
  background-color: white;
  list-style-type: none;
}
</style>
