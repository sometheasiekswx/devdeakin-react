import React from "react";
import Box from "@mui/material/Box";


const PricingPlansPremiumCancelPage = () => {
    return (
        <Box sx={{p: 4, m: 4, border: 2, borderColor: 'primary.main', color: 'primary.main', backgroundColor: 'white'}}>
            <h1>Canceled order : (</h1>
            <p>
                It's sad, but baybe next time : )
            </p>
            <p>
                If you have any questions, please email <a href="mailto:ssiek@deakin.edu.au">ssiek@deakin.edu.au</a>
            </p>
        </Box>
    );
};

export default PricingPlansPremiumCancelPage;
