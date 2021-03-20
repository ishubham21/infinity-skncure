//document if ready
$(document).ready(async function () {

    // The classifier
    let classifier
    let modelURL = 'https://teachablemachine.withgoogle.com/models/4pbv0d_vM/'
    let disease
    let confidence

    //function to get results
    function fetchResults(error, results) {
        
        // Something went wrong!
        if (error) return console.error(error)
        
        // Store the label and classify again!
        disease = results[0].label
        confidence = results[0].confidence * 100

        alert(`${disease}: ${confidence.toFixed(2)}%`)
    }
    
    //to preload the model
    function preload() {
        classifier = ml5.imageClassifier(modelURL + 'model.json')
    }

    //to classify the image
    function classifyImage(img) {
        classifier.classify(img, fetchResults)
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
        $('#result').text('').hide();
        readAsURL(this);

    });

    //onclick event
    $('#btn-predict').click(async function () {

        // Show loading animation
        $(this).hide();

        // Make a prediction through the model on our image.
        const imgFromUser = document.getElementById('imagePreview');

        //sending image to classfiy function
        classifyImage(imgFromUser)

    });
    
    //function to preload the model
    preload()
});