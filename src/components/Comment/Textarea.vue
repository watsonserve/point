<template>
    <div class="main">
        <div id="textarea-box" ref="container">
            <textarea :placeholder="placeholder" ref="textarea" v-model="text" @change="handleChange" @input="handleChange" @blur="blur('showAite')"></textarea>
            <div class="editable-div" ref="hide" contentEditable="true" :style="{'opacity': showAite ? 1 : 0}"></div>
            <footer>
                <span class="left">
                    <a class="emoji" href="javascript:;" @click="emoji=true" @blur="blur('emoji')">
                        <i class="icon-font icon-emoji"></i>
                    </a>
                    <a class="picture" href="javascrpt:;" @click="upload=true">
                        <i class="icon-font icon-picture"></i>
                    </a>
                    <a class="aite" href="javascrpt:;" @click="atPerson">
                        <i class="icon-font icon-aite"></i>
                    </a>
                </span>
                <span class="right" v-show="limit">
                    <span class="fontNum" v-if="!isChild">
                        {{fontNum + '/' + limit}}
                    </span>
                    <a class="cancle" href="javascrpt:;" @click="handleClick">取消</a>
                    <a class="submit" href="javascrpt:;" @click="handleClick">发布</a>
                </span>
            </footer>
            <ul class="at-list" ref="atList" v-show="showAite">
                <li class="tip">{{name.length === 0 ? defaultText : selectTip}}</li>
                <li v-show="name.length !== 0"
                    v-for="(item, idx) in list"
                    :key="idx"
                    @click="selectItem"
                    :class="{'content': true, 'content-active': idx === isSelected}"
                >{{item}}</li>
            </ul>
        </div>
        <ul class="emoji-list" v-show="emoji" ref="emojiList">
            <li v-for="(item, idx) in emojis" class="emoji" :key="idx" @click="addEmoji">
                {{item}}
            </li>
        </ul>
        <div class="file" v-show="upload">
            <p class="file-tip">
                {{fileTip}}
            </p>
            <ul class="file-list">
                <li v-for="(item, idx) in files" :key="idx" class="file-item">
                    <span class="delete" :name="item.name" @click="deteleImg" :index="idx">
                        x
                    </span>
                    <img :src="item.url" :name="item.name"/>
                </li>
                <li class="add-button" @click="upFile" v-show="list.length < 5">
                    添加
                </li>
                <input type="file" ref="file" v-show="false" @change="uploadCommentImg"/>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {stringHandle, computedPos, addString} from './at';
import clickOutside from 'click-outside';
import getEmoji from './emoji';
export default {
    name: 'TextareaBox',
    props: ["limit", "placeholder", "isChild", "parentId", "defaultText", "selectTip", "fileTip", "picNum"],
    data() {
        return {
            text: '',
            name: '',
            list: ['李白','杜甫','王维'],
            showAite: false,
            cursortPos: 0,
            isSelected: -1,
            upload: false,
            emoji: false,
            files: [],
            fd: new FormData()
        }
    },
    computed: {
        fontNum() {
            if (!this.limit) return;
            const maxNum = this.limit;
            const value = this.text;

            if (value.length >= maxNum) {
                this.text = value.slice(0, maxNum);
            }

            return this.text.length;
        },
        emojis() {
            return getEmoji();
        }
    },
    methods: {
        blur(obj) {
            const self = this;
            setTimeout(function () {
                self[obj]=false;
            }, 200)
        },
        handleClick(e) {
            if (e.target.classList[0] === "submit") {
                const commentConent = this.text;
                const parentId = this.isChild ? this.parentId : 0;
                const pageId = this.$route.query.pageId;
                const userId = this.$store.state.userInfo.id;
                this.$store.dispatch('detail/addComment', {commentConent, parentId, pageId, userId})
                .then(() => {
                    this.text = '';
                })
            }

            this.$emit('close');
        },
        handleChange() {
            const textarea = this.$refs.textarea;
            const hideDiv = this.$refs.hide;
            const atList = this.$refs.atList;
            const {cursorPosition, beforeCursorString, indexString, positionString} = stringHandle(textarea, this.text);

            this.cursortPos = cursorPosition;
            this.name = indexString.substr(1);

            if (beforeCursorString.indexOf('@') !== -1 && indexString.indexOf(' ') === -1 && indexString.indexOf('\n') === -1) {
                this.showAite = true;
                hideDiv.innerHTML = positionString.replace(/\n/g, '<br/>') + '<span id="at">@</span>';
                const fontSize = parseInt(window.getComputedStyle(textarea).fontSize, 10);
                const position = computedPos(textarea);

                atList.style.left = position.left + fontSize + 'px';
                atList.style.top = position.top - textarea.scrollTop + 1.6 * fontSize + 'px';
            }
            else {
                this.showAite = false;
                this.isSelected = -1;
            }
        },
        selectItem(e) {
            const textarea = this.$refs.textarea;
            const pos = this.cursortPos - this.name.length;
            this.text = addString(textarea, pos, this.text, this.name.length, e.target.innerText.split(''));
            this.showAite = false;
        },
        atPerson() {
            const textarea = this.$refs.textarea;
            this.text = addString(textarea, undefined, this.text, 0, '@');
        },
        upFile() {
            const file = this.$refs.file;
            file.click();
        },
        uploadCommentImg(e) {
            const imgInput = this.$refs.file;
            if (!e.target.value) {
                return;
            }

            let fileObj = e.target.files[0];


            if (!/.+\.(gif|jpeg|png|jpg|bmp)$/i.test(fileObj.name)) {
                console.log('图片不符合格式');
                imgInput.value = '';
                return;
            }

            if (fileObj.size > 2 * 1024 * 1024) {
                console.log('图片过大啦');
                imgInput.value = '';
                return;
            }

            let fileReader = new FileReader();
            fileReader.onload = event => {
                let blobFile = new Blob([event.target.result]);

                window.URL = window.URL || window.webkitURL;
                let blobUrl = window.URL.createObjectURL(blobFile);
                this.files.push({name: imgInput.files[0].name, url: blobUrl});
                // this.actions.addImg({src: blobUrl, status: 'uploading'});
                ;
                this.fd.append(imgInput.files[0].name, blobFile);
                imgInput.value = '';
                // this.actions.uploadImg(fd);
            };
            fileReader.readAsArrayBuffer(fileObj);
        },
        deteleImg(e) {
            const name = e.target.getAttribute('name');
            const index = parseInt(e.target.getAttribute('index'), 10);
            this.fd.delete(name);
            this.files.splice(index, 1);
        },
        addEmoji(e) {
            const textarea = this.$refs.textarea;
            this.text = addString(textarea, undefined, this.text, 0, e.target.innerText);
            this.showAite = false;
        }
    },
    mounted() {
        const textarea = this.$refs.textarea;
        const hideDiv = this.$refs.hide;
        const emojiList = this.$refs.emojiList;
        const atList = this.$refs.atList;
        hideDiv.style.top = window.getComputedStyle(textarea.parentNode).paddingTop;
        hideDiv.style.left = window.getComputedStyle(textarea.parentNode).paddingLeft;
        const self = this;

        document.addEventListener('keydown', function (event) {
            if (!self.showAite && self.name.length === 0) return;
            const pos = self.cursortPos - self.name.length;
            const index = self.isSelected;
            const value = self.list[index].split('');
            switch(event.keyCode) {
                case 40:
                    event.preventDefault();
                    event.target.disabled = false;
                    if (self.isSelected >= self.list.length-1) self.isSelected = -1;
                    self.isSelected++;
                    break;
                case 38:
                    event.preventDefault();
                    if (self.isSelected <= 0) self.isSelected = self.list.length;
                    self.isSelected--;
                    break;
                case 13:
                    event.preventDefault();
                    self.text = addString(textarea, pos, self.text, self.name.length, value);
                    self.showAite = false;
                    self.isSelected = -1;
                    break;
                case 108:
                    event.preventDefault();
                    self.text = addString(textarea, pos, self.text, self.name.length, value);
                    self.showAite = false;
                    self.isSelected = -1;
                    break;
            }
        });
    }
}
</script>

