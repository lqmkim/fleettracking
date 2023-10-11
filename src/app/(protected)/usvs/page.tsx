"use client";

import useUsvs from "@/hooks/useUsvs";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import NewUSVModal from "./NewUSVModal";
import Link from "next/link";
import useGoogleMapsLoader from "@/utils/client/useGoogleMapsLoader";

const center = { lat: 3.23542, lng: 101.75081 };

export default function FleetsPage() {
  const { isLoaded } = useGoogleMapsLoader();

  const { usvs } = useUsvs();

  const [openNewUsvModal, setOpenNewUsvModal] = useState(false);

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

      <div className="mt-10 py-10 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                USVs
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the USVs and their current location, speed, and
                heading information.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                onClick={() => setOpenNewUsvModal(true)}
              >
                Add USV
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Speed
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Heading
                      </th> */}
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Details</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {(usvs || []).map((usv) => (
                      <tr key={usv.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {usv.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {usv.name}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {!usv.latitude
                            ? "-"
                            : (usv.latitude / 100).toFixed(5) +
                              ", " +
                              (usv.longitude / 100).toFixed(5)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {usv.speed?.toFixed(2) || "-"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {usv.heading?.toFixed(2) || "-"}
                        </td> */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {usv.status}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <Link
                            href={"/usvs/view?id=" + usv.id}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            Details<span className="sr-only">, {usv.name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewUSVModal openState={[openNewUsvModal, setOpenNewUsvModal]} />
    </div>
  );
}
