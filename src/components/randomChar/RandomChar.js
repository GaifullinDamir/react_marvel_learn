import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


//1. При нажатии на TRY IT загружается новый персонаж | OK
//2. При загрузке изображения-заглушки сделать так, чтобы css cover менялся на contain | OK
//3. Реализовать компонент charList
class RandomChar extends Component {

    //Создаем состояние класса RandomChar
    //Используем синтоксис полей классов
    state = {
        char: {},
        //Идет загрузка компонента или нет
        loading: true,
        error: false,
        imgNF: false
    }

    marvelService = new MarvelService();

   
    //Таким образом мы записываем в state требуемые данные со всем полями.
    onCharLoaded = (char) => {
        const imgNFPath = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        this.setState({char, loading: false, imgNF: char.thumbnail == imgNFPath})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

     //Выволняем запрос к серверу и получаем данные.
    //После, записываем эти данные в состояние текущего объекта.
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({loading:true})
        this.marvelService.
            getCharacter(id).
            //то, что вернется в результате Promise, вернется и подставится автмоатически в this.onCharLoaded
            then(this.onCharLoaded).
            catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
    }

    render() {

        //Производим деструктуризацию нашего состояния, дабы работать с этими данными далее.
        //Из свойства char мы вытаскиваем наши свойства.
        // const{char: {name, description, thumbnail, homepage, wiki}, loading} = this.state;
        const{char, loading, error, imgNF} = this.state;
        //В зависимости от проверок, у нас будет записан элемент в переменную.
        //Пустые элементы отображаться на странице не будут.
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} imgNF={imgNF}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                        onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char, imgNF}) => {
    
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgStyle = (imgNF ? 'contain' : 'cover');
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: imgStyle}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;