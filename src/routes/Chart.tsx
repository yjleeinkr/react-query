import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts'
interface HistoricalData {
    time_open: number;
    time_close: number;
    open:  string;
    high:  string;
    low: string;
    close: string;
    volume : string;
    market_cap: number;
}
interface ChartProps {
  coinId: string;
  isDark: boolean
}
function Chart({ coinId, isDark}: ChartProps) {
    const { isLoading, data } = useQuery<HistoricalData[]>( ["ohlcv", coinId],() => fetchCoinHistory(coinId), { refetchInterval: 10000 });
    
    return (
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : Array.isArray(data) ? (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) ?? [],
              },
            ]}
            options={{
              chart: {
                height: 300,
                width: 500,
                toolbar: { show: false },
                background: "transparent"
                },
              grid: { show: false },
              theme: { mode: isDark ? "dark": "light" },
              stroke: { curve: "smooth", width: 3},
              yaxis: { show: false },
              xaxis: {
                labels: { show: false},
                axisBorder: { show:false },
                axisTicks: { show: false},
                categories: data?.map(price => price.time_close),
                type: "datetime"
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ['#0be881'], stops: [0,100] },
               },
               colors: ['#0fbcf9'],
               tooltip: {
                  y: { formatter: (value)=> `$ ${value.toFixed(2)}`}
                }
            }}
          />
        ) : (
          "Oops, something went wrong! Please try again later."
        )}
      </div>
    );
}

export default Chart;