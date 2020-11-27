import Dialog from 'buefy/dist/components/dialog';
import Toast from 'buefy/dist/components/toast';
import Autocomplete from 'buefy/dist/components/autocomplete';
import Select from 'buefy/dist/components/select';
import Dropdown from 'buefy/dist/components/dropdown';
import Vue from "vue";
import VueDragDrop from 'vue-drag-drop';
import VModal from 'vue-js-modal';
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(VueDragDrop);

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	render(createElement: any) {
		return createElement(App);
	}
} as any).$mount("#app");


