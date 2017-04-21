import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {
    it('handle SET_ENTRIES', () => {
        const initialState = Map()
        const action = { type: 'SET_ENTRIES', entries: ['Whiplash'] }
        const nextState = reducer(initialState, action)

        expect(nextState).to.equal(fromJS({
            entries: ['Whiplash']
        }))
    })

    it('handle NEXT', () => {
        const initialState = fromJS({
            entries: ['Whiplash', 'Sing Street']
        })
        const action = { type: 'NEXT' }
        const nextState = reducer(initialState, action)

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Whiplash', 'Sing Street']
            },
            entries: []
        }))
    })

    it('handle VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Whiplash', 'Sing Street']
            },
            entries: []
        })
        const action = { type: 'VOTE', entry: 'Whiplash' }
        const nextState = reducer(initialState, action)

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Whiplash', 'Sing Street'],
                tally: { Whiplash: 1 }
            },
            entries: []
        }))
    })

    it('has an initial state', () => {
        const action = { type: 'SET_ENTRIES', entries: ['test'] }
        const nextState = reducer(undefined, action)

        expect(nextState).to.equal(fromJS({
            entries: ['test']
        }))
    })

    it('can be use with reduce', () => {
        const actions = [
            { type: 'SET_ENTRIES', entries: ['m1', 'm2'] },
            { type: 'NEXT' },
            { type: 'VOTE', entry: 'm1' },
            { type: 'VOTE', entry: 'm1' },
            { type: 'VOTE', entry: 'm2' },
            { type: 'NEXT' }
        ]
        const finalState = actions.reduce(reducer, Map())

        expect(finalState).to.equal(fromJS({
            winner: 'm1'
        }))
    })
})