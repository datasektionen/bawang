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

export const DataLoader = withConsumer(class extends Component {
  constructor(props) {
    super(props)
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.cacheKey !== this.props.cacheKey)
      this.loadData()
  }

  loadData() {
    if(this.props.error) return

    const cacheKey = this.props.cacheKey

    if(cache[cacheKey]) {
      if(cache[cacheKey].loading)
        this.props.promises.push(new Promise((resolve, reject) => cache[cacheKey].waiting.push(resolve)))
      else
        this.props.promises.push(Promise.resolve(cache[cacheKey]))

      return
    }

    console.log('fetching', cacheKey)

    cache[cacheKey] = {
      data: {},
      cacheKey,
      loading: true,
      waiting: []
    }

    console.log('Object.keys(cache).length:', Object.keys(cache).length)

    this.props.promises.push(
      this.props
        .fetcher(cacheKey)
        .then(data => {

          const res = {
            data,
            cacheKey,
            loading: false,
          }

          cache[cacheKey].waiting.forEach(resolve => resolve(res))
          cache[cacheKey] = res

          setTimeout(() => {
            delete cache[cacheKey]
          }, (this.props.ttl || 60) * 1000)

          this.forceUpdate()

          return res
        }
      )
      .catch(err => {
          cache[cacheKey].waiting.forEach(
            resolve => resolve({
              data: {},
              cacheKey,
              loading: false,
              error: err,
            }))
          delete cache[cacheKey]

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
      })
    }

    return this.props.children(cache[this.props.cacheKey] || {
      data: {},
      loading: true,
    })
  }
})
