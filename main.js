/* DOM SELECTORS */
const periodicTable = document.querySelector('.periodicTable')
const ptLant = document.querySelector('.ptLant')



async function getElements() {
  let url = 'https://periodic-table-elements-info.herokuapp.com/elements'
  try {
      let res = await fetch(url, {method: 'GET'})
      return await res.json()
  } catch (error) {
      console.log(error)
  }
}


async function renderElements() {
  let elements = await getElements()
  let ptHtml = ''
  let ptLantHtml = ''
  elements.forEach(element => {
    let segment = `<button onclick="window.open('https://en.wikipedia.org/wiki/${element.name}')" class="${element.groupBlock}">
                    <p class="nbr">${element.atomicNumber}</p>
                    <h2 class="symbol">${element.symbol}</h2>
                    <p class="name">${element.name}</p>
                    <p class="atomic-weight">${element.atomicMass}</p>
                    <p class="electron-shell">${element.electronicConfiguration}</p>
                  </button>`
    if (element.atomicNumber > 56 &&  element.atomicNumber < 72 ) {
      ptLantHtml += segment
    } else if(element.atomicNumber > 88 &&  element.atomicNumber < 104){
      ptLantHtml += segment
    } else {
      ptHtml += segment
    }
  })

  for (let i = 1; i <= 4; i++) {
    let blanckSpace = ''
    const blanckDiv = `<div class="blank-${i}"></div>`
    blanckSpace += blanckDiv
    ptHtml += blanckSpace
  }

  periodicTable.innerHTML = ptHtml
  ptLant.innerHTML = ptLantHtml
}



renderElements()