export interface IFormLogin {
    email: string;
    password: string;
    nome: string;
    telefone: number | undefined;
    CEP: number | undefined;
    CPF: number | undefined;
}

export const defaultValues: IFormLogin = {
    email: '',
    password: '',
    nome: '',
    telefone: undefined,
    CEP: undefined,
    CPF: undefined
}