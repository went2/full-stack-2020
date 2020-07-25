### Description
exercises 2.11-2.14 source code located in : `src`

It's a exercisting exercise because I finally deal with the data from the Internet! Thanks to the countries and weather apis' providers!

The exercises I completed are like:

![fetch countries and weather](/Users/tom/Desktop/full-stack-2020/part2/data for countries 2.12-2.14/image/fetch countries and weather.gif)

I meet almost all the requires of the exeises expect this one:
- when there is only one country matching the query, then the basic data of the country is shown. But the weather of its captical will not be shown.

when there are several countries matching the query, and click button `show` of one country, its basic data and capital's weather are shown.

Another thing I feel not quite satisfied is the App I made does not extract enough distinct components to make it more clear.

As usual I will make reflections of the thing I learned during coding.

### Reflection

这个练习的目标是完成一个检索国家及其首都天气信息的小应用，实现以下功能：
输入国家名称，如果：
	1. 匹配的国家国家大于 10 个，显示“太多匹配项，请继续输入”；
	2. 匹配的国家在 （1，10]之间，显示一个国家名称信息的列表，每个国家旁边有一个按钮，点击显示其基本信息（首都、人口、语言、国旗）和首都的天气；
	3. 匹配的国家只有 1 个，直接显示该国基本信息和首都的天气。

简要叙述遇到的问题和我的做法：
1. 什么时候获取国家信息？
国家信息是固定的，共250个。因此在应用第一次渲染完成后，用 `useEffect` 异步请求全部国家的信息，存到应用状态中，之后所有的搜索就不需要进行发送异步请求。

2. 更改状态是异步操作，如何做到把输入的字符设为状态后，立马使用该状态？
React 设置状态是一个异步操作，设置状态的代码后接直接使用该状态的代码往往得不到刚刚设置的值。

我的思路是在渲染部分语句中添加一个函数调用。在该函数中使用最新的状态，因为更改状态 会导致重新渲染，在重新渲染时会重新计算函数调用的值。

与这思路相应的代码是在实现“功能3”的需求时：
```js
return (
<>
{ 
  countryToShow.length  > 10 ? 
  'too many matches, specify another filter' :
  ( countryToShow.length === 1 ? showOneCountry() : 
  countryToShow.map((item) => 
  <div key={item.name}>{item.name} 
  <button
  style={{marginLeft:"8px"}}
  onClick={ (event) => showCountryInfo(event, item) }
  >show</button>
  </div>
  ) 
  )
}
</>
)
```
我直接在渲染部分写了判断的逻辑。这种写法不太优雅，但我目前没想到更好的办法。

另外一种想法：
由于所有国家信息在应用第一次渲染后就保存在了状态中，那么用户在 input 框输入国家名称时，无非是对输入值和已有的状态进行对比，得出匹配的条目数组，然后对数据的长度进行判断。

再下去就遇到问题，因为这里用到 input 受控组件，input 标签的 value 由状态决定，过程是：
1. 用户输入出发input onChange 事件；
2. 获取该事件`target.value`，设置到 React 状态；
3. 状态更新触发重新渲染，input 组件就能实时显示用户的输入字母

如果能在第 2 步，设置 React 状态后，马上能获取该状态的值，那就可以对该值进行判断，获取就不用在渲染部分写函数调用了。

这个问题存留，之后回过头再看。


#### 资源和备注

- 国家信息接口来自于项目 REST COUNTRIES，它通过 RESTful API 提供各国信息，github地址：
[REST Countries](https://github.com/apilayer/restcountries)

- 天气信息来自网站气 weatherstack ，注册一个免费账户即可使用该 api，地址：
[weatherstack](https://weatherstack.com/) 

- 气象服务需要 api-key，weatherstack 网站会给你一个api-key。不要把它明牌写在代码中，而用以下做法：

1. 在项目中根目录创建一个名为 `.env` 的文件并添加以下内容：

```js
REACT_APP_API_KEY = t0p53cr3t4p1k3yv4lu3 // 网站提供的api-key
```

2. 从 process.env 对象访问密钥的值:

```js
const api_key = process.env.REACT_APP_API_KEY
```

stackoverflow 的回答解释得更详细：
[Adding an .env file to React Project](https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project)

