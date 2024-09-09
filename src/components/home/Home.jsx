import React from 'react'
import { ImageCarousel } from '../carousel/ImageCarousel'
import Navbar from '../navbar/Navbar'
import { ProductProvider } from "../Provider/ProductProvider"
import ProductCategory from '../productCategory/ProductCategory'
import ProductList from '../products/ProductList'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        {/* <div className='w-screen'> */}
        <ProductCategory />
        <ImageCarousel />
        <ProductList category="Mobile" />
        <ProductList category="Laptop" />
        <ProductList category="Electronics" />
        <ProductList category="Fashion" />
        <ProductList category="Appliances" />
        <Footer/>
        {/* </div> */}
    </div>
  )
}

export default Home
