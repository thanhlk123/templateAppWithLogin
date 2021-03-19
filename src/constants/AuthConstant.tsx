export type AuthReducerProps = {
    isLoading: boolean;
    isError: boolean;
    isSignedIn: boolean;
    error: string;
    is401:boolean;
    userInfo?: any
}