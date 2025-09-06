import manifest from '../../manifest.json' assert { type: 'json' };

export const handler = async () => {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(manifest)
  };
};
