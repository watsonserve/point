<template>
  <div class="input-search" :class="{'input-search-middle': showAssociate}">
    <form @submit.prevent.stop="submitHandle">
      <input type="text"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        autocomplete="off"
        @focus="focusHandle"
        @blur="blurHandle"
        @input="sugHandle"
        ref="word"
      />
      <button type="submit">
        <i class="material-icons">search</i>
      </button>
      <suggest-modal v-if="showAssociate" />
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import SuggestModal from './suggest';
import {searchResultHightLight} from '../../utils/index';

export default {
  name: 'InputSearch',
  components: {SuggestModal},
  props: ['action', 'name', 'placeholder', 'associate'],
  data () {
    return {
      value: '',
      showAssociate: false,
    };
  },
  methods: {
    ...mapActions('search', ['getSuggest', 'query']),
    focusHandle() {
      this.showAssociate = true;
    },
    sugHandle(ev) {
      this.getSuggest(ev.target.value);
    },
    submitHandle() {
      this.query(this.$refs.word.value);
      this.showAssociate = false;
    },
    blurHandle() {
      this.showAssociate = false;
    },
    selectItem() {
      this.showAssociate = false;
    },
    searchResultHightLight
  }
}
</script>

<style lang="less" scoped src="./input-search.less" />
