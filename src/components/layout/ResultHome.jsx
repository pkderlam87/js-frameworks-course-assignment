import React from 'react';
import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

/**
 * 
 * @param - use propTypes to check the type of parameter
 * @returns <Row><Col><Row> - Grid with the API(endpoint "/wc/store/products") content
 */

function ResultPage({ id, title, image, alt, price }) {
    return (
        <>
            <Link to={`detail/${id}`} className="link-page-specific-product">
                <Card>
                    <h3>{title}</h3>
                    <img src={image} alt={alt} />
                    <h4>Only {price} NOK</h4>
                </Card>
            </Link>
        </>
    )
}

ResultPage.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};
export default ResultPage;
