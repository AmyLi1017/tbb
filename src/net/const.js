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
  POST_TEAMS_CUSTOMER_BASE: "/customer/base",

  //企业-班组-班组基本信息获取
  POST_TEAMS_CUSTOMER_INFO: "/team/get",

  //企业-班组-班组承包能力信息获取
  POST_TEAMS_CUSTOMER_ABILITY: "/team/ability",

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
  POST_WORKER_REQUIREMENT_GET: "/team/workerRequirement/get",

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
    POST_STAFF_ABILITY_GET: '',//待修改----------------------

    //个人中心-工人信息-项目经验回显
    POST_STAFF_PROJECT_GET: '/worker/project/get',

    //个人中心-工人信息-项目经验新增
    POST_STAFF_PROJECT_ADD: '/worker/project/add',

    //个人中心-工人信息-项目经验修改
    POST_STAFF_PROJECT_EDIT: '/worker/project/edit',









    //zhuzhixiao-----------------------------------
  //获取热门企业
  HOT_COMPANY: "/company/hot/list",

  //微信获取手机号登录/注册--返回用户信息+是否注册
  GET_USER_INFO: "/customers/login/wx_phone",

  //token快捷注册
  POST_TOKEN_REGISTER: "/customers/register/token",

  //检查手机号是否注册
  GET_IS_REGISTER: "/customers/account/exists",

  //账号登录
  POST_ACCOUNT_LOGIN: "/customers/login/password",

  //活动相关-领取vip7天
  GET_ACTIVITY_VIP: "/activity/newcustomers",

  //获取用户基本信息
  LOAD_CUSTOMERS_INFO: "/customers/get/baseinfo",

  //修改用户信息
  POST_EDIT_USER_INFO: "/customers/update/amendinfo",

  //用户信息回显
  GET_ECHO_USER_INFO: "/customers/get/amendinfo",

  //获取浏览历史列表
  GET_MY_HISTORY: "/customers/company/history/list",

  //获取收藏列表
  GET_MY_COLLECT: "/customers/company/collect/list",

  //收藏企业接口
  GET_CANCEL_MY_COLLECT: "/customers/company/collect",

  //取消企业接口
  CANCEL_MY_COLLECT: "/customers/company/collect/cancel",

  //获取搜索行政区划
  GET_PROVINCE: "/region/province",

  //根据IP获取用户所在地
  GET_LOCATION: "/region/ip",

  //企业库搜索
  SEARCH_COMPANY: "/company/es_search",

  //获取企业下头部基本信息
  GET_COMPANY_BASICTOP_INFO: "/company/base",

  //获取企业工商基本信息
  GET_COMPANY_GS_BASIC_INFO: "/company/base_info",

  //获取企业工商股权结构信息
  GET_COMPANY_GS_EQUITY_LIST_INFO: "/company/equity/list",

  //获取企业工商变更记录信息
  GET_COMPANY_GS_CHANGE_LIST_INFO: "/company/change/list",

  //获取企业工商主要人员/高管信息
  GET_COMPANY_GS_MAIN_MEMBERS_LIST_INFO: "/company/main_members/list",

  //获取企业工商分支机构信息
  GET_COMPANY_GS_BRANCH_LIST_INFO: "/company/branch/list",

  //获取企业工商经营异常信息
  GET_COMPANY_GS_ABNORMAL_LIST_INFO: "/company/business_abnormal/list",

  //获取企业工商联系方式信息
  GET_COMPANY_GS_CONTACT_INFO: "/company/contact",

  //获取企业备案小列表
  GET_COMPANY_RECORD_LIST: "/company/record/list",

  //获取企业下资质小列表
  GET_COMPANY_CERT_LIST: "/company/qualification/list",

  //获取企业下人员小列表
  GET_COMPANY_STAFF_LIST: "/company/staff/list",

  //获取人员信息-注册证书
  GET_STAFF_CERT_LIST: "/staff/cert",

  //获取人员信息-个人业绩
  GET_STAFF_PRO_LIST: "/staff/project/list",

  //获取人员信息-变更记录
  GET_STAFF_CHANGE_LIST: "/staff/change",

  //获取企业下业绩列表
  GET_COMPANY_PRO_LIST: "/company/project/list",

  //业绩详情-基本信息
  SKY_ACHIEVE_MULTIPLY: '/sky/project/basedata',

  //业绩详情-招投标列表
  SKY_ACHIEVE_BIDLIST: '/sky/project/bid/list',

  //业绩详情-招投标详情
  SKY_ACHIEVE_BIDINFO: '/sky/project/bid/detail',

  //业绩详情-施工图纸审查列表
  SKY_ACHIEVE_EXAMINELIST: '/sky/project/review/list',

  //业绩详情-施工图纸审查详情
  SKY_ACHIEVE_EXAMINEINFO: '/sky/project/review/detail',

  //业绩详情-合同备案列表
  SKY_ACHIEVE_CONTRACTLIST: '/sky/project/contract/list',

  //业绩详情-合同备案详情
  SKY_ACHIEVE_CONTRACTINFO: '/sky/project/contract/detail',

  //业绩详情-施工许可证列表
  SKY_ACHIEVE_LICENSELIST: '/sky/project/licence/list',

  //业绩详情-施工许可证详情
  SKY_ACHIEVE_LICENSEINFO: '/sky/project/licence/detail',

  //业绩详情-竣工验收列表
  SKY_ACHIEVE_FINISHLIST: '/sky/project/complete/list',

  //业绩详情-竣工验收详情
  SKY_ACHIEVE_FINISEHINFO: '/sky/project/complete/detail',

  //业绩详情-企业主体信息
  SKY_ACHIEVE_COMPANYLIST: '/sky/companyProject/companyList',

  //人员搜索
  SEARCH_STAFF: "/staff/es_search",

  //获取区域城市列表
  GET_APART_CITY: '/region/province/type',

  //获取注册类别列表
  GET_GATEGORY: '/staff/category',

  //获取资质类别
  GET_CERT: "/qualification/category",

  //获取资质搜索结果
  LOAD_SEARCH_CERTS_LIST: "/qualification/es_search",

  //获取VIP套餐列表
  LOAD_SERVICE_LIST: "/customers/vip/list",

}
export default URL;
