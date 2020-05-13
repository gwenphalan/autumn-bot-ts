export default {
    token: process.env.BOT_TOKEN, // Your bot token
    mongoString: 'mongodb+srv://autumn_bot:bqGhGHHwGkNvYr6@cluster0-9pmgv.mongodb.net/test?retryWrites=true&w=majority', // Your MongoDB connection string
    defaultPrefix: '-', // The default prefix
    developers: ['279910519467671554'], // Discord User IDs of you and fellow developers. These can use commands that are devOnly
    infoChannel: '709866011800633436', // Discord Channel ID of a channel, where info should be logged to
    errorChannel: '709866100686585876', // Discord Channel ID where errors should be logged to
    accentColor: '#eb4034'
};
