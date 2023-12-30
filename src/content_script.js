const onLoad = () => {
    const regex = /^```(.*)\n([\s\S]*)\n```$/gm;
    setInterval(() => {
        console.debug("Syntax highlighter for BlueSky Highlighting...");
        const tweets = document.querySelectorAll("div[data-testid='postText']");
        for (const tweet of tweets) {
            const wholeText = tweet.innerText;
            const results = wholeText.matchAll(regex);
            let newHTML = wholeText;
            for (const result of results) {
                const matched = result[0];
                const language = result[1]?.toLowerCase();
                const codes = result[2];
                const html = `<pre><code class="${language ? "language-" + language : undefined}">${codes}</code></pre>`;
                newHTML = newHTML.replace(matched, html);
            }
            if (newHTML !== wholeText) {
                tweet.innerHTML = newHTML;
                tweet.querySelectorAll("pre code").forEach(e => {
                    hljs.highlightElement(e);
                });
            }
        }
    }, 2000);
}
window.addEventListener("load", onLoad);
