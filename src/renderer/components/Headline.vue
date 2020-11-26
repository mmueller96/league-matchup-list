<template>
	<div class="pageheader">
		<div v-if="!action">{{ name }}</div>
		<div v-else>
			<div class="flex">
				<div class="pageheadline">{{ name }}</div>
				<button class="actionButton" @click="action">
					<icon :icon="icon"/>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "@/components/Icon.vue";

export default Vue.extend({
	name: "headline",
	components: { Icon },
	props: ["name", "action", "icon"]
});
</script>

<style lang="scss" scoped>
$primaryColor: #f51d45;

.pageheader {
	font-size: 22px;
	padding: 30px;
	border-bottom: 5px solid $primaryColor;

	.flex {
		display: flex;
		max-height: 26px;

		.pageheadline {
			flex-grow: 2;
		}

		.actionButton {
			border: none;
			outline: none;
			cursor: pointer;
			font-size: 32px;
			margin-top: -6px;
		}
	}
}
</style>

