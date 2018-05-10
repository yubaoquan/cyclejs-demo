/*
 * Created on Fri Apr 20 2018
 * @author yubaoquan
 * @description tab 组件
 */

import { a, br, i, span, ul, li } from '@cycle/dom'


function mapState(props$) {
    return props$
        .map(props => {
            return {
                extendClass: props.extendClass || ``,
                tabs: props.modules || [],
                activeIndex: props.activeIndex,
            }
        })
}

function intent(sources) {
    return sources.DOM.select(`.tab`).events(`click`).map(e => {
        const tabIndex = e.currentTarget.getAttribute(`index`)
        return +tabIndex
    }).startWith(sources.defaultState.tab.activeIndex)
}

function model(props$, actions$) {
    return props$.map(props => {
        return actions$.map(activeIndex => {
            props.activeIndex = activeIndex
            props.currentTab = props.tabs[activeIndex]
            return props
        })
    })
        .flatten() // comment this line to see the error
        // http://staltz.github.io/xstream/#remember
        .remember() // comment this line to see the white screen
}

function view(state$) {
    return state$.map(state => {
        return ul(`.u-tabs`, {
            attrs: { ref: `tabs` },
            style: {
                display: `flex`,
                'list-style': `none`,
            },
        }, state.tabs.map((tab, tabIndex) => {
            const isActive = tabIndex === state.activeIndex
            return li(`.tab`, {
                attrs: {
                    index: tabIndex,
                },
                style: {
                    margin: '0 10px',
                    fontWeight: isActive ? 'bold' : 'normal',
                    backgroundColor: isActive ? 'green' : '#ddd',
                    color: isActive ? '#fff' : '#000',
                    padding: '5px 10px',
                },
            }, [
                a({
                    attrs: {
                        class: isActive ? `tabbtn active` : `tabbtn`,
                        index: tabIndex,
                    },
                }, [
                    i({ attrs: { class: tab.class } }),
                    span(
                        { attrs: { class: tab.fontClass } },
                        getTabNameHTML(tab)
                    ),
                ]),
            ])
        }))
    })
}

function getTabNameHTML(tab) {
    let multiLineName
    const brText = `<br>`
    if (tab.name.indexOf(brText) > -1) {
        multiLineName = tab.name.split(brText)
    }
    if (multiLineName) {
        const arr = []
        multiLineName.forEach((line, index) => {
            arr.push(line)
            if (index < multiLineName.length - 1) {
                arr.push(br())
            }
        })
        return arr
    }
    return tab.name
}

export default function main(sources) {
    const initState$ = mapState(sources.props$)
    const actions$ = intent(sources)
    const state$ = model(initState$, actions$)

    return {
        DOM: view(state$),
        value: state$.map(state => {
            return {
                type: `tab`,
                value: state.currentTab,
                tabIndex: state.activeIndex,
            }
        }),
    }
}