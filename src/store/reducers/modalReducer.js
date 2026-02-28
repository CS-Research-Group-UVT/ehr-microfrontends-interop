const INITIAL_STATE = {
    isOpen: false,
    payload: null,
}

export const modalReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isOpen: true,
                payload: payload || null,
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                isOpen: false,
                payload: null,
            }
        default:
            return state
    }
}
