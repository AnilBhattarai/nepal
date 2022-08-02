import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';
import { sqFeetToRopaniSet, sqFeetToBighaSet } from './utils';

const UnitConverter = props => {
  const { isModal } = props;
  const [errorField, setErrorField] = useState('');
  const [ropani, setRopani] = useState('');
  const [anna, setAnna] = useState('');
  const [paisa, setPaisa] = useState('');
  const [daam, setDaam] = useState('');
  const [sqFeet, setSqFeet] = useState('');
  const [sqMeter, setSqMeter] = useState('');

  const [bigha, setBigha] = useState('');
  const [katha, setKatha] = useState('');
  const [dhur, setDhur] = useState('');
  const handleRopaniChange = value => {
    const numRopani = +value;
    setRopani(value);
    if (Number.isFinite(numRopani) && numRopani >= 0) {
      setErrorField('');
      const numAnna = Number.isFinite(+anna) ? +anna : 0;
      const numPaisa = Number.isFinite(+paisa) ? +paisa : 0;
      const numDaam = Number.isFinite(+daam) ? +daam : 0;
      const numSqFeet =
        numRopani * 5476 +
        numAnna * 342.25 +
        numPaisa * 85.56 +
        numDaam * 21.39;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [bi, ka, dh] = sqFeetToBighaSet(numSqFeet);
      setBigha(`${Math.floor(bi)}`);
      setKatha(`${Math.floor(ka)}`);
      setDhur(`${Number(dh).toFixed(3)}`);
    } else {
      setErrorField('ropani');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnnaChange = value => {
    const numAnna = +value;
    setAnna(value);
    if (Number.isFinite(numAnna) && numAnna >= 0) {
      setErrorField('');
      const numRopani = Number.isFinite(+ropani) ? +ropani : 0;
      const numPaisa = Number.isFinite(+paisa) ? +paisa : 0;
      const numDaam = Number.isFinite(+daam) ? +daam : 0;
      const numSqFeet =
        numRopani * 5476 +
        numAnna * 342.25 +
        numPaisa * 85.56 +
        numDaam * 21.39;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [bi, ka, dh] = sqFeetToBighaSet(numSqFeet);
      setBigha(`${Math.floor(bi)}`);
      setKatha(`${Math.floor(ka)}`);
      setDhur(`${Number(dh).toFixed(3)}`);
    } else {
      setErrorField('anna');
    }
  };
  const handlePaisaChange = value => {
    const numPaisa = +value;
    setPaisa(value);
    if (Number.isFinite(numPaisa) && numPaisa >= 0) {
      setErrorField('');
      const numRopani = Number.isFinite(+ropani) ? +ropani : 0;
      const numAnna = Number.isFinite(+anna) ? +anna : 0;
      const numDaam = Number.isFinite(+daam) ? +daam : 0;
      const numSqFeet =
        numRopani * 5476 +
        numAnna * 342.25 +
        numPaisa * 85.56 +
        numDaam * 21.39;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [bi, ka, dh] = sqFeetToBighaSet(numSqFeet);
      setBigha(`${Math.floor(bi)}`);
      setKatha(`${Math.floor(ka)}`);
      setDhur(`${Number(dh).toFixed(3)}`);
    } else {
      setErrorField('paisa');
    }
  };
  const handleDaamChange = value => {
    const numDaam = +value;
    setDaam(value);
    if (Number.isFinite(numDaam) && numDaam >= 0) {
      setErrorField('');
      const numRopani = Number.isFinite(+ropani) ? +ropani : 0;
      const numAnna = Number.isFinite(+anna) ? +anna : 0;
      const numPaisa = Number.isFinite(+paisa) ? +paisa : 0;
      const numSqFeet =
        numRopani * 5476 +
        numAnna * 342.25 +
        numPaisa * 85.56 +
        numDaam * 21.39;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [bi, ka, dh] = sqFeetToBighaSet(numSqFeet);
      setBigha(`${Math.floor(bi)}`);
      setKatha(`${Math.floor(ka)}`);
      setDhur(`${Number(dh).toFixed(3)}`);
    } else {
      setErrorField('daam');
    }
  };
  const handleSqFeetChange = value => {
    const numSqFeet = +value;
    setSqFeet(value);
    if (Number.isFinite(numSqFeet) && numSqFeet >= 0) {
      setErrorField('');
      setSqMeter(`${numSqFeet / 10.764}`);
      const [ro, an, pa, dm] = sqFeetToRopaniSet(numSqFeet);
      setDaam(`${dm.toFixed(3)}`);
      setPaisa(`${Math.floor(pa)}`);
      setAnna(`${Math.floor(an)}`);
      setRopani(`${Math.floor(ro)}`);
      const [bi, ka, dh] = sqFeetToBighaSet(numSqFeet);
      setBigha(`${Math.floor(bi)}`);
      setKatha(`${Math.floor(ka)}`);
      setDhur(`${Number(dh).toFixed(3)}`);
    } else {
      setErrorField('sqfeet');
    }
  };
  const handleSqMeterChange = value => {
    const numSqMeter = +value;
    setSqMeter(value);
    if (Number.isFinite(numSqMeter) && numSqMeter >= 0) {
      setErrorField('');
      const numSqFeet = numSqMeter * 10.764;
      setSqFeet(`${numSqFeet}`);
      const [ro, an, pa, dm] = sqFeetToRopaniSet(numSqFeet);
      setDaam(`${dm.toFixed(3)}`);
      setPaisa(`${Math.floor(pa)}`);
      setAnna(`${Math.floor(an)}`);
      setRopani(`${Math.floor(ro)}`);
      const [bi, ka, dh] = sqFeetToBighaSet(numSqFeet);
      setBigha(`${Math.floor(bi)}`);
      setKatha(`${Math.floor(ka)}`);
      setDhur(`${Number(dh).toFixed(3)}`);
    } else {
      setErrorField('sqmeter');
    }
  };
  const handleBighaChange = value => {
    const numBigha = +value;
    setBigha(value);
    if (Number.isFinite(numBigha) && numBigha >= 0) {
      setErrorField('');
      const numKatha = Number.isFinite(+katha) ? +katha : 0;
      const numDhur = Number.isFinite(+dhur) ? +dhur : 0;
      const numSqFeet = numBigha * 72900 + numKatha * 3645 + numDhur * 182.25;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [ro, an, pa, dm] = sqFeetToRopaniSet(numSqFeet);
      setDaam(`${dm.toFixed(3)}`);
      setPaisa(`${Math.floor(pa)}`);
      setAnna(`${Math.floor(an)}`);
      setRopani(`${Math.floor(ro)}`);
    } else {
      setErrorField('bigha');
    }
  };
  const handleKathaChange = value => {
    const numKatha = +value;
    setKatha(value);
    if (Number.isFinite(numKatha) && numKatha >= 0) {
      setErrorField('');
      const numBigha = Number.isFinite(+bigha) ? +bigha : 0;
      const numDhur = Number.isFinite(+dhur) ? +dhur : 0;
      const numSqFeet = numBigha * 72900 + numKatha * 3645 + numDhur * 182.25;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [ro, an, pa, dm] = sqFeetToRopaniSet(numSqFeet);
      setDaam(`${dm.toFixed(3)}`);
      setPaisa(`${Math.floor(pa)}`);
      setAnna(`${Math.floor(an)}`);
      setRopani(`${Math.floor(ro)}`);
    } else {
      setErrorField('katha');
    }
  };
  const handleDhurChange = value => {
    const numDhur = +value;
    setDhur(value);
    if (Number.isFinite(numDhur) && numDhur >= 0) {
      setErrorField('');
      const numBigha = Number.isFinite(+bigha) ? +bigha : 0;
      const numKatha = Number.isFinite(+katha) ? +katha : 0;
      const numSqFeet = numBigha * 72900 + numKatha * 3645 + numDhur * 182.25;
      setSqFeet(`${numSqFeet}`);
      setSqMeter(`${numSqFeet / 10.764}`);
      const [ro, an, pa, dm] = sqFeetToRopaniSet(numSqFeet);
      setDaam(`${dm.toFixed(3)}`);
      setPaisa(`${Math.floor(pa)}`);
      setAnna(`${Math.floor(an)}`);
      setRopani(`${Math.floor(ro)}`);
    } else {
      setErrorField('dhur');
    }
  };

  return (
    <>
      {isModal === undefined && (
        <Helmet>
          <title>Unit Converter</title>
        </Helmet>
      )}

      <div className="text-sm">
        <div className="">
          <div className="max-w-3xl mx-auto p-10">
            <h1 className="text-3xl text-center pt-5">
              Unit Converter
            </h1>
            <p className="text-sm text-center">
              Just at one shot you can convert areas across ropani, bigha,
              square feet, square meter.
            </p>
            <table className="table-border mt-10">
              <tbody>
                {/* <tr className="bg-secondary">
                  <th className="w-32">Unit</th>
                  <th colSpan="4">Value</th>
                </tr> */}
                <tr className="border-b border-white">
                  <td className="whitespace-no-wrap text-xl">
                    Ropani System
                  </td>
                  <td>
                    <label className="block">
                      Ropani
                      {errorField === 'ropani' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={ropani}
                        className={`inputbox bg-white text-right ${errorField === 'ropani' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleRopaniChange(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      Anna
                      {errorField === 'anna' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={anna}
                        className={`inputbox bg-white text-right ${errorField === 'anna' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleAnnaChange(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      Paisa
                      {errorField === 'paisa' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={paisa}
                        className={`inputbox bg-white text-right ${errorField === 'paisa' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handlePaisaChange(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      Daam{' '}
                      {errorField === 'daam' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={daam}
                        className={`inputbox bg-white text-right ${errorField === 'daam' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleDaamChange(e.target.value)}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-no-wrap text-xl">
                    Bigha System
                  </td>
                  <td>
                    <label className="block">
                      Bigha{' '}
                      {errorField === 'bigha' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={bigha}
                        className={`inputbox bg-white text-right ${errorField === 'bigha' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleBighaChange(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      Kattha{' '}
                      {errorField === 'katha' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={katha}
                        className={`inputbox bg-white text-right ${errorField === 'katha' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleKathaChange(e.target.value)}
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      Dhur{' '}
                      {errorField === 'dhur' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={dhur}
                        className={`inputbox bg-white text-right ${errorField === 'dhur' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleDhurChange(e.target.value)}
                      />
                    </label>
                  </td>
                  <td />
                </tr>
                <tr>
                  <td className="whitespace-no-wrap text-xl">
                    Square Feet
                  </td>
                  <td colSpan="4">
                    <label className="block">
                      Sq. Feet
                      {errorField === 'sqfeet' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={sqFeet}
                        className={`inputbox bg-white text-right w-64 ${errorField === 'sqfeet' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleSqFeetChange(e.target.value)}
                        style={{ width: 270 }}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ borderBottom: 'none' }}
                    className="whitespace-no-wrap text-xl"
                  >
                    Square Meter
                  </td>
                  <td style={{ borderBottom: 'none' }} colSpan="4">
                    <label className="block">
                      Sq. Meter{' '}
                      {errorField === 'sqmeter' && (
                        <span className="italic pl-1 text-red-200">
                          field not valid
                        </span>
                      )}
                      <input
                        type="text"
                        value={sqMeter}
                        className={`inputbox bg-white text-right ${errorField === 'sqmeter' ? 'input-error' : ''
                          }`}
                        placeholder="0"
                        onChange={e => handleSqMeterChange(e.target.value)}
                        style={{ width: 270 }}
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitConverter;
