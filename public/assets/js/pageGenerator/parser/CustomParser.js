class CustomParser
{
    config = {
        image: {
            use: "figure", // figure or img (figcaption will be used for caption of figure)
            imgClass: "img",
            figureClass: "fig-img",
            figCapClass: "fig-cap",
            path: "absolute",
        },
        paragraph: {
            pClass: "paragraph",
        },
        code: {
            codeBlockClass: "code-block",
        },
        embed: {
            useProvidedLength: false,
            // set to true if you want the returned width and height of editorjs to be applied
            // NOTE: sometimes source site overrides the lengths so it does not work 100%
        },
        quote: {
            applyAlignment: false,
            // if set to true blockquote element will have text-align css property set
        },
    }

    // ici on défini comment afficher chaque type de block
    parsers = {
        paragraph: function(block, config) {
            let data = block.data;
            return `<p class="${config.paragraph.pClass} ${block.classes}" style="${block.tunes.classHandler.style}"> ${data.text} </p>`;
        },
    
        header: function(block) {
            let data = block.data;
            return `<h${data.level} class="${block.classes}" style="${block.tunes.classHandler.style}">${data.text}</h${data.level}>`;
        },
    
        list: function(block) {
            let data = block.data;
            const type = data.style === "ordered" ? "ol" : "ul";
            const items = data.items.reduce(
                (acc, item) => acc + `<li>${item}</li>`,
                ""
            );
            return `<${type}>${items}</${type}>`;
        },
    
        quote: function(block, config) {
            let data = block.data;
            let alignment = "";
            if (config.quote.applyAlignment) {
                alignment = `style="text-align: ${data.alignment};"`;
            }
            return `<blockquote ${alignment}><p>${data.text}</p><cite>${data.caption}</cite></blockquote>`;
        },
    
        table: function(block) {
            let data = block.data;
            const rows = data.content.map((row) => {
                            return `<tr>${row.reduce(
            (acc, cell) => acc + `<td>${cell}</td>`,
            ""
          )}</tr>`;
        });
        return `<table class="table ${block.classes}" style="${block.tunes.classHandler.style}"><tbody>${rows.join("")}</tbody></table>`;
      },
      image: function(block, config) {
        let data = block.data;
        const imageConditions = `${data.stretched ? "img-fullwidth" : ""} ${
          data.withBorder ? "img-border" : ""
        } ${data.withBackground ? "img-bg" : ""}`;
        const imgClass = config.image.imgClass || "";
        let imageSrc;
    
        if (data.url) {
          // simple-image was used and the image probably is not uploaded to this server
          // therefore, we use the absolute path provided in data.url
          // so, config.image.path property is useless in this case!
          imageSrc = data.url;
        } else if (config.image.path === "absolute") {
          imageSrc = data.file.url;
        } else {
          imageSrc = config.image.path.replace(
            /<(.+)>/,
            (match, p1) => data.file[p1]
          );
        }
    
        if (config.image.use === "img") {
          return `<img class="${imageConditions} ${imgClass}" style="${block.tunes.classHandler.style}" src="${imageSrc}" alt="${data.caption}">`;
        } else if (config.image.use === "figure") {
          const figureClass = config.image.figureClass || "";
          const figCapClass = config.image.figCapClass || "";
    
          return `<figure class="${figureClass}"><img class="${imgClass} ${imageConditions}" src="${imageSrc}" alt="${data.caption}"><figcaption class="${figCapClass}">${data.caption}</figcaption></figure>`;
        }
      },
      code: function(block, config) {
        let data = block.data;
        const markup = sanitizeHtml(data.code);
        return `<pre><code class="${config.code.codeBlockClass}">${markup}</code></pre>`;
      },
      raw: function(block) {
        let data = block.data;
        return data.html;
      },
      delimiter: function (block) {
        return "<br />";
      },
    
      embed: function (block, config) {
        let data = block.data;
        if (config.embed.useProvidedLength) {
          data.length = `width="${data.width}" height="${data.height}"`;
        } else {
          data.length = "";
        }
        const regex = new RegExp(/<%data\.(.+?)%>/, "gm");
        if (config.embedMarkups[data.service]) {
          return config.embedMarkups[data.service].replace(
            regex,
            (match, p1) => data[p1]
          );
        } else {
          return config.embedMarkups["defaultMarkup"].replace(
            regex,
            (match, p1) => data[p1]
          );
        }
      },
    }

    parse(data){
        let html = [];
        data.forEach(block => {
            const markup = this.parseBlock(block);
            if (markup instanceof Error) {
                html.push(""); // parser for this kind of block doesn't exist
            }
            html.push(markup);
        });
        return html.join('');
    }

    parseBlock(block){
        block.classes = this.getBlockClasses(block);
        if (!this.parsers[block.type]) {
            return new Error(
                `${block.type} is not supported! Define your own custom function.`
            );
        }
        try {
            return this.parsers[block.type](block, this.config);
        } catch (err) {
            return err;
        }
    }

    getBlockClasses(block){
        if (block.hasOwnProperty('tunes')){
            if (block.tunes.hasOwnProperty('classHandler')) {
                return String(block.tunes.classHandler.classes);
            }
        }
        return "";
    }

}