export type CountryDetailsType = {
  name: string;
  states: Array<{state_code: string; name: string}>;
};

export type StateAndCountryDetailsType = {
  stateName: string;
  countryName: string;
};

export type WorldClockItemType = {
  datetime: string;
  location: string;
  stateName: string;
  label: string;
  countryName: string;
  formattedTime: string;
  timeDifference: string;
};
