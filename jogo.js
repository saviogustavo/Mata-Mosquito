/* Primeiro definimos altura e largura da tela */
var altura = 0
var largura = 0
var vidas = 1
var tempo = 60
var tempoMosquito = 1500  //Informação referente a quantidade de tempo que o mosquito aparece na tela dependendo do nível do jogo


// Passando a informação do nível (normal, dificil e chucknorris) pela URL da página inicial para a página do jogo mesmo
var nivel = window.location.href
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
    tempoMosquito = 1500
} else if (nivel === 'dificil') {
    tempoMosquito = 1000
} else if (nivel === 'chucknorris') {
    tempoMosquito = 750
}


// Função para definir tamanho da tela do jogo
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo() //Essa função será chamada no resizing do <body>

var cronometro = setInterval(function(){

    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = "vitoria.html"
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000)

function posicaoRandomica() {

    /* Antes de adicionar um mosquito na tela nós precisamos ver se já existe um mosquito pra poder removê-lo, para não aparecer vários mosquitos na tela */
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
    
    
        /* Ao remover o mosquito antes dele ser clicado a pessoa perderá uma vida (Coração) */
        if (vidas > 3) { //Lógica para remover cada uma das três vidas (v1, v2 e v3)
                
            window.location.href = "fim_de_jogo.html"

        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }  

    }

    /* Recuperar a posição que os mosquitos vão aparecer na tela de forma randomica */
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    /* Criar o elemento mosquito na tela */
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoMosquito() + ' ' + ladoAleatorio() //tamanhoMosquito() retorna uma string com o nome da classe que será aplicada para mudar o tamanho do mosquito; ladoAleatorio() muda a posição do mosquito <Esquerda e Direita>
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    // Remover o mosquito quando ele for clicado
    mosquito.onclick = function () {
        this.remove()
    }

    document.body.appendChild(mosquito)

}

/* Função para variar o tamanho do mosquito na tela */
function tamanhoMosquito() {
    var tamanho = Math.floor(Math.random() * 3)

    switch(tamanho) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}
/* Função para variar o lado do mosquito <Esquerda || Direita> */
function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2)

    switch(lado) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}