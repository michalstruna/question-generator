export const format = (time: number) => {
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor((time - (hours * 3600000)) / 60000)
    const seconds = Math.floor((time - (minutes * 60000)) / 1000)

    return (hours > 0 ? hours + ' h ' : '') + minutes + ' m ' + seconds + ' s'
}