import { defineStore } from "pinia";

const useUsersStore = defineStore("users", {
  state: () => ({
    data: [
      {
        name: "Ikram",
        surname: "Zulfugar",
        id: 1,
      },
      {
        name: "Ali",
        surname: "Aliyev",
        id: 2,
      },
      {
        name: "Sabir",
        surname: "Aghayev",
        id: 3,
      },
      {
        name: "Nicat",
        surname: "Tahirli",
        id: 4,
      },
    ],
  }),
  actions: {
    add(user) {
      this.$state.data = [...this.$state.data, user];
    },
    remove(id) {
      this.$state.data = this.$state.data.filter((user) => user.id !== id);
    },
  },
});

export default useUsersStore;
