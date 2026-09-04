import { Table, Container, Badge, Card, Row, Col, Button } from "react-bootstrap";
import AppModal from "../components/AppModal";
import UserForm from "../components/UserForm";
import { useEffect, useState } from "react";
import api from "../services/api";
import AppNavbar from "../components/AppNavbar";

const User = () => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isEdit, setIdEdit] = useState(false);
    const [validationError, setValidationError] = useState({});

    const initialForm = {
        id: null,
        name: "",
        email: "",
        password: "",
        status: true,
    };
    const [formData, setFormData] = useState(initialForm);

    // useEffect
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/user');
            const result = response.data
            setUsers(result);
            // console.log("Result fetch", result);
        } catch (error) {
            console.log("Error fetching user", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setIdEdit(false);
        setFormData(initialForm);
        setShow(true);
    };
    const handleCloseModal = () => {
        setShow(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitLoading(true);
        try {
            const payload = { ...formData };
            const response = await api.post("/user", payload);
            setShow(false);
            fetchUsers();
        } catch (error) {
            console.log("error", error);

            if (error.response) {
                if (error.response.status === 422 && error.response.data.error) {
                    const rawErrors = error.response.data.error;
                    const formatError = {}

                    Object.keys(rawErrors).forEach((key) => {
                        formatError[key] = rawErrors[key][0];
                    })
                    setValidationError(formatError);
                } else {
                    // 500
                    const errMsg = error.response?.data?.message || "Internal Server Error";
                }
            };
        } finally {
            setSubmitLoading(false);
        }
    };
    // console.log(formData);

    useEffect(() => {
        fetchUsers();
    }, [])
    // console.log(show);
    return (
        <Container className="">
            <AppNavbar />
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h3>User Management</h3>
                            <p className="text-muted mb-0">Data User Management</p>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" onClick={handleCreate}>+ Create New User</Button>
                        </Col>
                    </Row>

                    <Table responsive hover bordered className="align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Badge bg={user.status === "active" ? "success" : "secondary"}>
                                            {user.status || "Active"}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                        <Button variant="danger" size="sm">Hapus</Button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <AppModal show={show} handleClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New User"} submitText={isEdit ? "Save Change" : "Save"} variant={isEdit ? 'warning' : 'primary'} isLoading={submitLoading} formId="user-form">
                <UserForm errors={validationError} formId="user-form" formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            </AppModal>
        </Container>
    )
}
export default User;