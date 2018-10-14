<template>
    <main>
        <LeftLayout>
            <div class="serach-leftPanel" slot="leftPanel">
                <div class="search-condition search-condition-space">
                    <label>
                        <i class="icon-font icon-space"></i>
                        按空间搜索：
                    </label>
                    <Select>
                        <Option v-for="item in spaceCondition"
                                :value="item"
                                :key="item"
                                :label="item">
                        </Option>
                    </Select>
                </div>
                <div class="search-condition search-condition-creator">
                    <label>
                        <i class="icon-font icon-person"></i>
                        按创建人搜索：
                    </label>
                    <Select>
                        <Option v-for="item in ceartorCodition"
                                :value="item"
                                :key="item"
                                :label="item">
                        </Option>
                    </Select>
                </div>
                <div class="search-condition search-condition-time">
                    <label>
                        <i class="icon-font icon-clock"></i>
                        更新时间：
                    </label>
                    <ul class="time-condition">
                        <li class="condition-item" v-for="(item, idx) in timeCondition" :value="item" :key="idx">
                            {{item}}
                        </li>
                    </ul>
                </div>
                <Checkbox v-model="showWithoutRight">显示无权限内容</Checkbox>
            </div>
            <div class="search-main-content">
                <Tabs type="simple">
                    <TabPanel label="全部">
                        <p class="search-result-item search-result-item-page" v-for="(item, idx) in searchData.results.pages" :key="idx">
                            <template>
                                <p class="title">
                                    <i class="icon-font icon-report"></i>
                                    <span class="right" v-if="!item.right">无权限</span>
                                    {{item.title}}
                                </p>
                                <p class="summary">
                                    {{item.summary}}
                                </p>
                                <p class="info">
                                    <span class='team'>{{item.team}}</span>
                                    <span class='updater'>{{item.updater}}</span>
                                    <span class='update-time'>更新时间：{{item.updateTime}}</span>
                                </p>
                            </template>
                        </p>
                        <p class="search-result-item search-result-item-space" v-for="(item, idx) in searchData.results.spaces" :key="idx">
                            <template>
                                <p class="header">
                                    <em :class="`random-bg-color-${item.spaceId%7}`" v-if="!item.logo">{{item.spaceName[0]}}</em>
                                    <img v-if="item.logo" :src="item.logo" />
                                    <span class="title">{{item.title}}</span>
                                </p>
                                <p class="info">
                                    <span class='updater'>{{item.updater}}</span>
                                    <span class='update-time'>更新时间：{{item.updateTime}}</span>
                                </p>
                            </template>
                        </p>
                        <p class="search-result-item search-result-item-users" v-for="(item, idx) in searchData.results.users" :key="idx">
                            <template>
                                <img :alt="item.headImg" src="./head.png" />
                                <p>
                                    <span class="name">{{item.name}}</span>
                                    <span class="department">{{item.department}}</span>
                                </p>
                                <span class="email">{{item.email}}</span>
                            </template>
                        </p>
                        <Attachments :list="searchData.results.files" :download="true" :cols="attachmentsCols" />
                    </TabPanel>
                    <TabPanel label="页面">
                        <p class="search-result-item search-result-item-page" v-for="(item, idx) in searchData.results.pages" :key="idx">
                            <template>
                                <p class="title">
                                    <i class="icon-font icon-report"></i>
                                    <span class="right" v-if="!item.right">无权限</span>
                                    {{item.title}}
                                </p>
                                <p class="summary">
                                    {{item.summary}}
                                </p>
                                <p class="info">
                                    <span class='team'>{{item.team}}</span>
                                    <span class='updater'>{{item.updater}}</span>
                                    <span class='update-time'>更新时间：{{item.updateTime}}</span>
                                </p>
                            </template>
                        </p>
                    </TabPanel>
                    <TabPanel label="空间">
                        <p class="search-result-item search-result-item-space" v-for="(item, idx) in searchData.results.spaces" :key="idx">
                            <template>
                                <p class="header">
                                    <em :class="`random-bg-color-${item.spaceId%7}`" v-if="!item.logo">{{item.spaceName[0]}}</em>
                                    <img v-if="item.logo" :src="item.logo" />
                                    <span class="title">{{item.title}}</span>
                                </p>
                                <p class="info">
                                    <span class='updater'>{{item.updater}}</span>
                                    <span class='update-time'>更新时间：{{item.updateTime}}</span>
                                </p>
                            </template>
                        </p>
                    </TabPanel>
                    <TabPanel label="用户">
                        <p class="search-result-item search-result-item-users" v-for="(item, idx) in searchData.results.users" :key="idx">
                            <template>
                                <img :alt="item.headImg" src="./head.png" />
                                <p>
                                    <span class="name">{{item.name}}</span>
                                    <span class="department">{{item.department}}</span>
                                </p>
                                <span class="email">{{item.email}}</span>
                            </template>
                        </p>
                    </TabPanel>
                    <TabPanel label="文件">
                        <Attachments :list="searchData.results.files" :download="true" :cols="attachmentsCols" />
                    </TabPanel>
                </Tabs>
            </div>
            <!-- <Pagination :current="1" :total="5" theme="simple"></Pagination> -->
        </LeftLayout>
    </main>
</template>
<script>
import LeftLayout from '@/components/LeftLayout/';
import {searchResult} from './data';
import Attachments from '@/components/Attachments';

export default {
    name: 'SearchResult',
    components: {LeftLayout, Attachments},
    data() {
        return {
            spaceCondition: [1, 2, 3],
            ceartorCodition: [1, 2, 3],
            timeCondition: ['不限', '一天内', '一周内', '三个月内'],
            showWithoutRight: false,
            attachmentsCols: [
                {
                    type: 'selection',
                    title: ' ',
                    width: 25,
                    align: 'center',
                },
                {
                    title: '名称',
                    key: 'name',
                    render(h, data) {
                        return h('a', {domProps: {href: data.row.viewurl}}, data.row.name)
                    }
                },
                {
                    title: '路径',
                    key: 'filePath',
                    render(h, data) {
                        return h('a', {domProps: {href: ''}}, data.row.filePath)
                    }
                },
                {
                    title: '更新时间',
                    key: 'updateTime'
                }
            ]
        }
    },
    computed: {
        searchData() {
            return {
                ...searchResult
            }
        }
    }
}
</script>
<style lang="less">
    @import './search_result.less';
</style>
