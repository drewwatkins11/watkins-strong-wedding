import Head from "next/head";
import Map, { Marker } from "react-map-gl";

export default function MapOutput(props) {
  const { mapCenter, markers, mapStyle, initialViewState } = props;
  return (
    <>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
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
