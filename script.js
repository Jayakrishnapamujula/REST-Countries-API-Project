const countriesCountainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const serachInput = document.querySelector('.search-container');
const themeChanger = document.querySelector('.theme-changer')
const change=document.querySelector('.change');

let allCountriesData 

fetch('https://restcountries.com/v3.1/all').then((res)=>res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData = data
})


filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res)=>res.json())
    .then(renderCountries)
})

function renderCountries(countries){
    countriesCountainer.innerHTML= ''
    countries.forEach((country)=>{

        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/Rest_CountriesAPI/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="card-text"> 
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population</b>: ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region</b>: ${country.region}</p>
                <p><b>Capital</b>: ${country.capital?.[0]}</p>
            </div>
        `
        countriesCountainer.append(countryCard)

    })
}

serachInput.addEventListener('input',(e)=>{
    const filterCountry=allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filterCountry)
    renderCountries(filterCountry)
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