import React from 'react';
import styles from './App.module.scss';
import { PayCard } from './components/payCard/PayCard';
import { PayCash } from './components/payCash/PayCash';
import { Products } from './components/products/Products';
import { Promo } from './components/promo/Promo';
import { productData } from './data/data';
import { SelectPayment } from './components/selectPayment/SelectPayment';

function App() {
  const [appState, setAppState] = React.useState('promo');
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const toPromo = React.useCallback(() => setAppState('promo'), []);
  const toProducts = React.useCallback(() => setAppState('products'), []);
  const toPayment = React.useCallback(() => setAppState('selectPayment'), []); 
  // const toPayment = (type) => type === 'card' ? setAppState('payCard') : setAppState('payCash'); 

  React.useEffect(
    () => setProducts(productData),
    []
  )
  
  return (
    <main className={styles['app-wrapper']}>
      { 
        appState === 'promo' 
        && <Promo headingTxt={'Это твой кофе'} btnText={'Коснитесь экрана'} next={toProducts}/>
      }

      {
        appState === 'products' 
        && <Products productData={products} next={toPayment} prev={toPromo} setSelectedProduct={setSelectedProduct} />
      }

      {
        appState === 'selectPayment'
        && <SelectPayment />
      }

      {
        appState === 'payCard' 
        && <PayCard />
      }

      {
        appState === 'payCash' 
        && <PayCash />
      }

    </main>
  );
}

export default App;
