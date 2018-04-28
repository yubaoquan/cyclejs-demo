# cyclejs-demo
Some small demos using cyclejs

### install

<del> install puer so that you can view the page as from server, this will avoid getting the error `Origin null is not allowed by Access-Control-Allow-Origin
` when demo sending an http request while you view the demo page just from file system. </del>

> npm install -g puer

go to the root path of demo, install all dependencies

> npm install

### run

in the root path of demo, open two terminal and run this 2 cmds below:

> npm run build

> puer

Then, open `http://localhost:8000/index.html` in broswer, you will see the demo running.


### What this demo does?

1. Four tabs, click on each tab to activate it.
2. Each tab has a component under it.
3. Two instances of component Foo is in the first tab, click on component foo, it will show you the second of current time.
4. Form component is in the second tab. It has two field: name and age. you can input the value of name or age and you get what you input below the form. Click the submit button to process a validation, and form component also emit a msg to the container component.
5. Ajax component is in the third tab. Click on the button to send an request to server, after the first request succeed, it will automatically send the second one, And print the response msg as json string in the tab. Otherwise if request failed, log an error msg in the console.
6. Container component, it wap all these components above, all its subcomponents emit msgs to it, and it pass the msg to the reducer to process. So the reducer knows all the dataflows through the whole app.

### Is it the best practice of cyclejs?

I don't know yet, there can be come implementations which are not well designed in this app, or even anti-pattern. Anyway, this demo app provide you a way to organize code using cyclejs to implement some daily needed features.

### Feedback

If you have any questions or find any bugs, please make an issue in this repo. Thank you.