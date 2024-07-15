// Add an event listener to the file input element to handle image uploads
document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (!file) return; // If no file is selected, exit the function

    const reader = new FileReader(); // Create a FileReader to read the file
    reader.onload = function(e) {
        const img = new Image(); 
        img.onload = function() {
            const canvas = document.getElementById('image-canvas'); 
            const context = canvas.getContext('2d'); // Get the 2D drawing context of the canvas
            canvas.width = img.width; 
            canvas.height = img.height; 
            context.drawImage(img, 0, 0); 
            
            // Add a click event listener to the canvas to get the color at the clicked point
            canvas.addEventListener('click', function(event) {
                const x = event.offsetX; 
                const y = event.offsetY; 
                const imageData = context.getImageData(x, y, 1, 1).data; // Get the image data of the clicked point
                const rgb = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`; 
                addColorInfo(rgb); 
            });
        };
        img.src = e.target.result; 
    };
    reader.readAsDataURL(file);
});

// Function to add color information to the list
function addColorInfo(rgb) {
    const colorInfo = document.getElementById('color-info'); 
    const colorItem = document.createElement('div'); 
    colorItem.className = 'color-item'; 

    const colorBox = document.createElement('div'); 
    colorBox.className = 'color-box'; 
    colorBox.style.backgroundColor = rgb; 

    const colorText = document.createElement('div'); 
    colorText.innerText = rgb; 

    colorItem.appendChild(colorBox); // Add the color box to the color item
    colorItem.appendChild(colorText); // Add the color text to the color item
    colorInfo.appendChild(colorItem); // Add the color item to the color info div
}
