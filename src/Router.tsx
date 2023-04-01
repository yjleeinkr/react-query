import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin'
import Coins from './routes/Coins'
interface RouterProps {
  toggleDark: () => void;
  isDark: boolean
}

function Router({ toggleDark, isDark }: RouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;