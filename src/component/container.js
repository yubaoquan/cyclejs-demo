/*
 * Created on Wed Apr 25 2018
 * @author yubaoquan
 * @description ---
 */

import xs from 'xstream'
import isolate from '@cycle/isolate'
import { div } from '@cycle/dom'

import reducer from '../reducer'

import Tab from './tab'
import Foo from './foo'
import Form from './form'
import Ajax from './ajax'

function model(props$, sinks, initData) {
    const value$ = xs.merge.apply(null,
        sinks.map(sink => {
            return sink.value
        })
    )

    return value$.map(msg => {
        return props$.map(props => {
            return reducer(props, msg)
        })
    }).flatten().startWith(initData)
}

function view(state$, sinks) {
    const toCombine = sinks.map(sink => sink.DOM)
    toCombine.unshift(state$)

    return xs.combine(...toCombine)
        .map(arr => {
            const [state, tab, foo, foo2, form, ajax] = arr
            return div([
                div(`.m-allTabs`, [
                    tab,
                    div(`current tab index: ${state.tab.activeIndex}`),
                    state.tab.activeIndex === 0 ? foo : null,
                    state.tab.activeIndex === 0 ? foo2 : null,
                    state.tab.activeIndex === 1 ? form : null,
                    state.tab.activeIndex === 2 ? ajax : null,
                ]),
                div(`#game-selector-inject`),
                div(`.n-allSubmit`),
            ])
        })
}


export default function main(sources) {
    const Tab1 = isolate(Tab, `tab`)

    const tabSink = Tab1({
        DOM: sources.DOM,
        props$: sources.props$.map(props => {
            return props
        }),
        defaultState: sources.initData,
    })
    const Foo1 = isolate(Foo, `1`)
    const Foo2 = isolate(Foo, `2`)
    const fooSink = Foo1({
        DOM: sources.DOM,
        props$: sources.props$.map(props => {
            return Object.assign({
                btnName: `按钮1`,
                text: props.fooData.text,
                type: 1,
                color: `green`,
            }, props)
        }),
        defaultState: {
            text: `111`,
        },
    })
    const fooSink2 = Foo2({
        DOM: sources.DOM,
        props$: sources.props$.map(props => {
            return Object.assign({
                btnName: `按钮2`,
                text: props.fooData.text2,
                type: 2,
            }, props)
        }),
        defaultState: {
            text: `222`,
        },
    })

    const Form1 = isolate(Form, `form1`)
    const formSink = Form1({
        DOM: sources.DOM,
        props$: sources.props$.map(props => {
            return props
        }),
        defaultState: {
            name: `anonymous`,
            age: 0,
        },
    })

    const Ajax1 = isolate(Ajax, `ajax`)
    const ajaxSink = Ajax1({
        DOM: sources.DOM,
        props$: sources.props$.map(props => {
            return props
        }),
        HTTP: sources.HTTP,
    })

    const sinks = [tabSink, fooSink, fooSink2, formSink, ajaxSink]

    const state$ = model(sources.props$, sinks, sources.initData)

    return {
        DOM: view(state$, sinks),
        HTTP: ajaxSink.HTTP,
    }
}