//创建和初始化地图函数：
//var $ip = "http://192.168.0.110:8080/Manholecover/";





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
                html+="<li class='curt'><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/map_icon.png'/>"+msg.data[i].description+"</a></li>";
            }else if(msg.data[i].fatherid=="0"&&msg.data[i].description =="井盖列表"){
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/list_icon.png'/>"+msg.data[i].description+"</a></li>";
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

});

    
    function __map(status){
        $.ajax({
            url : $ip + "admin/equipment/all",
            //http://[<serverUrl>]/admin/equipment/page/{size}/{index}
            datatype : "json",
            type : "POST",
            //async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            data: {status:status},
            error : function(msg){
                console.log('请求出错');
            },
            success : function(msg){
                var json = JSON.parse(msg);
                var Data = json.data;
                console.log(json);
                $("#Count").text('井盖总数量:'+Data.length+'个');

                var lat_lng = [];
                for(var i = 0, len = Data.length; i < len; i++){
                    lat_lng.push(Data[i].location.split(","));
                }
                //console.log(lat_lng);
                //console.log(lat_lng.length);

                function initMap(){
                    createMap();//创建地图
                    setMapEvent();//设置地图事件
                    addMapControl();//向地图添加控件
                    addMapOverlay();//向地图添加覆盖物
                    // addMapOverlay2();
                }

                function createMap(){
                    // 创建地图实例
                    map = new BMap.Map("map");
                    // // 初始化地图，设置中心点坐标和地图级别 与 创建点坐标
                    //map.centerAndZoom(new BMap.Point(113.888183, 22.576674), 17);//经度，纬度，地图级别
                    
                    function myFun(result){
                        // cityName = result.name;
                        map.centerAndZoom(new BMap.Point(result.center.lng, result.center.lat), 13);
                        console.log(result);
                        // loadJsonp(cityName);
                    }
                    var myCity = new BMap.LocalCity();
                    myCity.get(myFun);

                    // function myFun(result){
                    //     cityName = result.name;
                    //     var myGeo = new BMap.Geocoder();
                    //     myGeo.getPoint(cityName, function(point){
                    //         if (point) {
                    //             map.centerAndZoom(point, 17);
                    //             // map.addOverlay(new BMap.Marker(point));
                    //         }else{
                    //             alert("您选择地址没有解析到结果!");
                    //         }
                    //     }, cityName);
                    //     console.log(result);
                    //     // loadJsonp(cityName);
                    // }
                    // var myCity = new BMap.LocalCity();
                    // myCity.get(myFun);

                    // 联动
                    function getBoundary(getcity,num){
                        var bdary = new BMap.Boundary();
                        bdary.get(getcity, function(rs){       //获取行政区域
                            // map.clearOverlays();        //清除地图覆盖物
                            var count = rs.boundaries.length; //行政区域的点有多少个
                            if (count === 0) {
                                alert('未能获取当前输入行政区域');
                                return ;
                            }
                            var pointArray = [];
                            for (var i = 0; i < count; i++) {
                                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
                                // map.addOverlay(ply);  //添加覆盖物
                                pointArray = pointArray.concat(ply.getPath());

                            }
                            // console.log(getcity);
                            map.setViewport(pointArray);    //调整视野
                            map.setZoom(num);
                        });
                    }

                    $("#province10").change(function(){
                        // console.log($(this).val());
                        if ($('.info-cont').find('i').eq(1).attr('class') == 'province_name') {
                            $('.info-cont').find('i').eq(1).text($(this).val());
                        }else{
                            var oHtml = '<i class="province_name">'+$(this).val()+'</i>';
                            $('.info-cont').find('i').eq(0).after(oHtml);
                        }
                        if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
                            $('.district_name').remove();
                        }
                        if ($('.info-cont').find('i').eq(2).attr('class') == 'city_name') {
                            $('.city_name').remove();
                        }
                        getBoundary($("#province10 option:selected").html(),7);

                    });

                    $("#city10").change(function(){
                        // console.log($(this).val());
                        if ($('.info-cont').find('i').eq(2).attr('class') == 'city_name') {
                            $('.info-cont').find('i').eq(2).text($(this).val());
                        }else{
                            var oHtml = '<i class="city_name">'+$(this).val()+'</i>';
                            $('.info-cont').find('i').eq(1).after(oHtml);
                        }
                        if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
                            $('.district_name').remove();
                        }
                        getBoundary($("#province10 option:selected").html()+$("#city10 option:selected").html(),10);

                    });

                    $("#district10").change(function(){
                        // console.log($(this).val());
                        if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
                            $('.info-cont').find('i').eq(3).text($(this).val());
                        }else{
                            var oHtml = '<i class="district_name">'+$(this).val()+'</i>';
                            $('.info-cont').find('i').eq(2).after(oHtml);
                        }
                        getBoundary($("#province10 option:selected").html()+$("#city10 option:selected").html()+$("#district10 option:selected").html(),13);

                    });

                }

                function setMapEvent(){//设置地图事件
                    map.enableScrollWheelZoom();
                    map.enableKeyboard();
                    map.enableDragging();
                    //map.enableDoubleClickZoom()

                }

                function addClickHandler(target, window){
                    target.addEventListener("click", function(){
                        target.openInfoWindow(window);

                    });
                    
                }

                function addMapOverlay(){//向地图添加覆盖物
                    var markers = [
                        //{content:"我的备注",title:"井盖",imageOffset: {width:-46,height:-21},position:{lat:22.57639,lng:113.887518}}
                    ];
                    for(var i = 0, len = lat_lng.length; i < len; i++){
                        if (Data[i].cur_status == 2) {
                            markers.push({
                                content :"imei号："+Data[i].imei+"<br>地址："+ Data[i].provice + Data[i].city + Data[i].district +Data[i].address+ "<br>负责人：" + Data[i].realname + "<br>手机号：" + Data[i].phone + "<br>维修次数：" + Data[i].repaircount + "<br>设备电量：" + Data[i].electricity + "%" + "<br>状态：" + Data[i].cover_status_desc,
                                title : null,
                                imageOffset : {width : -46, height : -21},
                                position : {lat : lat_lng[i][0], lng : lat_lng[i][1]}
                            });
                        }else{
                            markers.push({
                                content :"imei号："+Data[i].imei+"<br>地址："+ Data[i].provice + Data[i].city + Data[i].district +Data[i].address+ "<br>负责人：" + Data[i].realname + "<br>手机号：" + Data[i].phone + "<br>维修次数：" + Data[i].repaircount + "<br>设备电量：" + Data[i].electricity + "%" + "<br>状态：" + Data[i].cover_status_desc,
                                title : null,
                                imageOffset : {width : -46, height : -21},
                                position : {lat : lat_lng[i][0], lng : lat_lng[i][1]}
                            });
                        }
                        // if(Data[i].status == 1){
                            
                        // }
                    }

                    // console.log(markers);
                    //console.log(markers);
                    for(var index = 0; index < markers.length; index++){
                        // console.log(Data)
                         if (Data[index].cur_status == 1) {
                            var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                            var marker = new BMap.Marker(point, {
                                icon : new BMap.Icon("images/normal_ioc.png", new BMap.Size(25, 25))
                            });
                            var label = new BMap.Label(markers[index].title, {offset : new BMap.Size(25, 5)});
                        }else if(Data[index].cur_status == 2){
                            var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                            var marker = new BMap.Marker(point, {
                                icon : new BMap.Icon("images/abnormal_ico.png", new BMap.Size(25, 25))
                            });
                            var label = new BMap.Label(markers[index].title, {offset : new BMap.Size(25, 5)});
                        }else if(Data[index].cur_status == 4){
                            var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                            var marker = new BMap.Marker(point, {
                                icon : new BMap.Icon("images/noonline_ico.png", new BMap.Size(25, 25))
                            });
                            var label = new BMap.Label(markers[index].title, {offset : new BMap.Size(25, 5)});
                        }
                        // var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                        // var marker = new BMap.Marker(point, {
                        //     icon : new BMap.Icon("images/smart_Manholecover.png", new BMap.Size(25, 25))
                        // });
                        // var label = new BMap.Label(markers[index].title, {offset : new BMap.Size(25, 5)});
                        var opts = {
                            width : 200,
                            title : markers[index].title,
                            enableMessage : false
                        };
                        var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
                        //marker.setLabel(label);
                        addClickHandler(marker, infoWindow);
                        map.addOverlay(marker);
                        //marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动

                    };

                    

                }

                //向地图添加控件
                function addMapOverlay2(){

                    var markers = [
                        //{content:"我的备注",title:"井盖",imageOffset: {width:-46,height:-21},position:{lat:22.57639,lng:113.887518}}
                    ];
                    for(var i = 0, len = lat_lng.length; i < len; i++){
                        if(Data[i].status == 2){
                            markers.push({
                                content :"imei号:"+Data[i].imei+"<br>"+ Data[i].provice + Data[i].city + Data[i].district +Data[i].address+ "<br>负责人:" + Data[i].realname + ",手机号：" + Data[i].phone + "<br>维修次数：" + Data[i].repaircount + "设备电量：" + Data[i].electricity + "%",
                                title : null,
                                imageOffset : {width : -46, height : -21},
                                position : {lat : lat_lng[i][0], lng : lat_lng[i][1]}
                            });
                        }
                    }

                    //console.log(markers);
                    //console.log(markers);
                    for(var index = 0; index < markers.length; index++){
                        var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                        var marker = new BMap.Marker(point, {
                            icon : new BMap.Icon("images/unknown_Manholecover.png", new BMap.Size(25, 25))
                        });
                        var label = new BMap.Label(markers[index].title, {offset : new BMap.Size(25, 5)});
                        var opts = {
                            width : 200,
                            title : markers[index].title,
                            enableMessage : false
                        };
                        var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
                        //marker.setLabel(label);
                        addClickHandler(marker, infoWindow);
                        map.addOverlay(marker);
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动

                    };



                }

                //向地图添加跳动控件
                function addMapControl(){//向地图添加控件
                    var scaleControl = new BMap.ScaleControl({anchor : BMAP_ANCHOR_BOTTOM_LEFT});
                    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
                    map.addControl(scaleControl);
                    var navControl = new BMap.NavigationControl({
                        anchor : BMAP_ANCHOR_TOP_LEFT,
                        type : BMAP_NAVIGATION_CONTROL_LARGE
                    });
                    map.addControl(navControl);
                    var overviewControl = new BMap.OverviewMapControl({anchor : BMAP_ANCHOR_BOTTOM_RIGHT, isOpen : true});
                    map.addControl(overviewControl);
                }

                var map;
                initMap();
                function myFn(e){
                    alert(e.innerText);
                }
            }
        });
        
    }
    var oStatus = '';
    __map(oStatus);
    $('body').on('click','.normal',function(){
        __map(1);
    });
    $('body').on('click','.noonline',function(){
        __map(4);
    });
    $('body').on('click','.abnormal',function(){
        __map(2);
    });

    function myFn(e){
        alert(e.innerText);
    }
    

    function __reinstate(eid){
        console.log(eid);
        $.ajax({
            type:"post",
            url:$ip+"admin/equipment/updateStatus",
            beforeSend : function(xhr){
                xhr.setRequestHeader('token', $.cookie('token'));
            },
            data:{
                eid:eid
            },
            error:function(){
                console.log(2);
            },
            success:function(msg){
                if(msg){
                    alert("恢复成功");
                    window.location.reload();
                }
                
            }
        });
    }
    // map.addEventListener("click",function(e){
    //     if(e.overlay){
    //         alert('你点击的是覆盖物：'+e.overlay.toString());   
    //     }else{
    //         alert('你点击的是地图');
    //     }
    // });
});