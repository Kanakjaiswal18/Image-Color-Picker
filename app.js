document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('image-canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            canvas.addEventListener('click', function(event) {
                const x = event.offsetX;
                const y = event.offsetY;
                const imageData = context.getImageData(x, y, 1, 1).data;
                const rgb = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
                addColorInfo(rgb);
            });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function addColorInfo(rgb) {
    const colorInfo = document.getElementById('color-info');
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';

    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = rgb;

    const colorText = document.createElement('div');
    colorText.innerText = rgb;

    colorItem.appendChild(colorBox);
    colorItem.appendChild(colorText);
    colorInfo.appendChild(colorItem);
}
