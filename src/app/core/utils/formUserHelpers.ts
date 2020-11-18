// Validators
import * as Yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const customYupCpfValidator = () => Yup.addMethod(Yup.mixed, 'CPF', function(_errorAttributes) {
  return this.test('validateCPF', 'CPF inválido', function(value) {
  const { path, createError } = this;
  if (value === undefined || value === null) {
    return;
  }
  let cleanCpf = value.split('.').join('');
  cleanCpf = cleanCpf.split('-').join('');
  if (!cpf.isValid(cleanCpf)) {
    return createError({ path, message: 'CPF inválido' });
  }
  return cpf.isValid(cleanCpf);
});
});

export const customYupCnpjValidator = () => Yup.addMethod(Yup.mixed, 'CNPJ', function(_errorAttributes) {
    return this.test('validateCPF', 'CNPJ inválido', function(value) {
    const { path, createError } = this;
    if (value === undefined || value === null) {
      return;
    }
    let cleanCnpj = value.split('.').join('');
    cleanCnpj = cleanCnpj.split('-').join('');
    cleanCnpj = cleanCnpj.split('/').join('');
    if (!cnpj.isValid(cleanCnpj)) {
      return createError({ path, message: 'CNPJ inválido' });
    }
    return cnpj.isValid(cleanCnpj);
  });
});

export const customYupCepValidator = () => Yup.addMethod(Yup.mixed, 'CEP', function(_errorAttributes) {
return this.test('validateCep', 'CEP inválido', function(value) {
  const { path, createError } = this;

  if (value === undefined || value === null) {
    return;
  }

  if (!validateCep(formatCep(value))) {
    return createError({ path, message: 'CEP inválido' });
  }
  return validateCep(formatCep(value));
})
});


export const customYupPhoneValidator = () => Yup.addMethod(Yup.mixed, 'phone', function(_errorAttributes) {
return this.test('validatePhone', 'Celular inválido', function(value) {
  const { path, createError } = this;
  if (value === undefined || value === null) {
    return;
  }

  if (!validatePhone(formatPhone(value))) {
    return createError({ path, message: 'Celular inválido' });
  }
  return validatePhone(formatPhone(value));
});
});

export function formatPhone(phone: string) {
  let newValue = "";

  Array.from(phone).forEach((_letter, index) => {
    if (index === 0) {
      newValue = newValue += "(";
    }
    if (index === 2) {
      newValue = newValue += ") ";
    }
    if (index === 7) {
      newValue = newValue += "-";
    }
    newValue = newValue += phone.substr(index, 1);
  });
  return newValue;
}

export function formatCep(cep: string) {
  let newValue = "";
  Array.from(cep).forEach((_letter, index) => {
    if (index === 5) {
      newValue = newValue += "-";
  }
    newValue = newValue += cep.substr(index, 1);
  });
  return newValue;
}

export function formatCpf(cpf: string) {

  let newValue = "";
  Array.from(cpf).forEach((_letter, index) => {
    if (index === 3) {
      newValue = newValue += ".";
    }
    if (index === 6) {
        newValue = newValue += ".";
    }
    if (index === 9) {
        newValue = newValue += "-";
    }
    newValue = newValue += cpf.substr(index, 1);
  });
  return newValue;
}

export function formatCnpj(cnpj: string) {

  let newValue = "";
    Array.from(cnpj).forEach((_letter, index) => {
      if (index === 2) {
        newValue = newValue += ".";
      }
      if (index === 6) {
          newValue = newValue += ".";
      }
      if (index === 10) {
          newValue = newValue += "/";
      }
      if (index === 15) {
        newValue = newValue += "-";
      }
      newValue = newValue += cnpj.substr(index, 1);
    });
    return newValue;
  }

export function validatePhone(value: string): boolean {
  const regex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
  return regex.test(value);
}

export function validateCep(value: string) {
  const regex = /\d{5}\-\d{3}$/;
  return regex.test(value);
}

export const userSchemaValidator = () => Yup.object().shape({
  name: Yup.string().required('O campo nome é necessário para realizar o registro'),
  email:  Yup.string().email('É necessário um email válido').required('O campo email é necessário para realizar o registro'),
  phone:  Yup.string().phone().required('O campo celular é necessário para realizar o registro'),
  password:  Yup.string().required('O campo senha é necessário para realizar o registro'),
  cpf:  Yup.string().CPF('CPF inválido').required('O campo é CPF necessário para realizar o registro'),
  cep:  Yup.string().CEP().required('O campo é CEP necessário para realizar o registro'),
  number:  Yup.string().required('O campo é número necessário para realizar o registro'),
  address:  Yup.string().required('O campo é endereço necessário para realizar o registro')
});

export const updateUserSchemaValidator = () => Yup.object().shape({
  name: Yup.string().required('O campo nome é necessário para realizar o registro'),
  email:  Yup.string().email('É necessário um email válido').required('O campo email é necessário para realizar o registro'),
  phone:  Yup.string().phone().required('O campo celular é necessário para realizar o registro'),
  password:  Yup.string(),
  cpf:  Yup.string().CPF('CPF inválido').required('O campo é CPF necessário para realizar o registro'),
  cep:  Yup.string().CEP().required('O campo é CEP necessário para realizar o registro'),
  number:  Yup.string(),//.required('O campo é número necessário para realizar o registro'),
  address:  Yup.string().required('O campo é endereço necessário para realizar o registro')
});

export const pharmacySchemaValidator = () => Yup.object().shape({
  fantasyName: Yup.string().required('O campo nome fantasia é necessário para realizar o registro'),
  email:  Yup.string().email('É necessário um email válido').required('O campo email é necessário para realizar o registro'),
  phone:  Yup.string().phone().required('O campo celular é necessário para realizar o registro'),
  password:  Yup.string().required('O campo senha é necessário para realizar o registro'),
  cnpj: Yup.string().CNPJ('CNPJ inválido').required('O campo é CNPJ necessário para realizar o registro'),
  pharmaceutical: Yup.string().required('O campo nome do farmacêutico é necessário para realizar o registro'),
  cep:  Yup.string().CEP().required('O campo é CEP necessário para realizar o registro'),
  number:  Yup.string().required('O campo é número necessário para realizar o registro'),
  address:  Yup.string().required('O campo é endereço necessário para realizar o registro'),
  latitude: Yup.string().required('É necessário selecionar a localização no mapa'),
  longitude: Yup.string().required('É necessário selecionar a localização no mapa')
});
