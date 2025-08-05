import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  singleProduct,
  fetchCategories,
} from "../../Api/CommonApi";
import "../product/Products.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Slider from "react-slick";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = () => {
  let [products, setProducts] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(25); // customize as needed
  const [totalPages, setTotalPages] = useState(0);
  const [Category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const images = [
    "/big-sale-discounts-products_23-2150336669.avif",
    "/black-friday-super-sale-web-banner-template_120329-2158.avif",
    "/gaming-laptop-sale-promotion-banner_252779-743.avif",
    "/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.avif",
  ];

  const loadProducts = async (
    page,
    category,
    sort = sortOrder,
    search = ""
  ) => {
    try {
      const response = await fetchProducts(
        page,
        perPage,
        category,
        sort,
        search
      );
      setProducts(response.data.products);
      if (response.data.products.length < perPage) {
        setTotalPages(page);
      } else {
        setTotalPages(page + 1);
      }
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
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategory(["all", ...response.data.categories]);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadCategories();
  }, []);
  useEffect(() => {
    loadProducts(currentPage, selectedCategory, sortOrder);
  }, [currentPage, selectedCategory, sortOrder, searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchTerm(query);
    setCurrentPage(1); // Reset to first page when search changes
  }, [location]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    cssEase: "linear",
    waitForAnimate: false,
    arrows: false,
  };
  return (
    <>
      <div className="product">
        <div className="carouselHeadingDiv">
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`slide-${index}`}
                  className="img-fluid slideImgs"
                />
              </div>
            ))}
          </Slider>
        </div>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter form-select"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <div className="category-filter">
          {Category.map((cat) => (
            <ButtonGroup key={cat} aria-label="Basic example">
              <button
                onClick={() => handleCategoryChange(cat)}
                className={`category-btn ${
                  selectedCategory === cat ? "active" : "non-active"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </ButtonGroup>
          ))}
        </div>
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
                      (product.price * (product.discount ?? 5)) / 100
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
        <Stack spacing={2} alignItems="center" mt={4} mb={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
          />
        </Stack>
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
      </div>
    </>
  );
};

export default Products;
