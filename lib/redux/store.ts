import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { basketReducer } from "./basket";
import { favoritesReducer } from "./favorites";

const persistConfig = {
  key: 'root',
  storage,
};


const rootReducer = combineReducers({
  basket: basketReducer,
  favorites:favoritesReducer
});

export type IRootState = ReturnType<typeof rootReducer>

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    
  });
  

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];