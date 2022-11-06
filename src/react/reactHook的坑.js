// useEffect 死循环
// useEffect 在传入第二个参数时一定注意：第二个参数不能为引用类型，会造成死循环。
// 比如：[]===[] 为false，所以会造成 useEffect 会一直不停的渲染。
// useEffect 的 callback 函数中改变的 state 一定不能在该 useEffect 的依赖数组中。比如：useEffect(()=>{ setCount(count); }, [count]);依赖 count，callback 中又 setCount(count)。
// 推荐启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。此规则会在添加错误依赖时发出警告并给出修复建议。

// 函数作为依赖的时候死循环
// 有时候，我们需要将函数作为依赖项传入依赖数组中，例如：

// // 子组件
// let Child = React.memo((props) => {
//   useEffect(() => {
//     props.onChange(props.id)
//   }, [props.onChange, props.id]);
  
//   return (
//     <div>{props.id}</div>
//   );
// });

// // 父组件
// let Parent = () => {
//   let [id, setId] = useState(0);
//   let [count, setCount] = useState(0);
//   const onChange = (id) => {
//     // coding
//     setCount(id);
//   }
  
//   return (
//     <div>
//     	{count}
//       <Child onChange={onChange} id={id} />  // 重点：这里有性能问题！！！
//     </div>
//   );
// };
// 代码中重点位置，每次父组件render，onChange引用值肯定会变。因此，子组件Child必定会render，子组件触发useEffect，从而再次触发父组件render....循环往复，这就会造成死循环。下面我们来优化一下：

// // 子组件
// let Child = React.memo((props) => {
//   useEffect(() => {
//     props.onChange(props.id)
//   }, [props.onChange, props.id]);
//   return (
//     <div>{props.id}</div>
//   );
// });

// // 父组件
// let Parent = () => {
//   let [id, setId] = useState(0);
//   let [count, setCount] = useState(0);
//   const onChange = useCallback(() => { // 重点：通过useCallback包裹一层即可达到缓存函数的目的
//     // coding
//   }, [id]); // id 为依赖值
//   return (
//     <div>
//     	{count}
//       <Child onChange={onChange} id={id} />  // 重点：这个onChange在每次父组件render都会改变！
//     </div>
//   );
// };
// useCallback将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

// useEffect 里面拿不到最新的props和state
// useEffect里面使用到的 state 的值, 固定在了useEffect内部，不会被改变，除非useEffect刷新，重新固定 state 的值。

// useRef保存任何可变化的值，.current属性总是取最新的值。就是相当于全局作用域，一处被修改，其他地方全更新...

// function Example() {
//   const [count, setCount] = useState(0);
//   const latestCount = useRef(count);

//   useEffect(() => {
//     // Set the mutable latest value
//     latestCount.current = count;
    
//     setTimeout(() => {
//       // Read the mutable latest value
//       console.log(`You clicked ${latestCount.current} times`);
//     }, 3000);
//   });
// 总结
// 以上只是收集了一部分工作中可能会遇到的坑，大致分为2种：

// 闭包引起的 state 值过期
// 依赖值监听问题导致死循环
