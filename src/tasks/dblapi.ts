import { CronJob } from 'cron';

const taskCallback = async (): Promise<void> => {
    console.log('ignore');
};

export const task = new CronJob('*/60 * * * * *', taskCallback);
