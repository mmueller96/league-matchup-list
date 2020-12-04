<template>
    <div class="context-menu" v-show="show" :style="style" ref="context" tabindex="0" @blur="close">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'contextMenu',
    props: {
        display: Boolean,
    },
    data() {
        return {
            left: 0,
            top: 0,
            show: false,
        }
    },
    methods: {
        close(): void {
            this.show = false;
            this.left = 0;
            this.top = 0;
        },
        open(event: MouseEvent): void {
            this.left = event.pageX || event.clientX;
            this.top = event.pageY || event.clientY;
            // @ts-ignore
            Vue.nextTick(() => this.$el.focus());
            this.show = true;
        }
    },
    computed: {
        style(): any {
            return {
                left: this.left + 'px',
                top: this.top + 'px'
            }
        }
    }

})
</script>

<style lang="scss" scoped>
.context-menu {
    position: fixed;
    background: white;
    z-index: 999;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    cursor: pointer;
}
</style>