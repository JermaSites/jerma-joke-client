import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

export default defineNuxtPlugin(() => {
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  return {
    provide: {
      dayjs,
    },
  }
})
