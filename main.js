//https://teachablemachine.withgoogle.com/models/vBg21Bzx_/
//webcam.set, used to set up camera properties
prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})
camera = document.getElementById("camera")
Webcam.attach("#camera")

function capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src= ' " + data_uri + " '> ";

    })
}
console.log("ml5 version", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vBg21Bzx_/model.json", modelloaded)

function modelloaded() {
    console.log("modelloadedsucessfully")
}

function compare() {
    img = document.getElementById("captured_image")
    //classifier is the variable that hods the model
    //image is the variable that holds the picture
    classifier.classify(img, gotresult)
}

function speak() {
    var synth = window.speechSynthesis
    sp1 = "the first prediction is " + prediction1
    sp2 = "the second prediction is " + prediction2
    var utterthis = new SpeechSynthesisUtterance(sp1 + sp2)
    synth.speak(utterthis)
}

function gotresult(error, result) {
    if (error) {
        console.error(error)
    } else {
        console.log(result)
        prediction1 = result[0].label
        prediction2 = result[1].label
        document.getElementById("emotion1").innerHTML = prediction1
        document.getElementById("emotion2").innerHTML = prediction2

        speak()
        if (prediction1=="happy") {
            document.getElementById("emoji1").innerHTML="&#128522;"
        }
        if (prediction1=="sad") {
            document.getElementById("emoji1").innerHTML= "&#128532;"
        }
        if (prediction1=="sleepy") {
            document.getElementById("emoji1").innerHTML= "&#128564"
        }

        if (prediction2=="happy") {
            document.getElementById("emoji2").innerHTML="&#128522;"
        }
        if (prediction2=="sad") {
            document.getElementById("emoji2").innerHTML= "&#128532;"
        }
        if (prediction2=="sleepy") {
            document.getElementById("emoji2").innerHTML= "&#128564"
        }
    }
}