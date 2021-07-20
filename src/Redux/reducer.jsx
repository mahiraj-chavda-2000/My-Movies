import { ADD_USER, DEL_USER, UP_USER } from "./actions";
import { users } from "./states";
export const reducer = (state = users, action) => {
    let newTodos;
    switch (action.type) {
      
        case ADD_USER:
            let newUsers = [...state]
            newUsers.push(action.payload)
            return newUsers;
   
        case DEL_USER:
            let newUser = [...state]
            newUser = newUser.filter(user => user.id != action.payload)
            return newUser;
    }
    return state;
}
