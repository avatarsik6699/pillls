import type { FC } from "react";
import { useEffect, useState } from "react";

import { initializeYmaps } from "@/lib/ymaps";
import { utils } from "@/shared/utils/utils";

type MapTypes = Awaited<ReturnType<typeof initializeYmaps>>;

interface Props {
  coordinates: [number, number];
}

const Map: FC<Props> = props => {
  const [ymapsLoaded, setYmapsLoaded] = useState(false);

  const [reactify, setReactify] = useState<MapTypes["reactify"] | null>(null);
  const [markers, setMarkers] = useState<MapTypes["markers"] | null>(null);
  const [core, setCore] = useState<MapTypes["core"] | null>(null);
  const [controls, setControls] = useState<MapTypes["controls"] | null>(null);

  useEffect(() => {
    const loadYmaps = async () => {
      const { reactify, markers, controls, core } = await initializeYmaps();
      setCore(core);
      setReactify(reactify);
      setMarkers(markers);
      setControls(controls);
      setYmapsLoaded(true);
    };

    loadYmaps();
  }, []);

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    utils
      .getUserLocation()
      .then(coords => {
        setCoordinates(coords);
      })
      .catch(error => {
        console.error("Error getting user location:", error);
      });
  }, []);

  if (!ymapsLoaded || !reactify || !markers || !controls || !core) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="h-[70vh] w-full">
      <core.YMap
        location={reactify.useDefault({ center: props.coordinates, zoom: 12 })}
      >
        <core.YMapDefaultSchemeLayer />
        <core.YMapDefaultFeaturesLayer />
        <core.YMapControls position="right">
          <controls.YMapZoomControl />
          <controls.YMapGeolocationControl />
        </core.YMapControls>
        <markers.YMapDefaultMarker
          coordinates={reactify.useDefault(props.coordinates)}
        />

        {/* {coordinates && (
          <core.YMapMarker
            coordinates={reactify.useDefault(coordinates, coordinates)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
            </span>
          </core.YMapMarker>
        )} */}
      </core.YMap>
    </div>
  );
};

export default Map;
