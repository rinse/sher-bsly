const onLoad = () => {
    const regex = /([\s\S]*?)\n?^```(.*)\n([\s\S]*)\n```$/gm;
    const mark = "sher-bsky-checked";
    setInterval(() => {
        console.debug("Syntax highlighter for Bluesky Highlighting...");
        const tweets = document.querySelectorAll(`div[data-testid='postText']:not(.${mark})`);
        for (const tweet of tweets) {
            const results = tweet.innerText.matchAll(regex);
            const newChildren = Array.from(results).flatMap(result => {
                const leadingText = result[1];
                const language = result[2].toLowerCase();
                const codes = result[3];
                const pre = codeBlock(codes, language);
                return [leadingText, pre];
            });
            if (newChildren.length !== 0) {
                tweet.replaceChildren(...newChildren);
            }
            tweet.classList.add(mark);
        }
    }, 2000);
}
window.addEventListener("load", onLoad);

function codeBlock(codes, language) {
    const pre = document.createElement("pre");
    const code = pre.appendChild(document.createElement("code"));
    if (language !== "") {
        code.classList.add(`language-${language}`)
    }
    code.append(codes);
    hljs.highlightElement(code);
    return pre;
}
