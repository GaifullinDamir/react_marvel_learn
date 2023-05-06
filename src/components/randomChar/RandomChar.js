import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

//Реализовать заготовку второй страницы самостоятельно.

const RandomChar = (props) => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();
   
    //Таким образом мы записываем в state требуемые данные со всем полями.
    const onCharLoaded = (char) => {
        setChar(item => char);
    }

     //Выволняем запрос к серверу и получаем данные.
    //После, записываем эти данные в состояние текущего объекта.
    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).
            //то, что вернется в результате Promise, вернется и подставится автмоатически в this.onCharLoaded
            then(onCharLoaded);
    }

    useEffect(() => {
        console.log('effect RC 0');
        updateChar();

        const timerId = setInterval(updateChar, 60000);

        return () => {
            //Вызывается в том случае, если компонент был удален
            console.log('deleted');
            clearInterval(timerId);
        }
    }, [])


    //В зависимости от проверок, у нас будет записан элемент в переменную.
    //Пустые элементы отображаться на странице не будут.
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

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
                    onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{imgStyle}}/>
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