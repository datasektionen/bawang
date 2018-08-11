import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import NotFound from './NotFound'
import { withConsumer } from './cachePromises'

import fetch from 'cross-fetch'

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se'
//const TAITAN_URL = process.env.TAITAN_URL || 'http://localhost:1234'

const cache = {}
class Taitan extends Component {

  constructor(props) {
    super(props)

    this.loadData(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.cacheKey(prevProps) !== this.cacheKey(this.props))
      this.loadData(this.props)
  }

  cacheKey(props) {
    return props.pathname
  }

  loadData(props) {
    const cacheKey = this.cacheKey(props)
    if(cache[cacheKey]) return

    const url = TAITAN_URL + props.pathname
    const promise = fetch(url)
      .then(res => {
        const redirected = !res.url.endsWith(props.pathname) // node-fetch doesnt have the res.redirected property
        if(redirected) {
          if(res.url.startsWith(TAITAN_URL))
            return Promise.resolve({ redirect: res.url.substr(TAITAN_URL.length) })
          else
            return Promise.resolve({ redirect: res.url })
        } else if (res.ok) return res.json()
        else return Promise.resolve({ status: res.status })
      })
      .then(res => ({ status: 200, redirect: false, ...res }))
      .then(res => {
          if(typeof document !== 'undefined') document.title = res.title

          cache[cacheKey] = res
          this.forceUpdate()

          return res
      })
      .catch(err => {
        // Most likely we were redirected and the target did not allow cors-requests
        if(err.message === 'Failed to fetch' && window.confirm(`Redirect to "${url}"?`))
          window.location.href = url
      })

    props.cachePromises.push(promise)
  }

  render() {
    const state = cache[this.cacheKey(this.props)]
    if(!state) return null

    if(state.redirect) return <Redirect to={state.redirect} />
    else if (state.status !== 200) return <NotFound status={state.status} />
    return this.props.children(state)
  }
}

export default withConsumer(Taitan)
