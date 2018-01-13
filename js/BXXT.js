/**
 * Created by Administrator on 2017/9/4.
 */

$(function(){
    //var $ip="http://192.168.0.110:8080/Manholecover/";
    //var token= $.cookie("token");
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
                    html+="<li class='curt'><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/fix_icon.png'/>"+msg.data[i].description+"</a></li>";
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
//--------------------加载页面数据-------------------------------
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
        success:function(msg){
            console.log(msg);
//-----------------------------如果列表为空------------------------------------
            if(msg.message=="E1002"){
                var _html=[];
                _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>暂无异常井盖信息</h1>";
                $(".YC-data").html(_html);
                //查询是否有新的信息进入
                //setInterval(function(){
                //    $.ajax({
                //        url:$ip+"admin/equipment/page/"+"8/1",
                //        dataType: "json",
                //        type: "POST",
                //        data: {'status':2},
                //        ////async: false,
                //        beforeSend: function(xhr){
                //            xhr.setRequestHeader('token', $.cookie('token'));
                //        },
                //        error:function(msg){
                //            console.log('请求出错');
                //        },
                //        success: function(msg){
                //        if(msg.message!="E1002"){
                //            console.log(msg);
                //            var ddd=msg.data.list;
                //            var page=msg.data.totalPage;
                //            var totalCount=msg.data.totalCount;
                //            var html=[];
                //            for(var i=0,len=ddd.length; i<len; i++){
                //                html+="<div class=BX-content>";
                //                html+="<div class=bxxt clearfix>";
                //                html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                //                html+="<p>"+ddd[i].imei+"</p>";
                //                if(ddd[i].status=="2"){
                //                    ddd[i].status="异常";
                //                }
                //                else if(ddd[i].status=="1"){
                //                    ddd[i].status="正常";
                //                }
                //                html+="<p>"+ddd[i].status+"</p>";
                //                html+="<p>"+ddd[i].realname+"</p>";
                //                html+="<p>"+ddd[i].phone+"</p>";
                //                if(ddd[i].signals>19){
                //                    html+="<p>";
                //                    html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                //                    html+="</p>";
                //                }
                //                else if(ddd[i].signals<20&&ddd[i].signals>14){
                //                    html+="<p>";
                //                    html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                //                    html+="</p>";
                //                }
                //                else if(ddd[i].signals<15){
                //                    if(ddd[i].signals<10){
                //                        html+="<p>";
                //                        html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >0"+ddd[i].signals+"</span>";
                //                        html+="</p>";
                //                    }
                //                    else {
                //                        html+="<p>";
                //                        html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                //                        html+="</p>";
                //                    }
                //
                //                }
                //                else {
                //                    html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                //                }
                //                if(ddd[i].electricity>20){
                //                    html+="<p>"+ddd[i].electricity+"%</p>";
                //                }
                //                else {
                //                    html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                //                }
                //                html+="<p>"+ddd[i].repaircount+"</p>";
                //                html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-Do HH:mm:ss')+"</p>";
                //                html+="<p>"+ddd[i].count+"</p>";
                //                html+="<span class='btn-more'>";
                //                html+="<button class='detailed'>详细</button>";
                //                html+="<button class='del-b'>已维修</button>";
                //                html+="</span>";
                //                html+="</div>";
                //                html+="</div>";
                //            }
                //
                //            $(".YC-data").html(html);
                //            xiangxi()
                //
                //
                //            //------------------------------------------------轮询--------------------------------------------------
                //            setInterval(function(){
                //                $.ajax({
                //                    url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
                //                    dataType: "json",
                //                    type: "POST",
                //                    data: {'status':2},
                //                    ////async: false,
                //                    beforeSend: function(xhr){
                //                        xhr.setRequestHeader('token', $.cookie('token'));
                //                    },
                //                    error:function(msg){
                //                        console.log('请求出错');
                //                    },
                //                    success: function(msg){
                //                        if(totalCount!=msg.data.totalCount){
                //                            alert("异常数据发生更变");
                //                            totalCount=msg.data.totalCount;
                //                            page=msg.data.totalPage;
                //                            var ddd=msg.data.list;
                //                            page=msg.data.totalPage;
                //                            var html=[];
                //                            for(var i=0,len=ddd.length; i<len; i++){
                //                                html+="<div class=BX-content>";
                //                                html+="<div class=bxxt clearfix>";
                //                                html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                //                                html+="<p>"+ddd[i].imei+"</p>";
                //                                if(ddd[i].status=="2"){
                //                                    ddd[i].status="异常";
                //                                }
                //                                else if(ddd[i].status=="1"){
                //                                    ddd[i].status="正常";
                //                                }
                //                                html+="<p>"+ddd[i].status+"</p>";
                //                                html+="<p>"+ddd[i].realname+"</p>";
                //                                html+="<p>"+ddd[i].phone+"</p>";
                //                                if(ddd[i].signals>19){
                //                                    html+="<p>";
                //                                    html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                //                                    html+="</p>";
                //                                }
                //                                else if(ddd[i].signals<20&&ddd[i].signals>14){
                //                                    html+="<p>";
                //                                    html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                //                                    html+="</p>";
                //                                }
                //                                else if(ddd[i].signals<15){
                //                                    if(ddd[i].signals<10){
                //                                        html+="<p>";
                //                                        html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                //                                        html+="</p>";
                //                                    }
                //                                    else {
                //                                        html+="<p>";
                //                                        html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                //                                        html+="</p>";
                //                                    }
                //
                //                                }
                //                                else {
                //                                    html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                //                                }
                //
                //
                //                                if(ddd[i].electricity>20){
                //                                    html+="<p>"+ddd[i].electricity+"%</p>";
                //                                }
                //                                else {
                //                                    html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                //                                }
                //                                html+="<p>"+ddd[i].repaircount+"</p>";
                //                                html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-Do HH:mm:ss')+"</p>";
                //                                html+="<p>"+ddd[i].count+"</p>";
                //                                html+="<span class='btn-more'>";
                //                                html+="<button class='detailed'>详细</button>";
                //                                html+="<button class='del-b'>已维修</button>";
                //                                html+="</span>";
                //                                html+="</div>";
                //                                html+="</div>";
                //                            }
                //
                //                            $(".YC-data").html(html);
                //                            xiangxi()
                //                        }
                //                        //console.log(page);
                //
                //                    }
                //                })
                //            },10000)
                //
                //
                //            //----------————————————-----------点击删除------------------------————————----------
                //            $(".del-b").on("click", function(){
                //                var delid = $(this).parent().siblings("p").eq(0).html();
                //                console.log($(this).parent().siblings("p").eq(0).html());
                //                $.ajax({
                //                    url:$ip+"admin/equipment/updateStatus",
                //                    data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                //                    datatype:"json",
                //                    type: "POST",
                //                    //async: false,
                //                    error:function(msg){
                //                        console.log('请求出错');
                //                    },
                //                    success:function(msg){
                //                        alert("操作成功");
                //                        setTimeout(function(){
                //                            window.location.reload();
                //                        },200)
                //                    }
                //
                //                })
                //            })
                //            var ms = {
                //                init:function(obj,args){
                //                    return (function(){
                //                        ms.fillHtml(obj,args);
                //                        ms.bindEvent(obj,args);
                //                    })();
                //                },
                //                //填充html
                //                fillHtml:function(obj,args){
                //                    return (function(){
                //                        obj.empty();
                //                        //上一页
                //                        if(args.current > 1){
                //                            obj.append('<a href="javascript:;" class="prevPage"><上一页</a>');
                //                        }else{
                //                            obj.remove('.prevPage');
                //                            obj.append('<span class="disabled"><上一页</span>');
                //                        }
                //                        //中间页码
                //                        if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                //                            obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
                //                        }
                //                        if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                //                            obj.append('<span>...</span>');
                //                        }
                //                        var start = args.current -2,end = args.current+2;
                //                        if((start > 1 && args.current < 4)||args.current == 1){
                //                            end++;
                //                        }
                //                        if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                //                            start--;
                //                        }
                //                        for (;start <= end; start++) {
                //                            if(start <= args.pageCount && start >= 1){
                //                                if(start != args.current){
                //                                    obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
                //                                }else{
                //                                    obj.append('<span class="current">'+ start +'</span>');
                //                                }
                //                            }
                //                        }
                //                        if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                //                            obj.append('<span>...</span>');
                //                        }
                //                        if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                //                            obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
                //                        }
                //                        //下一页
                //                        if(args.current < args.pageCount){
                //                            obj.append('<a href="javascript:;" class="nextPage">下一页></a>');
                //                        }else{
                //                            obj.remove('.nextPage');
                //                            obj.append('<span class="disabled">下一页></span>');
                //                        }
                //                        obj.append('<span class="pagecount">共'+args.pageCount+'页</span>');
                //                        //跳转页码
                //                        if(args.turndown == 'true'){
                //                            obj.append('<span class="countYe">到第<input type="text" maxlength='+args.pageCount.toString().length+'>页<a href="javascript:;" class="turndown">确定</a><span>');
                //                        }
                //                    })();
                //                },
                //                //绑定事件
                //                bindEvent:function(obj,args){
                //                    return (function(){
                //                        obj.on("click","a.tcdNumber",function(){
                //                            var current = parseInt($(this).text());
                //                            ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount,"turndown":args.turndown});
                //                            if(typeof(args.backFn)=="function"){
                //                                args.backFn(current);
                //                            }
                //                            //console.log(this.innerText);
                //                            //——————————————————————————分页跳转————————————————————
                //                            loading();
                //
                //                        });
                //                        //上一页
                //                        obj.on("click","a.prevPage",function(){
                //                            var current = parseInt(obj.children("span.current").text());
                //                            ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount,"turndown":args.turndown});
                //                            if(typeof(args.backFn)=="function"){
                //                                args.backFn(current-1);
                //                            }
                //                            loading();
                //                        });
                //                        //下一页
                //                        obj.on("click","a.nextPage",function(){
                //                            var current = parseInt(obj.children("span.current").text());
                //                            ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount,"turndown":args.turndown});
                //                            if(typeof(args.backFn)=="function"){
                //                                args.backFn(current+1);
                //                            }
                //                            loading();
                //                        });
                //                        //跳转
                //                        obj.on("click","a.turndown",function(){
                //                            var page = $("span.countYe input").val();
                //                            if(page>args.pageCount){
                //                                alert("您的输入有误，请重新输入！");
                //                            }
                //                            ms.fillHtml(obj,{"current":page,"pageCount":args.pageCount,"turndown":args.turndown});
                //                            /*if(typeof(args.backFn)=="function"){
                //                             args.backFn(current+1);
                //                             }*/
                //                            loading();
                //                        });
                //                    })();
                //                }
                //            }
                //            $.fn.createPage = function(options){
                //                var args = $.extend({
                //                    pageCount : 10,
                //                    current : 1,
                //                    turndown:true,
                //                    backFn : function(){}
                //                },options);
                //                ms.init(this,args);
                //            }
                //
                //            $(".pageDiv").createPage({
                //                pageCount:page,//总页数
                //                current:1,//当前页
                //                turndown:'true',//是否显示跳转框，显示为true，不现实为false,一定记得加上引号...
                //                backFn:function(p){
                //
                //                }
                //            });
                //        }
                //            else {
                //            console.log(1);
                //        }
                //        }
                //    })
                //},10000)
            }
            //获取渲染交互信息
            else{

                var ddd=msg.data.list;
                var page=msg.data.totalPage;
                var totalCount=msg.data.totalCount;
                var html=[];
                for(var i=0,len=ddd.length; i<len; i++){
                    html+="<div class=BX-content>";
                    html+="<div class=bxxt clearfix>";
                    html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                    html+="<p>"+ddd[i].imei+"</p>";
                    if(ddd[i].status=="2"){
                        ddd[i].status="异常";
                    }
                    else if(ddd[i].status=="1"){
                        ddd[i].status="正常";
                    }
                    html+="<p>"+ddd[i].status+"</p>";
                    html+="<p>"+ddd[i].realname+"</p>";
                    html+="<p>"+ddd[i].phone+"</p>";
                    if(ddd[i].signals>19){
                        html+="<p>";
                        html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                        html+="</p>";
                    }
                    else if(ddd[i].signals<20&&ddd[i].signals>14){
                        html+="<p>";
                        html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                        html+="</p>";
                    }
                    else if(ddd[i].signals<15){
                        if(ddd[i].signals<10){
                            html+="<p>";
                            html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                            html+="</p>";
                        }
                        else {
                            html+="<p>";
                            html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                            html+="</p>";
                        }

                    }
                    else {
                        html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                    }


                    if(ddd[i].electricity>20){
                        html+="<p>"+ddd[i].electricity+"%</p>";
                    }
                    else {
                        html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                    }
                    html+="<p>"+ddd[i].repaircount+"</p>";
                    html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-DD HH:mm:ss')+"</p>";
                    html+="<p>"+ddd[i].count+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='detailed'>详细</button>";
                    html+="<button class='del-b'>已维修</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }

                $(".YC-data").html(html);
                $(".del-b").on("click", function(){
                    var delid = $(this).parent().siblings("p").eq(0).html();
                    console.log($(this).parent().siblings("p").eq(0).html());
                    $.ajax({
                        url:$ip+"admin/equipment/updateStatus",
                        data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                        datatype:"json",
                        type: "POST",
                        //async: false,
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('token', $.cookie('token'));
                        },
                        error:function(msg){
                            console.log('请求出错');
                        },
                        success:function(msg){
                            alert("操作成功");

                            setTimeout(function(){
                                window.location.reload();
                            },200)
                        }

                    })
                })
                xiangxi()

                //------------------------------------------------轮询--------------------------------------------------
                //setInterval(function(){
                //    $.ajax({
                //        url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
                //
                //        dataType: "json",
                //        type: "POST",
                //        data: {'status':2},
                //        ////async: false,
                //        beforeSend: function(xhr){
                //            xhr.setRequestHeader('token', $.cookie('token'));
                //        },
                //        error:function(msg){
                //            console.log('请求出错');
                //        },
                //        success: function(msg){
                //            if(totalCount!=msg.data.totalCount){
                //                alert("异常数据发生更变");
                //                totalCount=msg.data.totalCount;
                //                page=msg.data.totalPage;
                //                var ddd=msg.data.list;
                //                page=msg.data.totalPage;
                //                var html=[];
                //                for(var i=0,len=ddd.length; i<len; i++){
                //                    html+="<div class=BX-content>";
                //                    html+="<div class=bxxt clearfix>";
                //                    html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                //                    html+="<p>"+ddd[i].imei+"</p>";
                //                    if(ddd[i].status=="2"){
                //                        ddd[i].status="异常";
                //                    }
                //                    else if(ddd[i].status=="1"){
                //                        ddd[i].status="正常";
                //                    }
                //                    html+="<p>"+ddd[i].status+"</p>";
                //                    html+="<p>"+ddd[i].realname+"</p>";
                //                    html+="<p>"+ddd[i].phone+"</p>";
                //                    if(ddd[i].signals>19){
                //                        html+="<p>";
                //                        html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                //                        html+="</p>";
                //                    }
                //                    else if(ddd[i].signals<20&&ddd[i].signals>14){
                //                        html+="<p>";
                //                        html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                //                        html+="</p>";
                //                    }
                //                    else if(ddd[i].signals<15){
                //                        if(ddd[i].signals<10){
                //                            html+="<p>";
                //                            html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >0"+ddd[i].signals+"</span>";
                //                            html+="</p>";
                //                        }
                //                        else {
                //                            html+="<p>";
                //                            html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                //                            html+="</p>";
                //                        }
                //
                //                    }
                //                    else {
                //                        html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                //                    }
                //                    if(ddd[i].electricity>20){
                //                        html+="<p>"+ddd[i].electricity+"%</p>";
                //                    }
                //                    else {
                //                        html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                //                    }
                //                    html+="<p>"+ddd[i].repaircount+"</p>";
                //                    html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-Do HH:mm:ss')+"</p>";
                //                    html+="<p>"+ddd[i].count+"</p>";
                //                    html+="<span class='btn-more'>";
                //                    html+="<button class='detailed'>详细</button>";
                //                    html+="<button class='del-b'>已维修</button>";
                //                    html+="</span>";
                //                    html+="</div>";
                //                    html+="</div>";
                //                }
                //
                //                $(".YC-data").html(html);
                //                $(".del-b").on("click", function(){
                //                    var delid = $(this).parent().siblings("p").eq(0).html();
                //                    console.log($(this).parent().siblings("p").eq(0).html());
                //                    $.ajax({
                //                        url:$ip+"admin/equipment/updateStatus",
                //                        data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                //                        datatype:"json",
                //                        type: "POST",
                //                        //async: false,
                //                        error:function(msg){
                //                            console.log('请求出错');
                //                        },
                //                        success:function(msg){
                //                            alert("删除成功");
                //                            setTimeout(function(){
                //                                window.location.reload();
                //                            },200)
                //                        }
                //
                //                    })
                //                })
                //                xiangxi()
                //            }
                //            //console.log(page);
                //
                //        }
                //    })
                //},10000)


                //----------————————————-----------点击删除------------------------————————----------
                //$(".del-b").on("click", function(){
                //    var delid = $(this).parent().siblings("p").eq(0).html();
                //    console.log($(this).parent().siblings("p").eq(0).html());
                //    $.ajax({
                //        url:$ip+"admin/equipment/updateStatus",
                //        data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                //        datatype:"json",
                //        type: "POST",
                //        //async: false,
                //        error:function(msg){
                //            console.log('请求出错');
                //        },
                //        success:function(msg){
                //            alert("删除成功");
                //            setTimeout(function(){
                //                window.location.reload();
                //            },200)
                //        }
                //
                //    })
                //})
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
                    bindEvent:function(obj,args){
                        return (function(){
                            obj.on("click","a.tcdNumber",function(){
                                var current = parseInt($(this).text());
                                ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount,"turndown":args.turndown});
                                if(typeof(args.backFn)=="function"){
                                    args.backFn(current);
                                }
                                //console.log(this.innerText);
                                //——————————————————————————分页跳转————————————————————
                                loading();

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
  //  -----————————————数据交互方法——————————————--------
  function loading(){
      $.ajax({
          url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
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
          success:function(msg){
              var ddd=msg.data.list;
              var page=msg.data.totalPage;
              var html=[];
              for(var i=0,len=ddd.length; i<len; i++){
                  html+="<div class=BX-content>";
                  html+="<div class=bxxt clearfix>";
                  html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                  html+="<p>"+ddd[i].imei+"</p>";
                  if(ddd[i].status=="2"){
                      ddd[i].status="异常";
                  }
                  else if(ddd[i].status=="1"){
                      ddd[i].status="正常";
                  }
                  html+="<p>"+ddd[i].status+"</p>";
                  html+="<p>"+ddd[i].realname+"</p>";
                  html+="<p>"+ddd[i].phone+"</p>";
                  if(ddd[i].signals>19){
                      html+="<p>";
                      html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                      html+="</p>";
                  }
                  else if(ddd[i].signals<20&&ddd[i].signals>14){
                      html+="<p>";
                      html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                      html+="</p>";
                  }
                  else if(ddd[i].signals<15){
                      if(ddd[i].signals<10){
                          html+="<p>";
                          html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                          html+="</p>";
                      }
                      else {
                          html+="<p>";
                          html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                          html+="</p>";
                      }

                  }
                  else {
                      html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                  }
                  if(ddd[i].electricity>20){
                      html+="<p>"+ddd[i].electricity+"%</p>";
                  }
                  else {
                      html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                  }
                  html+="<p>"+ddd[i].repaircount+"</p>";
                  html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-DD HH:mm:ss')+"</p>";
                  html+="<p>"+ddd[i].count+"</p>";
                  html+="<span class='btn-more'>";
                  html+="<button class='detailed'>详细</button>";
                  html+="<button class='del-b'>已维修</button>";
                  html+="</span>";
                  html+="</div>";
                  html+="</div>";
              }

              $(".YC-data").html(html);
              $(".del-b").on("click", function(){
                  var delid = $(this).parent().siblings("p").eq(0).html();
                  console.log($(this).parent().siblings("p").eq(0).html());
                  $.ajax({
                      url:$ip+"admin/equipment/updateStatus",
                      data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                      datatype:"json",
                      type: "POST",
                      //async: false,
                      error:function(msg){
                          console.log('请求出错');
                      },
                      success:function(msg){
                          alert("删除成功");
                          setTimeout(function(){
                              window.location.reload();
                          },200)
                      }

                  })
              })
              xiangxi()
          }
      })
  }
    //-----------------------------------------------搜索--------------------------------------------------
    $("#yc-click").on("click", function(){
        keyword();

    });

    // 回车提交搜索
    $("#shuID").keydown(function(e) {
        // console.log($(this).val().length);
        if ($(this).val().length > 0) {
            if(e.keyCode == 13) {
                keyword();
            }
        }
    });
    function keyword(){
        $.ajax({
            url:$ip+"admin/equipment/page/"+"8/1",
            dataType: "json",
            type: "POST",
            data:{'keyword':$("#shuID").val(),'status':2},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
                console.log('请求出错');
            },
            success:function(msg){
                console.log(msg);
                if(msg.message=="E1002"){
                    var _html=[];
                    _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>无您搜索的井盖信息</h1>";
                    $(".YC-data").html(_html);
                }
                else{
                    page=msg.data.totalPage;
                    console.log(page);
                    var ddd=msg.data.list;
                    var page=msg.data.totalPage;
                    var html=[];
                    for(var i=0,len=ddd.length; i<len; i++){
                        html+="<div class=BX-content>";
                        html+="<div class=bxxt clearfix>";
                        html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                        html+="<p>"+ddd[i].imei+"</p>";
                        if(ddd[i].status=="2"){
                            ddd[i].status="异常";
                        }
                        else if(ddd[i].status=="1"){
                            ddd[i].status="正常";
                        }
                        html+="<p>"+ddd[i].status+"</p>";
                        html+="<p>"+ddd[i].realname+"</p>";
                        html+="<p>"+ddd[i].phone+"</p>";
                        if(ddd[i].signals>19){
                            html+="<p>";
                            html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                            html+="</p>";
                        }
                        else if(ddd[i].signals<20&&ddd[i].signals>14){
                            html+="<p>";
                            html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                            html+="</p>";
                        }
                        else if(ddd[i].signals<15){
                            if(ddd[i].signals<10){
                                html+="<p>";
                                html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                                html+="</p>";
                            }
                            else {
                                html+="<p>";
                                html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                                html+="</p>";
                            }

                        }
                        else {
                            html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                        }
                        if(ddd[i].electricity>20){
                            html+="<p>"+ddd[i].electricity+"%</p>";
                        }
                        else {
                            html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                        }
                        html+="<p>"+ddd[i].repaircount+"</p>";
                        html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-DD HH:mm:ss')+"</p>";
                        html+="<p>"+ddd[i].count+"</p>";
                        html+="<span class='btn-more'>";
                        html+="<button class='detailed'>详细</button>";
                        html+="<button class='del-b'>已维修</button>";
                        html+="</span>";
                        html+="</div>";
                        html+="</div>";
                    }

                    $(".YC-data").html(html);
                    $(".del-b").on("click", function(){
                        var delid = $(this).parent().siblings("p").eq(0).html();
                        console.log($(this).parent().siblings("p").eq(0).html());
                        $.ajax({
                            url:$ip+"admin/equipment/updateStatus",
                            data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                            datatype:"json",
                            type: "POST",
                            //async: false,
                            error:function(msg){
                                console.log('请求出错');
                            },
                            success:function(msg){
                                alert("操作成功");
                                setTimeout(function(){
                                    window.location.reload();
                                },200)
                            }

                        })
                    })
                    xiangxi()
                }
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
                                if(!r.test(page) || page > args.pageCount || page==0){
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
        })

    }
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
    function soft(i){
        $.ajax({
            url:$ip+"admin/equipment/page/"+"8/"+$(".current").text(),
            dataType: "json",
            type: "POST",
            data:{'sort':i,'status':2},
            ////async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error:function(msg){
                console.log('请求出错');
            },
            success:function(msg){
                var ddd=msg.data.list;
                var page=msg.data.totalPage;
                var totalCount=msg.data.totalCount;
                var html=[];
                for(var i=0,len=ddd.length; i<len; i++){
                    html+="<div class=BX-content>";
                    html+="<div class=bxxt clearfix>";
                    html+="<p class='bxid' style='text-indent:-50em;padding:0px;'>"+ddd[i].id+"</p>";
                    html+="<p>"+ddd[i].imei+"</p>";
                    if(ddd[i].status=="2"){
                        ddd[i].status="异常";
                    }
                    else if(ddd[i].status=="1"){
                        ddd[i].status="正常";
                    }
                    html+="<p>"+ddd[i].status+"</p>";
                    html+="<p>"+ddd[i].realname+"</p>";
                    html+="<p>"+ddd[i].phone+"</p>";
                    if(ddd[i].signals>19){
                        html+="<p>";
                        html+="<span style='border:2px solid green;color: green; line-height:25px;padding:2px'>"+ddd[i].signals+"</span>";
                        html+="</p>";
                    }
                    else if(ddd[i].signals<20&&ddd[i].signals>14){
                        html+="<p>";
                        html+="<span style='border:2px solid orange;color: orange; line-height:25px;padding:2px' >"+ddd[i].signals+"</span>";
                        html+="</p>";
                    }
                    else if(ddd[i].signals<15){
                        if(ddd[i].signals<10){
                            html+="<p>";
                            html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                            html+="</p>";
                        }
                        else {
                            html+="<p>";
                            html+="<span style='border:2px solid red;color: red; line-height:25px;padding:2px;' >"+ddd[i].signals+"</span>";
                            html+="</p>";
                        }

                    }
                    else {
                        html+="<p ><span style='border:2px solid #daa520;color: #daa520; line-height:25px;padding:2px' >"+ddd[i].signals+"</span></p>";
                    }


                    if(ddd[i].electricity>20){
                        html+="<p>"+ddd[i].electricity+"%</p>";
                    }
                    else {
                        html+="<p style='color: red;'>"+ddd[i].electricity+"%</p>";
                    }
                    html+="<p>"+ddd[i].repaircount+"</p>";
                    html+="<p>"+moment(ddd[i].lastAbnormalTime).format('YYYY-MM-DD HH:mm:ss') +"</p>";
                    html+="<p>"+ddd[i].count+"</p>";
                    html+="<span class='btn-more'>";
                    html+="<button class='detailed'>详细</button>";
                    html+="<button class='del-b'>已维修</button>";
                    html+="</span>";
                    html+="</div>";
                    html+="</div>";
                }

                $(".YC-data").html(html);
                $(".del-b").on("click", function(){
                    var delid = $(this).parent().siblings("p").eq(0).html();
                    console.log($(this).parent().siblings("p").eq(0).html());
                    $.ajax({
                        url:$ip+"admin/equipment/updateStatus",
                        data:{'eid':$(this).parent().siblings("p").eq(0).html()},
                        datatype:"json",
                        type: "POST",
                        //async: false,
                        error:function(msg){
                            console.log('请求出错');
                        },
                        success:function(msg){
                            alert("操作成功");
                            setTimeout(function(){
                                window.location.reload();
                            },200)
                        }

                    })
                })
                xiangxi();
            }
        })
    }
    //分页插件

    function xiangxi(){
        $(".detailed").on("click", function(){
            var YCid=$(this).parent().parent().find("p.bxid").text();
            sessionStorage.YCid=YCid;
            console.log(sessionStorage.Uid);
            layer.open({
                title:"异常列表详细",
                type: 2,
                shadeClose: true, //点击遮罩关闭
                area : ['800px' , '500px'],
                content: 'layout/abnormal.html'
            });
        })
    }


    //————————————————————WebSocket————————————————————————
//    function WebSocketTest()
//    {
//        if ("WebSocket" in window)
//        {
//            alert("您的浏览器支持 WebSocket!");
//
//            // 打开一个 web socket
//            var ws = new WebSocket("ws://192.168.0.107:9090/Manholecover/websocket?token="+ $.cookie('token'));
//            //var $ip="http://192.168.0.111:8080/Manholecover/";
//            //192.168.0.107:9090/Manholecover/websocket?token=asdf
//            ws.onopen = function()
//            {
//                // Web Socket 已连接上，使用 send() 方法发送数据
//                ws.send( $.cookie('token'));
//                alert("数据发送中...");
//            };
//
//            ws.onmessage = function (evt)
//            {
//                var received_msg = evt.data;
//                console.log(received_msg);
//                alert("数据已接收...");
//            };
//
//            ws.onclose = function()
//            {
//                // 关闭 websocket
//                alert("连接已关闭...");
//            };
//        }
//
//        else
//        {
//            // 浏览器不支持 WebSocket
//            alert("您的浏览器不支持 WebSocket!");
//        }
//    }
//    WebSocketTest()
})