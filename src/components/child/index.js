import React, { useState, useEffect, useLayoutEffect, useRef, useImperativeHandle, forwardRef, useReducer } from "react";

import reducer from '../../redux'

let timer = null;

function Child(props, ref) {
  // useState 保存组件的状态
  // useState 参数后返回一个带有默认状态和改变状态函数的数组。
  // 通过传入新状态给函数来改变原本的状态值。
  // 值得注意的是 useState 不帮助你处理状态，相较于 setState 非覆盖式更新状态，useState 覆盖式更新状态，需要开发者自己处理逻辑。
  const [obj, setObject] = useState({count: 0, name: "计数"});
  const [width, setWidth] = useState(0);

  // useReducer 类似 redux
  const [state, dispatch] = useReducer(reducer, obj);

  // useEffect 基于这个强大 Hooks，我们可以模拟封装出其他生命周期函数，比如 componentDidMount、componentWillUnmount、componentDidUpdate
  // 第一个参数传递函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，
  // 第二个参数是可选的数组，有数组时才会触发 useEffect 第一个参数中的函数。
  // 返回值(如果有)则在组件销毁或者调用函数前调用。
  // 如果要运行 useEffect 并仅将其清理一次（在装载和卸载时），则可以将空数组（[]）作为第二个参数传递。建议不要将它作为一种习惯，因为它经常会导致错误。
  // "模仿生命周期，useEffect 第二个参数传个空数组，无依赖，只执行一次，相当于didmount。
  // 如果要区分生命周期，不传第二个参数，每次都会跑，相当于didupdate。加个mount标记一下，里面用if判断一下，即可以达到模拟生命周期的效果"

  // 第二个参数为空数组，无依赖，只执行一次，模拟生命周期 componentDidUpdate 和 componentWillUnmount
  useEffect(() => {
    console.log('componentDidMount: 组件加载后');
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作');
    }
  },[]);

  // 第二个参数有值或者不传，监听参数变化, 每次都会跑，模拟生命周期 componentDidUpdate
  useEffect(() => {
    console.log("useEffect");
    if (mount.current) {
      mount.current = false;
      console.log('componentDidUpdate: 组件无更新')
    } else {
      console.log('componentDidUpdate: 组件更新后')
    }

    timer = setInterval(() => {
      setObject({ ...obj, count: obj.count + 1 })
    }, 1000);
    return () => {
      console.log('执行完以上函数后');
      clearInterval(timer);
    }
  },[obj.count]);


  // useLayoutEffect 同步执行副作用
  useLayoutEffect(() => {
    const box = document.querySelector("#box");
    const boxWidth = box.getBoundingClientRect().width;
    console.log("useLayoutEffect");
    if (width !== boxWidth) {
      setWidth(boxWidth);
    }
  });

  // useRef 保存引用值。
  // useRef 生成对 DOM 对象的引用，跟 createRef 类似
  const mount = useRef(true);
  const inputRef = useRef(null);

  // useImperativeHandle 透传 Ref。
  // 通过 useImperativeHandle 用于让父组件获取子组件内的索引
  useImperativeHandle(ref, () => inputRef.current);


  return (
      <>
        {/* 组件一 */}
        <div>
          <input type="text" name="child input" ref={inputRef} />
        </div>

        {/* 组件二 */}
        <br></br>
        <div>
          {obj.name}: {obj.count}
          <button onClick={() => setObject({ ...obj, count: obj.count + 1 })}>+</button>
          <button onClick={() => setObject({ ...obj, count: obj.count - 1 })}>-</button>
          <button onClick={() => clearInterval(timer)}>clear</button>
        </div>

        {/* 组件三 */}
        <br></br>
        <div>
          {obj.name}: {state.count}
          <button onClick={() => dispatch({ type: "increment", payload: 5 })}>+</button>
          <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>-</button>
        </div>

        {/* 组件四 */}
        <br></br>
        <div id="box">width：{width}</div>

      </>
  );
}

export default forwardRef(Child);