<style lang="less" scoped>
    .main {
        display: inline-block;
        width: 100%;

        #textarea-box {
            border: 1px solid #d4e1f0;
            border-radius: 10px;
            padding: 6px 10px;
            color: #a4afc9;
            font-size: 14px;
            position: relative;
            height: 122px;

            textarea {
                resize: none;
                outline: none;
                height: 110px;
                width : 100%;
                font-size: 13px;
                border: none;
                background: transparent;
                font-size: 'Microsoft Yahei';
            }

            .editable-div {
                display: block;
                outline: none;
                height: 110px;
                width : calc(~"100% - 20px");
                font-size: 13px;
                border: none;
                background: transparent;
                text-align: left;
                position: absolute;
                z-index: -1;
                visibility: hidden;
            }

            footer {
                overflow: hidden;
                position: absolute;
                width : calc(~"100% - 20px");
                bottom: 6px;
                a {
                    color: #a4afc9;
                    font-weight: bold;
                }

                .left {
                    float: left;
                    a {
                        margin-right: 5px;
                    }
                }

                .right {
                    float: right;

                    span, a {
                        margin-left: 25px;
                    }
                }
            }
        }
        .at-list {
            position: absolute;
            list-style: none;
            width: 230px;
            border-radius: 15px;
            box-shadow: 1px 1px 13px 2px #e4ecf2;

            li {
                height: 25px;
                line-height: 25px;
                background: #fff;
                text-align: left;
                padding-left: 16px;
            }

            .content-active, .content:hover {
                background: #4786ff;
            }
        }
        .emoji-list {
            width: 260px;
            height: 140px;
            list-style: none;
            overflow: auto;
            box-shadow: 2px 2px 13px 0 #e4ecf2;
            padding: 10px 10px;
            border-radius: 10px;

            .emoji {
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                float: left;
            }
        }
        .file {
            width: 372px;
            height: 100px;
            border-radius: 10px;
            box-shadow: 2px 2px 13px 0 #e4ecf2;
            margin: 15px 0;
            padding: 13px 16px;
            font-size: 12px;
            text-align: left;
            color: #000;

            li {
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 5px;
                background: #d3d8e3;
                margin-top: 10px;
                margin-right: 8px;
                line-height: 50px;
                text-align: center;
                list-style: none;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .delete {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #ff504e;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    text-align: center;
                    transform: translate(45%, -45%);
                    border-radius: 100%;
                    color: #fff;
                }
            }

            .file-item {
                position: relative;
            }
        }
    }
</style>
