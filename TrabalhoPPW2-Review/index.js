// URL da Api
const URL = 'https://projeto-final-ppw.herokuapp.com/api/115609'

function cadastro(){
    // Itens do form
    let inputName = document.querySelector("#Nome")
    let inputId = document.querySelector("#Identity")
    let inputHp = document.querySelector("#BaseHP")
    let inputImg = document.querySelector("#Imagem")

    if(verificaId(inputId.value)) {
        let boss = {
            "name": inputName.value,
            "idboss": inputId.value,
            "hp": inputHp.value,
            'img': inputImg.value
        }
    
        // criar método POST (cadastrar) com os dados inseridos no form
        let opcoes = {
            method: "POST",
            body: JSON.stringify(boss),
            headers: {
                "content-type": "application/json" // É só para avisar no POST que é um JSON sendo enviado
            }
        }
    
        // enviar para a URL
        
        let requisicao = fetch(URL, opcoes) // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        let dado = requisicao.then( (res) => {
            return res.json()
        })
    
        dado.then((dado) => {
            criarBoss(dado)
        })  
    }
    
}

// se não existir nenhum id igual, a função retorna true e entra no if da função de cadastro
async function verificaId(id) {
    let requisicao = await fetch(URL)
    //Cria uma lista JSON do URL para ser usado para listar os boss
    let dado = requisicao.then((response) => {
      return response.json()
    })
    
    dado.then((dado) => {
      dado.forEach(boss => {
        // Comparar ID dos itens cadastrados com o que foi informado
        if(boss.idboss === id) {
            alert("ID já existente, informe um novo valor!")

            return false 
        }
      });
    })

    return true
}

// chamar a função criarBoss() a cada item do JSON
function listarBoss() {
    let requisicao = fetch(URL)
    let dado = requisicao.then((response) => {
      return response.json()
    })
    
    dado.then((dado) => {
      dado.forEach(boss => {
        criarBoss(boss)
      });
    })
}

// criar elementos no html
function criarBoss(bossInfo) {
    let lista = document.querySelector("#listaBoss")

    let divInfo = document.createElement('div')

    // criar img
    let imgBoss = document.createElement('img')
    imgBoss.src = bossInfo.img
    imgBoss.alt = bossInfo.name

    divInfo.appendChild(imgBoss)

    // criar infos
    let pNome = document.createElement('p')
    let pId = document.createElement('p')
    let pHp = document.createElement('p')

    pNome.textContent = "Nome: " + bossInfo.name
    pId.textContent = "Id: " + bossInfo.idboss
    pHp.textContent = "Vida: " + bossInfo.hp

    divInfo.appendChild(pNome)
    divInfo.appendChild(pId)
    divInfo.appendChild(pHp)

    // criar btn de excluir
    let btnExcluir = document.createElement('button')
    
    btnExcluir.addEventListener('click', () => {
        excluirBoss(bossInfo._id)
    })

    btnExcluir.textContent = "Excluir"

    divInfo.appendChild(btnExcluir)

    // adicionar na lista
    lista.appendChild(divInfo)
}

// excluir boss de acordo com ID
function excluirBoss(id) {
    let opcoes = {
        method: 'DELETE',
    }
    //Será deletado o elemento em 'URL + "/" + id'
    let requisicao = fetch(URL + "/" + id, opcoes)
    let dado = requisicao.then( (res) => {
        return res.json()
    })

    dado.then( (boss) => {
        alert('O boss ' + boss.name + ' foi excluido!')
        document.location.reload()
    })
}

// chamar função de listar
listarBoss()