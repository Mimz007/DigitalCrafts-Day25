const gameHolder = document.getElementById("game");
selected = null;
points = 0;
const turnFaceDown = (card) =>{
    card.sideShown = "back";
    card.node.classList.remove("back")
    if(card.node.firstChild){
        card.node.addEventListener("click", cardClicked)
        card.node.removeChild(card.node.firstChild)
    }
}
const turnFaceUp = (card) =>{
    card.node.removeEventListener('click', cardClicked);
    card.sideShown = "front";
    card.node.classList.add("back")
    let img = document.createElement("img");
    img.src = card.faceImage;
    card.node.append(img)
}
const reset = () =>{
    selected= null;
    cards.forEach(card=>turnFaceDown(card))
}
const cardClicked = (evt)=>{
    let cardNode = evt.target
    let card = cards.find(card=>card.id == cardNode.id)
    turnFaceUp(card)
    if(!selected){
        selected = card;
    } else if(selected.value == card.value){
        console.log('match')
        window.setTimeout(()=>{
            card.node.parentNode.removeChild(card.node)
            selected.node.parentNode.removeChild(selected.node)
            reset()
        }, 3000)
    } else {
        console.log('No Match')
        window.setTimeout(reset, 3000)
    }
}
const createCard = (id) =>{
    let newCard = document.createElement("div");
    newCard.setAttribute("id", id);
    newCard.className = 'card';
    newCard.addEventListener("click", cardClicked)
    return newCard
}
//YOU NEED TO RANDOMIZE YOUR CARDS
//YOU NEED TO CHANGE THIS
let cards = [['card1',"cat", "img.jpg"],['card2',"cat", "img.jpg"],['card3',"dog", "img.jpg"],['card4','dog', "img.jpg"]].map(cardArr=>{
    return {
        id:cardArr[0],
        node:createCard(cardArr[0]),
        sideShown:'front',
        value:cardArr[1],
        faceImage:cardArr[2]
    }
})
cards.forEach(card=>gameHolder.append(card.node))