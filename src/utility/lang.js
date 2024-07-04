import { useSearchParams } from "react-router-dom"

// handles the case if the lang is undefined, and if there already are get parameters
export const addLangToUrl = (url, lang) => {
  const delimiter = url.includes('?') ? '&' : '?';
  return lang ? `${url}${delimiter}lang=${lang}` : url
}

// fetches value of the "lang" get param. Can be null
export const useLang = () => {
  const [searchParams,] = useSearchParams()
  return searchParams.get("lang")
}