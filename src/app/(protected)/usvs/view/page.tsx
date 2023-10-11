"use client";

import useUsv from "@/hooks/useUsv";
import useUsvData from "@/hooks/useUsvData";
import useGoogleMapsLoader from "@/utils/client/useGoogleMapsLoader";
import { GoogleMap } from "@react-google-maps/api";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const center = { lat: 3.23542, lng: 101.75081 };

export default function FleetPage() {
  const searchParams = useSearchParams();
  const { isLoaded } = useGoogleMapsLoader();

  const id = searchParams.get("id");
  if (!id) redirect("/usvs");
  const { usv } = useUsv(id);
  const { usvData } = useUsvData(id);
  console.log({ usv, usvData });

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
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/*  */}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
