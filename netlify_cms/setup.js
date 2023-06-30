const netlifyCmsScript = document.createElement("script")
document.body.appendChild(netlifyCmsScript)

netlifyCmsScript.onload = async function () {
    const { cssFiles, webComponentsUrl, tagUtilsUrl } = window.config

    const tagUtilsResp = await fetch(tagUtilsUrl)
    const tagUtilsText = await tagUtilsResp.text()
    const { parseTagProps, specialParse, specialStringify } = await import('data:text/javascript;base64,' + btoa(tagUtilsText))

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
            const collectionName = this.props.entry._root.nodes[11].nodes[1].entry[1]

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

            let articleTags
            try {
                const tags = this.props.widgetFor("tags").props.value._tail.array
                articleTags = h(`article-tags`, { tags: specialStringify(tags) })
            } catch (error) {
                articleTags = ''
            }

            let slides = ''
            if (collectionName == "strona_glowna") {
                let slidesArray
                let interval
                try {
                    slidesArray = this.props.widgetFor("slides").props.value._tail.array
                    interval = getText("slide_interval")
                } catch (error) {
                    slidesArray = []
                    interval = 1000
                }

                let slidesProps = []
                slidesArray.forEach(slide => {
                    if (!(slide?._root)) return

                    let props = {
                        image: "",
                        text: "",
                    }

                    slide._root.entries.forEach(([propName, propValue]) => {
                        props[propName] = propValue
                    })

                    props.image = getAsset(props.image).url;

                    slidesProps.push(props)
                })

                slides = h(`automatic-image-gallery`, { interval, slides: specialStringify(slidesProps) })
            }

            return h("div", {},
                slides,
                h('article', { className: "content" },
                    collectionName == "strona_glowna" ? "" : h('h1', {}, getText('title')),
                    authorAndDate,
                    h('div', {}, this.props.widgetFor('body')),
                    articleTags
                )
            )
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
        pattern: /<img (.*?)>/m,
        fromBlock: function (match) {
            return parseTagProps(match[1])
        },
        toBlock: function ({ src = "", title = "" }) {
            return `<img src="${src}" title="${title}">`;
        },
        toPreview: function ({ src, title }) {
            return `<zoomable-img src="${getAsset(src).url}" title="${title}">`
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
        pattern: /<image-gallery (.*?)>/m,
        fromBlock: function (match) {
            let props = parseTagProps(match[1])

            if (props.images) {
                props.images = specialParse(props.images)
            }

            return props
        },
        toBlock: function ({ images = [] }) {
            images = images.filter(img => typeof img === "string")

            return `<image-gallery images="${specialStringify(images)}">`;
        },
        toPreview: function ({ images = [] }) {
            images = images
                .filter(img => typeof img === "string")
                .map(img => getAsset(img).url)

            return `<image-gallery images="${specialStringify(images)}">`;
        }
    }

    CMS.registerEditorComponent(imageGalleryWidget)
}

netlifyCmsScript.src = "https://unpkg.com/netlify-cms@2.10.192/dist/netlify-cms.js"