import * as actionTypes from './actions/Actiontypes';

const initialState =
{
    users: [{
        id: 1,
        name: "ahmed",
        email: "a@test.com",
        phone: 4353453543,
        status: "Active",
        role: "User"
    },
    {
        name: "omar",
        id: 2,
        email: "a@test.com",
        phone: 372636722,
        status: "Active",
        role: "User"
    },
    {
        name: "ali",
        id: 3,
        email: "c@test.com",
        phone: 82736,
        status: "Soft_Deleted",
        role: "User"
    }
    ],
    currentPage: 1,
    usersPerPage: 3
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INITUSERS:
            return {
                ...state
            }

        case actionTypes.SAVEUSER:
            let usersCopy = [...state.users];
            let user = {};
            user = action.user;
            user.id = usersCopy.length + 1;
            usersCopy.push(user);
            return {
                ...state,
                users: usersCopy
            }

        case actionTypes.EDITUSER:
            let usersC = [...state.users];
            let userIndex = usersC.findIndex(user => user.id == action.user.id);
            usersC[userIndex] = { ...action.user };
            return {
                ...state,
                users: usersC
            }

        case actionTypes.DELETEUSER:
            let usersCopyDeletion = [...state.users];
            let userIndexDeletion = usersCopyDeletion.findIndex(user => user.id === action.userId)
            usersCopyDeletion.splice(userIndexDeletion,1);

            return{
                ...state,
                users:usersCopyDeletion
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