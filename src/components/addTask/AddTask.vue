<script setup>
import "./style.scss";
import { ref } from "vue";
const task = ref("");
const emit = defineEmits(["actionCaptured"]);

const currentDate = () => {
  const current = new Date();
  const date = `${current.getDate()}.${
    current.getMonth() + 1
  }.${current.getFullYear()}`;
  return date;
};

const handleClick = (action) => {
  if (action == "add") {
    emit("actionCaptured", task.value.trim(), currentDate());
  } else {
    emit("actionCaptured");
  }
};
</script>

<template>
  <div class="add-task__container">
    <div class="add-task__form">
      <div class="form__header">
        <div class="form__title__h3">Создать новую задачу</div>
        <img
          src="@/assets/close.png"
          class="close_icon"
          alt=""
          @click="() => handleClick('close')"
        />
      </div>
      <fieldset class="fieldset">
        <label for="desc" class="form__label">Описание</label>
        <input
          type="text"
          class="form__input"
          placeholder="Введите описание"
          v-model="task"
          maxlength="100"
        />
      </fieldset>
      <button
        class="add-task__button"
        type="button"
        @click="() => handleClick('add')"
      >
        создать
      </button>
    </div>
  </div>
</template>
