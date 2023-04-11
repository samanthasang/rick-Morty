import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import rootReduser from "./redux/root-reducer";

const middleware = [];

export const store = createStore(
  rootReduser,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// export default { store, persistor };
