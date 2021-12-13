# COM222 - Trabalho Final

Neste trabalho cada grupo deverá implementar um sistema para cadastramento, avaliação e consulta
de vinhos, semelhante ao Vivino (www.vivino.com).

Para o cadastramento de vinhos, o Vivino utiliza um app que permite que o usuário tire uma foto do
rótulo dos vinhos que possui. Os vinhos são identificados de maneira automática pela foto do rótulo,
e o usuário pode ver as avaliações já existentes (se houver). Após consumir o vinho, o usuário pode
avaliá-lo, dando uma nota de 0 a 5, com intervalo decimal.

Como sua implementação não poderá contar com o apoio do app, o cadastramento dos vinhos deve
ser feito com o upload da imagem do rótulo da garrafa. O usuário deverá digitar o nome do produtor
(vinícola) e o nome do vinho. No processo de digitação, deve-se utilizar um mecanismo de sugestão
que mostra nomes similares já cadastrados. Isso é importante para evitar que um mesmo vinho seja
cadastrado em duplicidade. Note que esse mecanismo permite que cada usuário cadastre os rótulos
que possui. Assim, os rótulos cadastrados passam a fazer parte de uma lista individual de cada
usuário, chamada “Meus Vinhos”, sendo que um mesmo vinho pode constar em várias listas.

No sentido de simplificar a implementação, não será necessário digitar o ano do rótulo (safra). No
momento do cadastramento, deve-se informar:

- o país de origem;
- o tipo do vinho (tinto, branco, rosé, etc.);
- o tipo de uva (ou blend, se for uma mistura de uvas);
- a harmonização com comidas.

Note que, se já houver um vinho cadastrado, deve ser possível modificar essas informações ou
acrescentar novas, no caso da harmonização com comidas, por exemplo.

O cadastramento de novos vinhos só pode ser feito por usuários previamente cadastrados. O
cadastramento do usuário é feito utilizando seu email e uma senha.

Ao acessar o site, o usuário pode navegar sem fazer login. Neste caso, poderá apenas fazer consultas.
O mecanismo de consultas será detalhado adiante. Ao navegar sem login, deve aparecer em todas as
páginas opões para realizar Login e Sign up (cadastramento). No momento que o usuário faz login,
aparece seu nome no topo da tela e, ao lado, aparece o link “Meus Vinhos”. Ao clicar em Meus
Vinhos, o usuário vê os rótulos que cadastrou. Ao clicar em um rótulo, ele deve ver todas as
informações do vinho e deve também ser capaz de avaliá-lo, com uma nota de 0 a 5. Além disso,
opcionalmente, o usuário pode escrever uma avaliação (review) do vinho. A avaliação numérica e o
review, após serem submetidos, passam a aparecer para os demais usuários quando consultarem o
vinho avaliado.

## Consulta

O Vivino possui um mecanismo de consulta avançada quando se seleciona “Vinhos” e depois “Ver
todos os vinhos”. No trabalho o grupo deverá implementar um mecanismo de consulta similar a este.
Na página principal deve haver uma interface que permita a seleção do tipo de vinho, um slider, para
seleção do intervalo de preço, bem como check buttons que permitam a seleção das estrelas.
Utilizando check buttons é possível, por exemplo, checar 3, 4 e 5, trazendo vinhos a partir de 3
estrelas.
Conforme ilustra o site do Vivino, além desses três mecanismos de seleção, deve ser possível
selecionar vinhos por:

- região e/ou país;
- tipo do vinho;
- tipo de uva;
- harmonização com comidas.

A modificação dos parâmetros de consulta deve resultar na atualização da lista de vinhos exibida.
Qualquer dúvida em relação ao procedimento de consulta, vá direto ao site do Vivino e veja como é
feito lá. O que você deve fazer é um mecanismo de consulta o mais parecido possível – em termos de
funcionalidade – com o que é provido pelo Vivino.

## Reviews

Ao exibir um vinho, deve-se mostrar a média de suas avaliações (número de estrelas) e os seus
reviews, sendo que cada review deve ser identificado. Ao clicar no nome associado ao review, o site
deve ir para a página do revisor, a qual deve exibir todas as suas revisões, aparecendo primeiro as
mais recentes.

## Valores

Cadastramento: 3 pts
Consulas: 4 pts
Reviews: 3 pts

## Informações importantes:

- O sistema deve ser implementado por grupos de até 5 alunos.
- Deve-se usar a stack MEAN (Mongo, Express, Angular e Node). É permitido utilizar um banco
  relacional ao invés do Mongo.
- Implementações feitas em React, Vue ou qualquer outra tecnologia sofrerão penalidades na nota.
- O grupo deve fazer o deploy do projeto e fornecer uma URL para acesso ao mesmo. Para tanto, será
  necessário utilizar o Mongodb (ou outro banco) na nuvem.
- O código do projeto deve ser disponibilizado para a análise. Sugere-se usar o GitHub para facilitar
  o acesso ao código.
- A data de entrega é 15/12. Deve-se enviar um email contendo o link do GitHub ou do Drive, bem
  como a URL para acessar a aplicação online.