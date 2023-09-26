import { useJsApiLoader } from "@react-google-maps/api";

export default function useGoogleMapsLoader() {
  return useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAaM-eD7RxXJNSkZzbN4iy-bJZwMNunOiE",
  });
}
