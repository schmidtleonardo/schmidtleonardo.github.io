var chavePrimaria = [], primaryKey = [], vendedores = [], vendas = [], bancos = [], datas = [], dados = [], codigos = []
var clique = 0
var cliquePesq = 0
var opcao = 0
var edicao = 0
var soma = 0
var somatorio = [], substituto = [], vendedorSubst = [], bancoSubst = [], dataSubst = [] , sellers = [], sells = [], banks = [], dates = [], chaveSubst = []
var marginTop = 70;
var n;
var valorTemp = 0

//Função para adicionar dados ao programa
function adicionar() {
    if (document.getElementById('nomeVendedor').value.length == 0 || document.getElementById('vendaDiaria').value.length == 0 || document.getElementById('nomeBanco').value.length == 0 || document.getElementById('dataVenda').value.length == 0) {
        alert('Por favor, preencha todos os campos')
    } else {

        chavePrimaria[vendedores.length] = Math.floor(Math.random()*100)
        for (var i = 0; i < vendedores.length; i++) {
            if (chavePrimaria[i] == chavePrimaria[vendedores.length]) {
                chavePrimaria[i] = Math.floor(Math.random()*vendedores.length)
            }
        }
        vendedores[vendedores.length] = document.getElementById('nomeVendedor').value
        vendas[vendas.length] = document.getElementById('vendaDiaria').value
        bancos[bancos.length] = document.getElementById('nomeBanco').value
        datas[datas.length] = document.getElementById('dataVenda').value
        
        dados[dados.length] = [chavePrimaria[dados.length], vendedores[dados.length], vendas[dados.length], bancos[dados.length], datas[dados.length]]

        mostrarNaTela(vendedores.length-1)
        atualizarStorage()

        document.location.reload()
    }
    
}

//Função para realizar os filtros
function filtrar() {

    //Se clicar uma vez, a div com os botoes aparecem
    if (clique == 0) {
        document.getElementById('filtro').style = 'display: block;'
        document.getElementById('pesquisa').style = 'display: none;'
        cliquePesq = 0
        for (var i = 1; i < 5; i++) {
            document.getElementById('filtro0'+i).style = 'display: none;'
        }
        clique = 1
        search()
    
    //Se clicar novamente, elas somem
    } else if (clique == 1) {
        document.getElementById('filtro').style = 'display: none;'
        document.getElementById('selecao').value = ''
        clique = 0
        search()   
   }
}

//Função para excluir dados do sistema
function excluir() {
    for (var i = edicao; i < vendedores.length; i++) {
        chavePrimaria[i] = chavePrimaria[i+1]
        vendedores[i] = vendedores[i+1]
        vendas[i] = vendas[i+1]
        bancos[i] = bancos[i+1]
        datas[i] = datas[i+1]
        dados[i] = dados[i+1]
    }

    chavePrimaria.pop()
    vendedores.pop()
    vendas.pop()
    bancos.pop()
    datas.pop()
    dados.pop()
    
    atualizarStorage()

    document.location.reload()
}

//Função para abrir os campos de pesquisa (Essa função é a antiga, não está mais sendo utilizada)
function pesquisar() {
    //document.getElementById('pesquisa').style = 'display: block;'
    document.getElementById('filtro').style = 'display: none;'
    clique = 0

    if (cliquePesq == 0) {
        edicao = parseInt(prompt('Digite a posição que você quer editar ou excluir: '))
        if (edicao < 0 || edicao > vendedores.length-1 || edicao.length == 0) {
            alert('Favor digitar um valor válido')
        } else if (edicao == null) {

        } else {
            cliquePesq = 1
            document.getElementById('pesquisa').style = 'display: block;'

            //Joga as informações do indice do vetor selecionado para os inputs
            for (var i = 0; i < vendedores.length; i++) {
                if (edicao == i) {
                    document.getElementById('nomeVendedor').value = vendedores[i]
                    document.getElementById('vendaDiaria').value = vendas[i]
                    document.getElementById('nomeBanco').value = bancos[i]
                    document.getElementById('dataVenda').value = datas[i]
                }
            }
        }
    } else {
        document.getElementById('pesquisa').style = 'display: none;'
        cliquePesq = 0
    }
}

