/*
 * Created on Mon Apr 23 2018
 * @author yubaoquan
 * @description initial data for the whole app
 */

export default {
    banners: window.banners,
    modules: [
        {
            name: `话费流量`,
            class: `icon-1`,
            module: `Phone`,
        }, {
            name: `游戏点卡`,
            class: `icon-2`,
            module: `Card`,
        }, {
            name: `视频充值`,
            class: `icon-4`,
            module: `Video`,
        }, {
            name: `AppStore<br>充值码`,
            class: `icon-3`,
            fontClass: `appstore`,
            module: `AppStore`,
        },
    ],
    tab: {
        extendClass: `tabs-1`,
        activeIndex: 2,
    },
    msg: {
        foo: null,
    },
    fooData: {
        text: `aaa`,
        text2: `bbb`,
    },
}