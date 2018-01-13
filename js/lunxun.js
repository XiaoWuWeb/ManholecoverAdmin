/**
 * Created by Administrator on 2017/9/11.
 */
$(function(){

    $.ajax({
        url:$ip+"admin/equipment/page/"+"8/1",
        dataType: "json",
        type: "POST",
        data: {'status':2},
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', $.cookie('token'));
        },
        error:function(msg){
            console.log('请求出错');
        },
        success:function(msg){
            if(msg.message=="E1002"){
                var id=  setInterval(function(){
                    $.ajax({
                        url:$ip+"admin/equipment/page/"+"8/1",
                        dataType: "json",
                        type: "POST",
                        data: {'status':2},
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('token', $.cookie('token'));
                        },
                        error:function(msg){
                            console.log('请求出错');
                        },
                        success: function(msg){
                            if(msg.message!="E1002"){

                                if (window.Notification) {

                                    var popNotice = function() {
                                        if (Notification.permission == "granted") {
                                            var notification = new Notification("用户,您好", {
                                                body: '收到一条新的井盖异常信息,点击后在浏览器查看',
                                                icon: '../images/laba.png',
                                                requireInteraction:true
                                            });

                                            notification.onclick = function() {
                                                window.location.href="./fix.html";
                                                notification.close();
                                            };
                                        }
                                    };
                                    Notification.requestPermission().then(function(permission) {
                                        if(permission === 'granted'){

                                        }else if(permission === 'denied'){
                                            if(confirm("收到新的异常信息，是否立即查看")){
                                                window.location.href="./fix.html";
                                            }
                                        }
                                    });
                                    popNotice();
                                }
                                else {
                                    if(confirm("收到新的异常信息，是否立即查看")){
                                        window.location.href="./fix.html";
                                    }
                                }
                            }
                            else{

                            }

                        }
                    })
                },10000)
            }
            else{
                var _totalCount= msg.data.totalCount;

                setInterval(function(){
                    $.ajax({
                        url:$ip+"admin/equipment/page/"+"8/1",
                        dataType: "json",
                        type: "POST",
                        data: {'status':2},
                        ////async: false,
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('token', $.cookie('token'));
                        },
                        error:function(msg){
                            console.log('请求出错');

                        },
                        success: function(msg){
                            if(_totalCount!=msg.data.totalCount){
                                if (window.Notification) {

                                    var popNotice = function() {
                                        if (Notification.permission == "granted") {
                                            var notification = new Notification("用户,您好", {
                                                body: '收到一条新的井盖异常信息,点击后在浏览器查看',
                                                icon: '../images/laba.png',
                                                requireInteraction:true
                                            });

                                            notification.onclick = function() {
                                                window.location.href="./fix.html";
                                                notification.close();
                                            };
                                        }
                                    };
                                    Notification.requestPermission().then(function(permission) {
                                        if(permission === 'granted'){

                                        }else if(permission === 'denied'){
                                            if(confirm("收到新的异常信息，是否立即查看")){
                                                window.location.href="./fix.html";
                                            }
                                        }
                                    });
                                    popNotice();
                                    //if (Notification.permission == "granted") {
                                    //    popNotice();
                                    //} else if (Notification.permission != "denied") {
                                    //    Notification.requestPermission(function (permission) {
                                    //        popNotice();
                                    //    });
                                    //}
                                }
                                else {
                                    if(confirm("收到新的异常信息，是否立即查看")){
                                        window.location.href="./fix.html";
                                    }
                                }
                                //alert("收到新的井盖异常信息，请查看");
                                _totalCount= msg.data.totalCount;
                            }


                        }
                    })
                },10000)
            }
        }
    })
    //if ("IE" == mb) {
    //    $.ajax({
    //        url:$ip+"admin/equipment/page/"+"8/1",
    //        dataType: "json",
    //        type: "POST",
    //        data: {'status':2},
    //        beforeSend: function(xhr){
    //            xhr.setRequestHeader('token', $.cookie('token'));
    //        },
    //        error:function(msg){
    //            console.log('请求出错');
    //        },
    //        success:function(msg){
    //            if(msg.message=="E1002"){
    //                var id=  setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //                        },
    //                        success: function(msg){
    //                            if(msg.message!="E1002"){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                window.clearInterval(id);
    //                            }
    //                            else{
    //
    //                            }
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //            else{
    //                var _totalCount= msg.data.totalCount;
    //
    //                setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        ////async: false,
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //
    //                        },
    //                        success: function(msg){
    //                            if(_totalCount!=msg.data.totalCount){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                _totalCount= msg.data.totalCount;
    //                            }
    //
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //        }
    //    })
    //
    //}
    //else if ("FF" == mb) {
    //    $.ajax({
    //        url:$ip+"admin/equipment/page/"+"8/1",
    //        dataType: "json",
    //        type: "POST",
    //        data: {'status':2},
    //        beforeSend: function(xhr){
    //            xhr.setRequestHeader('token', $.cookie('token'));
    //        },
    //        error:function(msg){
    //            console.log('请求出错');
    //        },
    //        success:function(msg){
    //            if(msg.message=="E1002"){
    //                var id=  setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //                        },
    //                        success: function(msg){
    //                            if(msg.message!="E1002"){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                window.clearInterval(id);
    //                            }
    //                            else{
    //
    //                            }
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //            else{
    //                var _totalCount= msg.data.totalCount;
    //
    //                setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        ////async: false,
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //
    //                        },
    //                        success: function(msg){
    //                            if(_totalCount!=msg.data.totalCount){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                _totalCount= msg.data.totalCount;
    //                            }
    //
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //        }
    //    })
    //}
    //else if ("Chrome" == mb) {
    //    $.ajax({
    //        url:$ip+"admin/equipment/page/"+"8/1",
    //        dataType: "json",
    //        type: "POST",
    //        data: {'status':2},
    //        beforeSend: function(xhr){
    //            xhr.setRequestHeader('token', $.cookie('token'));
    //        },
    //        error:function(msg){
    //            console.log('请求出错');
    //        },
    //        success:function(msg){
    //            if(msg.message=="E1002"){
    //                var id=  setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //                        },
    //                        success: function(msg){
    //                            if(msg.message!="E1002"){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                window.clearInterval(id);
    //                            }
    //                            else{
    //
    //                            }
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //            else{
    //                var _totalCount= msg.data.totalCount;
    //
    //                setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        ////async: false,
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //
    //                        },
    //                        success: function(msg){
    //                            if(_totalCount!=msg.data.totalCount){
    //                                if (window.Notification) {
    //                                    var button = document.getElementById('button'), text = document.getElementById('text');
    //
    //                                    var popNotice = function() {
    //                                        if (Notification.permission == "granted") {
    //                                            var notification = new Notification("用户,您好", {
    //                                                body: '收到一条新的井盖异常信息,点击查看',
    //                                                icon: 'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg',
    //                                                requireInteraction:true
    //                                            });
    //
    //                                            notification.onclick = function() {
    //                                                window.location.href="./fix.html";
    //                                                notification.close();
    //                                            };
    //                                        }
    //                                    };
    //                                    if (Notification.permission == "granted") {
    //                                        popNotice();
    //                                    } else if (Notification.permission != "denied") {
    //                                        Notification.requestPermission(function (permission) {
    //                                            popNotice();
    //                                        });
    //                                    }
    //
    //                                }
    //                                else {
    //                                        if(confirm("收到新的异常信息，是否立即查看")){
    //                                            window.location.href="./fix.html";
    //                                        }
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                _totalCount= msg.data.totalCount;
    //                            }
    //
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //        }
    //    })
    //}
    //else if ("Opera" == mb) {
    //    $.ajax({
    //        url:$ip+"admin/equipment/page/"+"8/1",
    //        dataType: "json",
    //        type: "POST",
    //        data: {'status':2},
    //        beforeSend: function(xhr){
    //            xhr.setRequestHeader('token', $.cookie('token'));
    //        },
    //        error:function(msg){
    //            console.log('请求出错');
    //        },
    //        success:function(msg){
    //            if(msg.message=="E1002"){
    //                var id=  setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //                        },
    //                        success: function(msg){
    //                            if(msg.message!="E1002"){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                window.clearInterval(id);
    //                            }
    //                            else{
    //
    //                            }
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //            else{
    //                var _totalCount= msg.data.totalCount;
    //
    //                setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        ////async: false,
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //
    //                        },
    //                        success: function(msg){
    //                            if(_totalCount!=msg.data.totalCount){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                _totalCount= msg.data.totalCount;
    //                            }
    //
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //        }
    //    })
    //}
    // else if ("Safari" == mb) {
    //    $.ajax({
    //        url:$ip+"admin/equipment/page/"+"8/1",
    //        dataType: "json",
    //        type: "POST",
    //        data: {'status':2},
    //        beforeSend: function(xhr){
    //            xhr.setRequestHeader('token', $.cookie('token'));
    //        },
    //        error:function(msg){
    //            console.log('请求出错');
    //        },
    //        success:function(msg){
    //            if(msg.message=="E1002"){
    //                var id=  setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //                        },
    //                        success: function(msg){
    //                            if(msg.message!="E1002"){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                window.clearInterval(id);
    //                            }
    //                            else{
    //
    //                            }
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //            else{
    //                var _totalCount= msg.data.totalCount;
    //
    //                setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        ////async: false,
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //
    //                        },
    //                        success: function(msg){
    //                            if(_totalCount!=msg.data.totalCount){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                _totalCount= msg.data.totalCount;
    //                            }
    //
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //        }
    //    })
    //}
    //else {
    //    $.ajax({
    //        url:$ip+"admin/equipment/page/"+"8/1",
    //        dataType: "json",
    //        type: "POST",
    //        data: {'status':2},
    //        beforeSend: function(xhr){
    //            xhr.setRequestHeader('token', $.cookie('token'));
    //        },
    //        error:function(msg){
    //            console.log('请求出错');
    //        },
    //        success:function(msg){
    //            if(msg.message=="E1002"){
    //                var id=  setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //                        },
    //                        success: function(msg){
    //                            if(msg.message!="E1002"){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                window.clearInterval(id);
    //                            }
    //                            else{
    //
    //                            }
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //            else{
    //                var _totalCount= msg.data.totalCount;
    //
    //                setInterval(function(){
    //                    $.ajax({
    //                        url:$ip+"admin/equipment/page/"+"8/1",
    //                        dataType: "json",
    //                        type: "POST",
    //                        data: {'status':2},
    //                        ////async: false,
    //                        beforeSend: function(xhr){
    //                            xhr.setRequestHeader('token', $.cookie('token'));
    //                        },
    //                        error:function(msg){
    //                            console.log('请求出错');
    //
    //                        },
    //                        success: function(msg){
    //                            if(_totalCount!=msg.data.totalCount){
    //                                if(confirm("收到新的异常信息，是否立即查看")){
    //                                    window.location.href="./fix.html";
    //                                }
    //                                //alert("收到新的井盖异常信息，请查看");
    //                                _totalCount= msg.data.totalCount;
    //                            }
    //
    //
    //                        }
    //                    })
    //                },10000)
    //            }
    //        }
    //    })
    //}



})