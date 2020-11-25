import styles from './button.module.css'

export default function Button(props) {
	var buttonStyle;
	switch (props.type) {
		case 'outline':
			buttonStyle = styles.outlineButton;
			break;
		case 'solid':
			buttonStyle = styles.solidButton;
			break;
		case 'none':
			buttonStyle = styles.noOutlineButton;
			break;
		case 'destructive':
			buttonStyle = styles.destructiveButton;
			break;
		default:
			buttonStyle = styles.outlineButton;
			break;
	}
	return(
		<button className={buttonStyle} type="button" onClick={props.onClick}>
			{props.name}
		</button>
	)
}