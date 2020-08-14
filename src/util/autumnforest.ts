import axios from 'axios';

export const style1 = async (
    guildName?: string,
    memberName?: string,
    avatarURL?: string,
    backgroundImage?: string,
    profileColor?: string,
    backgroundColor?: string,
    textColor?: string
): Promise<Buffer> => {
    const response = await axios.post('http://localhost:3000/api/v1/cards/style1', {
        guildName: guildName,
        memberName: memberName,
        avatarURL: avatarURL,
        backgroundImage: backgroundImage,
        profileColor: profileColor,
        backgroundColor: backgroundColor,
        textColor: textColor
    });

    return Buffer.from(response.data);
};
