// fazer igual do projeto app de receitas

export default async function fetchEndpoint(endpoint, pool = '') {
  try {
    const response = await fetch(`${ endpoint }${ pool }`);
    const responseJSON = await response.json();
    return responseJSON;
  }
  catch (error) {
    console.error(error)
  }
}