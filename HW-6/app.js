
// создание дивов
const modal = document.createElement('div')
modal.setAttribute('class','modal')
document.body.append(modal)
const modal_dialog= document.createElement('div')
modal_dialog.setAttribute('class','modal__dialog')
modal.append(modal_dialog)
const modalContent = document.createElement('div')
modalContent.setAttribute('class','modalContent')
modal_dialog.append(modalContent)
const form = document.createElement('form')
modalContent.append(form)
const input1 = document.createElement('input')
input1.placeholder = 'name'
const input2 = document.createElement('input')
input2.placeholder = 'phone'
form.append(input1,input2)
const btn = document.createElement('button')
btn.innerHTML = 'Phone'
form.append(btn)

//2
const modal1 = document.createElement('div')
modal1.setAttribute('class','modal')
document.body.append(modal1)
const modal_dialog1= document.createElement('div')
modal_dialog1.setAttribute('class','modal__dialog')
modal1.append(modal_dialog1)
const modalContent1 = document.createElement('div')
modalContent1.setAttribute('class','modalContent')
modal_dialog1.append(modalContent1)




function makeModal(){
    modal.style.position= 'fixed'
    modal.style.top='0'
    modal.style.left ='0'
    modal.style.zIndex = '1020'
    modal.style.width = '100%'
    modal.style.height = '100%'
    modal.style.overflow = 'hidden'
    modal.style.backgroundColor ='rgba(0, 0, 0, 0.5)'
    makeModal_dialog()
    makeModalContent()
    MakeInput(input1)
    MakeInput(input2)
}
function makeModal_dialog(){
    modal_dialog.style.width = "500px"
    modal_dialog.style.margin = '40px auto'
}
function makeModalContent (){
    modalContent.style.position= 'relative'
    modalContent.style.width= '100%'
    modalContent.style.padding= '40px'
    modalContent.style.backgroundColor='white'
    modalContent.style.borderRadius= '4px'
    modalContent.style.maxHeight= '80vh'
    modalContent.style.overflow = 'auto'    
}
function MakeInput(elem){
    elem.style.width ='200px'
    elem.style.height ='50px'
    elem.style.backgroundColor ='white'
    
}


//2
function makeModal1(){
    modal1.style.position= 'fixed'
    modal1.style.top='0'
    modal1.style.left ='0'
    modal1.style.zIndex = '1020'
    modal1.style.width = '100%'
    modal1.style.height = '100%'
    modal1.style.overflow = 'hidden'
    modal1.style.display ='none'
    modal1.style.backgroundColor ='rgba(0, 0, 0, 0.5)'
    makeModal_dialog1()
    makeModalContent1()
}
makeModal1()

function makeModal_dialog1(){
    modal_dialog1.style.width = "500px"
    modal_dialog1.style.margin = '40px auto'
}
function makeModalContent1 (){
    modalContent1.style.position= 'relative'
    modalContent1.style.width= '100%'
    modalContent1.style.padding= '40px'
    modalContent1.style.backgroundColor='white'
    modalContent1.style.borderRadius= '4px'
    modalContent1.style.maxHeight= '80vh'
    modalContent1.style.overflow = 'auto'  
        
}
function OpenModal (){
    modal1.style.display = "block"
}

function CloseModal(){
    modal1.style.display= 'none'
}

const TextMassage = {
    success: "succes",
    failed:"fAIL",
    loading:"load....."
}


makeModal()

function postData (form) {
    form.addEventListener('submit',(event) =>{
       
        
        
        event.preventDefault()
        OpenModal()
        modalContent1.innerHTML = TextMassage.loading
        const formData = new FormData(form)


        const obj = {}


        formData.forEach((item,id)=>{
            obj[id]=item
        })
            
            fetch('./server.php',{
            method: 'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            },
           
        }).then((res)=>{
             
              
                if(res.status >= 200 || res.status < 300){
                    OpenModal()  
                    modalContent1.innerHTML= TextMassage.success
                }

        }).catch(()=>{
            // alert('error')
            OpenModal()
            modalContent1.innerHTML = TextMassage.failed
        }).finally(()=>{            
                setTimeout(()=>{
                    
                    
                    CloseModal()    
                },5000)
               
        })
       
    })
}
postData(form)