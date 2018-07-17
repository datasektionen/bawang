import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import NotFound from './NotFound'
import { withConsumer } from './fetcherContext'

import fetch from 'cross-fetch'

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se'
//const TAITAN_URL = process.env.TAITAN_URL || 'http://localhost:1234'

class Taitan extends Component {
  constructor(props) {
    super(props)
    this.state = props || {}
    this.loadData(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.pathname !== this.props.pathname)
      this.loadData(this.props)
  }

  loadData(props) {
    console.log('loadData')
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
          this.setState(res)
        })
      .catch(err => {
        // Most likely we were redirected and the target did not allow cors-requests
        if(err.message === 'Failed to fetch' && window.confirm(`Redirect to "${url}"?`))
          window.location.href = url
      })

    props.fetcherContext.push(promise)
  }

  render() {
    if(this.state.redirect || this.props.redirect)
      return <Redirect to={this.state.redirect} />
    else if (this.state.status !== 200)
      return <NotFound status={this.state.status} />

    return this.props.children(this.state)
  }
}

export default withConsumer(Taitan)
