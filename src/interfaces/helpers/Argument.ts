import { valueType } from '../SettingsGroup';
import { AMessage } from '../Client';
import { parseType } from '../../commands/Settings/settings/util';
import { PromptManager } from './PromptManager';

export class Argument {
    name: string;
    key: string;
    type: valueType;
    description?: string;
    optional?: boolean;
    defaultVal?: string;
    acceptedValues?: string[];

    constructor(name: string, key: string, type: valueType, description: string, optional?: boolean, defaultVal?: string, acceptedValues?: string[]) {
        this.name = name;
        this.key = key;
        this.type = type;
        this.description = description;
        this.optional = optional;
        this.defaultVal = defaultVal;
        this.acceptedValues = acceptedValues;
    }

    async parse(message: AMessage, str: string, prompt: PromptManager) {
        return parseType(message, this.type, str, prompt);
    }
}
