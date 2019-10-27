
export class StorageUtil {

    static getAuthToken(): string {
        const authObject = this.getAuthObject();
         if (authObject) {
            return authObject.access_token;
         } else {
             return null;
         }
    }
    static removeAuthToken() {
        localStorage.removeItem('auth_token');
    }

    static getAuthObject(): any {
        return JSON.parse(localStorage.getItem('auth_object'));
    }

    static setAuthObject(authObject: any) {
        localStorage.setItem('auth_object', JSON.stringify(authObject));
    }
    static removeAuthObject() {
        localStorage.removeItem('auth_object');
    }
}
