// Dropdown functionality
function toggleDropdown() {
  document.getElementById("dropdownMenu").parentElement.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#userDropdown')) {
    var dropdowns = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Make table rows hoverable
document.querySelectorAll('tbody tr').forEach(row => {
  row.addEventListener('mouseover', () => {
    row.style.backgroundColor = '#f9fafb';
  });
  row.addEventListener('mouseout', () => {
    row.style.backgroundColor = '';
  });
}); 