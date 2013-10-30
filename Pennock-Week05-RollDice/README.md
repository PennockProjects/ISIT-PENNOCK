Assignment 04: Roll Dice
========================

Create a program that simulates rolling dice. We will need to roll a wide array of dice. Here is how it works.

The kind of die you see most often has six possible values:

1, 2, 3, 4, 5, 6

This kind of die is called a d6

In most games we play, there are 2 d6 dice. This is called 2d6:

	1, 2, 3, 4, 5, 6
	1, 2, 3, 4, 5, 6

For instance the first die might roll a 2, and the second a 6, this would return a value of 8. It is not possible for a d6 die to return 0 or 7.

We will also need 3 6 sided dice, which is called 3d6:

	1, 2, 3, 4, 5, 6
	1, 2, 3, 4, 5, 6
	1, 2, 3, 4, 5, 6

But not all dice have 6 sides. Some, for instance, have four. This kind of die is called a d4:

	1, 2, 3, 4

And of course tehre are d10s with possible return values between 1 and 10 inclusive, and d20s, with possible return values between 1 and 20 inclusive.

I want you to create a program with 6 buttons on it. Each button will return the result of a different kind of dice roll:

*Button01: D6
*Button02: 2D6
*Button03: 3D6
*Button04: D4
*Button05: D10
*Button06: D20

For the 2D6 and 3D6 rolls, I want you to display not only the result of the roll, but the actual value that each die returned:
A roll of the 3D6A roll of the 3D6

Figure01: Three dice were rolled. They returned a 5, 1, and 3 for a total of 9. See full size

Your solution should be more complex than this. I'm only showing the results for one sixth of the answer in this screen shot.

I want you to also run tests that confirm that over 250 rolls, each of your rolls return values that are within the appropriate range. For instance, You should roll your 2D6 dice 250 times and confirm that the result is always between 1 and 12, inclusive. You don't need to write 250 tests, you just call your roll 250 times and confirm that it never returns a value outside the range. If it does return a value outside the range, then the test should fail, otherwise, it passes.

Here is how to roll a D3:

	var rollD3 = function() {
		return Math.floor(Math.random() * 3) + 1;
	};

I think you can figure it all out from there. To return a six sided die roll, multiply by 6, not by 3. To return the result of rolling two six sided dice, call rollD6() twice, and add up the results. And so on. Or do something altogether different, if you prefer. Its all good so long as it works, and it isn't too verbose.

When rolling a 2D6 you would also want to tuck the values returned by each die away somewhere so you can display them to the user. Whether you just store the result of the two rolls in a single string, or in two separate number variables is up to you.

I stumbled across a nice little bug when I first started writing this code. Suppose you tried to call the results of a roll directly in an angular place holder:

	<p>{{getD3Roll()}}<p>

Angular will execute callD3Roll() which in turn calls your rollD3() function. Then every so often Angular checks to see if anything has changed by executing one of its watch() methods. Since the callD3Roll() function returns a random number, Angular will frequently find that the result has changed. I think in this case we have a 1 in 3 chance of the number not changing. So it updates the View. Then it checks to see if the value has changed. Whoops. It's changed, so it updates the view. And so on. If this happens often enough, it will assume it is stuck in some kind of loop, and start malfunctioning. You might not notice the errors unless you have your console view open in the debugger. But my experience shows that it will start malfunctioning if you do something like this.

The solution, of course, is to never call the rollD3 function that way. Instead, just call it on a button click:

	<button ng-click='getD3Roll()'>Roll D3</button>

This puts the onus on the user to check for a new value, rather than on Angular itself. And of course you have to figure out some way of getting the answer back into the view, but I'll let you figure out a good way to solve that problem. The key point is that the button click solution ensures that a new value appears only when the user requests it. Now Angular is happy, and the errors go away.

Put your implementation in a your repo in a folder called Week05-RollDice and submit the URL for your repo.