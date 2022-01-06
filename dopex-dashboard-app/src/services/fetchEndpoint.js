export default async function fetchEndpoint(endpoint, pool = '') {
  const response = await fetch(`${ endpoint }${ pool }`);
  const responseJSON = await response.json();
  console.log(responseJSON);
}