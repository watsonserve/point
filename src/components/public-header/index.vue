<template>
    <header class="public-header">
        <router-link class="logo" to="/">
            <img src="../../assets/img/logo.svg" />
        </router-link>
    </header>
</template>

<script>
import InputSearch from '@/components/InputSearch';

export default {
    name: 'PublicHeader',
    components: {InputSearch}
}
</script>

<style lang="less" src="./public-header.less" scoped></style>
