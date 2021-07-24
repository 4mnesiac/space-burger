const formatTime = (date) => {
  const newDate = new Date(date)
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }
  return newDate.toLocaleString('ru', options)
}

const getDiff = (date) => {
  var today = new Date()
  var createdOn = new Date(date)
  var msInDay = 24 * 60 * 60 * 1000
  createdOn.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  var diff = (+today - +createdOn) / msInDay

  let result = (diff) => {
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

export function formatOrderDate(date) {
  let diff = getDiff(date)
  let time = formatTime(date)

  return `${diff}, ${time}`
}
