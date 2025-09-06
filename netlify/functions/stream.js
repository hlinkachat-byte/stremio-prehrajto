// netlify/functions/stream.js
exports.handler = async (event) => {
  // podpora /stream/movie/tt1234567.json aj query ?id=&type=
  let id = "";
  let type = "movie";
  const m = event.path && event.path.match(/\/stream\/([^/]+)\/([^/.]+)\.json$/);
  if (m) {
    type = m[1];
    id = m[2];
  } else {
    const qp = event.queryStringParameters || {};
    id = qp.id || "";
    type = qp.type || "movie";
  }

  const streams = [
    {
      title: "Prehraj.to demo stream",
      url: "https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4"
    }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    body: JSON.stringify({ streams })   // <-- DÔLEŽITÉ: objekt s kľúčom "streams"
  };
};
