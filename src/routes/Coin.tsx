import {
  Switch,
  useLocation,
  useParams,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`
const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a{
      display:block;
  }
`;

const BackButton = styled.span`
  color: white;
  font-size: 20px;
  cursor: pointer;
  display:flex;
  justify-content: flex-start;
`
interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
id:string;
name:string;
symbol:string;
rank:number;
is_new:boolean;
is_active:boolean;
type:string;
logo:string;
description:string;
message:string;
open_source:boolean;
started_at:string;
development_status:string;
hardware_wallet:boolean;
proof_type:string;
org_structure:string;
hash_algorithm:string;
first_data_at:string;
last_data_at:string;
}


interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
    const { coinId } = useParams<RouteParams>();
    // 타입스크립트에게 우리 url 내에 몇몇 파라미터들이 있다는 걸 말해줘야한다.
    const { state } = useLocation<RouteState>();
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading: infoLoading, data:infoData} = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId))
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(['tickers', coinId], () => fetchCoinTickers(coinId), {
    refetchInterval: 5000,
      // 5s마다 refetching 하고 있다. 주기적으로 백그라운드에서 업데이트 가능
    })
    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await(
    //           await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false)
    //     })()
    // },[coinId])
    const loading = infoLoading || tickersLoading; 
    return (
      <Container>
        <Helmet>
          {/* html의 head에 들어가는 모든 내용들을 넣을 수 있다. title 뿐만 아니라, favicon, css 등등 */}
          {/* Helmet == html의 head로 가는 direct link */}
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <BackButton>
            <Link to="/">🔙</Link>
          </BackButton>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>"Loading..."</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/:coinId/chart`}>
                  <Chart coinId={coinId} />
              </Route>
              <Route path={`/:coinId/price`}>
                <Price coinId={coinId} />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    );
}
export default Coin;