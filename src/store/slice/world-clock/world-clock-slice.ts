import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  CountryDetailsType,
  StateAndCountryDetailsType,
  WorldClockItemType,
} from './types';
import {getTimeDifferenceAndDay} from '../../../utils';
import moment from 'moment';

export const getListOfStatesAndCountries = createAsyncThunk(
  'getListOfStatesAndCountries',
  async () => {
    const result = await fetch(
      'https://countriesnow.space/api/v0.1/countries/states',
    );
    const response = await result.json();

    const list: Array<StateAndCountryDetailsType> = [];

    if (Array.isArray(response.data)) {
      response.data.forEach((countryDetails: CountryDetailsType) => {
        const {name: countryName, states = []} = countryDetails;

        const stateAndCountryList = states.map(state => {
          return {stateName: state.name, countryName};
        });
        list.push(...stateAndCountryList);
      });

      list.sort((item1, item2) =>
        item1.stateName.localeCompare(item2.stateName),
      );
    }

    return list;
  },
);

export const getTimezoneOfState = createAsyncThunk(
  'getTimezoneOfState',
  async (item: StateAndCountryDetailsType) => {
    try {
      const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=cff6022f6cb7422092ac8a364db4f7ee&location=${item.stateName}, ${item.countryName}`;

      const result = await fetch(url);
      const data = await result.json();

      return {data, item};
    } catch (e) {
      console.log('er :: ', e);
    }
  },
);

export const worldClockSlice = createSlice({
  name: 'worldClockSlice',
  initialState: {
    isStateCountriesListLoading: false,
    stateCountriesList: [] as Array<StateAndCountryDetailsType>,
    isNewLocationTimeLoading: false,
    worldClocksList: [] as Array<WorldClockItemType>,
    filteredStateCountriesList: [] as Array<StateAndCountryDetailsType>,
  },
  reducers: {
    setIsStateCountriesListLoading: (state, action: PayloadAction<boolean>) => {
      state.isStateCountriesListLoading = action.payload;
    },
    filterStateCountriesList: (state, action: PayloadAction<string>) => {
      state.filteredStateCountriesList = state.stateCountriesList.filter(
        (item: StateAndCountryDetailsType) => {
          const stateCity =
            `${item.stateName}, ${item.countryName}`.toLowerCase();
          return stateCity.includes(action.payload.toLowerCase());
        },
      );
    },
    clearFilteredStateCountryList: state => {
      state.filteredStateCountriesList = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getListOfStatesAndCountries.pending, state => {
      state.isStateCountriesListLoading = true;
    });

    builder.addCase(getListOfStatesAndCountries.fulfilled, (state, action) => {
      state.stateCountriesList = action.payload as any;
      state.isStateCountriesListLoading = false;
    });

    builder.addCase(getListOfStatesAndCountries.rejected, state => {
      state.isStateCountriesListLoading = false;
    });

    builder.addCase(getTimezoneOfState.pending, state => {
      state.isNewLocationTimeLoading = true;
    });

    builder.addCase(getTimezoneOfState.fulfilled, (state, action) => {
      const {data, item} = action.payload as any;
      if (data) {
        const {datetime, requested_location} = data;
        const {dayLabel, timeDifference} = getTimeDifferenceAndDay(datetime);

        const listItem: WorldClockItemType = {
          datetime,
          location: requested_location,
          formattedTime: moment(datetime).format('LT'),
          timeDifference,
          ...item,
        };

        listItem.label = dayLabel;
        state.worldClocksList.push(listItem);
      }
      state.isNewLocationTimeLoading = false;
    });

    builder.addCase(getTimezoneOfState.rejected, state => {
      state.isNewLocationTimeLoading = false;
    });
  },
});

export const {
  setIsStateCountriesListLoading,
  filterStateCountriesList,
  clearFilteredStateCountryList,
} = worldClockSlice.actions;
export const {reducer: worldClockSliceReducer} = worldClockSlice;
