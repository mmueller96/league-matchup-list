<template>
	<div id="app">
		<sidebar/>
		<router-view class="routerView"></router-view>
	</div>
</template>

<script lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Vue from "vue";
import { FileUtil } from "./utils/FileUtil";
const { ipcRenderer } = require('electron')

export default Vue.extend({
	name: "app",
	data() {
		return {};
	},
	components: { Sidebar },
	computed: {},
	async beforeCreate() {
		this.$store.dispatch("loadRuneData");
		let champions: string[] = FileUtil.readFileNamesFromDataDirectory();
		this.$store.commit("setMatchupList", champions);
	},
	created() {
	},
	methods: {},
	async updated() {
},
	mounted() {
		ipcRenderer.send("gimme-openedfile");
		ipcRenderer.on('openedfile', (event, args: string) => {
			if (FileUtil.isMatchupFile(args)) {
				//@ts-ignore
				this.$buefy.toast.open({
					message: `You already created a matchup page for <b>${args}</b>!`,
					type: 'is-success',
					duration: 4000,
				});
			}
		})
	}
});
</script>

<style lang="scss">
	$textColor: #828290;
	$inputColor: #201f24;
	$primaryColor: #f51d45;
	$buttonColor: #2a2930;

	$finalWidth: 100vw;
	$finalHeight: 116px;
	$scrollBarHeight: 5px;

	.routerView {
		margin-left: 70px;
	}

	* {
		padding: 0;
		margin: 0;
        font-family: 'Open Sans', sans-serif;
		font-weight: 500;
	}

	body {
		background: #F0F3F6;
	}

	
h2 {
  margin: 0;
  font-size: 2.25rem;
  font-weight: bold;
  letter-spacing: -0.025em;
  color: #fff;
}


h3 {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
}

h5 {
        font-family: 'Open Sans', sans-serif;
                        font-size: 10px;
                        font-weight: 600;
                        letter-spacing: 3px;
                    
	}


	b {font-weight: 600;}

p {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
}

input {
	padding: 8px 15px;
	outline: none;
	border: 1px solid #C6C9CF;
    border-radius: 5px;
	font-size: 12px;
	font-weight: 300;

	&:focus {
		border: 1px solid #474B4F;
	}

	&:hover {
		border: 1px solid #707070;
	}

	&.input {
		width: calc(100% - 20px - 30px);
		margin: 0 10px;
	}
}

select {
	padding: 8px 15px;
	outline: none;
	border: 1px solid #C6C9CF;
    border-radius: 5px;
	font-size: 12px;
	font-weight: 300;
	width: 100%;
}

