let inputArea = document.getElementById('inputArea');
let ouputArea = document.getElementById('outputArea');
let btn = document.getElementById('generateButton');
let errorDiv = document.querySelector('.error-div');
let errorMsg = document.querySelector('.error-msg .msg');
let dummyDiv = document.querySelector('.dummy-div');
let close = document.querySelector('.error-msg .close');

btn.addEventListener('click',()=>{
    if(inputArea.value != '' && inputArea.value != undefined && inputArea.value != null)
    generateHTML(inputArea.value);
})
close.addEventListener('click',()=>{
    errorDiv.style.display = 'none';
})
let generateHTML = (data)=>{
    let jsonData = JSON.parse(data);
    let duplicate = findDuplicateIds(jsonData);
    if(duplicate.length > 0){
        errorMsg.innerText = `Error: ${[...duplicate]} ID duplicated`
        errorDiv.style.display = 'block';
    } else {
        const output = jsonData.map((objects)=>{
            let rootDiv = document.createElement('div');
            rootDiv.setAttribute('class','root');
            rootDiv.setAttribute('data-id',objects.id);
            dummyDiv.appendChild(rootDiv);
            let aditionalContainer = document.createElement('span');
            aditionalContainer.setAttribute('class','additional_details');
            
            const keys = Object.keys(objects);
            for (const key of keys) {
                if(key != 'id' && key == 'username' || key == 'video_name'){
                    let span = document.createElement('span');
                    span.setAttribute('class',key);
                    span.innerText = objects[key];
                    rootDiv.appendChild(span);
                } else if(key != 'id') {
                    let span = document.createElement('span');
                    span.setAttribute('class',key);
                    span.innerText = objects[key];
                    aditionalContainer.appendChild(span);
                }
            }
            rootDiv.appendChild(aditionalContainer);
            return rootDiv;
        })
        let inputToOutput = dummyDiv.innerHTML;
        ouputArea.innerText = inputToOutput;
    }
}

let findDuplicateIds = (objects)=> {
    const idMap = {};
    const duplicates = [];
    for (const obj of objects) {
      const id = obj.id;
      if (idMap[id]) {
        duplicates.push(id);
      } else {
        idMap[id] = true;
      }
    }
    return duplicates;
  }