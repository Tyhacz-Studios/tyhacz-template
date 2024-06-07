
//                          ┌────────────── second (optional)
//                          │ ┌──────────── minute
//                          │ │ ┌────────── hour
//                          │ │ │ ┌──────── day of month
//                          │ │ │ │ ┌────── month
//                          │ │ │ │ │ ┌──── day of week
//                          │ │ │ │ │ │
//                          │ │ │ │ │ │
//                          * * * * * *

export const everySecond = '* * * * * *'

export const everyHour   = '0 0 * * * *'

export const everyDay    = '0 0 0 * * *'

export const everySunday = '0 0 12 * * 0'

export const everyMinute = '0 * * * * *'

export const everyThirtySeconds = '0 * * * * *'
