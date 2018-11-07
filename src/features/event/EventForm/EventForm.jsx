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
import DateInput from '../../../app/common/form/DataInput'
import moment from 'moment'


class EventForm extends Component {
  onFormSubmit = values => {
    values.date = moment(values.date).format()
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
        <Grid.Column width={10}>
          <Segment>
            <Header color="teal" content="Event Details"  />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" component={TextInput} placeholder="Give your event a name" type="text" />
              <Field name="category" component={SelectInput} options={category} placeholder="What is your event about?" type="text" />
              <Field name="description" component={TextArea} rows={5} placeholder="Tell us about your event" type="text" />
              <Header color="teal" content="Event Location Details" />
              <Field name="city" component={TextInput} placeholder="Event City" type="text" />
              <Field name="venue" component={TextInput} placeholder="Event Venue" type="text" />
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