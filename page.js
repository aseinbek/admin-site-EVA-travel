const $addBtn = document.querySelector('.addBtn')
const $country = document.querySelector('.country')
const $city = document.querySelector('.city')
const $info = document.querySelector('.info')
const $container = document.querySelector('.cardsContainer')
const $img1 = document.querySelector('.img1')
const $img2 = document.querySelector('.img2')



$addBtn.addEventListener('click', () => {
    if (isValidated($country) && isValidated($city) && isValidated($info)) {
    createCards({ 
        country: $country.value, 
        city: $city.value, 
        info: $info.value,
        img1: $img1.value,
        img2: $img2.value
    })
    }
})

//----------------cardTamplate------------------

window.addEventListener('load', () => {
    getCards()

    cards.reverse().forEach(travelCards => {
    $container.insertAdjacentHTML('beforeend', cardTemplate(travelCards))
    })
})

//-----------------------creatCards--------------------------

async function createCards({ country, city, info, img1, img2}) {

    try {
    const travelCards = {
        country: country.trim(),
        city: city.trim(),
        info: info.trim(),
        img1: img1.trim(),
        img2: img2.trim(),
    }

    await fetch('https://travel-site-a487e-default-rtdb.asia-southeast1.firebasedatabase.app/cards.json', {
        method: 'POST',
        body: JSON.stringify(travelCards)
        })

        $container.insertAdjacentHTML('afterbegin', cardTemplate(travelCards))

        resetFields()
    }catch (e) {
        console.error(e);
    }
}

// ----------------getCards-------------------------


async function getCards() {
    try {
        const response = await fetch('https://travel-site-a487e-default-rtdb.asia-southeast1.firebasedatabase.app/cards.json')

        const cards = await response.json()

        const cardsArr = Object.entries(cards).map(([id, val]) => {
            return {
                id,
                ...val
            }
        })

        cardsArr.reverse().forEach(travelCards => {
            $container.insertAdjacentHTML('beforeend', cardTemplate(travelCards))
        })

        console.log(cardsArr);
    } catch (e) {
        console.error(e);
    }
}

function cardTemplate(travelCards) {
    const {
        country,
        city,
        info,
        id,
        img1,
        img2,
    } = travelCards

    return `
    <div class="countryCards" style="background: url(${img1})center/cover ">
        <h2>${country}</h2>

        <h3>${city}</h1>

        <p>${info}</p>

        <button onclick="deleteCard('${id}')" class="card-btn">Delete</button>
    </div>
    `
}

//---------------------------deleteCards--------------------------------------------------------

async function deleteCard(id){
    try {
        const confirmDelete = confirm('Are you sure?')
        if (!confirmDelete) return

        const response = await fetch(`https://travel-site-a487e-default-rtdb.asia-southeast1.firebasedatabase.app/cards/${id}.json`, {
            method: 'DELETE'
        })
        const result = await response.json()

        console.log(result);
    } catch (e) {
        console.error(e);
    }
}

//-------------------------------validated

function isValidated(element) {
    if (!element.value) {
        element.classList.add('error')

        element.focus()

        return false
    }

    element.classList.remove('error')
    return true
}

//-------------------reset-------------------

function resetFields() {
    $country.value = ''
    $city.value = ''
    $info.value = ''
    $img1.value = ''
    $img2.value = ''
}

//-------------------------------------------


//---------------------------------------------------

let time = new Date ()

console.log(`${time.getFullYear()}` +':' + `${time.getMonth() + 1}`+':'+`${time.getDate()}`);

// Получаем текущий часовой пояс в минутах
const timezoneOffset = new Date().getTimezoneOffset();

// Задаем дату и время в определенном часовом поясе (UTC+3)
const dateInTimezone = new Date(Date.now() + timezoneOffset * 60 * 1000 + 6 * 60 * 60 * 1000);

console.log(`${dateInTimezone.getHours()}` + ':' + `${dateInTimezone.getMinutes()}`);
console.log(dateInTimezone);