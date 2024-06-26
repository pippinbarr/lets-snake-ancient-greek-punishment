# Journal

## Start-up Culture -- Monday 24 June 2024

Well I started something. I figured (as per the [Why](./why.md)) I should just make something that should be "easy". I really hope it doesn't end up being, you know, not-easy.

But in principle I just need to implement snake, which I've done before, and then design snake levels and mechanical tweaks that turn it into the five punishment myths I always do.

First pass:

### Sisyphus

A stair (hill) of walls; apple at the bottom; each time you eat it the next one is up a step; at the top it resets to the bottom; 

Questions: 
- what about points? A global no points? Or you can get points? Do I care about the drama of reaching the infinite points? I do not. I kind of like the idea of points because it validates Sisyphus for carrying on. There is a reason. Punished but progressing.

### Prometheus

A rock of walls (in the form of the previous games); snake is laid across the top; ... and then?

Questions:
- how to represent a struggle? you can push a key that raises your snake head but it just falls back?
- how to represent the eagle? a wall that flies down from the sky and hits and kills you (instantly since there's no incremental death); is it scare away by the struggle? I suppose so? Might end up seeming a bit awkward...

### Tantalus

An apple above you, an apple below you; when you approach either it zips up and off the screen or behind a wall to become unattainable; returns once you're out of range; (this could be fiddly)

### Danaids

An apple to the left; an apple to the right? The left apple gives you a point and the right apple takes it away?

### Zeno

Maybe the effect is on time instead of distance? Is that fair? Like at the half-ways you take exponentially longer?

Or the tile increment gets smaller and smaller until there's no motion?

How to handle the two-dimensionality?

## Don't reinvent the ouroboros -- Tuesday 25 June 2024

I caught myself thinking about how I would engineer a new version of Snake for Let's Snake and it would be so clean and beautiful and also arguing that the previous version was written in Phaser 2 etc.

But NO PIPPIN. Just use the Snake you've already written, that works, and move fast. In honour of that I'm going to do it now BEFORE I do anything else today. Let's see if I can do the conversion to Phaser 3 quickly... or is it a hell waiting in there for me? LET'S SEE.

This is a bigger picture thing about game making too. And maybe especially for how I'm feeling about it just lately? I've spent a lot of time quite embedded in the specifics of implementations and surfacing them... and that has led to dwelling a lot on technical matters, luxuriating even... which takes time. And is interesting, but it's a timeline I don't think I want right now. I'd like to go idea->thing a little faster.

So, less love of code and more love of game.

## Sisyphusssed -- Wednesday 26 June 2024

Well I guess I got Snake working yesterday and then also got the Sisyphus level pretty tidied away? It came together pretty easily because of... the constraints! Yay constraints! Things fall into place in this kind of hybridization and adaptation, fewer choices.

I suspect Sisyphus was the easiest but that's alright, I'll pop away the others over the next days. As it comes so it goes.

Feels good to be making something that makes sense. 