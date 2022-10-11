import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCirclePlus,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faCircle } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCirclePlus, faCircleCheck, faCircle, faChevronDown, faChevronUp);

import "./assets/main.css";

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
