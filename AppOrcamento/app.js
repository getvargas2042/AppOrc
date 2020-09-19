//Classe Despesa com o constructor() recebendo os atributos dos campos, após isso é implementado o método validarDados(), o qual
	//através de um for irá percorrer todos os atributos da classe, utilizamos o 'in' para recuperar esse atributos e o colocamos
	//"dentro" da variável i, com isso o 'this[i]' irá percorrer cada atributo juntamente com seus valores atribuídos ao preencher
	//o form, caso algum campo, esteja vazio ou null ou undefined, irá retornar falso
class Despesa {
	constructor(dia, mes, ano, tipo, descricao, valor) {
		this.dia = dia
		this.mes = mes
		this.ano = ano
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if (this[i] == undefined || this[i] == "" || this[i] ==null) {
				return false
			}
		}
		return true
	}
}

//Classe BancoDeDados com o constructor() verificando se existe um ID recuperando-o no localStorage, caso não exista, atribui o valor 0
//Classe BancoDeDados com o método getProximoId() também verificando se existe um ID e o recuperando no localStorage, como existe e é 0
	//por conta do constructor() anterior, o método retorna o ID recuperado + 1
//Classe BancoDeDados com  o método gravar(), através da variável proximoId recupera o método getProximoId(), com isso, utiliza o 
	//localStorage para transformar o objeto literal recuperado em uma notação JSON através da função stringify e após isso
	//seta no localStorage no 'id', o id gerado pelo método getProximoId(), o qual foi recuperado pela variável proximoId
	//no método recuperaRegistros(), eu busco o id gravado no método gravar() e atribuo ele para minha variável recuperaId
	//faço um for para percorrer o valor desse id a partir do 1, confiro se o valor é menor ou igual ao id e cada vez que for
	//conferindo eu somo mais 1 para a variável i, que faz todo esse processo, nisso crio a variável recuperaDespesa para
	//poder recuperar o id de cada despesa, passo o parâmetro i, pois é ele que percorre os IDs, após isso utilizo a função
	//parse() de JSON para transformar as info de string para objeto literal, processo oposto de stringify(), para facilitar
	//quando for listar os dados e a cada interação eu acrescento no Array o que for recuperado de recuperaDespesa e 
	//recupero a variável com o array, usando a função push para "empurrar" o parâmetro recuperarDespesa, que possui os dados
	//logo após crio um IF para verificar se determinado ID é null, pois ele pode ter sido pulado ou apagado mesmo, assim uso o
	//continue para fazer com que o laço avance, pulando para o próximo passo do laço, antes do push e por fim, retorno o array.
	//no método pesquisar() eu chamo o método recuperaRegistros(), pois antes eu preciso de todos os registros para poder filtrar,
	//para a lógica de cada item/elemento, eu devo igualar ao Array recuperado, pois assim a minha pesquisa irá sobrepor o Array
	//original, pois ele será modificado após o filtro, ou seja, eu recupero tudo oq tem registrado, aplico a função filter(), a qual
	//percorre o Array também, mas de acordo com o que foi "selecionado", com isso eu faço por exemplo:
	//se o que foi selecionado na função pesquisarDespesa(), estiver diferente de vazio e estiver na variável filtrarDespesa, a qual,
	//eu recuperei todos os registros, então é aplicado o filtro, após isso eu retorno filtrarDespesa, pois na função pesquisarDespesa()
	//ficará responsável por receber esse retorno e aplicar os dados na tela. criei essa linha "despesaLista.id = i" para que
	//ao chamar esse método, seja levado com ele o id de cada item também e o método remover() executa a função que remove do localStorage
