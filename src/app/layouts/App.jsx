import React, { Component } from 'react'
import EventDashboard from '../../features/event/EventDashboard/EventDashboard'
import Navbar from '../../features/nav/NavBar/Navbar'
import { Container } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </div>
    )
  }
}

export default App