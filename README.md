## Desafio: CRUD de Usuário + JWT

### Descrição do projeto

 - Nível de dificuldade: Intermediário
 - Esse desafio é bem parecido com aquele CRUD de usuário mas com alguns adicionais, deixando mais interessante o projeto.

### Cadastro de usuário (Sign up)

 - Este endpoint deverá receber um usuário com os seguintes campos: nome, email, senha e uma lista de objetos telefone. Seguem os modelos:

```
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phones": [
    {
      "number": "string",
      "ddd": "string"
    }
  ]
}
```

 - Usar status codes de acordo
 - Em caso de sucesso irá retornar um usuário mais os campos:
 - id: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante se fosse um GUID)
 - data_criacao: data da criação do usuário
 - data_atualizacao: data da última atualização do usuário
 - ultimo_login: data do último login (no caso da criação, será a mesma que a criação)
 - token: token de acesso da API (pode ser um GUID ou um JWT)
 - Caso o e -mail já exista, deverá retornar erro com a mensagem "E -mail já existente".
 - O token deverá ser persistido junto com o usuário 

### Login (Sign in)

 - Este endpoint irá receber um objeto com e -mail e senha.
 - Caso o e -mail exista e a senha seja a mesma que a senha persistida, retornar igual ao endpoint de Sign Up.
 - Caso o e -mail não exista, retornar erro com status apropriado mais a mensagem "Usuário e/ou senha inválidos"
 - Caso o e -mail exista mas a senha não bata, retornar o status apropriado 401 mais a mensagem "Usuário e/ou senha inválidos" 

### Buscar usuário

 - Chamadas para este endpoint devem conter um header na requisição de Authentication com o valor "Bearer {token}" onde {token} é o valor do token passado na criação ou sign in de um usuário.
 - Caso o token não exista, retornar erro com status apropriado com a mensagem "Não autorizado".
 - Caso o token exista, buscar o usuário pelo user_id passado no path e comparar se o token no modelo é igual ao token passado no header.
 - Caso não seja o mesmo token, retornar erro com status apropriado e mensagem "Não autorizado"
 - Caso seja o mesmo token, verificar se o último login foi a MENOS que 30 minutos atrás.
 - Caso não seja a MENOS que 30 minutos atrás, retornar erro com status apropriado com mensagem "Sessão inválida".
 - Caso tudo esteja ok, retornar o usuário.

### Requisitos

 - Persitência de dados
 - Sistema de build gestão de dependências via gerenciador de pacotes
 - Utilizar um task runner para realização de build
 - Padronização de estilo de código em tempo de build  - sugestão: jsHint/jsLint
 - API: Express, Hapi ou similares.

### Requisitos desejáveis

 - JWT como token
 - Testes unitários
 - Criptogafia não reversível (hash) na senha e no token

### Submissao

 - Coloque o desafio no seu GitHub.
 - As URLs devem ser colocadas junto ao projeto em um arquivo .md ou em um swagger.