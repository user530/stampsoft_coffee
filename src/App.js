import React from 'react';
import styles from './App.module.scss';
import { PayCard } from './components/payCard/PayCard';
import { PayCash } from './components/payCash/PayCash';
import { Products } from './components/products/Products';
import { Promo } from './components/promo/Promo';
import { SelectPayment } from './components/selectPayment/SelectPayment';
import { PaymentFail } from './components/paymentFail/PaymentFail';
import { Brewing } from './components/brewing/Brewing';
import { DrinkReady } from './components/drinkReady/DrinkReady';
import { PaymentSuccess } from './components/paymentSuccess/PaymentSuccess';
import { NoProduct } from './components/noProduct/NoProduct';

function App() {
  const [appState, setAppState] = React.useState('promo');
  const [failureReason, setFailureReason] = React.useState('');
  
  const toPromo = React.useCallback(() => setAppState('promo'), []);
  const toProducts = React.useCallback(() => setAppState('products'), []);
  const toPayment = React.useCallback(() => setAppState('selectPayment'), []);
  const toPayCash = React.useCallback(() => setAppState('payCash'), []);
  const toPayCard = React.useCallback(() => setAppState('payCard'), []);
  const toBrewing = React.useCallback(() => setAppState('brewing'), []);
  const toSuccess = React.useCallback(() => setAppState('success'), []);
  const toFail = React.useCallback((reason) => {setAppState('fail'); setFailureReason(reason);}, []);
  const toFailedVend = React.useCallback(() => setAppState('noproduct'), []);
  const toProductReady = React.useCallback(() => setAppState('ready'), [])
  
  return (
    <main className={styles['app-wrapper']}>
      { 
        appState === 'promo' 
        && <Promo headingTxt={ 'Это твой кофе' } btnText={ 'Коснитесь экрана' } next={ toProducts } />
      }

      {
        appState === 'products' 
        && <Products next={ (result) => result ? toPayment : toFailedVend } prev={ toPromo } />
      }

      {
        appState === 'selectPayment'
        && <SelectPayment prev={ toProducts } nextCash={ toPayCash } nextCard={ toPayCard } />
      }

      {
        appState === 'payCard' 
        && <PayCard next={ (result) => result ? toSuccess : (reason) => toFail(reason) } prev={ toPayment } />
      }

      {
        appState === 'payCash' 
        && <PayCash next={ (result) => result ? toSuccess : (reason) => toFail(reason) } prev={ toPayment } />
      }

      {
        appState === 'fail'
        && <PaymentFail cancelCb={ () => { toProducts(); setFailureReason(''); } } retryCb={ toPayCard } failReason={ failureReason }/>
      }

      {
        appState === 'success'
        && <PaymentSuccess nextCb={ toBrewing } delay={ 3000 }/>
      }

      {
        appState === 'brewing'
        && <Brewing nextCb={ toProductReady }/>
      }

      {
        appState === 'ready'
        && <DrinkReady nextCb={ toPromo } delay={ 3000 } />
      }

      {
        appState === 'noproduct'
        && <NoProduct backCb={ toProducts } delay={ 3000 } />
      }

    </main>
  );
}

export default App;
