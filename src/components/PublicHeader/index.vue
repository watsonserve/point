<template>
    <header class="public-header">
        <router-link class="logo" to="/">
            <img src="../../assets/img/logo.svg" />
        </router-link>
        <input-search placeholder="搜索你想找的"
            action="//neisou.baidu.com/new/search" name="word"
            :associate="{action: '//family.baidu.com/search/ns/suggest', method: 'jsonp', name: 'word'}"
        />
        <nav>
            <router-link class="create" to="/editor">
                <i class="material-icons">add</i>
                <span>创建</span>
            </router-link>
            <a class="setting" href="javascript:;">
                <i class="material-icons">gear</i>
            </a>

            <a class="fav" href="javascript:;">
                <i class="material-icons">star</i>
            </a>
        </nav>
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
