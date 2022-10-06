import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../../constants/api'
import Heading from '../layout/Heading';

/**
 * This function is a specific request to a "/wc/store/products/ + id" endpoint.
 * @returns <Detail>
 */

function PageDetail() {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    let history = useNavigate();

    const { id } = useParams();

    const url = BASE_URL + "/wc/store/products/" + id;

    useEffect(() => {
        async function axioData() {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setProduct(response.data);
                } else {
                    if (!id) {
                        history(-1);
                    }
                    setError("An error occurred");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        axioData();
    }
    );

    if (loading) {
        return <div className='loading'><div></div><div></div><div></div><div></div></div>;
    }

    if (error) {
        return <div>An error occurred: {error}</div>;
    }
    return (
        <>
            <Container key={product.id} className="wrapper">
                <section className='welcome__other--pages'>
                </section>
                <div className='product-detail'>
                    <img src={product.images[0].thumbnail} alt={product.images[0].alt} className="details-image" />
                    <Col>
                        <Row>
                            <Heading content={product.name}></Heading>
                        </Row>
                        <Row>
                            <h1>The price is only {product.prices.price},- NOK</h1>
                        </Row>
                    </Col>
                </div>
            </Container>
        </>
    );
}

export default PageDetail;
/**
 *  
 */