<template>
    <div :class="['left-layout', {'content-expand': !open}]">
        <aside :style="{width: leftWidth, minWidth: '300px',  maxWidth: '50%'}" ref="aside">
            <slot name="leftPanel"></slot>
            <a class="open-button" href="javascript:;" @click="handleClick">
                <i :class="['icon-font', `icon-arrow-${open ? 'left' : 'right'}`]" />
            </a>
            <div class="resize-area" @mousedown="resize"></div>
        </aside>
        <div class="content-panel" :style="{paddingLeft: paddingWidth}">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'LeftLayout',
    data() {
        return {
            leftWidth: '300px',
            paddingWidth: '300px',
            open: true,
            isDrag: false
        };
    },
    methods: {
        handleClick() {
            this.open = !this.open;
            this.paddingWidth = this.open ? `${this.$refs.aside.clientWidth}px` : 0;
        },
        resize() {
            if (!open) return;
            this.width = this.$refs.aside.clientWidth;

            document.onmousemove = (e) => {
                this.isDrag = true;
                //console.log(e.pageX, e.clientX, document.body.scrollLeft, document.body.clientLeft);
                e = e || window.event;
                let width = e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);

                this.leftWidth = `${width}px`;
                this.paddingWidth = `${this.$refs.aside.clientWidth}px`;
            }
        }
    },
    mounted() {
        const self = this;
        document.addEventListener('mouseup', function() {
            if (!self.isDrag) return;
            document.onmousemove = null;
            self.isDrag = false;
        })
    }
}
</script>

<style lang="less" scoped>
@import './left-layout.styl';
</style>
