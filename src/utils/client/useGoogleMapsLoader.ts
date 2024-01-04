import { useJsApiLoader } from "@react-google-maps/api";

export default function useGoogleMapsLoader() {
  return useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB4vVwtqBr0rshOu0IxkVNHhhoPh4CWzOA",
  });
}
