import { Container, Button, Card } from "react-bootstrap"
import AppNavbar from "../components/AppNavbar"

const Dashboard = () => {
    return (
        <Container className="">
            <AppNavbar />
            <Card className="p-4 shadow-sm">
                <h2>Welcome to Dashboard</h2>
                <p className="text-muted">Login successfully</p>
            </Card>
        </Container>
    )
}

export default Dashboard;