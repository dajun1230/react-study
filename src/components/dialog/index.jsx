import React, { Component } from "react";
import { createPortal } from "react-dom"; // 传送门

import './index.less';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }

  componentWillUnmount() {
    if (this.node) {
      window.document.body.removeChild(this.node);
    }
  }

  render() {
    const { hideDialog } = this.props;
    return createPortal(
      <div className="dialog">
        {this.props.children}
        {typeof hideDialog === "function" && (
          <button onClick={hideDialog}>关闭弹窗</button>
        )}
      </div>,
      this.node
    );
  }
}
