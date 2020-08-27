import React, {useRef, useEffect, useContext, useCallback, useMemo} from "react";
import { render } from "react-dom";

import Child from './components/child';


// 创建一个 Context 对象。(Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。)
// 当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
const colorContext = React.createContext("gray");

// useContext 减少组件层级
function Bar() {
  const color = useContext(colorContext);
  return <div>{color}</div>;
}

function Foo() {
  return <Bar />;
}


function App() {
  // useRef 保存引用值。useRef 跟 createRef 类似，都可以用来生成对 DOM 对象的引用
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);


  // useCallback 记忆函数
  // 第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染。
  // 这样只要子组件继承了 PureComponent 或者使用 React.memo 就可以有效避免不必要的 VDOM 渲染。
  const memoizedHandleClick = useCallback(() => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变

  // useCallback 记忆组件
  // 区别：useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。
  const memoizedHandleClicks = useMemo(() => () => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变


  return (
      <>
        <Child ref={inputRef} />

        {/* useContext 减少组件层级 */}
        {/*
        每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
        Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
        当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
        Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
         */}
        <br></br>
        <colorContext.Provider value={"red"}>
          <Foo/>
        </colorContext.Provider>
      </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

