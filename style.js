const BOT_TOKEN = "8765397823:AAG5pg9Fxxo3rjFyFQKZyyA2SU-II5Y2zk0";
const CHAT_ID = "6660879147";

document.getElementById('tg-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = "Yuborilmoqda...";
    submitBtn.disabled = true;

    // Barcha ma'lumotlarni yig'ish
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;
    const siteType = document.getElementById('site-type').value;
    const budget = document.getElementById('budget').value;
    const reference = document.getElementById('reference').value || "Ko'rsatilmagan";
    const message = document.getElementById('message').value || "Kiritilmagan";

    // Belgilangan checkboxlarni yig'ish
    const checkboxes = document.querySelectorAll('.service-check:checked');
    const servicesArray = Array.from(checkboxes).map(cb => cb.value);
    const services = servicesArray.length > 0 ? servicesArray.join(', ') : "Tanlanmadi";

    // Telegram uchun formatlangan xabar
    const telegramMessage = `
🔔 **YANGI BUYURTMA KELDI!**
    
👤 **Mijoz:** ${firstname} ${lastname}
📞 **Telefon:** ${phone}

💻 **Sayt turi:** ${siteType}
💰 **Budjet:** ${budget}
🛠 **Qo'shimcha:** ${services}
🔗 **Namuna:** ${reference}

📝 **Izoh:** ${message}
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('form-wrapper').classList.add('hidden');
            document.getElementById('success-wrapper').classList.remove('hidden');
        } else {
            alert('Xatolik yuz berdi! Qaytadan urinib ko\'ring.');
            resetBtnState();
        }
    })
    .catch(error => {
        console.error('Xatolik:', error);
        alert('Tarmoq xatoligi! Internetni tekshiring.');
        resetBtnState();
    });
});

function resetBtnState() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = "Yuborish";
    submitBtn.disabled = false;
}

function resetForm() {
    document.getElementById('tg-form').reset();
    document.getElementById('success-wrapper').classList.add('hidden');
    document.getElementById('form-wrapper').classList.remove('hidden');
    resetBtnState();
}