
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

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{suggestion.name}</div>
        <div className="shortCode">{suggestion.name}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    axios
      .post('http://localhost:9200/movies/_search', {
        query: {
          multi_match: {
            query: value,
            fields: ['name', 'year']
          }
        },
        sort: ['_score', { createdDate: 'desc' }]
      })
      .then(res => {
        const results = res.data.hits.hits.map(h => h._source)
        this.setState({ suggestions: results })
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'customer name or short code',
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
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<AutoComplete />, rootElement)





































































// import React from 'react'
// import ReactDOM from 'react-dom'
// import Autosuggest from 'react-autosuggest'
// import axios from 'axios'
// import { debounce } from 'throttle-debounce'
// import './styles.css'
//
// class AutoComplete extends React.Component {
//   state = {
//     value: '',
//     suggestions: [],
//     //hit:[]
//   }
//
//   // componentWillMount() {
//   //    this.onSuggestionsFetchRequested = debounce(
//   //      500,
//   //    this.onSuggestionsFetchRequested
//   //    )
//
//   // }
//
//
//   getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//
//   return inputLength === 0 ? [] : this.state.hit.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//     //||lang.self_name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };
//  //const getSuggestionValue = suggestion => suggestion.name;
//
//
//
//   renderSuggestion = suggestion => {
//     console.log('I am rendering noww....')
//     return (
//       <div className="result">
//
//         <div className="shortCode">{suggestion.name}</div>
//
//       </div>
//     )
//   }
//
//   onChange = (event, { newValue }) => {
//     console.log('Value:' + newValue);
//     this.setState({ value: newValue })
//   }
//
//
//   onSuggestionsFetchRequested = ({ value }) => {
//     this.setState({
//       suggestions: this.getSuggestions(value)
//     });
//   };
//
// //   componentDidMount() {
// //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
// //     const uri='http://localhost:9200/movies/_search';
// //     //console.log(uri)
//
// //       fetch(proxyurl+uri,{
// //         method: 'POST',
// //         headers: {'Content-Type':'application/json', 'origin': 'http://javascript.info'},
// //         body: {
// //           query: {
// //             match_phrase_prefix: {
// //               query: 'Black',
// //               fields: ["name", "year"]
// //             }
// //           }
// //         }
// //         })
// //       .then(response =>  response.json())
// //       .then(resData => {
// //         //const Data=resData;
// // this.setState({hit:resData});
//
//
//
// //      //const arr=persons.map(pe => {return pe.supplier});
//
// //       });
// //     }
//
// componentDidMount(value) {
//   // Simple POST request with a JSON body using fetch
//   const proxyurl = "https://cors-anywhere.herokuapp.com/";
//   const uri='http://localhost:9200/movies/_search';
//   const requestOptions = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         "query":{
//           "match_phrase_prefix": {
//             "name": value
//           }
//         }
//       })
//   };
//   fetch(proxyurl+uri, requestOptions)
//       .then(response => {
//         response.json()
//         console.log(response)
//       })
//       .then(data => {
//         this.setState({ hit:data })
//         console.log(data)
//       })
//       .catch(error => this.setState({ error, isLoading: false }));
// }
//
//   render() {
//
//     const { value, suggestions } = this.state
//
//     const inputProps = {
//       placeholder: 'Movie name or year of release',
//       value,
//       onChange: this.onChange
//     }
//
//     return (
//       <div className="App">
//         <h1>AutoComplete Demo</h1>
//         <Autosuggest
//           suggestions={suggestions}
//           onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//           onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//           getSuggestionValue={suggestion => suggestion.name}
//           renderSuggestion={this.renderSuggestion}
//           inputProps={inputProps}
//         />
//
//       </div>
//     )
//   }
// }
//
// const rootElement = document.getElementById('root')
// ReactDOM.render(<AutoComplete />, rootElement)
//


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
