import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {Provider} from "react-redux";
import AppRoutes from './routes';
import {store} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <AppRoutes />
      </Provider>
  </StrictMode>,
)
