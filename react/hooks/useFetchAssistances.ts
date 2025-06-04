import { useState } from 'react'

import type { Assistance } from '../Types'

export const useFetchAssistances = () => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Assistance[]>([])
  const [error, setError] = useState('')

  const search = async (where: string) => {
    const fields =
      'cidade,uf,endereco,firstPhone,nomeAssistencia,cep,secondPhone,razaoSocial,email,bairro'

    setLoading(true)
    setError('')

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
        setError('Não encontramos assistência técnica nessa região.')
        setResults([])
      } else {
        setResults(data)
      }
    } catch (err) {
      console.error('Erro ao buscar assistência:', err)
      setError('Erro na requisição de assistência técnica.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResults([])
    setError('')
  }

  return {
    loading,
    error,
    results,
    search,
    reset,
  }
}
