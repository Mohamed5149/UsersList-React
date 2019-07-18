import * as actionTypes from './actions/Actiontypes';

const initialState =
{
    users: [{
        id: 1,
        name: "ahmed",
        email: "a@test.com",
        phone: 4353453543,
        status: "active"
    },
    {
        name: "omar",
        id: 2,
        email: "a@test.com",
        phone: 372636722,
        status: "active"
    },
    {
        name: "ali",
        id: 3,
        email: "c@test.com",
        phone: 82736,
        status: "soft_deleted"
    }, {
        id: 4,
        name: "ahmed",
        email: "a@test.com",
        phone: 4353453543,
        status: "active"
    },
    {
        name: "omar",
        id: 5,
        email: "a@test.com",
        phone: 372636722,
        status: "active"
    },
    {
        name: "ali",
        id: 6,
        email: "c@test.com",
        phone: 82736,
        status: "soft_deleted"
    }
    ],
    currentPage: 1,
    usersPerPage: 2
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INITUSERS:
            return {
                ...state
            }

        case actionTypes.CHANGEPAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case actionTypes.INCREASEPAGE:
            let currentPageCopyI = state.currentPage;
            if (currentPageCopyI < (Math.ceil(state.products.length / state.productsPerPage))) {
                currentPageCopyI += 1;
            }
            return {
                ...state,
                currentPage: currentPageCopyI
            }
        case actionTypes.DECREASEPAGE:
            let currentPageCopyD = state.currentPage;
            if (currentPageCopyD > 1) {
                currentPageCopyD -= 1;
            }
            return {
                ...state,
                currentPage: currentPageCopyD
            }

        default:
            return state;
    }
}

export default reducer;