class BancoDeDados {
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}
	
	gravar(paramDespesa) {
		let proximoId = this.getProximoId()
		localStorage.setItem(proximoId, JSON.stringify(paramDespesa))
		localStorage.setItem('id', proximoId)
	}

	recuperaRegistros() {
		let despesaLista = Array()

		let recuperaId = localStorage.getItem('id')
		for(let i = 1; i <= recuperaId; i++) {
			let recuperaDespesa = JSON.parse(localStorage.getItem(i))

			if(recuperaDespesa === null) {
				continue
			}

			recuperaDespesa.recuperaId = i
			despesaLista.push(recuperaDespesa)
		}
		return despesaLista
	}

	pesquisar(pesquisaDespesa) {
		let filtrarDespesa = Array() 
		filtrarDespesa = this.recuperaRegistros()

		if(pesquisaDespesa.dia != '') {
			filtrarDespesa = filtrarDespesa.filter(filtrarDespesa => filtrarDespesa.dia == pesquisaDespesa.dia)
		}

		if(pesquisaDespesa.mes != '') {
			filtrarDespesa = filtrarDespesa.filter(filtrarDespesa => filtrarDespesa.mes == pesquisaDespesa.mes)
		}

		if(pesquisaDespesa.ano != '') {
			filtrarDespesa = filtrarDespesa.filter(filtrarDespesa => filtrarDespesa.ano == pesquisaDespesa.ano)
		}

		if(pesquisaDespesa.tipo != '') {
			filtrarDespesa = filtrarDespesa.filter(filtrarDespesa => filtrarDespesa.tipo == pesquisaDespesa.tipo)
		}

		if(pesquisaDespesa.descricao != '') {
			filtrarDespesa = filtrarDespesa.filter(filtrarDespesa => filtrarDespesa.descricao == pesquisaDespesa.descricao)
		}

		if(pesquisaDespesa.valor != '') {
			filtrarDespesa = filtrarDespesa.filter(filtrarDespesa => filtrarDespesa.valor == pesquisaDespesa.valor)
		}

		return filtrarDespesa
	}

	remover(id) {
		localStorage.removeItem(id)
	}
}

//Criação de um objeto para a classe BancoDeDdados
let banco = new BancoDeDados()

//Função para selecionar os elementos HTML por seus IDs, os quais são atribuídos por variáveis com o mesmo nome e após isso,
	//recupera os valores colocados em cada elemento atráves de suas variáveis no objeto despesa e chama o objeto banco 
	//da Classe BancoDeDados juntamente com o método gravar() passando como parâmetro o objeto despesa que possui os valores 
	//de cada elemento, após isso foi implementado um if chamando o objeto despesa, da classe Despesa juntamente com o método
	//validarDados(), assim, de acordo com o método, caso retorne true, grava os dados e exibe a mensagem se sucesso, se não
	//irá exibir a mensagem de erro, de acordo com o IF ou o ELSE é aplicada no modal textos e classes distintas.
function cadastrarDespesa() {
	let dia = document.getElementById('dia')
	let mes = document.getElementById('mes')
	let ano = document.getElementById('ano')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		dia.value,
		mes.value,
		ano.value,
		tipo.value,
		descricao.value,
		valor.value)
	
	if(despesa.validarDados()) {
		banco.gravar(despesa)

		document.getElementById('modalTitulo').innerHTML = 'Gravação concluída.'
		document.getElementById('modalTituloDiv').className = 'modal-header text-success'
		document.getElementById('modalMensagem').innerHTML = 'Despesa cadastrada com sucesso!'
		document.getElementById('modalBotao').className = 'btn btn-outline-success'
		document.getElementById('modalBotao').innerHTML = 'Voltar'
		//JQUERY - seleciona a div referenciando o id, usa a função modal para exibir ele
		$('#modalRegistraDespesa').modal('show')

		dia.value = ''
		mes.value = ''
		ano.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {
		document.getElementById('modalTitulo').innerHTML = 'Erro na gravação.'
		document.getElementById('modalTituloDiv').className = 'modal-header text-danger'
		document.getElementById('modalMensagem').innerHTML = 'Verifique se todos os campos foram preenchidos!'
		document.getElementById('modalBotao').className = 'btn btn-outline-danger'
		document.getElementById('modalBotao').innerHTML = 'Voltar e Corrigir'
		//JQUERY - seleciona a div referenciando o id, usa a função modal para exibir ele
		$('#modalRegistraDespesa').modal('show')

	}
}

