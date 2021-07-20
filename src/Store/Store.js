import { createStore } from "redux";
import DataReducer from "./Reducers/DataReducer";

export const Store = createStore(DataReducer);