import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocationType } from '../selectors';
import * as mapDispatchToProps from '../actions';

const Maps = props => {
  const { google, type, setLocationValue } = props;

  const mapStyles = {
    paddingBottom: '10px',
    // position: 'relative',
    width: '400px',
    height: '50 px',
  };

  const [coordinates, setCoordinates] = useState({});
  const [address, setTempAddress] = useState('');

  const handleAddressChange = address => {
    setTempAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const addMarker = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const coordinatesR = [lat, lng];

    const cordinates = { lat, lng };
    setCoordinates(cordinates);
    // console.log('cordinates', cordinates);

    map.panTo(cordinates);

    setLocationValue({
      key: 'type',
      value: { ...type, ['coordinates']: coordinatesR },
    });
  };

  return (
    <div>
      {/* <PlacesAutocomplete
        value={address}
        onChange={handleAddressChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input inputbox',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
      <Map
        google={google}
        zoom={15}
        style={mapStyles}
        // 27.686304, 85.314084
        initialCenter={{ lat: 27.686304, lng: 85.314084 }}
        onClick={(t, map, coord) => addMarker(t, map, coord)}
      >
        <Marker position={coordinates} />
      </Map>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectLocationType(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  GoogleApiWrapper({
    apiKey: 'AIzaSyA9weh1RUNftGcU1-PdI8kgbTGq2HJAyRQ',
  })(Maps),
);
