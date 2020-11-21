import TextLoop from 'react-text-loop';

export default function TextAnimation(props) {
    return (
        <TextLoop delay={1000} interval={2000} springConfig={{ stiffness: 180, damping: 15 }}>
            {props.texts.map((text, index) => {
                return <h1 key={index} className={props.styles.animatedText}>{text}</h1>
            })}
        </TextLoop>
    ); 
}