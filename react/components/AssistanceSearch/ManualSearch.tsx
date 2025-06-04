import React from 'react'

interface Props {
  states: string[]
  cities: string[]
  selectedState: string
  selectedCity: string
  onStateChange: (value: string) => void
  onCityChange: (value: string) => void
  onSearch: () => void
}

const ManualSearch: React.FC<Props> = ({
  states,
  cities,
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
  onSearch,
}) => (
  <>
    <h3 className="assistance-search__sectionTitle assistance-search__sectionTitle--product">
      OU
    </h3>
    <div className="assistance-search__inputWrapper">
      <select
        value={selectedState}
        onChange={e => onStateChange(e.target.value)}
        className="assistance-search__select"
      >
        <option value="">Selecione o Estado</option>
        {states.map(uf => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>
    </div>
    <div className="assistance-search__inputWrapper">
      <select
        value={selectedCity}
        onChange={e => onCityChange(e.target.value)}
        className="assistance-search__select"
        disabled={!selectedState}
      >
        <option value="">Selecione a Cidade</option>
        {cities.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button onClick={onSearch} className="assistance-search__inlineButton">
        →
      </button>
    </div>
  </>
)

export default ManualSearch
