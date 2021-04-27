<template>
    <div class="container">
        <companyServiceRecord v-if="roleType == 0"></companyServiceRecord>
        <teamHeaderServiceRecord v-if="roleType == 1"></teamHeaderServiceRecord>
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
          emptyTips: '您的服务记录为空！^-^'
      }
    },
    methods: {

    },

    onShow(){
        this.roleType = store.state.role;
    },

    onLoad() {

    },
    onReachBottom(){

    }
  }
</script>

<style lang="less">
  @import "../../../assets/base";

  .container {
  }
</style>
