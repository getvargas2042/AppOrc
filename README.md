# AppOrc

Classe Despesa com o constructor() recebendo os atributos dos campos, após isso é implementado o método validarDados(), o qual
	através de um for irá percorrer todos os atributos da classe, utilizamos o 'in' para recuperar esse atributos e o colocamos
	"dentro" da variável i, com isso o 'this[i]' irá percorrer cada atributo juntamente com seus valores atribuídos ao preencher
	o form, caso algum campo, esteja vazio ou null ou undefined, irá retornar falso

Classe BancoDeDados com o constructor() verificando se existe um ID recuperando-o no localStorage, caso não exista, atribui o valor 0
Classe BancoDeDados com o método getProximoId() também verificando se existe um ID e o recuperando no localStorage, como existe e é 0
	por conta do constructor() anterior, o método retorna o ID recuperado + 1
Classe BancoDeDados com  o método gravar(), através da variável proximoId recupera o método getProximoId(), com isso, utiliza o 
	localStorage para transformar o objeto literal recuperado em uma notação JSON através da função stringify e após isso
	seta no localStorage no 'id', o id gerado pelo método getProximoId(), o qual foi recuperado pela variável proximoId
	no método recuperaRegistros(), eu busco o id gravado no método gravar() e atribuo ele para minha variável recuperaId
	faço um for para percorrer o valor desse id a partir do 1, confiro se o valor é menor ou igual ao id e cada vez que for
	conferindo eu somo mais 1 para a variável i, que faz todo esse processo, nisso crio a variável recuperaDespesa para
	poder recuperar o id de cada despesa, passo o parâmetro i, pois é ele que percorre os IDs, após isso utilizo a função
	parse() de JSON para transformar as info de string para objeto literal, processo oposto de stringify(), para facilitar
	quando for listar os dados e a cada interação eu acrescento no Array o que for recuperado de recuperaDespesa e 
	recupero a variável com o array, usando a função push para "empurrar" o parâmetro recuperarDespesa, que possui os dados
	logo após crio um IF para verificar se determinado ID é null, pois ele pode ter sido pulado ou apagado mesmo, assim uso o
	continue para fazer com que o laço avance, pulando para o próximo passo do laço, antes do push e por fim, retorno o array.
	no método pesquisar() eu chamo o método recuperaRegistros(), pois antes eu preciso de todos os registros para poder filtrar,
	para a lógica de cada item/elemento, eu devo igualar ao Array recuperado, pois assim a minha pesquisa irá sobrepor o Array
	original, pois ele será modificado após o filtro, ou seja, eu recupero tudo oq tem registrado, aplico a função filter(), a qual
	percorre o Array também, mas de acordo com o que foi "selecionado", com isso eu faço por exemplo:
	se o que foi selecionado na função pesquisarDespesa(), estiver diferente de vazio e estiver na variável filtrarDespesa, a qual,
	eu recuperei todos os registros, então é aplicado o filtro, após isso eu retorno filtrarDespesa, pois na função pesquisarDespesa()
	ficará responsável por receber esse retorno e aplicar os dados na tela. criei essa linha "despesaLista.id = i" para que
	ao chamar esse método, seja levado com ele o id de cada item também e o método remover() executa a função que remove do localStorage

Função para selecionar os elementos HTML por seus IDs, os quais são atribuídos por variáveis com o mesmo nome e após isso,
	recupera os valores colocados em cada elemento atráves de suas variáveis no objeto despesa e chama o objeto banco 
	da Classe BancoDeDados juntamente com o método gravar() passando como parâmetro o objeto despesa que possui os valores 
	de cada elemento, após isso foi implementado um if chamando o objeto despesa, da classe Despesa juntamente com o método
	validarDados(), assim, de acordo com o método, caso retorne true, grava os dados e exibe a mensagem se sucesso, se não
	irá exibir a mensagem de erro, de acordo com o IF ou o ELSE é aplicada no modal textos e classes distintas.

A função tem como objetivo ser chamada sempre que um onload no body de consulta.html,
	também e faço com que ela receba o array criado no método recuperaRegistros(), logo após seleciono o elemento tbody, o qual
	representa a listagem das despesas, atribui à uma variável para facilitar no código, após isso percorro o array recuperaDespesa
	para listar de forma dinâmica os dados utilizando a função forEach para percorrer o array, então crio a linha (<tr>) com o
	método inserRow(), ele faz parte do tbody e possibilita a inclusão de linhas e atribuo à uma variável para facilitar também
	então faço o mesmo prcesso para criar as colunas (<td>), chamando a criação de linha e o método insertCell(), o qual precisa
	passar parâmetro, pois as colunas são numeradas de 0 a n...no caso, preciso criar 4 colunas, sendo elas Data, Tipo, Descrição
	e Valor, então uso o innerHTML, o qual representa o conteúdo interno de uma tag, para aplicar os dados na coluna e crio um 
	switch para que o tipo troque o seu valor pelo texto represetado por cada valor numérico e ele vem como string, então com o
	parseInt eu converto para int, após isso eu faço com que a função passe a receber o parâmetro pesquisaDespesas que receberá um
	Array, pois ela pode ser chamado por outro função ou pelo onload do arquivo consulta.html, ao recuperar os registros, coloco
	um if, pois se for vazio, recupera todos os itens, uma vez que não tem filtro, depois criarei uma quinta coluna, a qual
	irá possuir um botão para remover aquela linha, para isso eu irei criar esse botão e utilizo a função append() para incluir o botão
	depois faço a função para que aquela linha seja apagada, incluo "btn.id = 'id_despesa_' + paramDespesa.id" para que o 
	botão tenha o mesmo id que o item e a concatenação para evitar conflito com o HTML, para o id_despesa_ não interferir
	na lógica, quando a função é aplicada, com o replace() ele irá substituir por vazio e o reload atualiza a página, para o item também ser removido da HTML automaticamente

Função para pesquisar/filtrar, aplicada no botão de pesquisa com um onclick, atribui para cada variável seus valores
	recuperados, após isso criei um objeto pesquisaDespesa da classe Despesa, passando os valores que recuperei, com isso
	os valores selecionados em pesquisaDespesa e "enviados" pelo botão de pesquisar serão direcionados para o método
	pesquisar() na classe BancoDeDados(), com isso chamo o objeto da banco da classe BancoDeDados e passo o objeto de
	pesquisa da classe Despesa, no caseo é o pesquisaDespesa, seria como se eu tivesse cadastrando, contudo, eu não sou
	obrigado a preencher todos os campos, pois ele não grava nada, além de que não foi realizada a lógica para que os
	campos sejam obrigatórios, após isso eu chamo a função carregaListaDespesas() e passo como paramentro tudo o que recuperei 
	do método pesquisar()