//A função tem como objetivo ser chamada sempre que um onload no body de consulta.html,
	//também e faço com que ela receba o array criado no método recuperaRegistros(), logo após seleciono o elemento tbody, o qual
	//representa a listagem das despesas, atribui à uma variável para facilitar no código, após isso percorro o array recuperaDespesa
	//para listar de forma dinâmica os dados utilizando a função forEach para percorrer o array, então crio a linha (<tr>) com o
	//método inserRow(), ele faz parte do tbody e possibilita a inclusão de linhas e atribuo à uma variável para facilitar também
	//então faço o mesmo prcesso para criar as colunas (<td>), chamando a criação de linha e o método insertCell(), o qual precisa
	//passar parâmetro, pois as colunas são numeradas de 0 a n...no caso, preciso criar 4 colunas, sendo elas Data, Tipo, Descrição
	//e Valor, então uso o innerHTML, o qual representa o conteúdo interno de uma tag, para aplicar os dados na coluna e crio um 
	//switch para que o tipo troque o seu valor pelo texto represetado por cada valor numérico e ele vem como string, então com o
	//parseInt eu converto para int, após isso eu faço com que a função passe a receber o parâmetro pesquisaDespesas que receberá um
	//Array, pois ela pode ser chamado por outro função ou pelo onload do arquivo consulta.html, ao recuperar os registros, coloco
	//um if, pois se for vazio, recupera todos os itens, uma vez que não tem filtro, depois criarei uma quinta coluna, a qual
	//irá possuir um botão para remover aquela linha, para isso eu irei criar esse botão e utilizo a função append() para incluir o botão
	//depois faço a função para que aquela linha seja apagada, incluo "btn.id = 'id_despesa_' + paramDespesa.id" para que o 
	//botão tenha o mesmo id que o item e a concatenação para evitar conflito com o HTML, para o id_despesa_ não interferir
	//na lógica, quando a função é aplicada, com o replace() ele irá substituir por vazio e o reload atualiza a página, para o item
	//também ser removido da HTML automaticamente
function carregaListaDespesas(recuperaDespesa = Array(), filtro = false) {
	
	if(recuperaDespesa.length == 0 && filtro == false) {
		recuperaDespesa = banco.recuperaRegistros()
	
	}
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''
	
	recuperaDespesa.forEach(function(paramDespesa) {
		let criacaoLinha = listaDespesas.insertRow()

		criacaoLinha.insertCell(0).innerHTML = `${paramDespesa.dia}/${paramDespesa.mes}/${paramDespesa.ano}`
	
		switch(paramDespesa.tipo) {
			case '1': paramDespesa.tipo = 'Alimentação'
				break
			case '2': paramDespesa.tipo = 'Educação'
				break
			case '3': paramDespesa.tipo = 'Lazer'
				break
			case '4': paramDespesa.tipo = 'Saúde'
				break
			case '5': paramDespesa.tipo = 'Transporte'
				break
		}
		criacaoLinha.insertCell(1).innerHTML = paramDespesa.tipo

		criacaoLinha.insertCell(2).innerHTML = paramDespesa.descricao
		criacaoLinha.insertCell(3).innerHTML = `R$${paramDespesa.valor}`

		let btn = document.createElement('button')
		btn.className = 'btn btn-outline-danger'
		btn.innerHTML = '<h6>PAGO</h6>'
		btn.id = `id_despesa_${paramDespesa.recuperaId}`
		criacaoLinha.insertCell(4).append(btn)
		btn.onclick = function() {
			let id = this.id.replace('id_despesa_', '')
			banco.remover(id)
			window.location.reload()
		}
	})
}

//Função para pesquisar/filtrar, aplicada no botão de pesquisa com um onclick, atribui para cada variável seus valores
	//recuperados, após isso criei um objeto pesquisaDespesa da classe Despesa, passando os valores que recuperei, com isso
	//os valores selecionados em pesquisaDespesa e "enviados" pelo botão de pesquisar serão direcionados para o método
	//pesquisar() na classe BancoDeDados(), com isso chamo o objeto da banco da classe BancoDeDados e passo o objeto de
	//pesquisa da classe Despesa, no caseo é o pesquisaDespesa, seria como se eu tivesse cadastrando, contudo, eu não sou
	//obrigado a preencher todos os campos, pois ele não grava nada, além de que não foi realizada a lógica para que os
	//campos sejam obrigatórios, após isso eu chamo a função carregaListaDespesas() e passo como paramentro tudo o que recuperei 
	//do método pesquisar()
function pesquisarDespesa() {
	let dia = document.getElementById('dia').value
	let mes = document.getElementById('mes').value
	let ano = document.getElementById('ano').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let pesquisaDespesa = new Despesa(dia, 
		mes, 
		ano, 
		tipo, 
		descricao, 
		valor)

	let pesquisaDespesas = banco.pesquisar(pesquisaDespesa)

	carregaListaDespesas(pesquisaDespesas, true)
}