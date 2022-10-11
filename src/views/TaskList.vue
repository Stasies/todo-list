<script setup>
import { ref } from "vue";
import "./style.scss";
import SingleTask from "@/components/singleTask/SingleTask.vue";
import AddTask from "@/components/addTask/AddTask.vue";

const Tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
const filteredList = ref(Tasks.value);
const state = ref("В работе");
const currentTask = ref("");
const createNewTask = ref(false);
const filter = ref("");
const sortValue = ref("Дата");
const openSortMenu = ref(false);

const addTask = (task, date) => {
  createNewTask.value = false;
  if (task) {
    Tasks.value.push({ value: task, state: state.value, date: date });
    Tasks.value.sort((a, b) => (a.date < b.date ? 1 : -1));
    localStorage.setItem("tasks", JSON.stringify(Tasks.value));
    console.log(JSON.parse(localStorage.getItem("tasks")));
    currentTask.value = task;
  }
};

const filterTasks = () => {
  if (filter.value) {
    filteredList.value = [];
    Tasks.value.filter((task) => {
      (task.value.includes(filter.value) ||
        task.state === filter.value ||
        task.date.includes(filter.value)) &&
        filteredList.value.push(task);
    });
  } else {
    filteredList.value = Tasks.value;
  }
};

const openMenu = (e) => {
  e.stopPropagation();
  openSortMenu.value = true;
};

const sortTasks = (value, e) => {
  e.stopPropagation();
  openSortMenu.value = false;
  if (value === "date") {
    filteredList.value.sort((a, b) => (a.date < b.date ? 1 : -1));
    sortValue.value = "Дата";
  } else {
    filteredList.value.sort((a, b) => (a.state > b.state ? 1 : -1));
    sortValue.value = "Статус";
  }
};

const markComplete = (index, state) => {
  console.log(state);
  if (state == "В работе") {
    Tasks.value[index].state = "Выполнено";
  } else {
    Tasks.value[index].state = "В работе";
  }
  localStorage.setItem("tasks", JSON.stringify(Tasks.value));
};
</script>

<template>
  <div class="container">
    <AddTask
      v-if="createNewTask"
      @actionCaptured="addTask"
      :createNewTask="createNewTask"
    />
    <div class="wrapper">
      <div class="top__container">
        <h1 class="title">To do list</h1>
        <img
          class="plus_icon"
          src="@/assets/add.png"
          @click="createNewTask = true"
        />
      </div>
      <div class="search__container">
        <div class="input__container">
          <img src="@/assets/search.png" alt="" class="search_icon" />
          <input
            class="search__input"
            placeholder="Поиск Имени, статуса или даты"
            v-model="filter"
            @change="filterTasks($event)"
          />
        </div>
        <div class="search__filter" @click="openMenu">
          Сортировать по
          <span>
            {{ sortValue }}
            <font-awesome-icon
              v-if="!openSortMenu"
              icon="fa-solid fa-chevron-down"
              class="arrow_icon"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-chevron-up"
              class="arrow_icon"
            />
          </span>
          <div v-if="openSortMenu" class="menu__container">
            <div
              v-if="sortValue === 'Статус'"
              class="menu__item"
              @click="(e) => sortTasks('date', e)"
            >
              Дата
            </div>
            <div
              v-else
              class="menu__item"
              @click="(e) => sortTasks('state', e)"
            >
              Статус
            </div>
          </div>
        </div>
      </div>
      <table class="table">
        <tr class="table__header">
          <th class="td_icons td"></th>
          <th class="td_wide td">Описание</th>
          <th class="td_status td">Статус</th>
          <th class="td_date td">Дата</th>
        </tr>
        <tr
          class="table__row"
          v-for="(task, index) in filteredList"
          v-bind:key="index"
        >
          <SingleTask
            :task="task"
            @actionCaptured="markComplete"
            :index="index"
          />
        </tr>
      </table>
    </div>
  </div>
</template>
