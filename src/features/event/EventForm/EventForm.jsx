/* global google */ 
import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createEvent, updateEvent } from '../eventActions'
import cuid from 'cuid'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import DateInput from '../../../app/common/form/DateInput'
import PlaceInput from '../../../app/common/form/PlaceInput'
import moment from 'moment'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script'

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true })

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ cityLatLng: latlng }))
      .then(() => this.props.change('city', selectedCity))
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ venueLatLng: latlng }))
      .then(() => this.props.change('venue', selectedVenue))
  }

  onFormSubmit = values => {
    values.date = moment(values.date).format()
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Rick'
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  render() {
    const { invalid, submitting, pristine } = this.props
    return (
      <Grid>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQnoSAx8bz9JgfF_KgwQFIYwQwjtx2L5w&libraries=places" onLoad={this.handleScriptLoaded} />
        <Grid.Column width={10}>
          <Segment>
            <Header color="teal" content="Event Details"  />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" component={TextInput} placeholder="Give your event a name" type="text" />
              <Field name="category" component={SelectInput} options={category} placeholder="What is your event about?" type="text" />
              <Field name="description" component={TextArea} rows={5} placeholder="Tell us about your event" type="text" />
              <Header color="teal" content="Event Location Details" />
              <Field name="city" component={PlaceInput} options={{types: ['(cities)']}} placeholder="Event City" type="text" onSelect={this.handleCitySelect} />
              {this.state.scriptLoaded && <Field name="venue" component={PlaceInput} options={{location: new google.maps.LatLng(this.state.cityLatLng), radius: 1000, types: ['establishment']}} placeholder="Event Venue" type="text" onSelect={this.handleVenueSelect} />}
              <Field name="date" type="text" component={DateInput} dateFormat="YYYY-MM-DD HH:mm" timeFormat="HH:mm" showTimeSelect placeholderText="Date and Time of your event?" />
              
              <Button disabled={invalid || submitting || pristine} positive type="submit">Submit</Button>
              <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {}

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }
  return {
    initialValues: event
  }
}

const mapActionsToProps = {
  createEvent,
  updateEvent
}

const category = [
  {key: 'coffee', text: 'Coffee', value: 'coffee'},
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'}
]

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(20)({message: 'Description needs to be at least 20 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

export default connect(mapStateToProps, mapActionsToProps)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm))