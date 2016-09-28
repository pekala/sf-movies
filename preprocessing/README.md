# Data preprocessing

The raw data comes from [SF OpenData](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am) website and consists of basic info about the filming location and the movie.

For the game to be a bit more interesting, we need to decorate the raw data with some additional info about the location and movie, from various API.

In order to put anything on the map, we need the geo coordinates. These can be retrieved from [Google Geoconding API](https://developers.google.com/maps/documentation/geocoding/start). Based on the name of the location in SF, California, we get exact address, geo coordinates of the location (or the center point of it) and two coordinates describing bounding area.

To get a bit more info about the movie itself, we can use a lot of open services. One with a nice API is [The Movie DB](developers.themoviedb.org/3). We can get info on plot of the movie, poster, popularity etc. as well as more data on the leading actor/actress. One problem with this API, is that it is rate limited to 40 requests per 10s. We need to do a total of 3N + 1 requests for N movies, so with 1241 we need to batch the requests.

Additional API can be used to enrich the dataset even more, by adding more preprocessors in the format of `(items: Object[]) => Promise<Object[]>`
