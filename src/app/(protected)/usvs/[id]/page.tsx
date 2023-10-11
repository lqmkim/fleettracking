"use client";

import useGoogleMapsLoader from "@/utils/client/useGoogleMapsLoader";
import { useCallback, useState } from "react";

const center = { lat: 3.23542, lng: 101.75081 };

export default function FleetPage({ params }: { params: any }) {
  const { isLoaded } = useGoogleMapsLoader();

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <div>
      <div className="h-80 overflow-hidden rounded-lg bg-white shadow">
        {/*  */}
      </div>
    </div>
  );
}
