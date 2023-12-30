import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import moduleCourses from "./moduleCourses"

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['updateId', 'resetId', 'register'],
};

const persistedReducer = persistReducer(persistConfig, moduleCourses);


const store = configureStore({
    reducer: {
        module: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});

export const persistor = persistStore(store);
export default store;