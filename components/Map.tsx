import Map, { Marker } from "react-map-gl";
import "@/styles/mapbox.css";

export default function MapOutput(props) {
  const { mapCenter, markers, mapStyle, initialViewState } = props;
  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={
          initialViewState || {
            longitude: mapCenter.lng,
            latitude: mapCenter.lat,
            zoom: 6,
          }
        }
        style={{ width: "100%", height: "100%" }}
        mapStyle={
          mapStyle === "POI"
            ? process.env.NEXT_PUBLIC_MAPBOX_STYLE_POI
            : process.env.NEXT_PUBLIC_MAPBOX_STYLE
        }
      >
        {markers.map((marker, index) => (
          <Marker
            longitude={marker.lng}
            latitude={marker.lat}
            anchor="bottom"
            key={index}
          >
            {marker.marker || <img src="./map_marker.png" width={45} />}
          </Marker>
        ))}
      </Map>
    </>
  );
}
