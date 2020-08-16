const timestamp = () => {
    const date = new Date();
    const d = date.getDate();
    const mo = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${mo < 10 ? `0${mo}` : mo}/${d < 10 ? `0${d}` : d}/${y} ${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};

let debug = false;

export const Logger = {
    prefix: 'AutumnBot',
    printDate: true,
    print: (data: any, module?: string) => {
        let str = `${data}`;
        str = str.replace(/\n/g, `\n${timestamp()} ${Logger.prefix} | ${module ? `${module} > ` : ''}`);
        console.info(`${timestamp()} ${Logger.prefix} | ${module ? `${module} > ` : ''}${str}`);
    },
    error: (err: Error | string, module?: string) => {
        if (err instanceof Error) err = err.stack || err.message;

        err = err.replace(/\n/g, `\n${timestamp()} ${Logger.prefix} | ${module ? `${module} > ` : ''}ERROR > `);
        console.info(`${timestamp()} ${Logger.prefix} | ${module ? `${module} > ` : ''}ERROR > ${err}`);
    },
    debug: (data: any, module?: string) => {
        if (debug) Logger.print(data, module);
    },
    debugError: (err: Error | string, module?: string) => {
        if (debug) Logger.error(err, module);
    },
    toggleDebug: () => {
        debug = !debug;
        return debug;
    },
    setDebug: (bool: boolean) => {
        debug = bool;
        return debug;
    },
    setPrefix: (prefix: string) => {
        Logger.prefix = prefix;
    },
    setPrintDate: (bool: boolean) => {
        Logger.printDate = bool;
    }
};
