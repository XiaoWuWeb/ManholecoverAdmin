
/**
 * Created by Administrator on 2017/8/29.
 */
// http://113.108.88.206
var $ip="https://www.lcgxlm.com/Manholecover/";
   // var $ip="http://192.168.0.121:80/Manholecover/";
   // var $ip="http://192.168.0.112:9090/Manholecover/";
$(function(){
    
//    ----------------------------------是否携带cookie-------------------------------
//    if($.cookie('token')==null){
//        window.location.href="../login.html";
//    }
    $(".get-out").on("click", function(){
        $.ajax({
            url:$ip+"logout",
            dataType: "json",
            type: "POST",
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
               alert("错误");
            },
            success:function(msg){
                $.cookie('token', '',{ expires: -1 });
                window.location.href="login.html";
            }

        })
    })
    //http://[<serverUrl>]/logout
//——————————————— 查询用户并且进行拦截————————————————————
    $.ajax({
        url:$ip+"users/findByToken",
        //http://[<serverUrl>]/admin/users/findByToken
        dataType: "json",
        type: "get",
        ////async: false,
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', $.cookie('token'));
        },
        error:function(msg){
            console.log('请求出错');
        },
        success:function(msg){
            console.log(msg);
            if(msg.success==false){
                if (window.location.pathname == "/Manholecover/login.html") {
                    return
                }
                alert('登陆超时，请重新登陆！');
                setTimeout(function(){
                    window.location.href="login.html";
                },500)
                
            }
            $(".username").text(msg.data.username);
            if(msg.data.companyName!=null&&msg.data.companyName!=""){
                $(".GSMC").text(msg.data.companyName);
            }
            else{
                $(".GSMC").text("华腾智能井盖后台管理系统");
            }

        }

    })



})


