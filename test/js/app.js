//document if ready
$(document).ready(async function () {

    // The classifier
    let classifier
    let modelURL = './model/'
    let disease
    let confidence

    //variables
    var popup = document.querySelector('#details-pop')
    var cross = document.querySelector('.cross')
    var resultText = document.querySelector('.result-text')
    var resultLoader = document.querySelector('.result-loader')
    var suggestDoc = document.querySelector('#details-pop a')

    //click event listener on cross
    cross.addEventListener('click', () => {
        popup.classList.add('hide-me')
    })

    function printResults(results){
        disease = results[0].label
        confidence = results[0].confidence * 100

        resultText.innerText = `${disease}: ${confidence.toFixed(2)}%`
        resultLoader.classList.add('hide-me')
        suggestDoc.classList.remove('hide-me')
    }

    //function to get results
    function fetchResults(error, results) {
        
        // Something went wrong!
        if (error) return console.error(error)
        
        printResults(results)
    }
    
    //to preload the model
    function preload() {
        classifier = ml5.imageClassifier(modelURL + 'model.json')
    }

    //to classify the image
    async function classifyImage(img) {
        await classifier.classify(img, fetchResults)
    }
    
    $('.image-section').hide()
    $('#result').hide()

    // preview the uploaded file
    //reading the image as an URL
    function readAsURL(dataImage) {
        if (dataImage.files && dataImage.files[0]) {

            //creating a fileReader
            var reader = new FileReader();

            reader.onload = (e) => {
                $('#imagePreview').attr("src", e.target.result).hide().fadeIn(500);
            }

            //readAsDataURL function - pre-defined
            reader.readAsDataURL(dataImage.files[0]);
        }
    }

    //change event listener on upload
    $("#imageUpload").change(function () {

        $('.image-section').show();
        $('#btn-predict').show();
        readAsURL(this);

    });

    //onclick event
    $('#btn-predict').click(async function () {

        // Show loading animation
        $(this).hide();

        //opening the popup
        popup.style.display = 'flex'

        // Make a prediction through the model on our image.
        const imgFromUser = document.getElementById('imagePreview');

        //sending image to classfiy function
        classifyImage(imgFromUser)

    });
    
    //function to preload the model
    preload()
});