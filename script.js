function createHeart() {
    if (document.querySelector('.error-overlay.show') || document.querySelector('.letter-overlay.show')) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

setInterval(createHeart, 500);

function submitForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const loverName = document.getElementById('loverName').value.trim();
    const messageDiv = document.getElementById('message');
    const errorOverlay = document.getElementById('errorOverlay');
    const letterOverlay = document.getElementById('letterOverlay');
    const letterText = document.getElementById('letterText');
    const container = document.querySelector('.container');

    if (!fullName || !phone || !dob || !address || !email || !loverName) {
        messageDiv.innerHTML = `<div class="form-error">Vui lòng điền đầy đủ tất cả thông tin!</div>`;
        return;
    }

    if (loverName.toLowerCase() !== 'panh') {
        errorOverlay.textContent = `Dume "${loverName}" là con nào vậy????`;
        errorOverlay.classList.add('show');
        container.classList.add('hidden');
        document.body.classList.remove('pastel-pink');
        setTimeout(() => {
            errorOverlay.classList.remove('show');
            container.classList.remove('hidden');
            messageDiv.innerHTML = '';
        }, 5000);
        return;
    }

    document.body.classList.add('pastel-pink');
    errorOverlay.classList.remove('show');
    container.classList.add('hidden');
    letterText.innerHTML = `
        <p>Kính gửi người yêu em - Mai Cao Đạt,</p>
        <p>Em là Phương Anh nè hehehehehe, <br>Mặc dù là mình mới chính thức với nhau chỉ mới có 1 ngày thoi ...</p>
        <Em>Nhưng mà đây là lần đầu em nghiêm túc và có nhiều hy vọng vào 1 mối quan hệ nhiều tới vậy nên là dù không biết sẽ đi được bao xa, không biết đi được bao lâu nhưng em sẽ hết mình
        hết dạ và em sẽ all in vào anh, chỉ mong anh đối xử tốt vì cuộc sống của em nó tệ lắm, đôi lúc em sẽ có hơi vô tâm vì em chưa bao giờ yêu ai cả mong anh thông cảm nhá. 
        Em đòi anh phải nói trực tiếp với em là tại vì em mún biết anh có thật sự nghiêm túc với em không thoi 
        dù không như tưởng tượng nhưng mà em thích lắm lun í, thấy cười nhiều dị thoi chứ trong lòng em suy nghĩ nhiều lắm á chài, 
        lúc đó có ý định là sẽ không đồng ý xem phản ứng thế nào òi nhưng mà đây là lần thứ 3 anh nói thích em roài, 
        quá tam 3 bận nên em sẽ đối diện với cảm xúc của mình và em đồng ý òi ó :>> 
        Sến quá trời dị ta, muốn nói nhiều hơn lắm nhưng mà thấy sến quá à :>></Em>
        <h3>Em thấy thích anh hơi nhiều roài đó ... <br>Vậy anh có đồng ý làm người yêu của em hemmmm :333</h3>
    `;
    letterOverlay.classList.add('show');
    declineCount = 0;
}

function acceptLetter() {
    const letterText = document.getElementById('letterText');
    const buttonGroup = document.querySelector('.button-group');
    const congratsMessage = document.getElementById('congratsMessage');
    const letterContent = document.querySelector('.letter-content');
    
    letterText.style.display = 'none';
    buttonGroup.style.display = 'none';
    letterContent.querySelector('h2').style.display = 'none';
    congratsMessage.style.display = 'block';
    
    // Trigger fireworks
    const fireworks = document.getElementById('fireworks');
    fireworks.classList.add('active');
    showCongratsMessage();
}

function declineLetter() {
    declineCount++;
    const buttonGroup = document.querySelector('.button-group');
    const acceptButton = document.querySelector('.button-group button.accept');
    const declineButton = document.querySelector('.button-group button.decline');
    
    if (declineCount > 3) {
        // Both buttons become "Đồng ý"
        acceptButton.innerText = 'Đồng ý';
        declineButton.innerText = 'Đồng ý';
        declineButton.className = 'accept';
        declineButton.onclick = acceptLetter;
    } else {
        // Continuously swap button positions
        buttonGroup.appendChild(declineButton); // Move decline to end
        buttonGroup.appendChild(acceptButton); // Move accept to end (after decline)
    }
}

function closeLetter() {
    const letterOverlay = document.getElementById('letterOverlay');
    const container = document.querySelector('.container');
    const buttonGroup = document.querySelector('.button-group');
    const congratsMessage = document.getElementById('congratsMessage');
    const letterText = document.getElementById('letterText');
    const letterContent = document.querySelector('.letter-content');
    const acceptButton = document.querySelector('.button-group button.accept');
    let declineButton = document.querySelector('.button-group button.accept + button.accept') || 
                       document.querySelector('.button-group button.decline');

    document.body.classList.remove('pastel-pink');
    letterOverlay.classList.remove('show');
    container.classList.remove('hidden');
    document.getElementById('loveForm').reset();
    
    // Reset UI
    buttonGroup.style.display = 'flex';
    congratsMessage.style.display = 'none';
    letterText.style.display = 'block';
    letterContent.querySelector('h2').style.display = 'block';
    acceptButton.innerText = 'Đồng ý';
    if (declineButton) {
        declineButton.innerText = 'Không';
        declineButton.className = 'decline';
        declineButton.onclick = declineLetter;
    }
    declineCount = 0;
    
    // Reset button order
    buttonGroup.appendChild(acceptButton);
    if (declineButton) buttonGroup.appendChild(declineButton);
    
    // Remove fireworks
    const fireworks = document.getElementById('fireworks');
    fireworks.classList.remove('active');
}

let fireworksInstance;

function showCongratsMessage() {
    document.getElementById('congratsMessage').style.display = 'block';

    const container = document.getElementById('fireworks');

    if (!fireworksInstance) {
        fireworksInstance = new Fireworks.default(container, {
            hue: { min: 300, max: 340 }, // Màu hồng tím
            delay: { min: 15, max: 30 },
            rocketsPoint: 50,
            speed: 2,
            acceleration: 1.03,
            friction: 0.95,
            gravity: 1.2,
            particles: 120,
            trace: 3,
            explosion: 6,
            autoresize: true,
            brightness: { min: 60, max: 100 },
            lineWidth: { explosion: { min: 1, max: 2 }, trace: { min: 1, max: 2 } },
        });
    }

    fireworksInstance.start();
}