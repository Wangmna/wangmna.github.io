window.onload=function () {
    var listh=document.querySelector(".left-list");
    var title=document.querySelector(".title").offsetHeight;
    var cheight=document.documentElement.clientHeight;
    listh.style.height=cheight-title+"px";
    var btm=document.querySelector(".m-right .bottom");
    btm.style.height=cheight-title+"px";
    var con=document.querySelector(".con");
    con.style.height=cheight-title-83+"px";
//    结束
};
var todos=[
    {
        id:1,
        title:"列表1",
        color:"#FFF400",
        todol:[
            {
                time:"1233333",
                title:"的风范",
                dome:true
            },
            {
                time:"1233333",
                title:"可哦哦哦功能",
                dome:false
            },
            {
                time:"1233333",
                title:"破哦皮普UI导航",
                dome:true
            },
            {
                time:"1233333",
                title:"口佩服佩服普",
                dome:false
            }
        ]
    },
    {
        id:2,
        title:"列表2",
        color:"#FF0500",
        todol:[
            {
                time:"1233333",
                title:"今天有许多事要做",
                dome:true
            },
            {
                time:"1233333",
                title:"今天有许多事要做",
                dome:false
            },
            {
                time:"1233333",
                title:"今天有许多事要做",
                dome:true
            },
            {
                time:"1233333",
                title:"今天有许多事要做",
                dome:true
            }
        ]
    },
    {
        id:3,
        title:"列表3",
        color:"#FF00CC",
        todol:[
            {
                time:"1233333",
                title:"34234",
                dome:false
            },
            {
                time:"1233333",
                title:"849504707",
                dome:false
            },
            {
                time:"1233333",
                title:"74897468332",
                dome:true
            },
            {
                time:"1233333",
                title:"64639582304209",
                dome:false
            }
        ]
    }
];
var color=["#FFF400","#FF0500","#FF00CC","#0009FF","#00DFFF","#24FF00"];
var app=angular.module("app",[]);
app.controller("ctrl",function ($scope,$filter) {
    $scope.todos=todos;
    $scope.color=color;
    $scope.index=todos.length-1;
    $scope.cname=function (i) {
        $scope.index=i;
        $scope.isShow=false;
    };
    //添加列表
    $scope.addList=function () {
        var l=$scope.todos.length-1;
        var id=$scope.todos[l].id+1;
        $scope.todos.push(
            {
                id:id,
                title:"新列表"+id,
                color:color[(id-1)%6],
                todol:[]
            }
        )
        $scope.index=$scope.todos.length-1;
        $scope.isShow=false;
    }
//  控制列表的显示和隐藏
    $scope.isShow=false;
    $scope.listShow=function () {
        $scope.isShow=!$scope.isShow;
    };
//  项目的统计
    $scope.listNum=0;
    getNum();
    function getNum() {
        var tdl=$scope.todos[$scope.index].todol;
        var arr=$filter("filter")(tdl,true);
        $scope.listNum=arr.length;
    }
    $scope.$watch("index",function(){getNum()});
//    清除已完成事项
    $scope.clearList=function () {
        var tdl=$scope.todos[$scope.index].todol;
        $scope.todos[$scope.index].todol=$filter("filter")(tdl,false);
        $scope.isShow=false;
        getNum();
    };
//    状态的改变
    $scope.status=function (v,flag) {
        v.dome=flag;
        getNum();
    };
//   新建项目
    $scope.newList=function () {
        $scope.todos[$scope.index].todol.push({
            time:(new Date).getTime(),
            title:"",
            dome:false
        })
    };
//    选项的设置
    $scope.flg=false;
    $scope.cShow=function(){
        $scope.flg=!$scope.flg;
        $scope.changeCom=$scope.todos[$scope.index].title;
        $scope.changeColor=$scope.todos[$scope.index].color;
    };
//    颜色的变化
    $scope.huan=function (c) {
        $scope.changeColor=c;
    }
//    取消
    $scope.qxs=function () {
        $scope.flg=false;
    };
//    删除
    $scope.cle=function () {
        $scope.todos.splice($scope.index,1);
        $scope.flg=false;
        $scope.index=$scope.todos.length-1
    }
//    完成
    $scope.fin=function () {
        $scope.todos[$scope.index].title=$scope.changeCom;
        $scope.todos[$scope.index].color=$scope.changeColor;
        $scope.flg=false;
    }
});
