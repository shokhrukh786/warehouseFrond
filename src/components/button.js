



const Button = (props) => (
    <button
        type={props.type}
        className={props.className}
        onClick={() => (props)}
    >
        {props.name}
    </button>
);
export default Button;