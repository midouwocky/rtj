const serverUrl = 'http://young-scrubland-57448.herokuapp.com/api/v2';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyC5kr77VEU-FnklR5DBn3bPwmtmpEjYde4',
    authDomain: 'embryo-version-2.firebaseapp.com',
    databaseURL: 'https://embryo-version-2.firebaseio.com',
    projectId: 'embryo-version-2',
    storageBucket: 'embryo-version-2.appspot.com',
    messagingSenderId: '73552048992'
  },
  endpoints: {
    PRODUCTS: serverUrl + '/api/v2/storefront/products',
    loginUrl: '/spree_oauth/token',
    accountUrl: '/api/v2/storefront/account'
  }
};
