'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function CampusMap(){
  const center: [number, number] = [11.0071, 76.9660] // Coimbatore approximate

  return (
    <div>
      <h2 className="text-2xl font-semibold">Campus Map</h2>
      <p className="text-sm text-secondarytext">Interactive map with resource locations.</p>
      <div className="mt-4 h-[600px] glass rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>PSGiTECH Campus Center</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
