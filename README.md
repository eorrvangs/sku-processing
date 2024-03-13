# sku-processing
#sku简单数据处理

##简单的处理多规格筛选数据具体业务根据处理好的数据来进一步操作

##多个下拉框联动

##下拉框联动也可以用这个方法来处理你想要的数据

```bash
$ npx install sku-processing
```

##具体使用方法
```bash
例子：
//整理好后端返回的数据成下面的
//可以选择的选项
const spec= [
    {title: "颜色", list: ["白色", "黑色"]},
    {title: "大小", list: ["S", "L",'XL']},
    {['youname']: "图案", ['youname']: ["圆", "正方", "三角",'椭圆']}
    ...
]
或者
const spec =  {
    color:["圆", "正方", "三角"],
    size:["S", "L",'XL'],
    ['youname']:["圆", "正方", "三角",'椭圆']
    ...
}
...
//这个是后端返回的库存组合
var inventoryOptions = [
    {id: "1", invOpt: ["白色", "S", "圆"]},
    {id: "2", invOpt: ["白色", "S", "正方"]},
    {id: "3", invOpt: ["白色", "S", "正方"]},
    {id: "4", invOpt: ["黑色", "S", "正方"]},
    {id: "5", invOpt: ["白色", "S", "三角"]},
    {id: "5", invOpt: ["白色", "L", "椭圆"]},
    {id: "6", invOpt: ["黑色", "XL", "正方"]},
    {id: "9", [youname]: ["白色", "S", "正方"]
    ...
  ]
...

然后调用本方法

import tabulationMatrix  from 'sku-processing'

//初始化

var a = new tabulationMatrix(spec,inventoryOptions)

//这里是每选一个就要调用一次（你选择的规格），可以放在监听里面，初始化选择都是空数组

var Selected = Array(spec.length).fill("");//可用于当前规格是否被选

var b = a.getSpecArray(Selected);  

console.log(b)
//得到当前可以选择的数据用于页面渲染判断
//(8) ['白色', '黑色', 'S', 'XL', '圆', '正方', '三角', '椭圆']

...

Selected = ['白色','S','']

var c = a.getSpecArray(Selected);

console.log(c)

//['白色', 'S', '圆', '正方', '三角']



```
