import React, { Component } from 'react'

import isBrowser from 'is-in-browser'

export const CacheContext = React.createContext()
export const Provider = CacheContext.Provider
export const Consumer = CacheContext.Consumer

export function withConsumer(Child) {
  return props => <Consumer>
    { cachePromises =>
      <Child {...props} cachePromises={cachePromises} />
    }
  </Consumer>
}

const cache = isBrowser ? window.__cache__ : {}

const waiting = {}

export const DataLoader = withConsumer(class extends Component {
  constructor(props) {
    super(props)
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.cacheKey !== this.props.cacheKey)
      this.loadData()
  }

  isValid() {
    const cacheValue = cache[this.props.cacheKey]

    if(!cacheValue)
      return false

    return (cacheValue.time + (this.props.ttl || 60)) > (Date.now() / 1000)
  }

  loadData() {
    const cacheKey = this.props.cacheKey

    if(this.isValid()) {
      if(cache[cacheKey].loading)
        this.props.cachePromises.push(new Promise((resolve, reject) => waiting[cacheKey].push(resolve)))
      else
        this.props.cachePromises.push(Promise.resolve(cache[cacheKey]))

      return
    }

    console.log('fetching', cacheKey)

    cache[cacheKey] = {
      data: {},
      cacheKey,
      loading: true,
      time: Date.now()
    }

    waiting[cacheKey] = []

    this.props.cachePromises.push(
      this.props
        .fetcher()
        .then(data => {
          const res = {
            data,
            cacheKey,
            loading: false,
            time: Date.now(),
          }

          cache[cacheKey] = res

          waiting[cacheKey].forEach(resolve => {
            resolve(res)
          })

          this.forceUpdate()

          return res
        }
      )
    )
  }

  render() {
    return this.props.children(cache[this.props.cacheKey] || {
      data: {},
      cacheKey: this.props.cacheKey,
      loading: true,
      time: Date.now()
    })
  }
})
