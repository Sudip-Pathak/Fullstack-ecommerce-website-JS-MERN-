import React from "react";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProductsListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [addProduct, { isLoading: productLoading }] = useAddProductMutation();

  const addProductHandler = async () => {
    try {
      let resp = await addProduct().unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-end">
          <Button size="sm" variant="primary" onClick={addProductHandler}>
            <FaEdit className="mb-1" /> Create Product
          </Button>
        </Col>
      </Row>
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <Message variant="danger">{error.data.error}</Message>
        ) : (
          <Table responsive hover striped className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Button size="sm" variant="primary" className="ms-1">
                      <FaEdit />
                    </Button>
                    <Button size="sm" variant="danger" className="ms-1">
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    </>
  );
};

export default ProductsListPage;
