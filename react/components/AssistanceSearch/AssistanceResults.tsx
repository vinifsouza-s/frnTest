import React from 'react'

import type { Assistance } from '../../Types'

const AssistanceResults: React.FC<{ results: Assistance[] }> = ({
  results,
}) => (
  <div className="results results--centered">
    {results.map((res, i) => (
      <div key={i} className="result">
        <strong>{res.nomeAssistencia}</strong>
        <span className="result__razaoSocial">{res.razaoSocial}</span>
        <span>
          <img
            src="https://loja.franke.com.br/arquivos/distance-icon.svg"
            alt="Ícone de localização"
            width={16}
            height={16}
          />
          {res.endereco}, {res.bairro} - {res.cidade}/{res.uf} | CEP: {res.cep}
        </span>
        <span>
          <img
            src="https://loja.franke.com.br/arquivos/telephone-icon-stores.svg"
            alt="Ícone de telefone"
            width={16}
            height={16}
          />
          {res.firstPhone}
          {res.secondPhone && ` | ${res.secondPhone}`}
        </span>
        <span>
          <img
            src="https://loja.franke.com.br/arquivos/mail-icon-stores.svg"
            alt="Ícone de e-mail"
            width={16}
            height={16}
          />
          <a href={`mailto:${res.email}`}>{res.email}</a>
        </span>
      </div>
    ))}
  </div>
)

export default AssistanceResults
