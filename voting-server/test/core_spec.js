import { List, Map } from 'immutable'
import { expect } from 'chai'

import { setEntries } from '../src/core'

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
})