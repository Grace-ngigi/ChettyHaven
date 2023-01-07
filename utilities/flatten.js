const flatten = (array) => {
    newArray = array.reduce((acc, item) => {
        if (Array.isArray(item)){
            acc= acc.concat(flatten(item))
        } else {
            acc.push(item)
        }
        return acc;
    }, [])
    return newArray
}
module.exports = flatten;