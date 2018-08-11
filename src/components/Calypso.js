import { Component } from 'react'

import fetch from 'cross-fetch'

import { withConsumer } from './cachePromises'

const CALYPSO_URL = process.env.CALYPSO_URL || 'https://calypso.datasektionen.se/api/list'

const cache = {}

class Calypso extends Component {

  constructor(props) {
    super(props)
    this.loadData(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.cacheKey(prevProps) !== this.cacheKey(this.props))
      this.loadData(this.props)
  }

  cacheKey(props) {
    return props.search
  }

  loadData(props) {
    const cacheKey = this.cacheKey(props)
    if(cache[cacheKey]) return

    const url = CALYPSO_URL + props.search
    const promise = fetch(url)
      .then(res => res.json())
      .then(res => {
        cache[cacheKey] = res
        this.forceUpdate()
        return res
      })
      .catch(err => console.error('Calypso error', err))

    props.cachePromises.push(promise)
  }

  render() {
    const state = cache[this.cacheKey(this.props)]
    if(!state) return null

    return this.props.children(state)
  }
}


export default withConsumer(Calypso)
