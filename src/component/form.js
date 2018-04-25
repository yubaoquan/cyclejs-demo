/*
 * Created on Fri Apr 20 2018
 * @author yubaoquan
 * @description 表单组件
 */

import xs from 'xstream'
import { div, form, label, span, input, button, p } from '@cycle/dom'


function intent(sources) {
    const name$ = sources.DOM.select(`.name`).events(`input`).map(e => {
        return {
            type: `name`,
            value: e.target.value,
        }
    }).startWith({
        type: `name`,
        value: sources.defaultState.name,
    })
    const age$ = sources.DOM.select(`.age`).events(`input`).map(e => {
        return {
            type: `age`,
            value: e.target.value,
        }
    }).startWith({
        type: `age`,
        value: sources.defaultState.age,
    })
    const submit$ = sources.DOM.select(`.submit`).events(`click`).map(e => {
        return {
            type: `submit`,
        }
    })
    return xs.merge(name$, age$, submit$).map(value => {
        return value
    })
}

function model(props$, actions$) {
    return props$.map(props =>
        actions$.map(msg => {
            switch (msg.type) {
                case `name`:
                    props.name = msg.value
                    if (props.name) {
                        props.needName = false
                    }
                    // console.info('change name');
                    break
                case `age`:
                    props.age = msg.value
                    if (props.age !== ``) {
                        props.needAge = false
                    }
                    // console.info('change age');
                    break
                case `submit`:
                    console.info(`submit: validate inside form component`)
                    props.needName = !props.name
                    props.needAge = props.age == null || props.age === ``
                    break
                default:
                    break
            }
            return {
                msgType: msg.type === `submit` ? `submit` : ``,
                form: {
                    name: props.name,
                    age: props.age,
                },
                needName: props.needName,
                needAge: props.needAge,
            }
        })
    ).flatten().remember()
}

const inputStyle = {
    border: `1px solid black`,
}
const errorTipsStyle = {
    color: `red`,
}
function view(state$, sources) {
    return state$
        .map(state => {
            return div([
                form([
                    div([
                        label(`.name`, [
                            span(`name:`),
                            input(`.name`, {
                                attrs: {
                                    type: `text`,
                                    name: `name`,
                                    value: state.form.name,
                                },
                                style: inputStyle,
                            }),
                            state.needName ? span({
                                style: errorTipsStyle,
                            }, `please input name`) : null,
                        ]),
                    ]),
                    div([
                        label([
                            span(`age:`),
                            input(`.age`, {
                                attrs: {
                                    type: `number`,
                                    name: `age`,
                                    value: state.form.age,
                                },
                                style: inputStyle,
                            }),
                            state.needAge ? span({
                                style: errorTipsStyle,
                            }, `please input age`) : null,
                        ]),
                    ]),
                    button(`.submit`, {
                        style: {
                            margin: `10px`,
                            padding: `5px 10px`,
                            border: `1px solid black`,
                            borderRadius: `5px`,
                        },
                        attrs: {
                            type: `button`,
                        },
                    }, `submit`),
                ]),
                div([
                    p(`name:${ state.form.name}`),
                    p(`age:${ state.form.age}`),
                ]),
            ])
        })
}

export default function main(sources) {
    const actions$ = intent(sources)
    const state$ = model(sources.props$, actions$)

    return {
        DOM: view(state$, sources),
        value: state$.map(state => {
            return {
                type: state.msgType,
                value: state.form,
            }
        }),
    }
}