//Grava os novos dados no vetor
function gravarEdicao() {
    if (valorTemp != 1) {
        vendedores[edicao] = document.getElementById('nomeVendedor').value
        vendas[edicao] = document.getElementById('vendaDiaria').value
        bancos[edicao] = document.getElementById('nomeBanco').value
        datas[edicao] = document.getElementById('dataVenda').value

        document.getElementById('nomeVendedor').value = ''
        document.getElementById('vendaDiaria').value = ''
        document.getElementById('nomeBanco').value = ''
        document.getElementById('dataVenda').value = ''

        atualizarStorage()

        document.location.reload()
    } else if (valorTemp == 1) {
        n = primaryKey[edicao]
        
        vendedores[chavePrimaria.indexOf(n)] = document.getElementById('nomeVendedor').value
        vendas[chavePrimaria.indexOf(n)] = document.getElementById('vendaDiaria').value
        bancos[chavePrimaria.indexOf(n)] = document.getElementById('nomeBanco').value
        datas[chavePrimaria.indexOf(n)] = document.getElementById('dataVenda').value
        
        document.getElementById('nomeVendedor').value = ''
        document.getElementById('vendaDiaria').value = ''
        document.getElementById('nomeBanco').value = ''
        document.getElementById('dataVenda').value = ''

        atualizarStorage()

        document.location.reload()
    }

    valorTemp = 0   
}

//Função com as opções de filtro do sistema, conforme vai selecionando as opções, o sistema
//vai mostrando inputs relacionados.
function search() {
    var selecao = document.getElementById('selecao').value
    document.getElementById('selectVenda').value = 'void'
    if (selecao == 'vendedor') {
        document.getElementById('filtro01').style = 'display: block;'
        for (var i = 2; i < 5; i++) {
            document.getElementById('filtro0'+i).style = 'display: none;' 
        }
        opcao = 1
    } else if (selecao == 'vendaDia') {
        document.getElementById('filtro02').style = 'display: block;'
        document.getElementById('filtro01').style = 'display: none;'
        document.getElementById('filtro03').style = 'display: none;'
        document.getElementById('filtro04').style = 'display: none;'
        opcao = 2
    } else if (selecao == 'banco') {
        document.getElementById('filtro03').style = 'display: block;'
        document.getElementById('filtro01').style = 'display: none;'
        document.getElementById('filtro02').style = 'display: none;'
        document.getElementById('filtro04').style = 'display: none;'
        opcao = 3
    } else if (selecao == 'data') {
        document.getElementById('filtro04').style = 'display: block;'
        for (var i = 3; i > 0; i--) {
            document.getElementById('filtro0'+i).style = 'display: none;' 
        }
        opcao = 4
    } 
}

//Filtra os dados conforme a opção selecionada
function procurar() {
    //Filtro pelo nome do vendedor
    if (opcao == 1) {
        document.getElementById('res').innerHTML = ''
        document.getElementById('radio').innerHTML = ''
        for (var i = 0; i < vendedores.length; i++) {
            if (document.getElementById('filtroVendedor').value == vendedores[i]) {

                mostrarNaTela(i)
                soma = 0
                somatorio[i] = parseFloat(vendas[i])
                soma += somatorio[i]
                document.getElementById('soma').innerHTML = `A soma dos valores é: <b>${parseFloat(soma).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`

            }
        }

    //Filtro pelo valor da proposta (crescente ou descrescente)
    } else if (opcao == 2) {
        document.getElementById('res').innerHTML = ''
        document.getElementById('radio').innerHTML = ''
        
        for (var j = 0; j < vendedores.length; j++) {
            primaryKey[j] = chavePrimaria[j]
            sellers[j] = vendedores[j]
            sells[j] = vendas[j]
            banks[j] = bancos[j]
            dates[j] = datas[j]
        }
     
        if (document.getElementById('selectVenda').value == 'ordemCrescente') {
            valorTemp = 1
            for (var j = 0; j < vendedores.length; j++) {
                for (var i = 0; i < vendedores.length-1; i++) {
                    
                    if (parseFloat(sells[i]) > parseFloat(sells[i+1])) {
                        substituto[i] = sells[i]
                        sells[i] = sells[i+1]
                        sells[i+1] = substituto[i]
        
                        vendedorSubst[i] = sellers[i]
                        sellers[i] = sellers[i+1]
                        sellers[i+1] = vendedorSubst[i]
        
                        bancoSubst[i] = banks[i]
                        banks[i] = banks[i+1]
                        banks[i+1] = bancoSubst[i]
        
                        dataSubst[i] = dates[i]
                        dates[i] = dates[i+1]
                        dates[i+1] = dataSubst[i]

                        chaveSubst[i] = primaryKey[i]
                        primaryKey[i] = primaryKey[i+1]
                        primaryKey[i+1] = chaveSubst[i]
        
                    }
                }
           }

        } else if (document.getElementById('selectVenda').value == 'ordemDecrescente') {
            document.getElementById('res').innerHTML = ''
            document.getElementById('radio').innerHTML = ''
            valorTemp = 1
            
            for (var j = 0; j < vendedores.length; j++) {
                for (var i = 0; i < vendedores.length-1; i++) {
                    
                    if (parseFloat(sells[i]) < parseFloat(sells[i+1])) {
                        substituto[i] = sells[i]
                        sells[i] = sells[i+1]
                        sells[i+1] = substituto[i]
        
                        vendedorSubst[i] = sellers[i]
                        sellers[i] = sellers[i+1]
                        sellers[i+1] = vendedorSubst[i]
        
                        bancoSubst[i] = banks[i]
                        banks[i] = banks[i+1]
                        banks[i+1] = bancoSubst[i]
        
                        dataSubst[i] = dates[i]
                        dates[i] = dates[i+1]
                        dates[i+1] = dataSubst[i]

                        chaveSubst[i] = primaryKey[i]
                        primaryKey[i] = primaryKey[i+1]
                        primaryKey[i+1] = chaveSubst[i]
                    }
                }
           }
        }

        console.log(primaryKey)
        console.log(chavePrimaria)
        console.log(sellers)
        console.log(vendedores)
        mostrarOrdenacao()
    
    //Filtro pelo banco
    } else if (opcao == 3) {
        document.getElementById('res').innerHTML = ''
        document.getElementById('radio').innerHTML = ''
        for (var i = 0; i < bancos.length; i++) {
            if (document.getElementById('filtroBanco').value == bancos[i]) {
                mostrarNaTela(i)

                soma = 0
                somatorio[i] = parseFloat(vendas[i])
                soma += somatorio[i]
                document.getElementById('soma').innerHTML = `A soma dos valores é: <b>${parseFloat(soma).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`
            }
        }
    
    //Filtro por data (propostas entre o período selecionado)
    } else if (opcao == 4) {
        if (document.getElementById('filtroDataInicial').value > document.getElementById('filtroDataFinal').value) {
            alert('A data inicial não pode ser menor que a final.')
        } else {
            document.getElementById('res').innerHTML = ''
            document.getElementById('radio').innerHTML = ''
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] >= document.getElementById('filtroDataInicial').value && datas[i] <= document.getElementById('filtroDataFinal').value) {
                    mostrarNaTela(i)
                    soma = 0
                    somatorio[i] = parseFloat(vendas[i])
                    soma += somatorio[i]
                    document.getElementById('soma').innerHTML = `A soma dos valores é: <b>${parseFloat(soma).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`
                }
            }
        }
    } 
}

