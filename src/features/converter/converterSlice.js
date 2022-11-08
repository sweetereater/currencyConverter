import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDirectionType } from '../../utils/directionsTypes';
import { getPossibleCurrencyChange } from '../../utils/getPossibleCurrencyChange';
import { getMockData } from './converterAPI';

const initialState = {
  isLoading: true,
  directions: [],
  filters: [],
  activeFromType: 'all',
  activeToType: 'all',
  activeFromCurrency: null,
  activeToCurrency: null,
  allCurrencies: [],
  possibleCurrencyChange: [],
};


/* thunks */
export const getData = createAsyncThunk(
  'converter/getData',
  async () => {
    const response = await getMockData();
    return response.data;
  }
)

/* reducer */

export const converterSlice = createSlice({
  name: 'converter',
  initialState,

  reducers: {
    changeActiveFromType: (state, action) => {
      let availableFilters;

      if (action.payload !== 'all') {

        const possibleDirections = state.directions
          .filter(direction => getDirectionType(direction.code) === action.payload)
          .map(item => item.code)

        availableFilters = getPossibleCurrencyChange(
          state.filters.filter(filter => possibleDirections.includes(filter.from.code))
        )

      } else {
        availableFilters = state.allCurrencies;
      }

      state.activeFromType = action.payload;
      state.activeToType = 'all';
      state.possibleCurrencyChange = availableFilters
      state.activeFromCurrency = null;
    },

    changeActiveToType: (state, action) => {
      state.activeToType = action.payload;
    },

    setActiveCurrency: (state, action) => {
      state.activeFromCurrency = action.payload;
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.directions = action.payload.directions;
        state.filters = action.payload.filter

        const allCurrencies = getPossibleCurrencyChange(action.payload.filter);

        state.possibleCurrencyChange = allCurrencies;
        state.allCurrencies = allCurrencies;
      })
  },
});

export const { changeActiveFromType, changeActiveToType, setActiveCurrency } = converterSlice.actions;


/* selectors */

export const selectLoadingStatus = (state) => state.converter.isLoading;
export const selectDirections = (state) => state.converter.directions;
export const selectFilters = (state) => state.converter.filters;

export const selectActiveFromType = (state) => state.converter.activeFromType;
export const selectActiveToType = (state) => state.converter.activeToType;

export const selectActiveFromCurrency = (state) => state.converter.activeFromCurrency;
export const selectPossibleCurrencyChange = (state) => state.converter.possibleCurrencyChange


export default converterSlice.reducer;
