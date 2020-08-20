import mongoose from 'mongoose';

export interface Economy extends mongoose.Document {
    user: string;
    balance: number;
    lastClaimedDaily: number;
}

const EconomySchema: mongoose.Schema = new mongoose.Schema({
    user: String,
    balance: Number,
    lastClaimedDaily: Number
});

export const Economy = mongoose.model<Economy>('Economy', EconomySchema);
