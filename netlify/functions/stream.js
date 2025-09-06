import fetch from 'node-fetch';
import cheerio from 'cheerio';
import hjson from 'hjson';

const PREHRAJ_BASE = 'https://prehraj.to';
const UA = 'kodi/prehraj.to';

function parsePlayer(html) {
  const $ = cheerio.load(html);
  const scripts = $('script').map((i, el) => $(el).html() || '').get();
  const target = scripts.find(s => /var\s+sources\s*=/.test(s));
  let file = '', subs = '';

  if (target) {
    const mFile = target.match(/file:\s*"(.*?)"/s);
    if (mFile && mFile[1]) file = mFile[1];
    const mSrc = target.match(/src:\s*"(.*?)"/s);
    if (!file && mSrc && mSrc[1]) file = mSrc[1];

    const mTracks = target.match(/var\s+tracks\s*=\s*(.*?);/s);
    if (mTracks && mTracks[1]) {
      try {
        const arr = hjson.parse(mTracks[1]);
        if (Array.isArray(arr) && arr[0] && arr[0].src) subs = arr[0].src;
      } catch {}
    }
  }
  return { file, subs };
}

export const handler = async (event) => {
  try {
    const pathParts = event.path.split('/');
    const rawId = pathParts[pathParts.length - 1].replace('.json', '');
    const padded = rawId.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(rawId.length / 4) * 4, '=');
    const relative = Buffer.from(padded, 'base64').toString('utf8');
    const url = relative.startsWith('http') ? relative : `${PREHRAJ_BASE}${relative}`;

    const res = await fetch(url, { headers: { 'user-agent': UA } });
    const html = await res.text();
    const { file } = parsePlayer(html);

    if (!file) {
      return { statusCode: 200, body: JSON.stringify({ streams: [] }) };
    }

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        streams: [{ title: 'Prehraj.to', url: file }]
      })
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 200, body: JSON.stringify({ streams: [] }) };
  }
};
