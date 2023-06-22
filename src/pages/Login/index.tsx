import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

const schema = yup
  .object({
    email: yup.string().email("E-mail invalido").required("Campo obrigatorio"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiuscula')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um numero')
      .required("Campo obrigatorio"),
      nome: yup.string().required("Campo Obrigatorio"),
      telefone: yup.number().required(),
      CEP: yup.number(),
      CPF: yup.number()
  })
  .required();

const Login = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  interface Teste{
    cpf: string;
  }

  function validarCPF(cpf:Teste) {
   const cpfValue = cpf.cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cpfValue.length !== 11 || /^(\d)\1{10}$/.test(cpfValue)) {
      return false;
    }
  
    let sum = 0;
    let remainder;
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfValue.substring(i - 1, i)) * (11 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpfValue.substring(9, 10))) {
      return false;
    }
  
    sum = 0;
  
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfValue.substring(i - 1, i)) * (12 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpfValue.substring(10, 11))) {
      return false;
    }
  
    return true;
  }
  

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <label htmlFor="cpf">Nom completo:</label> 
          <Input
            id="cpf"
            name="nome"
            placeholder="Nome completo"
            control={control}
            errorMessage={errors?.nome?.message}
          />
          <Spacing />
          <label htmlFor="telefone">Telefone:</label> 
          <Input
            id="telefone"
            name="telefone"
            placeholder="(11) 96123-4567"
            control={control}
            errorMessage={errors?.telefone?.message}
          />
           <Spacing />
           <label htmlFor="CPF">CPF:</label> 
          <Input
            name="CPF"
            id="CPF"
            placeholder="123.456.789-90"
            control={control}
            errorMessage={errors?.CPF?.message}
          />
           <Spacing />
           <label htmlFor="CEP">CEP:</label> 
          <Input
            id="CEP"
            name="CEP"
            placeholder="11 011-32"
            control={control}
            errorMessage={errors?.CEP?.message}
          />
          <Spacing />
          <label htmlFor="email">E-mail:</label> 
          <Input
            id="email"
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <label htmlFor="password">Senha:</label> 
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          <Button title="Entrar" />
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
