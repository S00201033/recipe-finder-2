

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require('firebase-admin');
admin.initializeApp();
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });




const db = admin.database().ref('/recipe-finder-549fd');

/*
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
*/

const getIngredientsFromDatabase = (res) => {
    let ingredients = [];
    return db.on(
        'value',
        snapshot => {
            snapshot.forEach(ingredient => {
                ingredients.push({
                    id: ingredient.key,
                    title: ingredient.val().title,
                });
            });
            res.status(200).json(ingredients);
        },
        error => {
            res.status(error.code).json({
                message: `Error: ${error.message}`
            });
        }
    );

};

exports.addingredient = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            });
        }
        const title = req.query.title;
        db.push({ title, author });
        getIngredientsFromDatabase(res);
    });
});

exports.deleteingredient = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'DELETE') {
        return res.status(401).json({
          message: 'Not allowed dude...'
        })
      }
      const id = req.query.id;
      //admin.database().ref(`/myingredients/${id}`).remove();
      db.child(id).remove();
      getIngredientsFromDatabase(res);
    });
  });

exports.getingredients = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        getIngredientsFromDatabase(res);
    });
});