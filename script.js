let selectedWords = [];
const correctOrder = ['you', 'are', 'absolutely', 'amazing'];

function createStars() {
    const starField = document.getElementById('starField');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = Math.random() * 3 + 1 + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        starField.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setupWordPuzzle();
    
    document.getElementById('mathAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkMath();
        }
    });
    
    document.getElementById('colorAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkColor();
        }
    });
});

function nextStep(stepNumber) {
    document.querySelector('.step.active').classList.remove('active');
    document.getElementById('step' + stepNumber).classList.add('active');
}

function checkMath() {
    const answer = document.getElementById('mathAnswer').value.toLowerCase().trim();
    const feedback = document.getElementById('mathFeedback');
    
    if (answer === 'love' || answer === '4' || answer === 'four') {
        feedback.innerHTML = '<div class="success-message">Perfect! Love is the answer! 💕</div>';
        setTimeout(() => nextStep(3), 1500);
    } else {
        feedback.innerHTML = '<div class="error-message">Hmm, think about what two hearts make together... 💕</div>';
    }
}

function setupWordPuzzle() {
    const wordBoxes = document.querySelectorAll('.word-box');
    wordBoxes.forEach(box => {
        box.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.classList.add('selected');
                selectedWords.push(this.dataset.word);
                updateSelectedDisplay();
                
                if (selectedWords.length === 4) {
                    checkWordOrder();
                }
            }
        });
    });
}

function updateSelectedDisplay() {
    document.getElementById('selectedWords').textContent = selectedWords.join(' ');
    if (selectedWords.length > 0) {
        document.getElementById('resetBtn').style.display = 'inline-block';
    }
}

function checkWordOrder() {
    const feedback = document.getElementById('wordFeedback');
    
    if (JSON.stringify(selectedWords) === JSON.stringify(correctOrder)) {
        feedback.innerHTML = '<div class="success-message">Beautiful! You are absolutely amazing! ✨</div>';
        setTimeout(() => nextStep(4), 2000);
    } else {
        feedback.innerHTML = '<div class="error-message">Not quite right. Try again! The sentence should sound natural. 💕</div>';
        setTimeout(resetWords, 2000);
    }
}

function resetWords() {
    selectedWords = [];
    document.querySelectorAll('.word-box').forEach(box => {
        box.classList.remove('selected');
    });
    document.getElementById('selectedWords').textContent = '';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('wordFeedback').innerHTML = '';
}

function checkColor() {
    const answer = document.getElementById('colorAnswer').value.toLowerCase().trim();
    const feedback = document.getElementById('colorFeedback');
    
    if (answer === 'red' || answer === 'pink') {
        feedback.innerHTML = '<div class="success-message">Yes! The color of love! ❤️</div>';
        setTimeout(() => nextStep(5), 1500);
    } else {
        feedback.innerHTML = '<div class="error-message">Think of the color of roses and hearts... 🌹</div>';
    }
}

function restartPuzzle() {
    document.getElementById('mathAnswer').value = '';
    document.getElementById('colorAnswer').value = '';
    resetWords();
    
    document.getElementById('mathFeedback').innerHTML = '';
    document.getElementById('colorFeedback').innerHTML = '';
    
    document.querySelector('.step.active').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}

function addSparkleEffect(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            addSparkleEffect(this);
        });
    });
});