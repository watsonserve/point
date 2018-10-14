/**
 * @file page info mixin
 * @author liuhui01
 * @date 11/30/2017
 */

import {mapState} from 'vuex';
import Page from '../dataObject/Page';
import {htmlUnescape} from '@/utils';
import showdown from 'showdown';
export default {
    computed: {
        ...mapState({
            pageSource(state) {
                return state.detail.page.pageText;
            },
            pageText(state) {
                let converter = new showdown.Converter({tables: true});
                let text = state.detail.page.content;
                let html = converter.makeHtml(text);
                return html;
            },
            page(state) {
                return state.detail.page;
            },
            leftOpened(state) {
                return state.detail.leftOpened;
            },
            attachments(state) {
                return state.detail.page.attachments;
            }
        }),
        pageId() {
            return this.$route.query.pageId || this.$route.params.pageId;
        }
    },
    methods: {
        init() {
            this.$store.dispatch('detail/page', {pageId: this.pageId});
            this.tagsEdit = false;
            this.addTag = false;
            // 初始化标签操作
            this.inited = true;
        }
    },
    created() {
        this.init();
    }

};
