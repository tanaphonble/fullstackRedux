import { next, setEntries, vote } from './core'

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries)
        case 'VOTE':
            return vote(state, action.entry)
        case 'NEXT':
            return next(state)
        default:
            return state
    }
}

export default reducer