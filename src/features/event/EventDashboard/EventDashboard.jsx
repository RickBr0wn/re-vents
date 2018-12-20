import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import { connect } from 'react-redux'
import { deleteEvent } from '../eventActions'
import LoadingComponent from '../../../app/layouts/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'
import { firestoreConnect } from 'react-redux-firebase'

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    console.log(this.props.events)
    const { events, loading } = this.props
    if (loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading,
})

const mapActionsToProps = {
  deleteEvent,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(firestoreConnect([{ collection: 'events' }])(EventDashboard))
