# Tictrac Javascript Developer Test

## Brief

Using the provided HTML skeleton you will be required to replicate the given design. For the purpose of this test we will only require the page to work in the latest versions of Chrome and Firefox. The layout has already been styled for you.

The design illustrates how a list of tweets should be presented, you will need to markup and style these tweets.


We have included an array of tweet objects in (`data.js`) , you should use this array to dynamically populate the page content. The 5 latest tweets should be displayed on page load.

Links in tweets should be clickable as per the design.

The tweet dates should be displayed as relative (`5 days ago`) by default. On hover the corresponding absolute date will be displayed (`20th January 2014`).

You will implement a preference toggle that will allow the user to change between absolute and relative dates by default. Changing the toggle will update all displayed tweets instantly and this change should persist on page refresh.

---------------------------------------

**You have 1 hour**, we do not expect you to be able to complete the full test. Take your time and relax, work as you would normally. And feel free to use Google if you need to research something, we all do.

**Good luck!**


## And that's it, an hour gone!

Please be aware I am typing this ReadMe outside of the scope of 1 hour.

I will be describing/explaining in this ReadMe my approach, the difficulties I had and how I overcame them, as well as all the things I could have done to improve it.

### External Libraries/Helpers

Given the time I had, I decided to use a couple of external libraries.

- mustache

I used the mustache templating library in order to display my list of tweets. I thought at first that would be ideal for the static displaying of content, the JSON structure of the data object being very suited for logic-less mustache. There is no heavy interactions available with the list of tweets so that seemed the best as I started. Actually I managed to have some text displayed fairly easily.
I kept it simple, putting my template directly into the HTML in a script tag, as described on the official [mustache gitHub](https://github.com/janl/mustache.js#include-templates). That's certainly not the cleanest way (external template in a separate .mustache file would have been nicer).

- prettyDate

I used [this](https://github.com/wylst/pretty-date). Was straight forward and did the job for me.

### CSS

I wanted to apply BEM. I used it a lot at Shazam and I think it really works for the understanding of the structure of a DOM without the HTML open. I realise my class names are a bit too long. A prefix would have been better, and some renaming also. Something like this instead of *.tweet__*:

```
.tw__ {...}

```
Basically, this can be thought through a bit more in terms of naming.

I also structure my rules in the order they appear in the DOM. And all properties within a rule are alphabetically ordered, to avoid repetition.

### HTML

Not much to say here, I added my new style and my libraries. I made sure the script tag containing my template was going to be overwritten once I was going to render my list of tweets. Also I decided to add data.js directly in the list of JS to be loaded. In a more realistically world, the JSON would have come from server (which I could have stub/simulate) but for the purpose of this exercise, I simplified the load of the data object but just referencing the .js file in the HTML.

### JS

So I took few approaches here, which are kind of unfinished and not properly fully developed but will try to explain a bit more my ideas.

- MVC

I did try some sort of MVC approach. This is far from perfect (first *controller* and *view* are in the same file!!!). The point was trying to separate the 3 concerns. data.js was definitely representing the *model*. I wanted a controller.function that would grab the model data and ask another view.function to display it. That's pretty much as far as it gets at time of last commit.

- data.js

I wanted to create an interface to return the list of tweets so it will be cleaner and a bit more like how it would be with a modular approach. At first I passed the data object in the instantiation of the closure but then I changed it and put it in the closure directly, to remove it from the global scope. As *model* is meant to deal with the state of the data, I also modify tweet objects in this file by adding the new property *created_at_pretty*.

Also, I modify directly the data object with *dateIntoPrettyDate*. Basically this is not great:
```js
var dateIntoPrettyDate = function(tweets) {
    tweets.forEach(function(tweet) {
        var dateTransformed = prettyDate(tweet.created_at);
        tweet.created_at_pretty = dateTransformed;
    });

    return tweets;
}

var getLastNTweets = function(n) {
    var lastNTweets = data.slice(0, n);
    lastNTweets = dateIntoPrettyDate(lastNTweets);
    return lastNTweets;
}
```
I pass a list of tweets using *slice*, which with arrays of object still **refer** to the actual objects in data. So that *each* modify directly the data object. There is no need for those returns... For something like this, I could have picked a sublist of tweets as a copy and manipulate it independently from the source of truth data object. My approach was more to modify the data object alongside the display of the tweets on the screen. So if we need to refer to *created_at_pretty* at a later stage the object data is already modified and contains it.

- main.js

I created there 2 main functions: *controller* and *view*.

- controller only talk to the view with the data returned by the model.

- view only displays what the controller passed to it in a container.

I declare my jQuery variables with a **$** in front of it:

```
var $container = $('#content');
```
This is to differentiate quickly in the file which variables are referring to jQuery DOM elements and which ones aren't.

### Improvements and ideas to complete the test

- Improvements

Retrospectively now, and given the *date display interaction* that I would have had to work on later on, maybe another approach than mustache could have also worked. I think the binding of data using Angular (for instance) would have been good too. The displaying of a list of elements is very straight forward with Angular, and the binding of values would have potentially made it easier to swap the view of the dates between absolute or relative.

The DOM could potentially be more concise.

I want to modify the toggle for the menu. It is not necessary to have a JS for a toggle like this. This is actually feasible in CSS only.

I would have changed the menu burger PNG for a SVG, considering this exercise only had to run on latest browsers (easier to manipulate in CSS, possibility to change color/size...).

Writing tests (of course).

Use of twitter API directly (but out of scope for this exercise).

Better modular approach (at least separation in different files).

Any sort of minifier, SASS, concat of files etc... in order to optimise that list of CSS and JS imports in the HTML.

- Finishing the test

For the date format swapping, I would have played with two elements in DOM, one hidden one visible, one containing the absolute one containing the relative, and would have played with a CSS rule *:hover* for displaying one or the other.

For modifying the actual state of how to display the dates, I would have, on click, injected a modifier class (in BEM something like *tweet--absolute-date*) in the *#content* tag, modifying all the tweet dates at once in CSS.

I would have used *localStorage* for keeping the state at refresh, given that we don't have a server that would want this kind of information.

In order to make the links, # and @ clickable, I would have used a RegExp, or maybe a little js tool such as [this](https://github.com/bryanwoods/autolink-js).

Let's say the data is returned to the FE through a AJAX call, I would have put a spinner in the #content in order to give visual feedback to the user that something was going to be populated.

### Final thoughts

It was good to dev this little test. I am planning on cleaning and finishing it properly. 1 hour was a stressful deadline but I had something on screen at the end. I would have liked to develop a bit more the JS: the URL detection and the localStorage were maybe more interesting to focus on than the CSS.
