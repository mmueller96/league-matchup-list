<template>
	<div class="settings">
		<headline name="Setting" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Headline from "@/components/Headline.vue";

export default Vue.extend({
	name: "settings",
	components: { Headline },
	data() {
		return {};
	},
	async mounted() {},
	methods: {}
});
</script>

<style lang="scss">
	.settings {
		width: 100%;
	}
</style>
