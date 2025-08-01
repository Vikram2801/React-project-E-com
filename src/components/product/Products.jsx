import React, { useEffect, useState } from "react";
import { fetchProducts, singleProduct } from "../../Api/CommonApi";
import "../product/Products.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

const Products = () => {
  let [products, setProducts] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [selectedProduct, setSelectedProduct] = useState(null);
  const loadProducts = async () => {
    try {
      const response = await fetchProducts();

      console.log("", response.data.products);
      setProducts(response.data.products);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleClickProduct = async (id) => {
    try {
      const response = await singleProduct(id);
      setSelectedProduct(response.data.product);
      setShowModal(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div>Products</div>
      <div className="mainDiv">
        {products.map((product) => (
          <div className="cart" key={product.id}>
            <Card
              style={{ width: "18rem", height: "293px" }}
              onClick={() => handleClickProduct(product.id)}
            >
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
            </Card>
            <h5 className="mt-4">{product.title.slice(0, 20)}...</h5>
            <div className="priceModal">
              <div className="d-flex">
                <p className="orginal-price">{product.price}</p>
                <p className="price">
                  $
                  {(
                    product.price -
                    (product.price * product.discount || 5) / 100
                  ).toFixed(0)}
                </p>
              </div>
              <div className="price-discount">
                <span className="discount">{product.discount}%</span>
                <span className="offer">Off</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={showModal && selectedProduct !== null}
        onHide={handleClose}
        centered
        size="xl"
      >
        <Modal.Header className="border-none" closeButton></Modal.Header>
        <Modal.Body className="d-flex">
          {selectedProduct ? (
            <>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="img-fluid"
                style={{ width: "50%", height: "auto" }}
              />
              <div>
                <h4>{selectedProduct?.title.slice(0, 60)}...</h4>
                <div className="priceDiv">
                  <div className="d-flex">
                    <p className="orginal-price">{selectedProduct.price}</p>
                    <p className="price">
                      $
                      {(
                        selectedProduct.price -
                        (selectedProduct.price * selectedProduct.discount ||
                          5) /
                          100
                      ).toFixed(0)}
                    </p>
                  </div>
                  <div className="price-discount">
                    <span className="discount">
                      {selectedProduct.discount}%
                    </span>
                    <span className="offer">Off</span>
                  </div>
                </div>

                 <p>
                  <strong>Brand:</strong> {selectedProduct.brand}
                </p>
                <p>
                  <strong>Model:</strong> {selectedProduct.model}
                </p>
                 <p>
                  <strong>Color:</strong> {selectedProduct.color}
                </p>
                <p>
                  <strong>Category:</strong> {selectedProduct.category}
                </p>
               
                <p className="mt-3">
                  {selectedProduct.description.slice(0, 150)}...
                </p>
                <div>
                  <Button variant="primary">Add To Cart</Button>
                </div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </Modal.Body>
        <Modal.Footer className="footer"></Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;
