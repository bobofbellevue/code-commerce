import React from "react";
import "./LoginSignUpPage.css";
import "../Common.css";
import {
  renderLabel,
  renderInputField,
  ValidateFieldNotEmpty,
  ValidateName,
  ValidateZipCode,
  onInputNumber,
} from "../Validation.js";
import eyeSlash from "../../assets/eye-password-hide-svgrepo-com.svg";
import eyeOpen from "../../assets/eye-password-show-svgrepo-com.svg";

class LoginSignUpPage extends React.Component {
  state = {
    status: false, // false = login, true = create account
    errorCount: 0,
    email: this.props.loginInfo.email,
    password: this.props.loginInfo.password,
    confirm: this.props.loginInfo.confirm,
    first: this.props.loginInfo.first,
    last: this.props.loginInfo.last,
    zipCode: this.props.loginInfo.zipCode,
    errorNoEmail: false,
    errorNoPassword: false,
    errorBadPassword: false,
    errorNoConfirmPassword: false,
    errorNoMatchPassword: false,
    errorNoFirstName: false,
    errorBadFirstName: false,
    errorNoLastName: false,
    errorBadLastName: false,
    errorNoZipCode: false,
    errorBadZipCode: false,
    revealPassword: false,
  };

  onChangeStatus = () => {
    this.setState({ status: !this.state.status });
  };

  ValidatePasswordMatch(errorProperty) {
    if (this.state.password.length === 0 || this.state.confirm.length === 0) {
      this.setState({ [errorProperty]: false });
      return 0;
    }
    if (this.state.password !== this.state.confirm) {
      this.setState({ [errorProperty]: true });
      return 1;
    }
    this.setState({ [errorProperty]: false });
    return 0;
  }

  ValidatePassword(errorProperty) {
    if (!this.state.password) {
      this.setState({ [errorProperty]: false });
      return 0;
    }
    if (
      this.state.password.length < 8 ||
      this.state.password.length > 20 ||
      this.state.password.match("/[A-Z]/") != null ||
      this.state.password.match("/[a-z]/") != null ||
      this.state.password.match("/[0-9]/") != null ||
      this.state.password.match("/[!|@|#|$|%|^|(|)|_|+]/") != null
    ) {
      this.setState({ [errorProperty]: true });
      return 1;
    }
    this.setState({ [errorProperty]: false });
    return 0;
  }

