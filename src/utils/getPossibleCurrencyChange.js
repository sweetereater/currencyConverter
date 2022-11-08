export const getPossibleCurrencyChange = (options) => {
    return Array.from(
        new Set(
            options
                .map(filter => filter.to)
                .reduce((acc, arr) => [...acc, ...arr], [])
                .reduce((acc, option) => {
                    if (!acc.find(item => item.code === option.code)) {
                        return [...acc, option]
                    }
                    return acc
                }, [])
        )
    )
}