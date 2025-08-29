import React from "react";
import {
  Card,
  Button,
  Typography,
  Layout,
  Menu,
  Row,
  Col,
  message,
} from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  ScheduleOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import bystanderAxiosInstance from "@/config/BystanderAxiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeBystanderToken } from "@/redux/slice/bystanderTokenSlice";
import { ErrorToast, SuccessToast } from "@/components/shared/Tost";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const BystanderHome: React.FC = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  // Example logout function
  const handleLogout = async () => {
    try {
      // Call your API endpoint for logout
      const response = await bystanderAxiosInstance.post('/logout')

      if (response.data.success) {
        SuccessToast("Logged out successfully!");
        // Redirect to login page or homepage
        dispatch(removeBystanderToken());
      navigate('/login')
      } else {
        ErrorToast("Logout failed. Please try again.");
        
      }
    } catch (error) {
      ErrorToast(`Logout error: ${error}`)
     
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div
          className="logo"
          style={{ color: "white", padding: "16px", textAlign: "center" }}
        >
          <Title level={3} style={{ color: "white" }}>
            MedSched
          </Title>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            {" "}
            Patient Details{" "}
          </Menu.Item>
          <Menu.Item key="2" icon={<ScheduleOutlined />}>
            {" "}
            Medicine Scheduler{" "}
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            {" "}
            Analytics{" "}
          </Menu.Item>
          <Menu.Item key="4" icon={<InfoCircleOutlined />}>
            {" "}
            Help & Support{" "}
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
            {" "}
            Logout{" "}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Title level={3} style={{ margin: "16px" }}>
            Bystander Dashboard
          </Title>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card title="Patient Details" bordered={false}>
                <Text>
                  View and manage the details of your assigned patient.
                </Text>
                <Button type="primary" style={{ marginTop: "10px" }}>
                  View Details
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card title="Medicine Scheduler" bordered={false}>
                <Text>
                  Schedule and manage the medicine intake for your patient.
                </Text>
                <Button type="primary" style={{ marginTop: "10px" }}>
                  Schedule Now
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card title="Analytics" bordered={false}>
                <Text>
                  View analytics of your patient's medicine intake and health
                  progress.
                </Text>
                <Button type="primary" style={{ marginTop: "10px" }}>
                  View Analytics
                </Button>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BystanderHome;
