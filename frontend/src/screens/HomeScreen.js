import React, { useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useSelector, useDispatch} from 'react-redux'
import {listProducts} from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {useParams} from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {

  const {keyword} = useParams()
  const {pageNumber} = useParams()
  // const [products, setProducts] = useState([])

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const {data} = await axios.get('/api/products')
    //   setProducts(data)
    // }

    // fetchProducts();
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber])
  return (
    <>
        <h1>Latest Products</h1>
        {!keyword && (
        <ProductCarousel />
      )}
        {loading ? ( <Loader/>) : error ? (<Message variant='danger' >{error}</Message>) : (<>
          <Row>
            {products && products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>)}
        
    </>
  )
}

export default HomeScreen