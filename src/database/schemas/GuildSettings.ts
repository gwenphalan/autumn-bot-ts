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
        modLog: string;
        warnExpire: number;
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
        profileBackground: string;
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
        modLog: String,
        warnExpire: Number,
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
        profileBackground: String
    }
});

export const GuildSettings = mongoose.model<GuildSettings>('GuildSettings', GuildSettingsSchema);
