import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
///////////////////////////
import store from "../app/store.js";
import { fetchProducts } from "../features/product/productSlice.js";
import Card from "../components/Card.jsx";
import { categories, createQueryObject, filterProducts, searchProducts } from "../helper/helper.js";
//////////////////////////
import styles from "./ProductPage.module.css"
import { RotatingLines } from "react-loader-spinner";
import { FaListUl } from "react-icons/fa";
import { ImSearch } from "react-icons/im"
import { PiShoppingCartSimpleBold } from "react-icons/pi"



function ProductPage() {


  //selector and dispatch
  const dispatch = useDispatch();
  const { products } = useSelector(store => store.product);
  const store = useSelector(store => store.product);
  const state = useSelector(store => store.cart);

  ////////////////////////////////////

  //params
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams)
  //////////////////////////////


  //states
  const [display, setDisplay] = useState([]);
  const [query, setQuery] = useState({});
  const [search, setSearch] = useState("");
  //////////////////////////////////


  //cycle
  useEffect(() => {
    dispatch(fetchProducts());


  }, []);

  useEffect(() => {
    setDisplay(products)
  }, [products]);


  useEffect(() => {
    setSearchParams(query);
    const finalProducts = filterProducts(searchProducts(products, query.search), query.category);
    setDisplay(finalProducts);
  }, [query])

  /////////////////////////////


  //functions
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();
    if (tagName !== "LI") return;
    setQuery(query => createQueryObject(query, { category }))
  }

  const searchHandler = () => {
    setQuery(query => createQueryObject(query, { search }));
  };

  ///////////////////////


  return (
    <>
      <div className={styles.header}>
        <div className={styles.search}>
          <input type="text"
            placeholder="Search"
            value={search}
            onChange={event => setSearch(event.target.value.toLowerCase().trim())} />
          <button onClick={searchHandler}><ImSearch /></button>
        </div>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </div>

      {!display.length && <div style={{ width: "100%", textAlign: "center", height: "1000px", marginTop: "100px" }}>
        <RotatingLines width="100px" height="100px" strokeWidth="3" strokeColor="#fe5d42" /></div>}
      <div className={styles.container}>
        <div className={styles.products}>
          {display.map(item => (<Card key={item.id} data={item} />))}
        </div>

        {!!display.length &&
          <div className={styles.sidebar}>
            <div>
              <FaListUl />
              <p>Categories</p>
            </div>
            <ul onClick={categoryHandler}>
              {categories.map(category => (
                <li key={category.id} className={category.type.toLowerCase() === query.category ? styles.selected : null}>
                  {category.type}</li>
              ))}

            </ul>
          </div>}
      </div>

    </>
  )
}

export default ProductPage