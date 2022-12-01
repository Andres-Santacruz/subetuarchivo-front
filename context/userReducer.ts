import { AuthStateProp, IUsuario } from "../constant/types/interfaces";

type actionType =
  | { type: "signIn"; payload: { token: string; user: IUsuario } }
  | { type: "logOut" }
  | { type: "error"; payload: string }
  | { type: "removeError" }
  | { type: "notAutenticated" };


export const userReducer = (state: AuthStateProp, action: actionType ) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        status: "autenticated",
        errorMessage: "",
      };
    default:
      return state
  }
}
