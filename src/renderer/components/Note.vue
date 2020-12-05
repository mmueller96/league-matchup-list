<template>
    <div class="noteWrapper">
        <div class="note">
            <!-- notes section -->
            <div v-if="!isEdit">
                <Editor :content="noteState" :editable="false" />
            </div>
            <div v-else class="noteInput">
                <Editor :content="noteState" :editable="true" @onUpdate="noteUpdated" />
            </div>
        </div>

        <!-- action button section -->
        <div v-if="!isEdit" class="noteActions">
            <button class="actionButton edit" @click="edit()">
                <font-awesome-icon :icon="icon.edit" size="1x" />
            </button>
        </div>
        <div v-else class="noteActions">
            <button class="actionButton save" @click="save()">
                <font-awesome-icon :icon="icon.save" size="1x" />
            </button>
            <button class="actionButton cancel" @click="cancel()">
                <font-awesome-icon :icon="icon.cancel" size="1x" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Editor from "@/components/Editor.vue";
import { Content } from "../types/editor";
import { Matchup } from "../store/types";

export default Vue.extend({
    name: "note",
    components: { FontAwesomeIcon, Editor },
    props: ["note"],
    data() {
        return {
            noteState: {},
            isEdit: false,
            icon: { cancel: faTimes, save: faSave, edit: faPen },
        };
    },
    mounted() {
        this.noteState = this.selectedMatchupNote;        
    },
    beforeDestroy() {
        //@ts-ignore
        this.editor.destroy();
    },
    watch: {
        note(newNote: Content): void {
            this.noteState = newNote;
        }
    },
    methods: {
        save(): void {
            this.$store.commit("setNotesFromData", this.noteState);
            this.isEdit = false;
            //@ts-ignore
            this.$buefy.toast.open({
                message: `Yaay! Your rune set was successfully saved!`,
                type: "is-success",
                duration: 4000
            });
        },
        edit(): void {
            this.isEdit = true;
        },
        cancel(): void {
            this.noteState = this.note;
            this.isEdit = false;
        },
        noteUpdated(content: Content): void {            
            this.noteState = content;
        }
    },
    computed: {
        selectedMatchupNote(): Content {
			return (this.$store.state.Matchup.selectedMatchupData as Matchup.IMatchupData).notes;
		}
    }
});
</script>

<style lang="scss" scoped>
.noteWrapper {
    height: calc(100% - 25px);
    position: relative;

    >.note {
        height: calc(100% - 35px);
        overflow: scroll;
        
        >.noteInput{
            height: 100%;

            >textarea{
                width: 100%;
                height: 100%;
            }
        }

        >.noteActions {
            position: absolute;
        }

        > .actionButton {
            width: 18px;
            height: 18px;
            color: white;
            cursor: pointer;
            outline: none;
            border: none;
            padding: 0;
            font-size: 8px;
            border-radius: 100%;

            &.edit {
                background: linear-gradient(
                    90deg,
                    rgba(29, 196, 233, 1) 0%,
                    rgba(29, 233, 182, 1) 100%
                );
                margin-right: 5px;
            }
        }
    }
}
</style>