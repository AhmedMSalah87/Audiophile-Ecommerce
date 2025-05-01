import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import storage from "./storeEngine";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

// Persist configuration
const persistConfig = {
  key: "root",
  storage, // Saves to localStorage
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Redux Toolkit enforces state immutability and serializability checks by default. The "persist/PERSIST" action from redux-persist contains non-serializable values, so ignoring it prevents unnecessary warnings.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

// For typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
