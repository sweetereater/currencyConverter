
export const types = [
    {
        id: 1,
        name: 'Все',
        type: 'all'
    },
    {
        id: 2,
        name: 'Криптовалюты',
        type: 'crypto'
    },
    {
        id: 3,
        name: 'Наличные',
        type: 'cash'
    },
    {
        id: 4,
        name: 'Банки RUB',
        type: 'bank'
    },
]

export const getDirectionType = (direction) => {
    switch (direction) {
        case 'BTC':
        case 'ETH':
        case 'USDTTRC':
            return 'crypto'

        case 'CASHUSD':
        case 'CASHRUB':
            return 'cash'

        case 'ACRUB':
        case 'SBERRUB':
        case 'TCSBRUB':
            return 'bank';

        default:
            return 'all'
    }
}