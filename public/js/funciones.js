document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('registroForm');

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      var nombre = document.getElementById('name');
      var usuario = document.getElementById('usuario');
      var correo = document.getElementById('correo');
      var password = document.getElementById('password');
      var password2 = document.getElementById('password2');
      var fechaNac = document.getElementById('fecha_nac');
      
      var emailValido = /\S+@\S+\.\S+/;
      var passwordValido = /^(?=.*\d)(?=.*[A-Z]).{6,18}$/;
      
      var hoy = new Date();
      var fechaNacimiento = new Date(fechaNac.value);
      var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      var mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
          edad--;
      }
      
      if (!nombre.value) {
          nombre.classList.add('is-invalid');
      } else {
          nombre.classList.remove('is-invalid');
          nombre.classList.add('is-valid');
      }

      if (!usuario.value) {
          usuario.classList.add('is-invalid');
      } else {
          usuario.classList.remove('is-invalid');
          usuario.classList.add('is-valid');
      }

      if (!correo.value || !emailValido.test(correo.value)) {
          correo.classList.add('is-invalid');
      } else {
          correo.classList.remove('is-invalid');
          correo.classList.add('is-valid');
      }

      if (!password.value || !passwordValido.test(password.value)) {
          password.classList.add('is-invalid');
          password.nextElementSibling.textContent = "La contraseña debe tener al menos un número, una letra en mayúscula y estar entre 6 y 18 caracteres.";
      } else {
          password.classList.remove('is-invalid');
          password.classList.add('is-valid');
      }

      if (!password2.value) {
          password2.classList.add('is-invalid');
          password2.nextElementSibling.textContent = "Repetir la contraseña es requerido.";
      } else if (password.value !== password2.value) {
          password2.classList.add('is-invalid');
          password2.nextElementSibling.textContent = "Las contraseñas deben ser iguales.";
      } else {
          password2.classList.remove('is-invalid');
          password2.classList.add('is-valid');
      }

      if (!fechaNac.value || edad < 13) {
          fechaNac.classList.add('is-invalid');
          fechaNac.nextElementSibling.textContent = fechaNac.value === "" ? "La fecha de nacimiento es requerida." : "Debe ser mayor o igual a 13 años.";
      } else {
          fechaNac.classList.remove('is-invalid');
          fechaNac.classList.add('is-valid');
      }

      if (document.querySelectorAll('.is-invalid').length === 0) {
          form.submit();
      }
  });

  document.getElementById('resetButton').addEventListener('click', function() {
      limpiarFormulario();
  });

  function limpiarFormulario() {
      form.reset();
      var elementos = document.querySelectorAll('.is-invalid, .is-valid');
      elementos.forEach(function(elemento) {
          elemento.classList.remove('is-invalid', 'is-valid');
      });
  }
});
