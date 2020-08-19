//import Raven from "raven-js";
//import * as Sentry from "@sentry/react";

function init() {
  /*
  Sentry.init({
    dsn:
      "https://82588978b57f49e7a789d947b447d36e@o435416.ingest.sentry.io/5394687",
  });

  */
}

function log(error) {
  //Raven.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
