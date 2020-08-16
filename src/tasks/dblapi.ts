import { CronJob } from 'cron';

const taskCallback = async (): Promise<void> => {
    return;
};

export const task = new CronJob('*/60 * * * * *', taskCallback);
