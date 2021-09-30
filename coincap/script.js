const BASE_URL = 'api.coincap.io/v2/';

// Getting data
async function getData(endpoint, isFilter) {
  const address = `https://${BASE_URL}${endpoint}`;
  fetch(address, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
      // 'Authorization': 'Bearer XXXX',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
    },
  })
  .then((response) => response.json())
  .then((responseJSON) => parseResponse(responseJSON.data, isFilter))
  .catch((err) => window.alert(err));
}

// Parsing response
function parseResponse(responseArr, isFilter) {
  const arrWithNumbers = responseArr.map((item) => {
    // Converting Unix to regular time: https://stackoverflow.com/a/50255425
    const mappedItem = {
      'name': item.name,
      'rank': item.rank,
      'daily_volume': Math.round(item.volumeUsd * 100) / 100,
      'percent_total_volume': Math.round(item.percentTotalVolume * 100) / 100,
      'updated': new Date(item.updated).toLocaleTimeString("en-US"),
      'socket': item.socket,
      'website': item.exchangeUrl,
    }
    return mappedItem;
  })
  if (isFilter) {
    const filteredArr = arrWithNumbers.filter((item) => item.rank <= 10);
    prettyResponse(filteredArr);
    return filteredArr;
  }
  prettyResponse(arrWithNumbers);
  return arrWithNumbers;
}

// Prettying response
function prettyResponse(arrWithNumbers) {
  const prettyArr = arrWithNumbers.map((item) => {
    const prettyItem = {
      'name': item.name,
      'rank': item.rank, 
      'daily_volume': `$${item.daily_volume.toLocaleString()}`,
      'percent_total_volume': item.percent_total_volume,
      'updated': item.updated,
      'socket': item.socket,
      'website': item.website,
    }
    return prettyItem;
  })
  renderCards(prettyArr);
  return prettyArr;
}

// Render cards
function renderCards(prettyArr) {
  const itemsContainer = document.querySelector('.items-container');
  itemsContainer.innerHTML = '';
  prettyArr.forEach(({ name, rank, daily_volume, percent_total_volume, updated, website }) => {
    const cardLink = document.createElement('a');
    cardLink.href = website;
    const card = document.createElement('section');
    card.className = 'item';

    const itemRank = document.createElement('h3');
    const itemName = document.createElement('h4');
    const itemVolume = document.createElement('h4');
    const itemPercentTotalVolume = document.createElement('h4');
    const itemUpdated = document.createElement('h4');

    itemRank.innerText = rank;
    itemName.innerText = name;
    itemVolume.innerText = `Volume: US${daily_volume}`;
    itemPercentTotalVolume.innerText = `Dominance: ${percent_total_volume}%`;
    itemUpdated.innerText = `Last updated: ${updated}`;

    card.appendChild(itemRank);
    card.appendChild(itemName);
    card.appendChild(itemVolume);
    card.appendChild(itemPercentTotalVolume);
    card.appendChild(itemUpdated);

    cardLink.appendChild(card);
    itemsContainer.appendChild(cardLink);
  })
}

window.onload = () => {
  getData('exchanges', true);
}

