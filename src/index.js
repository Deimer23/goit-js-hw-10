import './css/styles.css'; 
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
let countryInfo = document.querySelector('.country-info');
let countrylist = document.querySelector('.country-list')
const name  = document.querySelector('#search-box');
let insertCountry;

function searchCountry(arraycountry, countrySearch){   
    let coincidences = arraycountry.filter((country) => country.name.common.toUpperCase().includes(countrySearch.toUpperCase()));
    console.log(coincidences);
    if(coincidences.length < 1){
        countryInfo.style.display="none";
        Notiflix.Notify.failure('Oops, there is no country with that name')
    }else{
        if(coincidences.length == 1){
            console.log(coincidences);
            countrylist.style.display="none";
            while(countryInfo.hasChildNodes()){
                 countryInfo.removeChild(countryInfo.firstChild);	
            }
            countryInfo.style.display="block";
            // let lan;
            // for (const language of coincidencesCountry.languages) {
            //     lan += language.
            // }
            insertCountry = `<h2><img src="${coincidences[0].flags.svg}" alt="" width="30" height="30">
                                ${coincidences[0].name.official}</h2>
                                <p><b>Capital:</b>${coincidences[0].capital}</p>
                                <p><b>Population:</b>${coincidences[0].population}</p>
                                <p><b>Languages:</b>${coincidences[0].languages}</p>`;
            countryInfo.insertAdjacentHTML('afterbegin', insertCountry);
        }else{
            if(coincidences.length > 10){
                countryInfo.style.display="none";
                countrylist.style.display="none";
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }else{
                if(coincidences.length <= 10){
                    let insert="";
                    countryInfo.style.display="none";
                    while(countrylist.hasChildNodes()){
                        countrylist.removeChild(countrylist.firstChild);	
                   }
                    countrylist.style.display = "block";
                    for (const country of coincidences) {
                        insert += `<li><h2><img src="${country.flags.svg}" width="30" height="30">
                                    ${country.name.official}</h2></li>`
                    }
                    countrylist.insertAdjacentHTML('afterbegin',insert);
                }
            }
        }
    }
}


name.addEventListener('input', debounce( (e)=>{    
    e.preventDefault();
    fetchCountries().then((country)=> searchCountry(country, name.value))
                    .catch((error)=>console.log(error)); 
},DEBOUNCE_DELAY))



