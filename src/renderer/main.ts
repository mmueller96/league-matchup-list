import Dropdown from 'buefy/dist/components/dropdown';
import Field from 'buefy/dist/components/field';
import Input from 'buefy/dist/components/input';
import Loading from "buefy/dist/components/loading";
import SnackBar from 'buefy/dist/components/snackbar';
import Tabs from 'buefy/dist/components/tabs';
import Tag from "buefy/dist/components/tag";
import Taginput from 'buefy/dist/components/taginput';
import Toast from 'buefy/dist/components/toast';
import Autocomplete from 'buefy/dist/components/autocomplete';
import Vue from "vue";
import VueDragDrop from 'vue-drag-drop';
import VModal from 'vue-js-modal';
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

Vue.use(Tag);
Vue.use(VModal);
Vue.use(Dropdown);
Vue.use(Taginput);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Input);
Vue.use(SnackBar);
Vue.use(Loading);
Vue.use(VueDragDrop);
Vue.use(Tabs);
Vue.use(Autocomplete);

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	render(createElement: any) {
		return createElement(App);
	}
} as any).$mount("#app");


