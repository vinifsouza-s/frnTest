export interface Assistance {
  cidade: string
  uf: string
  endereco: string
  firstPhone: string
  nomeAssistencia: string
  cep: string
  secondPhone: string
  razaoSocial: string
  email: string
  bairro: string
}

export interface UFData {
  uf: string
}

export interface CityData {
  cidade: string
}

export interface AddressResponse {
  city: string
  state: string
}
