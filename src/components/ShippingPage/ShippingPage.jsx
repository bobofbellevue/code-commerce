import React from "react";
import "./ShippingPage.css";
import "../Common.css";
import { usStates, renderProduct, renderProgressBar } from "../Common.js";
import parse from "html-react-parser";
import {
  renderLabel,
  renderInputField,
  ValidateFieldNotEmpty,
  ValidateName,
  ValidateZipCode,
  onInputNumber,
} from "../Validation.js";

class ShippingPage extends React.Component {
  state = {
    subtotal: this.props.products.reduce(
      (total, product) => total + Number(product.price * product.licenses),
      0
    ),
    express: this.props.shippingInfo.express,
    name: this.props.shippingInfo.name,
    address: this.props.shippingInfo.address,
    zipCode: this.props.shippingInfo.zipCode,
    city: this.props.shippingInfo.city,
    state: this.props.shippingInfo.state,
    cellPhone: this.props.shippingInfo.cellPhone,
    telephone: this.props.shippingInfo.telephone,
    errorCount: 0,
    errorNoName: false,
    errorBadName: false,
    errorNoZipCode: false,
    errorBadZipCode: false,
    errorNoAddress: false,
    errorNoCity: false,
    errorBadCity: false,
    errorNoState: false,
    errorNoCellPhone: false,
    errorBadCellPhone: false,
    errorBadTelephone: false,
  };

  createStateList() {
    return usStates
      .map(
        (state) =>
          `<option value=${state.abbreviation}>${state.abbreviation}</option>`
      )
      .join(" ");
  }

  onClickShipping(express) {
    this.setState({ express: express });
  }

  ValidatePhone(field, errorPropertyNoPhone, errorPropertyBadPhone) {
    const phone = this.state[field];
    let errorCount = 0;
    if (errorPropertyNoPhone) {
      if (phone.length === 0) {
        this.setState({ [errorPropertyNoPhone]: true });
        errorCount++;
      } else {
        this.setState({ [errorPropertyNoPhone]: false });
      }
    }
    if (errorPropertyBadPhone) {
      if (phone.length > 0 && (phone.length !== 10 || !/^\d+$/.test(phone))) {
        this.setState({ [errorPropertyBadPhone]: true });
        errorCount++;
      } else {
        this.setState({ [errorPropertyBadPhone]: false });
      }
    }
    return errorCount;
  }

  ValidateState(errorPropertyNoState) {
    if (this.state.state === "Select a state...") {
      this.setState({ [errorPropertyNoState]: true });
      return 1;
    }
    this.setState({ [errorPropertyNoState]: false });
    return 0;
  }

