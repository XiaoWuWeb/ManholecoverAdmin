/**
 * Created by Administrator on 2017/8/23.
 */
//-------------------------------------用户登录---------------------------------------------
$(function(){
    // http://113.108.88.206
    var $ip="https://www.lcgxlm.com/Manholecover/"; 
    // var $ip="http://192.168.0.121:80/Manholecover/";
    // var $ip="http://113.108.88.206:9080/Manholecover/";
    $("#on-login").on("click", function(){
        var zh=$('#zhsr').val();
        var mm=$("#mmsr").val();
        if($('#zhsr').val()==''){
            alert("账号密码不能为空");
            $(".zhsr").val('');
            $(".mmsr").val('');
        }
        else if($("#mmsr").val()==''){
            alert("账号密码不能为空");
            $(".zhsr").val('');
            $(".mmsr").val('');
        }
        else{
            $.ajax({
                url:$ip+"login",
                data: {'username':zh,'password':mm},
                datatype:"json",
                type: "POST",
                //async: false,
                error:function(msg){
                    console.log('请求出错');
                },
                success:function(msg){
                    var ddd =JSON.parse(msg);
                    console.log(msg);
                    if(ddd.success==true){
                        $.cookie('token',ddd.data,{expires:1});
                        console.log($.cookie('token'));
                        if($.cookie('token')!=undefined){
                            window.location.href="index.html";
                        }
                        else{
                            alert("登录出错，请更换浏览器或者清理缓存后再尝试。");
                        }

                    }
                    else{
                        alert("账号或密码输入不正确！");
                        $(".zhsr").val('');
                        $(".mmsr").val('');
                    }
                }

            })
        }

    });
    var browser=navigator.appName 
    var b_version=navigator.appVersion 
    var version=b_version.split(";"); 
    var trim_Version=version[1].replace(/[ ]/g,""); 
    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
    { 
        alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
    } 
    else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
    { 
    alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
    } 
    else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") 
    { 
    alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
    } 
    else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") 
    { 
    alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
    } 
});