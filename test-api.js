fetch('http://localhost:3000/api/admin/complaints')
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
