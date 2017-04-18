import { expect } from 'chai'
import { List } from 'immutable'

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1
        }

        it('is immutable', () => {
            let state = 42
            let nextState = increment(state)

            expect(nextState).to.equal(43)
            expect(state).to.equal(42)
        })
    })

    describe('A List', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie)
        }

        it('is imutable', () => {
            let state = List.of('Fast 8', 'Your Name')
            let nextState = addMovie(state, '500 Days of Summer')

            expect(nextState).to.equal(List.of(
                'Fast 8', 'Your Name', '500 Days of Summer'
            ))
            expect(state).to.equal(List.of(
                'Fast 8', 'Your Name'
            ))
        })
    })
})