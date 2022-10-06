import React, { useEffect, useMemo, useState } from "react";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Box from "@mui/material/Box";
import { useFirebaseAuth } from "../firebase";


function useResponsiveFontSize() {
    const getFontSize = () => (window.innerWidth < 450 ? "16px" : "18px");
    const [fontSize, setFontSize] = useState(getFontSize);

    useEffect(() => {
        const onResize = () => {
            setFontSize(getFontSize());
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    });

    return fontSize;
}

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const PricingPlansPremiumPage = () => {
    const user = useFirebaseAuth()

    const item = {
        price: 'price_1LpuBaCKKbs7bUgZJSknHTpL',
        quantity: 1,
    }
    const checkoutOptions = {
        listItems: [item],
        mode: 'subscription',
        successUrl: `${window.location.origin}/plans/premium/success`,
        cancelUrl: `${window.location.origin}/plans/premium/cancel`,
        customer_email: user.email
    }

    const redirectToCheckout = async () => {
        const session = await stripe.redirectToCheckout(checkoutOptions)
        console.log(session)
    }

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        console.log("[PaymentMethod]", payload);
    };

    return (
        <Box sx={{p: 4, m: 4, border: 2, borderColor: 'primary.main', backgroundColor: 'white'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    Card number
                    <CardNumberElement
                        options={options}
                        onReady={() => {
                            console.log("CardNumberElement [ready]");
                        }}
                        onChange={event => {
                            console.log("CardNumberElement [change]", event);
                        }}
                        onBlur={() => {
                            console.log("CardNumberElement [blur]");
                        }}
                        onFocus={() => {
                            console.log("CardNumberElement [focus]");
                        }}
                    />
                </label>
                <label>
                    Expiration date
                    <CardExpiryElement
                        options={options}
                        onReady={() => {
                            console.log("CardNumberElement [ready]");
                        }}
                        onChange={event => {
                            console.log("CardNumberElement [change]", event);
                        }}
                        onBlur={() => {
                            console.log("CardNumberElement [blur]");
                        }}
                        onFocus={() => {
                            console.log("CardNumberElement [focus]");
                        }}
                    />
                </label>
                <label>
                    CVC
                    <CardCvcElement
                        options={options}
                        onReady={() => {
                            console.log("CardNumberElement [ready]");
                        }}
                        onChange={event => {
                            console.log("CardNumberElement [change]", event);
                        }}
                        onBlur={() => {
                            console.log("CardNumberElement [blur]");
                        }}
                        onFocus={() => {
                            console.log("CardNumberElement [focus]");
                        }}
                    />
                </label>
                <button type="submit">
                    Subscribe
                </button>
            </form>
        </Box>
    );
};

export default PricingPlansPremiumPage;
