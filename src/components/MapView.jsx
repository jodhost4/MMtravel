import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Component to handle auto-centering and zooming to fit markers
const RecenterMap = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    if (markers && markers.length > 0) {
      const group = new L.featureGroup(markers.map(m => L.marker([m.lat, m.lng])));
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }, [markers, map]);
  return null;
};

const MapView = ({ 
  center = [12.9716, 77.5946], // Default: Bangalore
  zoom = 13, 
  markers = [], 
  className = "h-full w-full" 
}) => {
  return (
    <div className={`${className} rounded-[2rem] overflow-hidden shadow-inner border border-gray-100`}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            {marker.label && (
              <Popup className="font-bold">
                {marker.label}
              </Popup>
            )}
          </Marker>
        ))}
        {markers.length > 1 && <RecenterMap markers={markers} />}
      </MapContainer>
    </div>
  );
};

export default MapView;
