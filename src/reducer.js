/*
 * Created on Tue Apr 24 2018
 * @author yubaoquan
 * @description ---
 */
export default function reducer(props, msg) {
    console.info(msg)
    const msgValue = msg.value
    if (msg.type === 1) {
        console.info(`message comming from foo component1:${ msgValue}`)
        props.fooData.text = msgValue
        props.msg.foo = ''
    }
    if (msg.type === 2) {
        console.info(`message comming from foo component2: [${ msgValue }]`)
        props.fooData.text2 = msgValue
        props.msg.foo2 = ''
    }
    if (msg.type === 'tab') {
        if (props.tab.activeIndex === msg.tabIndex) {
            console.info('same index')
        } else {
            props.tab.activeIndex = msg.tabIndex
        }
    }
    if (msg.type === 'submit') {
        console.info('validate form data in reducer:', msgValue)
    }

    return props
};