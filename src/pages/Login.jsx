import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post(`/login`, {
                email, password,
            });
            
            // const data = await response.json();
            // if (!response.ok) {
            //     if (response.status === 422 && data.error) {
            //         const firstKey = Object.keys(data.error)[0];
            //         setError(data.error[firstKey][0]);
            //     } else {
            //         setError(data.message || "Ups Email and Password fail");
            //     }
            //     return;
            // }
            localStorage.setItem("token", response.token);
            navigate("/dashboard")
        } catch (error) {
            console.log(error.response);
            if (error.response) {
                if (error.response.status === 422 && error.response.data.error) {
                    const rawErrors = error.response.data.error;
                    const formatError = {}

                    Object.keys(rawErrors).forEach((key) => {
                        formatError[key]= rawErrors[key][0];

                    })
                    setError(formatError);
                } else if (error.response.status === 401) {
                    setError(error.response.data.message || "Please check your email and password!");
                } else {
                    // 500
                    setError('Server Error');
                }
            }
            setError('Server Error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <h3 className="text-center mb-4 font-weight-bold">Login Form</h3>
                            {/* {error && <Alert variant="danger">{error}</Alert>} */}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!error?.email}></Form.Control>
                                    <Form.Control.Feedback type="invalid"> {error?.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                </Form.Group>
                                    <Form.Control.Feedback type="invalid"> {error?.password}</Form.Control.Feedback>
                                <Button variant="primary" type="submit" className="w-100 py-2 mt-2" disabled disabled={loading}>{loading ? "Loading...." : "Login"}</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Login;