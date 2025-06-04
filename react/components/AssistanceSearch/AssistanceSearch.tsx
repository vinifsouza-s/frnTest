import React, { useEffect, useState } from 'react'
import '../../../styles/css/assistance-search.css'

import type { Assistance } from './index'
import {
  BannerSection,
  ProductSelector,
  CepSearch,
  ManualSearch,
  AssistanceResults,
  fetchStates,
  fetchCities,
  fetchAddressByCep,
} from './index'

const AssistanceSearch: React.FC = () => {
  const [form, setForm] = useState({
    selectedProduct: '',
    state: '',
    city: '',
    cep: '',
    results: [] as Assistance[],
    error: '',
    statesList: [] as string[],
    citiesList: [] as string[],
  })

  const handleProductSelect = async (productValue: string) => {
    setForm(prev => ({
      ...prev,
      selectedProduct: productValue,
      results: [],
      error: '',
    }))

    try {
      const states = await fetchStates(productValue)

      setForm(prev => ({ ...prev, statesList: states }))
    } catch (err) {
      console.error('Erro ao buscar estados:', err)
      setForm(prev => ({ ...prev, statesList: [] }))
    }
  }

  const fetchAssistances = async (where: string) => {
    const fields =
      'cidade,uf,endereco,firstPhone,nomeAssistencia,cep,secondPhone,razaoSocial,email,bairro'

    try {
      const res = await fetch(
        `/api/dataentities/AT/search?_where=${encodeURIComponent(
          where
        )}&_fields=${encodeURIComponent(fields)}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'REST-Range': 'resources=0-100',
          },
        }
      )

      const data: Assistance[] = await res.json()

      if (!data.length) {
        setForm(prev => ({
          ...prev,
          error: 'Não encontramos assistência técnica nessa região.',
          results: [],
        }))
      } else {
        setForm(prev => ({ ...prev, results: data, error: '' }))
      }
    } catch (err) {
      console.error('Erro ao buscar assistência:', err)
      setForm(prev => ({
        ...prev,
        error: 'Erro na requisição de assistência técnica.',
      }))
    }
  }

  const handleCepSearch = async () => {
    if (!form.selectedProduct || !form.cep) {
      setForm(prev => ({
        ...prev,
        error: 'Informe um produto e um CEP válido.',
      }))

      return
    }

    const cleanedCep = form.cep.replace(/\D/g, '')

    if (cleanedCep.length !== 8) {
      setForm(prev => ({ ...prev, error: 'CEP inválido.' }))

      return
    }

    setForm(prev => ({ ...prev, state: '', city: '', citiesList: [] }))

    const address = await fetchAddressByCep(cleanedCep)

    if (!address) {
      setForm(prev => ({
        ...prev,
        error: 'Endereço não encontrado para o CEP informado.',
      }))

      return
    }

    const where = `(cidade='${address.city}' AND uf='${address.state}' AND ${form.selectedProduct}=true)`

    await fetchAssistances(where)
  }

  const handleManualSearch = async () => {
    if (!form.selectedProduct || !form.state || !form.city) {
      setForm(prev => ({ ...prev, error: 'Preencha todos os campos.' }))

      return
    }

    setForm(prev => ({ ...prev, cep: '' }))
    const where = `(cidade='${form.city}' AND uf='${form.state}' AND ${form.selectedProduct}=true)`

    await fetchAssistances(where)
  }

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await fetchCities(form.selectedProduct, form.state)

        setForm(prev => ({ ...prev, citiesList: cities, city: '', cep: '' }))
      } catch (err) {
        console.error('Erro ao buscar cidades:', err)
        setForm(prev => ({ ...prev, citiesList: [] }))
      }
    }

    if (form.selectedProduct && form.state) loadCities()
  }, [form.state, form.selectedProduct])

  return (
    <div className="assistance-search">
      <BannerSection />
      <ProductSelector
        selectedProduct={form.selectedProduct}
        onSelect={handleProductSelect}
      />
      <CepSearch
        cep={form.cep}
        onChange={cep => setForm(prev => ({ ...prev, cep }))}
        onSearch={handleCepSearch}
      />
      <ManualSearch
        states={form.statesList}
        cities={form.citiesList}
        selectedState={form.state}
        selectedCity={form.city}
        onStateChange={state => setForm(prev => ({ ...prev, state }))}
        onCityChange={city => setForm(prev => ({ ...prev, city }))}
        onSearch={handleManualSearch}
      />
      {form.error && <div className="error">{form.error}</div>}
      {form.results.length > 0 && <AssistanceResults results={form.results} />}
    </div>
  )
}

export default AssistanceSearch
