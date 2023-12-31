"use client";

import useUsv from "@/hooks/useUsv";
import useUsvData from "@/hooks/useUsvData";
import useGoogleMapsLoader from "@/utils/client/useGoogleMapsLoader";
import { GoogleMap, MarkerF, Polyline } from "@react-google-maps/api";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import EditUSVModal from "./EditUSVModal";
import DeleteUSVModal from "./DeleteUSVModal";
import moment from "moment";

const center = { lat: 3.23542, lng: 101.75081 };

const polylineOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 1.0,
  strokeWeight: 2,
};

export default function FleetPage() {
  const searchParams = useSearchParams();
  const { isLoaded } = useGoogleMapsLoader();

  const id = searchParams.get("id");
  if (!id) redirect("/usvs");
  const { usv } = useUsv(id);
  const { usvData, mutate } = useUsvData(id);

  const [map, setMap] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();  
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (usvData && usvData.length !== 0)
      // @ts-ignore
      map?.panTo({
        lat: usvData[0].latitude,
        lng: usvData[0].longitude,
      });
  }, [usvData]);

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
            <Polyline
              path={usvData?.map((x) => ({
                lat: x.latitude,
                lng: x.longitude,
              }))}
              options={polylineOptions}
            />

            {usvData?.length !== 0 && (
              <MarkerF
                position={{
                  lat: usvData?.[0].latitude,
                  lng: usvData?.[0].longitude,
                }}
              />
            )}
          </GoogleMap>
        )}
      </div>

      <div className="mt-10 py-10 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className="flex flex-row gap-x-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  USVs
                </h1>
                <div className="flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-green-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Live</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the USVs and their current location, speed, and
                heading information.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <div className="flex flex-row space-x-2">
                <button
                  type="button"
                  className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  onClick={() => setOpenEditModal(true)}
                >
                  Edit {usv?.name}
                </button>
                <button
                  type="button"
                  className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={() => setOpenDeleteModal(true)}
                >
                  Delete
                </button>
              </div>
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
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Show</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {(usvData || []).map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 lg:pl-8">
                          {(item.latitude).toFixed(5) +
                            ", " +
                            (item.longitude).toFixed(5)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {item.speed.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {item.heading.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {moment(item.timestamp).calendar()}
                        </td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <button
                            onClick={() =>
                              // @ts-ignore
                              map?.panTo({
                                lat: item.latitude,
                                lng: item.longitude,
                              })
                            }
                            className="text-teal-600 hover:text-teal-900"
                          >
                            Show
                            <span className="sr-only">, {item.name}</span>
                          </button>
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

      <EditUSVModal open={openEditModal} setOpen={setOpenEditModal} usv={usv} />
      <DeleteUSVModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        usv={usv}
      />
    </div>
  );
}
