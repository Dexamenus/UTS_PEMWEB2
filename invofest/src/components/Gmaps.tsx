import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Tentukan tipe untuk koordinat
interface LibraryLocation {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Titik tengah default (contoh: Jakarta)
const center: LibraryLocation = {
  lat: -6.8696193,
  lng: 109.1100735
};

const GoogleMapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD85DPZhUn6agcf-80EwAp86B_8XvvNFIE"
  });

  const [, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Menambahkan Marker di lokasi tertentu */}
        <Marker 
          position={center} 
          title="Lokasi Utama"
        />
      </GoogleMap>
    </div>
  ) : (
    <div className="flex items-center justify-center h-100 bg-gray-100 animate-pulse">
      <p className="text-gray-500 font-medium">Memuat Peta...</p>
    </div>
  );
};

export default React.memo(GoogleMapComponent);