import mongoose from 'mongoose';

export interface GuildSettings extends mongoose.Document {
    guild: string; // The ID of the guild
    prefix: string; // The guild's prefix
}

const GuildSettingsSchema = new mongoose.Schema({
    guild: String,
    prefix: String
});

export const GuildSettings = mongoose.model<GuildSettings>('GuildSettings', GuildSettingsSchema);
