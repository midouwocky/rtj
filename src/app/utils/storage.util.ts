
export class StorageUtil {

    static getAuthToken(): string {
        return JSON.parse(localStorage.getItem('auth_token'));
    }
    static setAuthToken(user) {
        localStorage.setItem('auth_token', JSON.stringify(user));
    }
}
