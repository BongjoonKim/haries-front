
const combineReducers = 
    <T, K>(...reducers: ((state: T, action: ReducerAction<K, any, keyof T>) => T)[]) =>
        (prevState: T, newAction: ReducerAction<K, any, keyof T>) =>
            reducers.reduce((newState, reducer) => reducer(newState, newAction), prevState);

export default {combineReducers}