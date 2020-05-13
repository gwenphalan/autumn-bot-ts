import mongoose from 'mongoose';

export interface GuildSettings extends mongoose.Document {
    guild: string; // The ID of the guild
    prefix: string;
    deleteCommands: boolean; // The guild's prefix
}

const GuildSettingsSchema = new mongoose.Schema({
    guild: String,
    prefix: String,
    deleteCommands: Boolean
});

export const GuildSettings = mongoose.model<GuildSettings>('GuildSettings', GuildSettingsSchema);
