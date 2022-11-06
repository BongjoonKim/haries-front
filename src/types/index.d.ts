interface StoreAction<T> {
    type : T["type"] | string;
    payload ?: T["payload"] | any;
    error ?: boolean;
}

type locale = 'en' | 'ko';