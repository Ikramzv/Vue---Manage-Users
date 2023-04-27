import { defineStore } from "pinia";

const useModalStore = defineStore("modal", {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    setOpen() {
      this.isModalOpen = true;
    },
    setClose() {
      this.isModalOpen = false;
    },
  },
});

export default useModalStore;
