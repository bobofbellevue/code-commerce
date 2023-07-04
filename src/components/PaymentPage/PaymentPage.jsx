import React from "react";
import "./PaymentPage.css";
import "../Common.css";
import {
  months,
  cardYears,
  renderProduct,
  renderProgressBar,
} from "../Common.js";
import parse from "html-react-parser";
import {
  renderLabel,
  renderInputField,
  ValidateFieldNotEmpty,
  ValidateName,
} from "../Validation.js";

class PaymentPage extends React.Component {
  state = {
    subtotal: this.props.products.reduce(
      (total, product) => total + Number(product.price * product.licenses),
      0
    ),
    name: this.props.paymentInfo.name,
    cardNo: this.props.paymentInfo.cardNo,
    month: this.props.paymentInfo.month,
    year: this.props.paymentInfo.year,
    cvv: this.props.paymentInfo.cvv,
    errorCount: 0,
    errorNoName: false,
    errorBadName: false,
    errorNoCardNo: false,
    errorNoMonth: false,
    errorNoYear: false,
    errorNoCvv: false,
  };

  onInputNumber(e) {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  }

  ValidateFieldNotEmpty(field, errorProperty) {
    const status = ValidateFieldNotEmpty(field);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateName(field, errorProperty) {
    const status = ValidateName(field);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidatePayment() {
    let errorCount = 0;
    errorCount += this.ValidateFieldNotEmpty("name", "errorNoName");
    errorCount += this.ValidateName("name", "errorBadName");
    errorCount += this.ValidateFieldNotEmpty("cardNo", "errorNoCardNo");
    errorCount += this.ValidateFieldNotEmpty("month", "errorNoMonth");
    errorCount += this.ValidateFieldNotEmpty("year", "errorNoYear");
    errorCount += this.ValidateFieldNotEmpty("cvv", "errorNoCvv");
    this.setState({ errorCount: errorCount });
    return errorCount;
  }

  onClickPay = () => {
    if (this.ValidatePayment() === 0) {
      this.props.advancePage();
    }
  };

  onClickShipping = () => {
    this.props.previousPage();
  };

  onChangeName(e) {
    this.setState({ name: e.target.value });
    this.props.paymentInfo.name = e.target.value;
  }

  /*
    Supporting the following:
    3=amex 3xxx xxxxxx xxxxx
    4=visa
    5=mastercard
    6=discover
    xxxx xxxx xxxx xxxx
    otherwise, up to 19 digits consecutive
  */
  onChangeCardNo(e) {
    const value = e.target.value.match(/[0-9]/g);
    if (!value) {
      this.setState({ cardNo: "" });
      this.props.paymentInfo.cardNo = "";
      return;
    }
    let cardNo = value.join("");
    let sliceNo = "";
    let newCardNo = "";
    if (cardNo) {
      switch (cardNo[0]) {
        case "3":
          sliceNo = cardNo.slice(0, 4);
          newCardNo = sliceNo;
          if (cardNo.length > 4) {
            sliceNo = cardNo.slice(4, 10);
            newCardNo += " ";
            newCardNo += sliceNo;
          }
          if (cardNo.length > 10) {
            sliceNo = cardNo.slice(10, 15);
            newCardNo += " ";
            newCardNo += sliceNo;
          }
          break;
        case "4":
        case "5":
        case "6":
          for (let i = 0; i < 4; i++) {
            if (cardNo.length <= i * 4) {
              break;
            }
            sliceNo = cardNo.slice(i * 4, i * 4 + 4);
            if (i > 0) {
              newCardNo += " ";
            }
            newCardNo += sliceNo;
          }
          break;
        default:
          newCardNo = cardNo; // numbers only, slammed together
          break;
      }
    }
    this.setState({ cardNo: newCardNo });
    this.props.paymentInfo.cardNo = newCardNo;
  }

  onChangeMonth(e) {
    this.setState({ month: e.target.value });
    this.props.paymentInfo.month = e.target.value;
  }

  onChangeYear(e) {
    this.setState({ year: e.target.value });
    this.props.paymentInfo.year = e.target.value;
  }

  onChangeCvv(e) {
    this.setState({ cvv: e.target.value });
    this.props.paymentInfo.cvv = e.target.value;
  }

  render() {
    return (
      <div className="page">
        {renderProgressBar(3)}
        <div className="paymentPage">
          <div className="paymentInfo">
            <div>PAYMENT INFORMATION</div>
            <hr className="hrWide" />
            <br />
            <hr className="hrWide hrLong" />
            <form className="PaymentForm">
              <p
                className="errorText"
                id="errorMsgPage"
                hidden={this.state.errorCount === 0}
              >
                Please fix the errors indicated below.
              </p>
              {renderLabel(
                "name",
                "Cardholder Name",
                true,
                "errorNoName",
                this.state.errorNoName,
                "This is a required field.",
                this.state.errorBadName,
                "No numbers allowed in name."
              )}
              {renderInputField(
                "text",
                "name",
                this.props.paymentInfo.name,
                (e) => this.onChangeName(e)
              )}
              {renderLabel(
                "cardNo",
                "Card Number",
                true,
                "errorNoCardNo",
                this.state.errorNoCardNo,
                "This is a required field."
              )}
              {renderInputField(
                "text",
                "cardNo",
                this.props.paymentInfo.cardNo,
                (e) => this.onChangeCardNo(e),
                "",
                19
              )}
              {renderLabel(
                "month",
                "Expiration Month",
                true,
                "errorNoMonth",
                this.state.errorNoMonth,
                "This is a required field."
              )}
              <select
                className="baseField"
                name="month"
                id="month"
                defaultValue={
                  this.props.paymentInfo.month
                    ? this.props.paymentInfo.month
                    : "Month"
                }
                onChange={(e) => this.onChangeMonth(e)}
              >
                <option disabled>Month</option>
                {parse(
                  months
                    .map(
                      (month) =>
                        `<option value=${month.abbreviation}>${month.abbreviation}</option>`
                    )
                    .join(" ")
                )}
              </select>
              {renderLabel(
                "year",
                "Expiration Year",
                true,
                "errorNoYear",
                this.state.errorNoYear,
                "This is a required field."
              )}
              <select
                className="baseField"
                name="year"
                id="year"
                defaultValue={
                  this.props.paymentInfo.year
                    ? this.props.paymentInfo.year
                    : "Year"
                }
                onChange={(e) => this.onChangeYear(e)}
              >
                <option disabled>Year</option>
                {parse(
                  cardYears
                    .map(
                      (year) =>
                        `<option value=${year.name}>${year.name}</option>`
                    )
                    .join(" ")
                )}
              </select>
              {renderLabel(
                "cvv",
                "CVV",
                true,
                "errorNoCvv",
                this.state.errorNoCvv,
                "This is a required field."
              )}
              {renderInputField(
                "text",
                "cvv",
                this.props.paymentInfo.cvv,
                (e) => this.onChangeCvv(e),
                "",
                3,
                (e) => this.onInputNumber(e)
              )}
              <br />
              <div className="nextButton" onClick={() => this.onClickPay()}>
                PAY&nbsp;
                {(this.state.subtotal -
                  (this.props.cartInfo.discountPct * this.state.subtotal) /
                    100 +
                  ((this.props.shippingInfo.express || this.state.subtotal < 40)
                  ? +5
                  : 0)
                ).toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </form>
            <div
              className="backButton buttonLeft buttonBottom"
              onClick={() => this.onClickShipping()}
            >
              BACK TO SHIPPING
            </div>
          </div>
          <div className="summaryPayment">
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
            <span className="nextButton" onClick={() => this.onClickPay()}>
              PAY&nbsp;
              {(this.state.subtotal -
                (this.props.cartInfo.discountPct * this.state.subtotal) / 100 +
                ((this.props.shippingInfo.express || this.state.subtotal < 40)
                ? +5
                : 0)
              ).toLocaleString("us-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentPage;
