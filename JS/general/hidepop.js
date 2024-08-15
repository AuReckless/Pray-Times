document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('set');
    var closeButton = document.getElementById('closeButton');
    var openButton = document.getElementById('openButton');

    function closeModal() {
        modal.classList.add('hidden');
    }

    function openModal() {
        modal.classList.remove('hidden');
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (openButton) {
        openButton.addEventListener('click', openModal);
    }
});
