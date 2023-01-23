import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fire, { auth, db } from "../Config/Config";
import { useNavigate } from "react-router-dom";
import {Navbar} from './Navbar';
import _, { size } from "underscore";
import { uid } from "uid";
function ProductVIew(individualProduct, ID, individualCartProduct) {
    const uidd = uid();
  const location = useLocation();
  const [products, setProducts] = useState({});
  const [productColours, setProductColours] = useState([]);
  const [productColoursList, setProductColoursList] = useState([]);
  const [productSizeList, setProductSizeList] = useState([]);
  const [selectColour, setSelectColour] = useState("");
  const [finalObj, setFinalObj] = useState("");

  const navigate = useNavigate();

  const addCart = (id) => {
    navigate('/cart');

    db
      .collection("cart")
      .doc(finalObj.colour + '_' + finalObj.size + '_' + finalObj.productCode).set(finalObj).then(() => {
        console.log('Finished!!')
      })
      
    // console.log("Hi", finalObj);
  };

  let colours = [];
  useEffect(() => {
    const products = db
      .collection("inventorystock")
      .doc(location.state.id)
      .get();
    products.then((res) => {
      console.log(res.data());
      setProducts(res.data());
    });

    const productColours = db
      .collection("inventorystock")
      .doc(location.state.id)
      .collection("colours")
      .get();
    productColours.then((res) => {
      res.forEach((element) => {
        console.log("Element: ", element.data());
        colours.push(element.data());
      });
      setProductColoursList(colours);
      var mySubArray = _.uniq(colours, "colour");
      console.log("Element: ", mySubArray);
      setProductColours(mySubArray);
    });
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <img src={products.image} height={100} alt="productImage" />
      <h1>{products.prodName}</h1>
      <p>{products.prodDescription}</p>
      <div>
        {productColours !== 0 ? (
          productColours.map((prod, idx) => {
            const testClick = (prodt) => {
              setSelectColour(prodt.colour);
              console.log(prodt.colour);
              let sizeList = [];
              productColoursList.find((x) => {
                if (x.colour == prodt.colour) {
                  sizeList.push(x);
                }
              });
              console.log("hello", sizeList);
              setProductSizeList(sizeList);
            };

            return (
              <div style={{ display: "inline-flex", width: "100%" }}>
                <div key={idx} onClick={() => testClick(prod)}>
                  <p
                    style={{
                      margin: "8px",
                      padding: "8px",
                      background: "whitesmoke",
                    }}
                  >
                    {prod.colour}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product colours available for this product</div>
        )}

        {/* Mapping the sizes of the selected colour */}
        {productSizeList.map((sizes, idx) => {
          return (
            <div
              style={{ display: "inline-block" }}
            //  create method and create a variable(state) for qty using the decrement and increment functonality.
              onClick={() => {
                setFinalObj(Object.assign(products,  sizes, {qty: 2,uid: uidd }))
                console.log(Object.assign(products,  sizes, {qty: 2}));
              }}
            >
              <p style={{ background: "yellow", margin: "8px" }}>
                {sizes.size} : R{sizes.price}
              </p>
            </div>
          );
        })}
      </div>
      <p>{products.productPrice}</p>
      {/* <div className='btn btn-danger btn-md cart-btn' onClick={() => addCart (individualCartProduct.individualCartProduct)}>Add To Cart </div> */}
      <div
        className="btn btn-danger btn-md cart-btn"
        onClick={() => addCart()}
      >
        Add To Cart{" "}
      </div>
    </div>
  );
}

export default ProductVIew;
