export const config: Config = require(`./${process.env.NODE_ENV}`).default;

export interface Config {
    /**
     * Your bot token.
     */
    token: string;
    /**
     * Your MongoDB connection string.
     */
    mongoString: string;
    /**
     * The default prefix.
     */
    defaultPrefix: string;
    /**
     * Discord user IDs of you and fellow developers. These can use commands that are devOnly.
     */
    developers: string[];
    /**
     * Discord Channel ID where info should be logged to.
     */
    infoChannel: string;
    /**
     * Discord Channel ID where errors should be logged to.
     */
    errorChannel: string;
    /**
     * Basic color of all embeds, as well as the welcome card.
     */
    accentColor: string;
    /**
     * Default background image of the welcome card. Placed in `assets/images`
     */
    backgroundImage: string;
    /**
     * This is the Imgur API Token listed in the [requirements](https://docs.autumnbot.net/#requirements). Used to upload images to Imgur.
     */
    imgurID: string;
    /**
     * This is the DBL API Token listed in the [requirements](https://docs.autumnbot.net/#requirements). Used to post stat to [Top.GG](https://top.gg/) and check for user votes.
     */
    dblToken: string;
    /**
     * IP/Domain of the host. Used to connect to the bot's websocket to remote update guilds.
     */
    hostIp: string;
}
