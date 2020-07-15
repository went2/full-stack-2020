### Description
exercises 1.12-1.14 source code located in :
`src`->`index.js`

### Reflection
It takes me 4.5 hours to complete exercises 1.12-1.14. And during working I encountered some problems. I need to write the problems and how I solved them. As you can see, I ues written English poorly, so in order to descript problems more acculately, I'll ues my native language.

这个练习的目标是实现下图效果：
![anecdote](/Users/tom/Desktop/full-stack-2020/part1/anecdotes 1.12-1.14/image/anecdote.jpg)
1. 点击切换，随机显示一条“格言”；
2. 点击“vote”，给当前格言投票；
3. 显示获得票数最多的格言

通过该练习加深了这些印象：
1. 页面中产生交互的地方都要抽象出数据保存在状态中
本例中，有两种交互需要记录状态：
	1. 点击切换，随机显示格言，对应组件状态中的数据可以抽象为：当前显示的格言的`序号`，类型是数值；
	2. 点击“vote”，为当前格言增加一票，对应组件状态中的数据可以抽象为：一个初始zero filled列表，类型array，里面的元素是数值。其长度等于格言列表的长度，其索引与格言的索引相应。如`[0,3,5,0,0,0]`的意味着序号 1 的格言获得了3票，序号 2 的格言获得了 5 票。点击“vote”即为当前序号位置的数值加1

```js
// 任意长度的 zero filled array
new Array(len).fill(0);
```

2. 如何实时获得每次投票后的最多票数的格言？
思路是这样：组件内部定义一个函数，传入参数格言列表，计算`1.2`中格言票数列表中的最大值的序号，返回最大值的序号及序号对应的格言内容。

为什么不抽象出当前最大票数的格言序号，作为组件的状态独立管理？按这个思路是这样：
	1. 在点击“vote”后，除了为当前格言增加一票外，调用比较函数；
	2. 比较函数参数是`1.2`中格言票数列表，计算出最大值的序号，作为状态保存。

这个思路如果要工作，重要前提是，改变格言列表状态的函数与调用比较函数是同步发生的。然而 React 的状态改变是异步的，有时候会把两次状态改变的操作合并成一次。在按上述思路实现时，在用户端出现一个bug是：格言一有3票，且为最多的情况下，为格言二投票，投到4票时，页面还是显示最多的是格言一，投到5票时，才显示最多的是格言二。

> 参考:
> [找出数组最大值的索引](https://blog.csdn.net/pangji0417/article/details/90375133)

3. 不应该直接改变状态
应该复制出一个当前状态的副本，更新副本，然后将之设置为新的状态。
如果状态是对象，如何获得其副本？不能用变量赋值，因为变量存的是对象在内存中的地址。最简单的方法是用`对象展开`语法：
```js
// 拷贝一个对象
const points = { 0: 1, 1: 3, 2: 4, 3: 2 };
const copy = { ...points };
copy[2] += 1;

// 拷贝一个数组
const points = [1, 4, 6, 3];
const copy = [...points];
copy[2] += 1;
```
> 参考：
> [js中的深拷贝](https://github.com/axuebin/articles/issues/20)







