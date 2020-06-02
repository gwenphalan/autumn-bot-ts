import mongoose from 'mongoose';

export interface UserProfile extends mongoose.Document {
    userID: string;
    color?: string;
    pronouns?: string;
    gender?: string;
    age?: string;
    biography?: string;
}

const UserProfileSchema: mongoose.Schema = new mongoose.Schema({
    userID: String,
    color: String,
    pronouns: String,
    gender: String,
    age: String,
    biography: String
});

export const UserProfile = mongoose.model<UserProfile>('UserProfiles', UserProfileSchema);
