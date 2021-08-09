type TOptions = {
  hour: '2-digit' | 'numeric',
  minute: '2-digit' | 'numeric',
  timeZoneName: 'short' | 'long',
}

const formatTime = (date: Date) => {
  const newDate = new Date(date)
  const options: TOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }
  return newDate.toLocaleString('ru', options)
}

const getDiff = (date: Date) => {
  var today = new Date()
  var createdOn = new Date(date)
  var msInDay = 24 * 60 * 60 * 1000
  createdOn.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  var diff:number = (+today - +createdOn) / msInDay

  let result = (diff: number): string => {
    if (diff === 0) {
      return 'Сегодня'
    } else if (diff === 1) {
      return 'Вчера'
    } else if (diff > 1 && diff < 5) {
      return `${diff} дня назад`
    } else {
      return `${diff} дней назад`
    }
  }
  return result(diff)
}

export function formatOrderDate(date: Date): string {
  let diff = getDiff(date)
  let time = formatTime(date)

  return `${diff}, ${time}`
}
