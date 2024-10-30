import React from "react";
import ReactDOM from "react-dom";

const loadYmaps = () => {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=d168eb35-e73d-4138-a7e2-dea793e549e1&lang=ru_RU`;
    script.onload = () => resolve(ymaps3);
    document.head.appendChild(script);
  });
};

export const initializeYmaps = async () => {
  await loadYmaps();

  const [ymaps3React, ymaps3Markers, ymaps3Controls] = await Promise.all([
    ymaps3.import("@yandex/ymaps3-reactify"),
    ymaps3.import("@yandex/ymaps3-markers@0.0.1"),
    ymaps3.import("@yandex/ymaps3-controls@0.0.1"),
    ymaps3.ready,
  ]);

  const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
  const core = reactify.module(ymaps3);
  const markers = reactify.module(ymaps3Markers);
  const controls = reactify.module(ymaps3Controls);

  return {
    core,
    markers,
    controls,
    reactify,
  };
};
