import mongoose from 'mongoose';

export interface GuildSettings extends mongoose.Document {
    guild: string;
    general: {
        prefix: string;
        deleteCommands: boolean;
    };
    moderation: {
        enabled: boolean;
        staffRole: string;
        modLog: string;
        mutedRole: string;
    };
    verification: {
        enabled: boolean;
        staffRole: string;
        nonVerifiedRole: string;
        nonVerifiedChannels: string[];
        verifyChannel: string;
        manualVerify: boolean;
        modVerifyChannel: string;
        verifyMessage: string;
        denyMessage: string;
        acceptMessage: string;
    };
}

const GuildSettingsSchema = new mongoose.Schema({
    guild: String,
    general: {
        prefix: String,
        deleteCommands: Boolean
    },
    moderation: {
        enabled: Boolean,
        staffRole: String,
        modLog: String,
        mutedRole: String
    },
    verification: {
        enabled: Boolean,
        staffRole: String,
        nonVerifiedRole: String,
        nonVerifiedChannels: Array,
        verifyChannel: String,
        manualVerify: Boolean,
        modVerifyChannel: String,
        verifyMessage: String,
        denyMessage: String,
        acceptMessage: String
    }
});

export const GuildSettings = mongoose.model<GuildSettings>('GuildSettings', GuildSettingsSchema);
