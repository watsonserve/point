<template>
    <section class="comment-main">
        <p class="total">{{`评论(${total}条)`}}</p>
        <div class="text-container">
            <img class="head-picture" src="./head.png" />
            <div class="textarea">
                <TextareaBox
                    :limit="400"
                    placeholder="我来说两句..."
                    :isChild="false"
                    defaultText="输入邮箱前缀或姓名"
                    selectTip="选择同事或按空格完成"
                    fileTip="本地上传 (小于2M的jpg,gif,png,bmp，最多5张)"
                />
            </div>
        </div>
        <CommentNode v-for="(item, index) in this.comments" :commentData="item" :key="index" parent=""></CommentNode>
        <Pagination @changePage="changePage" :current=1 :total="pagination.total" theme="simple"></Pagination>
    </section>
</template>

<script>
import CommentNode from './Comment.vue';
import TextareaBox from './Textarea.vue';

export default {
    name: 'Comment',
    components: {CommentNode, TextareaBox},
    computed: {
        commentList() {
            return this.$store.state.detail.page.comments;
        },
        pagination() {
            const totalCounts = this.commentList.length;
            const total = totalCounts % this.countsEveryPage === 0 ? totalCounts / this.countsEveryPage : parseInt(totalCounts / this.countsEveryPage) + 1;
            return {
                total
            }
        },
        comments() {
            return this.commentList.slice(this.countsEveryPage * (this.currentPage - 1) ,this.countsEveryPage * this.currentPage);
        }
    },
    methods: {
        changePage(value) {
            this.currentPage = value;
        }
    },
    data() {
        return {
            total: 14,
            currentPage: 1,
            countsEveryPage: 2,
        }
    },
    mounted() {
        this.$store.commit('detail/changeState', {commentList: this.commentList});
    }
}
</script>

<style lang="less">
    @import './comment.less';
</style>
