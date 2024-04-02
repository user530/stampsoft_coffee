import styles from './App.module.scss';
import { Products } from './components/products/Products';
import { Promo } from './components/promo/Promo';
import React from 'react';

function App() {
  const [appState, setAppState] = React.useState('');

  const toProducts = () => setAppState('products');
  
  return (
    <main className={styles['app-wrapper']}>
      { 
        appState === '' 
        && <Promo headingTxt={'Это твой кофе'} btnText={'Коснитесь экрана'} next={toProducts}/>
      }

      {
        appState === 'products' 
        && <Products/>
      }

    </main>
  );
}

export default App;
