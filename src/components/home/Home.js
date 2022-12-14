/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';
import Icon from '../Icon';
import formatNumber from '../../redux/formatNumber';
import './Home.css';
import virus from '../../assets/virus.svg';
import world from '../../assets/europe.png';

const Item = ({ confirmed, name }) => (
  <div className="home-sec-item-content">
    <div className="home-sec-item-icon">
      <Icon name="arrow_circle_right" />
    </div>
    <div className="home-sec-item-top">
      <img src={virus} alt="" className="home-sec-item-image" />
    </div>
    <div className="home-sec-item-bottom">
      <h4 className="App-title">{name}</h4>
      <p className="App-subtitle">{formatNumber(confirmed)}</p>
    </div>
  </div>
);

const Grid = ({ items = [] }) => (
  <ul className="home-sec-grid">
    {items.map(({ name, confirmed }) => (
      <li key={name} className="home-sec-grid-item">
        <Link to={`/country/${name}`}>
          <Item confirmed={confirmed} name={name} />
        </Link>
      </li>
    ))}
  </ul>
);

const Home = () => {
  const dispatch = useDispatch();
  const { items, totalConfirmed, loading } = useSelector((state) => ({
    ...state.countries,
    loading: state.loadingBar.default,
  }));
  const [continent, setContinent] = useState('Asia');

  const changeContinent = (e) => {
    const search = e.target.value;
    setContinent(e.target.value);
    dispatch(fetchCountries(search));
  };
  // const Selectedcontinent = 'Antarctica';

  useEffect(() => {
    if (!items.length) {
      // dispatch(fetchCountries(Selectedcontinent));
      dispatch(fetchCountries(continent));
    }
  }, [dispatch, items.length, continent]);

  if (loading) {
    return null;
  }

  return (
    <section>
      <header className="App-header">
        <Icon name="arrow_back_ios" />
        <h4>2022</h4>
        <h5 className="App-header-title">confirmed cases</h5>

        <select
          name="continents"
          value={continent}
          id="continent"
          className="select-continent"
          onChange={changeContinent}
        >
          <option value="Asia">Select Another Continent</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Australia">Australia</option>
        </select>

        <Icon name="mic" />
        <div className="pl-5">
          <Icon name="settings" />
        </div>
      </header>
      <div className="home-sec-banner">
        <div className="home-sec-banner-left">
          <img src={world} alt="" className="App-map" />
        </div>
        <div className="home-sec-banner-right">
          <h1 className="title">{continent}</h1>
          <p className="App-subtitle">{`${formatNumber(
            totalConfirmed,
          )} cases`}
          </p>
        </div>
      </div>
      <section className="home-sec-stats">
        <h5 className="App-section-title">STATS BY COUNTRY</h5>
        <Grid items={items} />
      </section>
    </section>
  );
};

export default Home;

Item.propTypes = {
  confirmed: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)).isRequired,
};
