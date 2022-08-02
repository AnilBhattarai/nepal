/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState, useEffect } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { sqFeetToRopaniSet, sqFeetToBighaSet } from './utils';

const UnitConverter = (props) => {
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F3FBFF' }}
      // behavior="padding"
      enabled
    >
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <View >
            {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'normal', color: '#212C8B' }}>UNIT CONVERTER: ALL IN ONE</Text>
              <Text style={{ fontSize: 10, fontWeight: 'normal', color: '#212C8B' }}>Just at one shot you can convert areas across ropani, bigha,{'\n'} square feet, square meter.</Text>
            </View> */}
            <View style={{ marginTop: 0 }}>
              <ScrollView>
                <View>
                  <View style={{ marginTop: 20, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 10 }}>ROPANI SYSTEM</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <View style={{ marginRight: 8, flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Ropani</Text>
                        {errorField === 'ropani' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={ropani}
                          onChangeText={(value) => handleRopaniChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                      <View style={{ marginRight: 8, flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Anna</Text>
                        {errorField === 'anna' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={anna}
                          onChangeText={(value) => handleAnnaChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                      <View style={{ marginRight: 8, flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Paisa</Text>
                        {errorField === 'paisa' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={paisa}
                          onChangeText={(value) => handlePaisaChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Daam</Text>
                        {errorField === 'daam' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={daam}
                          onChangeText={(value) => handleDaamChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 20, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 10 }}>BIGHA SYSTEM</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <View style={{ marginRight: 8, flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Bigha</Text>
                        {errorField === 'bigha' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={bigha}
                          onChangeText={(value) => handleBighaChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                      <View style={{ marginRight: 8, flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Kattha</Text>
                        {errorField === 'katha' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={katha}
                          onChangeText={(value) => handleKathaChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15, marginVertical: 4 }}>Dhur</Text>
                        {errorField === 'dhur' && (
                          <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                            field not valid
                          </Text>
                        )}
                        <TextInput keyboardType='numeric'
                          style={{
                            backgroundColor: '#fff',
                            height: 36,
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            paddingHorizontal: 12,
                          }}
                          value={dhur}
                          onChangeText={(value) => handleDhurChange(value)}
                          placeholder={'0'}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 20, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 10 }}>SQUARE FEET</Text>
                    <View style={{}}>
                      <Text style={{ fontSize: 15, marginVertical: 4 }}>Sq. Feet</Text>
                      {errorField === 'sqFeet' && (
                        <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                          field not valid
                        </Text>
                      )}
                      <TextInput keyboardType='numeric'
                        style={{
                          backgroundColor: '#fff',
                          height: 36,
                          width: '100%',
                          borderWidth: 1,
                          borderColor: '#d3d3d3',
                          borderRadius: 5,
                          paddingHorizontal: 12,
                        }}
                        value={sqFeet}
                        onChangeText={(value) => handleSqFeetChange(value)}
                        placeholder={'0'}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20, marginBottom: 50 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 10 }}>SQUARE METER</Text>
                    <View style={{}}>
                      <Text style={{ fontSize: 15, marginVertical: 4 }}>Sq. Meter</Text>
                      {errorField === 'sqMeter' && (
                        <Text style={{ color: 'red', fontSize: 10, fontWeight: 'normal' }}>
                          field not valid
                        </Text>
                      )}
                      <TextInput keyboardType='numeric'
                        style={{
                          backgroundColor: '#fff',
                          height: 36,
                          width: '100%',
                          borderWidth: 1,
                          borderColor: '#d3d3d3',
                          borderRadius: 5,
                          paddingHorizontal: 12,
                        }}
                        value={sqMeter}
                        onChangeText={(value) => handleSqMeterChange(value)}
                        placeholder={'0'}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UnitConverter;
