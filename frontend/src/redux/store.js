// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import jwtReducer from './slices/storeJwt/storeJwt'; // Import the reducer
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import toastReducer from './slices/storeJwt/toastSlice'; // Import the toastReducer
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Uses localStorage

// Combine all reducers
const rootReducer = combineReducers({
    auth: jwtReducer, // Reducer for authentication
    toast: toastReducer, // Reducer for toast notifications
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: {
//         auth: jwtReducer, // Use the reducer here
//     },
// });


const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;

