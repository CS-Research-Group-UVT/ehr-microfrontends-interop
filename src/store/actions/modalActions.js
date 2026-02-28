export const openModal = (payload) => {
    return {
        type: 'OPEN_MODAL',
        payload
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
    }
}

