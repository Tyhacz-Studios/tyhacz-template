import { CronJob } from 'cron'
import { everyThirtySeconds } from './cronJobHelpers'

export const startExampleCronJob = (): CronJob => new CronJob(
    everyThirtySeconds,
    async () => {
        console.log('This will get called every 30 seconds')
    },
    null, // onComplete function handler
    true // start now
)
