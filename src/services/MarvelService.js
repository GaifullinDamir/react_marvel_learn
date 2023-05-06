import { useHttp } from "../hooks/http.hook";

//Этот класс на чистом JS, поэтому мы ничего не импортируем для него.
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=8e8fe48f8d1a75d5a0ef59af78a5207f';
    const _baseOffset = 210;

    //Теперь наша функция отталкивается от аргумента, что позволит ей быть более гибкой
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformComics);
    }
    //Этот метод переводит данные в тот формат, который нам интересен
    const _transformCharacter = (char) => {
        let desc = char.description != '' ? char.description : 'Description not found. Sorry.';
        desc = desc.length > 227 ? `${desc.slice(0,227)}...` : desc;
        
        return {
            name: char.name,
            description: desc,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
        
    }

    const _transformComics = (comic) => {
        return {
            title: comic.title,
            price: comic.prices[0].price,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            id: comic.id,
            detail: comic.urls[0].url
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics};
}

export default useMarvelService;