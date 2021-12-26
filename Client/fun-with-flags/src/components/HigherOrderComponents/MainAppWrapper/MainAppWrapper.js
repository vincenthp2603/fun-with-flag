import { Component } from "react";
import styles from "./MainAppWrapper.module.css";

class MainAppWrapper extends Component {

    render() {
        return (
            <div className={styles.container}>
                {this.props.children}
            </div>
        )
    }
}

export default MainAppWrapper;