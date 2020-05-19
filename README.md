# nodejs cli Minesweeper application

Checking out master will allow play of a simple Minesweeper game using classes.  Checking out the tag __noclass__ will allow play of the original game using no classes.  That version was written when nodejs v10.x was LTS.  The master branch requires nodejs v12.x+.

To start playing, `npm start` and away you go.  Pick a game type, (_N_)ovice, (_I_)ntermediate or (_E_)xpert.  Boards and amount of mines to find increases with difficulty.  Longer width terminals are recommended for higher difficulty games or it gets confusing quickly.  You may also just (_Q_)uit the game if you change your mind about get time warped.

Enter moves using (row, column) format (e.g. _0, 0_ or _0,0_).  The game will tell you (hopefully) if you input it wrong.  Try not to blow up.  Not really.  The lose screen isn't so scary.

At the end, win or lose, the game will print out in ms how much time was wasted.
