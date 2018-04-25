# cyclejs-demo
Some small demos using cyclejs

### install

install puer so that you can view the page as from server, this will avoid getting the error `Origin null is not allowed by Access-Control-Allow-Origin
` when demo sending an http request while you view the demo page just from file system.

> npm install -g puer

go to the root path of demo, install all dependencies

> npm install

### run

in the root path of demo, open two terminal and run this 2 cmds below:

> npm run build

> puer

Then, open `http://localhost:8000/index.html` in broswer, you will see the demo running.