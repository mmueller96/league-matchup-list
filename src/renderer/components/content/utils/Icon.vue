<template>
	<i :class="className"></i>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "icon",
	props: ["icon"],
	data() {
		return { className: "" };
	},
	mounted() {
		this.getIconClasses();
	},
	methods: {
		getIconClasses(): void {
			switch (this.icon) {
				case "settings":
					this.className = "fas fa-cog";
					return;

				case "plus":
					this.className = "fas fa-plus";
					return;

				case "room":
					this.className = "fas fa-person-booth";
					return;

				case "users":
					this.className = "fas fa-users";
					return;

				case "join":
					this.className = "fas fa-sign-in-alt";
					return;

				case "addUser":
					this.className = "fas fa-user-plus";
					return;

				case "threeDots":
					this.className = "fas fa-ellipsis-h";
					return;

				case "circle":
					this.className = "fas fa-circle";
					return;

				default:
					return;
			}
		}
	}
});
</script>