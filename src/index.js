
import './style.css';

// For Node.js DB logic (albumModel.js)
let createAlbum, reorderAlbum, addPhoto, removePhoto;
try {
    ({ createAlbum, reorderAlbum } = require('./albumModel.js'));
    ({ addPhoto, removePhoto } = require('./photoModel.js'));
} catch (e) {
    // In browser, DB logic not available
}

// UI: Album creation form
const app = document.querySelector('#app');
app.innerHTML = `
    <h1>Photo Album Organizer</h1>
    <form id="albumForm">
        <input type="text" id="albumName" placeholder="Album Name" required />
        <input type="date" id="albumDate" required />
        <button type="submit">Create Album</button>
    </form>
    <div id="albums"></div>
`;

const albumForm = document.getElementById('albumForm');
const albumsDiv = document.getElementById('albums');

albumForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('albumName').value;
    const date = document.getElementById('albumDate').value;
    // For MVP, order is always 1 (could be improved)
    let album;
    if (createAlbum) {
        album = createAlbum(name, date, 1);
        // Show album in UI
        const div = document.createElement('div');
        div.textContent = `Created: ${album.name} (${album.date})`;
        div.setAttribute('draggable', 'true');
        div.dataset.albumId = album.id;
        div.addEventListener('dragstart', (ev) => {
            ev.dataTransfer.setData('albumId', album.id);
        });
        // Add photo form under album
        const photoForm = document.createElement('form');
        photoForm.innerHTML = `
          <input type="text" placeholder="Photo Path" required />
          <input type="text" placeholder="Thumbnail Path" required />
          <input type="date" required />
          <button type="submit">Add Photo</button>
        `;
        photoForm.addEventListener('submit', (pe) => {
            pe.preventDefault();
            const file_path = photoForm.children[0].value;
            const thumbnail_path = photoForm.children[1].value;
            const created_at = photoForm.children[2].value;
            let photo;
            if (addPhoto) {
                photo = addPhoto(album.id, file_path, thumbnail_path, created_at);
                alert(`Photo added: ${photo.file_path}`);
            } else {
                alert(`Photo added: ${file_path}`);
                photo = { id: Date.now(), file_path };
            }
            // Add remove button for photo
            const photoDiv = document.createElement('div');
            photoDiv.textContent = `Photo: ${photo.file_path}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = () => {
                if (removePhoto && photo.id) {
                    const success = removePhoto(photo.id);
                    if (success) {
                        photoDiv.remove();
                        alert('Photo removed');
                    } else {
                        alert('Failed to remove photo');
                    }
                } else {
                    photoDiv.remove();
                    alert('Photo removed (UI only)');
                }
            };
            photoDiv.appendChild(removeBtn);
            div.appendChild(photoDiv);
            photoForm.reset();
        });
        div.appendChild(photoForm);
        albumsDiv.appendChild(div);
    } else {
        // Browser fallback: just show in UI
        const div = document.createElement('div');
        div.textContent = `Created: ${name} (${date})`;
        div.setAttribute('draggable', 'true');
        albumsDiv.appendChild(div);
    }
    albumForm.reset();
});

// Drag-and-drop reordering logic
let draggedDiv = null;
albumsDiv.addEventListener('dragstart', (e) => {
    draggedDiv = e.target;
});
albumsDiv.addEventListener('dragover', (e) => {
    e.preventDefault();
});
albumsDiv.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedDiv && e.target !== draggedDiv && e.target.parentNode === albumsDiv) {
        albumsDiv.insertBefore(draggedDiv, e.target.nextSibling);
        // Update order in DB if possible
        if (reorderAlbum && draggedDiv.dataset.albumId) {
            const newOrder = Array.from(albumsDiv.children).indexOf(draggedDiv) + 1;
            reorderAlbum(Number(draggedDiv.dataset.albumId), newOrder);
        }
    }
    draggedDiv = null;
});
