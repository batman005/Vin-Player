import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware/index.js';
import { composeWithDevTools } from 'redux-devtools-extension';


const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    devTools:composeWithDevTools(),
});

sagaMiddleware.run(rootSaga);

export default Store;