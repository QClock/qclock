module.exports = function getTimeOffset (year, month, day, hour, minute) {
    let current = new Date()
    let incoming

    if (!month && !day) {
        incoming = new Date(arguments[0]) // date from timestamp
    } else {
        incoming = new Date(year, month-1, day, hour, minute)
    }

    return incoming - current;
}