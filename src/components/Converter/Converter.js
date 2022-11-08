import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"

import {
    changeActiveFromType,
    changeActiveToType,

    selectActiveFromCurrency,
    selectActiveFromType,
    selectActiveToType,
    selectDirections,
    selectFilters,
    setActiveCurrency,
    selectPossibleCurrencyChange
} from "../../features/converter/converterSlice"

import { ButtonsPanel } from "../ButtonsPanel/ButtonsPanel";
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";


import { getDirectionType, types } from "../../utils/directionsTypes";
import styles from './Converter.module.css';

export function Converter() {

    const dispatch = useDispatch();

    const directions = useSelector(selectDirections);
    const filters = useSelector(selectFilters);
    const activeFromType = useSelector(selectActiveFromType);
    const activeToType = useSelector(selectActiveToType);
    const activeFromCurrency = useSelector(selectActiveFromCurrency);
    const possibleCurrencyChange = useSelector(selectPossibleCurrencyChange)


    const currencyOptions = useMemo(() => {

        let options = activeFromCurrency ? filters.find(item => {
            return item.from.code === activeFromCurrency
        }).to : possibleCurrencyChange;


        if (activeToType !== 'all') {
            options = options.filter(item => getDirectionType(item.code) === activeToType)
        }

        return options;
    },
        [
            filters,
            activeFromCurrency,
            activeToType,
            possibleCurrencyChange
        ]
    );


    const possibleDirections = useMemo(() => {
        return directions
            .filter(direction => {
                if (activeFromType === 'all') {
                    return true;
                }
                return getDirectionType(direction.code) === activeFromType;
            })
    }, [directions, activeFromType])


    return (
        <div>
            <div className={styles.controlBar}>
                <span className={styles.header}>Отдаёте</span>

                <ButtonsPanel
                    buttons={types}
                    activeButton={activeFromType}
                    action={(type) => dispatch(changeActiveFromType(type))}
                />

                <CurrencySelect
                    onSelect={(type) => dispatch(setActiveCurrency(type))}
                    options={possibleDirections}
                />

            </div>

            <div className={styles.controlBar}>
                <span className={styles.header}>Получаете</span>

                <ButtonsPanel
                    buttons={types}
                    activeButton={activeToType}
                    action={(type) => dispatch(changeActiveToType(type))}
                />

                <CurrencySelect
                    onSelect={(e) => null}
                    options={currencyOptions}
                />

            </div>
        </div>
    )
}
