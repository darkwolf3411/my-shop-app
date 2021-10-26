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
  Select,
  Input,
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
import { ChangeEvent, useState } from "react";
import { IProduct } from "./models/Product";
import { useFiltredArray } from "./hooks/filtredArray";

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { useBreakpoint } = Grid;

const App = () => {
  const [pagination, setPagination] = useState({ limit: 8, page: 1 });
  const screens = useBreakpoint();
  const {
    data,
    isLoading,
    error,
    status
  } = productAPI.useFetchAllProductsQuery('');

  const filtredArray = useFiltredArray(data,{limit: 10, page: 1})

  const products = filtredArray?.filtredArray

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
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {/* <Select
              mode="multiple"
              placeholder="Inserted are removed"
              // value={selectedItems}
              // onChange={searchShoeses()}
              style={{ width: screens.xl ? "90%" : "70%", marginLeft: 16 }}
            >
              {
                [...new Set<IProduct[]>(products)].map(item=>(
                  <Select.Option key={item.}>

                  </Select.Option>
                ))
              }
              {/* {filteredOptions.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select> */}
            <Input style={{ width: screens.xl ? "90%" : "70%", marginLeft: 16 }}/>
            <div style={{marginRight: 16, display: "flex", alignItems: "center"}}>
              <Badge count={99}>
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#08c" }}
                />
              </Badge>
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              {isLoading && <Spin />}
              {error && <h1>Ошибка при загрузке товаров</h1>}
              <Row gutter={[16, 16]}>
                {products &&
                  products.map((product) => (
                    <Col xs={24} sm={24} md={12} xl={6} xxl={6}>
                      <Card
                        loading={status=='fulfilled'?false:true}
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
                  total={filtredArray?.total}
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
