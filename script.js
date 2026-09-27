const slider = document.getElementById('customSlider');

function updateSliderTrack() {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    // Preenche de PRETO da esquerda para a direita
    slider.style.background = `linear-gradient(to right, #000000 ${value}%, #222224 ${value}%)`;

    // Envia o valor em tempo real para o script .lua do FiveM
    if (window.GetParentResourceName) {
        fetch(`https://${GetParentResourceName()}/sliderUpdate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ value: parseInt(slider.value) })
        });
    }
}

slider.addEventListener('input', updateSliderTrack);

// Inicializa no carregamento
updateSliderTrack();

// Ouvinte para receber valor do Lua
window.addEventListener('message', function(event) {
    if (event.data.action === "setValue") {
        slider.value = event.data.value;
        updateSliderTrack();
    }
});
