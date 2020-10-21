const inputType = "checkbox"
const checkBox = document.querySelectorAll(`input[type=${inputType}]`);

let start;
let end;
let shift = false;
let firstCheck = false;
let secondCheck = false;

function shiftUp(){
    shift = false;
}

function shiftDown(e){
  const KEY_CODE = 16;
  if(e.keyCode !== KEY_CODE) return;
  shift = true;
}


function handleShiftCheck(from, to){
    if(from> to){
        const array = [...checkBox].slice(to, from)
        array.forEach(el => {
            el.checked = true;
        });  
    }
    const array = [...checkBox].slice(from, to)
    array.forEach(el => {
        el.checked = true;
    });
    start = checkBox[to];
    end = null;
}

function findElementIndex(){
   const startPoint = [...checkBox].findIndex(el => el.checked === true && el === start);

   const endPoint = [...checkBox].findIndex(el => {
       return el !== checkBox[startPoint] && el.checked === true && el === end;
   } )

  if(endPoint !== -1){
      handleShiftCheck(startPoint, endPoint);
  } 
}


function startEndSetting(e){
    if(shift === false){
        let startArray = [...checkBox].filter(el => el.checked === true)
        start = startArray[startArray.length -1];
    }
    if(start && shift === true){
        end = e.target;
        
    }
    if(start && end){
        findElementIndex()
    }

}

Array.from(checkBox).forEach(box => box.addEventListener("change", startEndSetting));
window.addEventListener("keydown", shiftDown);
window.addEventListener("keyup", shiftUp);