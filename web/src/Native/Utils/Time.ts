export const format = (time: number) => {
    if (time === 0 || time === Infinity) {
        return '0 m 0 s'
    }

    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor((time - (hours * 3600000)) / 60000)
    const seconds = Math.floor((time - (hours * 3600000) - (minutes * 60000)) / 1000)

    return (hours > 0 ? hours + ' h ' : '') + minutes + ' m ' + seconds + ' s'
}