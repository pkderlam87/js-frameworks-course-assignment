import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ResultPage from '../layout/ResultHome';
import { BASE_URL } from '../../constants/api';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from '../layout/Heading';

const url = BASE_URL + "/wc/store/products";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function axiosData() {
            try {
                const response = await axios.get(url);

                if (response.status === 200) {
                    setProducts(response.data);
                } else {
                    setError("An error occurred");
                }
            } catch (error) {
                setError(error.toString());
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        axiosData();
    }, []);
    if (loading) {
        return <div className='loading'><div></div><div></div><div></div><div></div></div>
    }
    if (error) {
        console.log(error);
        return <div>An error occurred: {error}</div>
    }
    return (
        <>
            <section className='welcome'>
                <Heading content="Welcome to our online store"></Heading>
            </section>
            <Container>
                <Row gap={2}>
                    {products.map((product) => {
                        const { id, name } = product;
                        const { price } = product.prices;
                        const image = product.images[0].src;
                        const alt = product.images[0].alt;

                        return (
                            <Col sm={12} md={6} lg={4} key={id}>
                                <ResultPage id={id} title={name} price={price} image={image} alt={alt} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Home;
