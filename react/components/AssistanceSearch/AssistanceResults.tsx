import React from 'react'

import type { Assistance } from '../../Types'

const AssistanceResults: React.FC<{ results: Assistance[] }> = ({
  results,
}) => (
  <div className="results">
    <h3 className="assistance-search__sectionTitle">
      Assistências Encontradas:
    </h3>
    {results.map((res, i) => (
      <div key={i} className="result">
        <strong>{res.nomeAssistencia}</strong>
        <div>
          {res.endereco}, {res.bairro} - {res.cidade}/{res.uf}
        </div>
        <div>CEP: {res.cep}</div>
        <div>
          Tel: {res.firstPhone}
          {res.secondPhone && ` | ${res.secondPhone}`}
        </div>
        <div>Email: {res.email}</div>
        <div>Razão Social: {res.razaoSocial}</div>
      </div>
    ))}
  </div>
)

export default AssistanceResults
