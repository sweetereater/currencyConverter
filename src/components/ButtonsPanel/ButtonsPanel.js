import styles from './ButtonsPanel.module.css';

export const ButtonsPanel = ({ buttons, activeButton, action }) => {

    return (
        <div className={styles.buttons}>
            {buttons.map(button => {
                let buttonStyles = `${styles.button}`;

                if (activeButton === button.type) {
                    buttonStyles += ` ${styles.buttonActive}`;
                }

                return <button
                    className={buttonStyles}
                    key={button.id}
                    onClick={() => action(button.type)}
                >
                    {button.name}
                </button>
            })}
        </div>
    )
}