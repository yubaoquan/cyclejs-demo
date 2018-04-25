/*
 * Created on Fri Apr 20 2018
 * @author yubaoquan
 * @description Foo 组件
 */

import { div, button } from '@cycle/dom'

function intent(sources) {
    return sources.DOM.select(`.foo-btn`).events(`click`)
        .map(() => ({ value: new Date().getSeconds() }))
        .startWith({ value: sources.defaultState.text })
}

function model(props$, actions$) {
    return props$.map(props =>
        actions$.map(msg => ({
            type: props.type,
            text: msg.value,
            btnName: props.btnName,
            color: props.color || `red`,
        }))
    ).flatten().remember()
}

function view(state$, sources) {
    return state$.map(state =>
        div([
            div({
                style: {
                    color: state.color,
                    fontWeight: `bold`,
                    fontSize: `20px`,
                },
            }, `this is foo, my value is ${state.text}`),
            button(`.foo-btn`, {
                style: {
                    margin: `10px`,
                    padding: `5px 10px`,
                    border: `1px solid black`,
                    borderRadius: `5px`,
                },
            }, state.btnName),
        ])
    )
}

export default function main(sources) {
    const actions$ = intent(sources)
    const state$ = model(sources.props$, actions$)

    return {
        DOM: view(state$, sources),
        value: state$.map(state => ({
            type: state.type,
            value: state.text,
        })),
    }
}