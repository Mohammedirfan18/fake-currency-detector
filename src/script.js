document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const uploadForm = document.getElementById('uploadForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        } else {
            previewContainer.classList.add('hidden');
        }
    });

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert('Please upload an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        loadingIndicator.classList.remove('hidden');
        resultContainer.classList.add('hidden');

        fetch('YOUR_BACKEND_API_ENDPOINT', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            loadingIndicator.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            resultText.textContent = "the currency is fake or real will be displayed";//no backend connected so temporary data
        })
        .catch(error => {
            loadingIndicator.classList.add('hidden');
            alert('An error occurred. Please try again.');
            console.error('Error:', error);
        });
    });
});
