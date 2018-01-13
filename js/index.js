


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
                html+="<li class='curt'><a href='"+msg.data[i].url+"'><img style='margin:0 22px 4px 0;' src='images/index_icon.png'/>"+msg.data[i].description+"</a></li>";
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
                html+="<li><a href='"+msg.data[i].url+"'><img style='margin:0 36px 2px 0;' src='images/reclaim_icon.png'/>"+msg.data[i].description+"</a></li>";
            }
        }
        $("#side-menu").html(html);
    }

})

    
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    option = {
	    title : {
	        text: '井盖故障原因比例',
	        subtext: '统计数据图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['人为破坏','寿命损坏','电池耗尽','浸泡破坏','其他原因']
	    },
	    series : [
	        {
	            name: '故障原因',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'人为破坏'},
	                {value:310, name:'寿命损坏'},
	                {value:234, name:'电池耗尽'},
	                {value:135, name:'浸泡破坏'},
	                {value:1548, name:'其他原因'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 图改变窗口自动刷新
	$(window).resize(function(){
        myChart.resize();
        foldLine.resize();
        columnar.resize();

    });

    /*排单向上轮回*/
	// var share=document.getElementById("share_content"),
	// 	oStart=true;
	// share.innerHTML+=share.innerHTML;
	// share.onmouseover=function(){oStart=false};
	// share.onmouseout=function(){oStart=true};
	// new function (){
	// 	var stop=share.scrollTop%55==0&&!oStart;
	// 	if(!stop)share.scrollTop==parseInt(share.scrollHeight/2)?share.scrollTop=0:share.scrollTop++;
	// 	setTimeout(arguments.callee,share.scrollTop%30?10:1500);
	// };

	/*帮助信息向上轮回*/
	var box=document.getElementById("problem_content"),
		can=true;
	box.innerHTML+=box.innerHTML;
	box.onmouseover=function(){can=false};
	box.onmouseout=function(){can=true};
	new function (){
		var stop=box.scrollTop%55==0&&!can;
		if(!stop)box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
		setTimeout(arguments.callee,box.scrollTop%30?10:1500);
	};

	// 基于准备好的dom，初始化echarts实例
    var foldLine = echarts.init(document.getElementById('foldLine'));

    // 指定图表的配置项和数据
    function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(2016, 3, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 100; i++) {
    data.push(randomData());
}
// console.log(data);
option = {
    title: {
        text: '维修统计记录'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

setInterval(function () {
    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }
    // console.log(data);
    foldLine.setOption({
        series: [{
            data: data
        }]
    });
}, 1000);


    // 使用刚指定的配置项和数据显示图表。
    foldLine.setOption(option);


    var columnar = echarts.init(document.getElementById('columnar'));
    // app.title = '坐标轴刻度与标签对齐';

option = {
    title: {
        text: '井盖区域分布数量'
    },
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['宝安区', '龙岗区', '南山区', '福田区', '龙华区', '罗湖区'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'井盖数',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330]
        }
    ]
};

columnar.setOption(option);







});