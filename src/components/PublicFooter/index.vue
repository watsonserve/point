<template>
    <footer class="public-footer">
        <router-link to="/report">反馈建议</router-link>
        <router-link to="/connect">联系我们</router-link>
    </footer>
</template>

<script>
export default {
    name: 'PublicFooter'
}
</script>

<style lang="less" scoped>
    @import './public-footer.less';
</style>