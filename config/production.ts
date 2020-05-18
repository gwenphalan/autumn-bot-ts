export default {
    token: process.env.AUTUMN_TOKEN, // Your bot token
    mongoString: process.env.DATABASE, // Your MongoDB connection string
    defaultPrefix: '-', // The default prefix
    developers: ['279910519467671554'], // Discord User IDs of you and fellow developers. These can use commands that are devOnly
    infoChannel: '711882829918896238', // Discord Channel ID of a channel, where info should be logged to
    errorChannel: '711882844171010068', // Discord Channel ID where errors should be logged to
    accentColor: '#eb4034',
    backgroundImage: 'autumn-forest.jpg',
    imgurID: process.env.AUTUMN_IMGUR_ID
};
