const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const photos = document.getElementById('photos');

// 1. Akses kamera pengguna
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// 2. Fungsi ambil gambar
snap.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Lukis gambar dari video ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Tukar ke format imej (Base64)
    const dataURL = canvas.toDataURL('image/png');
    
    // Paparkan di galeri
    const img = document.createElement('img');
    img.src = dataURL;
    img.className = "captured-img";
    photos.prepend(img);

    // Automatik muat turun (Sebab tiada database)
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `photo-${Date.now()}.png`;
    link.click();
});
