const StandingsView = (() => {
    function showStandings(show = true) {
        const standingsDiv = document.getElementById('standingsDiv');
        if (standingsDiv.style.visibility === 'visible' || !show) {
            standingsDiv.style.visibility = 'hidden';
            return;
        }

        const standingsContent = document.getElementById('standingsContent');
        standingsContent.innerHTML = placements.map((playerName, index) => {
            let placement = index + 1;
            if (document.getElementById('battleRoyaleToggle').checked) {
                placement += document.getElementById('numberOfPlayers').value - placements.length;
            }
            const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th';
            return `<p>${placement}${suffix}: ${playerName}</p>`;
        }).join('');

        document.getElementById('copyButton').onclick = () => {
            const resultMessage = placements.map((playerName, index) => {
                let placement = index + 1;
                if (document.getElementById('battleRoyaleToggle').checked) {
                    placement += document.getElementById('numberOfPlayers').value - placements.length;
                }
                const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th';
                return `${placement}${suffix}: ${playerName}`;
            }).join('\n');

            navigator.clipboard.writeText(`Standings\n${resultMessage}`)
                .catch((error) => {
                    console.error('Failed to copy: ', error);
                    showError('Failed to copy');
                });
        };

        document.getElementById('closeButton').onclick = () => {
            standingsDiv.style.visibility = 'hidden';
        };
        standingsDiv.style.visibility = 'visible';
    }

    return { showStandings };
})();

const showStandings = StandingsView.showStandings;

if (typeof window !== 'undefined') {
    window.StandingsView = StandingsView;
    window.showStandings = showStandings;
}
