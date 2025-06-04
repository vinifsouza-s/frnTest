import React from 'react'

interface Props {
  cep: string
  onChange: (value: string) => void
  onSearch: () => void
}

const CepSearch: React.FC<Props> = ({ cep, onChange, onSearch }) => (
  <>
    <h3 className="assistance-search__sectionTitle assistance-search__sectionTitle--product">
      Insira seu cep
    </h3>
    <div className="assistance-search__inputWrapper">
      <input
        type="text"
        value={cep}
        onChange={e => onChange(e.target.value)}
        placeholder="Digite seu CEP"
        className="assistance-search__input assistance-search__input--with-button"
      />
      <button onClick={onSearch} className="assistance-search__inlineButton">
        →
      </button>
    </div>
  </>
)

export default CepSearch
