import React, { useEffect, useState } from 'react'

import '../../../styles/css/assistance-search.css'

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
import { useFetchAssistances } from '../../hooks/useFetchAssistances'

const AssistanceSearch: React.FC = () => {
  const [form, setForm] = useState({
    selectedProduct: '',
    state: '',
    city: '',
    cep: '',
    statesList: [] as string[],
    citiesList: [] as string[],
  })

  const {
    loading,
    error,
    results,
    search: fetchAssistancesWithHook,
    reset,
  } = useFetchAssistances()

  const handleProductSelect = async (productValue: string) => {
    reset()

    setForm(previous => ({
      ...previous,
      selectedProduct: productValue,
      state: '',
      city: '',
      cep: '',
      citiesList: [],
    }))

    try {
      const states = await fetchStates(productValue)

      setForm(previous => ({ ...previous, statesList: states }))
    } catch (err) {
      console.error('Erro ao buscar estados:', err)
      setForm(previous => ({ ...previous, statesList: [] }))
    }
  }

  const handleCepSearch = async () => {
    if (!form.selectedProduct || !form.cep) {
      alert('Informe um produto e um CEP válido.')

      return
    }

    const cleanedCep = form.cep.replace(/\D/g, '')

    if (cleanedCep.length !== 8) {
      alert('CEP inválido.')

      return
    }

    setForm(previous => ({ ...previous, state: '', city: '', citiesList: [] }))

    const address = await fetchAddressByCep(cleanedCep)

    if (!address) {
      alert('Endereço não encontrado para o CEP informado.')

      return
    }

    const whereClause = `(cidade='${address.city}' AND uf='${address.state}' AND ${form.selectedProduct}=true)`

    await fetchAssistancesWithHook(whereClause)
  }

  const handleManualSearch = async () => {
    if (!form.selectedProduct || !form.state || !form.city) {
      alert('Preencha todos os campos.')

      return
    }

    setForm(previous => ({ ...previous, cep: '' }))
    const whereClause = `(cidade='${form.city}' AND uf='${form.state}' AND ${form.selectedProduct}=true)`

    await fetchAssistancesWithHook(whereClause)
  }

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await fetchCities(form.selectedProduct, form.state)

        setForm(previous => ({
          ...previous,
          citiesList: cities,
          city: '',
          cep: '',
        }))
      } catch (err) {
        console.error('Erro ao buscar cidades:', err)
        setForm(previous => ({ ...previous, citiesList: [] }))
      }
    }

    if (form.selectedProduct && form.state) {
      loadCities()
    }
  }, [form.state, form.selectedProduct])

  return (
    <div className="assistance-search">
      <BannerSection />

      <ProductSelector
        selectedProduct={form.selectedProduct}
        onSelect={handleProductSelect}
      />

      {form.selectedProduct && (
        <>
          <CepSearch
            cep={form.cep}
            onChange={cep => setForm(previous => ({ ...previous, cep }))}
            onSearch={handleCepSearch}
          />

          <ManualSearch
            states={form.statesList}
            cities={form.citiesList}
            selectedState={form.state}
            selectedCity={form.city}
            onStateChange={state =>
              setForm(previous => ({ ...previous, state }))
            }
            onCityChange={city => setForm(previous => ({ ...previous, city }))}
            onSearch={handleManualSearch}
          />
        </>
      )}

      {error && <div className="error">{error}</div>}
      {loading && <div className="spinner" />}
      {!loading && results.length > 0 && (
        <AssistanceResults results={results} />
      )}
    </div>
  )
}

export default AssistanceSearch
