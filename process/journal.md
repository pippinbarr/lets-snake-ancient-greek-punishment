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