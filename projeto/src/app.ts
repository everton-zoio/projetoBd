import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";


export class Server {

  public app: express.Application;

  constructor() {

    this.app = express();
    this.config();
    this.routes();
    this.api();
  }

  public api() {
    //empty for now
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  
  
    //use json form parser middlware
    this.app.use(bodyParser.json());
  
    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
  
  
    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });
  }

  public routes() {
    this.app.get("/", function(req:Request, res:Response){
      res.render("index", {});
    });
  }
}
