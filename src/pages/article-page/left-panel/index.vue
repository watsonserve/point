<template>
    <div class="left-panel">
        <div class="space-card">
            <div class="space-info">
                <em class="point" :class="`random-bg-color-${space.bgColor}`" v-if="!space.logo">{{ space.spaceName[0] }}</em>
                <img v-if="space.logo" :src="space.logo" />
                <span class="name">{{ space.spaceName }}</span>
            </div>
            <footer>
                <ul class="list-inline">
                    <li class="administrator">
                        <Dropdown>
                            <a href="javascript:;"><i class="icon-font icon-person"></i></a>
                            <DropdownMenu slot="list" class="oaui-case-dropdown-list" >
                                <DropdownItem v-for="(item, index) in space.managers" :key="index">
                                    <a href="javascript:;">
                                        <span class="avatar" :style="{backgroundImage: `url(${item.avatar})`}"></span>
                                        <span>{{ item.name }}</span>
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                    <li class="operate">
                        <Dropdown>
                            <a href="javascript:;"><i class="icon-font icon-gear"></i></a>
                            <DropdownMenu slot="list" class="oaui-case-dropdown-list">
                                <DropdownItem><a href="javascript:;">空间信息</a></DropdownItem>
                                <DropdownItem><a href="javascript:;">权限设置</a></DropdownItem>
                                <DropdownItem><a href="javascript:;">回收站</a></DropdownItem>
                                <DropdownItem><a href="javascript:;">配置侧边栏</a></DropdownItem>
                                <DropdownItem><a href="javascript:;">删除空间</a></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                    <li>
                        <a href="javascript:;" class="icon"><i class="icon-font icon-folder"></i></a>
                    </li>
                </ul>
            </footer>
        </div>
        <div class="features">
            <div class="panel-search">
                <div class="wrap">
                    <auto-complete class="search" @select="selectHandle" @search="searchHandle" placeholder="搜索页面" :showClose="true">
                        <Option v-for="(item, idx) in words" :value="item.id" :key="idx">{{ item.title }}</Option>
                    </auto-complete>
                    <button>
                        <i class="icon-font icon-magnifying"></i>
                    </button>
                </div>
            </div>
            <div class="tree-container">
                <Tree :treeData="space.pageTree" :contentNode="PageNode" childName="childPage" />
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import {pageAddress} from '@/router';
import PageNode from '../page-node';

export default {
    name: 'left-panel',
    props: {
        space: {
            type: String,
            default: 'null'
        },
        pages: {
            type: Array,
            default: _ => []
        }
    }
}
</script>

<style lang="less">
    @import './left-panel.less';
    @import './tree.less';
</style>
