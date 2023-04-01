import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface PriceProps {
  coinId: string;
}

interface HistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<HistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  console.log(isLoading, data)
  return <h1>Price</h1>;
}

export default Price;
