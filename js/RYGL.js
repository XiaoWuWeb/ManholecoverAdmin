//http://[<serverUrl>]/admin/roles/findAll



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
                html+="<li class='curt'><a href='"+msg.data[i].url+"'><img style='margin:0 22px 8px 0;' src='images/person_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description=="智能管理"){
                html+="<li><a target='_blank' href='"+msg.data[i].url+"'><img style='margin:0 22px 3px 0;' src='images/smart_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="回收站"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 36px 2px 0;' src='images/reclaim_icon.png'/>"+msg.data[i].description+"</a></li>";
            }
        }
        $("#side-menu").html(html);
    }

});

    //var $ip="http://192.168.0.110:8080/Manholecover/";
    $.ajax({
        url:$ip+"admin/users/page/8/1",
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
           var ddd=JSON.parse(msg);
           console.log(ddd);
           var data=ddd.data.list;
           var page =ddd.data.totalPage;
            var html=[]
            for(var i=0,len=data.length; i<len; i++){
                html+="<div class=BX-content>";
                html+="<div class=rygl clearfix>";
                html+="<p style='text-indent:-2000px; padding:0'>"+data[i].id+"</p>";
                html+="<p>"+(i+1)+"</p>";
                html+="<p>"+data[i].realname+"</p>";
                if(data[i].description==null){
                    data[i].description="还未分配角色";
                }
                html+="<p>"+data[i].description+"</p>";
                html+="<span class='btn-more'>";
                console.log(data[i].description);
                if(data[i].description=="还未分配角色"){
                    html+="<button class='changeID2'>分配角色</button>";
                }
                else{
                    html+="<button class='changeID'>修改</button>";
                }
                html+="<button class='del-b'>删除</button>";
                html+="</div>";
                html+="</span>";
                html+="</div>";
            }
            $(".YC-data").html(html);

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

            $(".changeID").on("click", function(){
                var RYid=$(this).parent().siblings("p").eq(0).html();
                sessionStorage.Uid=RYid;
                console.log(sessionStorage.Uid);
                    layer.open({
                        title:"修改用户角色权限",
                        type: 2,
                        shadeClose: true, //点击遮罩关闭
                        area : ['380px' , '220px'],
                        content: 'layout/changeID.html',
                        end: function () {
                            location.reload();
                        }
                    });

                //$.ajax({
                //    url:$ip+"admin/roles/updateROfU",
                //    data: {'rid':2,'uid':1},
                //    dataType:'json',
                //    beforeSend: function(xhr){
                //        xhr.setRequestHeader('token', $.cookie('token'));
                //    },
                //    error:function(msg){
                //        console.log('请求出错');
                //    },
                //    success: function(msg){
                //
                //    }
                //
                //})
            });
            $(".changeID2").on("click", function(){
                var RYid=$(this).parent().siblings("p").eq(0).html();
                sessionStorage.Uid=RYid;
                console.log(sessionStorage.Uid);
                layer.open({
                    title:"分配用户角色权限",
                    type: 2,
                    shadeClose: true, //点击遮罩关闭
                    area : ['380px' , '220px'],
                    content: 'layout/changeID2.html',
                    end: function () {
                        location.reload();
                    }
                });

            });
            $("#Role").on("click", function(){
                layer.open({
                    title:"角色管理",
                    type: 2,
                    shadeClose: true, //点击遮罩关闭
                    area : ['460px' , '620px'],
                    content: 'layout/role.html',
                    end: function () {
                        location.reload();
                    }
                });
            })
            $("#QXGL").on("click", function(){
                layer.open({
                    title:"权限管理",
                    type: 2,
                    shadeClose: true, //点击遮罩关闭
                    area : ['360px' , '320px'],
                    content: 'layout/QXGL.html',
                    end: function () {
                        location.reload();
                    }
                });
            })
            $(".del-b").on("click", function(){
                if(confirm("你确定要删除此信息吗？")){
                    $.ajax({
                        url:$ip+"admin/users/del",
                        datatype:"json",
                        type: "get",
                        data: {'id':$(this).parent().siblings("p").eq(0).html()},
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('token', $.cookie('token'));
                        },
                        error:function(msg){
                            console.log('请求出错');
                        },
                        success: function(msg){
                            var ddd =JSON.parse(msg);
                            console.log(ddd);
                           alert("删除用户成功");
                                window.location.reload();
                        }
                    })
                }

            });

        }
    });

    function loading(){
        $.ajax({
            url:$ip+"admin/users/page/8/"+ $(".current").text(),
            dataType : "json",
            type : "POST",

            ////async: false,
            beforeSend : function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            error : function(msg){
                console.log('请求出错');
            },
            success : function(msg){
                var data = msg.data.list;
                var page = msg.data.totalPage;
                console.log(page);
                var html = []
                for(var i = 0, len = data.length; i < len; i++){
                    html += "<div class=BX-content>";
                    html += "<div class=rygl clearfix>";
                    html += "<p style='text-indent:-2000px; padding:0'>" + data[i].id + "</p>";
                    html += "<p>" + i + "</p>";
                    html += "<p>" + data[i].realname + "</p>";
                    if(data[i].description == null){
                        data[i].description = "还未分配角色";
                    }
                    html += "<p>" + data[i].description + "</p>";
                    html += "<span class='btn-more'>";
                    console.log(data[i].description);
                    if(data[i].description == "还未分配角色"){
                        html += "<button class='changeID2'>分配角色</button>";
                    }
                    else {
                        html += "<button class='changeID'>修改</button>";
                    }
                    html += "<button class='del-b'>删除</button>";
                    html += "</div>";
                    html += "</span>";
                    html += "</div>";
                }
                $(".YC-data").html(html);
                $(".changeID").on("click", function(){
                    var RYid=$(this).parent().siblings("p").eq(0).html();
                    sessionStorage.Uid=RYid;
                    console.log(sessionStorage.Uid);
                    layer.open({
                        title:"修改用户角色权限",
                        type: 2,
                        shadeClose: true, //点击遮罩关闭
                        area : ['380px' , '220px'],
                        content: 'layout/changeID.html',
                        end: function () {
                            location.reload();
                        }
                    });
                })
                $(".changeID2").on("click", function(){
                    var RYid=$(this).parent().siblings("p").eq(0).html();
                    sessionStorage.Uid=RYid;
                    console.log(sessionStorage.Uid);
                    layer.open({
                        title:"分配用户角色权限",
                        type: 2,
                        shadeClose: true, //点击遮罩关闭
                        area : ['380px' , '220px'],
                        content: 'layout/changeID2.html',
                        end: function () {
                            location.reload();
                        }
                    });

                })
                $("#Role").on("click", function(){
                    layer.open({
                        title:"角色管理",
                        type: 2,
                        shadeClose: true, //点击遮罩关闭
                        area : ['460px' , '620px'],
                        content: 'layout/role.html',
                        end: function (){
                            location.reload();
                        }
                    });
                });
                $("#QXGL").on("click", function(){
                    layer.open({
                        title:"权限管理",
                        type: 2,
                        shadeClose: true, //点击遮罩关闭
                        area : ['360px' , '320px'],
                        content: 'layout/QXGL.html',
                        end: function(){
                            location.reload();
                        }
                    });
                });
                $(".del-b").on("click", function(){
                    if(confirm("你确定要删除此信息吗？")){
                        $.ajax({
                            url:$ip+"admin/users/del",
                            datatype:"json",
                            type: "get",
                            data: {'id':$(this).parent().siblings("p").eq(0).html()},
                            beforeSend: function(xhr){
                                xhr.setRequestHeader('token', $.cookie('token'));
                            },
                            error:function(msg){
                                console.log('请求出错');
                            },
                            success: function(msg){
                                var ddd =JSON.parse(msg);
                                    alert("删除用户成功")
                                window.location.reload();
                            }
                        });
                    }

                });
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
            url:$ip+"admin/users/page/"+"8/"+$(".current").text(),
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
            // var ddd=JSON.parse(msg);
            var data=msg.data.list;
            console.log(msg);
            var page =msg.data.totalPage;
            var html=[]
            for(var i=0,len=data.length; i<len; i++){
                html+="<div class=BX-content>";
                html+="<div class=rygl clearfix>";
                html+="<p style='text-indent:-2000px; padding:0'>"+data[i].id+"</p>";
                html+="<p>"+(i+1)+"</p>";
                html+="<p>"+data[i].realname+"</p>";
                if(data[i].description==null){
                    data[i].description="还未分配角色";
                }
                html+="<p>"+data[i].description+"</p>";
                html+="<span class='btn-more'>";
                console.log(data[i].description);
                if(data[i].description=="还未分配角色"){
                    html+="<button class='changeID2'>分配角色</button>";
                }
                else{
                    html+="<button class='changeID'>修改</button>";
                }
                html+="<button class='del-b'>删除</button>";
                html+="</div>";
                html+="</span>";
                html+="</div>";
            }
            $(".YC-data").html(html);
            }
        })

    }
    function keyword(){
        $.ajax({
            url:$ip+"admin/users/page/"+"8/1",
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

              // console.log(msg);
                if(msg.message=="E1002"){
                    var _html=[];
                    _html+="<h1 style='font-size:60px;padding-left:400px;padding-top: 100px;'>无您搜索的井盖信息</h1>";
                    $(".YC-data").html(_html);
                }
                else{

                    // page=msg.data.totalPage;
                    // console.log(page);
                    // var list=msg.data.list;
                    // var html=[];

                    // var ddd=JSON.parse(msg);
                    var data=msg.data.list;
                    var page =msg.data.totalPage;
                    console.log(page);
                    var html=[]
                    var jgcon=$(".YC-data");
                    for(var i=0,len=data.length; i<len; i++){
                        html+="<div class=BX-content>";
                        html+="<div class=rygl clearfix>";
                        html+="<p style='text-indent:-2000px; padding:0'>"+data[i].id+"</p>";
                        html+="<p>"+(i+1)+"</p>";
                        html+="<p>"+data[i].realname+"</p>";
                        if(data[i].description==null){
                            data[i].description="还未分配角色";
                        }
                        html+="<p>"+data[i].description+"</p>";
                        html+="<span class='btn-more'>";
                        console.log(data[i].description);
                        if(data[i].description=="还未分配角色"){
                            html+="<button class='changeID2'>分配角色</button>";
                        }
                        else{
                            html+="<button class='changeID'>修改</button>";
                        }
                        html+="<button class='del-b'>删除</button>";
                        html+="</div>";
                        html+="</span>";
                        html+="</div>";
                    }

                    jgcon.html(html);
                    // xiangxi();
                    // $(".del-b").on("click", function(){
                    //   if(confirm("你确定要删除此信息吗？")){
                    //         JGdel();
                    //   }

                    // })

                    $(".del-b").on("click", function(){
                        if(confirm("你确定要删除此信息吗？")){
                            $.ajax({
                                url:$ip+"admin/users/del",
                                datatype:"json",
                                type: "get",
                                data: {'id':$(this).parent().siblings("p").eq(0).html()},
                                beforeSend: function(xhr){
                                    xhr.setRequestHeader('token', $.cookie('token'));
                                },
                                error:function(msg){
                                    console.log('请求出错');
                                },
                                success: function(msg){
                                    var ddd =JSON.parse(msg);
                                    console.log(ddd);
                                   alert("删除用户成功");
                                        window.location.reload();
                                }
                            })
                        }

                    });

                    $(".changeID").on("click", function(){
                        var RYid=$(this).parent().siblings("p").eq(0).html();
                        sessionStorage.Uid=RYid;
                        console.log(sessionStorage.Uid);
                            layer.open({
                                title:"修改用户角色权限",
                                type: 2,
                                shadeClose: true, //点击遮罩关闭
                                area : ['380px' , '220px'],
                                content: 'layout/changeID.html',
                                end: function () {
                                    location.reload();
                                }
                            });

                    });
                    $(".changeID2").on("click", function(){
                        var RYid=$(this).parent().siblings("p").eq(0).html();
                        sessionStorage.Uid=RYid;
                        console.log(sessionStorage.Uid);
                        layer.open({
                            title:"分配用户角色权限",
                            type: 2,
                            shadeClose: true, //点击遮罩关闭
                            area : ['380px' , '220px'],
                            content: 'layout/changeID2.html',
                            end: function () {
                                location.reload();
                            }
                        });

                    });

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