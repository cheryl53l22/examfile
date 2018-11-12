var xhr=new XMLHttpRequest();
xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery",true);
xhr.send();

xhr.onload=function(){
    console.log(1)
    var data=JSON.parse(xhr.responseText);
    console.log(data)
    var area=document.querySelector('#area');
    var type=document.querySelector('#type');
    var button=document.querySelector('.s');
    var count=document.querySelector('.count');
    var list=document.querySelector('.list');

    var total_area={}
    var total_type={}
    for(var i=0;i<data.length;i++){
        var content_a=data[i].ZipName_;
        var content_t=data[i].InformDesc_;
        if(total_area[content_a]==undefined){
            total_area[content_a]=1;
        }
        else{
            total_area[content_a]+=1;
        }
        if(total_type[content_t]==undefined){
            total_type[content_t]=1;
        }
        else{
            total_type[content_t]+=1;
        }
    }
    for(var i in total_area){
        area.innerHTML+=`<option value="${i}">${i}</option>`;
        console.log(i)
    }
    for(var i in total_type){
        type.innerHTML+=`<option value="${i}">${i}</option>`;
    }
    
    button.addEventListener('click',function(){
        var _area=area.value;
        var _type=type.value;
        var str_all="";
        var str_h4="";
        var useToCount=0;
        for(var i=0;i<data.length;i++){
            var current_a=data[i].ZipName_;
            var current_t=data[i].InformDesc_;
            var current_adress=data[i].address_;
            var current_before=data[i].BeforeDesc_;
            if(current_a==_area){
                if(current_t==_type||_type=='全部'){
                    useToCount+=1;
                    str_h4+='<li>'+'<h4>'+"地點 : "+current_adress+'</h4>'+'<h5>'+"報案狀況 : "+current_before+'</h5>'+'</li>'
                }
            }
        }
        str_all+='<h1>'+_area+" "+_type+"共有 "+useToCount+" 件"
        count.innerHTML=str_all;
        list.innerHTML=str_h4;
    })

}