"use client";

import SelectionBox, { ISelectOption } from "@/components/ui/SelectionBox";
import useCountries, { ICountry } from "@/hooks/useCountries";
import { useEffect } from "react";

const CountrySelector = ({ onCountrySelect }: { onCountrySelect: (country: ICountry) => void }) => {
  const countries = useCountries();

  // Convert country data into { label, value } format for SelectionBox
  const countryOptions: ISelectOption[] =
    countries.data?.map((country) => ({
      label: `(${country.dial_code}) ${country.name}`,
      value: country.dial_code,
    })) || [];

  const defaultCountry: ICountry = {
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  };

  useEffect(() => {
    onCountrySelect(defaultCountry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (item: ISelectOption) => {
    const selectedCountry = countries.data?.find((c) => c.dial_code === item.value);
    if (selectedCountry) {
      onCountrySelect(selectedCountry);
    }
  };

  return (
    <SelectionBox
      data={countryOptions}
      onSelect={handleSelect}
      defaultValue={{ label: defaultCountry.name, value: defaultCountry.dial_code }}
    />
  );
};

export default CountrySelector;
