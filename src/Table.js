import React, { Component } from 'react';

import TableItem from "./TableItem";

export default class Table extends Component {
  constructor(props){
    super(props);
    this.state = ({
        countries: [],
        rates: [],
        searchValue: "",
        conversionValue: 0,
    })
    this.handleSearchFormChange = this.handleSearchFormChange.bind(this);
    this.handleConversionFormChange = this.handleConversionFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Inserting initial data
  componentDidMount(){
    fetch("https://api.fixer.io/latest?base=SEK")
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data.rates);
      this.setState({
        rates: [data.rates]
      })
      console.log(this.state.rates[0].AUD)
    })

    fetch("https://restcountries.eu/rest/v2/name/usa")
    .then(results => {
      return results.json();
    }).then(data => {
      let newCountry = {
        name: data[0].name,
        capital: data[0].capital,
        population: data[0].population,
        currency: data[0].currencies[0].code
      }
      this.setState({
        countries: [...this.state.countries, newCountry]
      })
    })

    fetch("https://restcountries.eu/rest/v2/name/sweden")
    .then(results => {
      return results.json();
    }).then(data => {
      let newCountry = {
        name: data[0].name,
        capital: data[0].capital,
        population: data[0].population,
        currency: data[0].currencies[0].code
      }
      this.setState({
        countries: [...this.state.countries, newCountry]
      })
    })

    fetch("https://restcountries.eu/rest/v2/name/norway")
    .then(results => {
      return results.json();
    }).then(data => {
      let newCountry = {
        name: data[0].name,
        capital: data[0].capital,
        population: data[0].population,
        currency: data[0].currencies[0].code
      }
      this.setState({
        countries: [...this.state.countries, newCountry]
      })
    })
  }

  handleSearchFormChange(e){
    this.setState({
        searchValue: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    fetch(`https://restcountries.eu/rest/v2/name/${this.state.searchValue}`)
    .then(res => {
      if(res.status === 404){
        return null;
      }
      return res.json();
    }).then(data => {
      // Validation layer
      if(data !== null){
        let newCountry = {
          name: data[0].name,
          capital: data[0].capital,
          population: data[0].population,
          currency: data[0].currencies[0].code
        }
        this.setState({
          countries: [...this.state.countries, newCountry]
        })
      }
      else {
        console.log("No such country.")
      }
    })

    // Clear the input on submit
    this.setState({
      searchValue: "",
    })
  }

  handleConversionFormChange(e){
    this.setState({
        conversionValue: e.target.value
    })
  }

  handleConversion(v){
    if(v === "SEK"){
      return this.state.conversionValue;
    }
    else {
      return Math.trunc(this.state.conversionValue*this.state.rates[0][v]);
    }
  }

  render() {
    let filteredTableItems = this.state.countries.filter((country) => {
      return country.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    })

    return (
      <div className="main-table">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
              Search: <input type="text" name="search" value={this.state.searchValue} onChange={this.handleSearchFormChange}/>
          </label>
          <input type="submit" name="submit" value="Add"/>
        </form>
        <form className="conversion-form">
        <label>
            Convert currency (SEK): <input type="number" name="search" value={this.state.conversionValue} onChange={this.handleConversionFormChange}/>
        </label>
        </form>
        <ul>
          {filteredTableItems.map((country) => {
            return (
              <TableItem key={country.name} name={country.name} capital={country.capital} population={country.population} currency={country.currency} 
              conversion={this.handleConversion(country.currency)}/>
            )
          })}
        </ul>
      </div>
    );
  }
}

