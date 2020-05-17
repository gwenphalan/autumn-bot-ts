import { Message as BaseMessage } from 'discord.js';
export type valueType = 'role' | 'textChannel' | 'voiceChannel' | 'string' | 'role' | 'guildMember' | 'boolean' | 'number' | 'color' | 'url' | 'image';

interface Setting {
    name: string;
    identifier: string;
    description: string;
    valueType: valueType;
    array?: boolean;
    required?: boolean;
    dependencies?: string[];
    default?: string | boolean | number;
}

export interface SettingsGroup {
    name: string;
    identifier: string;
    description: string;
    settings: Setting[];
    update(message: BaseMessage): Promise<void | BaseMessage>;
}
