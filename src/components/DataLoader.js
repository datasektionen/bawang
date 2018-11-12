import React, { Component } from 'react'

import isBrowser from 'is-in-browser'

export const CacheContext = React.createContext()
export const Provider = CacheContext.Provider
export const Consumer = CacheContext.Consumer

export function withConsumer(Child) {
  return props => <Consumer>
    { ({promises, error}) =>
      <Child {...props} promises={promises} error={error} />
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

    if(!cacheValue || cacheValue.error)
      return false

    return (cacheValue.time + (this.props.ttl || 60) * 1000) > Date.now()
  }

  loadData() {
    if(this.props.error) return
    const cacheKey = this.props.cacheKey

    if(this.isValid()) {
      if(cache[cacheKey].loading)
        this.props.promises.push(new Promise((resolve, reject) => waiting[cacheKey].push(resolve)))
      else
        this.props.promises.push(Promise.resolve(cache[cacheKey]))

      return
    }

    console.log('fetching', cacheKey)

    cache[cacheKey] = {
      data: {},
      cacheKey,
      loading: true,
      time: Date.now()
    }

    console.log('Object.keys(cache).length:', Object.keys(cache).length)

    if(!waiting[cacheKey])
      waiting[cacheKey] = []

    this.props.promises.push(
      this.props
        .fetcher(cacheKey)
        .then(data => {
          const res = {
            data,
            cacheKey,
            loading: false,
            time: Date.now(),
          }

          cache[cacheKey] = res

          waiting[cacheKey].forEach(resolve => resolve(res))
          delete waiting[cacheKey]

          this.forceUpdate()

          return res
        }
      )
      .catch(err => {
          delete cache[cacheKey]

          waiting[cacheKey].forEach(
            resolve => resolve({
              data: {},
              cacheKey,
              loading: false,
              error: err,
              time: Date.now(),
            }))
          delete waiting[cacheKey]

          throw err
      })
    )
  }

  render() {
    if(this.props.error) {
      return this.props.children({
        data: {},
        error: this.props.error,
        cacheKey: this.props.cacheKey,
        loading: false,
        time: Date.now()
      })
    }
    return this.props.children(cache[this.props.cacheKey] || {
      data: {},
      cacheKey: this.props.cacheKey,
      loading: true,
      time: Date.now()
    })
  }
})
