document.getElementById('registroForm').addEventListener('submit', function(event) {
    var form = this;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    
    // Validaciones adicionales
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var correo = document.getElementById('correo').value;
    var fechaNacInput = document.getElementById('fecha_nac').value;
    var fechaNac = new Date(fechaNacInput);
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNac.getFullYear();
    var mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    var emailValido = /\S+@\S+\.\S+/;
    var passwordValido = /^(?=.*\d)(?=.*[A-Z]).{6,18}$/;
  
    // Validar correo
    if (!emailValido.test(correo)) {
      document.getElementById('correo').classList.add('is-invalid');
      document.getElementById('correo').classList.remove('is-valid');
    } else {
      document.getElementById('correo').classList.remove('is-invalid');
      document.getElementById('correo').classList.add('is-valid');
    }
  
    // Validar contraseñas
    if (password !== password2) {
      document.getElementById('password2').classList.add('is-invalid');
      document.getElementById('password2').classList.remove('is-valid');
    } else {
      document.getElementById('password2').classList.remove('is-invalid');
      document.getElementById('password2').classList.add('is-valid');
    }
  
    if (!passwordValido.test(password)) {
      document.getElementById('password').classList.add('is-invalid');
      document.getElementById('password').classList.remove('is-valid');
      document.getElementById('password').nextElementSibling.textContent = "La contraseña debe tener al menos un número, una letra en mayúscula y estar entre 6 y 18 caracteres.";
    } else {
      document.getElementById('password').classList.remove('is-invalid');
      document.getElementById('password').classList.add('is-valid');
    }
  
    // Validar edad
    if (fechaNacInput === "" || edad < 13) {
      document.getElementById('fecha_nac').classList.add('is-invalid');
      document.getElementById('fecha_nac').classList.remove('is-valid');
      document.getElementById('fecha_nac').nextElementSibling.textContent = fechaNacInput === "" ? "La fecha de nacimiento es requerida." : "Debe ser mayor a 13 años.";
    } else {
      document.getElementById('fecha_nac').classList.remove('is-invalid');
      document.getElementById('fecha_nac').classList.add('is-valid');
    }
  });
  
  function limpiarFormulario() {
    document.getElementById('registroForm').reset();
    var elementos = document.querySelectorAll('.is-valid, .is-invalid');
    elementos.forEach(function(elemento) {
      elemento.classList.remove('is-valid');
      elemento.classList.remove('is-invalid');
    });
    document.getElementById('registroForm').classList.remove('was-validated');
  }