  ValidateFieldNotEmpty(value, errorProperty) {
    const status = ValidateFieldNotEmpty(value);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateName(field, errorProperty) {
    const status = ValidateName(this.state[field]);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateZipCode(errorProperty) {
    const status = ValidateZipCode(this.state.zipCode);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateShipping() {
    let errorCount = 0;
    errorCount += this.ValidateFieldNotEmpty("name", "errorNoName");
    errorCount += this.ValidateName("name", "errorBadName");
    errorCount += this.ValidateFieldNotEmpty("zipCode", "errorNoZipCode");
    errorCount += this.ValidateZipCode("errorBadZipCode");
    errorCount += this.ValidateFieldNotEmpty("address", "errorNoAddress");
    errorCount += this.ValidateFieldNotEmpty("city", "errorNoCity");
    errorCount += this.ValidateName("city", "errorBadCity");
    errorCount += this.ValidateState("errorNoState");
    errorCount += this.ValidatePhone(
      "cellPhone",
      "errorNoCellPhone",
      "errorBadCellPhone"
    );
    errorCount += this.ValidatePhone("telephone", "", "errorBadTelephone");
    this.setState({ errorCount: errorCount });
    return errorCount;
  }

  onClickPay = () => {
    if (this.ValidateShipping() === 0) {
      this.props.updateShippingInfo(
        this.state.express,
        this.state.name,
        this.state.address,
        this.state.zipCode,
        this.state.city,
        this.state.state,
        this.state.cellPhone,
        this.state.telephone
      );
      this.props.advancePage();
    }
  };

  onClickCart = () => {
    this.props.previousPage();
  };

  onChangeField(e, field) {
    this.setState({ [field]: e.target.value });
    this.props.shippingInfo[field] = e.target.value;
  }

  renderShippingForm() {
    return (
      <form className="shippingForm">
        <p
          className="errorText"
          id="errorMsgPage"
          hidden={this.state.errorCount === 0}
        >
          Please fix the errors indicated below.
        </p>
        {renderLabel(
          "name",
          "Your Name",
          true,
          "errorNoName",
          this.state.errorNoName,
          "This is a required field.",
          this.state.errorBadName,
          "No numbers allowed in name."
        )}
        {renderInputField("text", "name", this.props.shippingInfo.name, (e) =>
          this.onChangeField(e, "name")
        )}
        {renderLabel(
          "address",
          "Your Address",
          true,
          "errorNoAddress",
          this.state.errorNoAddress,
          "This is a required field."
        )}
        {renderInputField(
          "text",
          "address",
          this.props.shippingInfo.address,
          (e) => this.onChangeField(e, "address")
        )}
        {renderLabel(
          "zipCode",
          "Zip Code",
          true,
          "errorNoZip",
          this.state.errorNoZipCode,
          "This is a required field.",
          this.state.errorBadZipCode,
          "Invalid zip code format."
        )}
        {renderInputField(
          "text",
          "zipCode",
          this.props.shippingInfo.zipCode,
          (e) => this.onChangeField(e, "zipCode"),
          "",
          5,
          (e) => onInputNumber(e)
        )}
        {renderLabel(
          "city",
          "City",
          true,
          "errorNoCity",
          this.state.errorNoCity,
          "This is a required field.",
          this.state.errorBadCity,
          "No numbers allowed in city name."
        )}
        {renderInputField("text", "city", this.props.shippingInfo.city, (e) =>
          this.onChangeField(e, "city")
        )}
        {renderLabel(
          "state",
          "State",
          true,
          "errorNoState",
          this.state.errorNoState,
          "This is a required field."
        )}
        <select
          className="baseField"
          name="state"
          id="state"
          defaultValue={
            this.props.shippingInfo.state
              ? this.props.shippingInfo.state
              : "Select a state..."
          }
          onChange={(e) => this.onChangeField(e, "state")}
        >
          <option disabled>Select a state...</option>
          {parse(
            usStates
              .map(
                (state) =>
                  `<option value=${state.abbreviation}>${state.abbreviation}</option>`
              )
              .join(" ")
          )}
        </select>
        {renderLabel(
          "cellPhone",
          "Cell Phone",
          true,
          "errorNoCellPhone",
          this.state.errorNoCellPhone,
          "This is a required field.",
          this.state.errorBadCellPhone,
          "Cell phone number format is bad."
        )}
        {renderInputField(
          "text",
          "cellPhone",
          this.props.shippingInfo.cellPhone,
          (e) => this.onChangeField(e, "cellPhone"),
          "",
          10,
          (e) => onInputNumber(e)
        )}
        {renderLabel(
          "telephone",
          "Telephone",
          false,
          "errorBadTelephone",
          this.state.errorBadTelephone,
          "Telephone number format is bad."
        )}
        {renderInputField(
          "text",
          "telephone",
          this.props.shippingInfo.telephone,
          (e) => this.onChangeField(e, "telephone"),
          "",
          10,
          (e) => onInputNumber(e)
        )}
      </form>
    );
  }

  renderShippingLabel(type, express) {
    return (
      <label className="shippingRadio" htmlFor={type}>
        {this.state.express === express ? (
          <input
            type="radio"
            id={type}
            name="shipping"
            value={type.toUpperCase()}
            defaultChecked
            onClick={() => this.onClickShipping(express)}
          />
        ) : (
          <input
            type="radio"
            id={type}
            name="shipping"
            value={type.toUpperCase()}
            onClick={() => this.onClickShipping(express)}
          />
        )}
        &nbsp;&nbsp;{type.toUpperCase()}
      </label>
    );
  }

  renderShippingMethod() {
    return (
      <div className="shippingMethod">
        <div>SHIPPING METHOD</div>
        <form className="shippingMethodForm">
          <div className="shippingLine">
            {this.renderShippingLabel("standard", false)}
            <span className="greyText shippingText">
              Delivery in 4-6 Business Days - Free ($40 min.)
            </span>
          </div>
          <div className="shippingLine">
            {this.renderShippingLabel("express", true)}
            <span className="greyText shippingText">
              Delivery in 1-3 Business Days - $5.00
              <br />
              <a href="#">View Shipping Details</a>
            </span>
          </div>
        </form>
      </div>
    );
  }

  renderSummaryShipping() {
    return (
      <div className="summaryShipping">
        <div>SUMMARY</div>
        <hr className="hrWide" />
        <div className="greyText">
          {this.props.products.length} products in your Cart.
        </div>
        <hr className="hrWide" />
        {this.props.products.map((product) => renderProduct(product))}
        <hr className="hrWide" />
        <div className="totalsShipping">
          <span className="greyText subtotalLeft">Cart Subtotal:</span>
          <span className="greyText subtotalRight">
            {this.state.subtotal.toLocaleString("us-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="totalsShipping">
          <span className="greyText subtotalLeft">
            Shipping &amp; Handling:
          </span>
          <span className="greyText subtotalRight">
            {(this.state.express || this.state.subtotal < 40
              ? 5
              : 0
            ).toLocaleString("us-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="totalsShipping">
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
        <div className="totalsShipping">
          <span className="greyText subtotalLeft">Cart Total:</span>
          <span className="greyText subtotalRight">
            {(
              this.state.subtotal -
              (this.props.cartInfo.discountPct * this.state.subtotal) / 100 +
              (this.state.express || this.state.subtotal < 40 ? 5 : 0)
            ).toLocaleString("us-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <hr className="hrWide" />
        <span className="nextButton" onClick={() => this.onClickPay()}>
          GO TO PAYMENT
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        {renderProgressBar(2)}
        <div className="shippingPage">
          <div className="shippingInfo">
            <div>SHIPPING INFORMATION</div>
            <hr className="hrWide" />
            <br />
            <hr className="hrWide hrLong" />
            {this.renderShippingForm()}
            {this.renderShippingMethod()}
            <span className="backButton" onClick={() => this.onClickCart()}>
              BACK TO CART
            </span>
          </div>
          {this.renderSummaryShipping()}
        </div>
      </div>
    );
  }
}

export default ShippingPage;
