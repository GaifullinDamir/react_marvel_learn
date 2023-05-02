//Надо дперенести сюда компонент. Добавить компоненту поле ID.
import { Component } from "react/cjs/react.production.min";

class CharItem extends Component {

    state = {
        active: false
    }

    onClickChar = (e) => {
        this.setState(({active}) => {
            return{
                active: !active
            }
        })
    }
    render() {
        const {active} = this.state;
        const {thumbnail, name} = this.props;
        const addClass = active ? 'char__item_selected' : null;
        return(
            <li className={`char__item ${addClass}`} onClick={this.onClickChar}>
                <img src={thumbnail} alt={name} style={{objectFit: 'cover'}}/>
                <div className={`char__name ${addClass}`}>{name}</div>
            </li>
        );
    }
    

}

export default CharItem;