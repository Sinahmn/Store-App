
import { useDispatch, useSelector } from "react-redux"
import { removeItem, increase, decrease, checkout } from "../features/cart/cartSlice";
//////////////////////////////////////
import { shortenText } from "../helper/helper";
//////////////////////////////////////////////////
import styles from "./CheckoutPage.module.css"
//////////////////////////////
import { MdDeleteOutline } from "react-icons/md"
import { TbChecklist } from "react-icons/tb";
import { RiHashtag } from "react-icons/ri";
import { BsPatchCheck } from "react-icons/bs";




function CheckoutPage() {


  const items = useSelector(store => store.cart);
  const { selectedItems } = useSelector(store => store.cart);
  const dispatch = useDispatch()
///////////////////////////////////

  if (!items.itemsCounter) {
    return (
      <div className={styles.empty}>
        <p>Empty</p>
      </div>
    )

  }
  return (
    <div className={styles.container}>

      <div className={styles.sidebar}>
        <div>
          <TbChecklist />
          <p>Total:</p>
          <span>{items.total} $</span>
        </div>
        <div>
          <RiHashtag />
          <p>Quantity:</p>
          <span>{items.itemsCounter}</span>
        </div>
        <div>
          <BsPatchCheck />
          <p>Status:</p>
          <span>{!items.checkout && "Pending..."}</span>
        </div>
        <button onClick={() => dispatch(checkout(items))}>Checkout</button>
      </div>

      <div className={styles.checkContainer}>
        {selectedItems.map(item =>
        (

          <div className={styles.checkCart} key={item.id}>
            <img src={item.image} alt={item.title} />
            <p>{shortenText(item.title)}</p>
            <div>
              {item.quantity === 1 && (<button onClick={() => dispatch(removeItem(item))}><MdDeleteOutline /></button>)}
              {item.quantity > 1 && (<button onClick={() => dispatch(decrease(item))}>-</button>)}
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increase(item))}>+</button>
            </div>
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default CheckoutPage


