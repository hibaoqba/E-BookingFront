import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../../styles/paymentForm.css";

const PaymentForm = ({ onPay }) => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const validateForm = () => {
    const errors = {};

    if (!state.number) {
      errors.number = "Numero de carte requis";
    }

    if (!state.name) {
      errors.name = "Nom requis";
    }

    if (!state.expiry) {
      errors.expiry = "Date d'expiration requise";
    } else if (!/^\d{2}\/\d{2}$/.test(state.expiry)) {
      errors.expiry = "Format de date invalide (MM/YY)";
    }

    if (!state.cvc) {
      errors.cvc = "CVC requis";
    } else if (!/^\d{3,4}$/.test(state.cvc)) {
      errors.cvc = "Format CVC invalide";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onPay(state);
    }
  };

  return (
    <div className="payment-container">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className="mt-3">
        <form>
          <div className="mb-3">
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="Numero de carte"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
            {errors.number && (
              <div className="error-message">{errors.number}</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nom"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
            {errors.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <input
                type="text"
                name="expiry"
                className="form-control"
                placeholder="Date d'expiration (MM/YY)"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
              {errors.expiry && (
                <div className="error-message">{errors.expiry}</div>
              )}
            </div>
            <div className="col-6 mb-3">
              <input
                type="number"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
              {errors.cvc && (
                <div className="error-message">{errors.cvc}</div>
              )}
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-dark" onClick={handlePayment}>
              Payer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
