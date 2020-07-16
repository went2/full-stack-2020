### Description
exercises 2.6-2.10 source code located in : `src`

### Reflection
It takes me 5 hours to complete exercises 2.6-2.10. During working I encountered some problems. I need to write the problems and how I solved them. As you can see, I ues written English poorly, so in order to descript problems more acculately, I'll ues my native language.


本练习叫电话簿，需要实现以下效果：

![phonebook](/Users/tom/Desktop/full-stack-2020/part2/phonebook 2.6-2.10/image/phonebook.gif)

上图是实现之后的截图，具体功能如下：
1. 能够添加联系人，联系人包含姓名、电话、性别；
2. 添加同名联系人时弹出同名警告；
3. 能够显示当前所有联系人；
4. 能够按照联系人的名称、性别进行过滤显示

### 思路
1. 需要拆分出多少组件？

根组件保存状态、定义事件处理函数，把相关的状态和方法传递给子组件。
子组件提供用户交互接口，响应用户操作，调用相应的事件处理函数来改变状态。

`App`是根组件，其中保存整个应用的状态和事件处理函数。它的子组件是：
`Filter` 组件，提供根据姓名、性别筛选的接口。
`PersonForm` 组件，一个表单，提供用户输入姓名、手机号、性别并提交的接口。
`Persons` 组件，用于显示输入信息的组件，会根据 Filter 组件的用户输入显示不同信息。

2. 先建好各个独立的组件 还是 先把所有功能写在一个组件中，然后分拆出独立组件？
这个练习我的做法是后者。

3. 需要哪些状态？

状态是随用户行为发生改变的数据。有多少需要发生变化的数据，就需要定义多少状态。

第一，电话簿应用的核心是保存用户输入的人物电话信息，所以其核心的状态是一条条**用户电话的记录**，用 js 的列表存储，示例如下：

```js
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', sex: 'male' },
    { name: 'Ada Lovelace', number: '39-44-5323523', sex: 'female' },
    { name: 'James Fidher', number: '39-44-4443523', sex: 'male' },
  ]);
```

第二，由于电话簿需要用户输入信息，这些信息需要保存到 React 状态中，有问题：

**React 组件如何获取用户在表单中的输入**？

一种方法是使用`受控组件`。`受控组件` 是值被 React 控制的 input 表单元素，因此，更新 input 表单中的值也只能通过 React 的setState 或 hook 进行。通过 `<input />`标签的 `onChange`事件接口。用户输入信息，触发`onChange`事件，用事件对象的 `target.value`属性值更新 React 状态，再让 `<input />` 标签的 `value` 值等于状态。

所以需要在 React 中定义用户当前输入的“姓名”、“电话”、“性别”的状态，用`onChange`事件接口实时获取输入内容，并更新到状态：

```js
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSex, setNewSex ] = useState('');
  
    // 姓名表单输入示例
  return (
    <div>
      name: 
        <input
        	value={ newName }
        	onChange={ handleNameInput } />
    </div>
	)
```

第三，由于需要根据姓名是否包含某字符串，不同性别来过滤显示电话信息，还需要控制过滤信息的状态：

```js
  const [ show, setShow ] = useState('all'); // 在本文 5 中详细解释
  const [ filterStr, setFilter ] = useState(''); // 在本文 4 中详细解释
```

4. 前端如何根据姓名中是否包含某个字符串，过滤显示数据？

首先，显示所有电话信息的思路是：保存所有电话信息的 `persons`数组，调用 `map`方法，根据每一个元素中的数据，返回一条条记录。

所以在调用 map 方法前，就应该完成`姓名中包含某字符串`的过滤，由符合要求的数据来调用 map 方法。

其次，`姓名中包含某字符串`过滤的思路是，用数组的 `filter` 方法，传入的回调函数对每个元素中的姓名字符串判断其是否包含用户输入的字符，返回 true 的都会被 `filter` 方法归入一个新的数组中：

```js
// filterStr 是保存用户在筛选框中输入数据的状态，在本文 3.3 中定义
// 不对用户输入的大小写进行限制
persons
.filter(
      item => 
      item.name.toLowerCase().indexOf(filterStr.toLowerCase()) > -1
    )
.map(
// 返回一条用户信息的 JSX 代码 
)
```

5. 如何根据性别，过滤显示数据？

与 4 中的过滤条件不同，性别是用户信息中的一个字段，实现根据性别筛选的思路是：

用户点击按钮 --> 触发事件处理函数 --> 改变状态 `show` 为点击的按钮  --> 计算出包含相应性别的用户信息数组 --> 数组调用 filter 和 map 方法返回其中的用户信息

具体来说：

5.1 定义 `show` 状态，保存用户点击的过滤按钮信息，用户点击 `all` 按钮，`show` 中存的内容变成 `all`，点击 `male` 和  `female` 时一次类推，这在本文 3.3 中作了定义。

> 插一个问题，如何获取用户点了某个按钮的信息？一种方法是给 `button` 标签增加 `data-value`属性，在`onClick`事件处理函数中用`event.target.dataset.value`读取其属性值。


5.2 定义`personToShow` 变量，保存用户点击了 `all`、`male` 和 `female` 后的相应信息的数组，数组怎么来，由执行 5.3 中的函数后计算得到。


5.3 定义函数 `showWho`，根据`show` 状态中的状态不同，返回不同数组：
```js
const showWho = () => {
    if (show === 'all') {
      return persons;
    } else if (show === 'male') {
      return persons.filter(person => person.sex === 'male')
    } else {
      return persons.filter(person => person.sex === 'female')
    }
  }
  
let personsToShow = showWho();
```


5.4  让 `personToShow` 取代 `persons` 来调用 4 中的 filter 和 map 方法。 
```js
personsToShow
.filter(
// 判断是否包含某字符串的代码
)
.map(
// 返回一条用户信息的 JSX 代码 
)
```

