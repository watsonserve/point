<template>
    <v-dialog title="添加关注" :closable="true">
        <nav>
            <a class="space" href="javascript:;" @click="dialogTab('Spaces')">
                <i class="material-icons icon-space"></i>添加空间
            </a>
            <a class="space" href="javascript:;" @click="dialogTab('Pages')">
                <i class="material-icons icon-report"></i>添加页面
            </a>
        </nav>
        <div class="panel-search">
            <div class="wrap">
                <auto-complete class="search" @select="selectHandle" @search="searchHandle" placeholder="搜索你想找的" :showClose="true">
                    <Option v-for="(item, idx) in dialogWords" :value="item.id" :key="idx">{{ item.title }}</Option>
                </auto-complete>
                <button>
                    <i class="material-icons icon-magnifying"></i>
                </button>
            </div>
        </div>
    </v-dialog>
</template>

<script>
export default {
    name: 'care-dialog'
}
</script>
