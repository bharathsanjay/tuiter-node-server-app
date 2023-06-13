import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
    // const register = (req, res) => {
    //     const username = req.body.username;
    //     const user = usersDao.findUserByUsername(username);
    //     if (user) {
    //       res.sendStatus(409);
    //       return;
    //     }
    //     const newUser = usersDao.createUser(req.body);
    //     req.session["currentUser"] = newUser;
    //     res.json(newUser);
    //   };
    const register = (req, res) => {
        const { username, password, firstName, lastName } = req.body;
        const user = usersDao.findUserByUsername(username);
        if (user) {
          res.sendStatus(409);
          return;
        }
        const newUser = usersDao.createUser({
            username,
            password,
            firstName,
            lastName,
          });
        req.session["currentUser"] = newUser;
        res.json({user : newUser});
      };
     
      const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
          req.session["currentUser"] = user;
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      };
     
      // const profile = (req, res) => {
      //   const currentUser = req.session["currentUser"];
      //   if (!currentUser) {
      //     res.sendStatus(404);
      //     return;
      //   }
      //   res.json(currentUser);
      // };
      const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(404);
          return;
        }
        const user = usersDao.findUserById(currentUser._id); // Retrieve user profile by ID
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      };
     
      const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
      };
     
     
      // const update = async (req, res) => {

      //   const currUser = await usersDao.updateUser(req.body._id, req.body);
      //   console.log(currUser);
    
      //   if (currUser) {
    
      //     currentUserVar = currUser;
    
      //     return res.json(currentUserVar);
    
      //   } else {
    
      //     res.sendStatus(500);
    
      //   }
    
      // };

      const update = async (req, res) => {

        const currUser = await usersDao.updateUser(req.body._id, req.body);
    
        if (currUser) {
    
          currentUserVar = currUser;
    
          return res.json(currentUserVar);
    
        } else {
    
          res.sendStatus(500);
    
        }
    
      };

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put("/api/users/:uid",     update);
};
export default AuthController;