  ValidateFieldNotEmpty(field, errorProperty) {
    const status = ValidateFieldNotEmpty(this.state[field]);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateName(field, errorProperty) {
    const status = ValidateName(this.state[field]);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateZipCode(field, errorProperty) {
    const status = ValidateZipCode(this.state[field]);
    this.setState({ [errorProperty]: !status });
    return status ? 0 : 1;
  }

  ValidateLogin() {
    let errorCount = 0;
    errorCount += this.ValidateFieldNotEmpty("email", "errorNoEmail");
    errorCount += this.ValidateFieldNotEmpty("password", "errorNoPassword");
    errorCount += this.ValidatePassword("errorBadPassword");
    if (this.state.status) {
      errorCount += this.ValidateFieldNotEmpty(
        "confirm",
        "errorNoConfirmPassword"
      );
      errorCount += this.ValidatePasswordMatch("errorNoMatchPassword");
      errorCount += this.ValidateFieldNotEmpty("first", "errorNoFirstName");
      errorCount += this.ValidateName("first", "errorBadFirstName");
      errorCount += this.ValidateFieldNotEmpty("last", "errorNoLastName");
      errorCount += this.ValidateName("last", "errorBadLastName");
      errorCount += this.ValidateFieldNotEmpty("zipCode", "errorNoZipCode");
      errorCount += this.ValidateZipCode("zipCode", "errorBadZipCode");
    }
    this.setState({ errorCount: errorCount });
    return errorCount;
  }

  onClickSave = () => {
    if (this.ValidateLogin() === 0) {
      this.props.advancePage();
    }
  };

  onClickEye = () => {
    this.setState({ revealPassword: !this.state.revealPassword });
  };

  renderPasswordField(name, value, onChange) {
    return (
      <span className="passwordContainer">
        <input
          className="baseField passwordInput"
          type={this.state.revealPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
        />
        <img
          onClick={this.onClickEye}
          src={this.state.revealPassword ? eyeOpen : eyeSlash}
          className="eye"
          alt="eye"
        />
      </span>
    );
  }

  onChangeField(e, field) {
    this.setState({ [field]: e.target.value });
    this.props.loginInfo[field] = e.target.value;
  }

  render() {
    return (
      <div>
        <script
          src="https://kit.fontawesome.com/621f3ac402.js"
          crossOrigin="anonymous"
        ></script>
        <form className="page loginPage">
          <p className="cancelX">&#x2715;</p>
          <div className="modeRow" onChange={this.onChangeStatus}>
            <input
              type="radio"
              id="signin"
              name="mode"
              value="signin"
              defaultChecked
            />
            <label htmlFor="signin">SIGN IN</label>
            <input type="radio" id="create" name="mode" value="create" />
            <label htmlFor="create">CREATE ACCOUNT</label>
          </div>
          <p
            className="errorText"
            id="errorMsgPage"
            hidden={this.state.errorCount === 0}
          >
            Please fix the errors indicated below.
          </p>
          {renderLabel(
            "email",
            "Your E-Mail Address",
            true,
            "errorMsgEmail",
            this.state.errorNoEmail
          )}
          {renderInputField(
            "text",
            "email",
            this.props.loginInfo.email,
            (e) => this.onChangeField(e, "email"),
            "name@mail.com"
          )}
          {renderLabel(
            "password",
            this.state.status ? "Create Password" : "Password",
            true,
            "errorMsgPassword",
            this.state.errorNoPassword,
            "This is a required field.",
            this.state.errorBadPassword,
            "Password is invalid."
          )}
          {this.renderPasswordField(
            "password",
            this.props.loginInfo.password,
            (e) => this.onChangeField(e, "password")
          )}
          {this.state.status ? (
            <p className="instructionText">
              Password must be 8-20 characters, including at least one capital
              letter, at least one small letter, one number, and one special
              character - ! @ # $ % ^ ( ) _ +
            </p>
          ) : (
            ""
          )}
          {this.state.status
            ? renderLabel(
                "confirm",
                "Confirm Password",
                true,
                "errorMsgConfirm",
                this.state.errorNoConfirmPassword,
                "This is a required field.",
                this.state.errorNoMatchPassword,
                "Passwords do not match."
              )
            : ""}
          {this.state.status
            ? this.renderPasswordField(
                "confirm",
                this.props.loginInfo.confirm,
                (e) => this.onChangeField(e, "confirm")
              )
            : ""}
          {this.state.status
            ? renderLabel(
                "first",
                "First Name",
                true,
                "errorMsgFirst",
                this.state.errorNoFirstName,
                "This is a required field.",
                this.state.errorBadFirstName,
                "No numbers allowed in the name."
              )
            : ""}
          {this.state.status
            ? renderInputField(
                "text",
                "first",
                this.props.loginInfo.first,
                (e) => this.onChangeField(e, "first")
              )
            : ""}
          {this.state.status
            ? renderLabel(
                "last",
                "Last Name",
                true,
                "errorMsgLast",
                this.state.errorNoLastName,
                "This is a required field.",
                this.state.errorBadLastName,
                "No numbers allowed in the name."
              )
            : ""}
          {this.state.status
            ? renderInputField("text", "last", this.props.loginInfo.last, (e) =>
                this.onChangeField(e, "last")
              )
            : ""}
          {this.state.status
            ? renderLabel(
                "zipCode",
                "Zip Code",
                true,
                "errorMsgZip",
                this.state.errorNoZipCode,
                "This is a required field.",
                this.state.errorBadZipCode,
                "Invalid zip code format."
              )
            : ""}
          {this.state.status
            ? renderInputField(
                "text",
                "zipCode",
                this.props.loginInfo.zipCode,
                (e) => this.onChangeField(e, "zipCode"),
                "",
                5,
                (e) => onInputNumber(e)
              )
            : ""}
          <br />
          {this.state.status ? (
            <span onClick={this.onClickSave} className="buttonSave">
              SAVE
            </span>
          ) : (
            <span onClick={this.onClickSave} className="buttonSave">
              SIGN IN
            </span>
          )}
          <br />
          <div className="strikeWrapper">
            <div className="strikeLine"></div>
            <div className="strikeText">or</div>
            <div className="strikeLine"></div>
          </div>
          <br />
          {this.state.status ? (
            <span className="buttonFacebook">
              f&nbsp;&nbsp;SIGN UP WITH FACEBOOK
            </span>
          ) : (
            <span className="buttonFacebook">
              f&nbsp;&nbsp;SIGN IN WITH FACEBOOK
            </span>
          )}
          <div className="strikeWrapper">
            <p className="strikeText centerMe">
              <a href="#">Cancel</a>
            </p>
          </div>
          <div className="strikeWrapper">
            <div className="loginFooter centerMe">
              <a className="instructionText" href="#">
                Privacy Policy and Cookies
              </a>
              <span>|</span>
              <a className="instructionText" href="#">
                Terms of Sale and Use
              </a>
            </div>
          </div>
          <p></p>
        </form>
        <br />
      </div>
    );
  }
}

export default LoginSignUpPage;
