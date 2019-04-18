declare module 'redux-persist-transform-encrypt' {
    import { Transform } from 'redux-persist';
    declare function createEncryptor<S, R>({
        config,
    }: {
        secretKey: string;
        onError: (error: any) => void;
    }): Transform<S, R>;
    export default createEncryptor;
}
