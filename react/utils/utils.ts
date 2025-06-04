import type { UFData, CityData, AddressResponse } from '../Types'

export const fetchStates = async (product: string): Promise<string[]> => {
  const whereClause = `${product}=true`
  const url = `/api/dataentities/AT/search?_where=${encodeURIComponent(
    whereClause
  )}&_fields=uf`

  const res = await fetch(url)
  const data: UFData[] = await res.json()

  return Array.from(new Set(data.map(item => item.uf))).filter(Boolean)
}

export const fetchCities = async (
  product: string,
  state: string
): Promise<string[]> => {
  const where = `(${product}=true AND uf='${state}')`
  const url = `/api/dataentities/AT/search?_where=${encodeURIComponent(
    where
  )}&_fields=cidade`

  const res = await fetch(url)
  const data: CityData[] = await res.json()

  return Array.from(new Set(data.map(item => item.cidade))).filter(Boolean)
}

export const fetchAddressByCep = async (
  cep: string
): Promise<AddressResponse | null> => {
  try {
    const res = await fetch(`/api/checkout/pub/postal-code/BRA/${cep}`)

    if (!res.ok) return null
    const data = await res.json()

    return { city: data.city, state: data.state }
  } catch {
    return null
  }
}
