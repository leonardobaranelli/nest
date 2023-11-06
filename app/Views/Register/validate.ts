import { Register } from "../../shared/userTypes";

export const validate = (values: Register) => {
    const errors: { [key: string]: string } = {};
  
    if (!values.email) {
      errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email es inválido";
    }
      
    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
  };