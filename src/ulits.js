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
