<template>
    <div class="container">
        <companyServiceRecord v-if="roleType == 0"></companyServiceRecord>
        <teamHeaderServiceRecord v-if="roleType == 1"></teamHeaderServiceRecord>
    </div>
</template>

<script>
    import store from '@/store/index'
    import companyServiceRecord from '@/components/employer/serviceRecord'
    import teamHeaderServiceRecord from '@/components/teamHeader/serviceRecord'

  export default {
    components: {companyServiceRecord,teamHeaderServiceRecord},
    data() {
      return {
          roleType: ''
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
