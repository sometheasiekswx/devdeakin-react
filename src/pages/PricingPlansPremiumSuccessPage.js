import React from "react";
import Box from "@mui/material/Box";


const PricingPlansPremiumSuccessPage = () => {
    return (
        <Box sx={{p: 4, m: 4, border: 2, borderColor: 'primary.main', color: 'primary.main', backgroundColor: 'white'}}>
            <h1>Thanks for your order!</h1>
            <p>
                We appreciate your business!
            </p>
            <p>
                If you have any questions, please email <a href="mailto:ssiek@deakin.edu.au">ssiek@deakin.edu.au</a>
            </p>
        </Box>
    );
};

export default PricingPlansPremiumSuccessPage;
