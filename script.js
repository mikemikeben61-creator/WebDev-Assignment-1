const form = document.getElementById('regform');
const inputs = document.querySelectorAll('#regform input, #regform select, #regform textarea');
const successMsg = document.getElementById('successMsg');
const memberList = document.getElementById('memberList');
const memberCounter = document.getElementById('count');
const darkModeBtn = document.getElementById('theme');
const emptyNote = document.getElementById('emptyNote');

console.log('DOM Elements Found:', {
    form,
    inputs,
    successMsg,
    memberList,
    memberCounter,
    darkModeBtn,
    emptyNote
});

let memberCount = 0;

function getErrorElement(input) {
    if (input.id === 'confirm-password') {
        return document.getElementById('confirmError');
    }
    return document.getElementById(input.id + 'Error');
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const errorEl = getErrorElement(input);
        if (input.value.trim() && errorEl) {
            errorEl.textContent = '';
            input.classList.remove('error-input');
        }
    });
    input.addEventListener('change', () => {
        const errorEl = getErrorElement(input);
        if (input.value.trim() && errorEl) {
            errorEl.textContent = '';
            input.classList.remove('error-input');
        }
    });
});

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page reload

    let isValid = true;

    inputs.forEach(input => {
        const errorEl = getErrorElement(input);
        if (!input.value.trim()) {
            isValid = false;
            if (errorEl) {
                errorEl.textContent = 'This field cannot be blank.';
            }
            input.classList.add('error-input');
        } else {
            if (errorEl) {
                errorEl.textContent = '';
            }
            input.classList.remove('error-input');
        }
    });

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const confirmError = document.getElementById('confirmError');
    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        isValid = false;
        confirmError.textContent = 'Passwords do not match.';
        confirmPassword.classList.add('error-input');
    }

    if (isValid) {
    
        const nameVal = document.getElementById('name').value;
        const emailVal = document.getElementById('email').value;

        
        if (emptyNote) {
            emptyNote.style.display = 'none';
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${nameVal}</strong> (${emailVal})</span>
            <button type="button" class="remove-btn">Remove</button>
        `;

    
        const removeBtn = li.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            li.remove();
            memberCount--;
            memberCounter.textContent = memberCount;
            
        
            if (memberCount === 0 && emptyNote) {
                emptyNote.style.display = 'block';
            }
        });

        memberList.appendChild(li);

    
        memberCount++;
        memberCounter.textContent = memberCount;

    
        successMsg.textContent = 'Member registered successfully!';
        successMsg.classList.remove('hidden');
        form.reset();

    
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 3000);
    }
});


darkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});


