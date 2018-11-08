import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions'
import { Button } from 'semantic-ui-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { openModal } from '../modals/modalActions'

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  state = {
    address: '',
    scriptLoaded: false
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = address => this.setState({ address })

  handleScriptLoad = () => this.setState({ scriptLoaded: true })

  render() {
    const { incrementCounter, decrementCounter, data, openModal } = this.props
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <Button onClick={() => openModal('TestModal', { data: 42 })} color="teal" content="Open Modal" />
        <br /><br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&
            <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  openModal
}

// const Marker = () => <Icon name="marker" size="big" color="red" />

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)