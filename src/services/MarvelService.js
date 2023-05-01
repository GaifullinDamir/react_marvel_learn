
//Этот класс на чистом JS, поэтому мы ничего не импортируем для него.
class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=8e8fe48f8d1a75d5a0ef59af78a5207f';
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    //Этот метод переводит данные в тот формат, который нам интересен
    _transformCharacter = (char) => {
        let desc = char.description != '' ? char.description : 'Description not found. Sorry.';
        desc = desc.length > 227 ? `${desc.slice(0,227)}...` : desc;
        return {
            name: char.name,
            description: desc,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url}
        
    }

}

export default MarvelService;