const SerializeForm = (form) => {
  const formData = new FormData(form);

  const completar_Objeto = {};
  for (let [name, value] of formData) {
    completar_Objeto[name] = value;
  }

  return completar_Objeto;
};

export default SerializeForm;
