import { Credentials, IAuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

export class MockAuthServerProviderService implements IAuthServerProvider {
    getToken = () => 'abc';
    login = (credentials: Credentials) => Observable.empty();
    loginWithToken = (jwt: string, rememberMe: boolean) => Promise.resolve('abc');
    removeAuthTokenFromCaches = () => of(undefined);
    clearCaches = () => of(undefined);
    storeAuthenticationToken = (jwt: string, rememberMe: boolean) => {};
}
