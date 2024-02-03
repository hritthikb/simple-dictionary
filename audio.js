const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-button');
const refreshButton = document.getElementById('refresh-button');
const wordSpan = document.getElementById('word-span');
const audioButton = document.getElementById('audio-button');
const definitionDiv = document.getElementById('definition-div');

audioButton.style.display = 'none';  // Hide the audio button initially

submitButton.addEventListener('click', () => {
    const word = wordInput.value;
    const wordFromServer = `http://localhost:3000/word/${word}`;

    fetch(wordFromServer)
        .then(response => response.json())
        .then(data => {
            const audioUrl = data.audioUrl;
            const subdirectory = audioUrl.startsWith('bix') ? 'bix' : audioUrl.startsWith('gg') ? 'gg' : audioUrl[0];
            audioButton.style.display = 'inline';  // Show the audio button
            audioButton.addEventListener('click', () => {
                const audioElement = new Audio(`https://media.merriam-webster.com/soundc11/${subdirectory}/${audioUrl}.wav`);
                audioElement.play();
            });
            wordSpan.textContent = word;
            definitionDiv.textContent = data.definition;
        })
        .catch(error => console.error(error))
        .finally(() => {
            // Disable the submit button after the fetch operation is complete
            submitButton.disabled = true;
        });
});

refreshButton.addEventListener('click', () => {
    // Clear the input field
    wordInput.value = '';

    // Hide the audio button
    audioButton.style.display = 'none';

    // Clear the word and definition fields
    wordSpan.textContent = '';
    definitionDiv.textContent = '';

    // Enable the submit button
    submitButton.disabled = false;
});


