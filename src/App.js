import React from 'react';
import styles from './App.module.scss';
import { PayCard } from './components/payCard/PayCard';
import { PayCash } from './components/payCash/PayCash';
import { Products } from './components/products/Products';
import { Promo } from './components/promo/Promo';
import { productData } from './data/data';
import { SelectPayment } from './components/selectPayment/SelectPayment';
import { PaymentFail } from './components/paymentFail/PaymentFail';
import { Brewing } from './components/brewing/Brewing';
import { DrinkReady } from './components/drinkReady/DrinkReady';
import { PaymentSuccess } from './components/paymentSuccess/PaymentSuccess';
import { NoProduct } from './components/noProduct/NoProduct';

function App() {
  const [appState, setAppState] = React.useState('test');
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const toPromo = React.useCallback(() => setAppState('promo'), []);
  const toProducts = React.useCallback(() => setAppState('products'), []);
  const toPayment = React.useCallback(() => setAppState('selectPayment'), []);
  const toPayCash = React.useCallback(() => setAppState('payCash'), []);
  const toPayCard = React.useCallback(() => setAppState('payCard'), []);
  const toBrewing = React.useCallback(() => setAppState('brewing'), []);

  React.useEffect(
    () => setProducts(productData),
    []
  )
  
  return (
    <main className={styles['app-wrapper']}>
      { 
        appState === 'promo' 
        && <Promo headingTxt={'Это твой кофе'} btnText={'Коснитесь экрана'} next={toProducts} />
      }

      {
        appState === 'products' 
        && <Products productData={products} next={toPayment} prev={toPromo} setSelectedProduct={setSelectedProduct} />
      }

      {
        appState === 'selectPayment'
        && <SelectPayment prev={toProducts} nextCash={toPayCash} nextCard={toPayCard} />
      }

      {
        appState === 'payCard' 
        && <PayCard next={toBrewing} prev={toPayment} />
      }

      {
        appState === 'payCash' 
        && <PayCash next={toBrewing} prev={toPayment} />
      }

      {
        appState === 'fail'
        && <PaymentFail cancelCb={toProducts} retryCb={() => console.log('Pay again!')}/>
      }

      {
        appState === 'success'
        && <PaymentSuccess nextCb={() => {console.log('Payment success!'); setAppState('brewing');}} delay={3000}/>
      }

      {
        appState === 'brewing'
        && <Brewing nextCb={() => {console.log('Brewing completed!'); setAppState('ready');}}/>
      }

      {
        appState === 'ready'
        && <DrinkReady nextCb={() => {console.log('Product ready!'); setAppState('promo');}} delay={5000} />
      }

      {
        appState === 'test'
        && <NoProduct backCb={toProducts} />
      }

    </main>
  );
}

export default App;
