export const PATHS = {
    //Open routes
    ROOT: '/',
    AUTH: {
        SIGN_IN: '/signin',
        SIGN_UP: '/signup',
    },
    LOGOUT: '/logout',
    NOT_FOUND: '/not-found',

    //Protected Routes
}

export const OPEN_PATHS = [PATHS.ROOT, PATHS.AUTH.SIGN_IN, PATHS.AUTH.SIGN_UP, PATHS.LOGOUT, PATHS.NOT_FOUND];
