import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
///////////////////////////////////
import styles from "./DetailsPage.module.css"





function DetailsPage() {

  const { id } = useParams()

  const productDetails = useSelector(store => store.product.products.find(i => i.id === +id))

 



  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.info}>
        <h3>{productDetails.title}</h3>
        <p>{productDetails.description}</p>
        <p>{productDetails.category}</p>

        <div className={styles.price}>
          <span>{productDetails.price} $</span>
          <Link to="/products">Back To Shop</Link>
        </div>
      </div>
    </div>
  )
}


export default DetailsPage