//Essa função reescreve as informações na tela
function reescrever() {
    document.getElementById('res').innerHTML = ''
    document.getElementById('soma').innerHTML = `A soma dos valores é: <b>${parseFloat(soma).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`

    if (vendedores[0] != 'undefined') {
        for (var i = 0; i < vendedores.length; i++) {
            mostrarNaTela(i)
        }
        document.getElementById('soma').innerHTML = `A soma dos valores é: <b>${parseFloat(soma).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`
    }
}

//Função para criar dados fakes (usada para teste do sistema)
function fake() {
    for (var i = 0; i < 6; i++) {
        
        chavePrimaria[i] = Math.floor(Math.random()*100)
        for (var j = 0; j < vendedores.length; j++) {
            if (chavePrimaria[j] == chavePrimaria[vendedores.length]) {
                chavePrimaria[j] = Math.floor(Math.random()*vendedores.length)
            }
        }

        vendedores[i] = 'Pessoa'+i
        vendas[i] = 1234
        bancos[i] = 'Banco'+i
        datas[i] = '2020-08-30'

        dados[dados.length] = [chavePrimaria[dados.length], vendedores[dados.length], vendas[dados.length], bancos[dados.length], datas[dados.length]]

        document.getElementById('res').innerHTML += `<b>Nome:</b> ${vendedores[i]}<br>`
        document.getElementById('res').innerHTML += `<b>Valor:</b> ${parseFloat(vendas[i]).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}<br>`
        document.getElementById('res').innerHTML += `<b>Banco:</b> ${bancos[i]}<br>`
        document.getElementById('res').innerHTML += `<b>Data:</b> ${datas[i]}<br><hr>`

        atualizarStorage()
    } 
    puxaStorage()
}

//Função para transformar o storage em vetor novamente (Créditos ao professor Rafael Lindemann)
function leVetorDoStorage(key) {
    var vetorTemp = []
    var texto = localStorage.getItem(key)
    var fragmento = ''
    
    var i = 0
    do{
        if(texto[i] != ',')
        {
            fragmento += texto[i]
        }else
        {
            vetorTemp[vetorTemp.length] = fragmento
            fragmento = ''
        }
        i++
    }while(i<texto.length)
    vetorTemp[vetorTemp.length] = fragmento // para armazenar a última parte, que não termina em ',' 

    return vetorTemp
}

function somarValores(i) {
    soma = 0

    for (var i = 0; i < vendedores.length; i++) {
        somatorio[i] = parseFloat(vendas[i])
        soma += somatorio[i]
    }

    document.getElementById('soma').innerHTML = `A soma dos valores é: <b>${parseFloat(soma).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`
}

