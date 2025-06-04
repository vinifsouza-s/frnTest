import React from 'react'

import { products } from '../constants/products'

interface Props {
  selectedProduct: string
  onSelect: (value: string) => void
}

const ProductSelector: React.FC<Props> = ({ selectedProduct, onSelect }) => (
  <>
    <h2 className="assistance-search__sectionTitle assistance-search__sectionTitle--product">
      Selecione o produto que necessita de assistência:
    </h2>
    <div className="assistance-search__productList">
      {products.map(prod => (
        <button
          key={prod.value}
          className={`assistance-search__productButton ${
            selectedProduct === prod.value ? 'selected' : ''
          }`}
          onClick={() => onSelect(prod.value)}
        >
          <img
            className="assistance-search__productIcon"
            src={prod.icon}
            alt={prod.label}
          />
          {prod.label}
        </button>
      ))}
    </div>
    {selectedProduct && (
      <div className="assistance-search__description">
        <p className="assistance-search__description--title">
          Encontre uma assistência técnica autorizada Franke para:
        </p>
        <p className="assistance-search__description--product">
          {products.find(p => p.value === selectedProduct)?.label}
        </p>
      </div>
    )}
  </>
)

export default ProductSelector
