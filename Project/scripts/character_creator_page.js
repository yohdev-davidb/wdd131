document.addEventListener('DOMContentLoaded', () => {
    initializeFormNavigation();
    initializeAbilityScores();
    loadSavedCharacter();

    // Add form submit handler
    const form = document.getElementById('characterForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveCharacter();
    });
});

function initializeFormNavigation() {
    const form = document.getElementById('characterForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 1;

    // Navigate between steps
    function goToStep(step) {
        // Hide all steps
        steps.forEach(s => {
            s.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${step}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update progress indicators
        progressSteps.forEach((progressStep, index) => {
            if (index + 1 === step) {
                progressStep.classList.add('active');
                progressStep.classList.remove('completed');
            } else if (index + 1 < step) {
                progressStep.classList.add('completed');
                progressStep.classList.remove('active');
            } else {
                progressStep.classList.remove('active', 'completed');
            }
        });

        // Update current step
        currentStep = step;
    }

    function validateStep(step) {
        const stepElement = document.querySelector(`[data-step="${step}"]`);
        const requiredFields = stepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                clearError(field);
            }
        });

        return isValid;
    }

    // Event listeners for next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                goToStep(currentStep + 1);
                saveProgress();
            }
        });
    });

    // Event listeners for previous buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            goToStep(currentStep - 1);
        });
    });

    // Initialize first step
    goToStep(1);
}

function initializeAbilityScores() {
    const abilityInputs = document.querySelectorAll('.ability-input input');
    const rollButton = document.querySelector('.roll-abilities');

    function updateModifier(input) {
        const score = parseInt(input.value);
        const modifier = Math.floor((score - 10) / 2);
        const modifierDisplay = input.nextElementSibling;
        modifierDisplay.textContent = modifier >= 0 ? `+${modifier}` : modifier;
    }

    function rollAbilityScores() {
        abilityInputs.forEach(input => {
            // Roll 4d6, drop lowest
            const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
                .sort((a, b) => b - a)
                .slice(0, 3)
                .reduce((sum, roll) => sum + roll, 0);

            input.value = rolls;
            updateModifier(input);
        });
        saveProgress();
    }

    // Event listeners for ability score changes
    abilityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const value = parseInt(input.value);
            if (value < 3) input.value = 3;
            if (value > 20) input.value = 20;
            updateModifier(input);
            saveProgress();
        });

        // Initialize modifiers
        updateModifier(input);
    });

    // Roll button event listener
    if (rollButton) {
        rollButton.addEventListener('click', rollAbilityScores);
    }
}

function getFormData() {
    const form = document.getElementById('characterForm');
    const formData = new FormData(form);

    return {
        basics: {
            name: formData.get('charName'),
            race: formData.get('race'),
            class: formData.get('class'),
            level: formData.get('level'),
            alignment: formData.get('alignment')
        },
        abilities: {
            strength: formData.get('strength'),
            dexterity: formData.get('dexterity'),
            constitution: formData.get('constitution'),
            intelligence: formData.get('intelligence'),
            wisdom: formData.get('wisdom'),
            charisma: formData.get('charisma')
        },
        details: {
            background: formData.get('background'),
            appearance: formData.get('appearance'),
            personality: formData.get('personality'),
            ideals: formData.get('ideals'),
            bonds: formData.get('bonds'),
            flaws: formData.get('flaws')
        }
    };
}

function generateCharacterPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const formData = getFormData();

    // Set font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("D&D Character Sheet", 105, 20, { align: "center" });

    // Basic Information
    doc.setFontSize(16);
    doc.text("Basic Information", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${formData.basics.name}`, 20, 50);
    doc.text(`Race: ${formData.basics.race}`, 20, 60);
    doc.text(`Class: ${formData.basics.class}`, 20, 70);
    doc.text(`Level: ${formData.basics.level}`, 20, 80);
    doc.text(`Alignment: ${formData.basics.alignment}`, 20, 90);

    // Ability Scores
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Ability Scores", 20, 110);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Strength: ${formData.abilities.strength} (${getModifierString(formData.abilities.strength)})`, 20, 120);
    doc.text(`Dexterity: ${formData.abilities.dexterity} (${getModifierString(formData.abilities.dexterity)})`, 20, 130);
    doc.text(`Constitution: ${formData.abilities.constitution} (${getModifierString(formData.abilities.constitution)})`, 20, 140);
    doc.text(`Intelligence: ${formData.abilities.intelligence} (${getModifierString(formData.abilities.intelligence)})`, 20, 150);
    doc.text(`Wisdom: ${formData.abilities.wisdom} (${getModifierString(formData.abilities.wisdom)})`, 20, 160);
    doc.text(`Charisma: ${formData.abilities.charisma} (${getModifierString(formData.abilities.charisma)})`, 20, 170);

    // Character Details
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Character Details", 20, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Background Story", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const backgroundLines = doc.splitTextToSize(formData.details.background || '', 170);
    doc.text(backgroundLines, 20, 50);

    doc.setFont("helvetica", "bold");
    doc.text("Physical Appearance", 20, 90);
    doc.setFont("helvetica", "normal");
    const appearanceLines = doc.splitTextToSize(formData.details.appearance || '', 170);
    doc.text(appearanceLines, 20, 100);

    doc.setFont("helvetica", "bold");
    doc.text("Personality Traits", 20, 140);
    doc.setFont("helvetica", "normal");
    const personalityLines = doc.splitTextToSize(formData.details.personality || '', 170);
    doc.text(personalityLines, 20, 150);

    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.text("Ideals", 20, 20);
    doc.setFont("helvetica", "normal");
    const idealsLines = doc.splitTextToSize(formData.details.ideals || '', 170);
    doc.text(idealsLines, 20, 30);

    doc.setFont("helvetica", "bold");
    doc.text("Bonds", 20, 70);
    doc.setFont("helvetica", "normal");
    const bondsLines = doc.splitTextToSize(formData.details.bonds || '', 170);
    doc.text(bondsLines, 20, 80);

    doc.setFont("helvetica", "bold");
    doc.text("Flaws", 20, 120);
    doc.setFont("helvetica", "normal");
    const flawsLines = doc.splitTextToSize(formData.details.flaws || '', 170);
    doc.text(flawsLines, 20, 130);

    // Save the PDF
    const characterName = formData.basics.name.replace(/\s+/g, '_').toLowerCase();
    doc.save(`${characterName}_character_sheet.pdf`);
}

function saveProgress() {
    const data = getFormData();
    localStorage.setItem('characterProgress', JSON.stringify(data));
}

function loadSavedCharacter() {
    const savedData = localStorage.getItem('characterProgress');
    if (savedData) {
        const data = JSON.parse(savedData);
        // Populate basic info
        Object.entries(data.basics).forEach(([key, value]) => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) input.value = value;
        });

        // Populate abilities
        Object.entries(data.abilities).forEach(([key, value]) => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
                const event = new Event('change');
                input.dispatchEvent(event);
            }
        });

        // Populate details
        Object.entries(data.details).forEach(([key, value]) => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) input.value = value;
        });
    }
}

function saveCharacter() {
    const form = document.getElementById('characterForm');
    if (form.checkValidity()) {
        const data = getFormData();
        const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');

        const existingIndex = characters.findIndex(char => char.basics.name === data.basics.name);
        if (existingIndex !== -1) {
            if (confirm('A character with this name already exists. Do you want to update it?')) {
                characters[existingIndex] = data;
            } else {
                return;
            }
        } else {
            characters.push(data);
        }

        localStorage.setItem('savedCharacters', JSON.stringify(characters));

        // Generate and download PDF
        generateCharacterPDF();

        // Show success message
        showMessage('Character saved successfully!', 'success');

        // Optional: Redirect to character list or home page after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showMessage('Please fill in all required fields.', 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;

    const form = document.querySelector('.character-form');
    form.insertBefore(messageDiv, form.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');

    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');

    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function getModifierString(score) {
    const modifier = Math.floor((parseInt(score) - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : modifier.toString();
}