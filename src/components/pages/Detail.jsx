import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BASE_URL } from '../../constants/api'
import Heading from '../layout/Heading';

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
    console.log(product);
    return (
        <>
            {product.map((productDetail) => {
                const { id, name } = productDetail;
                const { price } = productDetail.prices;
                const image = productDetail.images[0].src;
                const alt = productDetail.images[0].alt;

                return (
                    <Container key={id}>
                        <Heading>{name}</Heading>
                        <div className='product-detail'>
                            <img src={image} alt={alt} className="details-image" />
                            <h1>The price is only {price},- NOK</h1>
                        </div>
                    </Container>
                );
            })}
        </>
    );
}

export default PageDetail;