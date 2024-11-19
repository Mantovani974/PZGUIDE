const mapContainer = document.getElementById('map-container');
const mapImage = document.getElementById('map-image');

// Variáveis de controle
let scale = 1; // Escala inicial
let translateX = 0; // Posição horizontal inicial
let translateY = 0; // Posição vertical inicial
let isDragging = false; // Indica se a imagem está sendo arrastada
let startX, startY; // Posição inicial do cursor ao clicar

// Zoom com scroll do mouse
mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const delta = e.deltaY < 0 ? zoomFactor : -zoomFactor;
    scale = Math.min(10, Math.max(1, scale + delta)); // Limita o zoom entre 1x e 3x
    updateTransform();
});

// Arrastar a imagem
mapImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    mapImage.style.cursor = 'grabbing';
});

mapContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    // Limitar a movimentação para não ultrapassar os limites
    const bounds = mapContainer.getBoundingClientRect();
    const imgBounds = mapImage.getBoundingClientRect();

    const maxX = (imgBounds.width - bounds.width) / 2;
    const maxY = (imgBounds.height - bounds.height) / 2;

    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

    updateTransform();
});

mapContainer.addEventListener('mouseup', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

mapContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

// Atualizar a transformação da imagem
function updateTransform() {
    mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}
