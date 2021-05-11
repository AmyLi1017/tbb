<template>
    <div class="container">
        <companyServiceRecord v-if="roleType == 0" :isReachBottom="isReachBottom" @change="isLoadMore"></companyServiceRecord>
        <teamHeaderServiceRecord v-if="roleType == 1" :isReachBottom="isReachBottom" @change="isLoadMore"></teamHeaderServiceRecord>
        <empty v-if="roleType == 2" :title="emptyTips"></empty>
    </div>
</template>

<script>
    import store from '@/store/index'
    import companyServiceRecord from '@/components/employer/serviceRecord'
    import teamHeaderServiceRecord from '@/components/teamHeader/serviceRecord'
    import empty from "@/components/empty";

  export default {
    components: {companyServiceRecord,teamHeaderServiceRecord,empty},
    data() {
      return {
        roleType: '',
        emptyTips: '您的服务记录为空！^-^',
        isReachBottom: false
      }
    },
    methods: {
      isLoadMore(isLoadingMore) {
        this.isReachBottom = isLoadingMore
      }
    },

    onShow(){
        this.roleType = store.state.role;
    },

    onLoad() {

    },
    onReachBottom(){
      if(!this.isReachBottom){  //此处判断，上锁，防止重复请求
        this.isReachBottom = true;
      }
    },
    onPullDownRefresh() {
      setTimeout(function () {
        uni.stopPullDownRefresh();
      }, 1000);
    }
  }
</script>

<style lang="less">
  @import "../../../assets/base";

  .container {
  }
</style>
