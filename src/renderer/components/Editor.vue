<template>
  <div class="editor">
    <div v-if="editable">
      <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            bold
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            italic
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            code
          </button>
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            list
          </button>

        </div>
      </editor-menu-bubble>
    </div>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
  },
  props: ["content", "editable"],
  data() {
    return {
      keepInBounds: true,
      contentState: Object.assign({}, this.content),
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        editable: this.editable,
        onUpdate: ({ getJSON }) => {
          this.$emit("onUpdate", getJSON());
        }
      }),
    }
  },
  mounted() {
    this.contentState = Object.assign({}, this.content);
    this.editor.setContent(this.contentState);
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  watch: {
    content(newContent) {
      this.contentState = Object.assign({}, newContent);
      this.editor.setContent(newContent);
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
    .menububble {
      position: absolute;
      display: -webkit-box;
      display: flex;
      z-index: 20;
      background: #000;
      border-radius: 5px;
      padding: .3rem;
      margin-bottom: .5rem;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      visibility: hidden;
      opacity: 0;
      -webkit-transition: opacity .2s,visibility .2s;
      transition: opacity .2s,visibility .2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>