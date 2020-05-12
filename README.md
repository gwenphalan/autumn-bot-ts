<center> <h1>VenNeptury's Bot Template</h1> </center>
This is a basic template for discord.js bots written in typescript.

## Set up your own Bot Instance

-   Click the `Use this template` button
-   Clone your newly created repository
-   Run `yarn install` to install all dependencies
-   Create [a discord bot](https://discordapp.com/developers/applications 'Create a Discord Bot!') and a [MongoDB database](https://www.mongodb.com/ 'Create a MongoDB database!')
-   Follow the configuration guide below
-   Run `yarn dev` to run the bot with the development config or `yarn production` to run it with the production config

## Configuring your bot

-   This bot supports two separate config files, one for development, and one for production. Go into the config folder and create two new files: `production.ts` & `development.ts`. Paste the template from config.ts.example in and fill them out to your needs.
-   Create a folder `dist` in the project root. This is where your transpiled javascript code will end up.
-   All events (like message or messageReactionAdd) are stored in the events folder. To add more events, simply create a new file named after the event, for example `messageReactionAdd.ts`.
-   All commands are stored in the commands folder. Please note that all commands must be in a subfolder (so `commands/utility/ping.ts`, not `commands/ping.ts`). You can create more subfolders if needed.
-   I created useful code snippets which will automatically give you a code snippet. To use these, make sure you are using Visual Studio Code and simply type the snippet name in a file and then press shift. Available Snippets are:
    -   commandstructure - will create the basic structure needed for command files
    -   eventListenerStructure - will create the basic structure needed for event files.

## License

```
MIT License

Copyright (c) 2020 Mattis "VenNeptury" H

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
