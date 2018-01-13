/**
 * Created by Administrator on 2017/10/25.
 */





$(function(){
    $.ajax({
    url:$ip+"/admin/privilege/selectByUid",
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
        console.log(msg)
        var html =[];
        for(var i=0,len=msg.data.length; i<len; i++){
            if(msg.data[i].fatherid=="0"&&msg.data[i].description =="平台总览"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/index_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="井盖总览"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/map_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="井盖列表"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/list_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="运维管理"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/fix_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="人员管理"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 8px 0;' src='images/person_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description=="智能管理"){
                html+="<li><a target='_blank' href='"+msg.data[i].url+"'><img style='margin:0 22px 3px 0;' src='images/smart_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="回收站"){
                html+="<li class='curt'><a href='"+msg.data[i].url+"'><img style='margin:0 36px 2px 0;' src='images/reclaim_icon.png'/>"+msg.data[i].description+"</a></li>";
            }
        }
        $("#side-menu").html(html);
    }

});


    
    $.ajax({
        url:$ip+"admin/recode/get/1/8",
        //http://[<serverUrl>]/admin/users/page/{size}/{index}
        datatype:"json",
        type: "get",
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', $.cookie('token'));
        },
        error:function(msg){
            console.log('请求出错');
        },
        success: function(msg){
            var ddd =JSON.parse(msg);
            console.log(ddd.data);
            if(ddd.data.totalCount==0){
                var _html=[];
                _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>暂无删除井盖信息</h1>";
                $(".YC-data").html(_html);
            }
            else{
                var page=ddd.data.totalPage;
                var html=[];
                for(var i=0,len=ddd.data.list.length; i<len; i++){
                    html+="<div class='BX-content'>";
                    html+="<div class='hsz'>";
                    html+="<p>"+ddd.data.list[i].id+"</p>";
                    html+="<p>"+ddd.data.list[i].imei+"</p>";
                    html+="<p>"+ddd.data.list[i].username+"</p>";
                    html+="<p>"+moment(ddd.data.list[i].time).format('YYYY-MM-DD HH:mm:ss')+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='del-h' style='background-color: #B3B3B3; margin-right: 60px;text-indent:0'>恢复</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }
                $(".YC-data").html(html);
                huifu();
                var ms = {
                    init:function(obj,args){
                        return (function(){
                            ms.fillHtml(obj,args);
                            ms.bindEvent(obj,args);
                        })();
                    },
                    //填充html
                    fillHtml:function(obj,args){
                        return (function(){
                            obj.empty();
                            //上一页
                            if(args.current > 1){
                                obj.append('<a href="javascript:;" class="prevPage"><上一页</a>');
                            }else{
                                obj.remove('.prevPage');
                                obj.append('<span class="disabled"><上一页</span>');
                            }
                            //中间页码
                            if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                                obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
                            }
                            if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                                obj.append('<span>...</span>');
                            }
                            var start = args.current -2,end = args.current+2;
                            if((start > 1 && args.current < 4)||args.current == 1){
                                end++;
                            }
                            if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                                start--;
                            }
                            for (;start <= end; start++) {
                                if(start <= args.pageCount && start >= 1){
                                    if(start != args.current){
                                        obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
                                    }else{
                                        obj.append('<span class="current">'+ start +'</span>');
                                    }
                                }
                            }
                            if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                                obj.append('<span>...</span>');
                            }
                            if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                                obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
                            }
                            //下一页
                            if(args.current < args.pageCount){
                                obj.append('<a href="javascript:;" class="nextPage">下一页></a>');
                            }else{
                                obj.remove('.nextPage');
                                obj.append('<span class="disabled">下一页></span>');
                            }
                            obj.append('<span class="pagecount">共'+args.pageCount+'页</span>');
                            //跳转页码
                            if(args.turndown == 'true'){
                                obj.append('<span class="countYe">到第<input type="text" maxlength='+args.pageCount.toString().length+'>页<a href="javascript:;" class="turndown">确定</a><span>');
                            }
                        })();
                    },
                    //绑定事件

                    //——————————————————————分页跳转————————————————————————
                    bindEvent:function(obj,args){
                        return (function(){
                            obj.on("click","a.tcdNumber",function(){
                                var current = parseInt($(this).text());
                                ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current);

                                    loading();
                                }
                            });
                            //上一页
                            obj.on("click","a.prevPage",function(){
                                var current = parseInt(obj.children("span.current").text());
                                ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current-1);
                                }
                                loading();
                            });
                            //下一页
                            obj.on("click","a.nextPage",function(){
                                var current = parseInt(obj.children("span.current").text());
                                ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current+1);
                                }
                                console.log($(".current").text())
                                loading();
                            });
                            //跳转
                            obj.on("click","a.turndown",function(){
                                var page = $("span.countYe input").val();
                                var r = /^\+?[1-9][0-9]*$/;　　//正整数
                                if(!r.test(page) || page > args.pageCount || page==0 ){
                                    alert("您的输入有误，请重新输入！");
                                    return
                                }
                                ms.fillHtml(obj,{"current":page,"pageCount":args.pageCount,"turndown":args.turndown});
                                /*if(typeof(args.backFn)=="function"){
                                 args.backFn(current+1);
                                 }*/
                                loading();
                            });
                        })();
                    }
                }
                $.fn.createPage = function(options){
                    var args = $.extend({
                        pageCount : 10,
                        current : 1,
                        turndown:true,
                        backFn : function(){}
                    },options);
                    ms.init(this,args);
                }

                $(".pageDiv").createPage({
                    pageCount:page,//总页数
                    current:1,//当前页
                    turndown:'true',//是否显示跳转框，显示为true，不现实为false,一定记得加上引号...
                    backFn:function(p){
                    }
                });
            }
        }
    })


    function loading(){
        $.ajax({
            url:$ip+"admin/recode/get/"+$(".current").text()+"/8",
            dataType: "json",
            type: "POST",
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
                console.log('请求出错');
            },
            success:function(msg){
                var page=msg.data.totalPage;
                var html=[];
                for(var i=0,len=msg.data.list.length; i<len; i++){
                    html+="<div class='BX-content'>";
                    html+="<div class='hsz'>";
                    html+="<p>"+msg.data.list[i].id+"</p>";
                    html+="<p>"+msg.data.list[i].imei+"</p>";
                    html+="<p>"+msg.data.list[i].username+"</p>";
                    html+="<p>"+msg.data.list[i].time+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='del-h'style='background-color: #B3B3B3; margin-right: 60px; text-indent:0'>恢复</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }
                $(".YC-data").html(html);
                huifu();
            }
        })
    }
    function huifu(){
        $(".del-h").on("click", function(){

            var BFid=$(this).parent().siblings("p").eq(0).html();
            if(confirm("确定要恢复这个报废井盖吗？")){
                $.ajax({
                    url:$ip+"admin/recode/recovery",
                    dataType: "json",
                    type: "POST",
                    data:{'id':BFid},
                    success: function(msg){
                        if(msg.success==true){
                            alert("恢复井盖成功!")
                            window.location.reload();
                        }
                        else
                        {
                            alert("恢复失败，请重试。");
                        }
                    },
                    beforeSend: function(xhr){
                        xhr.setRequestHeader('token', $.cookie('token'));
                    },
                    error:function(msg){
                        console.log('请求出错');
                    }
                })
            }

        });
    }

    // 搜索
    $(".jg-click").on("click", function(){
        keyword();
    })
    // 回车提交搜索
    $("#shuID2").keydown(function(e) {
        // console.log($(this).val().length);
        if ($(this).val().length > 0) {
            if(e.keyCode == 13) {
                keyword();
            }
        }
    });
    function keyword2(){
        $.ajax({
            url:$ip+"admin/recode/get/"+"8/"+$(".current").text(),
            dataType: "json",
            type: "POST",
            data:{'params':$("#shuID2").val()},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function (msg){
                console.log('请求出错');
            },
            success:function (msg){
                // var ddd =JSON.parse(msg);
                console.log(msg.data);
                if(msg.data.totalCount==0){
                    var _html=[];
                    _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>暂无删除井盖信息</h1>";
                    $(".YC-data").html(_html);
                }
                else{
                    var page=msg.data.totalPage;
                    var html=[];
                    for(var i=0,len=msg.data.list.length; i<len; i++){
                        html+="<div class='BX-content'>";
                        html+="<div class='hsz'>";
                        html+="<p>"+msg.data.list[i].id+"</p>";
                        html+="<p>"+msg.data.list[i].imei+"</p>";
                        html+="<p>"+msg.data.list[i].username+"</p>";
                        html+="<p>"+moment(msg.data.list[i].time).format('YYYY-MM-DD HH:mm:ss')+"</p>";
                        html+="<span class='btn-more'>";
                        html+="<button class='del-h' style='background-color: #B3B3B3; margin-right: 60px;text-indent:0'>恢复</button>";
                        html+="</span>";
                        html+="</div>";
                        html+="</div>";
                    }
                    $(".YC-data").html(html);
                    huifu();
                }
            }
        })

    }
    function keyword(){
        $.ajax({
            url:$ip+"admin/recode/get/"+"8/1",
            dataType: "json",
            type: "POST",
            data:{'params':$("#shuID2").val()},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
                console.log('请求出错');
            },
            success:function (msg){
                // var ddd =JSON.parse(msg);
                // console.log(msg);
                if(msg.message=="E1002"){
                    var _html=[];
                    _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>无您搜索的井盖信息</h1>";
                    $(".YC-data").html(_html);
                }
                else{
                    var page=msg.data.totalPage;
                    var html=[];
                    for(var i=0,len=msg.data.list.length; i<len; i++){
                        html+="<div class='BX-content'>";
                        html+="<div class='hsz'>";
                        html+="<p>"+msg.data.list[i].id+"</p>";
                        html+="<p>"+msg.data.list[i].imei+"</p>";
                        html+="<p>"+msg.data.list[i].username+"</p>";
                        html+="<p>"+moment(msg.data.list[i].time).format('YYYY-MM-DD HH:mm:ss')+"</p>";
                        html+="<span class='btn-more'>";
                        html+="<button class='del-h' style='background-color: #B3B3B3; margin-right: 60px;text-indent:0'>恢复</button>";
                        html+="</span>";
                        html+="</div>";
                        html+="</div>";
                    }
                    $(".YC-data").html(html);
                    huifu();

                }

                var ms = {
                    init:function(obj,args){
                        return (function(){
                            ms.fillHtml(obj,args);
                            ms.unbindEvent(obj,args);
                            ms.bindEvent(obj,args);
                        })();
                    },
                    //填充html
                    fillHtml:function(obj,args){
                        return (function(){
                            obj.empty();
                            //上一页
                            if(args.current > 1){
                                obj.append('<a href="javascript:;" class="prevPage"><上一页</a>');
                            }else{
                                obj.remove('.prevPage');
                                obj.append('<span class="disabled"><上一页</span>');
                            }
                            //中间页码
                            if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                                obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
                            }
                            if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                                obj.append('<span>...</span>');
                            }
                            var start = args.current -2,end = args.current+2;
                            if((start > 1 && args.current < 4)||args.current == 1){
                                end++;
                            }
                            if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                                start--;
                            }
                            for (;start <= end; start++) {
                                if(start <= args.pageCount && start >= 1){
                                    if(start != args.current){
                                        obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
                                    }else{
                                        obj.append('<span class="current">'+ start +'</span>');
                                    }
                                }
                            }
                            if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                                obj.append('<span>...</span>');
                            }
                            if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                                obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
                            }
                            //下一页
                            if(args.current < args.pageCount){
                                obj.append('<a href="javascript:;" class="nextPage">下一页></a>');
                            }else{
                                obj.remove('.nextPage');
                                obj.append('<span class="disabled">下一页></span>');
                            }
                            obj.append('<span class="pagecount">共'+args.pageCount+'页</span>');
                            //跳转页码
                            if(args.turndown == 'true'){
                                obj.append('<span class="countYe">到第<input type="text" maxlength='+args.pageCount.toString().length+'>页<a href="javascript:;" class="turndown">确定</a><span>');
                            }
                        })();
                    },
                    //绑定事件

                    //——————————————————————分页跳转————————————————————————
                    bindEvent:function(obj,args){
                        return (function(){
                            obj.on("click","a.tcdNumber",function(){
                                var current = parseInt($(this).text());
                                ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current);

                                    keyword2();
                                }
                            });
                            //上一页
                            obj.on("click","a.prevPage",function(){
                                var current = parseInt(obj.children("span.current").text());
                                ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current-1);
                                }
                                keyword2();
                            });
                            //下一页
                            obj.on("click","a.nextPage",function(){
                                var current = parseInt(obj.children("span.current").text());
                                ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current+1);
                                }
                                console.log($(".current").text())
                                keyword2();
                            });
                            //跳转
                            obj.on("click","a.turndown",function(){
                                var page = $("span.countYe input").val();
                                if(page>args.pageCount){
                                    alert("您的输入有误，请重新输入！");
                                }
                                ms.fillHtml(obj,{"current":page,"pageCount":args.pageCount,"turndown":args.turndown});
                                /*if(typeof(args.backFn)=="function"){
                                 args.backFn(current+1);
                                 }*/
                                keyword2();
                            });
                        })();
                    },
                    unbindEvent:function(obj,args){
                        return (function(){
                            obj.off("click","a.tcdNumber");
                            //上一页
                            obj.off("click","a.prevPage");
                            //下一页
                            obj.off("click","a.nextPage");
                            //跳转
                            obj.off("click","a.turndown");
                        })();
                    }
                }
                $.fn.createPage = function(options){
                    var args = $.extend({
                        pageCount : 10,
                        current : 1,
                        turndown:true,
                        backFn : function(){}
                    },options);
                    ms.init(this,args);
                }

                $(".pageDiv").createPage({
                    pageCount:page,//总页数
                    current:1,//当前页
                    turndown:'true',//是否显示跳转框，显示为true，不现实为false,一定记得加上引号...
                    backFn:function(p){

                    }
                });
            }
        })

    }
});