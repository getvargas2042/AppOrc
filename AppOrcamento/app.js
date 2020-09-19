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

let banco = new BancoDeDados()

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