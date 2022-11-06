import React, { useState, useRef }  from "react";

const Child = ({data}) =>{
    console.log('child render...', data) // 每次更新都会执行
    // const [name, setName] = useState(data) // 只会在首次渲染组件时执行
    const instance = useRef(null);
    console.log(instance.current)
    const [name, setName] =  useState(() => {
        instance.current = data;
        return instance.current;
    }, [instance.current]);
    return (
        <div>
            <div>child</div>
            <div>{name} --- {data}</div>
        </div>
    );
}

function DelayCount() {
    const [count, setCount] = useState(0);
  
    function handleClickAsync() {
      setTimeout(function delay() {
        setCount(count + 1); // 问题所在：此时的 count 为5s前的count！！！
      }, 5000);

    //   setTimeout(function delay() {
    //     setCount(count => count + 1); // 重点：setCount传入的回调函数用的是最新的 state！！！
    //   }, 5000);
    }
  
    function handleClickSync() {
      setCount(count + 1);
    }
  
    return (
      <div>
        {count}
        <button onClick={handleClickAsync}>异步加1</button>
        <button onClick={handleClickSync}>同步加1</button>
      </div>
    );
  }

const List = () => {
    // useEffect(() => {
    //     (async () => {
    //       await fetchSomething();
    //     })();
    //   }, []);
    const [list, setList] = useState([2,32,1,534,44]);
    return (
        <>
            <ol>
            {list.map(v => <li key={v}>{v}</li>)}
            </ol>
            <button
            onClick={() => {
                // bad：这样无法触发更新！
                // setList(list.sort((a, b) => a - b));
                // good：必须传入一个新的对象！
                setList(list.slice().sort((a, b) => a - b));
            }}
            >sort</button>
        </>
    )
}

const Hook =()=>{
    console.log('Hook render...')
    const [name, setName] = useState('rose')
    const [count, setCount] = useState(0);
    return(
        <div>
            <div>
                {count}
            </div>
            <button onClick={()=>setName('jack')}>update name </button>
            <Child data={name}/>
            <List /> < br/>
    ------------------------------------------------------------------------

            <DelayCount />
        </div>
    )
}

export default Hook;