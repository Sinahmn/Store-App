import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/////////////////////////////////////
import store from "../app/store.js";
import { productQuantity, shortenText } from "../helper/helper";
import { addItem, removeItem, increase, decrease } from "../features/cart/cartSlice";
///////////////////////////////////////////////////
import styles from "./Card.module.css";
import { TbListDetails } from "react-icons/tb"
import { TbShoppingBagCheck } from "react-icons/tb"
import { MdDeleteOutline } from "react-icons/md"



function Card({ data }) {
  
  const { id, title, image, price } = data;

  const dispatch = useDispatch();

  const state = useSelector(store => store.cart);
 
///////////////////////////////////////
  const quantity = productQuantity(state, id);



  return (

    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}><TbListDetails /></Link>
        <div>
          {quantity === 1 && (<button onClick={() => dispatch(removeItem(data))}><MdDeleteOutline /></button>)}

          {quantity > 1 && (<button onClick={() => dispatch(decrease(data))}>-</button>)}
          <span>{quantity}</span>
          {quantity === 0 ?
            (<button onClick={() => dispatch(addItem(data))}><TbShoppingBagCheck /></button>) :
            (<button onClick={() => dispatch(increase(data))}>+</button>)}

        </div>
      </div>
    </div>

  )
}

export default Card;