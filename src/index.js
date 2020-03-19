import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

import './styles.css'

class AutoComplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  // componentWillMount() {
  //    this.onSuggestionsFetchRequested = debounce(
  //      500,
  //    this.onSuggestionsFetchRequested
  //    )
    
  // }

  renderSuggestion = suggestion => {
    console.log('I am rendering noww....')
    return (
      <div className="result">
        <div>"MY SEARCH"</div>
        <div className="shortCode">{suggestion.year}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    console.log('Value:' + newValue);
    this.setState({ value: newValue })
  }

  componentDidMount () {
    var crf = 'https://cors-anywhere.herokuapp.com/'
    axios
      .post(crf+'http://localhost:9200/movies/_search', {
        query: {
          multi_match: {
            query: value,
            fields: ["name", "year"]
          }
        },
        sort: ['_score', { createdDate: 'desc' }]
      })
      .then(res => {
        const results = res.data.hits.hits.map(h => h._source)
        console.log("Results:" + results)
        this.setState({ suggestions: results })
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [], value: null })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Movie name or year of release',
      value,
      onChange: this.onChange
    }

    return (
      <div className="App">
        <h1>AutoComplete Demo</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <button onClick='search()'> Search </button>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<AutoComplete />, rootElement)
