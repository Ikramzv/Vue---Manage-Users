<script setup>
import { storeToRefs } from "pinia";
import { reactive, ref, watchEffect } from "vue";
import useUsersStore from "../store/data";
import useModalStore from "../store/modal";

const inputs = reactive({
  surname: "",
  name: "",
  id: 0,
});

const store = useUsersStore();
const { data: users } = storeToRefs(store);
const { add } = store;

const modalStore = useModalStore();
const { isModalOpen } = storeToRefs(modalStore);
const { setClose } = modalStore;

const first_input = ref();

const isExisting = () =>
  users.value.some(
    (user) => user.id === parseFloat(inputs.id) || user.name === inputs.name
  );

const isEmpty = () => Object.values(inputs).some((v) => v === "");

function submit(e) {
  if (isEmpty()) return alert("Not leave empty");
  if (isExisting()) return alert("Name or Id already exists");

  const user = { ...inputs };
  add(user); // add user to the state
  animate(e.target);

  reset();

  first_input.value.focus();
}

function animate(el) {
  el.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    1000
  );
}

function reset() {
  inputs.id = 0;
  inputs.surname = "";
  inputs.name = "";
}

function check(e) {
  if (e.target.value.length === 0) e.target.value = 0;

  if (e.target.value.length > 1 && e.target.value.startsWith(0))
    e.target.value = e.target.value[1];

  if (e.target.value > 999) e.target.value = 999;

  inputs.id = e.target.value;
}

watchEffect((cleanUp) => {
  if (!isModalOpen.value) return;

  window.addEventListener("click", onWindowClick);

  function onWindowClick(e) {
    if (e.target.matches(".modal-inner , .modal-inner *")) return;

    setClose(); // Close the Modal
  }

  cleanUp(() => {
    window.removeEventListener("click", onWindowClick);
  });
});
</script>

<template>
  <div class="modal" :class="isModalOpen ? 'open' : ''">
    <div class="modal-inner">
      <h3>User Form</h3>
      <hr />
      <form @submit.prevent="submit">
        <label for="name">Name</label>
        <input
          ref="first_input"
          autocomplete="off"
          id="name"
          v-model="inputs.name"
        />
        <label for="surname">Surname</label>
        <input autocomplete="off" id="surname" v-model="inputs.surname" />
        <label for="ID">ID</label>
        <input
          type="number"
          min="0"
          max="999"
          :value="inputs.id"
          @input="check"
          autocomplete="off"
          id="ID"
        />

        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  opacity: 0;
  backdrop-filter: blur(12px);
  display: grid;
  place-items: center;
  transition: 500ms ease;
  z-index: -1;
}

.modal.open {
  opacity: 1;
  z-index: 9999;
}

.modal-inner {
  position: relative;
  width: 300px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 8px 0 black;
  overflow: hidden;
  clip-path: circle(0% at 0% 0%);
  transition: 500ms ease;
}
.modal.open .modal-inner {
  transition-delay: 500ms;
  clip-path: circle(150% at 0% 0%);
}

.modal-inner::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.089);
  z-index: -1;
  clip-path: circle(0% at 0% 0%);
  transition: 400ms ease;
}

.modal.open .modal-inner::after {
  transition-delay: 750ms;
  clip-path: circle(100% at 0% 0%);
}

.modal-inner h3 {
  font-size: 18px;
  color: black;
  text-align: center;
}

.modal-inner hr {
  margin-block: 12px;
  background-color: gray;
  height: 1px;
  width: 80%;
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  width: 50%;
  border-radius: 12px;
  transition: 200ms ease;
  padding: 4px 8px;
  font-weight: bold;
  transition: 300ms ease;
  cursor: pointer;
}

label:has(+ input:focus) {
  background-color: black;
  color: white;
}

input {
  margin-block: 6px 12px;
  width: 80%;
  border-radius: 12px;
  padding: 8px 12px;
  color: black;
  background-color: white;
  border: 1px solid black;
  outline: none;
  transition: 200ms ease;
}

input:focus {
  background-color: rgba(0, 0, 0, 0.055);
}

input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
}

button {
  --size: 45px;
  border-radius: 12px;
  padding: 8px 12px;
  width: calc(var(--size) * 2);
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
</style>
