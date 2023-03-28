// 컴포넌트가 fetch하지 않고 fetcher 함수를 따로 분리

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

const OPEN_URL = `https://ohlcv-api.nomadcoders.workers.dev`
export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7; // 일주일 전
      return fetch(`${OPEN_URL}?coinId=${coinId}`).then((res) => res.json());
}