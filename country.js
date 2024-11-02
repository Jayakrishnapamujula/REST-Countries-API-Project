const countryName = new URLSearchParams(location.search).get('name')

const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.population')
const region=document.querySelector('.Region')
const subRegion=document.querySelector('.Sub-Region')
const capital=document.querySelector('.Capital')
const topLevelDomain=document.querySelector('.Top-Level-Domain')
const currencies=document.querySelector('.Currencies')
const language=document.querySelector('.Language')
const borderCountries=document.querySelector('.border-countries')
const backButton=document.querySelector('.back-button')
const themeChanger = document.querySelector('.theme-changer')
const change=document.querySelector('.change');



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>res.json())
.then(([country])=>{
    
    flagImage.src=country.flags.svg
    countryNameH1.innerText = country.name.common
    population.innerText=country.population.toLocaleString('en-IN')
    region.innerText=country.region
   
    topLevelDomain.innerText=country.tld.join(', ')
    
    if(country.capital){
        capital.innerText=country.capital
    }
    if(country.subregion){
        subRegion.innerText=country.subregion
    }
    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.innerText=country.name.common
    }

    if(country.currencies){
        currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(', ')
    }

    if(country.languages){
        language.innerText=Object.values(country.languages).join(',')
    }

    if(country.borders){
        country.borders.forEach((border)=>{
            // console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
            .then(([borderCountry])=>{
                // console.log(borderCountry)
                const borderCountryTag=document.createElement('a')
                borderCountryTag.innerText=borderCountry.name.common
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                // console.log(borderCountryTag)
                borderCountries.append(borderCountryTag)

            })
        })
    }

})

themeChanger.addEventListener('click',()=>{
    if(change.innerText === 'Dark Mode'){
        document.body.classList.toggle('dark')
        change.innerText="Light Mode"
    }
    else{
        document.body.classList.remove('dark')
        change.innerText="Dark Mode"
    }

})