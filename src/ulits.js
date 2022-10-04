export const filterTags = (search, data) => {
    const indexesWithMatch = new Set()
    data.forEach((d, index) => {
        d.tags.forEach((tag, j) => {
            if (tag.toLowerCase().trim().includes(search)) {
                indexesWithMatch.add(index)
            }
        })
    })
    return [...indexesWithMatch].map(i => data[i])
}

export const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}