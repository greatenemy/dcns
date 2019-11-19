// @link https://danlevy.net/you-may-not-need-axios/

export default async function mapGenerate(data: object) {
  console.log('mapGenerate')
  return fetch('/api/map/generate', {
    method: 'POST',
    body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
    headers: { 'Content-Type': 'application/json' },
  })
    // .then(response => (console.log({response}),response))
    .then(response => response.json())
}
