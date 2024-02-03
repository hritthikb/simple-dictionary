const apiKey = '';  
const wordInput = document.getElementById('word-input');  
const submitButton = document.getElementById('submit-button');  
const wordDiv = document.getElementById('word-div');  
  
submitButton.addEventListener('click', () => {  
  const word = wordInput.value;  
  const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;  
  const apiUrL2 = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
  
  fetch(apiUrl)  
    .then(response => response.json())  
    .then(data => {  
      const audioUrl = data[0].hwi.prs[0].sound.audio[0];  
      const audioButton = document.createElement('button');  
      audioButton.id = 'audio-button';  
      audioButton.innerText = 'Listen';  
      audioButton.addEventListener('click', () => {  
        const audioElement = new Audio(`https://media.merriam-webster.com/soundc11/${audioUrl[0]}/${audioUrl}`);  
        audioElement.play();  
      });  
      const wordText = document.createTextNode(word);  
      wordDiv.innerHTML = '';  
      wordDiv.appendChild(wordText);  
      wordDiv.appendChild(audioButton);  
    })  
    .catch(error => console.error(error));  
});  
