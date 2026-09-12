const ControlPanel = (() => {
    function toggleControls(visible) {
        const controlsDiv = document.querySelector('.controls');
        if (controlsDiv) {
            controlsDiv.style.display = visible ? 'flex' : 'none';
        }
    }

    function showBattleControls(isTrue) {
        const control = isTrue ? 'none' : 'flex';
        const battle = isTrue ? 'flex' : 'none';
        document.getElementById('playerListButton').style.display = control;
        document.getElementById('startButton').style.display = control;
        document.getElementById('nextButton').style.display = battle;
        document.getElementById('saveButton').style.display = control;
        document.getElementById('loadButton').style.display = control;
        document.getElementById('battleSection').style.display = control;
        document.getElementById('recordSection').style.display = control;
        document.getElementById('sportSection').style.display = control;
        document.getElementById('playerNumberSection').style.display = control;
    }

    function showError(message, duration = 3000) {
        const errorPopup = document.getElementById('errorPopup');
        errorPopup.textContent = message;
        errorPopup.style.display = 'block';
        errorPopup.style.opacity = '1';

        setTimeout(() => {
            errorPopup.style.opacity = '0';
            setTimeout(() => {
                errorPopup.style.display = 'none';
            }, 500);
        }, duration);
    }

    function inputCheck(input) {
        if (parseInt(input.value) <= 0) {
            input.value = '1';
        } else if (!input.value) {
            input.style.backgroundColor = 'red';
            return;
        }
        input.style.backgroundColor = '';
    }

    function adjustToggles() {
        const battleLabel = document.querySelector('label[for="battleRoyaleToggle"]');
        const recordLabel = document.querySelector('label[for="recordToggle"]');
        const battleText = battleLabel.textContent.trim();
        const recordText = recordLabel.textContent.trim();

        if (recordText.length < battleText.length) {
            const diff = battleText.length - recordText.length;
            recordLabel.innerHTML = recordText + '&nbsp;'.repeat(diff);
        }
    }

    return {
        toggleControls,
        showBattleControls,
        showError,
        inputCheck,
        adjustToggles
    };
})();

const toggleControls = ControlPanel.toggleControls;
const showBattleControls = ControlPanel.showBattleControls;
const showError = ControlPanel.showError;
const inputCheck = ControlPanel.inputCheck;
const adjustToggles = ControlPanel.adjustToggles;

if (typeof window !== 'undefined') {
    window.ControlPanel = ControlPanel;
    window.toggleControls = toggleControls;
    window.showBattleControls = showBattleControls;
    window.showError = showError;
    window.inputCheck = inputCheck;
    window.adjustToggles = adjustToggles;
}
