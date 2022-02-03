# Punnitsija

Some time ago a puzzling weighing conundrum came up in conversation:

> There are 12 weights. Eleven of them are of the same weight while one is either heavier or lighter than the others.
>
> You have a scale and are allowed to use it 3 times. 
>
> How do you determine which weight is of different weight and whether it's heavier or lighter?

Without giving it any thought I declared it simple muttering something about just using binary search.
Then a thought entered my mind to find the foolishness left by the void and promptly notified me that
just applying binary search will not be sufficient for this task.

> "Oh, it's actually not as simple as I felt..."

..and thus I set out to solve it. At first I tried quickly doodling it on paper to figure it out but
it proved to be a pain to manage on paper.

> "Well, I'll just write a program that solves it. The code is going to be the solution."

Getting to the solution took me almost 3 hours, so it definitely wasn't a simple no thought conundrum.

The solution is written in JavaScript. The program goes through all the 24 possible situations and confirms
that it offers the correct solution through weighing weight subsets 3 times.

The code uses a poetic combination of English and Finnish to portray the author's struggle to find a
solution to something that just came up in a conversation and started bugging them.

As for what the answer to the actual puzzle is, I'll say:

> It's kind of a mess to remember or come up with on the spot, innit?
>
> The anwer lies in the code
