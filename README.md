# IMDB App

This app is created using MEAN Stack.

## Create Frontend Build

ng build


## MongoDB Database Connection

1. Create a database in your local environment with name `practice`.
2. Add two collections `users` and `movies` in it.
3. Create a few user documents for actors and producers (User collection has both. They can be identified by a field `type`).
Use this sample user document and add 4-5 more.

```js
{
    "name" : "Rahul 1",
    "fullName" : "Rahul 1",
    "type" : "actor"
}
```
To add producers, simply change type = "producer". Create 2-3 documents for each actor and producer.

## Run server

Run node command `node server.js`


## Browser Setup

1. Open `localhost:4700` in Chrome Browser.


## How to use the app?

### Create a Movie

1. Click "Create Movie" button. It will take you to Create movie page. Here you can create movies by adding details.
2. You can also search actors and producers. And add them to movie.
3. If actor/producer is not found, click on the button "Create Producer/Actor" next to text box. It will create and add it to your movie.
4. Come back to movie page and you can see list of movies along with their necessary data like name, year, producer and actor names.

### Update a Movie

1. In movie list page, you can see a button "Edit" next to each movie.
2. Click it and it will take you to the edit page.
3. Make changes and save.

## Future Updates

1. A bio profile page for each actor and producer to show their details and their movies, awards etc.
2. Add User logn/signup system so that each user can maintain their own interest and favourite movies n their own account.
3. User ratings and feedback.
4. Add a tag to each movie that is it safe for children or it should be only watched by 18+.