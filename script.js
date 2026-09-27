const slider = document.getElementById('customSlider');

// Atualiza a cor dinâmica da barra ao deslizar
function updateSliderTrack() {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #ffffff ${value}%, #1c1c1f ${value}%)`;

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

// Inicializa a cor da barra ao carregar
updateSliderTrack();

// Permite alterar o valor a partir do Lua
window.addEventListener('message', function(event) {
    if (event.data.action === "setValue") {
        slider.value = event.data.value;
        updateSliderTrack();
    }
});
