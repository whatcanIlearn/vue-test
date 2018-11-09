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
    template : '<div><button v-bind:class="[changeClass, classGroup]" v-on:click="countFn(5)">点击的次数{{count}}</button></div>'
})
// var echarts = required
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>这是一个 todo 项{{todo.text}}</li>'
})
var comcomp= Vue.component("comComp", {
    props : ['itemA'],
    template : "<div>this is a component {{itemA.a}} <input v-model='itemA.b'/></div>"
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

