import * as actionTypes from '../actions/Actiontypes';

//user actions
export const InitUsers = () => {
    return {
        type: actionTypes.INITUSERS
    }
}

export const saveUser = (user) => {
    return {
        type: actionTypes.SAVEUSER,
        user: user
    }
}

export const editUser = (user) => {
    return {
        type: actionTypes.EDITUSER,
        user: user
    }
}

export const deleteUser = (id) => {
    return {
        type: actionTypes.DELETEUSER,
        userId: id
    }
}

// paging actions
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