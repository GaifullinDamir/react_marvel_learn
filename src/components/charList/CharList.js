import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import CharItem from '../charItem/CharItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error:false
    }
    marvelService = new MarvelService();

    onCharLoaded = (charList) => {
        this.setState({charList, loading: false}) 
    }
    
    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateCharList = () => {

        this.setState({loading:true})
        this.marvelService.
            getAllCharacters().
            //то, что вернется в результате Promise, вернется и подставится автмоатически в this.onCharLoaded
            then(this.onCharLoaded).
            catch(this.onError);
    }

    componentDidMount() {
        this.updateCharList();
    }
    render() {

        const {charList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View charList={charList}/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({charList}) => {
    const active = 'char__item_selected';
    debugger;
    return (
        charList.map(item => {
            const{id, ...itemProps} = item;

            return(<CharItem key={id} {...itemProps} />)
        })
    )
}

export default CharList;