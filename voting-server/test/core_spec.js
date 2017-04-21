import { List, Map } from 'immutable'
import { expect } from 'chai'

import { setEntries, next, vote } from '../src/core'

describe('application logic', () => {
    describe('setEntries', () => {
        it('converts to immutable', () => {
            const state = Map()
            const entries = ['Fast 8', 'Your Name']
            const nextState = setEntries(state, entries)
            expect(nextState).to.equal(Map({
                entries: List.of('Fast 8', 'Your Name')
            }))
        })
    })

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Fast 8', 'Your Name', 'Whiplash')
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({ pair: List.of('Fast 8', 'Your Name') }),
                entries: List.of('Whiplash')
            }))
        })

        it('puts winner of cutrrent vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Fast 8', 'Your Name'),
                    tally: Map({
                        'Fast 8': 4,
                        'Your Name': 2
                    })
                }),
                entries: List.of('Sing Street', 'Butterfly Effect', 'Inside Out')
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sing Street', 'Butterfly Effect')
                }),
                entries: List.of('Inside Out', 'Fast 8')
            }))
        })

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Fast 8', 'Your Name'),
                    tally: Map({
                        'Fast 8': 3,
                        'Your Name': 3
                    })
                }),
                entries: List.of('Sing Street', 'Butterfly Effect', 'Inside Out')
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sing Street', 'Butterfly Effect')
                }),
                entries: List.of('Inside Out', 'Fast 8', 'Your Name')
            }))
        })
    })

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Fast 8', 'Your Name')
            })
            const nextState = vote(state, 'Fast 8')
            expect(nextState).to.equal(Map({
                pair: List.of('Fast 8', 'Your Name'),
                tally: Map({
                    'Fast 8': 1
                })
            }))
        })

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Fast 8', 'Your Name'),
                tally: Map({
                    'Fast 8': 3,
                    'Your Name': 2
                })
            })

            const nextState = vote(state, 'Fast 8')
            expect(nextState).to.equal(Map({
                pair: List.of('Fast 8', 'Your Name'),
                tally: Map({
                    'Fast 8': 4,
                    'Your Name': 2
                })
            }))
        })

        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Fast 8', 'Your Name'),
                    tally: Map({
                        'Fast 8': 4, 'Your Name': 2
                    })
                }),
                entries: List()
            })
            const nextState = next(state)
            expect(nextState).to.equal(Map({
                winner: 'Fast 8'
            }))
        })
    })
})