import { VantComponent } from '../common/component';
VantComponent({
    classes: ['hover-class', 'loading-class'],
    data: {
        style: ''
    },
    props: {
        icon: String
    },
    methods: {
        formSubmit(e) {
            console.log('21321')
            console.log('form发生了submit事件，携带数据为：', e.detail.value,typeof e.detail.value)
        }
    }
});
