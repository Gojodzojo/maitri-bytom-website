const netlifyCmsScript = document.createElement("script")
document.body.appendChild(netlifyCmsScript)

netlifyCmsScript.onload = function () {
    const cssFiles = [
        "https://raw.githubusercontent.com/Gojodzojo/maitri-bytom-website/main/src/styles/global.css",
        "https://raw.githubusercontent.com/Gojodzojo/maitri-bytom-website/main/src/styles/CustomImg.css",
    ]

    cssFiles.forEach(css_url => {
        fetch(css_url)
            .then(css => css.text())
            .then(btoa)
            .then(css => CMS.registerPreviewStyle('data:text/css;base64,' + css))
    })
}

netlifyCmsScript.src = "https://unpkg.com/netlify-cms/dist/netlify-cms.js"