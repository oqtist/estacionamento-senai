||||||||||||||| Projeto Estacionamento SENAI - 2025 |||||||||||||||

Este documento detalha como utilizar o projeto providenciado.

Este projeto em sua forma original utiliza Sequelize e, consequentemente, PostgreSQL para seu banco de dados e o serviço Supabase para hospedamento do mesmo. Também utiliza o serviço Render para hospedamento da API necessária para sua operação. A API está inclusa para o caso do usuário final decidir hospedar por outros meios ou desejar modificá-la. Para isso, todas as referências ao site 'Render' devem ser removidas e substituidas pela nova implementação.

Antes de proceder com a inicialização, tenha certeza de incluir as variáveis de ambiente no arquivo .env, no diretório '/Backend' do projeto.
O usuário também deve ter certeza de que os módulos necessários para a execução do projeto estejam presentes. (Utilizando 'npm i' nos diretórios raízes dos Front e Backends).

Para inicialização do projeto em ambiente de desenvolvimento, o usuário deve:
    - Navegar para a pasta do projeto e então para 'Frontend'
    - Abrir o terminal do sistema operacional.
    - Executar o comando 'npm run dev'

Para inicialização do projeto, o usuário deve:
    - Navegar para a pasta do projeto e então para 'Frontend'
    - Abrir o terminal do sistema operacional.
    - Executar o comando 'npx vite'

Em ambos os casos, o usuário pode acessar a interface do projeto através do endereço local 'localhost:5173'.


Para inicialização e utilização local da API e, por sua vez, do banco de dados do projeto, o usuário deve:
    - Navegar para a pasta do projeto e então para 'Backend'
    - Abrir o terminal do sistema operacional.
    - Executar o comando 'node .\app.js'