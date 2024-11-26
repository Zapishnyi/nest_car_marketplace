import { base, urls } from '@/constants/urls';
import api from '@/services/api.service';
import styles from './page.module.css';

export default async function Home() {
  console.log('111111111111111111111111111');
  try {
    const carsFetch = await fetch(base + urls.car.get('limit=10&page=1&order=ASC&orderBy=car_price_calculated&city=Odesa&area=Odeska%20Oblast&currency=UAH')).then((value) => value.json());
    console.log('carsFetch', carsFetch);

    const cars = await api.car.get('limit=10&page=1&order=ASC&orderBy=car_price_calculated&city=Odesa&area=Odeska%20Oblast&currency=UAH');
    console.log('cars', cars);
  } catch (e) {
    console.log('error:', e);
  }
  return (
    <div className={styles.page}>
      PAge of MAin Layout
    </div>
  );
}
