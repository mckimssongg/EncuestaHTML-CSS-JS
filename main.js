document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const question1 = document.getElementById('question1').value.trim();
    const question2 = document.getElementById('question2').value.trim();
    const question3 = document.getElementById('question3').value.trim();
    
    if (question1 && question2 && question3) {
        const surveyResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
        surveyResponses.push({ question1, question2, question3 });
        localStorage.setItem('surveyResponses', JSON.stringify(surveyResponses));
        displayResponses();
        this.reset();
    }
});

window.onload = function() {
    displayResponses();
};

function displayResponses() {
    const surveyResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    const responseGrid = document.getElementById('responseGrid');
    responseGrid.innerHTML = '';
    surveyResponses.forEach((response, index) => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response';
        responseDiv.innerHTML = `
            <p>Pregunta 1: ${response.question1}</p>
            <p>Pregunta 2: ${response.question2}</p>
            <p>Pregunta 3: ${response.question3}</p>
            <button class="deleteBtn" onclick="deleteResponse(${index})">Eliminar</button>
        `;
        responseGrid.appendChild(responseDiv);
    });
}

function deleteResponse(index) {
    const surveyResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    surveyResponses.splice(index, 1);
    localStorage.setItem('surveyResponses', JSON.stringify(surveyResponses));
    displayResponses();
}
