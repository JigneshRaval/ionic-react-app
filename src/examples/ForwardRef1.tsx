// Ref.js : https://www.fullstackreact.com/articles/using-refs-in-react/
import React from 'react';

const TextInput = React.forwardRef((props: any, ref: any) => (
    <input type="text" placeholder="Hello World" ref={ref} />
));

const inputRef = React.createRef<any>();

class CustomTextInput extends React.Component {

    handleSubmit = (e: any) => {
        e.preventDefault();
        if (inputRef && inputRef.current) {
            console.log(inputRef.current.value);
        }
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
