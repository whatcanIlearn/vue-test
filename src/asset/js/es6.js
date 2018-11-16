// var a = 1;
let a = 2;
console.log(a);


/**
 * for in 和for of的区别  link : https://www.cnblogs.com/dupd/archive/2016/09/22/5895474.html
 *  for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。
 *  for in 遍历的是所有可枚举的属性，比如如下例子中的name和method都会便利出来
 */
Array.prototype.method = function () {
　　console.log(this.length);
}
var myArray = [1, 2, 4, 5, 6, 7];
myArray.name = "数组";
for (var index in myArray) {
    console.log(index, myArray[index]);
}
console.log("-----------");
for (var value of myArray){
    console.log(value);
}

//汉诺塔的步数问题
function countHanoi (n){
    if (n <= 1){
        return 1;
    }else{
        return 2*countHanoi(n-1)+1;
    }
}
for (var i = 0; i < 100; i++){
    console.log(countHanoi(i));
}