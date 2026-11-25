for (const gallery of document.querySelectorAll('.gallery')) {
    const controls = gallery.querySelector('.controls');
    const buttons = Array.from(controls.querySelectorAll('button[aria-controls]'));
    const photos = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
    if (photos.length < 2 || photos.some(photo => !gallery.contains(photo))) continue;

    function selectPhoto(index) {
        photos.forEach((photo, position) => {
            photo.hidden = position !== index;
            buttons[position].setAttribute('aria-pressed', String(position === index));
        });
    }

    buttons.forEach((button, index) => button.addEventListener('click', () => selectPhoto(index)));
    selectPhoto(0);
    controls.hidden = false;
    gallery.classList.add('enhanced');
}
