# Client application

## Tech choices
- React - I needed quick results and I've used React extensively these days. I've considered trying Preact or Inferno to learn about their limitations, but since I opted for `create-react-app` I couldn't do it easily.
- CSS - I usually go with Sass (SCSS), but since I used `create-react-app` it was not possible. I've considered a CSS-in-JS solution, but ended up with plain CSS as a compromise.
- `create-react-app` - This is a small fun project, so hand-crafted, flexible setup was not required, and fast bootstrapping was beneficial. I've also wanted to try `create-react-app`, since I havn't used it before. *CONCULSION* It's a nice way to start the app quickly, but it has some painful limitations, mentioned above.
- `react-textfit` - a quick solution for adjusting font size to container width. It's nice, but slightly buggy, especially when used with flexbox elements.
- `react-storybook` - I've always used `react-playground` to get an encapsulated dev environement to work on components presentation layer. But `storybook` got a lot of traction recently and I wanted to try it. *CONCULSION* It's a great project with nice API and some handy plugins. I'll probably switch my other projects to it.

## Limitations
Although responsive, optimized for mobile screen sizes. Tested mostly on Chrome, and there are certainly some quirks in other browsers.

## Descoped - possible next steps
- Asking questions about locations that are close to the user
    + requires creating a more advanced data structure for the locations, so that getting a close location doesn't require looping over all 1000+ locations and calculating distance every time.
- Allow multi-player mode (possibly using [Uber trip experiences API](https://developer.uber.com/docs/trip-experiences) to play with co-passanger)
    + requires a server to act as authority for game timing and selecting questions.
