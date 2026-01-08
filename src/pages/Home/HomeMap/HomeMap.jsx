import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeMap = () => {
    const [serviceCenters, setServiceCenters] = useState([]);

    // Default position (Dhaka)
    const position = [23.6850, 90.3563];

    useEffect(() => {
        fetch('/serviceCenters.json')
            .then(res => res.json())
            .then(data => setServiceCenters(data))
            .catch(err => console.error("Failed to load service centers:", err));
    }, []);

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-base-content">Our Service Areas</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">We are proudly serving customers across the country.</p>
                </div>

                <div className="border w-full h-[300px] rounded-xl overflow-hidden shadow-lg relative z-0">
                    <MapContainer
                        center={position}
                        zoom={7}
                        scrollWheelZoom={false}
                        className='h-full w-full'
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {serviceCenters.map((center, index) => (
                            <Marker
                                key={index}
                                position={[center.latitude, center.longitude]}
                            >
                                <Popup>
                                    <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}.
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default HomeMap;
