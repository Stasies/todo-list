<script setup>
import "./style.scss";

const props = defineProps({
  task: {
    value: String,
    state: String,
    date: String,
  },
  index: Number,
});

const emit = defineEmits(["actionCaptured"]);

const handleClick = () => {
  emit("actionCaptured", props.index, props.task.state);
};
</script>

<template>
  <td class="task_left_icon">
    <font-awesome-icon
      v-if="task.state === 'В работе'"
      class="check_icon"
      @click="handleClick"
      icon="fa-regular fa-circle"
    />
    <font-awesome-icon
      v-else
      class="check_icon finished"
      icon="fa-regular fa-circle-check"
      @click="handleClick"
    />
  </td>
  <td class="task_left_text">{{ props.task.value }}</td>

  <td
    :class="{
      'in-progress': props.task.state === 'В работе',
      finished: props.task.state === 'Выполнено',
    }"
  >
    {{ props.task.state }}
  </td>
  <td class="task_right_date">{{ props.task.date }}</td>
</template>
