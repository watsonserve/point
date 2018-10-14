<template>
    <div v-if="typeof list[0] !== 'undefined'" class="attachments-main">
        <header class="table-header" v-if="header">
            <span>附件列表</span>
            <a href="javascript:;"><i class="icon-font icon-download"></i>下载</a>
            <a href="javascript:;"><i class="icon-font icon-delete"></i>删除</a>
            <label for="deletePic">
                    <input type="checkbox" id="deletePic" />
                    隐藏图片附件
                </label>
        </header>
        <Table size="small" height="200" highlight-row :data="fileData" :columns="columns" @on-selection-change="selectList" />
    </div>
</template>
<script>
import {computeFileSize} from '../../utils/index';

export default {
    name: 'Attachments',
    props: ['cols', 'list', 'header', 'edit', 'download', 'delete'],
    data: function() {
        const self = this;
        return {
            checkList: [],
            columns: []
        }
    },
    methods: {
        selectList(selection) {
            this.checkList = selection.map(item => item.fid);
        }
    },
    computed: {
        fileData() {
            const data = this.list.map((item) => {
                return {
                    name: item.filename,
                    updateTime: item.ctime,
                    size: computeFileSize(item.fsize),
                    updater: item.username,
                    viewurl: item.viewurl,
                    editurl: item.editurl,
                    downloadurl: item.downloadurl,
                    fid: item.fid,
                    filePath: item.filePath
                };
            });

            return data;
        }
    },
    mounted() {
        const self = this;
        let cols = [...this.cols];

        const operate = {
            title: ' ',
            key: 'operate',
            render(h, data) {
                return h('span', {
                    class: 'operate',
                    style: {
                        visibility: self.checkList.includes(data.row.fid) ? 'visible' : 'hidden'
                    }
                }, [
                    h('a',
                        {
                            domProps: {
                                herf: data.row.editurl
                            },
                            class: 'operate-item'
                        },
                        [
                            h('i', {
                                'class': {
                                    'icon-font': true,
                                    'icon-write': self.edit
                                },
                            })
                        ],
                    ),
                    h('a',
                        {
                            class: 'operate-item',
                            domProps: {
                                herf: data.row.downloadurl
                            },
                        },
                        [
                            h('i', {
                                'class': {
                                    'icon-font': true,
                                    'icon-download': self.download
                                },
                            })
                        ],
                    ),h('a',
                        {
                            class: 'operate-item',
                            domProps: {
                                herf: 'javascript:;'
                            },
                        },
                        [
                            h('i', {
                                'class': {
                                    'icon-font': true,
                                    'icon-delete': self.delete
                                },
                            })
                        ],
                    ),
                ]);
            }
        };
        cols.splice(2, 0, operate);
        this.columns =  [
            ...cols
        ]
        cols = [];
    }
}
</script>
<style lang="less">
    @import './attachments.less';
</style>
