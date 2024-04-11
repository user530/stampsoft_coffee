import React from 'react';
import styles from './App.module.scss';
import { PayCard } from './components/payCard/PayCard';
import { PayCash } from './components/payCash/PayCash';
import { Products } from './components/products/Products';
import { Promo } from './components/promo/Promo';
import { storage } from './data/data';
import { SelectPayment } from './components/selectPayment/SelectPayment';
import { PaymentFail } from './components/paymentFail/PaymentFail';
import { Brewing } from './components/brewing/Brewing';
import { DrinkReady } from './components/drinkReady/DrinkReady';
import { PaymentSuccess } from './components/paymentSuccess/PaymentSuccess';
import { NoProduct } from './components/noProduct/NoProduct';

function App() {
  const [appState, setAppState] = React.useState('promo');
  const [storageData, setStorageData] = React.useState({});
  const [cartItem, setCartItem] = React.useState({
      product: { 
        categoryId: storage.categories[0].id,
        productId: null, 
        sizeId: null
      },
      advancedOptions: storage.advOptions.getEmptyAdvOptions(),
      totalAmount: 0,
    }
  );
  const [failureReason, setFailureReason] = React.useState('');
  
  const toPromo = React.useCallback(() => setAppState('promo'), []);
  const toProducts = React.useCallback(() => setAppState('products'), []);
  const toPayment = React.useCallback(() => setAppState('selectPayment'), []);
  const toPayCash = React.useCallback(() => setAppState('payCash'), []);
  const toPayCard = React.useCallback(() => setAppState('payCard'), []);
  const toBrewing = React.useCallback(() => setAppState('brewing'), []);
  const toSuccess = React.useCallback(() => setAppState('success'), []);
  const toFail = React.useCallback((reason) => {setAppState('fail'); setFailureReason(reason);}, []);

  React.useEffect(
    () => setStorageData(storage),
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
        && <Products storageData={storageData} next={toPayment} prev={toPromo} cartItem={cartItem} setCartItem={setCartItem} />
      }

      {
        appState === 'selectPayment'
        && <SelectPayment prev={toProducts} nextCash={toPayCash} nextCard={toPayCard} />
      }

      {
        appState === 'payCard' 
        && <PayCard next={ (result) => result ? () => toSuccess() : (reason) => toFail(reason) } prev={toPayment} totalAmount={cartItem.totalAmount}/>
      }

      {
        appState === 'payCash' 
        && <PayCash next={ (result) => result ? () => toSuccess() : (reason) => toFail(reason) } prev={toPayment} totalAmount={cartItem.totalAmount}/>
      }

      {
        appState === 'fail'
        && <PaymentFail cancelCb={ () => {toProducts(); setFailureReason('');} } retryCb={ toPayCard } failReason={ failureReason }/>
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
        appState === 'noproduct'
        && <NoProduct backCb={() => {console.log('Product ready!'); setAppState('promo');}} delay={5000} />
      }

    </main>
  );
}

export default App;
