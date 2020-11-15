import { Snackbar } from './renderer/types/snackbar';

declare module "vue/types/vue" {
	interface Vue {
		$snackbar: Snackbar;
	}
}

