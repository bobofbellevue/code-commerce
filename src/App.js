import "./App.css";
import LoginSignUpPage from "./components/LoginSignUpPage/LoginSignUpPage";
import CustomerCartPage from "./components/CustomerCartPage/CustomerCartPage";
import ShippingPage from "./components/ShippingPage/ShippingPage";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage/ConfirmationPage";
import { useState } from "react";
import {
  products,
  shippingInfo,
  paymentInfo,
  loginInfo,
  cartInfo,
} from "./components/Data.js";

function App() {
  const [screen, setScreen] = useState(0); // 0=login, 1=cart, 2=shipping, 3=payment, 4=confirmation
  const advancePage = () => {
    setScreen(screen + 1);
  };

  const previousPage = () => {
    setScreen(screen - 1);
  };

  const updateShippingInfo = (
    express,
    name,
    address,
    zipCode,
    city,
    state,
    cellPhone,
    telephone
  ) => {
    shippingInfo.express = express;
    shippingInfo.name = name;
    shippingInfo.address = address;
    shippingInfo.zipCode = zipCode;
    shippingInfo.city = city;
    shippingInfo.state = state;
    shippingInfo.cellPhone = cellPhone;
    shippingInfo.telephone = telephone;
  };

  const updatePaymentInfo = (name, cardNo, month, year, cvv) => {
    paymentInfo.name = name;
    paymentInfo.cardNo = cardNo;
    paymentInfo.month = month;
    paymentInfo.year = year;
    paymentInfo.cvv = cvv;
  };

  const updateLoginInfo = (email, password, confirm, first, last, zipCode) => {
    loginInfo.email = email;
    loginInfo.password = password;
    loginInfo.confirm = confirm;
    loginInfo.first = first;
    loginInfo.last = last;
    loginInfo.zipCode = zipCode;
  };

  const updateCartInfo = (discountCode, discountPct) => {
    cartInfo.discountCode = discountCode;
    cartInfo.discountPct = discountPct;
  };

  return (
    <div className="App">
      <header className="App-header">
        {screen === 0 ? (
          <LoginSignUpPage
            advancePage={advancePage}
            loginInfo={loginInfo}
            updateLoginInfo={updateLoginInfo}
          />
        ) : (
          ""
        )}
        {screen === 1 ? (
          <CustomerCartPage
            advancePage={advancePage}
            products={products}
            shippingInfo={shippingInfo}
            cartInfo={cartInfo}
            updateCartInfo={updateCartInfo}
          />
        ) : (
          ""
        )}
        {screen === 2 ? (
          <ShippingPage
            advancePage={advancePage}
            previousPage={previousPage}
            products={products}
            shippingInfo={shippingInfo}
            updateShippingInfo={updateShippingInfo}
            cartInfo={cartInfo}
          />
        ) : (
          ""
        )}
        {screen === 3 ? (
          <PaymentPage
            advancePage={advancePage}
            previousPage={previousPage}
            products={products}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            updatePaymentInfo={updatePaymentInfo}
            cartInfo={cartInfo}
          />
        ) : (
          ""
        )}
        {screen === 4 ? (
          <ConfirmationPage
            advancePage={advancePage}
            previousPage={previousPage}
            products={products}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            cartInfo={cartInfo}
          />
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
