<template>
	<div class="home">
		<headline name="Home"/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Headline from "@/components/content/utils/Headline.vue";

export default Vue.extend({
	name: "home",
	components: { Headline },
	data() {
		return {};
	},
	async mounted() {},
	methods: {}
});
</script>

<style lang="scss">
	.home {
		width: 100%;
	}
</style>
