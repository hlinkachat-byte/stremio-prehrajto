// netlify/functions/stream.js

exports.handler = async (event) => {
  const id = (event.queryStringParameters && event.queryStringParameters.id) || "";

  // Vraciame demo stream pre hocijaký film/seriál
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
