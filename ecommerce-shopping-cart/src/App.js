import React, { Component } from 'react';
import Products from './components/Products';
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

  render(){
    return (
      <div className="container">
        <h1>Shopping Cart Application</h1>
        <hr/>
        <div className="row">
          <div>
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
