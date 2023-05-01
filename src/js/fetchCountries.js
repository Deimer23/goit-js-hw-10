
export function fetchCountries(){
    return fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages")
              .then((countries) =>countries.json());
}

