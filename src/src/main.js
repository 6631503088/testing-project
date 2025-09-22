
// Photo Album Organizer MVP
// - Albums are created and displayed
// - Albums can be reordered by drag-and-drop
// - Performance warning for >1000 albums

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Photo Album Organizer</h1>
    <form id="albumForm">
      <input type="text" id="albumName" placeholder="Album Name" required />
      <input type="date" id="albumDate" required />
      <button type="submit">Create Album</button>
    </form>
    <div id="albums"></div>
  </div>
`;


// Get form and albums container
const albumForm = document.getElementById('albumForm');
const albumsDiv = document.getElementById('albums');
let draggedDiv = null; // currently dragged album

// Handle album creation
albumForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('albumName').value;
  const date = document.getElementById('albumDate').value;

  // Create album element
  const div = document.createElement('div');
  div.className = 'album';
  div.textContent = `${name} (${date})`;
  div.setAttribute('draggable', 'true');
  div.dataset.date = date;
  div.dataset.name = name;


  // Add album to UI
  albumsDiv.appendChild(div);
  // Performance warning for large collections
  if (albumsDiv.children.length > 1000) {
    alert('Warning: More than 1000 albums may impact performance.');
  }

  // Drag and drop events for album reordering
  div.addEventListener('dragstart', () => {
    draggedDiv = div;
  });

  div.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  div.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedDiv && draggedDiv !== div) {
      albumsDiv.insertBefore(draggedDiv, div.nextSibling);
    }
    draggedDiv = null;
  });
});
