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
  Slider,
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
  FilterOutlined,
} from "@ant-design/icons";
import "./App.css";
import { InputHTMLAttributes, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { useDebounce } from "./hooks/useDebonce";
import DrawerWrapper from "antd/lib/drawer";
import Text from "antd/lib/typography/Text";

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { useBreakpoint } = Grid;

interface IParameters {
  like?: string;
  gte?: number;
  lte?: number;
}

const App = () => {
  const [pagination, setPagination] = useState({ limit: 8, page: 1 });
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [query, setQuery] = useState<IParameters>({
    gte: undefined,
    like: undefined,
    lte: undefined,
  });
  const screens = useBreakpoint();
  const { data, isLoading, error, status, isFetching } =
    productAPI.useFetchAllProductsQuery(query);
  const debounceSearch = useDebounce(setQuery, 500);

  const handlePagination = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch({ ...query, like: e.target.value });
  };

  const products = useProducts(data, pagination.limit, pagination.page);

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
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Input
              placeholder="input search text"
              allowClear
              onChange={handleSearch}
              style={{ width: screens.xl ? "90%" : "70%", marginLeft: 16 }}
            />
            <div
              style={{
                marginRight: 16,
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FilterOutlined
                onClick={() => setVisibleDrawer(true)}
                style={{
                  fontSize: "30px",
                  color: "#08c",
                  marginRight: screens.xl ? 16 : 0,
                }}
              />
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
              {isLoading || (isFetching && <Spin />)}
              {error && <h1>Ошибка при загрузке товаров</h1>}
              {products?.length == 0 && <h1>Товары не найдены</h1>}
              <Row gutter={[16, 16]}>
                {products &&
                  products.map((product) => (
                    <Col
                      key={product.id}
                      xs={24}
                      sm={24}
                      md={12}
                      xl={6}
                      xxl={6}
                    >
                      <Card
                        loading={status == "fulfilled" ? false : true}
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
              {!isLoading && products?.length !== 0 && (
                <Pagination
                  style={{ marginTop: 16 }}
                  pageSize={pagination.limit}
                  defaultCurrent={pagination.page}
                  onChange={(page) => handlePagination(page)}
                  current={pagination.page}
                  showSizeChanger={false}
                  total={data?.length}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
      <DrawerWrapper
        title="Filters"
        placement="right"
        onClose={() => setVisibleDrawer(!visibleDrawer)}
        visible={visibleDrawer}
        width={screens.xl ? 378 : "100%"}
      >
        <Text>Цена: </Text>
        <Slider range max={99999} step={10} defaultValue={[0, 99999]} />
        <p>Some contents...</p>
        <p>Some contents...</p>
      </DrawerWrapper>
    </div>
  );
};

export default App;
