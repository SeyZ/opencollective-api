var fs = require('fs')
  , status = require('../lib/status.js')
  ;

module.exports = function(app) {

  /** 
   * Status.
   */
  app.get('/status', status);


  /**
   * Fake temp response.
   */
  var fake = function(req, res, next) {
    res.send('Not implemented yet.');
  };


  /**
   * Users.
   */
  app.post('/users', fake); // Create a user.
  app.get('/users/:userid', fake); // Get a user.
  app.put('/users/:userid', fake); // Update a user.
  app.get('/users/:userid/email', fake); // Confirm a user's email.


  /**
   * Authentication.
   */
  app.post('/authenticate', fake); // Authenticate user to get a token.
  app.post('/authenticate/refresh', fake); // Refresh the token (using a valid token OR a expired token + refresh_token).
  app.post('/authenticate/reset', fake); // Reset the refresh_token.


  /**
   * Credit card.
   *
   *  Let's assume for now a card is linked to a user.
   */
  app.post('/users/:userid/cards', fake); // Create a user's card.
  app.put('/users/:userid/cards/:cardid', fake); // Update a user's card.
  app.delete('/users/:userid/cards/:cardid', fake); // Delete a user's card.


  /**
   * Groups.
   */
  app.post('/groups', fake); // Create a group.
  app.put('/groups/:groupid', fake); // Update a group.
  app.delete('/groups/:groupid', fake); // Delete a group.


  /**
   * UserGroup.
   *
   *  Routes to deal with the relations between a group and a user.
   */
  app.post('/groups/:groupid/users/:userid', fake); // Add a user to a group.
  app.put('/groups/:groupid/users/:userid', fake); // Update a user's role in a group.
  app.delete('/groups/:groupid/users/:userid', fake); // Remove a user from a group.


  /**
   * Transactions (financial).
   */
  app.get('/groups/:groupid/transactions', fake); // Get a group's transactions.
  app.post('/groups/:groupid/transactions', fake); // Create a transaction for a group.


  /**
   * Activities.
   *
   *  A group activity can be anything from "a user has been added to the group" to a transaction itself.
   *  For a user, we should define if a an activity is something that happens and is linked to 
   *   him ("you have been added to a group"), or something he made (to keep track of what he did).
   */
  app.get('/groups/:groupid/activities', fake); // Get a group's activities.
  app.get('/users/:userid/activities', fake); // Get a user's activities.



  /**
   * Error handler.
   */
  app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') // because of jwt-express
      err.code = err.status;
    res.header('Cache-Control', 'no-cache');
    if (!err.code) 
      err.code = err.status || 500;
    console.log('Error : ', err);
    res.send(err.code, {error: err});
  });

};