
## Regras de Negócio

### RN01: Tipos de Transação
- Descrição: Uma transação pode ser do tipo crédito ou débito, afetando o valor total da conta do usuário.
- Critérios de Aceitação:
  - [x] Transações do tipo crédito devem somar ao valor total da conta do usuário.
  - [x] Transações do tipo débito devem subtrair do valor total da conta do usuário.

### RN02: Identificação do Usuário
- Descrição: Deve ser possível identificar o usuário entre as requisições.
- Critérios de Aceitação:
  - [x] Todas as requisições relacionadas a transações devem incluir informações de identificação do usuário, como um token de autenticação.

### RN03: Restrição de Visualização de Transações
- Descrição: O usuário só pode visualizar transações que ele criou.
- Critérios de Aceitação:
  - [x] As transações só devem ser visíveis para o usuário que as criou.
  - [x] Outros usuários não devem ter acesso às transações de um usuário específico.

## Requisitos Funcionais

### RF01: Criação de Nova Transação
- Descrição: Permitir que o usuário crie uma nova transação.
- Critérios de Aceitação:
  - [x] O usuário deve fornecer os detalhes da transação, incluindo tipo (crédito ou débito), valor e descrição.
  - [x] Após a criação bem-sucedida, a transação deve ser registrada no sistema e afetar o saldo da conta do usuário.

### RF02: Obtenção de Resumo da Conta
- Descrição: Permitir que o usuário obtenha um resumo da sua conta.
- Critérios de Aceitação:
  - [x] O sistema deve calcular e exibir o saldo atual da conta do usuário.
  - [x] O resumo da conta deve incluir informações sobre transações recentes, como saldo anterior, transações realizadas e saldo atual.

### RF03: Listagem de Todas as Transações
- Descrição: Permitir que o usuário liste todas as transações que já ocorreram.
- Critérios de Aceitação:
  - [x] O sistema deve listar todas as transações realizadas pelo usuário, incluindo detalhes como tipo, valor e data.
  - [x] As transações devem ser apresentadas em ordem cronológica reversa, com as mais recentes no topo da lista.

### RF04: Visualização de Transação Única
- Descrição: Permitir que o usuário visualize uma transação específica.
- Critérios de Aceitação:
  - [x] O usuário deve poder visualizar os detalhes completos de uma transação específica, incluindo tipo, valor, descrição e data.
  - [x] A transação visualizada deve ser uma transação criada pelo próprio usuário.

