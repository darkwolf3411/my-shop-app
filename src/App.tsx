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
  Select,
  Button,
  Typography,
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
import { useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import DrawerWrapper from "antd/lib/drawer";
import Text from "antd/lib/typography/Text";
import { IProduct } from "./models/Product";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Meta } = Card;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface IParameters {
  like?: string;
  gte?: number;
  lte?: number;
}

const App = () => {
  const screens = useBreakpoint();
  const [pagination, setPagination] = useState({ limit: 16, page: 1 });
  const [searchValue, setSearch] = useState("");
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [query, setQuery] = useState<IParameters>({
    gte: undefined,
    like: undefined,
    lte: undefined,
  });
  const { data, isLoading, error, status, isFetching } =
    productAPI.useFetchAllProductsQuery(query);
  const {
    data: searchData,
    isLoading: searchLoading,
    isFetching: searchFetching,
    error: searchError,
  } = productAPI.useSearchProuctsQuery("");

  const products = useProducts(data, pagination.limit, pagination.page);

  const handlePagination = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  const useSearch = (array: IProduct[] | undefined, text: string) => {
    const getArrWithoutDublicateItems = (array: IProduct[] | undefined) => {
      const newArray: string[] = [];
      array?.forEach((element) => {
        newArray.push(element.title);
      });
      return newArray.filter((item, index) => newArray.indexOf(item) === index);
    };
    const arr = getArrWithoutDublicateItems(array);
    const getSearchValue = useMemo(() => {
      return arr?.filter((p) => {
        if (!text) {
          return p.includes(text);
        }
        return p.toLowerCase().includes(text.toLowerCase());
      });
    }, [text]);
    return getSearchValue;
  };  

  const setCardResponseSize =()=>{
    switch (true) {
      case screens.xxl:
        return {imgh: 330, cardw: 318}
      case screens.xl:
        return {imgh: 230, cardh: 380, cardw: 234}
      case screens.lg:
        return {imgh: 380, cardh: 520, cardw: 340}
      case screens.md:
        return {imgh: 320, cardh: 460, cardw: 312}
      case screens.sm:
        return {imgh: 320, card: 460, cardw: 312}
      case screens.xs:
        return {imgh: 260, cardh: 400, cardw: 312}
      default:
        break;
    }
  }

  const searchResult = useSearch(searchData, searchValue);

  const handleChange = (value: string) => {
    setSearch(value);
    setQuery({ ...query, like: value });
    setPagination({ ...pagination, page: 1 });
  };

  const handleClearSearch = () => {
    setQuery({
      gte: undefined,
      like: undefined,
      lte: undefined,
    });
  };

  return (
    <div>
      <Layout className="site-layout">
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
          <div style={{ minWidth: screens.xl ? 200 : 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Title level={2}>{screens.xl ? 'MyShop' : 'MS'}</Title>
          </div>
          <Select
            showSearch
            allowClear
            loading={searchFetching}
            value={searchValue}
            placeholder="input search text"
            style={{ width: screens.xl ? "90%" : "70%", marginRight: 16}}
            defaultActiveFirstOption={false}
            showArrow={false}
            notFoundContent={null}
            filterOption={false}
            onSearch={(e) => setSearch(e)}
            onChange={handleChange}
            onFocus={()=>setSearch('')}
            onClear={handleClearSearch}
          >
            {searchError && (
              <Option disabled value={"err"}>
                Ошибка при загрузке товаров
              </Option>
            )}
            {searchResult.length == 0 && (
              <Option disabled value={"null"}>
                Товары не найдены
              </Option>
            )}
            {searchResult &&
              searchResult.map((d) => (
                <Option value={d} key={d}>
                  {d}
                </Option>
              ))}
          </Select>
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
        <Layout
        >
          <Sider
            collapsed={screens.xl ? false : true}
            style={{
              overflow: "auto",
              height: "100%",
              position: "relative",
              backgroundColor: "white",
              left: 0,
            }}
          >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
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
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                      key={product.id}
                      xs={24}
                      sm={24}
                      md={12}
                      xl={6}
                      xxl={6}
                    >
                      <Card
                        style={{ 
                          width: setCardResponseSize()?.cardw,
                          height: setCardResponseSize()?.cardh }}
                        loading={isFetching? true : false}
                        key={product.id}
                        hoverable
                        cover={
                          <img
                            style={{ height: setCardResponseSize()?.imgh }}
                            alt="example"
                            src={product.imageUrl}
                          />
                        }
                      >
                        <Meta
                          title={product.title}
                          description={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyItems: "center",
                              }}
                            >
                              {`${product.price}р`}
                              <Button style={{ marginTop: 16 }} type="primary">
                                Купить
                              </Button>
                            </div>
                          }
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
        footer={
          <>
            <Button>Применить</Button>
            <Button>Сбросить</Button>
          </>
        }
        footerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
