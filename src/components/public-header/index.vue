<template>
    <header class="public-header">
        <router-link class="logo" to="/">
            <img src="../../assets/img/logo.svg" />
        </router-link>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'public-header'
});
</script>
<style lang="less" src="./public-header.styl" scoped></style>
