import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      size: "",
      sort: "",
      cartItems: [],
      products: [],
      filteredProducts: []
    };
  }
  handleAddToCart = () =>{
    console.log("handle cart");
  }

  componentWillMount(){
    fetch("http://localhost:8085/products")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({ products: data });
    });
  }

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowestprice"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }
      return { filteredProducts: state.products };
    });
  };

  handleSortChange = e => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
    this.listProducts();
  };

  render(){
    return (
      <div className="container">
        <h1>Shopping Cart Application</h1>
        <hr/>
        <div className="row">
        <div className="col-md-9">
            <Filter
              count={this.state.products.length}
              handleSortChange={this.handleSortChange}
              handleSizeChange={this.handleSizeChange}
            />
            <hr />
          <Products
              products={this.state.products}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
