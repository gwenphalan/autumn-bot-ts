type ArgType = 'string' | 'boolean' | 'textChannel' | 'voiceChannel' | 'categoryChannel' | 'guildChannel' | 'member' | 'role' | 'image' | 'color' | 'emoji';

export interface Argument {
    name: string;
    key: string;
    description?: string;
    optional?: string;
    default?: string;
    acceptedValues?: string[];
    type: ArgType;
}
