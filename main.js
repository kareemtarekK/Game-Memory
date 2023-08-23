let duration = 1500;
let leader;
let scoreSpan;
let nameSpan;
let div;
let score = 80;
// if(window.localStorage.getItem("name")&&window.localStorage.getItem("score")){
//     Details(window.localStorage.getItem("name") , window.localStorage.getItem("score"));
// }

function Details( first , second){
    leader = document.querySelector(".leader");
    scoreSpan = document.createElement('span');
    nameSpan = document.createElement('span');
    div = document.createElement('div');
    div.appendChild(nameSpan);
    div.appendChild(scoreSpan);
    nameSpan.innerHTML = first;
    scoreSpan.innerHTML = second;
    div.style.cssText = "width:100%;display:flex;justify-content:space-around;margin-top:10px;color:black;background-color:#eee;padding:10px 0px;font-size:19px;font-weight:normal;";
    nameSpan.style.cssText = "background-color:white;padding:15px;";
    scoreSpan.style.cssText = "background-color:white;padding:15px;";
    leader.appendChild(div);
}
let rem;
let timer = document.querySelector(".timer .number");
let spanBtn = document.querySelector('.btn');
spanBtn.onclick = function(){
    // starting game
    spanBtn.style.display = 'none';
    document.querySelector('.popUp').style.display = 'block';
}
let startBtn = document.querySelector('.popUp span');
startBtn.onclick = function(){
    let ns = document.querySelector('.ns');
    let content = document.querySelector('[type=text]').value;
    if(content == ""){
        ns.innerHTML = 'Unknown';
    } else{
        ns.innerHTML = content;
    }
    document.querySelector('.splash-screen').remove();
    
        Details(ns.innerHTML , 0);
        
        // window.localStorage.setItem("name" , nameSpan.innerHTML);
        // window.localStorage.setItem("score" , scoreSpan.innerHTML);
    // sound of starting
    document.getElementById("start").play();
    
      rem = setInterval(() => {
          // method for decreasing timer by 1
       timer.innerHTML = parseInt(timer.innerHTML) - 1;
         if(timer.innerHTML < 0){
             // reset timmer if under 0 second and clear setinterval
                timer.innerHTML = 60;
                clearInterval(rem);
                document.getElementById("over").play();
                // showing loser pop-up
                document.querySelector(".pop-window").style.display = 'block';
                
                // after 5 second reloading page
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } 
    }, 1000);
}




let blockContainer = document.querySelector('.container-game-box');
// array of boxs
let blockBox = Array.from(blockContainer.children);
// array of indexes from length but not random to be random calling function after that 
let elementNumbers = [...Array(blockBox.length).keys()];
// calling function for flipping elements of array
filpArray(elementNumbers);

blockBox.forEach(( block , index ) => {
    // putting order on box
    block.style.order = elementNumbers[index];
    // when clicking on box
    block.addEventListener('click', function(){
        clickingCard(block);
    });
})

// flipping array elements
function filpArray( arr ){
    let current = arr.length , temp , random;
    while( current > 0){
        random = Math.floor(Math.random() * current);
        current --;
        //temp = last element in array
        temp = arr[current];
        // last element in array = random element
        arr[current] = arr[random];
        // random element = temp
        arr[random] = temp;
    }
    return arr;    
}


// filp element and filter them which has class flipped to be 2 only
function clickingCard(card){
    card.classList.add("flipped");
    let filterFliped = blockBox.filter(elementFilterFliped => elementFilterFliped.classList.contains("flipped"));
    if(filterFliped.length === 2){
        // prevent clicking on any other element
      blockContainer.classList.add("pointer-event");
      // not prevent after 1000 ms
      setTimeout(() => {
        blockContainer.classList.remove("pointer-event");
      }, duration );
      // compare 2 box if they are equal in dataset
        matching(filterFliped[0] , filterFliped[1])
    }
}



function matching(firstBlock , secondBlock){
    if(firstBlock.dataset.compare === secondBlock.dataset.compare){
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
        // same like filpped class
        firstBlock.classList.add("match");
        secondBlock.classList.add("match");
        // checking if score == 80 stop decreasing timmer
      
        if(scoreSpan.textContent >= 70){
            scoreSpan.innerHTML = 80;
           clearInterval(rem);
           // display block congratulations
           document.getElementById("congratulation").play();
           document.querySelector('.congr').style.display = "block";
        //    window.localStorage.setItem("score", scoreSpan.innerHTML );

           // after 5 seconds reloading page
           setTimeout(() => {
                window.location.reload();
            }, 6000);
        } else{
            // increasing score 10 points
            scoreSpan.innerHTML = parseInt(scoreSpan.innerHTML) + 10;
            // window.localStorage.setItem("score", scoreSpan.innerHTML);
            // sound congratulation
            document.getElementById("true").play();
        }
    } else{
        // if 2 box not equal in dataset increasing tries by 1
        let trySpan = document.querySelector(".try");
        trySpan.innerHTML = parseInt(trySpan.innerHTML) + 1; 
        // remove flipped class to be not flipped
        setTimeout(()=>{
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
        }, duration );
        // sound of failture
        document.getElementById("false").play();
    }
}

let btn = document.querySelector('.up');
window.onscroll = () => {
    if(window.scrollY >= 350){
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}
btn.onclick = () => {
    window.scrollTo({
        left : 0,
        top : 0,
        behavior : 'smooth',
    })  
    
}
   
