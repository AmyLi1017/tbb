import fly from './client'
import URL from './const'
import qs from 'qs'
import store from '@/store/index'

let api = {

//taobanban--------------------------------------------------------
    //单个上图片
    postOneImg(formData){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_ONE_IMG,formData).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },


    //获取手机号验证码
    getPhoneCheckCode(phone,randomValue){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PHONE_CODE,{phone: phone, randomValue:randomValue}).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //手机号快捷登录、注册
    postPhoneLogin(phone, phoneCode, randomValue){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PHONE_LOGIN, { phone: phone, phoneCode: phoneCode, randomValue: randomValue, }).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-发布项目劳务需求
    postProjectInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_INFO, { projectName: obj.projectName, provinceId: obj.provinceId, provinceName: obj.provinceName,
                cityId: obj.cityId, cityName: obj.cityName, detailAddr: obj.detailAddr, typeId: obj.typeId, typeName: obj.typeName, description: obj.description,
                endTime: obj.endTime, places: obj.places, files: obj.files
            }).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-获取工程类型
    getProjectType() {
        return new Promise((resolve, reject) => {
            fly.get(URL.GET_PROJECT_TYPE).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //获取地区
    postRegion(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_CITY_REGION, {level: obj.level,parentId:obj.proId}).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-获取工种
    getWorkerType(){
        return new Promise((resolve, reject) => {
            fly.get(URL.GET_WORKER_TYPE).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业- 班组搜索
    postTeamsSearch(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAMS_SEARCH, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-班组-客户基本信息获取
    postTeamCustomerBase(){
        return new Promise((resolve, reject) => {
            fly.get(URL.POST_TEAMS_CUSTOMER_BASE).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-班组-班组基本信息获取
    postTeamCustomerInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAMS_CUSTOMER_INFO, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-班组-班组承包能力信息获取
    postTeamCustomerAbility(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAMS_CUSTOMER_ABILITY, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-班组-客户项目经验信息获取
    postTeamCustomerProject(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAMS_CUSTOMER_PROJECT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res.msg)
                }
            }).catch(error => {
                console.error(error)
                reject("网络错误")
            })
        })
    },

    //企业-班组-获取联系方式
    postCustomerPhone(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_CUSTOMER_PHONE, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-邀请列表获取
    postCustomerInviteList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_CUSTOMER_INVITE_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-提交项目邀请列表
    postCustomerInviteProjects(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_CUSTOMER_INVITE_PROJECTS, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录列表
    postServiceRecordList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_SERVICE_RECORD_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-项目发布状态
    postServiceRecordStatus(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_SERVICE_RECORD_STATUS, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录列表--置顶
    postServiceRecordTop(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_SERVICE_RECORD_TOP, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录列表-项目详情
    postProjectRequirement(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_REQUIREMENT_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-报名记录
    postProjectTeamsGet(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_TEAMS_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-标记班组是否合适
    postTeamIsSuit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_IS_SUIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-上传结果-班组概况
    postProjectTeamsInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_TEAMS_INFO, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-上传结果-资料获取
    POST_PROJECT_TEAMS_IMG: '/enterprise/projectRequirement/serviceImg/get',
    postProjectTeamsImg(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_TEAMS_IMG, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-上传结果-提交资料
    postProjectTeamsImgSave(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_TEAMS_IMG_SAVE, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-班组结果上传-班组列表
    postTeamSuitList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_SUIT_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //企业-服务记录-班组结果上传-上传
    POST_TEAM_RESULT_PUBLISH: "/enterprise/projectRequirement/recommend",
    postTeamResultPublish(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_RESULT_PUBLISH, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-招工人-我的招工列表获取
    postPublishList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PUBLISH_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-招工人-我的招工-发布-新增
    postWorkerRequirementAdd(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_REQUIREMENT_ADD, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-招工人-我的招工-发布-修改
    postWorkerRequirementEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_REQUIREMENT_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-招工人-我的招工-发布-修改回显
    postWorkerRequirementGet(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_REQUIREMENT_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-招工人-我的招工-刷新
    postWorkerRequirementRefresh(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_REQUIREMENT_REFRESH, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-招工人-我的招工-招聘状态修改
    postWorkerRequirementStatus(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_REQUIREMENT_STATUS, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-服务记录-列表获取
    postTeamServiceList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_SERVICE_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-服务记录-成功引进-查看结果
    postEnterpriseProjectResult(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_ENTERPRISE_PROJECT_RESULT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-服务记录-删除
    postTeamServiceDelete(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_SERVICE_DELETE, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-服务记录-报名
    postTeamServiceSign(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_SERVICE_SIGN, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-优质分包-列表查询和筛选
    postProjectSearch(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_SEARCH, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-报名项目
    postProjectTeamSignUp(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_TEAM_SIGN_UP, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-项目详情-浏览次数
    postProjectPublishTimes(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_PUBLISH_TIMES, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-项目详情-发布人
    postProjectAuthor(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_AUTHOR, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组-项目详情-获取项目发布人联系方式
    postProjectContact(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_PROJECT_CONTACT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组端-优质工人列表获取
    postGoodWorkerList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_GOOD_WORKER_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组端-工人名片-工人基本信息
    postWorkerBaseInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_BASE_INFO, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组端-工人名片-项目列表
    postWorkerProjectList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_PROJECT_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //班组端-工人名片-职业技能信息
    postWorkerAbilityInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_WORKER_ABILITY_INFO, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //工人端-找活干列表获取
    postStaffWorkList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_WORK_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-基本信息获取
    getCustomerToken(){
        return new Promise((resolve, reject) => {
            fly.get(URL.GET_CUSTOMER_TOKEN).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-基本信息修改
    postEditBaseInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_EDIT_BASE_INFO, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //获取民族列表
    getNationalList(){
        return new Promise((resolve, reject) => {
            fly.get(URL.GET_NATIONAL_LIST).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-实名认证图片识别
    postIdCard(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_ID_CARD, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中-实名认证提交
    postCustomerAuthenticationUpdate(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_CUSTOMER_AUTHENTICATION_UPDATE, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-企业认证-企业信息回显
    getCenterCompanyInfo(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.GET_COMPANY_INFO, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-企业认证-企业信息修改
    postCompanyInfoEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_COMPANY_INFO_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-班组信息-修改
    postTeamBaseInfoEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_BASE_INFO_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-班组信息-承包能力回显
    POST_TEAM_ABILITY_GET: "",//待修改-------------------------
    postTeamAbilityGet(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_ABILITY_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-班组信息-承包能力修改
    postTeamAbilityEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_ABILITY_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-班组信息-项目经验新增
    postTeamProjectAdd(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_PROJECT_ADD, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-班组信息-项目经验修改
    postTeamProjectEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_PROJECT_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-班组信息-项目经验回显
    postTeamProjectGet(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_TEAM_PROJECT_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-获取
    getWorkerInfo(){
        return new Promise((resolve, reject) => {
            fly.get(URL.GET_WORKER_INFO).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-技能信息获取
    postStaffAbilityList(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_ABILITY_LIST, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-工人信息修改
    postStaffInfoEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_INFO_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-技能修改
    postStaffAbilityEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_ABILITY_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-技能回显
    postStaffAbilityGet(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_ABILITY_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-项目经验回显
    postStaffProjectGet(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_PROJECT_GET, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-项目经验新增
    postStaffProjectAdd(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_PROJECT_ADD, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },

    //个人中心-工人信息-项目经验修改
    postStaffProjectEdit(obj){
        return new Promise((resolve, reject) => {
            fly.post(URL.POST_STAFF_PROJECT_EDIT, obj).then(res => {
                if (res.messageId == 1000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(error => {
                console.error(error);
                reject("网络错误")
            })
        })
    },















//zhuzhixiao-----------------------------------------------------------
  loadHotCompany() {
    return new Promise((resolve, reject) => {
      fly.get(URL.HOT_COMPANY).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })

  },
  //微信手机号-返回是否注册+用户信息
  login(code, encryptedData, iv, cloudID) {
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_USER_INFO, { code: code, encryptedData: encryptedData, iv: iv, cloudID:cloudID }).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //token快捷注册
  token_register() {
    return new Promise((resolve, reject) => {
      fly.get(URL.POST_TOKEN_REGISTER).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //检查手机号是否注册
  testRegister(account) {
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_IS_REGISTER,{account: account}).then(res => {
        console.log(res)
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },


  //账号登录
  accountLogin(account,password){
    return new Promise((resolve, reject) => {
      fly.post(URL.POST_ACCOUNT_LOGIN, { account: account, password: password}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.zhError)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //活动相关-领取vip7天
  activityVip(){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_ACTIVITY_VIP).then(res => {
        resolve(res)
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //用户信息回显
  echoUserInfo(){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_ECHO_USER_INFO).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.zhError)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //编辑用户信息
  editUserInfo(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.POST_EDIT_USER_INFO, data).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取用户基本信息
  loadCustomersInfo(){
    return new Promise((resolve, reject) => {
      fly.get(URL.LOAD_CUSTOMERS_INFO).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取浏览历史
  getMyHistory(pageSize,pageIndex){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_MY_HISTORY, {page_size: pageSize,page_index: pageIndex}).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.zhError)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业收藏列表
  getMyCollect(pageSize,pageIndex){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_MY_COLLECT, {page_size: pageSize,page_index: pageIndex}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.zhError)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //收藏企业
  MyCollectChange(company_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_CANCEL_MY_COLLECT, {company_id: company_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //取消收藏企业
  cancelCollect(company_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.CANCEL_MY_COLLECT, {company_id: company_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取地区
  loadProvince() {
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_PROVINCE).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取定位
  loadLocation() {
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_LOCATION).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //企业搜索
  searchCompany(keyword, province, pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SEARCH_COMPANY, {
        company_name: keyword,
        province_id: province,
        page_index: pageIndex,
        page_size: pageSize
      }).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业下头部基本信息
  getCompanyInfo(company_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_COMPANY_BASICTOP_INFO, {company_id: company_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商基本信息
  getCompanyGSBasicInfo(company_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_COMPANY_GS_BASIC_INFO, {company_id: company_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商股权结构信息
  getCompanyGSEquityInfo(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_GS_EQUITY_LIST_INFO, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商变更记录信息
  getCompanyGSChangeInfo(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_GS_CHANGE_LIST_INFO, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商高管列表信息
  getCompanyGSMainMembersInfo(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_GS_MAIN_MEMBERS_LIST_INFO, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商分支机构信息
  getCompanyGSBranchInfo(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_GS_BRANCH_LIST_INFO, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商经营异常信息
  getCompanyGSAbnormalInfo(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_GS_ABNORMAL_LIST_INFO, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业工商联系方式信息
  getCompanyGSContactInfo(company_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_COMPANY_GS_CONTACT_INFO, {company_id: company_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业下备案小列表
  getCompanyRecordList(company_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_COMPANY_RECORD_LIST, {company_id: company_id}).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业下资质小列表
  getCompanyCertList(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_CERT_LIST, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 3001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业下人员小列表
  getCompanyStaffList(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_STAFF_LIST, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取人员信息-注册证书
  getStaffCertList(staff_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_STAFF_CERT_LIST, {staff_id: staff_id}).then(res => {
        if (res.messageId == 1000 || res.messageId == 3001 || res.messageId == 3002 || res.messageId == 3003) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取人员信息-个人业绩
  getStaffProList(data){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_STAFF_PRO_LIST, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 3001 || res.messageId == 3002 || res.messageId == 3003) {
          resolve(res)
        } else {
          reject(res.msg)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取人员信息-变更记录
  getStaffChangeList(staff_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_STAFF_CHANGE_LIST, {staff_id: staff_id}).then(res => {
        if (res.messageId == 1000 || res.messageId == 3001 || res.messageId == 3002 || res.messageId == 3003) {
          resolve(res)
        } else {
          reject(res)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取企业下业绩列表
  getCompanyProList(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.GET_COMPANY_PRO_LIST, data).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }

      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //四库一相关 --业绩基本信息
  achieveMultiple(projectId) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_MULTIPLY, { project_id: projectId}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩招投标列表
  achieveBidList(data) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SKY_ACHIEVE_BIDLIST, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩招投标详情
  achieveBidInfo(id) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_BIDINFO,{bid_id:id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩施工图纸审查列表
  achieveExamineList(data) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SKY_ACHIEVE_EXAMINELIST,data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩施工图纸审查详情
  achieveExamineInfo(id) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_EXAMINEINFO,{review_id:id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩合同备案列表
  achieveContractList(data) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SKY_ACHIEVE_CONTRACTLIST,data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩合同备案详情
  achieveContractInfo(id) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_CONTRACTINFO,{contract_id:id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩施工许可证列表
  achieveLicenseList(data) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SKY_ACHIEVE_LICENSELIST,data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩施工许可证详情
  achieveLicenseInfo(id) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_LICENSEINFO,{licence_id:id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩竣工验收列表
  achieveFinishList(data) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SKY_ACHIEVE_FINISHLIST,data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.code)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩竣工验收详情
  achieveFinishInfo(id) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_FINISEHINFO,{complete_id:id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },
  //四库一相关 --业绩企业主体信息
  achieveCompanyList(params) {
    return new Promise((resolve, reject) => {
      fly.get(URL.SKY_ACHIEVE_COMPANYLIST,params).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  },

  //人员搜索
  searchStaff(keyword, province, category, pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      fly.post(URL.SEARCH_STAFF, {
        staff_name: keyword,
        province_id: province,
        level_type: category,
        page_index: pageIndex,
        page_size: pageSize
      }).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取区域城市列表
  loadApartCity(region_type){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_APART_CITY, {region_type: region_type}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取注册类别列表
  loadCategory(parent_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_GATEGORY,{parent_id: parent_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取资质类别
  getCerts(parent_id){
    return new Promise((resolve, reject) => {
      fly.get(URL.GET_CERT,{parent_id:parent_id}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },

  //获取资质搜索结果
  loadSearchCertsList(data){
    return new Promise((resolve, reject) => {
      fly.post(URL.LOAD_SEARCH_CERTS_LIST, data).then(res => {
        if (res.messageId == 1000 || res.messageId == 2001) {
          resolve(res)
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },
  //获取vip套餐列表
  loadServiceList(level){
    return new Promise((resolve, reject) => {
      fly.get(URL.LOAD_SERVICE_LIST, {vip_level:level}).then(res => {
        if (res.messageId == 1000) {
          resolve(res)
        } else {
          reject(res.zhError)
        }
      }).catch(error => {
        console.error(error)
        reject("网络错误")
      })
    })
  },
}
export default api
