import mongoose from 'mongoose';

export interface GuildSettings extends mongoose.Document {
    guild: string;
    general: {
        prefix: string;
        deleteCommands: boolean;
        memberRole: string;
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
        pingStaff: boolean;
        verifyMessage: string;
        denyMessage: string;
        acceptMessage: string;
    };
    welcome: {
        enabled: boolean;
        backgroundColor: string;
        textColor: string;
        profileColor: string;
        profileBackground: Buffer;
        welcomeChannel: string;
    };
}

const GuildSettingsSchema = new mongoose.Schema({
    guild: String,
    general: {
        prefix: String,
        deleteCommands: Boolean,
        memberRole: String
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
        pingStaff: Boolean,
        verifyMessage: String,
        denyMessage: String,
        acceptMessage: String
    },
    welcome: {
        enabled: Boolean,
        welcomeChannel: String,
        backgroundColor: String,
        textColor: String,
        profileColor: String,
        profileBackground: Buffer
    }
});

export const GuildSettings = mongoose.model<GuildSettings>('GuildSettings', GuildSettingsSchema);
