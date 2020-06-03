import { valueType } from '../SettingsGroup';
import { Command } from '../Client';
import { parseType } from '../../commands/Settings/settings/util';
import { PromptManager } from './PromptManager';
import { GuildMember, Role, VoiceChannel, GuildChannel, User, Message } from 'discord.js';

/**
 * Returns an array of strings parsed from an args string. If a group of text is surrounded with quotes (' or "), it will parse that into a single string.
 *
 *
 * @param {string} argString
 * @param {number} argCount
 * @param {boolean} [allowSingleQuote=true]
 * @returns
 *
 * ****
 * ### Example
 * ```js
 * const argString = 'Hello, there. My name is bob. "My favorite food is pizza." Bye.';
 *
 * console.log(parseArgs(argString, 12)) // [ 'Hello,', 'there.', 'My', 'name', 'is', 'bob.', 'My favorite food is pizza.', 'Bye.' ]
 * ```
 */
function parseArgs(argString: string, argCount: number, allowSingleQuote = true) {
    const re = allowSingleQuote ? /\s*(?:("|')([^]*?)\1|(\S+))\s*/g : /\s*(?:(")([^]*?)"|(\S+))\s*/g;
    const result = [];
    let match: RegExpExecArray | null = null;
    // Large enough to get all items
    argCount = argCount || argString.length;
    // Get match and push the capture group that is not null to the result
    while (--argCount && (match = re.exec(argString))) result.push(match[2] || match[3]);
    // If text remains, push it to the array as-is (except for wrapping quotes, which are removed)
    if (match && re.lastIndex < argString.length) {
        const re2 = allowSingleQuote ? /^("|')([^]*)\1$/g : /^(")([^]*)"$/g;
        result.push(argString.substr(re.lastIndex).replace(re2, '$2'));
    }
    return result;
}
export type Arg = string | number | boolean | GuildMember | User | Role | VoiceChannel | GuildChannel | undefined;

export type Args = { [key: string]: Arg };

/**
 *
 * @export
 * @interface Argument
 *
 * ****
 *
 *  ### Example
 *  ```js
 *  const arg = {
 *      name = "Member",
 *      key = "member",
 *      type = "guildMember",
 *      optional = true
 *  }
 *  ```
 */
export interface Argument {
    name: string;
    key: string;
    type: valueType;
    description?: string;
    optional?: boolean;
    defaultVal?: string;
    acceptedValues?: string[];
    cases?: { [key: string]: string };
}
/**
 * Used to manage arguments. It parses arguments and generates usages dynamically.
 *
 * @export
 * @class ArgumentManager
 */
export class ArgumentManager {
    args: Argument[];
    argString?: string;
    message?: Message;
    readonly argsCount: number;
    readonly argsType: 'multiple' | 'single' | 'none';
    private command: Command;
    private prompt?: PromptManager;
    private readonly argsSingleQuotes = true;
    private readonly prefix: string;

    /**
     *Creates an instance of ArgumentManager.
     * @param {Command} command Used to generate arguments and usages.
     * @param {string} prefix Used to generate usages.
     * @param {PromptManager} [prompt] Used to prompt the user in case of an error parsing.
     * @param {Message} [message] Used to parse arguments.
     * @param {string} [argString] Used to parse arguments.
     * @memberof ArgumentManager
     *
     * ****
     *
     * ### Example
     * ```js
     * const command = client.commands.get(commandName) || client.commands.find(command => command.aliases.includes(commandName));
     * const prefix = '?';
     * const prompt = new PromptManager(message, command.module, 5);
     * const argString = message.content.slice(prefix.length).trim().split(/ +/).join(' ');
     *
     * const argManager = new ArgumentManager(command, prefix, prompt, message, argString);
     * ```
     */
    constructor(command: Command, prefix: string, prompt?: PromptManager, message?: Message, argString?: string) {
        this.args = command.args;
        this.command = command;
        this.argString = argString;
        this.argsCount = this.args.length;
        this.message = message;
        this.argsType = this.argsCount > 1 ? 'multiple' : this.argsCount === 1 ? 'single' : 'none';
        this.prompt = prompt;
        this.prefix = prefix;
    }

    /**
     * Returns dynamically generated usages string based on `this.command` and `this.args`;
     *
     * @readonly
     * @memberof ArgumentManager
     */
    get usage() {
        if (this.argsType === 'none') return this.prefix + this.command.name;

        const usages = this.args.map(
            arg => `${arg.optional ? '[' : '<'}${arg.acceptedValues ? arg.acceptedValues.join(' | ') : arg.name}${arg.optional ? ']' : '>'}`
        );

        return this.prefix + this.command.name + ' ' + usages.join(' ');
    }

    /**
     * Returns object containing parsed arguments.
     *
     * @returns {(Promise<Args | void>)}
     * @memberof ArgumentManager
     *
     * ****
     *
     * ### Example
     * ```ts
     * const argManager = new ArgumentManager(command, prefix, prompt, message, argString);
     *
     * const args = await argManager.parseArgs();
     * ```
     */
    async parseArgs(): Promise<Args | void> {
        if (this.argString === undefined) throw new Error('No argString Provided');
        if (!this.message) throw new Error('No message Provided');
        if (!this.prompt) throw new Error('No prompt Provided');

        const args: Args = {};

        switch (this.argsType) {
            case 'single':
                const arg = this.argString.trim().replace(this.argsSingleQuotes ? /^("|')([^]*)\1$/g : /^(")([^]*)"$/g, '$2');
                if (!this.args[0].optional && !arg) return this.prompt.error(`Missing Argument: \`${this.args[0].name}\`\n\nUsage: ${this.usage}`);
                if (this.args[0].acceptedValues && !this.args[0].acceptedValues.map(a => a.toLowerCase()).includes(arg.toLowerCase()))
                    return this.prompt.error(
                        `Invalid Argument: \`${arg}\`\n\nAccepted Arguments: \`${this.args[0].acceptedValues.join('`, `')}\`\n\nUsage: ${this.usage}`
                    );
                const parsed = arg ? await parseType(this.message, this.args[0].type, arg, this.prompt) : this.args[0].defaultVal || 'noArgGiven';
                if (this.args[0].optional) {
                    if (parsed) args[this.args[0].key] = parsed === 'noArgGiven' ? undefined : parsed;
                    else return;
                } else {
                    if (!parsed) return;
                    args[this.args[0].key] = parsed;
                }
                return args;
            case 'multiple':
                const argsArray = parseArgs(this.argString, this.argsCount, this.argsSingleQuotes);
                for (let i = 0; i < this.argsCount; i++) {
                    const arg1 = argsArray[i];
                    const cases = this.args[i].cases;
                    if (cases) {
                        for (const c in cases) {
                            const val = cases[c];
                            if (args[c] !== val && arg1) return this.prompt.error(`\`${this.args[i].name}\` is only needed if \`${c}\` is \`${val}\`!`);
                        }
                    }
                    if (!this.args[i].optional && !arg1) return this.prompt.error(`Missing Argument: \`${this.args[i].name}\`\n\nUsage: ${this.usage}`);
                    const accepted = this.args[i].acceptedValues;
                    if (arg1 && accepted && !accepted.map(a => a.toLowerCase()).includes(arg1.toLowerCase()))
                        return this.prompt.error(`Invalid Argument: \`${arg1}\`\n\nAccepted Arguments: \`${accepted.join('`, `')}\`\n\nUsage: ${this.usage}`);
                    const parsed2 = arg1 ? await parseType(this.message, this.args[i].type, arg1, this.prompt) : this.args[i].defaultVal || 'noArgGiven';
                    if (this.args[i].optional) {
                        if (parsed2) args[this.args[i].key] = parsed2 === 'noArgGiven' ? undefined : parsed2;
                        else return;
                    } else {
                        if (!parsed2) return;
                        args[this.args[i].key] = parsed2;
                    }
                }
                return args;
            case 'none':
                return args;
            default:
                throw new RangeError(`Unknown argsType "${this.argsType}".`);
        }
    }
}
