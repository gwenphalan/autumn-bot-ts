import mongoose from 'mongoose';

export interface VerifyApp extends mongoose.Document {
    guild: string;
    messageId: string;
    userId: string;
    messageContent: string;
}

const VerifyAppSchema: mongoose.Schema = new mongoose.Schema({
    guild: String,
    messageId: String,
    userId: String,
    messageContent: String
});

export const VerifyApp = mongoose.model<VerifyApp>('VerifyApp', VerifyAppSchema);
