import { Container, Button, Card } from "react-bootstrap";

const Dashboard = () => {

    return (
        <Container className="py-5">
            <Card className="py-4">
                <h2>Welcome to Dashboard</h2>
                <p className="text-muted">Login Successfully</p>
            </Card>
        </Container>
    );
};

export default Dashboard;