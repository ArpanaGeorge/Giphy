# Giphy

##Program Logic

-For UI, used bootstrap grid with first row containing the topics buttons, second row containing 2 columns - 1 for the gif's and 2nd for the form asking to add a nature category.

-Used an array of Topics to hold all the different nature category<br>
-On clicking each topic button, inserted 10 giphy's and it's ratings using AJAX and giphy API<br>
-On clicking the gif's, switched between play and pause by switching the src attribute to still and animating gif's<br>
-On adding a nature category, added those buttons dynamically to the existing ones by dynamicaly generating buttons for each topic in the array