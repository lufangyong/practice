import React, { Component } from 'react'

export default (loadComponent, placeholder = '拼命加载中...') => {
  return class AsyncComponent extends Component {
    unmount = false

    constructor () {
      super()
      this.state = {
        Child: null
      }
    }

    componentWillUnmount () {
      this.unmount = true
    }

    async componentDidMount () {
      const { default: Child } = await loadComponent()

      if (this.unmount) return

      this.setState({
        Child
      })
    }

    render () {
      const { Child } = this.state

      return (
        Child
          ? <Child {...this.props} />
          : placeholder
      )
    }
  }
}

// TODO 异步组件加载
// import React, { Component } from "react";

// export default function asyncComponent(importComponent) {
//   class AsyncComponent extends Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//         component: null
//       };
//     }

//     async componentDidMount() {
//       const { default: component } = await importComponent();

//       this.setState({
//         component: component
//       });
//     }

//     render() {
//       const C = this.state.component;

//       return C ? <C {...this.props} /> : null;
//     }
//   }

//   return AsyncComponent;
// }