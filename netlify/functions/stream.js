// netlify/functions/stream.js
// Minimal Stremio "stream" endpoint bez závislostí.
// Stremio volá túto funkciu s query parametrom ?id=<IMDB_ID alebo iné ID>
// Odpoveď musí byť: { streams: [ { title, url } ] }

exports.handler = async (event) => {
  // ID, ktoré pošle Stremio (napr. "tt0032138" pre film, alebo "tt1234567:1:2" pre S01E02)
  const id = (event.queryStringParameters && event.queryStringParameters.id) || "";

  // Tu si môžeš spraviť vlastné mapovanie podľa ID -> URL
  // Zatiaľ vrátime demo video (public domain), nech si vieš addon hneď otestovať.
  const demoStreams = [
    {
      title: "Test video (MP4)",
      url: "https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4"
    }
  ];

  // Ak budeš chcieť neskôr riešiť rôzne kvality / titulky, pridaj ďalšie objekty do poľa streams.

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      // CORS povolenie pre Stremio
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    body: JSON.stringify({
      streams: demoStreams
    })
  };
};
