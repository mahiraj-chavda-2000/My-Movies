export const ADD_USER = "ADD_USER";
export const DEL_USER = "DEL_USER";


export function addUser(user) {
  return {
    type: ADD_USER,
    payload: user,
  };
}


export function deluser(userId) {
  return {
    type: DEL_USER,
    payload: userId,
  };
}
