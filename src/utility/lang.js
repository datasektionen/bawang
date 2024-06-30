import { useSearchParams } from "react-router-dom"

// handles the case if the lang is undefinede
export const addLangToUrl = (url, lang) => {
  return lang ? url + "?lang=" + lang : url
}

// fetches value of the "lang" get param. Can be null
export const useLang = () => {
  const [searchParams, ] = useSearchParams()
  return searchParams.get("lang")
}