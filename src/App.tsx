import { productAPI } from "./services/ProductServices";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Badge,
  Pagination,
  Spin,
  Grid,
} from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import { useState } from "react";

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { useBreakpoint } = Grid;

const App = () => {
  const [pagination, setPagination] = useState({ limit: 8, page: 1 });
  const screens = useBreakpoint();
  const {
    data: products,
    isLoading,
    error,
    isFetching,
  } = productAPI.useFetchAllProductsQuery(pagination);

  const handlePagination = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  return (
    <div>
      <Layout>
        <Sider
          collapsed={screens.xl ? false : true}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              nav 4
            </Menu.Item>
            <Menu.Item key="5" icon={<CloudOutlined />}>
              nav 5
            </Menu.Item>
            <Menu.Item key="6" icon={<AppstoreOutlined />}>
              nav 6
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              nav 7
            </Menu.Item>
            <Menu.Item key="8" icon={<ShopOutlined />}>
              nav 8
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: screens.xl ? 200 : 80 }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Menu mode="horizontal">
              <Menu.Item key="1">
                <Badge count={99}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "30px", color: "#08c" }}
                  />
                </Badge>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              {isLoading && isFetching && <Spin />}
              {error && <h1>Ошибка при загрузке товаров</h1>}
              <Row gutter={[16, 16]}>
                  {products &&
                    products.map((product) => (
                      <Col xs={24} sm={24} md={12} xl={6} xxl={6}>
                          <Card
                            key={product.id}
                            hoverable
                            cover={<img alt="example" src={product.imageUrl} />}
                          >
                            <Meta
                              title={product.title}
                              description={`${product.price}р`}
                            />
                          </Card>
                      </Col>
                    ))}
              </Row>
              {!isLoading && (
                <Pagination
                  style={{ marginTop: 16 }}
                  pageSize={pagination.limit}
                  defaultCurrent={pagination.page}
                  onChange={(page) => handlePagination(page)}
                  current={pagination.page}
                  showSizeChanger={false}
                  total={128}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
