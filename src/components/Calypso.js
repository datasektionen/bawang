import { Component } from 'react'

import fetch from 'cross-fetch'

import { withConsumer } from './fetcherContext'

const CALYPSO_URL = process.env.CALYPSO_URL || 'https://calypso.datasektionen.se/api/list'

class Calypso extends Component {
  constructor(props) {
    super(props)
    this.state = this.props || {}
    this.loadData(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.search !== this.props.search)
      this.loadData(this.props)
  }

  loadData(props) {
    console.log('loadData')
    const url = CALYPSO_URL + props.search
    const promise = fetch(url)
      .then(res => this.setState(res))
      .catch(err => console.error('Calypso error', err))

    props.fetcherContext.push(promise)
  }

  render() {
    return this.props.children(this.state)
  }
}

export default withConsumer(Calypso)
