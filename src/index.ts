import fs from 'fs';
import path from 'path';
import { config } from '../config';
import { Client, ClientEventTypes, Command } from './interfaces/Client';
import { handleError } from './util';
import DBL from 'dblapi.js';
import { CronJob } from 'cron';

import net from 'net';
import { updateGuild } from './commands/Settings/settings/';

/* 
    Initiates our client with the following options:
    - @everyone, @here and @role pings are DISABLES
    - Bot is listening to <prefix>help
    - Partials are enabled for messages and reactions. This allows for reaction roles
 */

export const client = new Client({
    disableMentions: 'everyone',
    presence: {
        activity: {
            name: `Bot Loading...`,
            type: 'LISTENING',
            url: 'https://www.twitch.tv/.'
        }
    },
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});

export const updateActivity = async () => {
    return await client.user?.setActivity(`${client.guilds.cache.size} guilds | ${config.defaultPrefix}help`, {
        type: 'LISTENING',
        url: 'https://www.twitch.tv/.'
    });
};

export const dbl = new DBL(config.dblToken, client);

client.on('ready', () => {
    if (dbl && process.env.NODE_ENV !== 'development') {
        console.log('Posting Stats to DBL...');
        dbl.postStats(client.guilds.cache.size).then(() => console.log('Stats Posted To DBL'));
    }

    setInterval(() => {
        if (dbl && process.env.NODE_ENV !== 'development') {
            console.log('Posting Stats to DBL...');
            dbl.postStats(client.guilds.cache.size).then(() => console.log('Stats Posted To DBL'));
        }
    }, 1800000);
});

const listenerPath = path.join(__dirname, './events'),
    commandPath = path.join(__dirname, './commands'),
    taskPath = path.join(__dirname, './tasks');

// Imports your listeners from the events folder and forwards all Client-Events to those files
fs.readdirSync(listenerPath).forEach(file => {
    const event = require(`${listenerPath}/${file}`).default;
    const eventName = file.replace('.js', '') as ClientEventTypes;
    client.on(eventName, event.bind(null, client));
});

// Imports your commands from the commands folder and adds them to our client
fs.readdirSync(commandPath).forEach(async folder => {
    const commandFiles = fs.readdirSync(`${commandPath}/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command: Command = require(`${commandPath}/${folder}/${file}`).command;
        client.commands.set(command.name, command);
    }
});

export const startTasks = () => {
    // Imports your tasks from the tasks folder and starts them
    fs.readdirSync(taskPath).forEach(file => {
        const task: CronJob = require(path.join(taskPath, file)).task;
        task.start();
        console.log(`Started Task: ${file}`);
    });
};

// Error Logging
process.on('uncaughtException', error => handleError(client, error));
process.on('unhandledRejection', error => {
    if (!error) error = new Error('An unhandled rejection occurred but it had no message!');
    //@ts-ignore
    if (error.stack) handleError(error);
});

client.login(client.config.token);

export const server = net.createServer(socket => {
    socket.on('data', async data => {
        const a = await updateGuild(data);

        socket.write(JSON.stringify(a));
        socket.pipe(socket);
    });
});

server.listen(8124, () => {
    console.log(`Websocket Listening On Port 8124`);
});
