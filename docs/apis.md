# Especificação de APIs

> A especificação de APIs descreve os principais endpoints da API RESTful do produto
> de software, os métodos HTTP associados a cada endpoint, suas descrições, os formatos
> de respostas, os parâmetros de URL esperados e o mecanismo de autenticação e autorização 
> utilizado.

<!--
| Endpoint                             | Método | Descrição                                      | Parâmetros                        | Formato da Resposta | Autenticação e Autorização |
|--------------------------------------|--------|------------------------------------------------|-----------------------------------|---------------------|----------------------------|
| /api/users/{user_id}/tasks/          | GET    | Obter todas as tarefas cadastradas             | user_id (string)                  | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | POST   | Criar uma nova tarefa                          | user_id (string) task_id (string) | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | GET    | Obter detalhes de uma tarefa específica        | user_id (string) task_id (string) | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | PUT    | Atualizar os detalhes de uma tarefa específica | user_id (string) task_id (string) | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | DELETE | Excluir uma tarefa específica                  | user_id (string) task_id (string) | JSON                | JWT Token                  |

-->


| Endpoint                     | Método | Descrição                                      | Parâmetros           | Formato da Resposta | Autenticação e Autorização |
|------------------------------|--------|------------------------------------------------|----------------------|---------------------|----------------------------|
| GET/api/Alimentacoes         | GET    | Obter todas as alimentações registradas.       | Sem parâmetros       | JSON                | JWT Token                  |
| POST/api/Alimentacoes        | POST   | Registrar uma alimentação.                     | Sem parâmetros       | JSON                | JWT Token                  |
| GET/api/Alimentacoes/{id}    | GET    | Obter detalhes de uma alimentação específica.  | alimentação_id (int) | JSON                | JWT Token                  |
| PUT/api/Alimentacoes/{id}    | PUT    | Atualizar os detalhes de uma alimentação.      | alimentação_id (int) | JSON                | JWT Token                  |
| DELETE/api/Alimentacoes/{id} | DELETE | Apagar o registro de uma alimentação.          | alimentação_id (int) | JSON                | JWT Token                  |
|                                                                                                                                                                  |
| GET/api/Cachorros            | GET    | Obter todos os cachorros cadastrados.          | Sem parâmetros       | JSON                | JWT Token                  |
| POST/api/Cachorros           | POST   | Cadastrar um novo cachorro.                    | Sem parâmetros       | JSON                | JWT Token                  |
| GET/api/Cachorros/{id}       | GET    | Obter detalhes do cadastrado de um cachorro.   | cachorro_id          | JSON                | JWT Token                  |
| PUT/api/Cachorros/{id}       | PUT    | Atualizar os dados de cadastro de um cachorro. | cachorro_id          | JSON                | JWT Token                  |
| DELETE/api/Cachorros/{id}    | DELETE | Excluir um cachorro do cadastro.               | cachorro_id          | JSON                | JWT Token                  |
|                                                                                                                                                                  |
| GET/api/Usuarios             | GET    | Obter todos os usuários cadastrados.           | Sem parâmetros       | JSON                | JWT Token                  |
| POST/api/Usuarios            | POST   | Cadastrar um novo usuário.                     | Sem parâmetros       | JSON                | JWT Token                  |
| GET/api/Usuarios/{id}        | GET    | Obter detalhes do cadastrado de um usuário.    | usuario_id           | JSON                | JWT Token                  |
| PUT/api/Usuarios/{id}        | PUT    | Atualizar os dados de cadastro de um usuário.  | usuario_id           | JSON                | JWT Token                  |
| DELETE/api/Usuarios/{id}     | DELETE | Excluir um usuário do cadastro.                | usuario_id           | JSON                | JWT Token                  |


[Retorna](../README.md)
