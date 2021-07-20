import { CREATE_DATA } from "../Actions/PostAction";
const initialState = {
  data: [
    {
      id: 1,
      fullName: "Jonh",
      phoneNumber: "333-962-7516",
      email: "john.chan@email.com",
      password: 12345678,
    },
    {
      id: 2,
      fullName: "Jonh",
      phoneNumber: "333-962-7516",
      email: "john.chan@email.com",
      password: 12345678,
    },
  ],
};
export default function DataReducer(state = initialState, actions) {
    if (actions.type === CREATE_DATA) {
        const dataa = {
            id: Math.random(),
            fullName: "Jonh watson",
            phoneNumber: "333-962-7516",
            email: "john.chan@email.com",
            password: 12345678,
        }
        const data = [...state.data]
        data.push(dataa)
        return {
            ...state,
            data,
        }
    }
    return state;
}