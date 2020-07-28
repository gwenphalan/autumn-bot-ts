import { CronJob } from 'cron';

const taskCallback = async (): Promise<void> => {};

export const task = new CronJob('*/60 * * * * *', taskCallback);
