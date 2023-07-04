import React from "react";
import "./ConfirmationPage.css";
import "../Common.css";
import { renderProduct, renderProgressBar } from "../Common.js";
import greenCheckMark from "../../assets/check-mark-green.png";

class ConfirmationPage extends React.Component {
  state = {
    subtotal: this.props.products.reduce(
      (total, product) => total + Number(product.price * product.licenses),
      0
    ),
  };

  onClickHome = () => {
    alert("Go home!");
  };

  onClickTrackOrder = () => {
    alert("We lost your package!  Sorry.");
  };

  render() {
    return (
      <div className="page">
        {renderProgressBar(4)}
        <div className="confirmationPage">
          <div className="confirmationInfo">
            <div className="header">CONFIRMATION</div>
            <hr className="hrWide" />
            <br />
            <hr className="hrWide hrLong" />
            <br /> <br /> <br />
            <img className="checkMark" src={greenCheckMark} alt="check mark" />
            <br />
            <span className="bigText">Congratulations!</span><br />
            <span className="bigText">Your order is accepted.</span>
            <br />
            <div
              className="blackButton"
              onClick={() => this.onClickTrackOrder()}
            >
              TRACK ORDER
            </div>
            <div className="backButton" onClick={() => this.onClickHome()}>
              BACK TO HOME PAGE
            </div>
          </div>
          <div className="summaryConfirmation">
            <div>SUMMARY</div>
            <hr className="hrWide" />
            <div className="greyText">
              {this.props.products.length} products in your Cart.
            </div>
            <hr className="hrWide" />
            {this.props.products.map((product) => renderProduct(product))}
            <hr className="hrWide" />
            <div className="totalsPayment">
              <span className="greyText subtotalLeft">Cart Subtotal:</span>
              <span className="greyText subtotalRight">
                {this.state.subtotal.toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <div className="totalsPayment">
              <span className="greyText subtotalLeft">
                Shipping &amp; Handling:
              </span>
              <span className="greyText subtotalRight">
                {(this.props.shippingInfo.express || this.state.subtotal < 40
                  ? 5
                  : 0
                ).toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <div className="totalsPayment">
              <span className="greyText subtotalLeft">Discount:</span>
              <span className="greyText subtotalRight">
                {(
                  (this.props.cartInfo.discountPct * this.state.subtotal) /
                  100
                ).toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <div className="totalsPayment">
              <span className="greyText subtotalLeft">Cart Total:</span>
              <span className="greyText subtotalRight">
                {(
                  this.state.subtotal -
                  (this.props.cartInfo.discountPct * this.state.subtotal) /
                    100 +
                  (this.props.shippingInfo.express || this.state.subtotal < 40
                    ? 5
                    : 0)
                ).toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <hr className="hrWide" />
            <div>
              <div>SHIPPING ADDRESS</div>
              <div className="greyText">{this.props.shippingInfo.name}</div>
              <div className="greyText">{this.props.shippingInfo.address}</div>
              <div className="greyText">
                {this.props.shippingInfo.city}, {this.props.shippingInfo.state}{" "}
                {this.props.shippingInfo.zipCode}
              </div>
              <div className="greyText">
                Cell phone: ({this.props.shippingInfo.cellPhone.slice(0, 3)}){" "}
                {this.props.shippingInfo.cellPhone.slice(3, 6)}-
                {this.props.shippingInfo.cellPhone.slice(6, 10)}
              </div>
            </div>
            <hr className="hrWide" />
            <div>
              <div>SHIPPING METHOD</div>
              <span className="greyText subtotalRight">
                {this.props.shippingInfo.express ? "EXPRESS: " : "STANDARD: "}
              </span>
              <span className="greyText subtotalRight">
                Delivery in{" "}
                {this.props.shippingInfo.express ? "1 to 3" : "4 to 6"} business
                days
              </span>
            </div>
            <hr className="hrWide" />
            <div>
              <div>PAYMENT INFORMATION</div>
                <span className="greyText rightText">Name on card: </span>
                <span className="greyText rightText">{this.props.paymentInfo.name}</span>
                <br />
                <span className="greyText rightText">Carding ending in: </span>
                <span className="greyText rightText">{this.props.paymentInfo.cardNo.slice(0, 4)}</span>
                <br />
                <span className="greyText rightText">Card expires on: </span>
                <span className="greyText rightText">{this.props.paymentInfo.month}/</span>
                <span className="greyText rightText">{this.props.paymentInfo.year}</span>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationPage;
