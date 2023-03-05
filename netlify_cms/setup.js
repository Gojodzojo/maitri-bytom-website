const netlifyCmsScript = document.createElement("script")
document.body.appendChild(netlifyCmsScript)

netlifyCmsScript.onload = async function () {
    const cssFiles = [
        "https://raw.githubusercontent.com/Gojodzojo/maitri-bytom-website/main/page/src/styles/global.css",
    ]

    cssFiles.forEach(css_url => {
        fetch(css_url)
            .then(css => css.text())
            .then(css => CMS.registerPreviewStyle(css, { raw: true }))
    })

    const webComponents = [
        "http://localhost:8000/proxy?path=http://www.bytom.maitri.pl/web_components/ZoomableImg.js"
    ]

    const webComponentsCodesPromises = webComponents.map(async (url) => {
        const code = await fetch(url)
        return await code.text()
    })

    const webComponentsCodes = await Promise.all(webComponentsCodesPromises)

    let getAsset
    const PostPreview = createClass({
        getInitialState: function () {
            console.log("Setting up preview window")

            getAsset = this.props.getAsset
            const previewWindow = this.props.window
            webComponentsCodes.forEach(previewWindow.eval)

            return null
        },

        render: function () {
            const getText = (field) => {
                const children = this.props.widgetFor(field).props.value.props.children
                return typeof children === "object" ? children[2] : children
            }

            let authorAndDate
            try {
                const date = this.props.widgetFor("date").props.value
                authorAndDate = h('h4', {},
                    getText('author'),
                    h('br', {}),
                    new Date(date).toLocaleDateString("pl")
                )
            } catch (error) {
                authorAndDate = ''
            }


            return h('div', {},
                h('h1', {}, getText('title')),
                authorAndDate,
                h('div', {}, this.props.widgetFor('body')),
            );
        }
    });

    const collections = [
        "strony_gornego_paska",
        "aktualnosci",
        "sekcje_stopki",
        "strona_glowna",
        "instrukcja",
    ]

    collections.forEach(collection => CMS.registerPreviewTemplate(collection, PostPreview))

    const imageWidget = {
        id: "zoomable-image",
        label: "Zdjęcie",
        collapsed: true,
        fields: [
            {
                label: "Zdjęcie",
                name: "src",
                widget: "image"
            },
            {
                label: 'Tytuł',
                name: 'title',
                widget: 'string'
            }
        ],
        pattern: /<img src="(.*?)" title="(.*?)" \/>/m,
        fromBlock: function (match) {
            return {
                src: match[1],
                title: match[2]
            };
        },
        toBlock: function ({ src = "", title = "" }) {
            return `<img src="${src}" title="${title}" />`;
        },
        toPreview: function ({ src, title }) {
            return `<zoomable-img src="${getAsset(src).url}" title="${title}" />`
        }
    }

    CMS.registerEditorComponent(imageWidget)
}

netlifyCmsScript.src = "https://unpkg.com/netlify-cms/dist/netlify-cms.js"