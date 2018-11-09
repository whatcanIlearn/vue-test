Vue.component("class-item",{
    data(){
        return {
            count : 0,
            color : false,
            size : false
        }
    },
    methods : {
        countFn(){
            this.count ++;
            this.color = this.count%2;
            this.size = this.size%2;
        }
    },
    template : `<div v-bind:class={color : color, size : size}>
                    <button v-on:click="countFn">点击的次数{{count}}<button>
                </div>`
})
