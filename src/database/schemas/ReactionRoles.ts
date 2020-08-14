import mongoose from 'mongoose';

export interface ReactionRole extends mongoose.Document {
    guild: string;
    messageId: string;
    reaction: {
        name: string;
        id: string | null;
    };
    roleId: string;
}

const ReactionRoleSchema: mongoose.Schema = new mongoose.Schema({
    guild: String,
    messageId: String,
    reaction: {
        name: String,
        id: String
    },
    roleId: String
});

export const ReactionRole = mongoose.model<ReactionRole>('ReactionRole', ReactionRoleSchema);
