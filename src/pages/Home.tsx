import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Nav cartTotal = {0}/>
      <Hero />
      <Categories/>
      <Footer/> 
    </>
  )
}

export default Home
