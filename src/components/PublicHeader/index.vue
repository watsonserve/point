<template>
    <header class="public-header">
        <router-link class="logo" to="/">
            <img src="../../assets/img/logo.svg" />
        </router-link>
        <!-- <input-search placeholder="搜索你想找的"
            action="//neisou.baidu.com/new/search" name="word"
            :associate="{action: '//family.baidu.com/search/ns/suggest', method: 'jsonp', name: 'word'}"
        /> -->
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
