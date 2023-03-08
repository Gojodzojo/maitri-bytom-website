const { cssFiles, webComponentsUrl } = window.config

const netlifyCmsScript = document.createElement("script")
document.body.appendChild(netlifyCmsScript)

netlifyCmsScript.onload = async function () {
    cssFiles.forEach(css_url => {
        fetch(css_url)
            .then(css => css.text())
            .then(css => CMS.registerPreviewStyle(css, { raw: true }))
    })

    const webComponentsRes = await fetch(webComponentsUrl)
    const webComponentsCode = await webComponentsRes.text()

    let getAsset
    const PostPreview = createClass({
        getInitialState: function () {
            console.log("Setting up preview window")

            getAsset = this.props.getAsset

            const previewWindow = this.props.window
            previewWindow.eval(webComponentsCode)

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

    const zoomableImgWidget = {
        id: "zoomable-img",
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

    CMS.registerEditorComponent(zoomableImgWidget)

    const imageGalleryWidget = {
        id: "image-gallery",
        label: "Galeria zdjęć",
        collapsed: true,
        fields: [
            {
                label: "Zdjęcia",
                name: "images",
                widget: "list",
                summary: '{{fields.image}}',
                collapsed: false,
                label_singular: "zdjęcie",
                field: { label: "Zdjęcie", name: "image", widget: "image" }
            }
        ],
        pattern: /<image-gallery images='(.*?)' \/>/m,
        fromBlock: function (match) {
            return {
                images: JSON.parse(match[1]),
            };
        },
        toBlock: function ({ images = [] }) {
            images = images.filter(img => typeof img === "string")

            return `<image-gallery images='${JSON.stringify(images)}' />`;
        },
        toPreview: function ({ images = [] }) {
            images = images
                .filter(img => typeof img === "string")
                .map(img => getAsset(img).url)

            return `<image-gallery images='${JSON.stringify(images)}' />`;
        }
    }

    CMS.registerEditorComponent(imageGalleryWidget)
}

netlifyCmsScript.src = "https://unpkg.com/netlify-cms/dist/netlify-cms.js"