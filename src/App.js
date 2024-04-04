import React from 'react';
import styles from './App.module.scss';
import { PayCard } from './components/payCard/PayCard';
import { PayCash } from './components/payCash/PayCash';
import { Products } from './components/products/Products';
import { Promo } from './components/promo/Promo';
import { productData } from './data/data';

function App() {
  const [appState, setAppState] = React.useState('promo');
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const toPromo = () => setAppState('promo');
  const toProducts = () => setAppState('products');
  const toPayment = (type) => type === 'card' ? setAppState('payCard') : setAppState('payCash'); 

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
