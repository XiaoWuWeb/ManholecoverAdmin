/**
 * Created by Administrator on 2017/9/5.
 */
$(function(){
    // var $ip="http://119.23.32.115:11182/api";
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
                    html+="<li class='curt'><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/list_icon.png'/>"+msg.data[i].description+"</a></li>";
                }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="运维管理"){
                    html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/fix_icon.png'/>"+msg.data[i].description+"</a></li>";
                }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="人员管理"){
                    html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 8px 0;' src='images/person_icon.png'/>"+msg.data[i].description+"</a></li>";
                }else if(msg.data[i].fatherid=="0"&&msg.data[i].description=="智能管理"){
                    html+="<li><a target='_blank' href='"+msg.data[i].url+"'><img style='margin:0 22px 3px 0;' src='images/smart_icon.png'/>"+msg.data[i].description+"</a></li>";
                }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="回收站"){
                    html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 36px 2px 0;' src='images/reclaim_icon.png'/>"+msg.data[i].description+"</a></li>";
                }
            }
            $("#side-menu").html(html);
        }

    })
    var that = null;
    $.ajax({
        url:$ip+"admin/equipment/page/"+"8/1",
        //http://[<serverUrl>]/admin/equipment/page/{size}/{index}
        datatype:"json",
        type: "POST",
        //async: false,
		beforeSend: function(xhr){
            xhr.setRequestHeader('token', $.cookie('token'));
        },
        error: function(msg){
            console.log('请求出错');
        },
        success: function (msg){
            var ddd =JSON.parse(msg);
            var page=ddd.data.totalPage;
            var list=ddd.data.list;
            var Installtime=[];
            for(var i=0,len=list.length; i<len; i++){
                //Installtime.push(list[i].installtime.toString().substring(0,10));
                Installtime.push(list[i].installtime);
            }
            //console.log(Installtime[1].UnixToDate());
            var html=[];
            var jgcon=$(".JG-data");
            for(var i=0,len=list.length; i<len; i++){
                html+="<div class=LB-content>";
                html+="<div class='LB-style clearfix'>";
                html+="<p style='text-indent:-50em;padding:0px'>"+list[i].id+"</p>";
                html+="<p>"+list[i].imei+"</p>";
                html+="<p title='"+ list[i].provice+list[i].city+list[i].district+list[i].address +"'>"+list[i].provice+list[i].city+list[i].district+list[i].address+"</p>";
                if(list[i].status=="2"){
                    list[i].status="异常";
                }
                else if(list[i].status=="1"){
                    list[i].status="正常";
                }
                html+="<p class='judge'>"+list[i].status+"</p>";
                html+="<p>"+list[i].realname+"</p>";
                html+="<p>"+list[i].electricity+"%</p>";
                html+="<p>"+list[i].repaircount+"</p>";
                html+="<p>"+list[i].phone+"</p>";
                html+="<span class='btn-more'>";
                html+="<button class='xiangxi'>详细</button>";
                html+="<button class='del-b'>删除</button>";
                html+="</span>";
                html+="</div>";
                html+="</div>";
            }

            jgcon.html(html);
            xiangxi();
            JGdel();
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
                that = this;
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

    //-----------------------排序--------------------------

$("select").on("click", function(){
    if($(this).val()=="修理次数从多到少"){
        soft(1);
    }
    else if($(this).val()=="修理次数从少到多"){
        soft(2);
    }
    else if($(this).val()=="设备电量从少到多"){
        soft(4);
    }
    else if($(this).val()=="设备电量从多到少"){
        soft(3);
    }
})
    //----------------------搜索-----------------------------
    $(".jg-click").on("click", function(){

        keyword();

    })
   var soft= function(i){
        $.ajax({
            url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
            dataType: "json",
            type: "POST",
            data:{'sort':i},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
                console.log('请求出错');
            },
            success:function(msg){
                var list=msg.data.list;
                var html=[];
                var jgcon=$(".JG-data");
                for(var i=0,len=list.length; i<len; i++){
                    html+="<div class=LB-content>";
                    html+="<div class='LB-style clearfix'>";
                    html+="<p style='text-indent:-50em;padding:0px'>"+list[i].id+"</p>";
                    html+="<p>"+list[i].imei+"</p>";
                    html+="<p title='"+ list[i].provice+list[i].city+list[i].district+list[i].address +"'>"+list[i].provice+list[i].city+list[i].district+list[i].address+"</p>";
                    if(list[i].status=="2"){
                        list[i].status="异常";
                    }
                    else if(list[i].status=="1"){
                        list[i].status="正常";
                    }
                    html+="<p class='judge'>"+list[i].status+"</p>";
                    html+="<p>"+list[i].realname+"</p>";
                    html+="<p>"+list[i].electricity+"%</p>";
                    html+="<p>"+list[i].repaircount+"</p>";
                    html+="<p>"+list[i].phone+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='xiangxi'>详细</button>";
                    html+="<button class='del-b'>删除</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }

                jgcon.html(html);
                xiangxi();
                $(".del-b").on("click", function(){
                   if(confirm("你确定要删除此信息吗？")){
                       JGdel();
                   }

                })

            }
        })
    }
    function loading(){
        $.ajax({
            url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
            dataType: "json",
            type: "POST",

            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function (msg){
                console.log('请求出错');
            },
            success:function (msg){
                var list=msg.data.list;
                var html=[];
                var jgcon=$(".JG-data");
                for(var i=0,len=list.length; i<len; i++){
                    html+="<div class=LB-content>";
                    html+="<div class='LB-style clearfix'>";
                    html+="<p style='text-indent:-50em;padding:0px'>"+list[i].id+"</p>";
                    html+="<p>"+list[i].imei+"</p>";
                    html+="<p title='"+ list[i].provice+list[i].city+list[i].district+list[i].address +"'>"+list[i].provice+list[i].city+list[i].district+list[i].address+"</p>";
                    if(list[i].status=="2"){
                        list[i].status="异常";
                    }
                    else if(list[i].status=="1"){
                        list[i].status="正常";
                    }
                    html+="<p class='judge'>"+list[i].status+"</p>";
                    html+="<p>"+list[i].realname+"</p>";
                    html+="<p>"+list[i].electricity+"%</p>";
                    html+="<p>"+list[i].repaircount+"</p>";
                    html+="<p>"+list[i].phone+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='xiangxi'>详细</button>";
                    html+="<button class='del-b'>删除</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }

                jgcon.html(html);
                xiangxi();
                $(".del-b").on("click", function(){
                    if(confirm("你确定要删除此信息吗？")){
                        JGdel();
                    };

                })

            }
        })

    }

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
            url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
            dataType: "json",
            type: "POST",
            data:{'keyword':$("#shuID2").val()},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function (msg){
                console.log('请求出错');
            },
            success:function (msg){
                var list=msg.data.list;
                var html=[];
                var jgcon=$(".JG-data");
                for(var i=0,len=list.length; i<len; i++){
                    html+="<div class=LB-content>";
                    html+="<div class='LB-style clearfix'>";
                    html+="<p style='text-indent:-50em;padding:0px'>"+list[i].id+"</p>";
                    html+="<p>"+list[i].imei+"</p>";
                    html+="<p title='"+ list[i].provice+list[i].city+list[i].district+list[i].address +"'>"+list[i].provice+list[i].city+list[i].district+list[i].address+"</p>";
                    if(list[i].status=="2"){
                        list[i].status="异常";
                    }
                    else if(list[i].status=="1"){
                        list[i].status="正常";
                    }
                    html+="<p class='judge'>"+list[i].status+"</p>";
                    html+="<p>"+list[i].realname+"</p>";
                    html+="<p>"+list[i].electricity+"%</p>";
                    html+="<p>"+list[i].repaircount+"</p>";
                    html+="<p>"+list[i].phone+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='xiangxi'>详细</button>";
                    html+="<button class='del-b'>删除</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }

                jgcon.html(html);
                xiangxi();
                $(".del-b").on("click", function(){
                    if(confirm("你确定要删除此信息吗？")){
                        JGdel();
                    };

                })

            }
        })

    }
    function keyword(){
        $.ajax({
            url:$ip+"admin/equipment/page/"+"8/1",
            dataType: "json",
            type: "POST",
            data:{'keyword':$("#shuID2").val()},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
                console.log('请求出错');
            },
            success:function (msg){

              console.log(msg);
                if(msg.message=="E1002"){
                    var _html=[];
                    _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>无您搜索的井盖信息</h1>";
                    $(".JG-data").html(_html);
                }
                else{

                    page=msg.data.totalPage;
                    console.log(page);
                    var list=msg.data.list;
                    var html=[];
                    var jgcon=$(".JG-data");
                    for(var i=0,len=list.length; i<len; i++){
                        html+="<div class=LB-content>";
                        html+="<div class='LB-style clearfix'>";
                        html+="<p style='text-indent:-50em;padding:0px'>"+list[i].id+"</p>";
                        html+="<p>"+list[i].imei+"</p>";
                        html+="<p title='"+ list[i].provice+list[i].city+list[i].district+list[i].address +"'>"+list[i].provice+list[i].city+list[i].district+list[i].address+"</p>";
                        if(list[i].status=="2"){
                            list[i].status="异常";
                        }
                        else if(list[i].status=="1"){
                            list[i].status="正常";
                        }
                        html+="<p class='judge'>"+list[i].status+"</p>";
                        html+="<p>"+list[i].realname+"</p>";
                        html+="<p>"+list[i].electricity+"%</p>";
                        html+="<p>"+list[i].repaircount+"</p>";
                        html+="<p>"+list[i].phone+"</p>";
                        html+="<span class='btn-more'>";
                        html+="<button class='xiangxi'>详细</button>";
                        html+="<button class='del-b'>删除</button>";
                        html+="</span>";
                        html+="</div>";
                        html+="</div>";
                    }

                    jgcon.html(html);
                    xiangxi();
                    $(".del-b").on("click", function(){
                      if(confirm("你确定要删除此信息吗？")){
                            JGdel();
                      }

                    })

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
    function xiangxi(){
        $(".xiangxi").on("click", function(){
            var LBid=$(this).parent().siblings("p").eq(0).html();
            sessionStorage.LBid=LBid;
            layer.open({
                title:"井盖详细信息",
                type: 2,
                shadeClose: true, //点击遮罩关闭
                area : ['400px' , '280px'],
                content: 'layout/equipment.html',
                end: function () {
                    location.reload();
                }
            });

        })
    }
    function JGdel(){
        $(".del-b").on("click", function(){
            var LBid=$(this).parent().siblings("p").eq(0).html();
            if(confirm("你确定要删除此井盖信息吗？")){
                $.ajax({
                    url:$ip+"admin/equipment/delete/"+LBid,
                    dataType: "json",
                    type: "POST",
                    
                    success: function(msg){
                        if(msg.success==true){
                            alert("删除井盖数据成功")
                            window.location.reload();
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

        })
    }
    $(".tuisong").on("click",function(){
        //if(Notification.permission === 'granted'){
        //    console.log('用户允许通知');
        //}else if(Notification.permission === 'denied'){
        //    console.log('用户拒绝通知');
        //}else{
        //    console.log('用户还没选择，去向用户申请权限吧');
        //}
    })

})
