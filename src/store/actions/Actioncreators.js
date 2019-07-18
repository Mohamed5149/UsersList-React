import * as actionTypes from '../actions/Actiontypes';

export const InitUsers = () => {
    return {
        type: actionTypes.INITUSERS
    }
}

export const Changepage = (page) => {
    return {
        type: actionTypes.CHANGEPAGE,
        currentPage: page
    }
}

export const Increasepage = () => {
    return {
        type: actionTypes.INCREASEPAGE
    }
}

export const Decreasepage = () => {
    return {
        type: actionTypes.DECREASEPAGE
    }
}