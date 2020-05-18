export const config: Config = require(`./${process.env.NODE_ENV}`).default;

export interface Config {
    token: string;
    mongoString: string;
    defaultPrefix: string;
    developers: string[];
    infoChannel: string;
    errorChannel: string;
    accentColor: string;
    backgroundImage: string;
    imgurID: string;
}

console.log(config);
