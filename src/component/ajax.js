/*
 * Created on Tue Apr 24 2018
 * @author yubaoquan
 * @description 网络请求 demo
 */

import xs from 'xstream'

import { div, button, p } from '@cycle/dom'

function model(sources) {
    const user1$ = sources.HTTP.select(`users`)
        .map(response$ =>
            response$.replaceError(() => xs.of('nework error'))
        )
        .flatten()
        // .startWith({ body: 'init' }) // replace startWith in view method

    const user2$ = sources.HTTP.select(`users2`)
        .map(response$ =>
            response$.replaceError(() => xs.of('nework error'))
        )
        .flatten()
        // .startWith({ body: 'init2' }) // replace startWith in view method

    const ret$ = xs.combine(user1$, user2$).map(([res1, res2]) => {
        // console.info(`res1`, res1)
        // console.info(`res2`, res2)
        return {
            data1: res1.body ? res1.body : 'error',
            data2: res2.body ? res2.body : 'error',
        }
    })

    return ret$

    // return sources.props$.map(props => { // uncomment this to set the user data to container props$
    //     return ret$.map(ret => {
    //         props.user1 = ret.data1
    //         props.user2 = ret.data2
    //         return ret
    //     })
    // }).flatten().remember()
}

// https://cycle.js.org/basic-examples.html#basic-examples-http-requests
/*
However, initially, there won’t be any user$ event, because those only happen when the user clicks. This is the same “conversation initiative” problem we saw in the previous “checkbox” example. So we need to make user$ start with a null user, and in case vdom$ sees a null user, it renders just the button. Otherwise, if we have real user data, we also display their name, their email, and website.
*/

function view(state$, sources) {
    return state$
        .startWith({ // can be replaced by startWith in model method
            data1: null,
            data2: null,
        })
        .map(state =>
            div([
                button(`.req-btn`, {
                    style: {
                        margin: `10px`,
                        padding: `5px 10px`,
                        border: `1px solid black`,
                        borderRadius: `5px`,
                    },
                }, `send request`),
                p({}, 'user1'),
                state.data1 ? div(`.result`, JSON.stringify(state.data1)) : null,
                p({}, 'user2'),
                state.data2 ? div(`.result`, JSON.stringify(state.data2)) : null,
            ])
        )
}

export default function main(sources) {
    const request1$ = sources.DOM.select(`.req-btn`).events(`click`)
        .map(() => {
            return {
                url: `https://jsonplaceholder.typicode.com/users/1`,
                category: `users`,
                method: `GET`,
            }
        })
    // https://cycle.js.org/api/http.html
    const request2$ = sources.HTTP.select(`users`)
        .map(response$ =>
            response$.replaceError(() => xs.of('newwork error'))
        )
        .flatten()
        .map(res => {
            return {
                url: `https://jsonplaceholder.typicode.com/users/2`,
                category: `users2`,
                method: `GET`,
            }
        })
    const state$ = model(sources)

    return {
        DOM: view(state$, sources),
        value: xs.of({
            type: `ajax`,
        }),
        HTTP: xs.merge(request1$, request2$),
    }
}