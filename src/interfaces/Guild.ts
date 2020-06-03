import { Guild as BaseGuild, Client } from 'discord.js';
import {
    Reaction,
    getGuildSettings,
    updateGuildSettings,
    createInfraction,
    getGuildInfractions,
    getReactionRole,
    createReactionRole,
    createVerifyApp,
    getVerifyApp,
    getReactionRoles
} from '../database';
import { GuildSettings } from '../database/schemas/GuildSettings';
import { AMessage } from './Client';
import { InfractionTypes, Infraction } from '../database/schemas/Infraction';
import { ReactionRole } from '../database/schemas/ReactionRoles';
import { VerifyApp } from '../database/schemas/VerifyApp';
/**
 * Custom Guild Class with functions to get/udpate various guild settings.
 *
 * @export
 * @class Guild
 * @extends {BaseGuild}
 */
export class Guild extends BaseGuild {
    constructor(client: Client, data: object) {
        super(client, data);
    }

    /**
     * Return's the database entry for the given guild.
     *
     * @returns {Promise<GuildSettings>} Promise<GuildSettings>
     * @memberof Guild
     */
    async settings(): Promise<GuildSettings> {
        const settings = await getGuildSettings(this.id);

        return settings;
    }

    /**
     * Updates the guild's database entry with the provided GuildSettings.
     *
     * @param {GuildSettings} settings
     * @returns {Promise<GuildSettings>} Promise<GuildSettings>
     * @memberof Guild
     */
    async updateSettings(settings: GuildSettings): Promise<GuildSettings> {
        await updateGuildSettings(this.id, settings);

        return this.settings();
    }

    /**
     * Creates an infraction in the database. If it has a duration, the bot will unban/unmute the user after the given duration.
     *
     * @param {AMessage} message The message that instantiated the infraction.
     * @param {string} userID The userID of the punished user/
     * @param {InfractionTypes} type 'ban', 'mute', 'kick', or 'warn'
     * @param {string} reason Reason for the infraction
     * @param {number} [duration] Duration of the infraction, if it is temporary.
     * @returns {Promise<Infraction>} Promise<Infraction>
     * @memberof Guild
     */
    async createInfraction(message: AMessage, userID: string, type: InfractionTypes, reason: string, duration?: number): Promise<Infraction> {
        return createInfraction(message, userID, type, reason, duration);
    }

    /**
     * Gets the a guild's infractions
     *
     * @returns {(Promise<Infraction | null>)} Promise<Infraction | null>
     * @memberof Guild
     */
    async infractions(): Promise<Infraction | null> {
        return getGuildInfractions(this.id);
    }

    /**
     * Gets a reaction role from the database
     *
     * @param {string} messageID ID of the reaction message
     * @param {Reaction} reaction Reaction object - contains emoji name, and ID if applicable
     * @returns {(Promise<ReactionRole | null>)} Promise<ReactionRole | null>
     * @memberof Guild
     */
    async reactionRole(messageID: string, reaction: Reaction): Promise<ReactionRole | null> {
        return getReactionRole(this.id, messageID, reaction);
    }

    /**
     * Creates a reaction role in the database
     *
     * @param {string} messageID ID of the reaction message
     * @param {Reaction} reaction Reaction object - contains emoji name, and ID if applicable
     * @param {string} roleID ID of the reaction role
     * @returns {Promise<ReactionRole>} Promise<ReactionRole>
     * @memberof Guild
     */
    async createReactionRole(messageID: string, reaction: Reaction, roleID: string): Promise<ReactionRole> {
        return createReactionRole(this.id, messageID, reaction, roleID);
    }

    /**
     * Gets a verify app from the database
     *
     * @param {string} messageID ID of the verify app
     * @returns {(Promise<VerifyApp | null>)} Promise<VerifyApp | null>
     * @memberof Guild
     */
    async verifyApp(messageID: string): Promise<VerifyApp | null> {
        return getVerifyApp(this.id, messageID);
    }

    /**
     * Creates a verify app in the database.
     *
     * @param {string} userID ID of the applicant
     * @param {string} messageID ID of the embedded verify app
     * @param {string} messageContent Verify app content
     * @returns {Promise<VerifyApp>} Promise<VerifyApp>
     * @memberof Guild
     */
    async createVerifyApp(userID: string, messageID: string, messageContent: string): Promise<VerifyApp> {
        return createVerifyApp(this.id, userID, messageID, messageContent);
    }

    /**
     * Returns an array of reaction roles on the given message.
     *
     * @param {string} messageID ID of the reaction message
     * @returns {Promise<ReactionRole[]>} Promise<ReactionRole[]>
     * @memberof Guild
     */
    async reactionRoles(messageID: string): Promise<ReactionRole[]> {
        return getReactionRoles(this.id, messageID);
    }
}
