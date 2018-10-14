<template>
    <div :data-msg="msg"></div>
</template>

<script>

export default {
    name: 'Toast',
    props: ['msg'],
    watch: {
        msg() {
            this.$Message.error(this.msg);
        }
    }
};
</script>
