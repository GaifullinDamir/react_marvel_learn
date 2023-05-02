import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

// const CharItem = (data) => {
//     return (
//         data.charList.map(item => {
//             <li className="char__item">
//                 <img src={item.thumbnail} alt={item.name}/>
//                 <div className="char__name">item.name</div>
//             </li>
//         })
//     )
// }

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error:false
    }


    // charItems = this.state.charList.map(item => {
    //     <li className="char__item">
    //         <img src={item.thumbnail} alt={item.name}/>
    //         <div className="char__name">item.name</div>
    //     </li>
    // })
    marvelService = new MarvelService();

    onCharLoaded = (charList) => {
        this.setState({charList, loading: false}) 
    }

    updateCharList = () => {
        // const id = 0;

        // let idList = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        // idList = idList.map(item => {
        //     while(idList.includes(item)){
        //         item = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //     }
        //     item = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // })

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
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View charList={charList} /> : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {content}

                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({charList}) => {
    return (
        charList.map(item => {
            return(
                <li className="char__item">
                <img src={item.thumbnail} alt={item.name}/>
                <div className="char__name">{item.name}</div>
            </li>
            ) 
        })
    )
}

export default CharList;