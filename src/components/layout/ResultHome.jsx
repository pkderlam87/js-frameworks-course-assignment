import React from 'react';
import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


function ResultPage({ id, title, image, alt }) {
    return (
        <>
            <Link to={`detail/${id}`} className="link-page-specific-product">
                <Card>
                    <h3>{title}</h3>
                    <img src={image} alt={alt} />
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
