# What it does:
altr-img / Project Murdock (named after Matt Murdock aka Daredevil) is a lightweight HTML Post Processor that you can run your html and template files through in order to automagically add in alt text to <img> tags that you may have forgotten to assign the attribute to.

# How does it work?
With some sorcery (and regular expressions) we find all the <img> tags (that don't already contain an alt attribute) from a text file and put them in an array. Then we use the image's filename to create some reasonably relevant alt text and create a second array to hold the edited <img> tags. Finally, we do a good old fasioned search and replace on all the <img> tags that we found.

# Why I made this:
I've always found it annoying that right after adding the src for an image tag and any classes there's always one last attribute to add, alt text or alternative text is a very important attribute for making sure your website is accessible to people with vision impairment or blindness. In addition to supporting web accessibility, search engines use alt text from images for additional indexing, especially in image searches. For these reasons, you should always remember to add alt text.

# How to use:
Since the tool is written entirely in Javascript, you can run it offline in your browser by just dragging and dropping the index.html file into your browser. You can also host it using a web server or a local development environment like a WAMP, MAMP or Node JS server.

# Wishlist:
I'd like to port this tool into a node js cli tool that runs on an entire folder. If you feel like you have the expertise to help take this project to the next level feel free to **fork** me!

Cheers!
#Aim Diab
#Full Stack Web Developer