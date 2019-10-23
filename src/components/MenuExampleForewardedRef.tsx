// Example : Forwarding Refs - it means passing Element reference from Parent -> Child
// Ref forwarding is a technique for passing a ref through a component to one of its children.
// It's very useful for cases like reusable component libraries and Higher Order Components (HOC).
// 1. First create null reference using useRef(null)
// 2. pass callback function to child component and trigger it from child Eg. props.onClick
// =============================================================
/**
 * Usage : in Parent Component
 * const childRef = useRef<any>(null);

    const test = () => {
        console.log('Child Ref :', childRef);
        if (childRef && childRef.current) {
            childRef.current.open();
        }
    }
 * <MenuExample forwardedRef={childRef} onClick={test}/>
 */
import React from 'react';
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonButton,
    IonIcon,
    IonMenuButton
} from '@ionic/react';
import { home, person, chatbubbles, settings } from 'ionicons/icons';

export const MenuExampleForwardedRef = (props: any) => {

    return (
        <React.Fragment>
            <IonMenu side="start" menuId="first" contentId="myMenuOutlet" ref={props.forwardedRef}>

                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>My Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        <IonItem routerLink="/tab2">
                            <IonIcon icon={home} slot="start" />
                            Home
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={person} slot="start" />
                            Profile
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={chatbubbles} slot="start" />
                            Messages
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={settings} slot="start" />
                            Settings
                        </IonItem>
                    </IonList>
                </IonContent>

            </IonMenu>

            <IonRouterOutlet id="myMenuOutlet"></IonRouterOutlet>

            <IonHeader>
                <IonToolbar color="primary">
                    <IonButton slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButton>
                    <IonTitle>My Menu</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonButton expand="block" onClick={props.onClick}>Open Menu 2</IonButton>
            </IonContent>

        </React.Fragment>
    );
};


// Example 1 : https://codesandbox.io/s/5kw376nx1p
// ==========================================================
/* import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Child extends React.Component {
    // Unable to access the forwarded ref here:
    componentDidUpdate(prevProps) {
        console.log(this.props.forwardedRef); // null
        console.log(prevProps.forwardedRef); // null
    }

    render() {
        return (
            <React.Fragment>
                <input type="text" ref={this.props.forwardedRef} />
                <div>{this.props.count}</div>
                <input type="button" onClick={this.props.onClick} value={"Click"} />
            </React.Fragment>
        );
    }
}

// Parent is able to access the ref:
const Parent = () => {
    const childRef = useRef(null);
    const [count, setCount] = useState(0);

    function handleClick() {
        console.log(childRef.current); // correctly ref's the input el
        setCount(count => count + 1);
    }

    return <Child forwardedRef={childRef} count={count} onClick={handleClick} />;
};
function App() {
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Parent />, rootElement); */

// Example 2 : https://www.fullstackreact.com/articles/using-refs-in-react/
// ==========================================================
/*
// Ref.js
const TextInput = React.forwardRef((props, ref) => (
    <input type="text" placeholder="Hello World" ref={ref} />
));

const inputRef = React.createRef();

class CustomTextInput extends React.Component {
    handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(inputRef.current.value);
    };

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <TextInput ref={inputRef} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
 */
