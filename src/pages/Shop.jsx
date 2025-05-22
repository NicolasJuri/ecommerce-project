import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar los productos</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}