/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const products = await getProducts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

        {
          products.map((product: any) => (
            <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <div className='relative'>
                  <img src={product.image} loading="lazy" alt={product.title} className="w-full h-48 rounded-t-md object-contain" />
                </div>

                <div className="pt-3 ml-4 mr-2">
                  <h3 className="text-xl text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 truncate hover:tru">{product.description}</p>
                </div>
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2 mb-3">
                  <div className="ml-3">
                    <span className="block text-gray-900">{product.price}</span>
                    <span className="block text-gray-400 text-sm">{product.category}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        }
      </div>

    </main>
  )
}
