// netlify/functions/stream.js
exports.handler = async (event) => {
  // podpora oboch štýlov:
  // 1) /stream/movie/tt1234567.json
  // 2) /.netlify/functions/stream?id=tt1234567&type=movie
  let id = "";
  let type = "movie";

  // pokus o vyčítanie z path /stream/:type/:id.json (po redirecte z netlify.toml)
  const m = event.path && event.path.match(/\/stream\/([^/]+)\/([^/.]+)\.json$/);
  if (m) {
    type = m[1];
    id = m[2];
  } else {
    // fallback: query parametre
    const qp = event.queryStringParameters || {};
    id = qp.id || "";
    type = qp.type || "movie";
  }

  // DEMO stream, aby sa addon zobrazil v zozname zdrojov pri každom titule
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
    body: JSON.stringify({ streams })
  };
};
