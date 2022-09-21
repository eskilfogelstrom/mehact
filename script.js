function createElement(elementType, props, children) {
    let element = document.createElement(elementType);

    Object.keys(props).forEach(propName => {
        element[propName] = props[propName];
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            let node = document.createTextNode(child);
            element.appendChild(node);
        } else {
            element.appendChild(child)
        }
    });

    return element;
}

let values = [];
let valueCounter = 0;

function useState(defaultValue) {
    let valueIndex = valueCounter;

    if (values[valueIndex] === undefined) {
        values[valueIndex] = defaultValue;
    }

    const setValue = newValue => {
        values[valueIndex] = newValue;
        render();
    };

    let value = values[valueIndex];

    valueCounter += 1;

    return [value, setValue];
}

function App() {
    let [counter, setCounter] = useState(0);
    let [name, setName] = useState('');

    function buttonClick() {
        setCounter(counter + 1);
    }

    function resetClick() {
        setCounter(0);
    }

    function inputChange(e) {
        setName(e.target.value);
    }

    return createElement('div', {className: 'title', id: 'title'}, [
        createElement('h1', {}, ['Counter: ' + counter]),
        createElement('h2', {}, ['Name: ' + name]),
        createElement('input', {onchange: inputChange}, []),
        createElement('button', {
            onclick: buttonClick
        }, ['Increase']),
        createElement('button', {
            onclick: resetClick
        }, ['Reset']),
    ]);
}

function render() {
    valueCounter = 0;
    let root = document.getElementById('root');  
    root.innerHTML = '';
    root.appendChild(App());
}

render();