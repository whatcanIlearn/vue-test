
Vue.component("pie-item", {
    name: '',
    data () {
        return {
            charts: '',
            opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            opinionData:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    },
    methods:{
        drawPie(id){
            this.charts = echarts.init(document.getElementById(id))
            this.charts.setOption({
                tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c} ({d}%)'
                },
                legend: {
                orient: 'vertical',
                x: 'left',
                data:this.opinion
                },
                series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius:['50%','70%'],
                    avoidLabelOverlap: false,
                    label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                        fontSize: '30',
                        fontWeight: 'blod'
                        }
                    }
                    },
                    labelLine: {
                    normal: {
                        show: false
                    }
                    },
                    data:this.opinionData
                }
                ]
            })
        }
    },
    //调用
    mounted(){
        this.$nextTick(function() {
            this.drawPie('main')
        })
    },
    template : '<div id="main" style="width: 600px;height: 400px;"></div>'
})

/**
 * 关于对元素的class的动态添加的使用，共有两种方式：
 *  1、对象模式，这种模式只能通过一个属性的变化对一个class进行改变，每个属性名对应的是样式class名，多个class用多个属性来对应
 *      例：下例中的changeClass
 *  2、数组模式，数组中的每个元素对应的是data中的一个变量，变量的值是class名，每个变量可以赋值一个或一组class 元素的使用类似与变量的赋值；
 *      例：data:{
 *              classA: "aa",
 *              classB: "bb cc"
 *          }
 *          template: '<div v-bind:class="[classA, classB]"></div>'
 *      元素的使用还可以使用一个三目表达式来进行变量的筛选 
 *      例：<div v-bind:class="[isActive ? classA : '', classB]"></div>
 *  两个可以混合使用，对于需要动态改变的用数组中的一个元素用对象方式来进行添加；对于静态的，就用一个元素来来直接添加一个或一组class类名
 * 
 * style的动态添加的方式也是两种：
 *  1、对象模式，就是内联样式形式一样，属性值是样式名 例：v-bind:style="{color:color, fontSize: size}"
 *  2、数组模式，就是将上述对象放到数组中去。
 *  注：1、它可以和computed联合使用，只需要返回的是对象即可,不能是数组，如果是数组，他只会取第一个对象元素的值
 *      2、从 2.3.0+ 起，你可以为每个 style 属性提供一个含有多个（前缀）值的数组，例如：
 * <div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
 * 最终，这只会从数组中找出「最后一个浏览器所支持的值」进行渲染。在这个示例中，对于支持「无需前缀版本的 flexbox」的浏览器，最终将渲染为 display: flex。
 * 对于chrome浏览器，如果-webkit-flexbox在最后，就用这个，而如果-ms-flexbox在最后，显示flex，
 */
Vue.component("class-item",{
    data(){
        return {
            count : 0,
            changeClass : {
                color : false,
                size : false
            },
            classGroup : 'aa bb'
        }
    },
    methods : {
        countFn(a){
            console.log(a)
            this.count ++;
            this.changeClass.color = this.count%2;
            this.changeClass.size = this.count%2;
        }
    },
    computed: {
        computeStyle(){
            return [{color:"red",fontWeight: 700},{fontSize: 12}]
        }
    },
    template : '<div><button v-bind:class="[changeClass, classGroup]" v-on:click="countFn(5)" v-bind:style="computeStyle">点击的次数{{count}}</button></div>'
})
// var echarts = required
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>这是一个 todo 项{{todo.text}}</li>'
})
var comcomp= Vue.component("comComp", {
    props : ['itemA'],
    template : "<div>this is a component {{itemA.a}} <input v-model='itemA.b'/><div v-bind:style=\"{ display: [ '-webkit-box', 'flex', '-ms-flexbox']}\">ccc</div></div>"
})

Vue.component("ifTestItem", {
	data () {
        return {

            logintype: "username",
            showlabel : false,
            name : "",
            mail : ""
        }
	},
	methods: {
		changeType(){
			this.logintype = this.logintype == "username" ? "" : "username";
		}
    },
    // template: '<div></div>'
    //
    /**
     *  对于v-if的使用中相同的元素的渲染机制问题
     *  1、单独只使用input框的时候，进行切换的时候，input框中输入的内容并不能被清空（），如果加入:key或key，且值不相同就会清空 
     *       这是由于两个都是input框，没有key值的区分或则他们的key值相同，他们都是同一个元素，只会替换里面的值，在浏览器获取切换前后的dom对象，进行比较，会发下他们是相等的；
     *       key值不同的时候，会渲染出来两个不同的对象
     *  2、当加入v-model以后，就会以其绑定的值为主体，切换的时候input里的值会以这个主体为一句
     *      这里加入v-model后值虽然变了，但是他们key值不同时；dom对象还是同一个，input框里面的值变化了是由于绑定的值的变化
     *  3、对于进行复用的元素，和是否使用template没有关系，和是否在同一个v-if条件体也无关，和if条件所在的元素上标签结构有关，如果他们的标签相同，但是不是同时显示，那么在这个标签下面的相同的元素在没有key值相同的情况下会进行复用
     *      如下例中的 input1 == input2; input3 === input4;input1 != input3 or input4 （前提时他们的结构相似，即if和else都是在同一种类型的标签里面，如在同一个template or div or p）
     *      即使在统一个条件体里面，但是他们的标签不相同，也不会进行服用，例：input5 != input6 但是input6 === input7，
     *      在不同的条件体下面，但是他们if所在的标签是同一类型，如果不是同时显示出来，他们dom对象就是相同的 下例中的input3 == input6 但input4 ！= input6
     */
    //
	template: `
        <div>
            <template v-if="logintype === 'username'">
			  <label v-show="showlabel">用户名</label>
			  <input id="input1" placeholder="请输入用户名">
			</template>
			<template v-else>
			  <label>邮箱</label>
			  <input id="input2" placeholder="请输入邮箱">
            </template>

            <div v-if="logintype === 'username'">
              <label v-show="showlabel">用户名</label>
              <span>:</span>
			  <input id="input3" placeholder="请输入用户名">
			</div>
			<div v-else>
			  <label>邮箱</label>
			  <input id="input4" placeholder="请输入邮箱">
            </div>
            
			<template v-if="logintype === 'username'">
			  <label v-show="showlabel">用户名</label>
			  <input id="input5" placeholder="请输入用户名">
			</template>
			<div v-else>
			  <label>邮箱</label>
			  <input id="input6" placeholder="请输入邮箱">
            </div>

            <div v-if="logintype === 'username'">
              <label v-show="showlabel">用户名</label>
              <span>:</span>
			  <input id="input7" placeholder="请输入用户名">
			</div>
			<p v-else>
			  <label>邮箱</label>
			  <input id="input8" placeholder="请输入邮箱">
			</p>
			<button v-on:click="changeType">切换登陆方式</button>
		</div>
	`
})

