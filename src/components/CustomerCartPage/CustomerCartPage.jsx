import React from "react";
import "./CustomerCartPage.css";
import "../Common.css";
import parse from "html-react-parser";
import { renderProgressBar } from "../Common.js";

class CustomerCartPage extends React.Component {
  state = {
    discountCode: this.props.cartInfo.discountCode
      ? this.props.cartInfo.discountCode
      : "",
    discountPct: this.props.cartInfo.discountPct
      ? this.props.cartInfo.discountPct
      : 0,
    subtotal: this.calcSubtotal(),
    discount: this.calcDiscount(),
    total: this.calcTotal(this.calcSubtotal()),
  };

  calcSubtotal() {
    return this.props.products.reduce(
      (total, product) => total + Number(product.price * product.licenses),
      0
    );
  }

  calcDiscount() {
    return (this.calcSubtotal() * this.props.cartInfo.discountPct) / 100;
  }

  deleteProduct(productName) {
    this.props.products.splice(
      this.props.products.findIndex((product) => product.name === productName),
      1
    );
    const subtotal = this.calcSubtotal();
    this.setState({ subtotal: subtotal, total: this.calcTotal(subtotal) });
    this.onClickDiscount();
  }

  calcTotal(subTotal) {
    return (
      subTotal +
      (this.props.shippingInfo.express || subTotal < 40 ? 5 : 0) -
      (subTotal * this.props.cartInfo.discountPct) / 100
    );
  }

  createLicenseOptions() {
    let string = "";
    for (let i = 1; i <= 10; i++) {
      string += `<option value="${i}">${i}</option>`;
    }
    return string;
  }

  onLicenseChange(e, productName) {
    const index = this.props.products.findIndex(
      (product) => product.name === productName
    );
    this.props.products[index].licenses = e.target.value;
    const subtotal = this.calcSubtotal();
    this.setState({ subtotal: subtotal, total: this.calcTotal(subtotal) });
    this.onClickDiscount();
  }

  renderProduct(objProduct) {
    return (
      <tr key={objProduct.name}>
        <td>
          <img
            className="buttonX"
            onClick={() => this.deleteProduct(objProduct.name)}
            src={require("../../assets/X-square-01.png")}
            alt="X"
          />
        </td>
        <td>
          <div className="productCart">
            <img
              src={require("../../assets/" + objProduct.name + ".png")}
              alt={objProduct.name}
            />
            <div className="productDescCart">
              <h2>{objProduct.name}</h2>
              <p>{objProduct.description}</p>
              <p>
                <em>{objProduct.supportedOS.join(", ")}</em>
              </p>
            </div>
          </div>
        </td>
        <td className="numberRight">
          {Number(objProduct.price).toLocaleString("us-US", {
            style: "currency",
            currency: "USD",
          })}
        </td>
        <td>
          <select
            name="licenses"
            id="licenses"
            defaultValue={objProduct.licenses}
            onClick={(e) => this.onLicenseChange(e, objProduct.name)}
          >
            {parse(this.createLicenseOptions(objProduct.licenses))}
          </select>
        </td>
        <td className="numberRight">
          {Number(objProduct.price * objProduct.licenses).toLocaleString(
            "us-US",
            { style: "currency", currency: "USD" }
          )}
        </td>
      </tr>
    );
  }

  onClickDiscount(e) {
    let discountPct = 0;
    if (this.state.discountCode === "SAVE10") {
      discountPct = 10;
    } else if (this.state.discountCode === "SAVE5") {
      discountPct = 5;
    }
    this.props.updateCartInfo(this.state.discountCode, discountPct);
    const subtotal = this.calcSubtotal();
    const total =
      subtotal -
      (subtotal * this.props.cartInfo.discountPct) / 100 +
      (this.props.shippingInfo.express || this.state.subtotal < 40 ? 5 : 0);
    this.setState({
      discountCode: this.state.discountCode,
      discountPct: discountPct,
      discount: (subtotal * discountPct) / 100,
      total: total,
    });
  }

  onChangePromo(e) {
    this.props.cartInfo.discountCode = e.target.value;
    this.setState({ discountCode: e.target.value });
  }

  onCheckout(e) {
    this.onClickDiscount(e);
    this.props.advancePage();
  }

  render() {
    return (
      <div className="page">
        {renderProgressBar(1)}
        <div className="cartPage">
          <div className="cartInfo">
            <div className="textLeft">CART</div>
            <hr className="hrWide" />
            <br />
            <hr className="hrWide hrLong" />
            <table>
              <thead>
                <tr className="headerRow">
                  {["", "PRODUCT", "PRICE", "LICENSES", "TOTAL"].map(
                    (title) => (
                      <th>{title}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {this.props.products.map((product) =>
                  this.renderProduct(product)
                )}
              </tbody>
            </table>
          </div>
          <div className="summaryCart">
            <p className="textRight">SUMMARY</p>
            <hr className="hrWide" />
            <br />
            <hr className="hrWide hrLong" />
            <div className="summaryCartBody">
              <br />
              <div className="rightText">Do you have a promo code?</div>
              <div className="promo">
                <input
                  type="text"
                  id="promo"
                  name="promo"
                  onChange={(e) => this.onChangePromo(e)}
                  value={this.props.cartInfo.discountCode || ""}
                />
                <button type="button" onClick={(e) => this.onClickDiscount(e)}>
                  APPLY
                </button>
              </div>
              <hr />
              <div className="totals">
                <div className="totalLine">
                  <div>Cart Subtotal:</div>
                  <div>
                    {this.state.subtotal.toLocaleString("us-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
                <div className="totalLine">
                  <div>Shipping &amp; Handling:</div>
                  <div>
                    {(this.props.shippingInfo.express ? 5 : 0).toLocaleString(
                      "us-US",
                      { style: "currency", currency: "USD" }
                    )}
                  </div>
                </div>
                <div className="totalLine">
                  <div>Discount:</div>
                  <div>
                    {this.state.discount.toLocaleString("us-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
                <div className="totalLine">
                  <strong>
                    <div>Cart Total:</div>
                  </strong>
                  <div>
                    {this.state.total.toLocaleString("us-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
              </div>
              <hr />
              <span
                className={
                  this.props.products.length === 0
                    ? "buttonCheckout disabled"
                    : "buttonCheckout"
                }
                onClick={(e) => this.onCheckout(e)}
              >
                CHECKOUT
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerCartPage;
