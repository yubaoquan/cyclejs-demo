/*
 * Created on Tue Apr 24 2018
 * @author yubaoquan
 * @description 网络请求 demo
 */

import xs from 'xstream'

import { div, button } from '@cycle/dom'

function model(sources) {
    return sources.HTTP.select(`users`)
        .flatten()
        .map(res => {
            console.info(`res`, res.body)
            return { data: res.body }
        })
}

function view(state$, sources) {
    return state$.startWith({ data: null })
        .map(state =>
            div([
                button(`.req-btn`, {
                    style: {
                        margin: `10px`,
                        padding: `5px 10px`,
                        border: `1px solid black`,
                        borderRadius: `5px`,
                    },
                }, `发请求`),
                state.data ? div(`.result`, JSON.stringify(state.data)) : null,
            ])
        )
}

export default function main(sources) {
    const actions$ = sources.DOM.select(`.req-btn`).events(`click`)
        .map(() => {
            console.info(`send ajax`)
            return {
                url: `https://jsonplaceholder.typicode.com/users/1`,
                category: `users`,
                method: `GET`,
            }
        })
    const state$ = model(sources)

    return {
        DOM: view(state$, sources),
        value: xs.of({
            type: `ajax`,
        }),
        HTTP: actions$,
    }
}