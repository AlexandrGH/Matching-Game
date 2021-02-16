let map = []
const fruits = ['apple', 'apple-2', 'apple-3', 'banana', 'cherry', 'grapefruit', 'grapes', 'lemon', 'melon', 'orange', 'pear', 'strawberry']
const mapLenX = 4
const mapLenY = 4
function mapGen(){
    map = []
    mapTemp = []
    const amountFruits = mapLenX * mapLenY / 2
    shuffle(fruits)
    for (let index = 0; index < amountFruits; index++) {
        mapTemp.push(fruits[index])
        mapTemp.push(fruits[index])
    }
    shuffle(mapTemp)
    for (let index = 0; index < mapLenY; index++) {
        map.push(mapTemp.slice(0, mapLenX))
        mapTemp.splice(0, mapLenX)
    }
    shuffle(map)
}
function shuffle(arr){
    arr.sort(function(a, b) {
        return Math.random() - 0.5
    });
    return arr
}
function start(){
    mapGen()
    document.querySelector('button').remove()
    for (let y = 0; y < mapLenY; y++) {
        let raw = document.createElement('div')
        raw.classList.add('raw')
        for (let x = 0; x < mapLenX; x++) {
            let card = document.createElement('div')
            card.id = cardID(y, x)
            card.classList.add('card', map[y][x], 'hide')
            card.onclick = function(){
                if(lock === false){                    
                    openCard(y, x)
                }
            }
            raw.appendChild(card)
        }    
        document.querySelector('.container').appendChild(raw)
    }
}
let currentCard = []
function openCard(y, x){
    if((y !== currentCard[0])||(x !== currentCard[1])){
        if(currentCard.length < 1){
            currentCard = [y,x]
            document.getElementById(cardID(y, x)).classList.remove('hide')
        }
        else{
            lockCards()
            document.getElementById(cardID(y, x)).classList.remove('hide')
            setTimeout(compareCards, 500, y, x);
        }
    }
}
function compareCards(y, x){
    if(map[y][x] !== map[currentCard[0]][currentCard[1]]){
        document.getElementById(cardID(y, x)).classList.add('hide')
        document.getElementById(cardID(currentCard[0], currentCard[1])).classList.add('hide')
    }
    else{
        cardOpened(y, x)
        cardOpened(currentCard[0], currentCard[1])
        win()
    }
    currentCard = []
    lockCards()
}
function cardID(y,x){
    const id = y.toString() + x.toString()
    return id
}
let lock = false
function lockCards(){
    if(lock === false){
        lock = true
    }
    else{
        lock = false
    }
}
function cardOpened(y, x){
    let card = document.getElementById(cardID(y, x))
    card.classList.add('opened')
    card.onclick = null
}
function win(){
    let hidden  = document.getElementsByClassName('hide')
    if(hidden.length < 1){
        const restart = document.createElement('button')
        restart.onclick = function(){
            document.querySelector('.container').innerHTML = ''
            start()
        }
        restart.appendChild(document.createTextNode('Play again'))
        document.body.appendChild(restart)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const images = new Array();

    function preloadImages(...images) {
        images.forEach((image, i) => {
            image = new Image();
            image.src = preloadImages.arguments[i];
        });
    };

    // Предварительная загрузка нужных картинок 
    preloadImages(
		'img/apple-2.svg',
		'img/apple-3.svg',
		'img/apple.svg',
		'img/banana.svg',
		'img/cherry.svg',
		'img/grapefruit.svg',
		'img/grapes.svg',
		'img/lemon.svg',
		'img/melon.svg',
		'img/orange.svg',
		'img/strawberry.svg',
		'img/pear.svg',
    );
});