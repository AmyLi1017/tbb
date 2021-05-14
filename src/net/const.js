import config from '@/utils/config'

let URL = {
  // BASE_URL: config.debug ? "http://www.xiaoquan.site" : "http://www.xiaoquan.site", //远程
  // BASE_URL: config.debug ? "http://192.168.1.7:8080" : "http://192.168.1.7:8080", //本地
  BASE_URL: config.debug ? "http://116.62.14.183:9090" : "http://116.62.14.183:9090", //远程
  // BASE_URL: config.debug ? "http://47.111.147.138:8080" : "http://47.111.147.138:8080",


    //taobanban
    //上传单个图片
    POST_ONE_IMG: "/images/upload",

  //获取手机号验证码
  POST_PHONE_CODE: "/customer/phoneCode/get",

  //用手机号快捷登录、注册
  POST_PHONE_LOGIN: "/customer/login/phone",

  //企业-发布项目信息
  POST_PROJECT_INFO: "/enterprise/projectRequirement/add",

  //企业-获取工程类型
  GET_PROJECT_TYPE: "/projectType/list",

  //获取地区
  POST_CITY_REGION: "/region/list",

  //企业-获取工种
  GET_WORKER_TYPE: "/workType/list",

  //企业- 班组搜索
  POST_TEAMS_SEARCH: "/team/search",

  //企业-班组-客户基本信息获取
  POST_TEAMS_CUSTOMER_BASE: "/customer/get",

  //企业-班组-班组基本信息获取
  POST_TEAMS_CUSTOMER_INFO: "/team/get",

  //企业-班组-班组信息回显
  GET_TEAM_CUSTOMER_INFO: "/team/getBase",

  //企业-班组-班组承包能力信息获取
  POST_TEAMS_CUSTOMER_ABILITY: "/team/ability/get",

  //企业-班组-客户项目经验信息获取
  POST_TEAMS_CUSTOMER_PROJECT: "/team/project/list",

  //企业-班组-获取联系方式
  POST_CUSTOMER_PHONE: "/customer/phone",

  //企业-邀请列表获取
  POST_CUSTOMER_INVITE_LIST: "/enterprise/projectRequirement/invite/list",

  //企业-提交项目邀请列表
  POST_CUSTOMER_INVITE_PROJECTS: "/enterprise/projectRequirement/inviteTeam",

  //企业-服务记录列表
  POST_SERVICE_RECORD_LIST: "/enterprise/projectRequirement/list",

  //企业-服务记录-项目发布状态
  POST_SERVICE_RECORD_STATUS: "/enterprise/projectRequirement/issueStatus",

  //企业-服务记录列表-置顶
  POST_SERVICE_RECORD_TOP: "/enterprise/projectRequirement/refresh",

  //企业-服务记录列表-项目详情
  POST_PROJECT_REQUIREMENT_GET: "/enterprise/projectRequirement/get",

  //企业-服务记录-报名记录
  POST_PROJECT_TEAMS_GET: '/enterprise/projectRequirement/sign/list',

  //企业-服务记录-标记班组是否合适
  POST_TEAM_IS_SUIT: "/enterprise/projectRequirement/suit",

  //企业-服务记录-需求引进成功或失败标记
  POST_PROJECT_RESULT_PUSH: "/enterprise/projectRequirement/recommendStatus",

  //企业-服务记录-班组结果上传-班组列表
  POST_TEAM_SUIT_LIST: "/enterprise/projectRequirement/suit/list",

  //企业-服务记录-班组结果上传-上传
  POST_TEAM_RESULT_PUBLISH: "/enterprise/projectRequirement/recommend",

  //企业-服务记录-资料结果上传-班组概况
  POST_PROJECT_TEAMS_INFO: '/enterprise/projectRequirement/team/list',

  //企业-服务记录-资料结果上传-资料获取
  POST_PROJECT_TEAMS_IMG: '/enterprise/projectRequirement/serviceImg/get',

  //企业-服务记录-上传结果-提交资料
  POST_PROJECT_TEAMS_IMG_SAVE: "/enterprise/projectRequirement/serviceImg/update",

  //班组-招工人-我的招工列表获取
  POST_PUBLISH_LIST: "/team/workerRequirement/list",

  //班组-招工人-我的招工-发布-新增
  POST_WORKER_REQUIREMENT_ADD: "/team/workerRequirement/add",

  //班组-招工人-我的招工-发布-修改
  POST_WORKER_REQUIREMENT_EDIT: "/team/workerRequirement/edit",

  //班组-招工人-我的招工-发布-修改回显
  POST_WORKER_REQUIREMENT_GET: "/team/workerRequirement/detail",

  //班组-招工人-我的招工-刷新
  POST_WORKER_REQUIREMENT_REFRESH: "/team/workerRequirement/refresh",

  //班组-招工人-我的招工-招聘状态修改
  POST_WORKER_REQUIREMENT_STATUS: '/team/workerRequirement/requirementStatus',

  //班组-服务记录-列表获取
  POST_TEAM_SERVICE_LIST: "/team/service/list",

  //班组-服务记录-成功引进-查看结果
  POST_ENTERPRISE_PROJECT_RESULT: '/enterprise/projectRequirementSuit/list',

  //班组-服务记录-删除
  POST_TEAM_SERVICE_DELETE: "/team/service/delete",

  //班组-服务记录-报名
  POST_TEAM_SERVICE_SIGN: "/team/projectRequirement/sign",

  //班组-优质分包-列表查询和筛选
  POST_PROJECT_SEARCH: "/enterprise/projectRequirement/search",

  //班组-报名项目
  POST_PROJECT_TEAM_SIGN_UP: "/team/projectRequirement/sign",

  //班组-项目详情-浏览次数
  POST_PROJECT_PUBLISH_TIMES: "/enterprise/projectRequirement/times",

  //班组-项目详情-发布人
  POST_PROJECT_AUTHOR: "/enterprise/projectRequirement/issuer",

  //班组-项目详情-获取项目发布人联系方式
  POST_PROJECT_CONTACT: '/enterprise/projectRequirement/phone',

  //班组端-优质工人列表获取
  POST_GOOD_WORKER_LIST: "/worker/search",

  //班组端-工人名片-工人基本信息
  POST_WORKER_BASE_INFO: '/team/worker/base',

  //班组端-工人名片-项目列表
  POST_WORKER_PROJECT_LIST: "/worker/project/list",

  //班组端-工人名片-职业技能信息
  POST_WORKER_ABILITY_INFO: "/worker/ability/get",

  //工人端-找活干列表获取
  POST_STAFF_WORK_LIST: "/team/workerRequirement/search",

  //个人中心-基本信息获取
  GET_CUSTOMER_TOKEN: "/customer/token",

  //个人中心-基本信息修改
  POST_EDIT_BASE_INFO: "/customer/edit",

  //获取民族列表
  GET_NATIONAL_LIST: "/national/list",

  //个人中心-实名认证图片验证回显数据
  POST_ID_CARD: "/customer/authentication",

  //个人中-实名认证提交
  POST_CUSTOMER_AUTHENTICATION_UPDATE: "/customer/authentication/update",

  //个人中心-企业认证-企业信息回显
  GET_COMPANY_INFO: "/enterprise/get",

    //个人中心-企业认证-企业信息修改
    POST_COMPANY_INFO_EDIT: '/enterprise/edit',

    //个人中心-班组信息-修改
    POST_TEAM_BASE_INFO_EDIT: '/team/edit',

    //个人中心-班组信息-承包能力修改
    POST_TEAM_ABILITY_EDIT: "/team/ability/edit",

    //个人中心-班组信息-承包能力回显
    POST_TEAM_ABILITY_GET: "/team/ability/get",

    //个人中心-班组信息-项目经验修改
    POST_TEAM_PROJECT_EDIT: "/team/project/edit",

    //个人中心-班组信息-项目经验新增
    POST_TEAM_PROJECT_ADD: '/team/project/add',

    //个人中心-班组信息-项目经验回显
    POST_TEAM_PROJECT_GET: '/team/project/get',

    //个人中心-工人信息-获取
    GET_WORKER_INFO: '/worker/get',

    //个人中心-工人信息-技能信息获取
    POST_STAFF_ABILITY_LIST: '/worker/ability/get',

    //个人中心-工人信息-工人信息修改
    POST_STAFF_INFO_EDIT: '/worker/edit',

    //个人中心-工人信息-技能修改
    POST_STAFF_ABILITY_EDIT: "/worker/ability/edit",

    //个人中心-工人信息-技能回显
    POST_STAFF_ABILITY_GET: '/worker/ability/get',

    //个人中心-工人信息-项目经验回显
    POST_STAFF_PROJECT_GET: '/worker/project/get',

    //个人中心-工人信息-项目经验新增
    POST_STAFF_PROJECT_ADD: '/worker/project/add',

    //个人中心-工人信息-项目经验修改
    POST_STAFF_PROJECT_EDIT: '/worker/project/edit',

}
export default URL;