//Puxa as informações dos storage para os vetores novamente através da função anterior.
function puxaStorage() {
    chavePrimaria = leVetorDoStorage('chavePrimaria')
    somaArray = leVetorDoStorage('soma')
    dados = leVetorDoStorage('dados')
    vendedores = leVetorDoStorage('vendedores')
    vendas = leVetorDoStorage('vendas')
    bancos = leVetorDoStorage('bancos')
    datas = leVetorDoStorage('datas')

    somarValores()
    reescrever()
}

function limpar() {
    document.location.reload()
    valorTemp = 0
}

function limparinput() {
    document.getElementById('nomeVendedor').value = ''
    document.getElementById('vendaDiaria').value = ''
    document.getElementById('nomeBanco').value = ''
    document.getElementById('dataVenda').value = ''
}

//Limpa as informações do storage (Usado para teste de sistema)
function apagarStorage() {
    if (confirm('Você confirma a exclusão de todos os valores?')) {
        localStorage.removeItem('soma')
        localStorage.removeItem('dados')
        localStorage.removeItem('vendedores')
        localStorage.removeItem('vendas')
        localStorage.removeItem('bancos')
        localStorage.removeItem('datas')

        document.location.reload()
    }
}

//Nova função pesquisar, funciona através dos inputs 'radio'
function pesquisarNovo() {
    if (valorTemp != 1) {
        for (var i = 0; i < vendedores.length; i++) {
            try {
                if (document.getElementById(('radioExcluir')+i).checked == true) {
                    edicao = i
                    document.getElementById('pesquisa').style = 'display: block;'
                    document.getElementById('filtro').style = 'display: none;'
                    document.getElementById('nomeVendedor').value = vendedores[i]
                    document.getElementById('vendaDiaria').value = vendas[i]
                    document.getElementById('nomeBanco').value = bancos[i]
                    document.getElementById('dataVenda').value = datas[i]
                } 
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        for (var i = 0; i < vendedores.length; i++) {
            try {
                if (document.getElementById(('radioExcluir')+i).checked == true) {
                    edicao = i
                    document.getElementById('pesquisa').style = 'display: block;'
                    document.getElementById('filtro').style = 'display: none;'
                    document.getElementById('nomeVendedor').value = sellers[i]
                    document.getElementById('vendaDiaria').value = sells[i]
                    document.getElementById('nomeBanco').value = banks[i]
                    document.getElementById('dataVenda').value = dates[i]
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }
    
}

//Função para escrever as informações na tela
function mostrarNaTela(i) {
    marginTop = 70;
    //document.getElementById('res').innerHTML += `<b>Chave Primária:</b> ${chavePrimaria[i]}<br>`
    document.getElementById('res').innerHTML += `<b>Nome:</b> ${vendedores[i]}<br>`
    document.getElementById('res').innerHTML += `<b>Valor:</b> ${parseFloat(vendas[i]).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}<br>`
    document.getElementById('res').innerHTML += `<b>Banco:</b> ${bancos[i]}<br>`
    document.getElementById('res').innerHTML += `<b>Data:</b> ${datas[i]}<br><hr>`
    
    if (i != 0) {
        marginTop = 66
    }
    document.getElementById('radio').innerHTML += `<input type="radio" name="radioExcluir" id="radioExcluir${i}" style="margin-top: ${marginTop}px;" onclick="pesquisarNovo()">`
}

//Função para escrever a ordenção crescente ou decrescente na tela
function mostrarOrdenacao() {
    marginTop = 70;
    for (var i = 0; i < vendedores.length; i++) {   
        //document.getElementById('res').innerHTML += `<b>Chave Primária:</b> ${primaryKey[i]}<br>`
        document.getElementById('res').innerHTML += `<b>Nome:</b> ${sellers[i]}<br>`
        document.getElementById('res').innerHTML += `<b>Valor:</b> ${parseFloat(sells[i]).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}<br>`
        document.getElementById('res').innerHTML += `<b>Banco:</b> ${banks[i]}<br>`
        document.getElementById('res').innerHTML += `<b>Data:</b> ${dates[i]}<br><hr>`
        
        if (i != 0) {
            marginTop = 66
        }
        document.getElementById('radio').innerHTML += `<input type="radio" name="radioExcluir" id="radioExcluir${i}" style="margin-top: ${marginTop}px;" onclick="pesquisarNovo()">`
    }
}

//Função para atualizar as informações do storage
function atualizarStorage() {
    localStorage.setItem('chavePrimaria', chavePrimaria)
    localStorage.setItem('soma', soma)
    localStorage.setItem('dados', dados)
    localStorage.setItem('vendedores', vendedores)
    localStorage.setItem('vendas', vendas)
    localStorage.setItem('bancos', bancos)
    localStorage.setItem('datas', datas)
}