import express from 'express';
import session from 'express-session';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import path from 'path';
import { fileURLToPath } from 'url';

export const app = () => {
  const app = express();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // all environments
  app.set('port', process.env.PORT || 3001);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(favicon('public/images/Favicon.svg'));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(errorHandler());
  app.use(
    session({
      secret: 'keyboard cat',   // required – keep it secret
      resave: false,            // don’t force a save on every request
      saveUninitialized: true, // create a session even if it’s empty
      cookie: {
        // For development you can keep secure: false.
        // In production set secure: true and enable trust proxy.
        secure: false,
        maxAge: 30 * 60 * 1000 // 30 minutes
      }
    })
  );

  return app;
};

export default app;
