import { expect } from 'chai'
import { List, Map } from 'immutable'

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

    describe('a tree', () => {
        function addMovie(currentState, movie) {
            return currentState.update(
                'movies',
                movies => movies.push(movie)
            )
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Fast 8', 'Your Name')
            })
            let nextState = addMovie(state, '500 Days of Summer')

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Fast 8', 'Your Name', '500 Days of Summer'
                )
            }))
            expect(state).to.equal(Map({
                movies: List.of(
                    'Fast 8', 'Your Name'
                )
            }))
        })
    })
})