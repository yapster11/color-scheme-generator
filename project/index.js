const modeOptions = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']
const colorDropdown = document.getElementById("color-dropdown")
const generateBtn = document.getElementById("generate-btn")
const colorScheme = document.getElementById("color-scheme-div")

function renderModesHtml() {
    let modeOptionsHtml = ``
    for (let mode of modeOptions) {
        modeOptionsHtml += `
            <option value="${mode}">${mode}</option>
        `
    }
    colorDropdown.innerHTML = modeOptionsHtml
}

renderModesHtml()

generateBtn.addEventListener("click", function(e){
        let seedColor = document.getElementById("seed-color").value.slice(1)
        let mode = colorDropdown.value
        
        fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
            .then(res => res.json())
            .then(data => {
                let renderSchemeHtml = `` 
                for (let hex of data.colors) {
                    renderSchemeHtml += `
                        <div class="color-scheme">
                            <div class="box hex-value" style="background-color: ${hex.hex.value}" id="${hex.hex.value}"></div>
                            <span class="hex-value">${hex.hex.value}</span>
                        </div>
                    `
                }
                colorScheme.innerHTML = renderSchemeHtml          
            })
})

document.getElementById("color-scheme-div").addEventListener("click", function (e){
    let textArea = document.createElement("textarea");
    textArea.value = e.target.id;
    alert("Copied to clipboard!")
  
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
})


//hex.name.value