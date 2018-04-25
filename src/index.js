/*
 * Created on Fri Apr 20 2018
 * @author yubaoquan
 * @description Demo 入口
 */

import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'

import initData from './data'
import Container from './component/container'

function main(sources) {
    const containerSink = Container({
        DOM: sources.DOM,
        props$: xs.of(initData),
        initData: initData,
        HTTP: sources.HTTP,
    })

    return {
        DOM: containerSink.DOM,
        HTTP: containerSink.HTTP,
    }
}

run(main, {
    DOM: makeDOMDriver(`#app`),
    HTTP: makeHTTPDriver(),
})