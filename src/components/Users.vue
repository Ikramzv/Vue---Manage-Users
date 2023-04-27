<script>
import { mapActions, mapState } from "pinia";
import useUsersStore from "../store/data";
import User from "./User.vue";

export default {
  computed: {
    ...mapState(useUsersStore, {
      users: "data",
    }),
  },
  methods: {
    deleteUser(id, e) {
      e.currentTarget.classList.add("deleted");
      setTimeout(this.remove, 800, id);
    },
    ...mapActions(useUsersStore, ["remove"]),
  },
  components: {
    User,
  },
};
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

ul li {
  padding: 12px 8px;
  border-radius: 12px;
  background-color: white;
  border: 2px solid black;
  transition: 200ms ease;
  cursor: pointer;
  margin-bottom: 12px;
}

ul li:active {
  scale: 0.9;
}

ul li:is(:hover) {
  background-color: black;
  color: white;
}

ul li.deleted {
  animation: deleted 800ms ease forwards;
}

@keyframes deleted {
  50% {
    transform: translateX(120%);
  }

  100% {
    transform: translateX(120%);
    height: 0px;
    padding: 0px;
    margin: 0px;
    border: none;
  }
}
</style>
