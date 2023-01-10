import React from 'react';
import '../styles/tariff.css';
import PropTypes from 'prop-types';

export default function Tariff({ tariff, setTariff }) {
  const handlerTariff = (ev) => {
    setTariff(ev.target.value);
  };

  return (
    <div className="tariff--container">
      <div>
        <input type="radio" name="tarifa" id="diurna" value="diurna" checked={tariff === 'diurna'} onChange={handlerTariff} />
        <label htmlFor="diurna">Tarifa Diurna</label>
      </div>
      <div>
        <input type="radio" name="tarifa" id="nocturna" value="nocturna" checked={tariff === 'nocturna'} onChange={handlerTariff} />
        <label htmlFor="nocturna">Tarifa Nocturna</label>
      </div>
      <div>
        <input type="radio" name="tarifa" id="especial" value="mixta" checked={tariff === 'especial'} onChange={handlerTariff} />
        <label htmlFor="especial">Tarifa Especial</label>
      </div>
    </div>
  );
}

Tariff.propTypes = {

  tariff: PropTypes.string.isRequired,

  setTariff: PropTypes.func.isRequired,

};
