/**
 * 
 * altr-img / Project Murdock
 * 
 * Author: Aim Diab
 * Created: July 14th, 2019
 * 
 * Version: 1.0.1
 * License: Open Source/GNU GPLv3
 * 
 * Our main function, from the file upload we process our file
 * 
 * @param {event} e 
 */
function processFile(e) {
    // instantiate a new file reader
    var reader = new FileReader();

    // get the file
    var file = e.target.files[0];

    // get the filename, we'll need it later
    var originalFilename = file.name;

    // execute reader function, readAsText is a method of the FileReader class
    reader.readAsText(file);

    // handle the file with the fileReader
    reader.onload = function(e) {
        // Put the file's contents into a variable
        var fileText = e.target.result;

        // Save the length of the file incase we need it
        fileLen = fileText.length;
        
        // Find all img tags in the file
        var imgArray = fileText.match(/<img(.*?)>/g);

        var newImgArray = [];
        // loop through our array of image tags from the file
        for ( i = 0; i < imgArray.length; i++) {

            // if the img tag already contains alt then set it to 0 and skip it
            if ( imgArray[i].includes('alt=') ) {
                imgArray[i] = 0;
                continue;
            }

            // we need a new variable to house our edited version
            let newImgTag = imgArray[i];

            // get the alt text from the file name
            altText = getAltText(newImgTag);

            // set the new img tag
            let holdingArray = newImgTag.split("<img")
            newImgTag = '<img alt="' + altText + '"' + holdingArray[1];

            // push the new img tag to the edited array
            newImgArray.push(newImgTag);
        }

        // unset empty values from the original array (tags that already have alt text)
        imgArray.filter( function(value, i, arr) {
            return value > 0;
        });

        // Create the new file text variable
        var newText = fileText;

        // find and replace each item in our twin arrays (edited and unedited)
        for ( i = 0; i < newImgArray.length; i++) {
            newText = newText.replace(imgArray[i], newImgArray[i]);
        }

        // Now display the new file text on the page
        displayContents(newText);
        // And create a download link on the page
        createDownloadLink(newText, originalFilename);
    };
}

/**
 * 
 * Create some alt text from an <img> tag's filename
 * 
 * @param {string} imgTag 
 */

function getAltText(imgTag) {
    // find the src attribute
    let filename = imgTag.match(/src="[^]*[.]/g);
            
    if ( filename != null && filename != undefined ) {
        // remove the src=" part and the trailing quotation mark
        filenameMinusSrc = filename[0].split('src="');
        filenameLimited = filenameMinusSrc[1].split('"');

        // split the file path by forward slashes to separate the filename out
        if ( filenameLimited[0].includes("/")) {
            filenameMinusDir = filenameLimited[0].split('/');

            // get the length of the array in order to determine what the index for the filename will be
            let lastIndex = filenameMinusDir.length - 1;
            filenameMinusDot = filenameMinusDir[lastIndex].split(".");

        } else {
            // else the filepath contains no directories because the image is in the same folder as the html file
            filenameMinusDot = filenameLimited[0].split(".");
        }
        
        // Finally, replace hyphens and underscores with spaces and return our alt text
        let altText = filenameMinusDot[0].replace(/[-_]/g, " ");
        return altText;

    } else {
        // If we failed somehow let's send back some alt text so we don't break the app
        return "An image of some kind.";
    }
}

/**
 * 
 * This is a helper function that displays the file in an html element on our page
 * 
 * @param {string} fileText 
 */ 
function displayContents(fileText) {
    // Get the container we want to put the text on by html element id
    var displayBox = document.getElementById('display');

    // Set the text value of that element equal to the fileText passed in as a parameter
    displayBox.textContent = fileText;
}

/**
 * 
 * This function creates the file and download link with our new processed file which is passed in through the parameter
 * 
 * @param {string} fileText (the text to create the new file with)
 * @param {string} filename (the original filename) 
 */
function createDownloadLink(fileText, filename) {
    var downloadLink = document.getElementById('dl-link');

    downloadLink.href = 'data:attachment/text,' + encodeURI(fileText);
    downloadLink.target = '_blank';
    downloadLink.download = filename;
}