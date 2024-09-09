import Environment from './Environment';

const logConsoleLog = (message: any, ...optionalParams: any[]): void => {
    if (Environment.IS_STAGING) {
        try {
            console.log(message, ...optionalParams);
        } catch (err) {}
    }
};

export { logConsoleLog };