button {
	outline: none;
	cursor: pointer;
	padding: 8px 15px;
	font-size: 12px;
	font-weight: 300;
	border-radius: 5px;
	border: 1px solid #C6CACF;
	color: #C6CACF;
	background: white;

	&.primary {
		padding: 8.5px 15.5px;
		border: none;
		background: linear-gradient(90deg, rgba(29,196,233,1) 0%, rgba(29,233,182,1) 100%);
		color: white;
	}

	&.cancel {
		padding: 8.5px 15.5px;
		border: none;
		background: linear-gradient(90deg, rgba(141,10,2,1) 0%, rgba(244,66,54,1) 100%);
		color: white;
	}

	&.add {
		outline: none;
		border: 1px dashed #C6C9CF;
		width: 100%;
		background: none;
		padding: 18px 0;
		cursor: pointer;
		color: #C6C9CF;
		text-transform: uppercase;
		font-family: 'Open Sans', sans-serif;
		font-weight: 600;
		letter-spacing: 2px;
		font-size: 10px;
		margin-top: 20px;
	}

	&.actionButton {
		width: 39px;
    	height: 39px;
      color: white;
      cursor: pointer;
      outline: none;
      border: none;
      padding: 0;
      border-radius: 100%;

	  &.is-small {
		width: 18px;
		height: 18px;
		font-size: 8px;
	  }

      &.edit {
        background: linear-gradient(
          90deg,
          rgba(29, 196, 233, 1) 0%,
          rgba(29, 233, 182, 1) 100%
        );
        margin-right: 5px;
      }

      &.save {
        background: linear-gradient(
          90deg,
          rgba(29, 196, 233, 1) 0%,
          rgba(29, 233, 182, 1) 100%
        );
        margin-right: 5px;
      }

      &.delete_ {
        background: linear-gradient(
          90deg,
          rgba(141, 10, 2, 1) 0%,
          rgba(244, 66, 54, 1) 100%
        );
      }

      &.cancel {
        background: linear-gradient(
          90deg,
          rgba(141, 10, 2, 1) 0%,
          rgba(244, 66, 54, 1) 100%
        );
      }
    }
	}

	.editor__content {
		strong {
			font-weight: 600;
		}

		ul {
			list-style: none;

			>li {
				display: flex;
				flex-direction: row;
				align-items: center;
				
				&::before {
					content: "-";
					margin-right: 10px;
				}
			}
    	}
  	}

	.display-none {
		display: none;
	}

	.ytPlayer {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 16;
		height: 9;
	}

	.width-100 {
		width: 100%;
	}

	.flex {
		display: flex;
	}

	#app {
		display: flex;
		flex-direction: row;
		width: 100%;
	}


	.contentSidebarCollapsed {
		display: flex;
		flex-direction: row;
		height: fit-content;
		flex-grow: 2;
		margin-left: 58px;
	}

	.contentSidebar {
		display: flex;
		flex-direction: row;
		height: fit-content;
		flex-grow: 2;
		margin-left: 250px;
	}

	.bar-bottom {
		position: absolute;
		bottom: 0;
		background: #f51d45;
		height: 5px;
	}

	::-webkit-scrollbar {
		width: $scrollBarHeight;
		height: $scrollBarHeight;
	}

	::-webkit-scrollbar-button {
		display: none;
	}

	::-webkit-scrollbar-thumb {
		background: $primaryColor;
	}

	@keyframes spinAround {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loading-overlay {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		align-items: center;
		display: none;
		justify-content: center;
		overflow: hidden;
	}

	.loading-overlay.is-active {
		display: flex;
	}

	.loading-overlay.is-full-page {
		z-index: 999;
		position: fixed;
		left: 250px;
	}

	.loading-overlay.is-full-page .loading-icon:after {
		top: calc(50% - 2.5em);
		left: calc(50% - 2.5em);
		width: 5em;
		height: 5em;
	}

	.loading-overlay .loading-background {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		background: #232228;
	}

	.loading-overlay .loading-icon {
		position: relative;
	}

	.loading-overlay .loading-icon:after {
		animation: spinAround 0.5s infinite linear;
		border: 2px solid $primaryColor;
		border-radius: 290486px;
		border-right-color: transparent;
		border-top-color: transparent;
		content: "";
		display: block;
		height: 1em;
		position: relative;
		width: 1em;
		position: absolute;
		top: calc(50% - 1.5em);
		left: calc(50% - 1.5em);
		width: 3em;
		height: 3em;
		border-width: 5px;
	}

	.youtubePlayer {
		position: absolute;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.snackbar.is-success {
		border-bottom: 5px solid green !important;

		.text {
			color: green;
		}
	}

	.snackbar.is-info {
		border-bottom: 5px solid lightblue !important;

		.text {
			color: lightblue;
		}
	}

	.snackbar.is-warning {
		border-bottom: 5px solid yellow !important;

		.text {
			color: yellow;
		}
	}

	.snackbar.is-danger {
		border-bottom: 5px solid red !important;

		.text {
			color: red;
		}
	}

	.snackbar {
		max-width: 400px;
		min-width: 400px;
		position: fixed;
		background: $inputColor !important;
		z-index: 99;
		top: 25px;
		left: calc(100% - 50% - (400px / 2));
		background: none;
		padding: 0 0 0 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 5px solid $primaryColor;

		.text {
			flex-grow: 2;
			background: none;
			padding: 12px 0 12px 0;
			min-width: 270px;
			max-width: 270px;
		}

		.action {
			.button {
				border: none;
				background: $buttonColor;
				min-width: 100px;
				max-width: 100px;
				color: $textColor;
				padding: 15px 0;
				margin-left: 30px;
			}
		}

		div {
			background: none;
		}
	}

	.tag {
		align-items: center;
		background-color: none;
		border-radius: 4px;
		color: #4a4a4a;
		display: inline-flex;
		font-size: 0.75rem;
		height: 2em;
		justify-content: center;
		line-height: 1.5;
		white-space: nowrap;

		span {
			background: none;
		}
	}

	.tag.is-info {
		background-color: #363636;
		color: #f5f5f5;
	}
</style>
