let siuuCount = 0;
let attributes = {
    'Speed': 0, 'Shooting': 0, 'Dribbling': 0, 'Passing': 0, 'Tackling': 0,
    'Heading': 0, 'Stamina': 0, 'Strength': 0, 'Defending': 0, 'Vision': 0
};

document.addEventListener('DOMContentLoaded', (event) => {
    // Fetch user's email or Telegram username (simulated here)
    document.getElementById('userID').textContent = localStorage.getItem('userID') || 'User123';
    updateSIUUCount();
    setupPages();
    setupTapToEarn();
    setupImprove();
    setupRewards();
    setupLearningClips();
});

function updateSIUUCount() {
    document.getElementById('siuuCount').textContent = siuuCount;
}

function setupPages() {
    document.querySelectorAll('nav button').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(e.target.dataset.page).classList.add('active');
        });
    });
}

function setupTapToEarn() {
    document.getElementById('tapToEarn').addEventListener('click', () => {
        siuuCount += 10;
        updateSIUUCount();
        showAnimation();
    });
}

function showAnimation() {
    let animation = document.getElementById('tapAnimation');
    animation.style.opacity = 1;
    animation.style.animation = 'none';
    setTimeout(() => {
        animation.style.animation = '';
    }, 10);
}

function setupImprove() {
    const attributesDiv = document.getElementById('attributes');
    for (let [name, level] of Object.entries(attributes)) {
        let attribute = document.createElement('div');
        attribute.innerHTML = `<h4>${name}</h4><p>Level: ${level}</p><button class="upgrade">Upgrade</button>`;
        attribute.querySelector('.upgrade').addEventListener('click', () => upgradeAttribute(name));
        attributesDiv.appendChild(attribute);
    }
}

function upgradeAttribute(name) {
    if (siuuCount >= 1000) {
        siuuCount -= 1000;
        attributes[name]++;
        updateSIUUCount();
        if (attributes[name] % 5 === 0) {
            siuuCount += 2000; // Cashback for every 5 levels
            updateSIUUCount();
        }
        document.getElementById('attributes').querySelectorAll('div').forEach(div => {
            if (div.querySelector('h4').textContent === name) {
                div.querySelector('p').textContent = `Level: ${attributes[name]}`;
            }
        });
    } else {
        alert('Not enough SIUU points to upgrade!');
    }
}

function setupRewards() {
    document.getElementById('convert').addEventListener('click', () => {
        let coins = Math.floor(siuuCount / 5000);
        siuuCount %= 5000;
        alert(`You've converted to ${coins} SIUU Coin(s)!`);
        updateSIUUCount();
    });

    let referralLink = `https://siuu-game.com?ref=${Math.random().toString(36).substring(2, 15)}`;
    document.getElementById('referralLink').value = referralLink;
}

function setupLearningClips() {
    const clips = [
        { id: 'dQw4w9WgXcQ', title: 'Crypto Basics' },
        { id: '3xQTJi2tqgk', title: 'Blockchain Explained' }
    ];
    let list = document.getElementById('learningClips');
    clips.forEach(clip => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="https://www.youtube.com/watch?v=${clip.id}" target="_blank">${clip.title}</a> <button class="watch" data-id="${clip.id}">Watch for 1000 SIUU Points</button>`;
        li.querySelector('.watch').addEventListener('click', (e) => {
            if (confirm(`Did you watch this video? ${clip.title}`)) {
                siuuCount += 1000;
                updateSIUUCount();
            }
        });
        list.appendChild(li);
    });
}

// Store user's ID in localStorage for simplicity
localStorage.setItem('userID', 'User123');

// Note: For actual implementation, you'd need to handle real user identification securely.