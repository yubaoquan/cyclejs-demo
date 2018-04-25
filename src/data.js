/*
 * Created on Mon Apr 23 2018
 * @author yubaoquan
 * @description initial data for the whole app
 */

export default {
    banners: window.banners,
    modules: [
        {
            name: `Tab-a`,
            class: `icon-1`,
            module: `Phone`,
        }, {
            name: `Tab-b`,
            class: `icon-2`,
            module: `Card`,
        }, {
            name: `Tab-c`,
            class: `icon-4`,
            module: `Video`,
        }, {
            name: `AppStore<br>recharge`,
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