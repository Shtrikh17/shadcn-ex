

export const combineClassNames = (...classNames: Array<string|string[]>) => {
    let resArray = []
    classNames.forEach((className) => {
        if (typeof className === 'string') {
            resArray.push(className)
        } else {
            resArray = resArray.concat(className)
        }
    })
    return resArray.join(' ')
}