/**
 * v-for使用
 *  1、遍历数组，v-for="item in items" or v-for="item of items" or v-for="(item, index) in items"
 *  2、遍历对象，v-for=“value in obj" or v-for="value of obj" or v-for="(value, key, index) in obj"
 *  注：1、这里的in和原生js的for in，原生js里面的（for in） in前面的值是键名；而v-for里面的是键值，他和js例的for of语法相近
 *      2、在遍历一个对象时，是按照 Object.keys() 得出 key 的枚举顺序来遍历，无法保证在所有 JavaScript 引擎实现中完全一致。
 *      3、在不加key值的时候，如果在后续过程中，数组的顺序发生改变了，对应的值的顺序会改变，但是，只是填充的值改变了，该条目其他的dom为改变，如下中的input框，在你先输入值，在改变数组的顺序的时候，input的dom顺序并没有改变；如果加上key并且可以值需要能唯一确定该条目，那么整体的条目就能跟着改变。主要的原因是，为了加速渲染，改变的时候只是复用原来渲染的元素，并没有真正的去重新渲染。
 *  由于 JavaScript 的限制，Vue 无法检测到以下数组变动：(js的什么限制？？？？observer模式的限制？？？)
 *      当你使用索引直接设置一项时，例如 vm.items[indexOfItem] = newValue
 *      当你修改数组长度时，例如 vm.items.length = newLength
 */
Vue.component("vforItem", {
    data() {
        return {
            arr : [
                {a : 1, b : ""},
                {a : 2, b : ""},
                {a : 3, b : ""},
                {a : 4, b : ""},
                {a : 5, b : ""},
                {a : 6, b : ""},
                {a : 7, b : ""}
            ],
            arr2 : [
                {a : 1, b : ""},
                {a : 2, b : ""},
                {a : 3, b : ""},
                {a : 4, b : ""},
                {a : 5, b : ""},
                {a : 6, b : ""},
                {a : 7, b : ""}
            ]
        }
    },
    methods : {
        changeArr () {
            this.arr = [
                {a : 1},
                {a : 6},
                {a : 4},
                {a : 3},
                {a : 2},
                {a : 5},
                {a : 7}
            ];
            this.arr2 = [
                {a : 1},
                {a : 6},
                {a : 4},
                {a : 3},
                {a : 2},
                {a : 5},
                {a : 7}
            ];
        }
    },
    template : `
        <div>
            <template v-for="item in arr">
                <div>{{item}}:<input :data-id="item.a"/></div>
            </template>
            <br/>
            -------------
            <br/>
            <template v-for="(item, index) in arr">
                <div :key="item.a">{{index}}-{{item}}:<input :data-id="item.a"/></div>
            </template>
            <button v-on:click="changeArr">改变顺序</button>
        </div>
    `
})
var app2 = new Vue({
    el: '#app-2',
    data: {
      message: '页面加载于 ' + new Date().toLocaleString(),//只初始化一次
      childData : {
          a : 1,
          b : 2
      },
      groceryList: [
        { id: 0, text: '蔬菜' },
        { id: 1, text: '奶酪' },
        { id: 2, text: '其他人类食物' }
      ],
      firstName : "Tom",
      lastName : "cat"
    },
    //computed中的方法调用一次，只是会去取缓存中的数据，除非跟其关联的data下的属性（如例子中的message)改变，他才会跟着改变
    computed : {
        reversedMessage() {
            console.log(arguments);
            return this.message.split("").reverse().join("");
        },
        now() {
            return Date.now()
        },
        fullName(){
            return this.firstName + " " + this.lastName;
        },
        changeFullName : {
            set(newValue){//设置set可以进行反向的改变
                console.log(newValue);
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            },
            get(){
                return this.firstName + " " + this.lastName;
            }
        }
    },
    //methods中的方法调用一次，函数里面的代码都会执行一次，如果跟data下面绑定的属性（如message）改变后，该方法也会执行
    methods: {
        reversedMessageM() {
            console.log(arguments);
            return this.message.split("").reverse().join("，");//这里即使多次调用，data中的message也不会再次去从新计算值（如果message中的值是通过计算来的）
        },
        nowM : function() {
            return Date.now()
        },
        changeMessage (){
            this.message = '页面改变于 ' + new Date().toLocaleString()
        }
    }
})
//监控变量的变化
app2.$watch('childData', function(newV, oldV){
    console.log(newV, oldV);
})
//
app2.$watch('message', function(newV, oldV){
    console.log(newV, oldV);
})

