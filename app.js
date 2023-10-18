const body = document.querySelector('body')

async function get(){

    const data = await fetch('http://localhost/wordpress/wp-json/wp/v2/comments')
    const json = await data.json()
    console.log(json)



    for(var i in json){

        let tekst = json[i].content.rendered
        const div = document.createElement('div')
        div.innerHTML = tekst
        div.classList.add('divs')
        document.querySelector('body').appendChild(div)
        
        if(tekst.includes('to')){
            div.setAttribute('id', `red${i}`)
            //div.style.backgroundColor = 'red'
            const button = document.createElement('button')
            button.setAttribute('onclick', `del(${json[i].id})`)
            button.innerHTML = 'del'
            div.appendChild(button)
        }
    }


}
get()

async function del(id){
    await fetch(`http://localhost/wordpress/wp-json/wp/v2/comments/${id}`, {
        method: 'DELETE',  
        headers: {
            authorization: `Basic ${btoa('ZmlsaXA6aGFzbG8xMjNoYXNsbw==')}`
        }      
    })

}