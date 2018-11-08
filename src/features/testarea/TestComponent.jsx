import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions'
import { Button, Icon } from 'semantic-ui-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapReact from 'google-map-react'

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
    const { incrementCounter, decrementCounter, data } = this.props
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
        <br /><br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&
            <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>
        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyDQnoSAx8bz9JgfF_KgwQFIYwQwjtx2L5w" }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
            <Marker lat={59.955413} lng={30.337844} text={'Kreyser Avrora'}/>
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
}

const Marker = () => <Icon name="marker" size="big" color="red" />

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)