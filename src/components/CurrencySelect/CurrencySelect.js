import styles from './CurrencySelect.module.css';

export const CurrencySelect = ({ onSelect, options }) => {

    if (options.length < 1) {
        return <p className={styles.noOptions}> Нет обмена </p>
    }

    return (
        <select className={styles.currencySelect} onChange={(e) => onSelect(e.target.value)}>
            {options.map((item, i) => {
                return <option key={i} value={item.code}>{item.name}</option>
            })}
        </select>
    )
}