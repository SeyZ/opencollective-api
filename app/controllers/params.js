module.exports = function(app) {

  /**
   * Internal Dependencies.
   */
  var models = app.set('models')
    , User = models.User
    , Group = models.Group
    , errors = app.errors
    ;

  /**
   * Public methods.
   */
  return {

    /**
     * Userid.
     */
    userid: function(req, res, next, userid) {
      User
        .find(parseInt(userid))
        .then(function(user) {
          if (!user) {
            return next(new errors.NotFound('User \'' + userid + '\' not found'));
          } else {
            req.user = user;
            next();
          }
        })
        .catch(next);
    },

    /**
     * Groupid.
     */
    groupid: function(req, res, next, groupid) {
      Group
        .find(parseInt(groupid))
        .then(function(group) {
          if (!group) {
            return next(new errors.NotFound('Group \'' + groupid + '\' not found'));
          } else {
            req.group = group;
            next();
          }
        })
        .catch(next);
    },

  }

};