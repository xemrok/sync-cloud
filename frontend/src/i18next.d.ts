import 'i18next';

/**
 * Fucking idiots who develop this library have invented another "improvement"!
 * https://github.com/i18next/react-i18next/issues/1559
 * **/

declare module 'i18next' {
    interface CustomTypeOptions {
        returnNull: false;
    }
}
