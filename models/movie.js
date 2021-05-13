class Movie{
    constructor(id,name,release_date,genre,language,cast,description,imageUrl){
        this.id=id;
        this.name=name;
        this.release_date=release_date;
        this.genre=genre;
        this.language=language;
        this.cast=cast;
        this.description=description;
        this.imageUrl = imageUrl;
    }
}

export default Movie;