import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

const ProductsInCart = (props) => {
  const dispatch = useDispatch();

  let ProductsInCart = useSelector((state) => state.ProductsInCart);
  const productList = productData.getAllProducts();

  const cartProducts = ProductsInCart.products.map(
    (product, i) => product.code
  );

  const cartProductsQuantity = ProductsInCart.products.map(
    (product, i) => product.quantity
  );

  var ListProductsInCart = [];
  for (let i = 0; i < productList.length; i++) {
    for (let j = 0; j < cartProducts.length; j++) {
      if (productList[i].code === cartProducts[j]) {
        var listProductinCart = productList[i];
        var ListProductsQuantity = cartProductsQuantity[j];
        ListProductsInCart.push({
          listProductinCart,
          ListProductsQuantity,
        });
      }
    }
  }

  const handleDeleteProductFromCart = (product) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      dispatch(actions.deleteProductFromcart(product.listProductinCart.code));
    }
  };

  const handleUpdateProductInCart = (product, type) => {
    dispatch(actions.updateProductIncart(product.listProductinCart.code, type));
  };

  return (
    <>
      {ListProductsInCart.map((product, i) => (
        <div className="product-incart" key={i}>
          <div className="product-incart__left">
            <div className="product-incart__image">
              <img src={product.listProductinCart.image01} alt="" />
            </div>
            <div className="product-incart__title">
              <Link to={`/product/${product.listProductinCart.slug}`}>
                <h3 className="product-incart__title__name">
                  {product.listProductinCart.title}
                </h3>
              </Link>
              <p className="product-incart__title__description">
                {product.listProductinCart.description}
              </p>
            </div>

            <div
              className="product-incart__delele__moblie"
              onClick={() => handleDeleteProductFromCart(product)}
            >
              <i className='bx bx-x'></i>
            </div>

          </div>

          <div className="product-incart__right">
            <div className="product-incart__price">
              <div className="product-incart__price__text">
                {numberWithCommas(product.listProductinCart.price)}
              </div>
              <p>&nbsp;đ</p>
            </div>

            <div className="product-incart__quantity">
              <div
                className="product-incart__quantity__btn"
                onClick={() => {
                  product.ListProductsQuantity > 1
                    ? handleUpdateProductInCart(product, "minus")
                    : handleDeleteProductFromCart(product);
                }}
              >
                <i className="bx bx-minus-circle"></i>
              </div>
              <div className="product-incart__quantity__input">
                {product.ListProductsQuantity}
              </div>
              <div
                className="product-incart__quantity__btn"
                onClick={() => handleUpdateProductInCart(product, "plus")}
              >
                <i className="bx bxs-plus-circle"></i>
              </div>
            </div>

            <div
              className="product-incart__delele"
              onClick={() => handleDeleteProductFromCart(product)}
            >
              <i className="bx bxs-trash-alt"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
