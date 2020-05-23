import mongoose from 'mongoose';

export type InfractionTypes = 'warn' | 'mute' | 'kick' | 'ban';

export interface Infraction extends mongoose.Document {
    guild: string; // The id of the guild
    user: string; // The id of the user
    infractionType: InfractionTypes; // The type of infraction (see line 3)
    timestamp: number; // The timestamp of the infraction
    endTimestamp?: number; // The timestamp of when this infraction ends, used to time tempmute
    needsTiming?: boolean; // Whether this needs timing (see above)
    reason: string; // The reason for this infraction
    moderator: {
        id: string; // The moderator's id
        tag: string; // The moderator's tag
    };
    case: number; // The case id
}

const InfractionSchema: mongoose.Schema = new mongoose.Schema({
    guild: String,
    user: String,
    infractionType: String,
    timestamp: Number,
    endTimestamp: Number,
    needsTiming: Boolean,
    reason: String,
    moderator: {
        id: String,
        tag: String
    },
    case: Number
});

export const Infraction = mongoose.model<Infraction>('Infractions', InfractionSchema);
