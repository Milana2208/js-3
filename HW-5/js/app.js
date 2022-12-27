const tabItems = document.querySelectorAll(".tabheader__item")
const tabContent = document.querySelectorAll(".tabcontent")
const tabMain = document.querySelector(".tabheader__items")

      const hideContent  =()=>{
        tabContent.forEach((item)=>{
            item.style.display= "none"
        })
        tabItems.forEach((item)=>{
            item.classList.remove("tabheader__item_active")
        })
    }

      const showContent = (i=0)=>{
        tabContent[i].style.display = "block"
        tabItems[i].classList.add("tabheader__item_active")
      }

    hideContent()
    showContent()
//     let SlindeIndex = 0
// const changeIndex=()=>{
//     if(SlindeIndex<3){
//         SlindeIndex+=1
//         console.log(SlindeIndex)
//         hideContent()
//         showContent(SlindeIndex)
//     }else{
//         SlindeIndex=0
//         console.log(SlindeIndex)
//         hideContent()
//         showContent(SlindeIndex)
//     }
// }
// const SetSlide =setInterval(changeIndex,1000)
    
   

tabMain.addEventListener("click",(event) => {
    const target = event.target
    if(!target.classList.contains('tabheader__item_active')){
        tabItems.forEach((tab , idx)=>{
            if(target === tab){
                hideContent()
                showContent(idx)
                // clearInterval(SetSlide)
            }
        }
        )
    }
})


// hw 1
const  btnOpen = document.querySelector('.btn_white')
const modal = document.querySelector('.modal')
const closeModal= document.querySelector('.modal__close')


const  openModal=()=>{
    modal.classList.add('show')
    document.body.style.overflow ='hidden'
}
const closinModal=()=>{
    modal.classList.remove('show')
    document.body.style.overflow ='auto'
}


btnOpen.addEventListener('click',openModal)

window.addEventListener('click',(e)=>{
    if(e.target===modal){
       closinModal()
    }else if(e.target===closeModal){
        closinModal()
    }
})




///  POST REq


const form = document.querySelectorAll('form')

const loadingModal = document.createElement('div')
const innerModal = document.createElement('div')
document.body.append(loadingModal)
loadingModal.append(innerModal)


function BuildModal(){
    loadingModal.style.position = 'fixed'
    loadingModal.style.top = '0'
    loadingModal.style.left = '0'
    loadingModal.style.zIndex = '1055'
    loadingModal.style.display = 'block'
    loadingModal.style.width ='100vw'
    loadingModal.style.height ='100vh'
    loadingModal.style.overflow = 'hidden'
    loadingModal.style.backgroundColor='rgba(0, 0, 0, 0.5)'
    document.body.style.overflow = 'hidden'
    //innerModal
    innerModal.style.width = '300px'

    innerModal.style.margin ='40px auto'
    innerModal.style.padding = '40px'
    innerModal.style.backgroundColor ='white'
    innerModal.style.border = '1px solid rgba(0, 0, 0, 0.2)'
    innerModal.style.fontSize ='50px'
    innerModal.style.textAlign ='center'
    innerModal.style.color ='black'
    innerModal.style.fontWeight ='600'
}




form.forEach((form)  => {
    postData(form)
})


function postData (form){
    form.addEventListener('submit',(event) => {
        event.preventDefault()


        // request.setRequestHeader('Content-Type','multipart/form-data')

        const formData = new FormData(form)
        const obj = {}

        // obj['age'] = 20
        formData.forEach((item,id) => {
            obj[id] = item
        })
        const data = JSON.stringify(obj)

        BuildModal()
        innerModal.innerText = 'loading...'

        fetch('server.php',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: data
        }).then((req)=>{
            if(req.status>=200 && req.status<400){
                innerModal.innerText ='success'
            }else{
                throw ('error')
            }
        }).catch(()=>{
            innerModal.innerText ='fail'
        }).finally(()=>{
            closinModal()
            setTimeout(()=>{
                loadingModal.style.display ='none'
            },5000)
        })
    })

}






